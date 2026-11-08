import type { Molecule } from "../types/chem";
import { valenceMap } from "./valence";
export function composition(m: Molecule) {
  const v = valenceMap(m);
  const c: Record<string, number> = {};
  for (const a of m.atoms) {
    c[a.element] = (c[a.element] || 0) + 1;
    const h = v.get(a.id)!.implicitH;
    if (h) c.H = (c.H || 0) + h;
  }
  return c;
}
export function formulaFromComposition(c: Record<string, number>) {
  const keys = Object.keys(c)
    .filter((k) => c[k] > 0)
    .sort();
  const ordered = c.C
    ? [
        "C",
        ...(c.H ? ["H"] : []),
        ...keys.filter((k) => k !== "C" && k !== "H"),
      ]
    : keys;
  return ordered.map((k) => k + (c[k] === 1 ? "" : c[k])).join("");
}
export const molecularFormula = (m: Molecule) =>
  formulaFromComposition(composition(m));
