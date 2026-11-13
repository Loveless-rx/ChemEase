import type { WorkspaceData, MoleculeVersion, SavedDescriptorAnalysis } from "../workspace/types";
import { allRuleMethods } from "../drugLikeness/extendedRules";
import { statusLabels } from "../drugLikeness/rules";
import { alertPatterns } from "../medicinalChemistry/catalog";
import { plotProperties, type PlotProperty } from "../visualizations/model";

import { hepaticRows } from "../hepatic/model";
export const MAX_COMPARISON=6;
export interface ComparisonSelection {versionId:string;sourceId?:string}
export interface ComparisonColumn {
  version:MoleculeVersion;project:string;sources:SavedDescriptorAnalysis[];source?:SavedDescriptorAnalysis;
  screening?:Extract<WorkspaceData["results"][number],{method:"drug-likeness-v1"|"drug-likeness-v2"}>;
  alerts?:Extract<WorkspaceData["results"][number],{method:"structural-alerts-v1"}>;
  solubility?:Extract<WorkspaceData["results"][number],{method:"esol-rdkit-v1"}>;
  hepatic?:Extract<WorkspaceData["results"][number],{method:"hepatic-well-stirred-v1"}>;
  skin?:Extract<WorkspaceData["results"][number],{method:"skin-pg-cdc-v1"}>;
}
const latest=<T extends {id:string;createdAt:string}>(rows:T[])=>[...rows].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||a.id.localeCompare(b.id));
export function comparisonColumns(data:WorkspaceData,selections:ComparisonSelection[]):ComparisonColumn[] {
  if(selections.length>MAX_COMPARISON)throw new Error(`Compare up to ${MAX_COMPARISON} saved versions at a time.`);
  if(new Set(selections.map(s=>s.versionId)).size!==selections.length)throw new Error("Choose each saved version only once.");
  return selections.map(selection=>{
    const version=data.versions.find(v=>v.id===selection.versionId);
    if(!version)throw new Error("A selected version is no longer in this workspace. Remove it and select again.");
    const record=data.molecules.find(m=>m.id===version.moleculeId);
    const sources=latest(data.results.filter((r):r is SavedDescriptorAnalysis=>r.method==="rdkit-descriptors-v1"&&r.versionId===version.id&&r.structureKey===version.structureKey));
    const source=selection.sourceId?sources.find(r=>r.id===selection.sourceId):sources[0];
    if(selection.sourceId&&!source)throw new Error("The selected descriptor result does not belong to this version.");
    const screening=source?latest(data.results.filter((r):r is NonNullable<ComparisonColumn["screening"]>=>(r.method==="drug-likeness-v1"||r.method==="drug-likeness-v2")&&r.descriptorResultId===source.id&&r.versionId===version.id&&r.structureKey===version.structureKey&&r.engine===source.engine))[0]:undefined;
    const alerts=latest(data.results.filter((r):r is NonNullable<ComparisonColumn["alerts"]>=>r.method==="structural-alerts-v1"&&r.versionId===version.id&&r.structureKey===version.structureKey))[0];
    const solubility=source?latest(data.results.filter((r):r is NonNullable<ComparisonColumn["solubility"]>=>r.method==="esol-rdkit-v1"&&r.descriptorResultId===source.id&&r.versionId===version.id&&r.structureKey===version.structureKey&&r.engine===source.engine))[0]:undefined;
    const skin=source?latest(data.results.filter((r):r is NonNullable<ComparisonColumn["skin"]>=>r.method==="skin-pg-cdc-v1"&&r.descriptorResultId===source.id&&r.versionId===version.id&&r.structureKey===version.structureKey&&r.engine===source.engine))[0]:undefined;
    const hepatic=latest(data.results.filter((r):r is NonNullable<ComparisonColumn["hepatic"]>=>r.method==="hepatic-well-stirred-v1"&&r.versionId===version.id&&r.structureKey===version.structureKey))[0];
    return {version,project:data.projects.find(p=>p.id===record?.projectId)?.name??"Saved project",sources,source,screening,alerts,solubility,skin,hepatic};
  });
}
export const comparisonProperties={
  weight:{label:"Molecular weight",unit:"g/mol"},logP:{label:"LogP · Wildman–Crippen estimate",unit:""},tpsa:{label:"TPSA",unit:"Å²"},
  donors:{label:"Hydrogen bond donors",unit:""},acceptors:{label:"Hydrogen bond acceptors",unit:""},rotatable:{label:"Rotatable bonds · strict",unit:""},
  molarRefractivity:{label:"Molar refractivity · estimate",unit:"cm³/mol"},charge:{label:"Formal charge",unit:""},rings:{label:"Ring count · RDKit",unit:""},heavyAtoms:{label:"Heavy atom count",unit:""},
} as const;
export type ComparisonProperty=keyof typeof comparisonProperties;
export function descriptorValue(column:ComparisonColumn,key:ComparisonProperty):number|undefined {
  const value=column.source?.descriptors[key];return typeof value==="number"&&Number.isFinite(value)?value:undefined;
}
export function ruleText(column:ComparisonColumn,id:keyof typeof allRuleMethods) {
  const rule=column.screening?.screening.rules.find(r=>r.id===id);
  return !rule?"Not calculated":rule.violations===null?statusLabels[rule.status]:`${statusLabels[rule.status]} · ${rule.violations} ${rule.violations===1?"violation":"violations"}`;
}
export function alertText(column:ComparisonColumn,set:"PAINS"|"Brenk") {
  const result=column.alerts?.alerts;
  if(!result)return "Not calculated";
  if(result.status!=="complete")return `Not evaluable: ${result.reason}`;
  return `${result.matches.filter(m=>alertPatterns.find(p=>p.id===m.patternId)?.set===(set==="Brenk"?"BRENK":set)).length} matched patterns`;
}
const cell=(value:unknown)=>`"${(typeof value==="number"?String(value):String(value??"").replace(/^\s*[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function solubilityText(column:ComparisonColumn){const prediction=column.solubility?.prediction;return !prediction?"Not calculated":prediction.status!=="predicted"?`Not evaluable: ${prediction.reasons.join("; ")}`:`${prediction.logS} log10 mol/L`;}
export function skinText(column:ComparisonColumn){const p=column.skin?.prediction;return !p?"Not calculated":p.status!=="predicted"?`Not evaluable: ${p.reasons.join("; ")}`:`${p.logKpCmHour} log10 Kp (cm/h); entered LogKow ${p.settings.logKow} (${p.settings.evidence})`;}
export function hepaticText(c:ComparisonColumn){const p=c.hepatic?.prediction;return !p?"Not calculated":p.status!=="predicted"?`Not evaluable: ${p.reasons.join("; ")}`:`${p.clearance} L/h; ${p.settings.context} (${p.settings.evidence})`;}
export function comparisonCsv(columns:ComparisonColumn[]) {
  const row=(label:string,values:unknown[])=>[label,...values];
  const rows:unknown[][]=[row("Molecule",columns.map(c=>c.version.graph.metadata.name)),row("Project",columns.map(c=>c.project)),row("Saved version",columns.map(c=>c.version.number)),row("Version ID",columns.map(c=>c.version.id)),row("Descriptor result ID",columns.map(c=>c.source?.id??"Not calculated")),row("Descriptor method",columns.map(c=>c.source?.method??"Not calculated")),row("Descriptor engine",columns.map(c=>c.source?.engine??"Not calculated")),row("Descriptor calculated at",columns.map(c=>c.source?.createdAt??"Not calculated")),row("SMILES",columns.map(c=>c.source?.descriptors.smiles??"Not calculated")),row("Formula",columns.map(c=>c.source?.local.formula??"Not calculated"))];
  for(const [key,p] of Object.entries(comparisonProperties))rows.push(row(`${p.label}${p.unit?` (${p.unit})`:""}`,columns.map(c=>descriptorValue(c,key as ComparisonProperty)??"Not calculated")));
  for(const [id,rule] of Object.entries(allRuleMethods))rows.push(row(rule.name,columns.map(c=>ruleText(c,id as keyof typeof allRuleMethods))));
  rows.push(row("Screening result ID",columns.map(c=>c.screening?.id??"Not calculated")),row("Screening method",columns.map(c=>c.screening?.method??"Not calculated")),row("Screening rules version",columns.map(c=>c.screening?.screening.rulesVersion??"Not calculated")),row("Screening saved at",columns.map(c=>c.screening?.createdAt??"Not calculated")));
  for(const set of ["PAINS","Brenk"] as const)rows.push(row(set,columns.map(c=>alertText(c,set))));
  rows.push(row("Alert result ID",columns.map(c=>c.alerts?.id??"Not calculated")),row("Alert method",columns.map(c=>c.alerts?.method??"Not calculated")),row("Alert catalog",columns.map(c=>c.alerts?.alerts.catalogVersion??"Not calculated")),row("Alert engine",columns.map(c=>c.alerts?.engine??"Not calculated")),row("Alerts saved at",columns.map(c=>c.alerts?.createdAt??"Not calculated")),["Interpretation","Stored results only. No recalculation. Rules and alerts are review signals, not efficacy or safety predictions. LogD and other ADMET endpoints are not included. Skin permeability uses entered neutral LogKow and the Potts–Guy aqueous-vehicle model; it is not absorption percentage or a safety prediction. Solubility is an ESOL model prediction, separate from descriptors and heuristic screens. Mixed engines may not be directly comparable."]);
  rows.push(row("Predicted aqueous logS (log10 mol/L)",columns.map(c=>solubilityText(c))),row("Solubility result ID",columns.map(c=>c.solubility?.id??"Not calculated")),row("Solubility model",columns.map(c=>c.solubility?.prediction.modelVersion??"Not calculated")),row("Solubility saved at",columns.map(c=>c.solubility?.createdAt??"Not calculated")));
  rows.push(row("Skin permeability",columns.map(skinText)),row("Skin result ID",columns.map(c=>c.skin?.id??"Not calculated")),row("Skin model",columns.map(c=>c.skin?.prediction.modelVersion??"Not calculated")),row("Skin engine",columns.map(c=>c.skin?.engine??"Not calculated")),row("Skin saved at",columns.map(c=>c.skin?.createdAt??"Not calculated")),row("Skin LogKow source",columns.map(c=>c.skin?.prediction.settings.source??"Not calculated")));
  for(const [label,key] of [["Skin predicted log10 Kp (cm/h)","logKpCmHour"],["Skin predicted Kp (cm/h)","kpCmHour"],["Skin predicted Kp (cm/s)","kpCmSecond"],["Skin molecular weight (g/mol)","weight"]] as const)rows.push(row(label,columns.map(c=>!c.skin?"Not calculated":c.skin.prediction[key]??"Not evaluable")));
  rows.push(row("Skin entered neutral LogKow",columns.map(c=>c.skin?.prediction.settings.logKow??"Not calculated")),row("Skin LogKow evidence",columns.map(c=>c.skin?.prediction.settings.evidence??"Not calculated")));
  rows.push(row("Hepatic result ID",columns.map(c=>c.hepatic?.id??"Not calculated")),row("Hepatic saved at",columns.map(c=>c.hepatic?.createdAt??"Not calculated")),["Hepatic comparison interpretation","Parameter-based results depend on context and input sources. No descriptor inputs are used; a different descriptor selection does not change the same version's hepatic scenario."]);
  const hepaticLabels=[...new Set(columns.flatMap(c=>c.hepatic?hepaticRows(c.hepatic.prediction).map(r=>r[0]):[]))];
  if(!hepaticLabels.length)rows.push(row("Hepatic clearance",columns.map(()=>"Not calculated")));
  for(const label of hepaticLabels)rows.push(row(label,columns.map(c=>c.hepatic?hepaticRows(c.hepatic.prediction).find(r=>r[0]===label)?.[1]??"Not calculated":"Not calculated")));
  return "\ufeff"+rows.map(r=>r.map(cell).join(",")).join("\r\n");
}
const escape=(value:unknown)=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"})[c]!);
export function comparisonPlot(columns:ComparisonColumn[],x:PlotProperty,y:PlotProperty) {
  if(!Object.hasOwn(plotProperties,x)||!Object.hasOwn(plotProperties,y))throw new Error("Choose supported plot axes.");
  const points=columns.flatMap((c,i)=>{const a=descriptorValue(c,x),b=descriptorValue(c,y);return a===undefined||b===undefined?[]:[{column:c,index:i+1,x:a,y:b}];});
  if(!points.length)return undefined;
  const range=(key:PlotProperty,values:number[])=>{const low=Math.min(plotProperties[key].min,...values),high=Math.max(plotProperties[key].max,...values),pad=(high-low)*.08;return [low-pad,high+pad];};
  const xr=range(x,points.map(p=>p.x)),yr=range(y,points.map(p=>p.y));
  const px=(v:number)=>95+(v-xr[0])/(xr[1]-xr[0])*555,py=(v:number)=>355-(v-yr[0])/(yr[1]-yr[0])*265;
  let body="";
  for(let i=0;i<=4;i++){const a=xr[0]+(xr[1]-xr[0])*i/4,b=yr[0]+(yr[1]-yr[0])*i/4;body+=`<path d="M${px(a)} 90V355 M95 ${py(b)}H650" stroke="#e5e0eb"/><text x="${px(a)}" y="375" text-anchor="middle">${Number(a.toFixed(2))}</text><text x="82" y="${py(b)+4}" text-anchor="end">${Number(b.toFixed(2))}</text>`;}
  // Keep exact coordinates even for coincident points; numbers and the table disambiguate them.
  for(const p of points)body+=`<circle cx="${px(p.x)}" cy="${py(p.y)}" r="12" fill="#7655ad" stroke="white" stroke-width="2"><title>${escape(p.column.version.graph.metadata.name)} v${p.column.version.number}: ${escape(p.x)}, ${escape(p.y)}</title></circle><text x="${px(p.x)}" y="${py(p.y)+4}" text-anchor="middle" fill="white">${p.index}</text>`;
  const metadata=points.map(p=>({column:p.index,molecule:p.column.version.graph.metadata.name,versionId:p.column.version.id,resultId:p.column.source!.id,engine:p.column.source!.engine,createdAt:p.column.source!.createdAt,x:p.x,y:p.y}));
  const height=475+columns.length*23;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="${height}" viewBox="0 0 720 ${height}"><title>Saved molecule comparison</title><desc>${escape(JSON.stringify({x,y,points:metadata}))}</desc><rect width="720" height="${height}" fill="#fffefa"/><g font-family="Arial,sans-serif" font-size="11" fill="#302a39"><text x="35" y="32" font-size="18" font-weight="bold">ChemEase / Saved molecule comparison</text><text x="35" y="56">Recorded descriptors · no recalculation · no efficacy or safety classification</text>${body}<path d="M95 90V355H650" fill="none" stroke="#77727d"/><text x="370" y="410" text-anchor="middle">${escape(plotProperties[x].label)} ${escape(plotProperties[x].unit)}</text><text transform="translate(22 225) rotate(-90)" text-anchor="middle">${escape(plotProperties[y].label)} ${escape(plotProperties[y].unit)}</text><text x="35" y="440">Coincident points overlap at their exact coordinates; consult numbered values in the table.</text>${columns.map((c,i)=>`<text x="35" y="${466+i*23}">${i+1}. ${escape(c.version.graph.metadata.name.slice(0,45))} · v${c.version.number} · ${escape(c.source?.engine??"Not calculated")}</text>`).join("")}</g></svg>`;
  return {svg,points,xRange:xr,yRange:yr};
}
