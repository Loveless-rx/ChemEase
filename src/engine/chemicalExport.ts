import type { Molecule } from "../models/Molecule";
import { loadRDKit } from "./rdkit";
import { buildChemicalFile, type ChemicalFormat, type LogDInputs } from "./chemicalFiles";
import { downloadBlob } from "./export";
export async function exportChemistry(m: Molecule, format: ChemicalFormat, logD?: LogDInputs) {
  const rdkit = await loadRDKit();
  const name = m.metadata.name.replace(/[^a-z0-9_-]+/gi, "-").toLowerCase() || "molecule";
  const file = buildChemicalFile(rdkit, m, format, logD);
  downloadBlob(new Blob([file.text], {type: file.mime}), `${name}.${format}`);
}
