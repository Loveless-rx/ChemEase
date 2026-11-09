import { useEffect, useMemo, useState } from "react";
import { useMoleculeStore } from "../store/moleculeStore";
import { analyzeMolecule } from "../engine/analysis";
import type { Molecule } from "../models/Molecule";
import { loadRDKit } from "../engine/rdkit";
import { calculateToolkit, type ToolkitResult } from "../engine/toolkit";

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
  const local = useMemo(
    () => analyzeMolecule(JSON.parse(signature) as Molecule),
    [signature],
  );
  const [state, setState] = useState<{key: string; data?: ToolkitResult; error?: string}>({key: ""});
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    if (!local.atoms) return;
    const timer = setTimeout(() => {
      loadRDKit().then(rdkit => calculateToolkit(rdkit, JSON.parse(signature) as Molecule))
        .then(data => { if (active) setState({key: signature, data}); })
        .catch((e: unknown) => { if (active) setState({key: signature, error: e instanceof Error ? e.message : "Could not calculate descriptors."}); });
    }, 150);
    return () => { active = false; clearTimeout(timer); };
  }, [signature, attempt, local.atoms]);
  const current = state.key === signature ? state : undefined;
  const data = current?.data;
  return {
    ...local,
    ...(data ? {smiles: data.smiles, smilesError: null, donors: data.donors, acceptors: data.acceptors, rotatable: data.rotatable, weight: data.weight, heavyAtoms: data.heavyAtoms} : {}),
    toolkit: data,
    toolkitError: current?.error,
    toolkitLoading: !!local.atoms && !current,
    retryToolkit: () => { setState({key: ""}); setAttempt(n => n + 1); },
  };
}
