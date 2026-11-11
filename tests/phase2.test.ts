import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import initRDKit from "@rdkit/rdkit";
import { calculateToolkit, importSmiles, chemistryKey } from "../src/engine/toolkit";
import { moleculeSvg } from "../src/engine/export";
import { evaluateExtendedRanges, extendedRanges, extendedCriterionValue, screenExtendedDrugLikeness } from "../src/features/drugLikeness/extendedRules";
import { calculateAlerts, validateAlertResult } from "../src/features/medicinalChemistry/analysis";
import { alertPatterns } from "../src/features/medicinalChemistry/catalog";
import { alertsCsv } from "../src/features/medicinalChemistry/exports";
import { buildPropertyPlot, plotRange, plotProperties } from "../src/features/visualizations/model";
import { addProject, emptyWorkspace, saveVersion, saveDrugLikeness, saveExtendedDrugLikeness, saveStructuralAlerts, validateWorkspace } from "../src/features/workspace/domain";
import { createWorkspaceStore } from "../src/features/workspace/store";
import { parseRoute } from "../src/features/workspace/routes";
import type { WorkspaceRepository, WorkspaceData, SavedDescriptorAnalysis } from "../src/features/workspace/types";

const engine=initRDKit();
const valid={weight:300,logP:2,molarRefractivity:75,totalAtoms:40,tpsa:80,rings:2,carbons:12,heteroAtoms:3,rotatable:5,acceptors:4,donors:2};
const fixture=async(smiles="CC(=O)Oc1ccccc1C(=O)O",name="Aspirin")=>{
  const r=await engine,graph=importSmiles(r,smiles,name),d={...calculateToolkit(r,graph),structureKey:chemistryKey(graph)};
  let count=0;const ids=()=>`phase2-${++count}`;
  const project=addProject(emptyWorkspace("test"),"Study","","project").data;
  return {r,graph,d,ids,...saveVersion(project,"project",null,graph,ids)};
};
for(const [id,ranges] of Object.entries(extendedRanges)) for(const range of ranges) test(`${id} ${range.input}: inclusive boundaries and precise violations`,()=>{
  for(const bound of [range.minimum,range.maximum].filter((v):v is number=>v!==undefined)) {
    const c=evaluateExtendedRanges({...valid,[range.input]:bound}).find(r=>r.id===id)!.criteria.find(c=>c.input===range.input)!;
    assert.equal(c.status,"within-limit");
  }
  const delta=range.count?1:.00000001;
  for(const value of [range.minimum===undefined?undefined:range.minimum-delta,range.maximum===undefined?undefined:range.maximum+delta].filter((v):v is number=>v!==undefined)) {
    const c=evaluateExtendedRanges({...valid,[range.input]:value}).find(r=>r.id===id)!.criteria.find(c=>c.input===range.input)!;
    assert.equal(c.status,"violation");assert.equal(Number(extendedCriterionValue(c)),value);
  }
});
test("invalid and absent extended inputs cannot pass; applicability applies to every filter",()=>{
  for(const value of [undefined,NaN,Infinity,-1,2.5])assert.equal(evaluateExtendedRanges({...valid,totalAtoms:value})[0].status,"not-evaluable");
  assert.ok(evaluateExtendedRanges(valid,["Unsupported input"]).every(r=>r.status==="not-evaluable"&&r.violations===null));
  assert.ok(evaluateExtendedRanges({}).every(r=>r.status==="not-evaluable"));
});
test("aspirin uses total H-inclusive atoms and has the expected five-filter outcomes",async()=>{
  const f=await fixture(),result=screenExtendedDrugLikeness(f.graph,f.d);
  assert.equal(result.rules.length,5);
  assert.deepEqual(result.rules.map(r=>[r.id,r.violations]),[["lipinski",0],["veber",0],["ghose",0],["egan",0],["muegge",1]]);
  assert.equal(result.rules.find(r=>r.id==="ghose")!.criteria.find(c=>c.input==="totalAtoms")!.value,21);
  assert.equal(result.rules.find(r=>r.id==="muegge")!.criteria.find(c=>c.input==="weight")!.status,"violation");
});
test("ibuprofen meets all five implemented filters; zwitterions are not evaluated",async()=>{
  const f=await fixture("CC(C)Cc1ccc(C(C)C(=O)O)cc1","Ibuprofen");
  assert.ok(screenExtendedDrugLikeness(f.graph,f.d).rules.every(r=>r.status==="within-guideline"));
  const z=await fixture("[NH3+]CC(=O)[O-]");assert.ok(screenExtendedDrugLikeness(z.graph,z.d).rules.every(r=>r.status==="not-evaluable"));
});
test("two-filter history survives five-filter saves and old/new backup validation",async()=>{
  const f=await fixture(),v1=saveDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids),old=JSON.stringify(v1.results);
  const next=saveExtendedDrugLikeness(v1,f.versionId,f.graph,f.d,f.ids);
  assert.equal(next.results.length,3);assert.equal(JSON.stringify(next.results.slice(0,2)),old);
  assert.doesNotThrow(()=>validateWorkspace(v1,"test"));assert.doesNotThrow(()=>validateWorkspace(next,"test"));
  assert.equal(saveExtendedDrugLikeness(next,f.versionId,f.graph,f.d,f.ids).results.length,3);
  const changed=structuredClone(next),result=changed.results.find(r=>r.method==="drug-likeness-v2")!;
  result.screening.rules[2].criteria[0].minimum=0;
  assert.throws(()=>validateWorkspace(changed,"test"),/screening/);
});
test("alert definition files retain pinned hashes and all names/SMARTS from the source",()=>{
  const manifest=JSON.parse(readFileSync("vendor/rdkit-filter-catalog/manifest.json","utf8"));
  for(const f of manifest.files){const raw=readFileSync(`vendor/rdkit-filter-catalog/${f.file}`);assert.equal(createHash("sha256").update(raw).digest("hex"),f.sha256);}
  assert.ok(readFileSync("vendor/rdkit-filter-catalog/LICENSE.txt","utf8").includes("BSD 3-Clause"));
  const generated=spawnSync(process.execPath,["tools/build-alert-catalog.mjs","--check"],{encoding:"utf8"});
  assert.equal(generated.status,0,generated.stdout+generated.stderr);
});
test("RDKit reference PAINS examples preserve first-match names and heavy-atom mappings",async()=>{
  const r=await engine,lines=readFileSync("vendor/rdkit-filter-catalog/reference-pains.smi","utf8").trim().split(/\r?\n/).slice(1);
  const expectedAtoms=[[23,22,20,19,25,24,18,17,16,21],[11,12,13,14,15,10,9,8,7,6,5,17,16],[0,1,2,4,5,6,7,8,9,14,15,16]];
  for(const [i,line] of lines.entries()) {
    const [smiles,name]=line.split(/\s+/);
    // The app rejects stereo input. The reference matcher is stereo-agnostic;
    // this connectivity-only fixture removes bond-direction annotations for that test only.
    const graph=importSmiles(r,smiles.replace(/[\\/]/g,""),name),result=await calculateAlerts(r,graph);
    const first=result.matches.find(m=>alertPatterns.find(p=>p.id===m.patternId)!.set==="PAINS")!;
    assert.equal(alertPatterns.find(p=>p.id===first.patternId)!.name,name);
    for(const index of expectedAtoms[i])assert.ok(first.atomIds.includes(graph.atoms[index].id),`${name}: atom ${index}`);
  }
});
test("alert cancellation, unsupported size and mixtures never produce a completed zero",async()=>{
  const f=await fixture(),controller=new AbortController();controller.abort();
  await assert.rejects(calculateAlerts(f.r,f.graph,{signal:controller.signal}),/cancelled/);
  const nextController=new AbortController();await assert.rejects(calculateAlerts(f.r,f.graph,{signal:nextController.signal,yieldTask:async()=>{nextController.abort();}}),/cancelled/);
  const mixture=await fixture("CCO.CCO");const missing=await calculateAlerts(f.r,mixture.graph);
  assert.equal(missing.status,"not-evaluable");assert.equal(missing.scannedPatterns,0);validateAlertResult(missing,mixture.graph);
  const huge=await fixture("C".repeat(251));assert.equal((await calculateAlerts(f.r,huge.graph)).status,"not-evaluable");
});
test("matched occurrence caps are labelled, and saved atom mappings reject tampering",async()=>{
  const f=await fixture("C".repeat(150)),result=await calculateAlerts(f.r,f.graph);
  const chain=result.matches.find(m=>alertPatterns.find(p=>p.id===m.patternId)!.name==="Aliphatic_long_chain")!;
  assert.equal(chain.occurrences,128);assert.equal(chain.truncated,true);validateAlertResult(result,f.graph);
  const corrupted=structuredClone(result);corrupted.matches[0].atomIds.push("not-an-editor-atom");assert.throws(()=>validateAlertResult(corrupted,f.graph),/mapping/);
});
test("alerts persist immutably; incorrect version/key/catalog/mappings cannot be saved or restored",async()=>{
  const f=await fixture("Oc1ccccc1O","Catechol"),alerts=await calculateAlerts(f.r,f.graph);
  const data=saveStructuralAlerts(f.data,f.versionId,f.graph,alerts,f.ids());
  assert.equal(f.data.results.length,0);assert.equal(data.results.length,1);assert.doesNotThrow(()=>validateWorkspace(data,"test"));
  assert.equal(saveStructuralAlerts(data,f.versionId,f.graph,alerts).results.length,1);
  for(const change of [
    (a:typeof alerts)=>{a.structureKey="wrong";},
    (a:typeof alerts)=>{a.catalogVersion="unknown" as typeof alerts.catalogVersion;},
    (a:typeof alerts)=>{a.matches[0].patternId="unknown";},
    (a:typeof alerts)=>{a.matches[0].atomIds=["missing"];},
    (a:typeof alerts)=>{a.scannedPatterns=584;},
  ]){const bad=structuredClone(alerts);change(bad);assert.throws(()=>saveStructuralAlerts(data,f.versionId,f.graph,bad));}
  const edited=structuredClone(f.graph);edited.metadata.name="New name";assert.throws(()=>saveStructuralAlerts(data,f.versionId,edited,alerts),/unchanged/);
});
test("alert CSV and highlighted SVG contain the actual saved mappings, source and safe names",async()=>{
  const f=await fixture("CC=O","=unsafe <name>"),alerts=await calculateAlerts(f.r,f.graph),match=alerts.matches[0];
  const csv=alertsCsv(alerts,{name:f.graph.metadata.name,versionId:f.versionId,versionNumber:1,resultId:"stored",createdAt:"2026-11-10T00:00:00Z"});
  assert.ok(csv.includes("'=unsafe"));assert.ok(csv.includes(alerts.catalogVersion));assert.ok(csv.includes(match.atomIds[0]));
  const svg=moleculeSvg(f.graph,{highlightAtoms:match.atomIds,highlightBonds:match.bondIds});
  assert.ok(svg.includes('fill-opacity="0.32"'));assert.ok(svg.includes("&lt;name&gt;"));assert.ok(!svg.includes("<name>"));
});
test("repository failure cannot partially publish structural alerts",async()=>{
  let saved:WorkspaceData|null=null,fail=false;
  const repo:WorkspaceRepository={ownerId:"test",async load(){return saved;},async save(data){if(fail)throw new Error("Storage full");saved=validateWorkspace(data,"test");}};
  const s=createWorkspaceStore(repo);await s.getState().initialize();const p=await s.getState().createProject("Test","");
  const f=await fixture("CC=O"),v=await s.getState().saveVersion(p,null,f.graph),alerts=await calculateAlerts(f.r,f.graph);
  fail=true;await assert.rejects(s.getState().saveStructuralAlerts(v,f.graph,alerts),/Storage full/);assert.equal(s.getState().data.results.length,0);
  fail=false;await s.getState().saveStructuralAlerts(v,f.graph,alerts);const fresh=createWorkspaceStore(repo);await fresh.getState().initialize();assert.equal(fresh.getState().data.results.length,1);
});
test("plot values and exports are built solely from the selected saved descriptor snapshot",async()=>{
  const f=await fixture(),data=saveExtendedDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids),source=data.results.find(r=>r.method==="rdkit-descriptors-v1")!;
  const chart=buildPropertyPlot(source,data.versions[0],"logP","tpsa",true);
  assert.equal(chart.xValue,f.d.logP);assert.equal(chart.yValue,f.d.tpsa);assert.ok(chart.svg.includes(source.id));assert.ok(chart.svg.includes("Reference 140"));
  assert.ok(!buildPropertyPlot(source,data.versions[0],"logP","tpsa",false).svg.includes("Reference 140"));
  const edited=structuredClone(f.graph);edited.atoms[0].element="N";
  assert.equal(buildPropertyPlot(source,data.versions[0],"logP","tpsa",true).svg,chart.svg);
  assert.throws(()=>buildPropertyPlot({...source,versionId:"other"},data.versions[0],"logP","tpsa",true),/does not match/);
});
test("plots include negative/outlier values, reject invalid numbers and escape metadata",async()=>{
  const f=await fixture("CCO","<script>alert(1)</script>"),data=saveExtendedDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids),base=data.results.find(r=>r.method==="rdkit-descriptors-v1")!;
  for(const key of Object.keys(plotProperties) as (keyof typeof plotProperties)[]) {
    for(const value of [-100,0,10000]) {const [min,max]=plotRange(key,value);assert.ok(min<value&&max>value);}
    assert.throws(()=>plotRange(key,NaN),/finite/);
  }
  const source:SavedDescriptorAnalysis={...base,descriptors:{...base.descriptors,logP:-10,tpsa:400}};
  const chart=buildPropertyPlot(source,data.versions[0],"logP","tpsa",true);
  assert.ok(chart.point.x>95&&chart.point.x<660&&chart.point.y>95&&chart.point.y<355);
  assert.ok(chart.svg.includes("&lt;script&gt;"));assert.ok(!chart.svg.includes("<script>"));
});
test("all Phase 2 destinations are recognized without server rewrites",()=>{
  for(const route of ["drug-likeness","medicinal-chemistry","visualizations"])assert.equal(parseRoute(`#/${route}`),route);
});
