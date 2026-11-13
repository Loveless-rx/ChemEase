"""Check a downloaded ChemEase ZIP; optionally compare to an aligned crystal SDF.

Usage: backend/.venv/Scripts/python.exe tools/verify-docking-archive.py archive.zip
       --reference aligned-crystal-ligand.sdf
This is artifact/redocking verification, not a general docking accuracy benchmark.
"""
import argparse
import hashlib
import io
import json
import zipfile
from pathlib import Path
import numpy as np
from rdkit import Chem
from rdkit.Chem import rdFMCS

parser=argparse.ArgumentParser();parser.add_argument("archive",type=Path);parser.add_argument("--reference",type=Path);args=parser.parse_args()
with zipfile.ZipFile(args.archive) as archive:
    if sum(info.file_size for info in archive.infolist())>100*1024*1024:raise ValueError("Archive expands beyond the verification size limit.")
    assert archive.testzip() is None
    result=json.loads(archive.read("result.json"))
    for name,record,key in [("receptor.pdbqt",result["receptor"],"pdbqt"),("input-ligand.sdf",result["ligand"],"sdf")]:
        assert hashlib.sha256(archive.read(name)).hexdigest()==record["files"][key]["sha256"],name
    prepared=next(Chem.ForwardSDMolSupplier(io.BytesIO(archive.read("input-ligand.sdf")),removeHs=False))
    assert prepared is not None
    identity=Chem.MolToSmiles(Chem.RemoveHs(prepared),isomericSmiles=True)
    poses=list(Chem.ForwardSDMolSupplier(io.BytesIO(archive.read("poses.sdf")),removeHs=False))
    assert len(poses)==len(result["poses"])
    assert all(m is not None and Chem.MolToSmiles(Chem.RemoveHs(m),isomericSmiles=True)==identity for m in poses)
summary={"jobId":result["jobId"],"poseCount":len(poses),"bestScoreKcalMol":result["poses"][0]["affinity"],"preparedArtifactHashesAndPoseChemistryVerified":True}
if args.reference:
    probe=Chem.RemoveHs(poses[0]);ref=Chem.RemoveHs(next(Chem.SDMolSupplier(str(args.reference),removeHs=False)))
    match=rdFMCS.FindMCS([probe,ref],timeout=15,ringMatchesRingOnly=True,completeRingsOnly=True,matchValences=False)
    if match.canceled or match.numAtoms!=probe.GetNumAtoms() or match.numAtoms!=ref.GetNumAtoms():raise ValueError("A complete heavy-atom graph match was not found.")
    query=Chem.MolFromSmarts(match.smartsString);a=probe.GetSubstructMatches(query,uniquify=False,maxMatches=1000);b=ref.GetSubstructMatches(query,uniquify=False,maxMatches=1000)
    if not a or not b:raise ValueError("No coordinate mapping found.")
    score=min(float(np.sqrt(np.mean([sum((np.array(probe.GetConformer().GetAtomPosition(i))-np.array(ref.GetConformer().GetAtomPosition(j)))**2) for i,j in zip(x,y)]))) for x in a for y in b)
    summary.update(crystalHeavyAtomRmsdAngstrom=score,mappingCapReached=len(a)==1000 or len(b)==1000,reference=str(args.reference),method="No coordinate alignment; minimum complete element/bond heavy-atom MCS mapping, ignoring protonation/stereo differences. Reference must already share the receptor's crystal frame.")
summary["interpretation"]="One target/protocol verification; not measured affinity or general docking accuracy validation."
print(json.dumps(summary,indent=2))
