import { emptyMolecule } from "../models/Molecule";
// Bridge for the uploaded editor's numeric-ID {atoms,bonds} snapshots.
// All output passes through the regular schema validator before it is used.
export function convertLegacySnapshot(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const input = value as Record<string, unknown>;
  if (
    input.version !== undefined ||
    !Array.isArray(input.atoms) ||
    !Array.isArray(input.bonds)
  )
    return value;
  const atoms = input.atoms as Record<string, unknown>[];
  const bonds = input.bonds as Record<string, unknown>[];
  if (
    !atoms.every(
      (a) => a && typeof a.id === "number" && Number.isSafeInteger(a.id),
    ) ||
    !bonds.every(
      (b) => b && typeof b.id === "number" && Number.isSafeInteger(b.id),
    )
  )
    throw new Error("Unrecognized legacy molecule format.");
  const aromatic = new Set<number>();
  for (const b of bonds)
    if (b.type === "aromatic") {
      aromatic.add(b.atomA as number);
      aromatic.add(b.atomB as number);
    }
  return {
    ...emptyMolecule(),
    atoms: atoms.map((a) => ({
      ...a,
      id: `legacy-atom-${a.id}`,
      charge: a.charge ?? 0,
      aromatic: aromatic.has(a.id as number),
      lonePairs: 0,
    })),
    bonds: bonds.map((b) => ({
      ...b,
      id: `legacy-bond-${b.id}`,
      atomA: `legacy-atom-${b.atomA}`,
      atomB: `legacy-atom-${b.atomB}`,
    })),
    metadata: { ...emptyMolecule().metadata, name: "Imported legacy molecule" },
  };
}
