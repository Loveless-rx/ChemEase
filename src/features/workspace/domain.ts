import { validateDockingRuns } from "../docking/model";
import { parseMolecule } from "../../utils/storage";
import { chemistryKey } from "../../engine/toolkit";
import { analyzeMolecule } from "../../engine/analysis";
import type { BoundToolkitResult } from "./descriptorCache";
import type { Molecule } from "../../models/Molecule";
import type { WorkspaceData } from "./types";
import { screenDrugLikeness, SCREENING_METHOD } from "../drugLikeness/rules";
import { sameDescriptors } from "./descriptorCache";
import { EXTENDED_METHOD, screenExtendedDrugLikeness } from "../drugLikeness/extendedRules";
import { ALERT_METHOD, validateAlertResult, type AlertResult } from "../medicinalChemistry/analysis";
import { canonicalJson } from "../../utils/canonicalJson";
import { validateReport } from "../reports/model";
import { predictSolubility } from "../solubility/model";
import { predictHepatic, HEPATIC_MODEL, type HepaticSettings } from "../hepatic/model";
import { predictSkin,type SkinSettings } from "../skin/model";

export const emptyWorkspace = (ownerId: string): WorkspaceData => ({schemaVersion:1,ownerId,revision:0,projects:[],molecules:[],versions:[],results:[],active:{projectId:null,moleculeId:null,versionId:null},draft:null});
export const snapshotKey = (m: Molecule) => JSON.stringify({atoms:m.atoms,bonds:m.bonds,name:m.metadata.name});
const uuid = () => crypto.randomUUID();

export function addProject(data: WorkspaceData, name: string, description: string, id = uuid(), now = new Date().toISOString()) {
  if (!name.trim()) throw new Error("Enter a project name.");
  if (data.projects.length >= 100) throw new Error("This workspace supports up to 100 projects. Export a backup before starting another workspace.");
  const next=structuredClone(data);
  next.projects.push({id,name:name.trim().slice(0,120),description:description.slice(0,3000),createdAt:now,updatedAt:now});
  // Creating a project does not silently move the molecule currently being edited.
  if (!next.active.projectId) next.active.projectId=id;
  return {data:next,id};
}

export function saveVersion(data: WorkspaceData, projectId: string, recordId: string | null, graph: Molecule, idFactory = uuid, now = new Date().toISOString()) {
  const next=structuredClone(data), project=next.projects.find(p=>p.id===projectId);
  if (!project) throw new Error("Choose an existing project.");
  if (!graph.atoms.length) throw new Error("Draw or import a molecule before saving a version.");
  if (next.versions.length >= 2000) throw new Error("The workspace version limit is reached. Export your backup before continuing.");
  const safe=parseMolecule(JSON.stringify(graph));
  let record=recordId ? next.molecules.find(m=>m.id===recordId && m.projectId===projectId) : undefined;
  if (recordId && !record) throw new Error("That molecule does not belong to this project. Save it as a new molecule.");
  if (!record) {
    if (next.molecules.length>=500) throw new Error("The workspace molecule limit is reached.");
    record={id:idFactory(),projectId,name:safe.metadata.name,createdAt:now,updatedAt:now};
    next.molecules.push(record);
  }
  const previous=next.versions.filter(v=>v.moleculeId===record!.id).sort((a,b)=>a.number-b.number);
  const last=previous.at(-1);
  const version=last && snapshotKey(last.graph)===snapshotKey(safe) ? last : {id:idFactory(),moleculeId:record.id,number:(last?.number??0)+1,graph:structuredClone(safe),structureKey:chemistryKey(safe),createdAt:now};
  if (version!==last) next.versions.push(version);
  record.name=safe.metadata.name;record.updatedAt=now;project.updatedAt=now;
  next.active={projectId,moleculeId:record.id,versionId:version.id};
  next.draft=structuredClone(safe);
  return {data:next,versionId:version.id};
}

export function saveAnalysis(data: WorkspaceData, versionId: string, liveGraph: Molecule, descriptors: BoundToolkitResult, id = uuid()) {
  const version=data.versions.find(v=>v.id===versionId);
  if (!version || snapshotKey(version.graph)!==snapshotKey(liveGraph)) throw new Error("Save this molecule version before storing its analysis.");
  const key=chemistryKey(liveGraph);
  if (key!==version.structureKey || descriptors.structureKey!==key) throw new Error("The molecule changed while analysis was running. Save and analyze the new version.");
  const next=structuredClone(data);
  const existing=next.results.find(r=>r.versionId===versionId && r.method==="rdkit-descriptors-v1" && sameDescriptors(r.descriptors,descriptors));
  if (!existing && data.results.length>=5000) throw new Error("The saved-analysis limit is reached.");
  if (!existing) next.results.push({id,versionId,structureKey:key,method:"rdkit-descriptors-v1",engine:descriptors.engine,createdAt:new Date().toISOString(),local:analyzeMolecule(liveGraph),descriptors:structuredClone(descriptors)});
  return next;
}

export function saveDrugLikeness(data:WorkspaceData,versionId:string,graph:Molecule,descriptors:BoundToolkitResult,idFactory=uuid) {
  // Store/reuse the exact descriptor snapshot consumed by this screening.
  const next=saveAnalysis(data,versionId,graph,descriptors,idFactory());
  const source=next.results.find(r=>r.method==="rdkit-descriptors-v1"&&r.versionId===versionId&&sameDescriptors(r.descriptors,descriptors));
  if(!source) throw new Error("Save the source descriptor calculation before screening.");
  const screening=screenDrugLikeness(graph,descriptors);
  const existing=next.results.find(r=>r.method===SCREENING_METHOD&&r.versionId===versionId&&r.descriptorResultId===source.id);
  if(!existing) {
    if(next.results.length>=5000) throw new Error("The saved-analysis limit is reached.");
    next.results.push({id:idFactory(),versionId,structureKey:descriptors.structureKey,method:SCREENING_METHOD,engine:descriptors.engine,createdAt:new Date().toISOString(),descriptorResultId:source.id,screening});
  }
  return next;
}

export function saveExtendedDrugLikeness(data:WorkspaceData,versionId:string,graph:Molecule,descriptors:BoundToolkitResult,idFactory=uuid) {
  const next=saveAnalysis(data,versionId,graph,descriptors,idFactory());
  const source=next.results.find(r=>r.method==="rdkit-descriptors-v1"&&r.versionId===versionId&&sameDescriptors(r.descriptors,descriptors));
  if(!source)throw new Error("The screening source descriptor snapshot is missing.");
  if(!next.results.some(r=>r.method===EXTENDED_METHOD&&r.versionId===versionId&&r.descriptorResultId===source.id)) {
    if(next.results.length>=5000)throw new Error("The saved-analysis limit is reached.");
    next.results.push({id:idFactory(),versionId,structureKey:descriptors.structureKey,method:EXTENDED_METHOD,engine:descriptors.engine,createdAt:new Date().toISOString(),descriptorResultId:source.id,screening:screenExtendedDrugLikeness(graph,descriptors)});
  }
  return next;
}

export function saveStructuralAlerts(data:WorkspaceData,versionId:string,graph:Molecule,alerts:AlertResult,id=uuid()) {
  const v=data.versions.find(v=>v.id===versionId);
  if(!v||snapshotKey(v.graph)!==snapshotKey(graph))throw new Error("Save the unchanged molecule version before storing its structural alerts.");
  validateAlertResult(alerts,graph);
  const next=structuredClone(data);
  if(!next.results.some(r=>r.method===ALERT_METHOD&&r.versionId===versionId&&canonicalJson(r.alerts)===canonicalJson(alerts))) {
    if(next.results.length>=5000)throw new Error("The saved-analysis limit is reached.");
    next.results.push({id,versionId,structureKey:v.structureKey,method:ALERT_METHOD,engine:alerts.engine,createdAt:new Date().toISOString(),alerts:structuredClone(alerts)});
  }
  return next;
}

export function saveSolubility(data:WorkspaceData,versionId:string,graph:Molecule,descriptors:BoundToolkitResult,idFactory=uuid) {
  const next=saveAnalysis(data,versionId,graph,descriptors,idFactory());
  const source=next.results.find(r=>r.method==="rdkit-descriptors-v1"&&r.versionId===versionId&&sameDescriptors(r.descriptors,descriptors));
  if(!source)throw new Error("The solubility descriptor source is missing.");
  if(!next.results.some(r=>r.method==="esol-rdkit-v1"&&r.descriptorResultId===source.id)){
    if(next.results.length>=5000)throw new Error("The saved-analysis limit is reached.");
    next.results.push({id:idFactory(),method:"esol-rdkit-v1",versionId,structureKey:descriptors.structureKey,descriptorResultId:source.id,engine:descriptors.engine,createdAt:new Date().toISOString(),prediction:predictSolubility(graph,descriptors)});
  }return next;
}
export function saveSkin(data:WorkspaceData,versionId:string,graph:Molecule,descriptors:BoundToolkitResult,settings:SkinSettings,idFactory=uuid){
  const next=saveAnalysis(data,versionId,graph,descriptors,idFactory());
  const source=next.results.find(r=>r.method==="rdkit-descriptors-v1"&&r.versionId===versionId&&sameDescriptors(r.descriptors,descriptors));if(!source)throw new Error("The skin prediction descriptor source is missing.");
  const prediction=predictSkin(graph,descriptors,settings);
  if(!next.results.some(r=>r.method==="skin-pg-cdc-v1"&&r.descriptorResultId===source.id&&canonicalJson(r.prediction)===canonicalJson(prediction))){if(next.results.length>=5000)throw new Error("The saved-analysis limit is reached.");next.results.push({id:idFactory(),method:"skin-pg-cdc-v1",versionId,structureKey:descriptors.structureKey,descriptorResultId:source.id,engine:descriptors.engine,createdAt:new Date().toISOString(),prediction});}
  return next;
}
export function saveHepatic(data:WorkspaceData,versionId:string,graph:Molecule,settings:HepaticSettings,idFactory=uuid){
  const version=data.versions.find(v=>v.id===versionId);
  if(!version||snapshotKey(version.graph)!==snapshotKey(graph))throw new Error("Save this molecule version before saving a hepatic prediction.");
  const prediction=predictHepatic(graph,settings);
  if(data.results.some(r=>r.method==="hepatic-well-stirred-v1"&&r.versionId===versionId&&canonicalJson(r.prediction)===canonicalJson(prediction)))return structuredClone(data);
  if(data.results.length>=5000)throw new Error("The saved-analysis limit is reached.");
  const next=structuredClone(data);next.results.push({id:idFactory(),versionId,structureKey:prediction.structureKey,method:"hepatic-well-stirred-v1",engine:HEPATIC_MODEL,createdAt:new Date().toISOString(),prediction});return next;
}
// Validate imported/recovered data before any write; never overwrite a corrupt workspace automatically.
export function validateWorkspace(input: unknown, ownerId: string): WorkspaceData {
  if (!input || typeof input!=="object") throw new Error("Invalid workspace backup.");
  const d=structuredClone(input) as WorkspaceData;
  if (d.schemaVersion!==1 || d.ownerId!==ownerId || !Number.isSafeInteger(d.revision) || d.revision<0) throw new Error("Unsupported workspace version or owner scope.");
  for (const [key,limit] of [["projects",100],["molecules",500],["versions",2000],["results",5000]] as const) {
    if (!Array.isArray(d[key]) || d[key].length>limit) throw new Error(`Invalid workspace ${key}.`);
    const ids=new Set<string>();
    for (const item of d[key]) {
      if (!item || typeof item.id!=="string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(item.id) || ids.has(item.id)) throw new Error(`Duplicate or invalid ${key} identifier.`);
      ids.add(item.id);
    }
  }
  const date=(s:unknown)=>typeof s==="string" && s.length<=60 && Number.isFinite(Date.parse(s));
  const title=(s:unknown)=>typeof s==="string" && !!s.trim() && s.length<=120;
  for(const p of d.projects) if(!title(p.name)||typeof p.description!=="string"||p.description.length>3000||!date(p.createdAt)||!date(p.updatedAt)) throw new Error("Invalid project data.");
  for(const m of d.molecules) if(!d.projects.some(p=>p.id===m.projectId)||!title(m.name)||!date(m.createdAt)||!date(m.updatedAt)) throw new Error("Invalid molecule record.");
  for(const v of d.versions) {
    if(!d.molecules.some(m=>m.id===v.moleculeId)||!Number.isSafeInteger(v.number)||v.number<1||!date(v.createdAt)) throw new Error("Invalid molecule version.");
    v.graph=parseMolecule(JSON.stringify(v.graph));
    if(!v.graph.atoms.length) throw new Error("A saved molecule version cannot be empty.");
    if(v.structureKey!==chemistryKey(v.graph)) throw new Error("A saved structure does not match its chemistry identifier.");
  }
  for(const m of d.molecules) {
    const versions=d.versions.filter(v=>v.moleculeId===m.id);
    if(!versions.length||new Set(versions.map(v=>v.number)).size!==versions.length) throw new Error("Missing or duplicate molecule versions.");
  }
  for(const r of d.results) {
    const v=d.versions.find(v=>v.id===r.versionId);
    if(!v||r.structureKey!==v.structureKey||!date(r.createdAt)||typeof r.engine!=="string"||!r.engine||r.engine.length>100) throw new Error("Invalid saved analysis provenance.");
    if(r.method==="hepatic-well-stirred-v1"){
      if(r.engine!==HEPATIC_MODEL||canonicalJson(predictHepatic(v.graph,r.prediction?.settings))!==canonicalJson(r.prediction))throw new Error("Stored hepatic prediction does not match its input set, structure and model.");
      continue;
    }
    if(r.method==="structural-alerts-v1") {
      validateAlertResult(r.alerts,v.graph);
      if(r.alerts.engine!==r.engine)throw new Error("Structural-alert engine provenance does not match.");
      continue;
    }
    if(r.method==="skin-pg-cdc-v1"){
      const source=d.results.find(s=>s.id===r.descriptorResultId);
      if(!source||source.method!=="rdkit-descriptors-v1"||source.versionId!==r.versionId||source.engine!==r.engine||source.structureKey!==r.structureKey)throw new Error("Invalid skin prediction descriptor reference.");
      if(canonicalJson(predictSkin(v.graph,{...source.descriptors,structureKey:v.structureKey},r.prediction?.settings))!==canonicalJson(r.prediction))throw new Error("Stored skin prediction does not match its settings, source and model.");continue;
    }
    if(r.method==="esol-rdkit-v1") {
      const source=d.results.find(s=>s.id===r.descriptorResultId);
      if(!source||source.method!=="rdkit-descriptors-v1"||source.versionId!==r.versionId||source.engine!==r.engine||source.structureKey!==r.structureKey)throw new Error("Invalid solubility descriptor reference.");
      if(canonicalJson(predictSolubility(v.graph,{...source.descriptors,structureKey:v.structureKey}))!==canonicalJson(r.prediction))throw new Error("Stored solubility does not match its source inputs and model version.");
      continue;
    }
    if(r.method==="drug-likeness-v1"||r.method==="drug-likeness-v2") {
      const source=d.results.find(s=>s.id===r.descriptorResultId);
      if(!source||source.method!=="rdkit-descriptors-v1"||source.versionId!==r.versionId||source.engine!==r.engine||source.structureKey!==r.structureKey||!r.screening) throw new Error("Invalid screening descriptor reference.");
      const expected=r.method==="drug-likeness-v1"?screenDrugLikeness(v.graph,{...source.descriptors,structureKey:v.structureKey}):screenExtendedDrugLikeness(v.graph,{...source.descriptors,structureKey:v.structureKey});
      if(canonicalJson(expected)!==canonicalJson(r.screening)) throw new Error("Stored screening does not match its source descriptors and rule version.");
      continue;
    }
    if(r.method!=="rdkit-descriptors-v1"||!r.descriptors||r.descriptors.engine!==r.engine) throw new Error("Invalid saved descriptor method.");
    for(const key of ["logP","tpsa","molarRefractivity","donors","acceptors","rotatable","rings","heavyAtoms","charge","weight"] as const) if(!Number.isFinite(r.descriptors[key])) throw new Error("Invalid saved descriptor value.");
    for(const key of ["donors","acceptors","rotatable","rings","heavyAtoms"] as const) if(!Number.isSafeInteger(r.descriptors[key])||r.descriptors[key]<0) throw new Error("Invalid saved descriptor count.");
    if(!Number.isSafeInteger(r.descriptors.charge)||r.descriptors.weight<=0||r.descriptors.tpsa<0) throw new Error("Invalid saved molecular property.");
    if(typeof r.descriptors.smiles!=="string"||r.descriptors.smiles.length>20000) throw new Error("Invalid saved SMILES.");
    // Local counts are deterministic; rebuild from the validated snapshot, not imported display text.
    r.local=analyzeMolecule(v.graph);
  }
  const a=d.active;
  if(d.reports!==undefined){
    if(!Array.isArray(d.reports)||d.reports.length>100||new Set(d.reports.map(r=>r?.id)).size!==d.reports.length)throw new Error("Invalid saved report list.");
    for(const report of d.reports)validateReport(d,report);
  }
  if(d.dockingRuns!==undefined)validateDockingRuns(d.dockingRuns,d);
  if(!a||typeof a!=="object"||![a.projectId,a.moleculeId,a.versionId].every(x=>x===null||typeof x==="string")) throw new Error("Invalid active selection.");
  if(a.projectId&&!d.projects.some(p=>p.id===a.projectId)) throw new Error("Active project is missing.");
  if(a.moleculeId&&!d.molecules.some(m=>m.id===a.moleculeId&&m.projectId===a.projectId)) throw new Error("Active molecule is missing.");
  if(a.versionId&&!d.versions.some(v=>v.id===a.versionId&&v.moleculeId===a.moleculeId)) throw new Error("Active version is missing.");
  if(!!a.versionId!==!!a.moleculeId) throw new Error("Incomplete active molecule selection.");
  if(d.draft!==null) d.draft=parseMolecule(JSON.stringify(d.draft));
  d.versions.sort((a,b)=>a.number-b.number);
  return structuredClone(d);
}
