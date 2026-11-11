import type { MoleculeVersion, SavedDescriptorAnalysis, SavedDrugLikenessAnalysis, SavedExtendedScreening } from "../workspace/types";
import { allRuleMethods as ruleMethods, type AnyScreening } from "./extendedRules";

const cell=(value:unknown)=>`"${(typeof value==="number"?String(value):String(value??"").replace(/^[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function screeningCsv(result:AnyScreening,context:{
  moleculeName:string;smiles:string;engine:string;
  versionId:string;versionNumber:number|string;resultId:string;descriptorResultId:string;createdAt:string;
}) {
  const rows:unknown[][]=[
    ["Molecule",context.moleculeName],["SMILES",context.smiles],["Structure version ID",context.versionId],["Structure version",context.versionNumber],
    ["Screening result ID",context.resultId],["Source descriptor result ID",context.descriptorResultId],["Recorded at",context.createdAt],["Descriptor engine",context.engine],
    ["Rules version",result.rulesVersion],["Applicability",result.reasons.length?result.reasons.join(" "):"Single neutral carbon-containing connected molecule"],
    ["Rule","Guideline outcome","Criterion violations","Property","Unrounded value","Minimum (inclusive)","Maximum (inclusive)","Unit","Criterion outcome","Source"],
  ];
  for(const rule of result.rules) for(const c of rule.criteria) rows.push([
    ruleMethods[rule.id].name,rule.status,rule.violations??"Not evaluable",c.label,c.value??"Not available","minimum" in c?c.minimum:"",c.maximum??"",c.unit,c.status,ruleMethods[rule.id].url,
  ]);
  rows.push(["Limitations","RDKit operational implementation of heuristic filters; not a probability, bioavailability score, safety assessment, or clinical prediction. Comparisons use unrounded values. No neutralization or fragment removal is performed."]);
  return "\ufeff"+rows.map(row=>row.map(cell).join(",")).join("\r\n");
}
export function savedScreeningCsv(result:SavedDrugLikenessAnalysis|SavedExtendedScreening,source:SavedDescriptorAnalysis,version:MoleculeVersion) {
  if(source.id!==result.descriptorResultId||source.versionId!==result.versionId||version.id!==result.versionId) throw new Error("The saved screening and its source structure do not match.");
  return screeningCsv(result.screening,{
    moleculeName:version.graph.metadata.name,smiles:source.descriptors.smiles,engine:result.engine,
    versionId:version.id,versionNumber:version.number,resultId:result.id,descriptorResultId:source.id,createdAt:result.createdAt,
  });
}
