import type { AlertResult } from "./analysis";
import { alertSets } from "./analysis";
import { alertPatterns } from "./catalog";
const cell=(v:unknown)=>`"${(typeof v==="number"?String(v):String(v??"").replace(/^[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function alertsCsv(result:AlertResult,context:{name:string;versionId:string;versionNumber:number|string;resultId:string;createdAt:string}) {
  const rows:unknown[][]=[["Molecule",context.name],["Structure version ID",context.versionId],["Version",context.versionNumber],["Result ID",context.resultId],["Recorded at",context.createdAt],["Method","structural-alerts-v1"],["Engine",result.engine],["Catalog",result.catalogVersion],["Status",result.status],["Reason",result.reason],["Canonical SMILES",result.smiles],["Patterns scanned",result.scannedPatterns],["Total patterns",result.totalPatterns],
    ["Alert patterns matched",result.status==="complete"?result.matches.length:"Not evaluable"],["Pattern ID","Set","Original name","SMARTS","Mapped matches shown","Capped","Editor atom IDs","Editor bond IDs","Reference"]];
  for(const match of result.matches){const pattern=alertPatterns.find(p=>p.id===match.patternId)!;rows.push([pattern.id,pattern.set,pattern.name,pattern.smarts,match.occurrences,match.truncated,match.atomIds.join(" "),match.bondIds.join(" "),alertSets[pattern.set].url]);}
  rows.push(["Interpretation","Catalog matches are review signals, not evidence of toxicity, assay interference or inactivity. No match does not establish safety. All 585 definitions are screened; mapped occurrences are capped at 128 per pattern. No fragment removal or charge normalization is performed."]);
  return "\ufeff"+rows.map(r=>r.map(cell).join(",")).join("\r\n");
}
