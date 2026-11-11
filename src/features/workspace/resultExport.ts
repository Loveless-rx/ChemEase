import type { SavedDescriptorAnalysis, MoleculeVersion } from "./types";
// Quote cells and neutralize spreadsheet formulas in user-controlled text.
const cell=(v:unknown)=>`"${(typeof v==="number"?String(v):String(v).replace(/^[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function savedResultCsv(result:SavedDescriptorAnalysis,version:MoleculeVersion) {
  const d=result.descriptors;
  const rows:unknown[][]=[["Molecule",version.graph.metadata.name],["Version",version.number],["Version ID",version.id],["Analysis ID",result.id],["Calculated at",result.createdAt],["Engine",result.engine],["Method",result.method],["SMILES",d.smiles],["Formula",result.local.formula],["Molecular weight (g/mol)",d.weight],["LogP (Wildman–Crippen estimate)",d.logP],["TPSA (Å²)",d.tpsa],["HBD",d.donors],["HBA",d.acceptors],["Rotatable bonds (strict)",d.rotatable],["Molar refractivity (cm³/mol, estimate)",d.molarRefractivity],["Formal charge",d.charge],["Ring count",d.rings],["Heavy atoms",d.heavyAtoms],["Note","Stored result for this saved structure. LogD requires a separate entered pKa/pH estimate and is not included."]];
  return "\ufeff"+rows.map(r=>r.map(cell).join(",")).join("\r\n");
}
