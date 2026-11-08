import type { Molecule } from "../types/chem";
import type { Analysis } from "../types/analysis";
import { composition, formulaFromComposition } from "./formula";
import { molecularWeight } from "./molecularWeight";
import { valenceMap } from "./valence";
import { validateMolecule } from "./validation";
import { generateSmiles } from "./smiles";
import { cycleRank, aromaticCycleRank, ringBondIds } from "./rings";
import { adjacency, connectedComponents } from "./chemistry";
export function analyzeMolecule(m: Molecule): Analysis {
  const c = composition(m),
    v = valenceMap(m),
    adj = adjacency(m),
    atoms = new Map(m.atoms.map((a) => [a.id, a])),
    rings = ringBondIds(m),
    warnings = validateMolecule(m),
    smiles = generateSmiles(m);
  const hydrogen = (id: string) =>
    (v.get(id)?.implicitH || 0) +
    (adj.get(id) || []).filter((n) => atoms.get(n.atomId)?.element === "H")
      .length;
  const carbonyl = (id: string) =>
    (adj.get(id) || []).some(
      (n) => n.bond.type === "double" && atoms.get(n.atomId)?.element === "O",
    );
  const amide = (id: string) =>
    (adj.get(id) || []).some(
      (n) => atoms.get(n.atomId)?.element === "C" && carbonyl(n.atomId),
    );
  const heavyDegree = (id: string) =>
    (adj.get(id) || []).filter((n) => atoms.get(n.atomId)?.element !== "H")
      .length;
  const descriptorSupported =
    !warnings.some(
      (w) =>
        w.severity === "error" ||
        /exceeds|unsupported|Unrecognized|Incomplete aromatic|Charged aromatic|R-group/.test(
          w.message,
        ),
    ) &&
    m.atoms.every((a) =>
      ["C", "H", "N", "O", "F", "Cl", "Br", "I"].includes(a.element),
    );
  const donors = descriptorSupported
    ? m.atoms.filter(
        (a) => ["N", "O"].includes(a.element) && hydrogen(a.id) > 0,
      ).length
    : null;
  const acceptors = descriptorSupported
    ? m.atoms.filter((a) => {
        if (a.charge > 0) return false;
        if (a.element === "O") {
          return !(hydrogen(a.id) > 0 && amide(a.id));
        }
        if (a.element === "N")
          return !(amide(a.id) || (a.aromatic && hydrogen(a.id) > 0));
        return false;
      }).length
    : null;
  const rotatable = descriptorSupported
    ? m.bonds.filter((b) => {
        const a = atoms.get(b.atomA),
          d = atoms.get(b.atomB);
        if (!a || !d) return false;
        return (
          b.type === "single" &&
          !rings.has(b.id) &&
          a.element !== "H" &&
          d.element !== "H" &&
          heavyDegree(a.id) > 1 &&
          heavyDegree(d.id) > 1 &&
          !(
            (a.element === "N" && carbonyl(d.id)) ||
            (d.element === "N" && carbonyl(a.id))
          )
        );
      }).length
    : null;
  return {
    formula: formulaFromComposition(c),
    composition: c,
    weight: molecularWeight(m),
    atoms: m.atoms.length,
    heavyAtoms: m.atoms.filter((a) => a.element !== "H" && a.element !== "R")
      .length,
    totalAtoms: Object.values(c).reduce((a, b) => a + b, 0),
    implicitH: [...v.values()].reduce((sum, a) => sum + a.implicitH, 0),
    bonds: m.bonds.length,
    rings: cycleRank(m),
    aromaticRings: aromaticCycleRank(m),
    charge: m.atoms.reduce((sum, a) => sum + a.charge, 0),
    donors,
    acceptors,
    rotatable,
    warnings,
    smiles: smiles.smiles,
    smilesError: smiles.error,
    components: connectedComponents(m),
  };
}
