import type { Molecule } from "../../models/Molecule";
import type { BoundToolkitResult } from "../workspace/descriptorCache";
import type { AlertResult } from "../medicinalChemistry/analysis";
import type { WorkspaceData } from "../workspace/types";
import { saveVersion, saveAnalysis, saveExtendedDrugLikeness, saveStructuralAlerts, saveSolubility } from "../workspace/domain";
import { comparisonColumns, comparisonProperties, descriptorValue, ruleText, alertText, solubilityText, type ComparisonProperty } from "../comparison/model";
import { allRuleMethods } from "../drugLikeness/extendedRules";
export const BATCH_LIMIT=50, BATCH_BYTES=250*1024;
export interface BatchInput {row:number;smiles:string;name:string}
export interface BatchRow extends BatchInput {graph?:Molecule;canonical?:string;duplicate?:string;error?:string;status:"ready"|"invalid"|"duplicate"|"running"|"saved"|"failed"|"cancelled";versionId?:string;descriptorId?:string}
export interface BatchOptions {rules:boolean;alerts:boolean;solubility?:boolean}
function csvRecords(text:string):string[][] {
  const rows:string[][]=[];let fields:string[]=[],value="",quoted=false,closed=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(quoted){if(c==='"'){if(text[i+1]==='"'){value+='"';i++;}else{quoted=false;closed=true;}}else value+=c;continue;}
    if(c==='"'){if(value||closed)throw new Error("Invalid CSV quoting. Quote the whole field and double embedded quotes.");quoted=true;}
    else if(c===','||c==='\n'||c==='\r'){fields.push(value);value="";closed=false;if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(fields.some(f=>f.trim()))rows.push(fields);fields=[];}}
    else{if(closed)throw new Error("Unexpected text after a quoted CSV field.");value+=c;}
  }
  if(quoted)throw new Error("CSV contains an unclosed quoted field.");
  fields.push(value);if(fields.some(f=>f.trim()))rows.push(fields);return rows;
}
export function parseBatch(text:string,format:"csv"|"smi"):BatchInput[] {
  if(new TextEncoder().encode(text).length>BATCH_BYTES)throw new Error("Batch input is limited to 250 KB.");
  text=text.replace(/^\uFEFF/,"");let rows:BatchInput[];
  if(format==="csv"){
    const records=csvRecords(text),headers=records.shift()?.map(s=>s.trim().toLowerCase())??[],smiles=headers.indexOf("smiles"),name=headers.indexOf("name");
    if(smiles<0||new Set(headers).size!==headers.length)throw new Error("CSV needs unique headers including smiles; name is optional.");
    rows=records.map((r,i)=>({row:i+2,smiles:r[smiles]?.trim()??"",name:(name<0?"":r[name]?.trim())||`Molecule ${i+1}`}));
    if(records.some(r=>r.length!==headers.length))throw new Error("Every CSV row must have the same number of fields as the header.");
  }else rows=text.split(/\r?\n/).flatMap((line,i)=>{line=line.trim();if(!line||line.startsWith("#"))return [];const [smiles,...name]=line.split(/\s+/);return [{row:i+1,smiles,name:name.join(" ")||`Molecule ${i+1}`}];});
  if(!rows.length||rows.length>BATCH_LIMIT)throw new Error("Provide 1 to 50 molecule entries per batch.");
  return rows.map(r=>({...r,name:r.name.slice(0,120)}));
}
export async function previewBatch(inputs:BatchInput[],parse:(s:string,n:string)=>Promise<{graph:Molecule;canonical:string}>,known:Map<string,string>,signal:AbortSignal):Promise<BatchRow[]> {
  const seen=new Map(known),rows:BatchRow[]=[];
  for(const row of inputs){if(signal.aborted)throw new Error("Batch preview cancelled.");
    try{const {graph,canonical}=await parse(row.smiles,row.name);if(graph.atoms.length>250)throw new Error("Batch structures support up to 250 drawn atoms.");const duplicate=seen.get(canonical);rows.push({...row,graph,canonical,duplicate,status:duplicate?"duplicate":"ready"});if(!duplicate)seen.set(canonical,`input row ${row.row}`);}
    catch(e){rows.push({...row,status:"invalid",error:(e as Error).message});}
  }if(signal.aborted)throw new Error("Batch preview cancelled.");return rows;
}
/** One row, one atomic workspace write; never activates or replaces the editor draft. */
export function commitBatchRow(data:WorkspaceData,projectId:string,row:BatchRow,descriptors:BoundToolkitResult,options:BatchOptions,alerts?:AlertResult,idFactory=()=>crypto.randomUUID()) {
  if(row.status!=="ready"||!row.graph||!row.canonical)throw new Error("Only validated, nonduplicate batch rows may be saved.");
  if(row.graph.atoms.length>250)throw new Error("Batch structures support up to 250 drawn atoms.");
  if(descriptors.smiles!==row.canonical)throw new Error("Batch calculation does not match its previewed structure.");
  if(options.alerts&&!alerts)throw new Error("The selected structural-alert analysis is missing.");
  const records=new Set(data.molecules.filter(m=>m.projectId===projectId).map(m=>m.id)),versions=new Set(data.versions.filter(v=>records.has(v.moleculeId)).map(v=>v.id));
  if(data.results.some(r=>r.method==="rdkit-descriptors-v1"&&r.descriptors.smiles===row.canonical&&versions.has(r.versionId)))throw new Error("This structure was already saved with descriptors in this project. Refresh the preview.");
  const active=structuredClone(data.active),draft=structuredClone(data.draft);
  const saved=saveVersion(data,projectId,null,row.graph,idFactory);let next=saved.data;
  next=options.rules?saveExtendedDrugLikeness(next,saved.versionId,row.graph,descriptors,idFactory):saveAnalysis(next,saved.versionId,row.graph,descriptors,idFactory());
  if(options.alerts)next=saveStructuralAlerts(next,saved.versionId,row.graph,alerts!,idFactory());
  if(options.solubility)next=saveSolubility(next,saved.versionId,row.graph,descriptors,idFactory);
  next.active=active;next.draft=draft;return {data:next,versionId:saved.versionId};
}
export interface BatchServices {calculate:(graph:Molecule)=>Promise<BoundToolkitResult>;alerts:(graph:Molecule,signal:AbortSignal)=>Promise<AlertResult>;commit:(row:BatchRow,d:BoundToolkitResult,o:BatchOptions,a?:AlertResult)=>Promise<string>}
export async function runBatch(rows:BatchRow[],options:BatchOptions,services:BatchServices,signal:AbortSignal,onRow:(row:BatchRow)=>void) {
  for(const original of rows){if(original.status!=="ready")continue;if(signal.aborted){onRow({...original,status:"cancelled"});continue;}
    onRow({...original,status:"running"});
    try{const d=await services.calculate(structuredClone(original.graph!));if(signal.aborted){onRow({...original,status:"cancelled"});continue;}const a=options.alerts?await services.alerts(structuredClone(original.graph!),signal):undefined;if(signal.aborted){onRow({...original,status:"cancelled"});continue;}const versionId=await services.commit(original,d,options,a);onRow({...original,status:"saved",versionId});}
    catch(e){onRow({...original,status:signal.aborted?"cancelled":"failed",error:(e as Error).message});}
  }
}
const csvCell=(value:unknown)=>`"${String(value??"").replace(/^\s*[=+@-]/,"'$&").replaceAll('"','""')}"`;
export function batchStatusCsv(rows:BatchRow[]) {return "\ufeff"+[["Input row","Name","Input SMILES","Canonical SMILES","Status","Version ID","Duplicate of","Error"],...rows.map(r=>[r.row,r.name,r.smiles,r.canonical,r.status,r.versionId,r.duplicate,r.error])].map(row=>row.map(csvCell).join(",")).join("\r\n");}
export function batchResultColumn(data:WorkspaceData,row:BatchRow){return row.status==="saved"&&row.versionId&&row.descriptorId?comparisonColumns(data,[{versionId:row.versionId,sourceId:row.descriptorId}])[0]:undefined;}
export function batchResultsCsv(rows:BatchRow[],data:WorkspaceData){
  const properties=Object.entries(comparisonProperties),rules=Object.entries(allRuleMethods);
  const records:unknown[][]=[["Input row","Name","Status","Input SMILES","Canonical SMILES","Version ID","Descriptor result ID","Engine","Calculated at",...properties.map(([,p])=>`${p.label}${p.unit?` (${p.unit})`:""}`),...rules.map(([,p])=>p.name),"PAINS","Brenk","Screening result ID","Rules version","Alert result ID","Alert catalog","Alert engine","Alerts calculated at","Predicted aqueous logS (log10 mol/L)","Solubility result ID","Solubility model","Duplicate of","Error"]];
  for(const row of rows){const c=batchResultColumn(data,row);records.push([row.row,row.name,row.status,row.smiles,row.canonical??"Not calculated",row.versionId??"Not saved",c?.source?.id??"Not calculated",c?.source?.engine??"Not calculated",c?.source?.createdAt??"Not calculated",...properties.map(([key])=>c?descriptorValue(c,key as ComparisonProperty)??"Not calculated":"Not calculated"),...rules.map(([id])=>c?ruleText(c,id as keyof typeof allRuleMethods):"Not calculated"),c?alertText(c,"PAINS"):"Not calculated",c?alertText(c,"Brenk"):"Not calculated",c?.screening?.id??"Not calculated",c?.screening?.screening.rulesVersion??"Not calculated",c?.alerts?.id??"Not calculated",c?.alerts?.alerts.catalogVersion??"Not calculated",c?.alerts?.engine??"Not calculated",c?.alerts?.createdAt??"Not calculated",c?solubilityText(c):"Not calculated",c?.solubility?.id??"Not calculated",c?.solubility?.prediction.modelVersion??"Not calculated",row.duplicate??"",row.error??""]);}
  return "\ufeff"+records.map(row=>row.map(v=>typeof v==="number"?String(v):csvCell(v)).join(",")).join("\r\n");
}
