import type { SolubilityResult } from "./model";
import { esolSources, esolValidation, solubilityLimitations } from "./model";
const cell=(v:unknown)=>`"${(typeof v==="number"?String(v):String(v??"").replace(/^\s*[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function solubilityCsv(result:SolubilityResult,context:{name:string;versionId?:string;sourceId?:string;resultId?:string;createdAt?:string}) {
  const rows:unknown[][]=[["Molecule",context.name],["Version ID",context.versionId??"Unsaved live draft"],["Result ID",context.resultId??"Live prediction"],["Descriptor result ID",context.sourceId??"Live shared descriptors"],["Recorded at",context.createdAt??new Date().toISOString()],["Engine",result.engine],["Model",result.modelVersion],["Validation version",result.validationVersion],["Status",result.status],["Reason",result.reasons.join("; ")],["Reference-range check",result.rangeCheck],["Predicted logS (log10 mol/L)",result.logS??"Not evaluable"],["Predicted solubility (mol/L)",result.molPerL??"Not evaluable"],["Predicted solubility (g/L)",result.gPerL??"Not evaluable"]];
  for(const [key,value] of Object.entries(result.inputs??{}))rows.push([`Input ${key}`,value]);for(const [key,value] of Object.entries(result.contributions??{}))rows.push([`logS contribution ${key}`,value]);
  rows.push(["External validation count",esolValidation.count],["External RMSE (logS)",esolValidation.rmse],["External MAE (logS)",esolValidation.mae],["Interpretation",solubilityLimitations],["Paper",esolSources.paper],["Implementation",esolSources.implementation],["Validation dataset",esolSources.validation]);
  return "\ufeff"+rows.map(row=>row.map(cell).join(",")).join("\r\n");
}
