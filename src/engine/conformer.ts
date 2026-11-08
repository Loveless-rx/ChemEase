import type { Molecule } from "../models/Molecule";
import { generateSmiles } from "./smiles";
import { validateMolecule } from "./validation";
import { connectedComponents } from "./chemistry";

/** Restrict lookup to structures our current serializer can represent faithfully. */
export function conformerQuery(m: Molecule): string {
  if (!m.atoms.length) throw new Error("Draw a molecule first.");
  if (m.atoms.length > 200) throw new Error("3D lookup is limited to 200 drawn atoms.");
  if (connectedComponents(m) !== 1) throw new Error("3D lookup supports one connected molecule at a time.");
  if (m.atoms.some(a => a.element === "R")) throw new Error("Replace unspecified R-groups before 3D lookup.");
  if (m.atoms.some(a => a.stereo) || m.bonds.some(b => b.stereo))
    throw new Error("The current SMILES exporter cannot preserve stereochemistry. 3D lookup is disabled for stereo annotations.");
  const warnings = validateMolecule(m);
  if (warnings.length) throw new Error("Resolve chemistry warnings before 3D lookup.");
  const result = generateSmiles(m);
  if (result.error || !result.smiles) throw new Error(result.error || "SMILES is unavailable.");
  return result.smiles;
}

export async function fetchConformer(smiles: string, signal?: AbortSignal): Promise<string> {
  // POST keeps special SMILES characters out of URL paths. Nothing is sent until requested.
  const response = await fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/SDF?record_type=3d", {
    method: "POST",
    body: new URLSearchParams({ smiles }),
    signal,
  });
  if (!response.ok) {
    if (response.status === 404 || response.status === 400)
      throw new Error("PubChem has no matching 3D conformer for this structure. This does not mean your drawing is invalid.");
    if (response.status === 429 || response.status === 503)
      throw new Error("PubChem is busy. Please retry in a moment.");
    throw new Error(`3D lookup failed (HTTP ${response.status}). Please retry.`);
  }
  const sdf = await response.text();
  if (sdf.length > 2_000_000 || !sdf.includes("M  END"))
    throw new Error("The service returned an unsupported structure file.");
  return sdf;
}
