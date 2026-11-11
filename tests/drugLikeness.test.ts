import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { calculateToolkit, importSmiles, chemistryKey } from "../src/engine/toolkit";
import { evaluateRules, screenDrugLikeness, criterionValue, RULES_VERSION, type RuleInput } from "../src/features/drugLikeness/rules";
import { savedScreeningCsv, screeningCsv } from "../src/features/drugLikeness/exports";
import { emptyWorkspace, addProject, saveVersion, saveAnalysis, saveDrugLikeness, validateWorkspace } from "../src/features/workspace/domain";
import { createWorkspaceStore } from "../src/features/workspace/store";
import type { WorkspaceData, WorkspaceRepository } from "../src/features/workspace/types";
import { emptyMolecule } from "../src/models/Molecule";

const engine=initRDKit();
const thresholds:Record<RuleInput,number>={weight:500,logP:5,donors:5,acceptors:10,rotatable:10,tpsa:140};
const fixture=async(smiles="CC(=O)Oc1ccccc1C(=O)O",name="Aspirin")=>{
  const rdkit=await engine,graph=importSmiles(rdkit,smiles,name);
  const d={...calculateToolkit(rdkit,graph),structureKey:chemistryKey(graph)};
  let n=0;const ids=()=>`entry-${++n}`;
  const project=addProject(emptyWorkspace("test"),"Study","","project").data;
  const saved=saveVersion(project,"project",null,graph,ids);
  return {graph,d,ids,...saved};
};

test("inclusive boundaries satisfy every implemented criterion",()=>{
  const result=evaluateRules(thresholds);
  assert.deepEqual(result.rules.map(r=>[r.status,r.violations]),[["within-guideline",0],["within-guideline",0]]);
  for(const rule of result.rules) assert.ok(rule.criteria.every(c=>c.status==="within-limit"));
});
for(const input of Object.keys(thresholds) as RuleInput[]) test(`unrounded ${input} boundary violations are counted`,()=>{
  const value=thresholds[input]+(["donors","acceptors","rotatable"].includes(input)?1:0.00000001);
  const result=evaluateRules({...thresholds,[input]:value});
  const criterion=result.rules.flatMap(r=>r.criteria).find(c=>c.input===input)!;
  assert.equal(criterion.status,"violation");
  assert.ok(Number(criterionValue(criterion))>thresholds[input]);
  const rule=result.rules.find(r=>r.criteria.some(c=>c.input===input))!;
  assert.equal(rule.violations,1);
  assert.equal(rule.status,rule.id==="lipinski"?"within-guideline":"outside-guideline");
});
test("Ro5 permits one visible violation but flags two; Veber requires both checks",()=>{
  const result=evaluateRules({...thresholds,weight:501,donors:6,tpsa:141});
  assert.equal(result.rules[0].status,"outside-guideline");assert.equal(result.rules[0].violations,2);
  assert.equal(result.rules[1].status,"outside-guideline");assert.equal(result.rules[1].violations,1);
});
test("missing, nonfinite and invalid counts never turn into zeros or a passing rule",()=>{
  for(const invalid of [undefined,null,NaN,Infinity,-1,3.5]) {
    const result=evaluateRules({...thresholds,acceptors:invalid});
    assert.equal(result.rules[0].status,"not-evaluable");assert.equal(result.rules[0].violations,null);
    assert.equal(result.rules[0].criteria.find(c=>c.input==="acceptors")!.value,null);
    assert.equal(result.rules[1].status,"within-guideline");
  }
  assert.equal(evaluateRules({}).rules[0].status,"not-evaluable");
  assert.equal(evaluateRules({...thresholds,logP:-3}).rules[0].status,"within-guideline");
});
for(const [smiles,name] of [["CCO","Ethanol"],["CC(=O)Oc1ccccc1C(=O)O","Aspirin"],["Cn1c(=O)c2c(ncn2C)n(C)c1=O","Caffeine"]]) test(`${name} screening uses the shared RDKit descriptor values`,async()=>{
  const f=await fixture(smiles,name),result=screenDrugLikeness(f.graph,f.d);
  assert.deepEqual(result.reasons,[]);
  assert.ok(result.rules.every(r=>r.status==="within-guideline"&&r.violations===0));
  for(const c of result.rules.flatMap(r=>r.criteria)) assert.equal(c.value,f.d[c.input]);
  assert.equal(result.rulesVersion,RULES_VERSION);
});
test("a long hydrocarbon flags Ro5 size and lipophilicity plus Veber flexibility",async()=>{
  const f=await fixture("C".repeat(40));
  const result=screenDrugLikeness(f.graph,f.d);
  assert.ok(f.d.weight>500&&f.d.logP>5&&f.d.rotatable>10);
  assert.equal(result.rules[0].violations,2);assert.equal(result.rules[0].status,"outside-guideline");
  assert.equal(result.rules[1].violations,1);assert.equal(result.rules[1].status,"outside-guideline");
});
for(const [smiles,reason] of [["CCO.CCO","connected"],["[NH3+]CC(=O)[O-]","neutral"],["CC(=O)[O-].[Na+]","neutral"],["O","Carbon-free"]]) test(`unsupported applicability remains explicit for ${smiles}`,async()=>{
  const f=await fixture(smiles),result=screenDrugLikeness(f.graph,f.d);
  assert.ok(result.reasons.some(r=>r.includes(reason)));
  assert.ok(result.rules.every(r=>r.status==="not-evaluable"&&r.violations===null));
  assert.ok(result.rules.flatMap(r=>r.criteria).every(c=>c.status==="not-evaluable"));
});
test("empty/unsupported calculations and stale descriptor bindings are rejected",async()=>{
  const f=await fixture();
  assert.ok(screenDrugLikeness(emptyMolecule()).rules.every(r=>r.status==="not-evaluable"));
  assert.ok(screenDrugLikeness(f.graph).rules.every(r=>r.status==="not-evaluable"));
  assert.throws(()=>screenDrugLikeness(f.graph,{...f.d,structureKey:"different graph"}),/different structure/);
});
test("saving screening atomically retains its source, reuses identical values and deduplicates",async()=>{
  const f=await fixture(),saved=saveDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids);
  assert.equal(saved.results.length,2);assert.equal(f.data.results.length,0);
  const screening=saved.results.find(r=>r.method==="drug-likeness-v1")!;
  assert.equal(screening.method,"drug-likeness-v1");
  if(screening.method!=="drug-likeness-v1")throw new Error();
  const source=saved.results.find(r=>r.id===screening.descriptorResultId)!;
  assert.equal(source.method,"rdkit-descriptors-v1");assert.equal(source.versionId,screening.versionId);
  assert.equal(saveDrugLikeness(saved,f.versionId,f.graph,f.d,f.ids).results.length,2);
  const descriptorsFirst=saveAnalysis(f.data,f.versionId,f.graph,f.d,f.ids());
  assert.equal(saveDrugLikeness(descriptorsFirst,f.versionId,f.graph,f.d,f.ids).results.length,2);
});
test("edits and version switches preserve historical screening and reject stale inputs",async()=>{
  const f=await fixture("CCO","Ethanol"),saved=saveDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids);
  const edited=structuredClone(f.graph);edited.atoms.find(a=>a.element==="O")!.element="N";
  assert.throws(()=>saveDrugLikeness(saved,f.versionId,edited,f.d,f.ids),/Save this molecule version/);
  const v2=saveVersion(saved,"project",saved.active.moleculeId,edited,f.ids);
  assert.throws(()=>saveDrugLikeness(v2.data,v2.versionId,edited,f.d,f.ids),/changed while analysis/);
  const source=saved.results.find(r=>r.method==="rdkit-descriptors-v1")!;
  assert.equal(source.descriptors.smiles,"CCO");assert.deepEqual(saved.results,v2.data.results);
});
test("different live descriptors cannot silently reuse edited backup values",async()=>{
  const f=await fixture();
  const imported=saveAnalysis(f.data,f.versionId,f.graph,{...f.d,logP:99},f.ids());
  const next=saveDrugLikeness(imported,f.versionId,f.graph,f.d,f.ids);
  assert.equal(next.results.length,3);
  const screening=next.results.find(r=>r.method==="drug-likeness-v1")!;
  const source=next.results.find(r=>r.id===screening.descriptorResultId)!;
  assert.equal(source.method,"rdkit-descriptors-v1");
  if(source.method==="rdkit-descriptors-v1")assert.equal(source.descriptors.logP,f.d.logP);
});
test("old descriptor-only backups and new mixed-result backups round-trip without data loss",async()=>{
  const f=await fixture(),old=saveAnalysis(f.data,f.versionId,f.graph,f.d,f.ids());
  assert.deepEqual(validateWorkspace(JSON.parse(JSON.stringify(old)),"test").results,old.results);
  const mixed=saveDrugLikeness(old,f.versionId,f.graph,f.d,f.ids);
  assert.deepEqual(validateWorkspace(JSON.parse(JSON.stringify(mixed)),"test").results,mixed.results);
  const reordered=JSON.parse(JSON.stringify(mixed,(_k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v));
  assert.doesNotThrow(()=>validateWorkspace(reordered,"test"));
  for(const change of [
    (d:WorkspaceData)=>{const r=d.results.find(r=>r.method==="drug-likeness-v1")!;r.descriptorResultId="missing";},
    (d:WorkspaceData)=>{const r=d.results.find(r=>r.method==="drug-likeness-v1")!;r.screening.rules[0].violations=99;},
    (d:WorkspaceData)=>{const r=d.results.find(r=>r.method==="drug-likeness-v1")!;r.screening.rules[0].criteria[0].maximum=9999;},
    (d:WorkspaceData)=>{const r=d.results.find(r=>r.method==="drug-likeness-v1")!;r.screening.rulesVersion="unknown" as typeof RULES_VERSION;},
  ]){const bad=structuredClone(mixed);change(bad);assert.throws(()=>validateWorkspace(bad,"test"));}
});
test("saved CSV uses the recorded structure, exact numbers, statuses and method references",async()=>{
  const f=await fixture("CCO","=unsafe name"),saved=saveDrugLikeness(f.data,f.versionId,f.graph,f.d,f.ids);
  const result=saved.results.find(r=>r.method==="drug-likeness-v1")!,source=saved.results.find(r=>r.method==="rdkit-descriptors-v1")!;
  const csv=savedScreeningCsv(result,source,saved.versions[0]);
  assert.ok(csv.includes("'=unsafe name"));assert.ok(csv.includes(`"${f.d.logP}"`));assert.ok(csv.includes(source.id));
  assert.ok(csv.includes(RULES_VERSION));assert.ok(csv.includes("within-guideline"));assert.ok(csv.includes("10.1021/jm020017n"));
  assert.throws(()=>savedScreeningCsv(result,{...source,id:"unrelated"},saved.versions[0]),/do not match/);
  const unavailable=screeningCsv(screenDrugLikeness(f.graph),{moleculeName:"Draft",smiles:"",engine:"",versionId:"Unsaved",versionNumber:"Unsaved",resultId:"Live",descriptorResultId:"Live",createdAt:"Now"});
  assert.ok(unavailable.includes("Not available"));assert.ok(unavailable.includes("not-evaluable"));
});
test("repository failure cannot partially commit a screening and its descriptor source",async()=>{
  let persisted:WorkspaceData|null=null,fail=false;
  const repo:WorkspaceRepository={ownerId:"test",async load(){return persisted?structuredClone(persisted):null;},async save(data,expected){if(fail)throw new Error("Storage full");assert.equal(persisted?.revision??0,expected);persisted=validateWorkspace(data,"test");}};
  const s=createWorkspaceStore(repo);await s.getState().initialize();
  const p=await s.getState().createProject("Screening","");const f=await fixture();
  const id=await s.getState().saveVersion(p,null,f.graph);fail=true;
  await assert.rejects(s.getState().saveDrugLikeness(id,f.graph,f.d),/Storage full/);
  assert.equal(s.getState().data.results.length,0);assert.equal(persisted!.results.length,0);
  fail=false;await s.getState().saveDrugLikeness(id,f.graph,f.d);
  const reloaded=createWorkspaceStore(repo);await reloaded.getState().initialize();
  assert.equal(reloaded.getState().data.results.length,2);
});
