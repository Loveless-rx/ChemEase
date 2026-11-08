import type { Molecule } from "../types/chem";
import type { Warning } from "../types/analysis";
import { valenceMap } from "./valence";
import { ELEMENTS, ISOTOPE_MASSES } from "../utils/elementData";
import { adjacency } from "./chemistry";
import { ringBondIds } from "./rings";
export function validateMolecule(m: Molecule): Warning[] {
  const warnings: Warning[] = [];
  const vals = valenceMap(m),
    adj = adjacency(m),
    ids = new Set(m.atoms.map((a) => a.id));
  const pairs = new Set<string>();
  for (const b of m.bonds) {
    if (!ids.has(b.atomA) || !ids.has(b.atomB) || b.atomA === b.atomB)
      warnings.push({ severity: "error", message: "Invalid bond reference." });
    const key = [b.atomA, b.atomB].sort().join("|");
    if (pairs.has(key))
      warnings.push({
        severity: "error",
        message: "Duplicate bond between atoms.",
      });
    pairs.add(key);
  }
  const ringEdges = ringBondIds(m);
  for (const a of m.atoms) {
    const v = vals.get(a.id)!,
      label = ELEMENTS[a.element]?.name || a.element;
    const add = (message: string, severity: "warning" | "error" = "warning") =>
      warnings.push({ atomId: a.id, message, severity });
    if (!ELEMENTS[a.element])
      add(
        a.element === "R"
          ? "R-group is unspecified; formula and mass are incomplete."
          : "Unrecognized element; chemistry is incomplete.",
      );
    else if (v.unsupported)
      add(`${label}: unsupported charge / valence state.`);
    if (v.over)
      add(
        `${label} exceeds typical valence (${v.used} bond order; ${v.implicitH} implicit H).`,
      );
    if (a.hydrogenOverride !== undefined && a.hydrogenOverride > 8)
      add("Unusual explicit hydrogen override.");
    if (
      ELEMENTS[a.element] &&
      !ELEMENTS[a.element].implicit &&
      a.element !== "H"
    )
      add(`${label}: metal bonding is not modeled; implicit H is disabled.`);
    const es = adj.get(a.id) || [];
    if (a.aromatic) {
      const aromatic = es.filter((e) => e.bond.type === "aromatic");
      if (
        aromatic.length < 2 ||
        aromatic.some((e) => !ringEdges.has(e.bond.id))
      )
        add("Incomplete aromatic system; use a closed aromatic ring.");
      if (!["C", "N", "O", "P", "S", "B"].includes(a.element))
        add("Unsupported aromatic element.");
      if (a.charge !== 0)
        add("Charged aromatic states require toolkit verification.");
    }
    if (es.some((e) => e.bond.type === "aromatic") && !a.aromatic)
      add("Aromatic bond endpoint is not marked aromatic.", "error");
    if (a.isotope && !ISOTOPE_MASSES[`${a.element}:${a.isotope}`])
      add("Isotope mass unavailable; molecular weight is not reported.");
    if (a.stereo) add("Stereochemistry is stored but not interpreted.");
    if (a.lonePairs > 0)
      add(
        "Lone pairs are visual annotations; electron counting is not validated.",
      );
  }
  if (m.bonds.some((b) => b.stereo))
    warnings.push({
      severity: "warning",
      message: "Bond stereochemistry is stored but not interpreted.",
    });
  return warnings;
}
