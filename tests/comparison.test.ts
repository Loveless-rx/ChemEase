import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { importSmiles, calculateToolkit, chemistryKey } from "../src/engine/toolkit";
import { emptyWorkspace, addProject, saveVersion, saveAnalysis, saveDrugLikeness, saveExtendedDrugLikeness, saveStructuralAlerts } from "../src/features/workspace/domain";
import { calculateAlerts } from "../src/features/medicinalChemistry/analysis";
import { comparisonColumns, comparisonCsv, comparisonPlot, descriptorValue, ruleText, alertText, MAX_COMPARISON } from "../src/features/comparison/model";
import { parseRoute } from "../src/features/workspace/routes";
import type { SavedDescriptorAnalysis } from "../src/features/workspace/types";
const engine=initRDKit();
async function fixture(){
  const rdkit=await engine;let n=0;const ids=()=>`compare-${++n}`;
  let data=addProject(emptyWorkspace("test"),"Research","","project").data;
  const aspirin=importSmiles(rdkit,"CC(=O)Oc1ccccc1C(=O)O","Aspirin"),catechol=importSmiles(rdkit,"Oc1ccccc1O","Catechol");
  const a=saveVersion(data,"project",null,aspirin,ids);data=a.data;
  const ad={...calculateToolkit(rdkit,aspirin),structureKey:chemistryKey(aspirin)};
  data=saveExtendedDrugLikeness(data,a.versionId,aspirin,ad,ids);
  data=saveStructuralAlerts(data,a.versionId,aspirin,await calculateAlerts(rdkit,aspirin),ids());
  const b=saveVersion(data,"project",null,catechol,ids);data=b.data;
  return {data,rdkit,ids,aspirin,catechol,ad,a:a.versionId,b:b.versionId};
}
test("comparison reads exact saved inputs without mutating the active draft or historical records",async()=>{
  const f=await fixture(),before=JSON.stringify(f.data),cols=comparisonColumns(f.data,[{versionId:f.a},{versionId:f.b}]);
  assert.equal(JSON.stringify(f.data),before);assert.equal(cols[0].source?.descriptors.weight,f.ad.weight);
  assert.equal(descriptorValue(cols[1],"weight"),undefined);assert.equal(ruleText(cols[1],"lipinski"),"Not calculated");assert.equal(alertText(cols[1],"PAINS"),"Not calculated");
  assert.equal(alertText(cols[0],"PAINS"),"0 matched patterns");assert.equal(alertText(cols[0],"Brenk"),"1 matched patterns");
  assert.match(ruleText(cols[0],"muegge"),/1 violation/);assert.equal(f.data.active.versionId,f.b);
});
test("comparison source selection is exact and never borrows rules from another descriptor snapshot",async()=>{
  const f=await fixture(),original=f.data.results.find((r):r is SavedDescriptorAnalysis=>r.method==="rdkit-descriptors-v1")!;
  const other=structuredClone(original);other.id="different-descriptor";other.engine="RDKit historical";other.descriptors.engine=other.engine;other.createdAt="2099-01-01T00:00:00.000Z";other.descriptors.logP=9;
  f.data.results.push(other);
  const latest=comparisonColumns(f.data,[{versionId:f.a}])[0];assert.equal(latest.source?.id,other.id);assert.equal(latest.screening,undefined);assert.equal(descriptorValue(latest,"logP"),9);
  const pinned=comparisonColumns(f.data,[{versionId:f.a,sourceId:original.id}])[0];assert.equal(pinned.source?.id,original.id);assert.ok(pinned.screening);assert.equal(pinned.alerts?.versionId,f.a);
  assert.throws(()=>comparisonColumns(f.data,[{versionId:f.b,sourceId:original.id}]),/does not belong/);
});
test("legacy two-filter screens retain missing filter status; non-evaluable is distinct from missing",async()=>{
  const f=await fixture();f.data.results=f.data.results.filter(r=>r.method!=="drug-likeness-v2");f.data=saveDrugLikeness(f.data,f.a,f.aspirin,f.ad,f.ids);
  const c=comparisonColumns(f.data,[{versionId:f.a}])[0];assert.match(ruleText(c,"lipinski"),/Within guideline/);assert.equal(ruleText(c,"muegge"),"Not calculated");
  const charged=importSmiles(f.rdkit,"[NH3+]CC(=O)[O-]","Glycine"),saved=saveVersion(f.data,"project",null,charged,f.ids),d={...calculateToolkit(f.rdkit,charged),structureKey:chemistryKey(charged)};
  const data=saveExtendedDrugLikeness(saved.data,saved.versionId,charged,d,f.ids);
  assert.match(ruleText(comparisonColumns(data,[{versionId:saved.versionId}])[0],"lipinski"),/Not evaluable/);
});
test("comparison rejects stale versions, duplicate columns and oversized selections",async()=>{
  const f=await fixture();assert.throws(()=>comparisonColumns(f.data,[{versionId:"missing"}]),/no longer/);
  assert.throws(()=>comparisonColumns(f.data,[{versionId:f.a},{versionId:f.a}]),/only once/);
  assert.throws(()=>comparisonColumns(f.data,Array.from({length:MAX_COMPARISON+1},(_,i)=>({versionId:String(i)}))),/up to 6/);
  assert.equal(parseRoute("#/comparison"),"comparison");
});
test("comparison keeps distinct versions of the same molecule, without taking later-version results",async()=>{
  const f=await fixture(),record=f.data.versions.find(v=>v.id===f.a)!.moleculeId;
  const saved=saveVersion(f.data,"project",record,f.catechol,f.ids),cols=comparisonColumns(saved.data,[{versionId:f.a},{versionId:saved.versionId}]);
  assert.equal(cols[1].version.number,2);assert.equal(cols[1].source,undefined);assert.equal(cols[1].alerts,undefined);assert.ok(cols[0].screening);
});
test("CSV preserves raw precision, missing status, source provenance and guards spreadsheet formulas",async()=>{
  const f=await fixture();f.data.versions.find(v=>v.id===f.a)!.graph.metadata.name='\t=SUM(1,2) "research"';
  const cols=comparisonColumns(f.data,[{versionId:f.a},{versionId:f.b}]),csv=comparisonCsv(cols);
  for(const value of [String(f.ad.weight),cols[0].source!.id,cols[0].screening!.id,cols[0].alerts!.id,"Not calculated","rdkit-descriptors-v1","rdkit-2026.09.2-pains-brenk-v1"])assert.ok(csv.includes(value),value);
  assert.ok(csv.includes(`'\t=SUM(1,2) ""research""`));assert.ok(csv.includes('"PAINS","0 matched patterns","Not calculated"'));
});
test("multi-molecule plot shares scales, preserves negative/outlier values and exports exact provenance",async()=>{
  const f=await fixture(),bd={...calculateToolkit(f.rdkit,f.catechol),structureKey:chemistryKey(f.catechol)};
  f.data=saveAnalysis(f.data,f.b,f.catechol,bd,"catechol-source");
  const cols=comparisonColumns(f.data,[{versionId:f.a},{versionId:f.b}]);cols[0].source!.descriptors.logP=-12;cols[1].source!.descriptors.tpsa=1000;
  const chart=comparisonPlot(cols,"logP","tpsa")!;
  assert.equal(chart.points.length,2);assert.equal(chart.points[0].x,-12);assert.equal(chart.points[1].y,1000);assert.ok(chart.xRange[0]<-12);assert.ok(chart.yRange[1]>1000);
  for(const c of cols){assert.ok(chart.svg.includes(c.source!.id));assert.ok(chart.svg.includes(c.version.id));}
  assert.equal(chart.svg.includes("NaN"),false);assert.match(chart.svg,/Coincident points overlap/);
});
test("plot omits missing and non-finite inputs rather than fabricating zero, and escapes metadata",async()=>{
  const f=await fixture(),cols=comparisonColumns(f.data,[{versionId:f.a},{versionId:f.b}]);
  assert.equal(comparisonPlot(cols,"weight","logP")!.points.length,1);assert.equal(comparisonPlot([cols[1]],"weight","logP"),undefined);
  cols[0].source!.descriptors.logP=NaN;assert.equal(comparisonPlot(cols,"logP","tpsa"),undefined);
  cols[0].source!.descriptors.logP=0;cols[0].version.graph.metadata.name='<script>alert("x")</script>&';
  const chart=comparisonPlot(cols,"logP","tpsa")!;assert.equal(chart.points[0].x,0);assert.ok(!chart.svg.includes("<script>"));assert.ok(chart.svg.includes("&lt;script&gt;"));
});
