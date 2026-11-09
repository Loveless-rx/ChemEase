import type { Atom, Molecule } from "../types/chem";
import { ELEMENTS } from "../utils/elementData";
import { adjacency, bondOrder, type Neighbor } from "./chemistry";
export interface ValenceInfo {
  used: number;
  target: number | null;
  implicitH: number;
  over: boolean;
  unsupported: boolean;
  allowed: number[];
}
export function atomValence(
  a: Atom,
  m: Molecule,
  neighbors?: Neighbor[],
): ValenceInfo {
  const es = neighbors || adjacency(m).get(a.id) || [];
  const used = es.reduce((n, e) => n + bondOrder(e.bond.type), 0);
  const data = ELEMENTS[a.element];
  let allowed = data?.valences || [];
  let unsupported = !data;
  if (a.charge !== 0) {
    if (a.element === "C" && Math.abs(a.charge) === 1) allowed = [3];
    else if (a.element === "N" && a.charge === 1) allowed = [4];
    else if (a.element === "N" && a.charge === -1) allowed = [2];
    else if (a.element === "O" && a.charge === 1) allowed = [3];
    else if (a.element === "O" && a.charge === -1) allowed = [1];
    else if (a.element === "B" && a.charge === -1) allowed = [4];
    else if (["F", "Cl", "Br", "I", "H"].includes(a.element) && a.charge === -1)
      allowed = [0];
    else if (a.element === "H" && a.charge === 1) allowed = [0];
    else if (!data?.implicit) allowed = data?.valences || [];
    else unsupported = true;
  }
  const arom = es.filter((e) => e.bond.type === "aromatic").length;
  // Aromatic heteroatom hydrogens require an explicit override; pyridine-like n is default.
  let implicitH = 0;
  const target = allowed.find((v) => v >= used) ?? allowed.at(-1) ?? null;
  if (data?.implicit && !unsupported) {
    if (a.aromatic && arom) {
      if (a.element === "C") implicitH = Math.max(0, Math.floor(3 - es.length));
      else implicitH = 0;
    } else implicitH = Math.max(0, Math.floor((target ?? used) - used));
  }
  if (a.hydrogenOverride !== undefined) implicitH = a.hydrogenOverride;
  const specialAromatic =
    a.aromatic && arom >= 2 && ["C", "N", "O", "S", "P", "B"].includes(a.element);
  const effective = specialAromatic
    ? es.reduce(
        (n, e) => n + (e.bond.type === "aromatic" ? 1 : bondOrder(e.bond.type)),
        0,
      )
    : used;
  const over =
    target !== null && effective + implicitH > Math.max(...allowed) + 0.01;
  return { used, target, implicitH, over, unsupported, allowed };
}
export function valenceMap(m: Molecule) {
  const adj = adjacency(m);
  return new Map(m.atoms.map((a) => [a.id, atomValence(a, m, adj.get(a.id))]));
}
