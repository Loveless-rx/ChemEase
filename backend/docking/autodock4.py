"""AutoGrid 4 maps + native AutoDock 4 LGA, never Vina's AD4 scoring option."""
import hashlib
import json
import math
import re
from .interactions import pdbqt_atoms
from .process import execute

SPACING=.375
TYPES={"C","A","N","NA","OA","S","SA","HD","F","Cl","Br","I","P"}


def parameters(request, receptor, ligand):
    rec=pdbqt_atoms(receptor);lig=pdbqt_atoms(ligand)
    rt=sorted({a["type"] for a in rec});lt=sorted({a["type"] for a in lig})
    if not rec or not lig or not set(rt+lt).issubset(TYPES):
        raise ValueError("AutoDock 4 supports standard AD4 types only; macrocycle glue/reactive/custom atom types require a separate protocol.")
    torsions=re.findall(r"^TORSDOF\s+(\d+)\s*$",ligand,re.M)
    branches=len(re.findall(r"^BRANCH\s",ligand,re.M))
    if len(torsions)!=1 or int(torsions[0])>32 or branches>32:
        raise ValueError("AutoDock 4 requires a valid torsion tree with at most 32 torsions.")
    for text in (receptor,ligand):
        for line in text.splitlines():
            if line.startswith(("ATOM  ","HETATM")):
                charge=float(line[70:76])
                if not math.isfinite(charge): raise ValueError("Invalid prepared partial charge.")
    npts=[2*math.ceil(getattr(request.grid.size,a)/(2*SPACING)) for a in "xyz"]
    center=[getattr(request.grid.center,a) for a in "xyz"]
    about=[sum(a["xyz"][i] for a in lig)/len(lig) for i in range(3)]
    seed2=request.seed%2147483646+1
    gpf=["npts "+" ".join(map(str,npts)),"gridfld receptor.maps.fld",f"spacing {SPACING}","receptor_types "+" ".join(rt),"ligand_types "+" ".join(lt),"receptor receptor.pdbqt","gridcenter "+" ".join(map(str,center)),"smooth 0.5"]
    gpf += [f"map receptor.{t}.map" for t in lt]+["elecmap receptor.e.map","dsolvmap receptor.d.map","dielectric -0.1465"]
    dpf=["autodock_parameter_version 4.2","outlev ADT",f"seed {request.seed} {seed2}","unbound_model bound","ligand_types "+" ".join(lt),"fld receptor.maps.fld"]
    dpf += [f"map receptor.{t}.map" for t in lt]+["elecmap receptor.e.map","desolvmap receptor.d.map","move ligand.pdbqt","about "+" ".join(f"{v:.6f}" for v in about),"tran0 random","quaternion0 random","dihe0 random",f"torsdof {torsions[0]}","ga_pop_size 150",f"ga_num_evals {request.ad4.evaluations}","ga_num_generations 27000","ga_elitism 1","ga_mutation_rate 0.02","ga_crossover_rate 0.8","set_ga","sw_max_its 300","sw_max_succ 4","sw_max_fail 4","sw_rho 1.0","sw_lb_rho 0.01","ls_search_freq 0.06","set_psw1",f"ga_run {request.ad4.runs}","rmstol 2.0","analysis"]
    protocol={"method":"AutoDock 4 Lamarckian genetic algorithm / pseudo-Solis-Wets local search","scoring":"AD4.2 built-in force field; estimated free energy of binding (kcal/mol)","unboundModel":"bound","gridSpacing":SPACING,"npts":npts,"effectiveGrid":{"center":dict(zip("xyz",center)),"size":dict(zip("xyz",[n*SPACING for n in npts]))},"runs":request.ad4.runs,"evaluationsPerRun":request.ad4.evaluations,"population":150,"maximumGenerations":27000,"seeds":[request.seed,seed2],"poseSelection":"Lowest estimated binding-energy pose from each AD4 2 Å RMSD cluster; up to the requested maximum. Cluster membership comes from the native DLG RANKING table. RMSD bounds from Vina are not applicable.","chargeModel":"Prepared Meeko Gasteiger/template charges; original prepared PDBQT retained."}
    return "\n".join(gpf)+"\n","\n".join(dpf)+"\n",protocol,lt


def parse_dlg(text, original, runs, limit):
    if "Successful Completion" not in text: raise ValueError("AutoDock 4 did not report successful completion.")
    models=[];current=None
    for line in text.splitlines():
        if not line.startswith("DOCKED: "): continue
        row=line[8:]
        if row.startswith("MODEL"):
            if current is not None: raise ValueError("Nested AutoDock models.")
            current=[row]
        elif current is not None:
            current.append(row)
            if row.startswith("ENDMDL"):models.append("\n".join(current)+"\n");current=None
    if current is not None or len(models)!=runs: raise ValueError("AutoDock 4 returned an incomplete run ensemble.")
    clusters={}
    for line in text.splitlines():
        if line.rstrip().endswith("RANKING"):
            fields=line.split()
            try: cluster,subrank,run=map(int,fields[:3])
            except ValueError: raise ValueError("Malformed AutoDock cluster ranking.")
            if run in clusters or cluster<1 or subrank<1: raise ValueError("Invalid AutoDock cluster membership.")
            clusters[run]=(cluster,subrank)
    if set(clusters)!=set(range(1,runs+1)):raise ValueError("AutoDock 4 cluster ranking is incomplete.")
    for cluster in {c for c,_ in clusters.values()}:
        ranks=[rank for c,rank in clusters.values() if c==cluster]
        if sorted(ranks)!=list(range(1,len(ranks)+1)):raise ValueError("AutoDock cluster subranks are not a complete partition.")
    template=original.splitlines();original_atoms={a["serial"]:a for a in pdbqt_atoms(original)}
    candidates=[]
    for block in models:
        run_match=re.search(r"^MODEL\s+(\d+)",block)
        energy=re.search(r"Estimated Free Energy of Binding\s*=\s*([-+\d.eE]+)\s+kcal/mol",block)
        if not run_match or not energy or not math.isfinite(float(energy[1])): raise ValueError("Missing or invalid AutoDock pose energy/run.")
        run=int(run_match[1]);cluster,subrank=clusters.get(run,(None,None))
        if cluster is None:raise ValueError("Unknown AutoDock run ID.")
        output_atoms=pdbqt_atoms(block)
        if len(output_atoms)!=len(original_atoms) or {a["serial"] for a in output_atoms}!=set(original_atoms):raise ValueError("AutoDock pose atom mapping changed.")
        xyz={}
        for a in output_atoms:
            source=original_atoms[a["serial"]]
            if a["type"]!=source["type"] or a["name"]!=source["name"]:raise ValueError("AutoDock pose atom identity changed.")
            xyz[a["serial"]]=a["xyz"]
        if subrank!=1:continue
        # Restore the exact original Meeko metadata/tree, changing only coordinates.
        rows=[]
        for line in template:
            if line.startswith(("ATOM  ","HETATM")):
                v=xyz[int(line[6:11])];line=line[:30]+"".join(f"{x:8.3f}" for x in v)+line[54:]
            rows.append(line)
        candidates.append({"affinity":float(energy[1]),"sourceRun":run,"cluster":cluster,"rows":rows})
    if len({int(re.search(r"^MODEL\s+(\d+)",m)[1]) for m in models})!=runs:raise ValueError("Duplicate AutoDock run IDs.")
    selected=sorted(candidates,key=lambda p:(p["affinity"],p["sourceRun"]))[:limit]
    if not selected:raise ValueError("No complete AutoDock cluster representatives were returned.")
    normalized=[];scores=[]
    for rank,p in enumerate(selected,1):
        normalized.append(f"MODEL {rank}\nUSER    Estimated Free Energy of Binding    = {p['affinity']} kcal/mol\n"+"\n".join(p["rows"])+"\nENDMDL\n")
        scores.append({k:p[k] for k in ("affinity","sourceRun","cluster")}|{"rmsdLower":None,"rmsdUpper":None})
    return "".join(normalized),scores


def run(request, engine, folder, stage, check):
    original=(folder/"ligand.pdbqt").read_text()
    gpf,dpf,protocol,types=parameters(request,(folder/"receptor.pdbqt").read_text(),original)
    (folder/"receptor.gpf").write_text(gpf);(folder/"docking.dpf").write_text(dpf)
    stage("generating-ad4-maps","AutoGrid 4 is generating atom-type, electrostatic and desolvation maps")
    execute([engine.autogrid(),"-p","receptor.gpf","-l","autogrid.glg"],folder,"autogrid-process.log",check)
    if "Successful Completion" not in (folder/"autogrid.glg").read_text(errors="replace"):raise ValueError("AutoGrid did not report successful completion. Review autogrid.glg.")
    files={"gpf":"receptor.gpf","dpf":"docking.dpf","gridLog":"autogrid.glg","field":"receptor.maps.fld","xyz":"receptor.maps.xyz"}
    for t in types+["e","d"]: files[f"map-{t}"]=f"receptor.{t}.map"
    protocol["autogridVersion"]=engine.tool_version(engine.autogrid(),"AutoGrid")
    protocol["autogridBinarySha256"]=hashlib.sha256(__import__("pathlib").Path(engine.autogrid()).read_bytes()).hexdigest()
    protocol["mapHashes"]={name:hashlib.sha256((folder/name).read_bytes()).hexdigest() for name in files.values() if name.endswith((".map",".fld",".xyz"))}
    stage("docking","AutoDock 4 is executing Lamarckian genetic algorithm searches; no reliable percentage is available")
    execute(engine.command(request),folder,"autodock-process.log",check)
    normalized,scores=parse_dlg((folder/"docking.dlg").read_text(errors="replace"),original,request.ad4.runs,request.poses)
    (folder/"poses.pdbqt").write_text(normalized)
    files.update(log="docking.dlg")
    (folder/"ad4-protocol.json").write_text(json.dumps(protocol,indent=2));files["protocol"]="ad4-protocol.json"
    return scores,files,protocol
