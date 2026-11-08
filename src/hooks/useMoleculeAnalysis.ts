import { useMemo } from "react";
import { useMoleculeStore } from "../store/moleculeStore";
import { analyzeMolecule } from "../engine/analysis";
import type { Molecule } from "../models/Molecule";

/** Chemistry-only signature: dragging coordinates does not rerun analysis.
 * This memo is local to the hook, with no shared render-time mutation.
 */
export function useMoleculeAnalysis() {
  const m = useMoleculeStore((s) => s.molecule);
  const signature = useMemo(
    () =>
      JSON.stringify({
        version: 1,
        atoms: m.atoms.map((a) => ({ ...a, x: 0, y: 0 })),
        bonds: m.bonds,
        metadata: { name: "", createdAt: "", updatedAt: "" },
      }),
    [m],
  );
  return useMemo(
    () => analyzeMolecule(JSON.parse(signature) as Molecule),
    [signature],
  );
}
