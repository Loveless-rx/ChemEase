import hashlib
import importlib.metadata
import io
import json
import math
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path
import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem
from . import storage as db
from .schemas import ReceptorPreparation, LigandPreparation, DockingRequest
from .structures import clean_pdb, inspect_pdb, atoms
from .engines import DockingManager
from .interactions import contacts
from .features import receptor_features, ligand_features

LIMITATIONS = "Rigid-receptor, noncovalent AutoDock Vina search. Scores are predicted scoring-function energies (kcal/mol), not measured affinities, Kd, efficacy or safety. Results depend on protein preparation, protonation/tautomer choice, box and sampling. No flexible receptor, metal/cofactor, covalent or explicit-water protocol is implemented. Different engines/scoring functions are not directly comparable. Geometric contacts are review signals, not experimental interactions. Redocking/enrichment and expert inspection are required for each target/protocol."


def versions():
    import platform
    return {**{name: importlib.metadata.version(name) for name in ("rdkit", "meeko", "molscrub", "pdbfixer", "openmm")},"python":platform.python_version(),"platform":platform.system()+"/"+platform.machine()}


def publish_files(record, files):
    entries = {}
    for key, name in files.items():
        path = db.folder(record["id"]) / name
        if not path.is_file() or path.stat().st_size == 0:
            raise ValueError("A required output artifact is empty: "+name)
        entries[key] = {"name": name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(), "bytes": path.stat().st_size}
    return db.update(record["id"], ready=True, files=entries)


def artifact(record, key):
    if not record.get("ready") or key not in record.get("files", {}):
        raise ValueError("Prepared artifact is unavailable.")
    entry = record["files"][key]
    path = db.folder(record["id"]) / entry["name"]
    if path.parent != db.folder(record["id"]) or hashlib.sha256(path.read_bytes()).hexdigest() != entry["sha256"]:
        raise ValueError("Prepared artifact hash changed. Prepare again rather than using changed inputs.")
    return path


def prepare_receptor(job, stage, check):
    from pdbfixer import PDBFixer
    from openmm.app import PDBFile
    request = ReceptorPreparation(**job["request"])
    raw = db.get(request.receptorId, job["scope"], "receptor-upload")
    if any(c not in [c["id"] for c in raw["metadata"]["chains"]] for c in request.chains):
        raise ValueError("Choose chains present in the uploaded protein.")
    stage("cleaning-receptor", "Selecting chains, first model and highest-occupancy alternate atoms")
    text = clean_pdb(artifact(raw, "pdb").read_text(), request.chains)
    fixer = PDBFixer(pdbfile=io.StringIO(text))
    fixer.findMissingResidues()
    missing_residues = sum(len(v) for v in fixer.missingResidues.values())
    fixer.missingResidues = {}  # Do not invent absent loops or long chain segments.
    fixer.findNonstandardResidues()
    replacements = [f"{r.name}:{r.id} → {target}" for r, target in fixer.nonstandardResidues]
    fixer.replaceNonstandardResidues()
    fixer.findMissingAtoms()
    missing = sum(len(v) for v in fixer.missingAtoms.values()) + sum(len(v) for v in fixer.missingTerminals.values())
    if missing and not request.rebuildSidechains:
        raise ValueError(f"Protein has {missing} missing heavy/terminal atoms. Review and enable reconstruction or supply a repaired PDB.")
    if missing > 250:
        raise ValueError("Too many missing atoms for automatic side-chain repair; use a curated receptor.")
    check()
    if missing:
        stage("repairing-receptor", "Reconstructing recorded missing side-chain/terminal atoms")
        fixer.addMissingAtoms(seed=42)
    stage("adding-receptor-hydrogens", f"PDBFixer/OpenMM hydrogen placement at pH {request.ph}")
    import random
    random.seed(42)
    fixer.addMissingHydrogens(request.ph)
    check()
    record = db.create(job["scope"], "receptor", parentJobId=job["id"], ready=False, name=raw["name"], pdbId=raw.get("pdbId"), sourceId=raw["id"], sourceHash=raw["files"]["pdb"]["sha256"], settings=request.model_dump(), tools=versions())
    folder = db.folder(record["id"])
    with (folder/"receptor.pdb").open("w") as out:
        PDBFile.writeFile(fixer.topology, fixer.positions, out, keepIds=True)
    metadata = inspect_pdb((folder/"receptor.pdb").read_text())
    stage("typing-receptor", "Assigning Meeko receptor atom types and writing PDBQT")
    subprocess.run([sys.executable, "-m", "meeko.cli.mk_prepare_receptor", "--read_pdb", "receptor.pdb", "-o", "receptor", "-p"], cwd=folder, check=True, capture_output=True, text=True, timeout=180)
    (folder/"features.json").write_text(json.dumps(receptor_features(fixer.topology,(folder/"receptor.pdbqt").read_text(),(folder/"receptor.pdb").read_text())))
    check()
    warnings = raw["metadata"]["warnings"] + ["All waters, ligands, ions and other non-protein residues were removed. Review essential cofactors before use.", "Protein protonation is a PDBFixer/OpenMM assignment, not a validated site-specific pKa calculation.", f"Skipped {missing_residues} absent residues/loop positions; rebuilt {missing} heavy/terminal atoms."]
    sites=[s for s in raw["metadata"]["sites"] if s["chain"] in request.chains]
    record = db.update(record["id"], metadata=metadata, bindingSites=sites, removed=raw["metadata"]["nonProtein"], repairedAtoms=missing, replacements=replacements, warnings=warnings)
    record = publish_files(record, {"pdb": "receptor.pdb", "pdbqt": "receptor.pdbqt", "features":"features.json"})
    return {"receptor": db.public(record), "sites": [s for s in raw["metadata"]["sites"] if s["chain"] in request.chains]}


def prepare_ligand(job, stage, check):
    from molscrub import Scrub
    from meeko import MoleculePreparation, PDBQTWriterLegacy
    request = LigandPreparation(**job["request"])
    stage("reading-ligand", "Sanitizing a single ligand and checking its identity")
    if request.format == "sdf":
        molecules = list(Chem.ForwardSDMolSupplier(io.BytesIO(request.content.encode()), removeHs=False))
        if len(molecules) != 1 or molecules[0] is None:
            raise ValueError("Import exactly one valid SDF molecule, with defined bond orders.")
        mol = molecules[0]
    else:
        lines = [line.strip() for line in request.content.splitlines() if line.strip()]
        if len(lines) != 1:
            raise ValueError("Import one SMILES line (optionally followed by a name).")
        mol = Chem.MolFromSmiles(lines[0].split()[0])
    if mol is None or len(Chem.GetMolFrags(mol)) != 1:
        raise ValueError("Use one chemically valid connected ligand. Salts are not stripped automatically.")
    if not 1 <= mol.GetNumHeavyAtoms() <= 80 or any(a.GetSymbol() not in {"H","C","N","O","F","P","S","Cl","Br","I"} or a.GetIsotope() for a in mol.GetAtoms()):
        raise ValueError("This protocol supports 1–80 heavy atoms using standard organic elements; no metals or isotope labels.")
    if sum(a.GetSymbol() in ("N","O") for a in mol.GetAtoms()) > 24:
        raise ValueError("Too many potentially ionizable sites for this bounded preparation workflow.")
    original = Chem.MolToSmiles(Chem.RemoveHs(mol), isomericSmiles=True)
    unspecified = Chem.FindMolChiralCenters(mol, includeUnassigned=True)
    if any(flag == "?" for _, flag in unspecified):
        raise ValueError("Input has unspecified stereocenters. Supply a stereochemically defined SDF or isomeric SMILES rather than docking an arbitrary stereoisomer.")
    stage("protonating-ligand", f"Enumerating rule-based protonation states at pH {request.ph}" if request.protonation=="rules" else "Preserving the explicitly supplied charge/protonation state")
    states = Scrub(ph_low=request.ph, ph_high=request.ph, skip_acidbase=request.protonation=="supplied", skip_tautomers=True, skip_gen3d=True, keep_all_frags=True)(mol)
    if not states or len(states) > 8:
        raise ValueError("Preparation produced no states or more than eight states; use a curated protonation state.")
    results=[]
    for i, state in enumerate(states):
        check();stage("generating-conformers", f"State {i+1}/{len(states)}: ETKDGv3 embedding and MMFF94s optimization")
        m = Chem.AddHs(state)
        if not AllChem.MMFFHasAllMoleculeParams(m):
            raise ValueError("MMFF94s parameters unavailable for this ligand. No unverified force-field fallback is used.")
        options=AllChem.ETKDGv3();options.randomSeed=42;options.numThreads=1
        confs=AllChem.EmbedMultipleConfs(m,numConfs=5,params=options)
        if not confs:
            raise ValueError("3D conformer embedding failed.")
        energies=AllChem.MMFFOptimizeMoleculeConfs(m,numThreads=1,maxIters=1000,mmffVariant="MMFF94s")
        good=[(energy,index) for index,(status,energy) in enumerate(energies) if status==0 and math.isfinite(energy)]
        if not good:
            raise ValueError("No conformer converged during MMFF94s minimization.")
        energy,index=min(good);chosen=Chem.Conformer(m.GetConformer(int(confs[index])));m.RemoveAllConformers();m.AddConformer(chosen,assignId=True)
        m.SetProp("_Name",request.source.name)
        stage("typing-ligand", f"State {i+1}/{len(states)}: Meeko Gasteiger charges and torsion tree")
        setups=MoleculePreparation().prepare(m)
        if len(setups)!=1:
            raise ValueError("This release requires one Meeko setup per protonation state.")
        pdbqt,ok,error=PDBQTWriterLegacy.write_string(setups[0])
        if not ok:
            raise ValueError("Ligand PDBQT preparation failed: "+error)
        smiles=Chem.MolToSmiles(Chem.RemoveHs(m),isomericSmiles=True)
        warnings=["Rule-based protonation at a single pH; populations are not predicted. Tautomers and stereoisomers are not enumerated.", "MMFF energy ranks conformers within this state only, not different protonation states."]
        if request.protonation=="supplied":warnings[0]="Supplied formal charge/protonation is preserved. pH is an annotation only; no pH or pKa-based state prediction was performed. Tautomers/stereoisomers are not enumerated."
        if any(flag=="?" for _,flag in unspecified):
            warnings.append("Input has unspecified stereocenters. The generated 3D geometry is one arbitrary configuration, not a stereochemical assignment.")
        record=db.create(job["scope"],"ligand",parentJobId=job["id"],ready=False,name=request.source.name,source=request.source.model_dump(),sourceHash=db.digest(request.content),inputSmiles=original,smiles=smiles,charge=Chem.GetFormalCharge(m),ph=request.ph,protonation=request.protonation,conformerEnergy=energy,convergedConformers=len(good),tools=versions(),warnings=warnings)
        folder=db.folder(record["id"])
        (folder/"ligand.pdbqt").write_text(pdbqt)
        (folder/"features.json").write_text(json.dumps(ligand_features(m,pdbqt)))
        source_name="original.sdf" if request.format=="sdf" else "original.smi"
        (folder/source_name).write_bytes(request.content.encode())
        with Chem.SDWriter(str(folder/"ligand.sdf")) as writer:
            writer.write(m)
        record=publish_files(record,{"sdf":"ligand.sdf","pdbqt":"ligand.pdbqt","source":source_name,"features":"features.json"});results.append(db.public(record))
    return {"ligands":results}


def dock(job, stage, check):
    from meeko import PDBQTMolecule, RDKitMolCreate
    request=DockingRequest(**job["request"])
    rec=db.get(request.receptorId,job["scope"],"receptor");lig=db.get(request.ligandId,job["scope"],"ligand")
    folder=db.folder(job["id"])
    if "features" not in rec["files"] or "features" not in lig["files"]:raise ValueError("These preparations predate topology-based interaction typing. Prepare the receptor and ligand again.")
    rec_features=json.loads(artifact(rec,"features").read_text());lig_features=json.loads(artifact(lig,"features").read_text())
    for record,name in [(rec,"receptor-features.json"),(lig,"ligand-features.json")]:shutil.copyfile(artifact(record,"features"),folder/name)
    for record,key,name in [(rec,"pdbqt","receptor.pdbqt"),(rec,"pdb","receptor.pdb"),(lig,"pdbqt","ligand.pdbqt"),(lig,"sdf","input-ligand.sdf")]:
        shutil.copyfile(artifact(record,key),folder/name)
    original_name=None
    if "source" in lig["files"]:
        original_name="original-ligand"+Path(lig["files"]["source"]["name"]).suffix
        shutil.copyfile(artifact(lig,"source"),folder/original_name)
    original_receptor=False
    if rec.get("sourceId"):
        source_receptor=db.get(rec["sourceId"],job["scope"],"receptor-upload")
        shutil.copyfile(artifact(source_receptor,"pdb"),folder/"original-receptor.pdb")
        original_receptor=True
    receptor_atoms=atoms((folder/"receptor.pdb").read_text())
    c=request.grid.center
    if min(math.dist(a["xyz"],[c.x,c.y,c.z]) for a in receptor_atoms)>15:
        raise ValueError("The box center is more than 15 Å from every receptor atom. Review the binding site.")
    engine=DockingManager().engine(request.engine);version=engine.version()
    extra_files={};protocol=None
    if request.engine=="autodock4":
        from .autodock4 import run
        scores,extra_files,protocol=run(request,engine,folder,stage,check)
    else:
        from .process import execute
        stage("docking", "AutoDock Vina is searching. No reliable percentage is available during search.")
        execute(engine.command(request),folder,"vina.log",check)
        scores=[]
        for block in (folder/"poses.pdbqt").read_text().split("MODEL")[1:]:
            match=re.search(r"REMARK VINA RESULT:\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)",block)
            if not match or not all(math.isfinite(float(v)) for v in match.groups()):
                raise ValueError("Vina returned malformed pose scores.")
            affinity,lower,upper=map(float,match.groups())
            scores.append({"affinity":affinity,"rmsdLower":lower,"rmsdUpper":upper})
    check();stage("processing-poses", "Restoring chemical bond orders and analyzing pose geometry")
    text=(folder/"poses.pdbqt").read_text()
    blocks=["MODEL"+chunk for chunk in text.split("MODEL")[1:]]
    if not 1 <= len(scores) <= request.poses or len(blocks)!=len(scores):
        raise ValueError("Engine returned an unexpected number of poses.")
    mols=RDKitMolCreate.from_pdbqt_mol(PDBQTMolecule(text,skip_typing=True))
    if len(mols)!=1 or mols[0] is None or mols[0].GetNumConformers()!=len(scores):
        raise ValueError("Docked poses could not be safely restored to SDF.")
    molecule=mols[0];poses=[];files={"receptor":"receptor.pdb","receptorPdbqt":"receptor.pdbqt","inputLigand":"input-ligand.sdf","inputLigandPdbqt":"ligand.pdbqt","pdbqt":"poses.pdbqt","log":"vina.log",**extra_files}
    if original_name:files["sourceLigand"]=original_name
    if original_receptor:files["sourceReceptor"]="original-receptor.pdb"
    prepared_mol=next(Chem.SDMolSupplier(str(folder/"input-ligand.sdf"),removeHs=False))
    if prepared_mol is None:raise ValueError("Prepared ligand SDF is invalid.")
    prepared_identity=Chem.MolToSmiles(Chem.RemoveHs(prepared_mol),isomericSmiles=True)
    all_writer=Chem.SDWriter(str(folder/"poses.sdf"));coordinates=[]
    try:
        for i,score in enumerate(scores):
            check();molecule.SetProp("VINA_AFFINITY_KCAL_MOL" if request.engine=="vina" else "AD4_ESTIMATED_BINDING_ENERGY_KCAL_MOL",str(score["affinity"]));molecule.SetProp("DOCKING_ENGINE",request.engine);molecule.SetProp("POSE_RANK",str(i+1));all_writer.write(molecule,confId=i)
            name=f"pose-{i+1}.sdf"
            with Chem.SDWriter(str(folder/name)) as writer: writer.write(molecule,confId=i)
            roundtrip=next(Chem.SDMolSupplier(str(folder/name),removeHs=False))
            if roundtrip is None or Chem.MolToSmiles(Chem.RemoveHs(roundtrip),isomericSmiles=True)!=prepared_identity:
                raise ValueError("Docked SDF export changed the prepared ligand chemistry/stereochemistry; outputs were withheld.")
            files[f"pose-{i+1}"]=name
            geom=contacts((folder/"receptor.pdbqt").read_text(),blocks[i],set(rec_features["hydrophobicSerials"]),set(lig_features["hydrophobicSerials"]))
            poses.append({"rank":i+1,**score,**geom})
            coordinates.append(np.array([list(molecule.GetConformer(i).GetAtomPosition(a.GetIdx())) for a in molecule.GetAtoms() if a.GetAtomicNum()>1]))
    finally: all_writer.close()
    files["sdf"]="poses.sdf"
    files["receptorFeatures"]="receptor-features.json";files["ligandFeatures"]="ligand-features.json"
    rmsd=[[round(float(np.sqrt(np.mean(np.sum((a-b)**2,axis=1)))),4) for b in coordinates] for a in coordinates]
    result={"schema":1,"jobId":job["id"],"createdAt":job["createdAt"],"completedAt":db.now(),"engine":request.engine,"engineVersion":version,"engineBinarySha256":hashlib.sha256(Path(engine.executable()).read_bytes()).hexdigest(),"tools":versions(),"receptor":db.public(rec),"ligand":db.public(lig),"settings":request.model_dump(),"poses":poses,"mappedHeavyAtomRmsd":rmsd,"rmsdMethod":"Common receptor coordinate frame, fixed atom mapping, no realignment or symmetry correction. Vina lower/upper RMSDs are relative to its best pose, not the crystal ligand.","limitations":LIMITATIONS if request.engine=="vina" else LIMITATIONS.replace("AutoDock Vina", "AutoDock 4 / AutoGrid 4")+" Grid sides are rounded upward to even 0.375 Angstrom intervals; the effective grid and native LGA/cluster settings are retained. Independent search outcomes are not binding measurements."}
    if protocol is not None:
        result["protocol"]=protocol
        result["rmsdMethod"]="Common receptor frame, fixed heavy-atom mapping, no alignment or symmetry correction. AD4 cluster representatives are ranked by estimated binding energy. Vina RMSD bounds are not applicable (null); cluster RMSDs in the native DLG have separate meanings."
    (folder/"result.json").write_text(json.dumps(result,indent=2,allow_nan=False));files["result"]="result.json"
    import csv
    with (folder/"interactions.csv").open("w",newline="") as out:
        writer=csv.writer(out);writer.writerow(["pose","type","residue","receptor_atom","ligand_PDBQT_serial","distance_A","angle_deg"])
        for pose in poses:
            for contact in pose["contacts"]:
                row=[pose["rank"],contact["type"],contact["residue"],contact["receptorAtom"],contact["ligandAtom"],contact["distance"],contact["angle"]]
                writer.writerow(["'"+v if isinstance(v,str) and re.match(r"^\s*[=+@-]",v) else v for v in row])
    files["interactions"]="interactions.csv"
    (folder/"config.json").write_text(json.dumps(request.model_dump(),indent=2));files["config"]="config.json"
    db.update(job["id"],result=result)
    publish_files(db.get(job["id"]),files)
    return result
