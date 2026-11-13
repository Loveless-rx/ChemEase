"""Hydrophobic carbon selection from covalent topology, mapped to PDBQT IDs."""
import math
from .interactions import pdbqt_atoms
from .structures import atoms as pdb_atoms


def carbon_only_neighbors(elements, bonds):
    neighbors={i:set() for i in elements}
    for a,b in bonds:
        neighbors[a].add(b);neighbors[b].add(a)
    return {i for i,e in elements.items() if e=="C" and neighbors[i] and all(elements[n] in {"C","H"} for n in neighbors[i])}


def receptor_features(topology,pdbqt,prepared_pdb):
    rows=list(topology.atoms())
    elements={a.index:a.element.symbol if a.element else "?" for a in rows}
    eligible=carbon_only_neighbors(elements,[(a.index,b.index) for a,b in topology.bonds()])
    keys=set()
    written=pdb_atoms(prepared_pdb)
    if len(written)!=len(rows):raise ValueError("Prepared PDB and OpenMM topology atom counts differ.")
    for a,w in zip(rows,written):
        if a.index in eligible:
            # PDBFile can assign chain IDs to unnamed chains; use actual written IDs.
            keys.add((f"{w['chain']}:{w['resid']}:{w['resname']}",w["line"][12:16].strip()))
    atoms=pdbqt_atoms(pdbqt);by_key={(a["residue"],a["name"]):a for a in atoms if a["type"] in ("C","A")}
    if not keys.issubset(by_key):raise ValueError("Receptor topology-to-PDBQT feature mapping failed.")
    return {"method":"topology-carbon-v1","source":"OpenMM covalent topology; carbon bonded only to carbon/hydrogen", "hydrophobicSerials":sorted(by_key[key]["serial"] for key in keys)}


def ligand_features(molecule,pdbqt):
    eligible=carbon_only_neighbors({a.GetIdx():a.GetSymbol() for a in molecule.GetAtoms()},[(b.GetBeginAtomIdx(),b.GetEndAtomIdx()) for b in molecule.GetBonds()])
    carbons=[a for a in pdbqt_atoms(pdbqt) if a["type"] in ("C","A")]
    serials=[]
    for index in eligible:
        xyz=list(molecule.GetConformer().GetAtomPosition(index))
        matches=[a["serial"] for a in carbons if math.dist(xyz,a["xyz"])<=.002]
        if len(matches)!=1:raise ValueError("Ligand topology-to-PDBQT feature mapping is ambiguous.")
        serials.extend(matches)
    if len(set(serials))!=len(eligible):raise ValueError("Ligand feature mapping is not one-to-one.")
    return {"method":"topology-carbon-v1","source":"RDKit covalent topology; carbon bonded only to carbon/hydrogen","hydrophobicSerials":sorted(serials)}
