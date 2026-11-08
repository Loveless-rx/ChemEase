import { emptyMolecule } from "../models/Molecule";
import { makeRing } from "./rings";
import type { Molecule } from "../types/chem";
export function template(name: "benzene" | "ethanol" | "aspirin"): Molecule {
  const m = emptyMolecule();
  m.metadata.name =
    name === "benzene" ? "Benzene" : name === "ethanol" ? "Ethanol" : "Aspirin";
  const add = (element: string, x: number, y: number) => {
    const a = {
      id: crypto.randomUUID(),
      element,
      x,
      y,
      charge: 0,
      aromatic: false,
      lonePairs: 0,
    };
    m.atoms.push(a);
    return a.id;
  };
  const bond = (a: string, b: string, type: "single" | "double" = "single") =>
    m.bonds.push({ id: crypto.randomUUID(), atomA: a, atomB: b, type });
  if (name === "ethanol") {
    const a = add("C", -65, 20),
      b = add("C", 0, -16),
      c = add("O", 65, 20);
    bond(a, b);
    bond(b, c);
    return m;
  }
  const r = makeRing(0, 0, 6, true);
  m.atoms.push(...r.atoms);
  m.bonds.push(...r.bonds);
  if (name === "aspirin") {
    const a = r.atoms[1],
      b = r.atoms[2];
    const carbon = add("C", a.x + 64, a.y - 32),
      o = add("O", a.x + 64, a.y - 96),
      oh = add("O", a.x + 120, a.y);
    bond(a.id, carbon);
    bond(carbon, o, "double");
    bond(carbon, oh);
    const ester = add("O", b.x + 56, b.y + 32),
      cc = add("C", b.x + 112, b.y + 64),
      oo = add("O", b.x + 112, b.y + 128),
      methyl = add("C", b.x + 168, b.y + 32);
    bond(b.id, ester);
    bond(ester, cc);
    bond(cc, oo, "double");
    bond(cc, methyl);
  }
  return m;
}
