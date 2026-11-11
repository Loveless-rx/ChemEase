import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync,existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import initRDKit from "@rdkit/rdkit";
import { importSmiles, calculateToolkit, chemistryKey } from "../src/engine/toolkit";
import { calculateESOL, predictSolubility, esolCoefficients, esolReferenceRanges, esolValidation } from "../src/features/solubility/model";
import { addProject,emptyWorkspace,saveVersion,saveSolubility,validateWorkspace } from "../src/features/workspace/domain";
import { comparisonColumns,solubilityText,comparisonCsv } from "../src/features/comparison/model";
import { createReport,storeReport,reportCsv,validateReport } from "../src/features/reports/model";
import { commitBatchRow,batchResultsCsv } from "../src/features/batch/model";
import { solubilityCsv } from "../src/features/solubility/exports";
import { createWorkspaceStore } from "../src/features/workspace/store";
import type { SavedDescriptorAnalysis,WorkspaceRepository } from "../src/features/workspace/types";
import { parseRoute } from "../src/features/workspace/routes";
const engine=initRDKit();
async function fixture(smiles="CC(=O)Oc1ccccc1C(=O)O",name="Aspirin") {const r=await engine,graph=importSmiles(r,smiles,name),d={...calculateToolkit(r,graph),structureKey:chemistryKey(graph)};let n=0;const ids=()=>`esol-${++n}`;const saved=saveVersion(addProject(emptyWorkspace("test"),"Research","","project").data,"project",null,graph,ids);return {r,graph,d,ids,...saved};}
test("pinned ESOL source and licence retain their exact hashes and coefficients",()=>{
  const manifest=JSON.parse(readFileSync("vendor/esol/manifest.json","utf8"));for(const [name,hash] of Object.entries(manifest))assert.equal(createHash("sha256").update(readFileSync(`vendor/esol/${name}`)).digest("hex"),hash);
  const source=readFileSync("vendor/esol/esol.py","utf8");for(const value of Object.values(esolCoefficients))assert.ok(source.includes(String(value)),String(value));assert.ok(readFileSync("vendor/esol/LICENSE","utf8").includes("Patrick Walters"));
  const summary=JSON.parse(readFileSync("vendor/esol/validation-summary.json","utf8"));assert.equal(summary.metrics.rmse,esolValidation.rmse);assert.equal(summary.metrics.count,56);assert.equal(summary.metrics.overlap,0);
});
test("exact ESOL equation contributions and concentration conversion agree with independent arithmetic",()=>{
  const d={weight:180,logP:2,rotatable:3,aromaticProportion:.5},p=calculateESOL(d);
  const expected=.26121066137801696-.7416739523408995*2-.0066138847738667125*180+.003451545565957996*3-.42624840441316975*.5;
  assert.equal(p.logS,expected);assert.equal(p.molPerL,10**expected);assert.equal(p.gPerL,p.molPerL*180);assert.equal(p.contributions.aromaticProportion,-.42624840441316975*.5);
  for(const bad of [NaN,Infinity])assert.throws(()=>calculateESOL({...d,weight:bad}));assert.throws(()=>calculateESOL({...d,rotatable:1.5}));assert.throws(()=>calculateESOL({...d,aromaticProportion:1.1}));
});
for(const [name,smiles,golden] of [["Benzoic acid","O=C(O)c1ccccc1",-1.85],["Ibuprofen","CC(C)Cc1ccc(C(C)C(=O)O)cc1",-3.54],["Trimethoprim","COc1cc(Cc2cnc(N)nc2N)cc(OC)c1OC",-2.82]] as const)test(`${name} matches the model author's rounded external prediction`,async()=>{const f=await fixture(smiles,name),p=predictSolubility(f.graph,f.d);assert.equal(p.status,"predicted");assert.ok(Math.abs(p.logS!-golden)<.0051);});
test("aromatic proportion excludes drawn hydrogen atoms and correct descriptor inputs are retained",async()=>{
  const f=await fixture("c1ccccc1","Benzene"),p=predictSolubility(f.graph,f.d);assert.equal(p.inputs!.aromaticProportion,1);
  const graph=structuredClone(f.graph);graph.atoms.push({...graph.atoms[0],id:"drawn-H",element:"H",aromatic:false,x:90,y:90});graph.bonds.push({id:"H-bond",atomA:graph.atoms[0].id,atomB:"drawn-H",type:"single"});const d={...calculateToolkit(f.r,graph),structureKey:chemistryKey(graph)};assert.equal(graph.atoms.length,7);assert.equal(predictSolubility(graph,d).inputs!.aromaticProportion,1);
  const aspirin=await fixture();assert.equal(predictSolubility(aspirin.graph,aspirin.d).inputs!.aromaticProportion,6/13);
});
test("reference range boundaries are inclusive and extrapolation is rejected with no fabricated zero",async()=>{
  const f=await fixture(),base=predictSolubility(f.graph,f.d).inputs!;
  for(const key of ["weight","logP","rotatable"] as const){for(const bound of esolReferenceRanges[key])assert.equal(predictSolubility(f.graph,{...f.d,[key]:bound}).status,"predicted");const below=esolReferenceRanges[key][0]-(key==="rotatable"?1:1e-6),above=esolReferenceRanges[key][1]+(key==="rotatable"?1:1e-6);for(const value of [below,above]){const p=predictSolubility(f.graph,{...f.d,[key]:value});assert.equal(p.status,"not-evaluable");assert.equal(p.logS,null);assert.equal(p.molPerL,null);}}
  assert.ok(calculateESOL(base).logS<0);
});
test("charged, mixed, inorganic, isotope-labelled, metal and mismatched-engine structures are not evaluated",async()=>{
  for(const smiles of ["CC.[Na+]","[NH3+]CC(=O)[O-]","[13CH4]","[Zn]","O"]){const f=await fixture(smiles),p=predictSolubility(f.graph,f.d);assert.equal(p.status,"not-evaluable");assert.equal(p.logS,null);assert.equal(p.inputs,null);}
  const f=await fixture();assert.equal(predictSolubility(f.graph,{...f.d,engine:"RDKit other"}).status,"not-evaluable");assert.throws(()=>predictSolubility(f.graph,{...f.d,structureKey:"wrong"}),/different structure/);
});
test("solubility saves source and prediction atomically, deduplicates and rejects a changed graph",async()=>{
  const f=await fixture(),before=JSON.stringify(f.data),next=saveSolubility(f.data,f.versionId,f.graph,f.d,f.ids);assert.equal(JSON.stringify(f.data),before);assert.equal(next.results.length,2);assert.equal(saveSolubility(next,f.versionId,f.graph,f.d,f.ids).results.length,2);assert.doesNotThrow(()=>validateWorkspace(next,"test"));
  const edited=structuredClone(f.graph);edited.metadata.name="Changed draft";assert.throws(()=>saveSolubility(next,f.versionId,edited,f.d,f.ids),/Save this molecule version/);
});
test("backup validation rejects altered model, values, validation provenance and descriptor references",async()=>{
  const f=await fixture(),data=saveSolubility(f.data,f.versionId,f.graph,f.d,f.ids);
  for(const key of ["modelVersion","validationVersion","logS","rangeCheck"] as const){const copy=structuredClone(data),r=copy.results.find(r=>r.method==="esol-rdkit-v1")!;Reflect.set(r.prediction,key,"tampered");assert.throws(()=>validateWorkspace(copy,"test"),/solubility/);}
  const copy=structuredClone(data);copy.results.find(r=>r.method==="esol-rdkit-v1")!.descriptorResultId="missing";assert.throws(()=>validateWorkspace(copy,"test"),/descriptor reference/);
});
test("failed repository writes publish no partial solubility result",async()=>{const f=await fixture(),repo:WorkspaceRepository={ownerId:"test",load:async()=>f.data,save:async()=>{throw Error("full");}},store=createWorkspaceStore(repo);await store.getState().initialize();await assert.rejects(store.getState().saveSolubility(f.versionId,f.graph,f.d),/full/);assert.equal(store.getState().data.results.length,0);});
test("comparison joins only the exact descriptor source, never another saved prediction",async()=>{
  const f=await fixture(),data=saveSolubility(f.data,f.versionId,f.graph,f.d,f.ids),c=comparisonColumns(data,[{versionId:f.versionId}])[0];assert.ok(c.solubility);assert.ok(solubilityText(c).includes("log10 mol/L"));assert.ok(comparisonCsv([c]).includes(c.solubility!.prediction.modelVersion));
  const alternate=structuredClone(c.source!) as SavedDescriptorAnalysis;alternate.id="other-descriptors";alternate.createdAt="2099-01-01T00:00:00Z";data.results.push(alternate);assert.equal(comparisonColumns(data,[{versionId:f.versionId,sourceId:alternate.id}])[0].solubility,undefined);
});
test("batch prediction uses shared inputs, preserves the active draft and exports the model provenance",async()=>{
  const f=await fixture(),row={row:1,smiles:f.d.smiles,canonical:f.d.smiles,name:"Batch aspirin",graph:f.graph,status:"ready" as const},saved=commitBatchRow(f.data,"project",row,f.d,{rules:false,alerts:false,solubility:true},undefined,f.ids);assert.deepEqual(saved.data.active,f.data.active);assert.deepEqual(saved.data.draft,f.data.draft);assert.equal(saved.data.results.filter(r=>r.method==="esol-rdkit-v1").length,1);const source=saved.data.results.find(r=>r.method==="rdkit-descriptors-v1")!,csv=batchResultsCsv([{...row,status:"saved",versionId:saved.versionId,descriptorId:source.id}],saved.data);assert.ok(csv.includes("walters-d1536c58"));
});
test("reports freeze predictions, preserve missing snapshots and retain legacy report semantics",async()=>{
  const f=await fixture(),data=saveSolubility(f.data,f.versionId,f.graph,f.d,f.ids),sections={properties:true,rules:false,alerts:false,chart:false,solubility:true},r=createReport(data,[f.versionId],"Prediction","",sections,"logP","tpsa","new-report"),csv=reportCsv(data,r);assert.equal(r.method,"research-report-v3");assert.ok(csv.includes("Predicted aqueous logS"));assert.ok(csv.includes("walters-d1536c58"));assert.doesNotThrow(()=>validateWorkspace(storeReport(data,r),"test"));
  const changed=structuredClone(r);changed.refs[0].solubilityId="missing";assert.throws(()=>validateReport(data,changed),/solubility/);
  const missing=createReport(f.data,[f.versionId],"Before prediction","",sections,"logP","tpsa","missing-report");assert.ok(!reportCsv(data,missing).includes("walters-d1536c58-rdkit"));
  const legacy=structuredClone(r);legacy.method="research-report-v1";delete legacy.sections.solubility;delete legacy.sections.skin;for(const ref of legacy.refs){delete ref.solubilityId;delete ref.skinId;}assert.doesNotThrow(()=>validateReport(data,legacy));assert.ok(!reportCsv(data,legacy).includes("Predicted aqueous logS"));assert.ok(!reportCsv(data,legacy).includes("ESOL: "));
});
test("prediction CSV guards user text and preserves complete precision and missing-state semantics",async()=>{const f=await fixture(),p=predictSolubility(f.graph,f.d),csv=solubilityCsv(p,{name:'=formula, "test"',versionId:f.versionId,sourceId:"source"});assert.ok(csv.includes("'=formula"));assert.ok(csv.includes(String(p.logS)));assert.ok(csv.includes(String(p.molPerL)));assert.ok(csv.includes("source"));const unsupported=await fixture("[NH4+]");assert.ok(solubilityCsv(predictSolubility(unsupported.graph,unsupported.d),{name:"Ion"}).includes("Not evaluable"));assert.equal(parseRoute("#/solubility"),"solubility");});
test("reproducible full external benchmark matches pinned metrics when verification data are available",{skip:!existsSync("qa/esol/dls_100_unique.csv")},()=>{const run=spawnSync(process.execPath,["tools/validate-solubility.mjs"],{encoding:"utf8"});assert.equal(run.status,0,run.stdout+run.stderr);});
