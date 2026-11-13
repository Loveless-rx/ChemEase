import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { importSmiles, calculateToolkit, chemistryKey, toolkitMol } from "../src/engine/toolkit";
import { addProject, emptyWorkspace, saveVersion, saveAnalysis, validateWorkspace } from "../src/features/workspace/domain";
import { parseBatch, previewBatch, commitBatchRow, runBatch, batchStatusCsv, batchResultsCsv, type BatchRow } from "../src/features/batch/model";
import { createReport, storeReport, reportColumns, reportSections, reportCsv, reportChart, validateReport } from "../src/features/reports/model";
import { layoutReport } from "../src/features/reports/pdf";
import { calculateAlerts } from "../src/features/medicinalChemistry/analysis";
import { createWorkspaceStore } from "../src/features/workspace/store";
import { parseRoute } from "../src/features/workspace/routes";
import type { WorkspaceRepository, SavedDescriptorAnalysis } from "../src/features/workspace/types";
const engine=initRDKit();
const options={rules:true,alerts:true},sections={properties:true,rules:true,alerts:true,chart:true};
async function fixture(){const rdkit=await engine;let id=0;const ids=()=>`research-${++id}`;let data=addProject(emptyWorkspace("test"),"Research","","project").data;const graph=importSmiles(rdkit,"CCO","Ethanol"),d={...calculateToolkit(rdkit,graph),structureKey:chemistryKey(graph)},row:BatchRow={row:1,smiles:"CCO",name:"Ethanol",graph,canonical:d.smiles,status:"ready"};const saved=saveVersion(data,"project",null,importSmiles(rdkit,"CC","Active draft"),ids);data=saved.data;return {rdkit,data,row,d,ids};}
test("batch parser preserves quoted CSV, names, optional identifiers, BOM, CRLF and SMILES text comments",()=>{
  assert.deepEqual(parseBatch('\ufeffsmiles,name,id\r\nCCO,"Ethanol, ""sample""",one\r\nC,Small,two',"csv")[0],{row:2,smiles:"CCO",name:'Ethanol, "sample"'});
  assert.equal(parseBatch("smiles\nCCO","csv")[0].name,"Molecule 1");assert.equal(parseBatch("# samples\nCCO Ethanol test\n\nCC Ethane","smi")[0].row,2);
});
test("batch parser rejects ambiguous quotes, missing/duplicate headers, wrong widths and size/row bounds",()=>{
  for(const text of ['name\nEthanol','smiles,smiles\nC,C','smiles,name\nC','smiles,name\nC,"open','smiles,name\nC,"closed"text'])assert.throws(()=>parseBatch(text,"csv"));
  assert.throws(()=>parseBatch("C".repeat(250*1024+1),"smi"),/250 KB/);assert.throws(()=>parseBatch(Array(51).fill("C").join("\n"),"smi"),/50/);assert.throws(()=>parseBatch("\n# blank","smi"));
});
test("preview isolates invalid and stereo entries, detects canonical duplicates and does not persist",async()=>{
  const f=await fixture(),before=JSON.stringify(f.data),inputs=parseBatch("CCO First\nOCC Equivalent\nnot-smiles Invalid\nC[C@H](O)C Stereo\nCC Existing","smi");
  const rows=await previewBatch(inputs,async(s,n)=>{const graph=importSmiles(f.rdkit,s,n),m=toolkitMol(f.rdkit,graph);try{return {graph,canonical:m.get_smiles()};}finally{m.delete();}},new Map([["CC","saved ethane"]]),new AbortController().signal);
  assert.deepEqual(rows.map(r=>r.status),["ready","duplicate","invalid","invalid","duplicate"]);assert.equal(rows[1].duplicate,"input row 1");assert.equal(rows[4].duplicate,"saved ethane");assert.equal(JSON.stringify(f.data),before);
});
test("preview cancellation and atom limits are explicit",async()=>{
  const f=await fixture(),c=new AbortController();c.abort();await assert.rejects(previewBatch([f.row],async()=>({graph:f.row.graph!,canonical:"CCO"}),new Map(),c.signal),/cancelled/);
  const graph=structuredClone(f.row.graph!);graph.atoms=Array.from({length:251},(_,i)=>({...graph.atoms[0],id:String(i)}));const rows=await previewBatch([f.row],async()=>({graph,canonical:"C"}),new Map(),new AbortController().signal);assert.equal(rows[0].status,"invalid");assert.match(rows[0].error!,/250/);
});
test("batch atomic row creates normal versions/results and preserves the active draft",async()=>{
  const f=await fixture(),before=JSON.stringify(f.data),alerts=await calculateAlerts(f.rdkit,f.row.graph!),saved=commitBatchRow(f.data,"project",f.row,f.d,options,alerts,f.ids);
  assert.equal(JSON.stringify(f.data),before);assert.deepEqual(saved.data.active,f.data.active);assert.deepEqual(saved.data.draft,f.data.draft);assert.equal(saved.data.results.filter(r=>r.versionId===saved.versionId).length,3);assert.doesNotThrow(()=>validateWorkspace(saved.data,"test"));
  assert.throws(()=>commitBatchRow(saved.data,"project",f.row,f.d,options,alerts,f.ids),/already saved/);
  assert.throws(()=>commitBatchRow(f.data,"project",f.row,f.d,options,undefined,f.ids),/missing/);assert.throws(()=>commitBatchRow(f.data,"project",f.row,{...f.d,smiles:"C"},options,alerts,f.ids),/does not match/);
});
test("batch descriptors-only saves do not fabricate rules or alerts",async()=>{const f=await fixture(),saved=commitBatchRow(f.data,"project",f.row,f.d,{rules:false,alerts:false},undefined,f.ids);assert.deepEqual(saved.data.results.map(r=>r.method),["rdkit-descriptors-v1"]);});
test("batch runner retains partial successes and continues after per-row calculation failures",async()=>{
  const f=await fixture(),rows=[f.row,{...f.row,row:2},{...f.row,row:3,status:"invalid" as const}],events:BatchRow[]=[];let calls=0,commits=0;
  await runBatch(rows,{rules:false,alerts:false},{calculate:async()=>{if(++calls===1)throw Error("bad row");return f.d;},alerts:async()=>{throw Error("should not run");},commit:async()=>{commits++;return "saved-row";}},new AbortController().signal,r=>events.push(r));
  assert.deepEqual(events.map(r=>r.status),["running","failed","running","saved"]);assert.equal(commits,1);assert.equal(events.at(-1)!.versionId,"saved-row");
});
test("batch cancellation stops unsaved computations and marks remaining rows",async()=>{
  const f=await fixture(),c=new AbortController(),events:BatchRow[]=[];let commits=0;
  await runBatch([f.row,{...f.row,row:2}],options,{calculate:async()=>{c.abort();return f.d;},alerts:async()=>{throw Error("no");},commit:async()=>{commits++;return "no";}},c.signal,r=>events.push(r));assert.equal(commits,0);assert.deepEqual(events.map(r=>r.status),["running","cancelled","cancelled"]);
});
test("storage failure does not publish a partially saved batch row",async()=>{
  const f=await fixture();const repo:WorkspaceRepository={ownerId:"test",load:async()=>f.data,save:async()=>{throw Error("full");}},store=createWorkspaceStore(repo);await store.getState().initialize();const before=JSON.stringify(store.getState().data);
  await assert.rejects(store.getState().transact(d=>commitBatchRow(d,"project",f.row,f.d,{rules:false,alerts:false},undefined,f.ids).data),/full/);assert.equal(JSON.stringify(store.getState().data),before);
});
test("batch status CSV safely preserves failures, source rows and version links",async()=>{const f=await fixture(),csv=batchStatusCsv([{...f.row,name:'=SUM(1,2)',status:"saved",versionId:"saved-id"},{...f.row,row:2,status:"failed",error:'bad "row"'}]);assert.ok(csv.includes("'=SUM(1,2)"));assert.ok(csv.includes('bad ""row""'));assert.ok(csv.includes("saved-id"));});
test("batch results CSV exports exact saved values and missing results without synthesizing zeros",async()=>{const f=await fixture(),saved=commitBatchRow(f.data,"project",f.row,f.d,{rules:false,alerts:false},undefined,f.ids),source=saved.data.results.find(r=>r.versionId===saved.versionId&&r.method==="rdkit-descriptors-v1")!,csv=batchResultsCsv([{...f.row,status:"saved",versionId:saved.versionId,descriptorId:source.id},{...f.row,row:2,status:"invalid",error:"bad structure"}],saved.data);assert.ok(csv.includes(String(f.d.weight)));assert.ok(csv.includes(source.id));assert.ok(csv.includes("Not calculated"));assert.ok(csv.includes("bad structure"));assert.ok(csv.includes("Molar refractivity"));});
async function reportFixture(){const f=await fixture(),saved=commitBatchRow(f.data,"project",f.row,f.d,options,await calculateAlerts(f.rdkit,f.row.graph!),f.ids);const report=createReport(saved.data,[saved.versionId],"Research report","Notes",sections,"logP","tpsa","report-one","2026-11-11T00:00:00Z");return {...f,data:saved.data,report,versionId:saved.versionId};}
test("report freezes exact source IDs and historical content remains unchanged by later analyses",async()=>{
  const f=await reportFixture(),before=reportCsv(f.data,f.report),other=structuredClone(f.data.results.find((r):r is SavedDescriptorAnalysis=>r.method==="rdkit-descriptors-v1")!);other.id="new-source";other.createdAt="2099-01-01T00:00:00Z";other.descriptors.logP=88;f.data.results.push(other);
  assert.equal(reportCsv(f.data,f.report),before);assert.notEqual(reportColumns(f.data,f.report)[0].source!.id,other.id);assert.ok(before.includes(String(f.d.weight)));assert.ok(before.includes("structural-alerts-v1"));
});
test("missing report results remain missing when a calculation is added later",async()=>{
  const f=await fixture(),id=f.data.active.versionId!,report=createReport(f.data,[id],"Missing","",sections,"logP","tpsa","missing-report"),graph=f.data.versions.find(v=>v.id===id)!.graph,d={...calculateToolkit(f.rdkit,graph),structureKey:chemistryKey(graph)};
  const next=saveAnalysis(f.data,id,graph,d,"new-result");assert.equal(reportColumns(next,report)[0].source,undefined);assert.ok(reportCsv(next,report).includes("Not calculated"));assert.equal(reportChart(next,report),undefined);
});
test("report rejects wrong-version/descriptor links, unknown methods and malformed settings",async()=>{
  const f=await reportFixture();for(const mutate of [(r:typeof f.report)=>{r.refs[0].versionId=f.data.active.versionId!;},(r:typeof f.report)=>{r.refs[0].descriptorId=null;},(r:typeof f.report)=>{r.refs.push({...r.refs[0]});},(r:typeof f.report)=>{r.method="fake" as typeof r.method;},(r:typeof f.report)=>{r.title="";}]){const r=structuredClone(f.report);mutate(r);assert.throws(()=>validateReport(f.data,r));}
});
test("saved reports round-trip with older workspaces and tampered sources are rejected",async()=>{
  const f=await reportFixture(),stored=storeReport(f.data,f.report),restored=validateWorkspace(JSON.parse(JSON.stringify(stored)),"test");assert.equal(restored.reports![0].id,f.report.id);assert.equal(reportCsv(restored,restored.reports![0]),reportCsv(f.data,f.report));assert.doesNotThrow(()=>validateWorkspace(f.data,"test"));
  restored.reports![0].refs[0].alertId="missing";assert.throws(()=>validateWorkspace(restored,"test"),/alert source/);assert.throws(()=>storeReport(stored,f.report),/already saved/);
});
test("report section choices govern data exports and retain source provenance",async()=>{
  const f=await reportFixture();f.report.sections={properties:false,rules:false,alerts:false,chart:false,solubility:false,skin:false,hepatic:false};const csv=reportCsv(f.data,f.report);assert.ok(!csv.includes('"Hydrogen bond donors"'));assert.ok(!csv.includes('"PAINS"'));assert.ok(csv.includes("Descriptor result / method"));assert.equal(reportChart(f.data,f.report),undefined);assert.equal(reportSections(f.data,f.report).length,1);
});
test("PDF pagination preserves Unicode, long notes/SMILES, images and safe page bounds",async()=>{
  const f=await reportFixture();f.report.title="Research β / 研究";f.report.notes="Long note ".repeat(290);const pages=layoutReport(f.data,f.report,(text,size)=>Array.from(text).length*size*.6);
  assert.ok(pages.length>=4);const text=pages.flatMap(p=>p.filter(o=>o.kind==="text").map(o=>o.text)).join("\n");assert.ok(text.includes("研究"));assert.ok(text.includes("Methods and interpretation"));assert.ok(text.includes(f.versionId));
  for(const p of pages)for(const op of p){assert.ok(op.y>=0&&op.y<=1080);if(op.kind==="image")assert.ok(op.y+op.height<=1030);}
  assert.equal(parseRoute("#/batch"),"batch");assert.equal(parseRoute("#/reports"),"reports");
});
