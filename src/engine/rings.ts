import type { Molecule, Atom, Bond } from "../types/chem";
import { adjacency, connectedComponents } from "./chemistry";
import { BOND_LENGTH } from "../utils/canvasConfig";
export function cycleRank(m: Molecule) {
  const ids = new Set(m.atoms.map((a) => a.id));
  return Math.max(
    0,
    m.bonds.filter(
      (b) => b.atomA !== b.atomB && ids.has(b.atomA) && ids.has(b.atomB),
    ).length -
      m.atoms.length +
      connectedComponents(m),
  );
}
export function aromaticCycleRank(m: Molecule) {
  const ids = new Set(m.atoms.filter((a) => a.aromatic).map((a) => a.id));
  return cycleRank({
    ...m,
    atoms: m.atoms.filter((a) => ids.has(a.id)),
    bonds: m.bonds.filter(
      (b) => b.type === "aromatic" && ids.has(b.atomA) && ids.has(b.atomB),
    ),
  });
}
export function ringBondIds(m: Molecule) {
  const adj = adjacency(m);
  const discovery = new Map<string, number>(),
    low = new Map<string, number>(),
    bridges = new Set<string>();
  let time = 0;
  function visit(id: string, parentBond?: string) {
    discovery.set(id, ++time);
    low.set(id, time);
    for (const n of adj.get(id) || []) {
      if (n.bond.id === parentBond) continue;
      if (!discovery.has(n.atomId)) {
        visit(n.atomId, n.bond.id);
        low.set(id, Math.min(low.get(id)!, low.get(n.atomId)!));
        if (low.get(n.atomId)! > discovery.get(id)!) bridges.add(n.bond.id);
      } else low.set(id, Math.min(low.get(id)!, discovery.get(n.atomId)!));
    }
  }
  for (const a of m.atoms) if (!discovery.has(a.id)) visit(a.id);
  return new Set(m.bonds.filter((b) => !bridges.has(b.id)).map((b) => b.id));
}
export function makeRing(x: number, y: number, size: 5 | 6, aromatic = false) {
  const radius = BOND_LENGTH / (2 * Math.sin(Math.PI / size));
  const atoms: Atom[] = Array.from({ length: size }, (_, i) => ({
    id: crypto.randomUUID(),
    element: "C",
    x: x + radius * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / size),
    y: y + radius * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / size),
    charge: 0,
    aromatic,
    lonePairs: 0,
  }));
  const bonds: Bond[] = atoms.map((a, i) => ({
    id: crypto.randomUUID(),
    atomA: a.id,
    atomB: atoms[(i + 1) % size].id,
    type: aromatic ? "aromatic" : "single",
  }));
  return { atoms, bonds };
}
