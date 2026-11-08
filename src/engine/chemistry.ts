import type { Molecule, Bond, BondType } from "../types/chem";
export const bondOrder = (type: BondType): number =>
  ({ single: 1, double: 2, triple: 3, aromatic: 1.5 })[type] ?? 0;
export interface Neighbor {
  atomId: string;
  bond: Bond;
}
export function adjacency(m: Molecule) {
  const map = new Map<string, Neighbor[]>(m.atoms.map((a) => [a.id, []]));
  for (const b of m.bonds) {
    if (b.atomA !== b.atomB && map.has(b.atomA) && map.has(b.atomB)) {
      map.get(b.atomA)!.push({ atomId: b.atomB, bond: b });
      map.get(b.atomB)!.push({ atomId: b.atomA, bond: b });
    }
  }
  return map;
}
export function connectedComponents(m: Molecule) {
  const adj = adjacency(m),
    seen = new Set<string>();
  let n = 0;
  for (const a of m.atoms)
    if (!seen.has(a.id)) {
      n++;
      const stack = [a.id];
      seen.add(a.id);
      while (stack.length) {
        for (const next of adj.get(stack.pop()!) || [])
          if (!seen.has(next.atomId)) {
            seen.add(next.atomId);
            stack.push(next.atomId);
          }
      }
    }
  return n;
}
