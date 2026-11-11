import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { emptyWorkspace, addProject, saveVersion, saveAnalysis, validateWorkspace, snapshotKey } from "../src/features/workspace/domain";
import { createWorkspaceStore } from "../src/features/workspace/store";
import { createDescriptorCache } from "../src/features/workspace/descriptorCache";
import { savedResultCsv } from "../src/features/workspace/resultExport";
import { parseRoute } from "../src/features/workspace/routes";
import { calculateToolkit, chemistryKey, importSmiles } from "../src/engine/toolkit";
import type { WorkspaceData, WorkspaceRepository } from "../src/features/workspace/types";
const engine=initRDKit();
const ids=()=>{let id=0;return()=>`id-${++id}`;};
const fixture=async()=>{
  const rdkit=await engine,graph=importSmiles(rdkit,"CCO","Ethanol");
  const data=addProject(emptyWorkspace("test"),"Practical","","project").data;
  const saved=saveVersion(data,"project",null,graph,ids());
  return {rdkit,graph,...saved};
};
class MemoryRepository implements WorkspaceRepository {
  readonly ownerId="test"; data:WorkspaceData|null=null;fail=false;
  async load(){return this.data?structuredClone(this.data):null;}
  async save(data:WorkspaceData,revision:number){
    await Promise.resolve();
    if(this.fail)throw new Error("Storage full");
    if((this.data?.revision??0)!==revision)throw new Error("Revision conflict");
    this.data=validateWorkspace(structuredClone(data),this.ownerId);
  }
}
test("saving versions isolates graphs, avoids duplicate snapshots and preserves results",async()=>{
  const f=await fixture(),key=snapshotKey(f.graph),descriptors={...calculateToolkit(f.rdkit,f.graph),structureKey:chemistryKey(f.graph)};
  const analyzed=saveAnalysis(f.data,f.versionId,f.graph,descriptors,"result");
  const edited=structuredClone(f.graph);edited.atoms.find(a=>a.element==="O")!.element="N";
  const updated=saveVersion(analyzed,"project",analyzed.active.moleculeId,edited,()=>"second-version");
  assert.equal(updated.data.versions.length,2);
  assert.equal(snapshotKey(updated.data.versions[0].graph),key);
  assert.equal(updated.data.results[0].versionId,f.versionId);
  assert.equal(updated.data.results[0].descriptors.smiles,"CCO");
  assert.equal(updated.data.versions[1].number,2);
  assert.equal(saveVersion(updated.data,"project",updated.data.active.moleculeId,edited).data.versions.length,2);
  edited.atoms[0].x+=500;assert.notEqual(snapshotKey(updated.data.versions[1].graph),snapshotKey(edited));
  assert.throws(()=>saveAnalysis(updated.data,f.versionId,edited,descriptors),/Save this molecule version/);
  assert.equal(saveAnalysis(analyzed,f.versionId,f.graph,descriptors).results.length,1);
  assert.throws(()=>saveAnalysis(f.data,f.versionId,f.graph,{...descriptors,structureKey:"different graph"}),/changed while analysis/);
});
test("new projects preserve the active molecule's project and reject cross-project saves",async()=>{
  const f=await fixture(),next=addProject(f.data,"Other","","other").data;
  assert.deepEqual(next.active,f.data.active);
  assert.doesNotThrow(()=>validateWorkspace(next,"test"));
  assert.throws(()=>saveVersion(next,"other",next.active.moleculeId,f.graph),/does not belong/);
});
test("backup validation rejects corrupt links, structure keys, numeric results and owners",async()=>{
  const f=await fixture(),data=saveAnalysis(f.data,f.versionId,f.graph,{...calculateToolkit(f.rdkit,f.graph),structureKey:chemistryKey(f.graph)},"result");
  const roundtrip=validateWorkspace(JSON.parse(JSON.stringify(data)),"test");
  assert.equal(roundtrip.results[0].descriptors.smiles,"CCO");
  for(const corrupt of [
    (d:WorkspaceData)=>{d.ownerId="another-person";},
    (d:WorkspaceData)=>{d.molecules[0].projectId="missing";},
    (d:WorkspaceData)=>{d.versions[0].graph.atoms[0].charge=1;},
    (d:WorkspaceData)=>{d.results[0].descriptors.logP=Infinity;},
    (d:WorkspaceData)=>{d.results[0].descriptors.donors=-1;},
    (d:WorkspaceData)=>{d.results[0].descriptors.rings=1.5;},
    (d:WorkspaceData)=>{d.results[0].versionId="missing";},
    (d:WorkspaceData)=>{d.active.versionId="missing";},
    (d:WorkspaceData)=>{d.active.versionId=null;},
    (d:WorkspaceData)=>{d.versions.push(structuredClone(d.versions[0]));},
  ]){const bad=structuredClone(data);corrupt(bad);assert.throws(()=>validateWorkspace(bad,"test"));}
  const imported=structuredClone(data);imported.results[0].local.formula="FAKE";
  assert.equal(validateWorkspace(imported,"test").results[0].local.formula,"C2H6O");
});
test("repository writes serialize, survive reload, and do not publish failed mutations",async()=>{
  const repo=new MemoryRepository(),store=createWorkspaceStore(repo);
  await store.getState().initialize();
  await Promise.all([store.getState().createProject("A",""),store.getState().createProject("B","")]);
  assert.equal(store.getState().data.revision,2);assert.equal(store.getState().data.projects.length,2);
  const reloaded=createWorkspaceStore(repo);await reloaded.getState().initialize();
  assert.deepEqual(reloaded.getState().data,store.getState().data);
  repo.fail=true;await assert.rejects(store.getState().createProject("C",""),/Storage full/);
  assert.equal(store.getState().data.projects.length,2);assert.equal(store.getState().pending,0);
  repo.fail=false;await store.getState().createProject("D","");assert.equal(store.getState().data.projects.length,3);
  await assert.rejects(reloaded.getState().createProject("stale",""),/conflict/);
  assert.equal(reloaded.getState().data.projects.length,2);
});
test("opening versions restores structure, saving a draft does not mutate its version",async()=>{
  const repo=new MemoryRepository(),s=createWorkspaceStore(repo);await s.getState().initialize();
  const id=await s.getState().createProject("Structures","");const f=await fixture();
  const version=await s.getState().saveVersion(id,null,f.graph);
  const draft=structuredClone(f.graph);draft.metadata.name="Unsaved name";await s.getState().draft(draft);
  assert.equal(s.getState().data.versions[0].graph.metadata.name,"Ethanol");
  assert.equal((await s.getState().openVersion(version)).metadata.name,"Ethanol");
  assert.equal(s.getState().data.draft!.metadata.name,"Ethanol");
  const before=structuredClone(s.getState().data);await assert.rejects(s.getState().restore({}),/Invalid|Unsupported/);
  assert.deepEqual(s.getState().data,before);
});
test("shared chemistry cache deduplicates modules and coordinate changes, returns isolated values",async()=>{
  const f=await fixture();let calls=0;
  const cache=createDescriptorCache(async graph=>{calls++;return calculateToolkit(f.rdkit,graph);});
  const moved=structuredClone(f.graph);moved.atoms[0].x+=20;moved.metadata.name="Renamed";
  const [a,b]=await Promise.all([cache.get(f.graph),cache.get(moved)]);
  assert.equal(calls,1);assert.deepEqual(a,b);a.logP=100;assert.notEqual((await cache.get(f.graph)).logP,100);
  moved.atoms.find(a=>a.element==="O")!.element="N";assert.equal((await cache.get(moved)).smiles,"CCN");assert.equal(calls,2);
});
test("failed chemistry computations can be retried",async()=>{
  const f=await fixture();let fail=true;
  const cache=createDescriptorCache(async graph=>{if(fail)throw new Error("Unavailable");return calculateToolkit(f.rdkit,graph);});
  await assert.rejects(cache.get(f.graph),/Unavailable/);fail=false;assert.equal((await cache.get(f.graph)).smiles,"CCO");
});
test("the chemistry service captures its input before the caller can mutate it",async()=>{
  const f=await fixture();
  const cache=createDescriptorCache(async graph=>calculateToolkit(f.rdkit,graph));
  const result=cache.get(f.graph);
  f.graph.atoms.find(a=>a.element==="O")!.element="N";
  assert.equal((await result).smiles,"CCO");
  assert.equal((await cache.get(f.graph)).smiles,"CCN");
});
test("saved-result CSV uses historical values and guards spreadsheet text",async()=>{
  const f=await fixture();f.graph.metadata.name="=unsafe";
  const data=saveVersion(f.data,"project",f.data.active.moleculeId,f.graph,()=>"renamed").data;
  const result=saveAnalysis(data,"renamed",f.graph,{...calculateToolkit(f.rdkit,f.graph),structureKey:chemistryKey(f.graph)},"result").results[0];
  const csv=savedResultCsv(result,data.versions.at(-1)!);
  assert.ok(csv.includes("'=unsafe"));assert.ok(csv.includes('"-0.0014000000000000123"')||csv.includes('"-0.0014"'));
  assert.ok(csv.includes('"rdkit-descriptors-v1"'));assert.ok(csv.includes('"renamed"'));
});
test("workspace routes are explicit and unknown URLs fall back to Home",()=>{
  assert.equal(parseRoute("#/editor"),"editor");assert.equal(parseRoute("#/properties"),"properties");
  assert.equal(parseRoute("#/../../unknown"),"home");assert.equal(parseRoute(""),"home");
});
