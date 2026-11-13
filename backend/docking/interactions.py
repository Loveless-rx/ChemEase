"""Explicit geometry review signals, not PLIP classifications or measured interactions."""
import math
import numpy as np
from scipy.spatial import cKDTree


def pdbqt_atoms(text):
    result = []
    for line in text.splitlines():
        if line.startswith(("ATOM  ", "HETATM")):
            xyz = [float(line[i:i+8]) for i in (30,38,46)]
            if not all(math.isfinite(v) for v in xyz):
                raise ValueError("Invalid pose coordinate.")
            result.append({"serial": int(line[6:11]), "name": line[12:16].strip(), "residue": f"{line[21:22].strip() or '_'}:{line[22:27].strip()}:{line[17:20].strip()}", "xyz": xyz, "type": line.split()[-1]})
    return result


def angle(d, h, a):
    x,y = np.array(d)-np.array(h),np.array(a)-np.array(h)
    den = np.linalg.norm(x)*np.linalg.norm(y)
    return math.degrees(math.acos(float(np.clip(np.dot(x,y)/den,-1,1)))) if den else 0


def contacts(receptor_text, ligand_text, receptor_hydrophobic, ligand_hydrophobic):
    rec,lig = pdbqt_atoms(receptor_text),pdbqt_atoms(ligand_text)
    result = []
    def donors(rows):
        heavy = [a for a in rows if a["type"] in ("N","NA","O","OA","S","SA")]
        pairs=[]
        for h in rows:
            if h["type"] != "HD" or not heavy:
                continue
            d = min(heavy,key=lambda a: math.dist(a["xyz"],h["xyz"]))
            if math.dist(d["xyz"],h["xyz"]) <= 1.35:
                pairs.append((d,h))
        return pairs
    def hbonds(donors_, acceptors, ligand_donor):
        acceptors=[a for a in acceptors if a["type"] in ("NA","OA","SA")]
        if not acceptors:
            return
        tree=cKDTree([a["xyz"] for a in acceptors])
        for d,h in donors_:
            for index in tree.query_ball_point(d["xyz"],3.5):
                a=acceptors[index];dist=math.dist(d["xyz"],a["xyz"]);ang=angle(d["xyz"],h["xyz"],a["xyz"])
                if math.dist(h["xyz"],a["xyz"]) <= 2.5 and ang >= 120:
                    l,r=(d,a) if ligand_donor else (a,d)
                    result.append({"type":"hydrogen-bond candidate","residue":r["residue"],"receptorAtom":r["name"],"ligandAtom":l["serial"],"distance":round(dist,3),"angle":round(ang,2),"ligandDonor":ligand_donor})
    hbonds(donors(lig),rec,True);hbonds(donors(rec),lig,False)
    carbon=[a for a in rec if a["type"] in ("C","A") and a["serial"] in receptor_hydrophobic]
    if carbon:
        tree=cKDTree([a["xyz"] for a in carbon])
        nearest={}
        for l in lig:
            if l["type"] not in ("C","A") or l["serial"] not in ligand_hydrophobic:
                continue
            for i in tree.query_ball_point(l["xyz"],4):
                r=carbon[i];dist=math.dist(l["xyz"],r["xyz"]);key=(r["residue"],l["serial"])
                if key not in nearest or dist < nearest[key]["distance"]:
                    nearest[key]={"type":"hydrophobic carbon contact","residue":r["residue"],"receptorAtom":r["name"],"ligandAtom":l["serial"],"distance":round(dist,3),"angle":None,"ligandDonor":None}
        result.extend(nearest.values())
    ligand_lookup={a["serial"]:a for a in lig};receptor_lookup={(a["residue"],a["name"]):a for a in rec}
    for contact in result:
        l=ligand_lookup[contact["ligandAtom"]]
        r=receptor_lookup[(contact["residue"],contact["receptorAtom"])]
        contact["ligandPosition"]=l["xyz"];contact["receptorPosition"]=r["xyz"]
    result.sort(key=lambda r:(r["type"],r["distance"],r["residue"]))
    return {"contacts":result[:2000],"truncated":len(result)>2000,"method":"geometry-v2: D–A ≤3.5 Å, H–A ≤2.5 Å, D–H–A ≥120°; PDBQT donor/acceptor types; nearest N/O/S–HD bond ≤1.35 Å. Hydrophobic carbons have only C/H covalent neighbors in the prepared OpenMM/RDKit topology. Carbon contacts ≤4 Å, nearest receptor atom per residue/ligand carbon. Review signals, not experimental or PLIP annotations."}
