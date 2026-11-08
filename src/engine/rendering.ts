import type { Atom, Molecule, Bond } from "../types/chem";
import { clippedLine } from "./geometry";
import { valenceMap } from "./valence";
import { adjacency } from "./chemistry";
export interface RenderOptions {
  showCarbons: boolean;
  showHydrogens: boolean;
  dark: boolean;
}
export function atomLabel(a: Atom, degree: number, showCarbons = false) {
  return (
    a.element !== "C" ||
    showCarbons ||
    degree === 0 ||
    a.charge !== 0 ||
    !!a.isotope
  );
}
export function bondSegments(
  b: Bond,
  a: Atom,
  d: Atom,
  labelA: boolean,
  labelB: boolean,
) {
  const p = clippedLine(a, d, labelA ? 18 : 0, labelB ? 18 : 0);
  const offsets =
    b.type === "double"
      ? [-2.7, 2.7]
      : b.type === "triple"
        ? [-4.5, 0, 4.5]
        : b.type === "aromatic"
          ? [0, 6]
          : [0];
  return offsets.map((offset, i) => ({
    x1: p.x1 + p.nx * offset,
    y1: p.y1 + p.ny * offset,
    x2: p.x2 + p.nx * offset,
    y2: p.y2 + p.ny * offset,
    dashed: b.type === "aromatic" && i === 1,
  }));
}
export function renderContext(m: Molecule) {
  return {
    valences: valenceMap(m),
    adj: adjacency(m),
    atomMap: new Map(m.atoms.map((a) => [a.id, a])),
  };
}
