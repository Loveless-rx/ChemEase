import math
from collections import defaultdict

AMINO = set("ALA ARG ASN ASP CYS GLN GLU GLY HIS ILE LEU LYS MET PHE PRO SER THR TRP TYR VAL MSE".split())


def atoms(text):
    selected = {}
    for index, line in enumerate(text.lstrip("\ufeff").splitlines()):
        if line.startswith("ENDMDL"):
            break
        if not line.startswith(("ATOM  ", "HETATM")):
            continue
        if len(line) < 54:
            raise ValueError("Truncated PDB atom record.")
        xyz = [float(line[start:start+8]) for start in (30, 38, 46)]
        if not all(math.isfinite(v) and abs(v) < 10000 for v in xyz):
            raise ValueError("Nonfinite or out-of-range PDB coordinates.")
        chain, resname = line[21:22].strip() or "_", line[17:20].strip()
        key = (chain, line[22:27], resname, line[12:16])
        occupancy = float(line[54:60].strip() or "0")
        if not math.isfinite(occupancy):
            raise ValueError("Invalid PDB occupancy.")
        item = {"line": line[:16]+" "+line[17:], "index": index, "occupancy": occupancy, "xyz": xyz, "chain": chain, "resname": resname, "resid": line[22:27].strip(), "element": (line[76:78].strip() if len(line) >= 78 else "") or line[12:16].strip()[0], "protein": resname in AMINO and (line.startswith("ATOM") or resname == "MSE")}
        if key not in selected or occupancy > selected[key]["occupancy"]:
            selected[key] = item
    result = sorted(selected.values(), key=lambda a: a["index"])
    if not result or len(result) > 60000:
        raise ValueError("Use a PDB with 1 to 60,000 atoms in the first model.")
    return result


def bounds(points):
    low = [min(p[i] for p in points) for i in range(3)]
    high = [max(p[i] for p in points) for i in range(3)]
    return {"min": dict(zip("xyz", low)), "max": dict(zip("xyz", high)), "center": dict(zip("xyz", [(a+b)/2 for a,b in zip(low,high)]))}


def inspect_pdb(text):
    rows = atoms(text)
    protein = [a for a in rows if a["protein"]]
    if len(protein) < 20:
        raise ValueError("No supported protein chain found. Provide an experimental protein PDB, not a ligand-only file.")
    chains = [{"id": chain, "atoms": sum(a["chain"] == chain for a in protein)} for chain in sorted({a["chain"] for a in protein})]
    groups = defaultdict(list)
    for a in rows:
        if not a["protein"] and a["element"] != "H":
            groups[(a["chain"], a["resid"], a["resname"])].append(a)
    sites = []
    removed = []
    for (chain, resid, name), group in groups.items():
        removed.append({"chain": chain, "resid": resid, "name": name, "atoms": len(group)})
        if 4 <= len(group) <= 150 and name not in ("HOH", "WAT", "DOD"):
            b = bounds([a["xyz"] for a in group])
            sites.append({"id": f"{chain}:{resid}:{name}", "label": f"{name} · chain {chain} · residue {resid}", "chain": chain, "center": b["center"], "size": {axis: max(12, b["max"][axis]-b["min"][axis]+10) for axis in "xyz"}})
    return {"atoms": len(rows), "chains": chains, "sites": sites, "nonProtein": removed[:500], "nonProteinCount": len(groups), "bounds": bounds([a["xyz"] for a in protein]), "warnings": ["First PDB model only. Alternate atom locations use highest occupancy; ties retain the first record.", "Co-crystal ligands suggest box locations only; they do not identify a biologically validated binding site."]}


def clean_pdb(text, chains):
    rows = atoms(text)
    unknown = {a["resname"] for a in rows if a["line"].startswith("ATOM") and not a["protein"] and a["chain"] in chains}
    if unknown:
        raise ValueError("Unsupported protein residues: "+", ".join(sorted(unknown))+". Resolve these before docking.")
    kept = [a for a in rows if a["protein"] and a["chain"] in chains]
    if len(kept) < 20:
        raise ValueError("Selected chains have too few protein atoms.")
    sequences=[line for line in text.splitlines() if line.startswith("SEQRES") and (line[11:12].strip() or "_") in chains]
    return "\n".join(sequences+[a["line"] for a in kept])+"\nEND\n"
