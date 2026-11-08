import type { Molecule } from "../types/chem";
import { ELEMENTS, ISOTOPE_MASSES } from "../utils/elementData";
import { valenceMap } from "./valence";
export function molecularWeight(m: Molecule): number | null {
  const v = valenceMap(m);
  let total = 0;
  for (const a of m.atoms) {
    const weight = a.isotope
      ? ISOTOPE_MASSES[`${a.element}:${a.isotope}`]
      : ELEMENTS[a.element]?.weight;
    if (weight === undefined) return null;
    total += weight + v.get(a.id)!.implicitH * ELEMENTS.H.weight;
  }
  return total;
}
