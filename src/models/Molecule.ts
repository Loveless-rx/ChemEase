import type { Atom } from "./Atom";
import type { Bond } from "./Bond";
export interface Molecule {
  version: 1;
  atoms: Atom[];
  bonds: Bond[];
  metadata: { name: string; createdAt: string; updatedAt: string };
}
export const emptyMolecule = (): Molecule => ({
  version: 1,
  atoms: [],
  bonds: [],
  metadata: {
    name: "Untitled molecule",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});
