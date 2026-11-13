import { hepaticRows, hepaticSources, type HepaticResult } from "./model";
const cell = (v: string) => `"${v.replace(/^\s*[=+@-]/, "'$&").replaceAll('"', '""')}"`;
export function hepaticCsv(p: HepaticResult, context: { name: string; versionId?: string; resultId?: string; createdAt?: string }) {
  const rows = [["Molecule", context.name], ["Version ID", context.versionId ?? "Live draft"], ["Hepatic result ID", context.resultId ?? "Live prediction"], ["Recorded at", context.createdAt ?? new Date().toISOString()], ["Structure key", p.structureKey], ["Descriptor inputs", "None; compound identity only. All pharmacokinetic inputs are entered."], ...hepaticRows(p), ...Object.entries(hepaticSources)];
  return "\ufeff" + rows.map(row => row.map(cell).join(",")).join("\r\n");
}
