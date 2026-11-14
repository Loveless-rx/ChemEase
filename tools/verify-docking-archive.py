"""Check a downloaded ChemEase ZIP; optionally compare to an aligned crystal SDF.

Usage: backend/.venv/Scripts/python.exe tools/verify-docking-archive.py archive.zip
       --reference aligned-crystal-ligand.sdf
This is artifact/redocking verification, not a general docking accuracy benchmark.
"""
import argparse
import hashlib
import io
import json
import re
import zipfile
from pathlib import Path
import numpy as np
from rdkit import Chem
from rdkit.Chem import rdFMCS

parser=argparse.ArgumentParser();parser.add_argument("archive",type=Path);parser.add_argument("--reference",type=Path);parser.add_argument("--rmsd-threshold",type=float,help="Fail if the top-ranked pose exceeds this crystal-frame RMSD (requires --reference).");args=parser.parse_args()
if args.rmsd_threshold is not None and (not args.reference or not np.isfinite(args.rmsd_threshold) or args.rmsd_threshold<=0):parser.error("A positive RMSD threshold requires a crystal reference.")
with zipfile.ZipFile(args.archive) as archive:
    if sum(info.file_size for info in archive.infolist())>100*1024*1024:raise ValueError("Archive expands beyond the verification size limit.")
    assert archive.testzip() is None
    result=json.loads(archive.read("result.json"))
    for name,record,key in [("receptor.pdbqt",result["receptor"],"pdbqt"),("input-ligand.sdf",result["ligand"],"sdf")]:
        assert hashlib.sha256(archive.read(name)).hexdigest()==record["files"][key]["sha256"],name
    if "ligand.pdbqt" in archive.namelist():
        assert hashlib.sha256(archive.read("ligand.pdbqt")).hexdigest()==result["ligand"]["files"]["pdbqt"]["sha256"]
    if result["engine"]=="autodock4":
        assert {"ligand.pdbqt","receptor.gpf","docking.dpf","docking.dlg","autogrid.glg"}.issubset(archive.namelist())
        for name,expected in result["protocol"]["mapHashes"].items():
            assert hashlib.sha256(archive.read(name)).hexdigest()==expected,name
    prepared=next(Chem.ForwardSDMolSupplier(io.BytesIO(archive.read("input-ligand.sdf")),removeHs=False))
    assert prepared is not None
    identity=Chem.MolToSmiles(Chem.RemoveHs(prepared),isomericSmiles=True)
    poses=list(Chem.ForwardSDMolSupplier(io.BytesIO(archive.read("poses.sdf")),removeHs=False))
    assert len(poses)==len(result["poses"])
    assert all(m is not None and Chem.MolToSmiles(Chem.RemoveHs(m),isomericSmiles=True)==identity for m in poses)
    assert all(result["poses"][i]["affinity"]>=result["poses"][i-1]["affinity"] for i in range(1,len(poses)))
    if result.get("tools",{}).get("protocol")=="chemease-browser-v2":
        assert Chem.GetFormalCharge(prepared)==result["ligand"]["charge"]
        log=archive.read("vina.log").decode()
        assert "AutoDock Vina v1.2.3" in log
        assert int(re.search(r"CPU:\s*(\d+)",log)[1])==result["settings"].get("cpu",1)
        for key in ["source","features","log","torsions","generated","state"]:
            file=result["ligand"]["files"][key];data=archive.read("ligand-"+file["name"])
            assert len(data)==file["bytes"] and hashlib.sha256(data).hexdigest()==file["sha256"],key
        torsions=json.loads(archive.read("ligand-torsions.json"));qt=archive.read("ligand.pdbqt").decode()
        cuts=[tuple(sorted(map(int,line.split()[1:]))) for line in qt.splitlines() if line.startswith("BRANCH ")]
        assert sorted(cuts)==sorted(tuple(sorted(pair)) for pair in torsions["rotors"])
        assert f'TORSDOF {len(cuts)}' in qt
        for i,mol in enumerate(poses,1):
            assert int(mol.GetProp("POSE_RANK"))==i
            assert float(mol.GetProp("VINA_AFFINITY_KCAL_MOL"))==result["poses"][i-1]["affinity"]
    receptor_heavy=np.array([[float(line[i:i+8]) for i in [30,38,46]] for line in archive.read("receptor.pdbqt").decode().splitlines() if line.startswith(("ATOM  ","HETATM")) and line.split()[-1] not in ["H","HD"]])
    distances=[];clashes=[];bond_drift=[]
    for pose in poses:
        xyz=np.array(Chem.RemoveHs(pose).GetConformer().GetPositions())
        d=np.linalg.norm(xyz[:,None,:]-receptor_heavy[None,:,:],axis=2)
        distances.append(float(d.min()));clashes.append(int((d<1.5).sum()))
        changes=[]
        for bond in prepared.GetBonds():
            a,b=bond.GetBeginAtomIdx(),bond.GetEndAtomIdx()
            old=(prepared.GetConformer().GetAtomPosition(a)-prepared.GetConformer().GetAtomPosition(b)).Length()
            new=(pose.GetConformer().GetAtomPosition(a)-pose.GetConformer().GetAtomPosition(b)).Length()
            changes.append(abs(old-new))
        bond_drift.append(max(changes,default=0))
    if result.get("tools",{}).get("protocol")=="chemease-browser-v2":assert max(bond_drift)<.01,"Vina pose export changed a ligand bond length."
summary={"jobId":result["jobId"],"poseCount":len(poses),"bestScoreKcalMol":result["poses"][0]["affinity"],"cpu":result["settings"].get("cpu",1),"preparedArtifactHashesAndPoseChemistryVerified":True,"minimumProteinLigandHeavyDistanceAngstrom":distances,"severeHeavyContactsUnder1_5Angstrom":clashes,"maximumLigandBondLengthDriftAngstrom":bond_drift}
if args.reference:
    probe=Chem.RemoveHs(poses[0]);ref=Chem.RemoveHs(next(Chem.SDMolSupplier(str(args.reference),removeHs=False)))
    match=rdFMCS.FindMCS([probe,ref],timeout=15,ringMatchesRingOnly=True,completeRingsOnly=True,matchValences=False)
    if match.canceled or match.numAtoms!=probe.GetNumAtoms() or match.numAtoms!=ref.GetNumAtoms():raise ValueError("A complete heavy-atom graph match was not found.")
    query=Chem.MolFromSmarts(match.smartsString);a=probe.GetSubstructMatches(query,uniquify=False,maxMatches=1000);b=ref.GetSubstructMatches(query,uniquify=False,maxMatches=1000)
    if not a or not b:raise ValueError("No coordinate mapping found.")
    values=[]
    for pose in poses:
        heavy=Chem.RemoveHs(pose)
        pose_matches=heavy.GetSubstructMatches(query,uniquify=False,maxMatches=1000)
        if not pose_matches:raise ValueError("Pose has no complete reference atom mapping.")
        score=min(float(np.sqrt(np.mean([sum((np.array(heavy.GetConformer().GetAtomPosition(i))-np.array(ref.GetConformer().GetAtomPosition(j)))**2) for i,j in zip(x,y)]))) for x in pose_matches for y in b)
        values.append(score)
    summary.update(crystalHeavyAtomRmsdAngstrom=values[0],poseCrystalRmsdAngstrom=values,bestSampledCrystalRmsdAngstrom=min(values),bestSampledRank=values.index(min(values))+1,mappingCapReached=len(a)==1000 or len(b)==1000,reference=str(args.reference),referenceSha256=hashlib.sha256(args.reference.read_bytes()).hexdigest(),heavyAtoms=probe.GetNumAtoms(),seed=result["settings"]["seed"],exhaustiveness=result["settings"].get("exhaustiveness"),protocol=result.get("tools",{}).get("protocol"),preparedCharge=Chem.GetFormalCharge(prepared),method="No coordinate alignment; minimum complete element/bond heavy-atom MCS mapping, ignoring protonation/stereo differences. Reference must already share the receptor's crystal frame. Top-ranked and best-sampled results are separate; poses are never reranked by the crystal.")
    if args.rmsd_threshold is not None:summary.update(rmsdThresholdAngstrom=args.rmsd_threshold,topRankedPass=values[0]<=args.rmsd_threshold and not summary["mappingCapReached"])
summary["interpretation"]="One target/protocol verification; not measured affinity or general docking accuracy validation."
print(json.dumps(summary,indent=2))
if args.rmsd_threshold is not None and not summary["topRankedPass"]:raise SystemExit(1)
