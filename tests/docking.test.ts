import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import type {DockingResult,Asset} from "../src/features/docking/types";
import {validateDockingResult,saveDockingRun,validateDockingRuns,dockingCsv} from "../src/features/docking/model";
import {emptyWorkspace,validateWorkspace} from "../src/features/workspace/domain";
import {parseRoute} from "../src/features/workspace/routes";
const file=(name:string)=>({name,sha256:"a".repeat(64),bytes:100});
function fixture():DockingResult {
  const rec:Asset={id:"a".repeat(32),kind:"receptor",name:"Receptor",ready:true,createdAt:"2026-11-12T00:00:00Z",files:{pdb:file("receptor.pdb"),pdbqt:file("receptor.pdbqt")},settings:{chains:["A"],ph:7.4,rebuildSidechains:true}};
  const lig:Asset={id:"b".repeat(32),kind:"ligand",name:"Ligand",ready:true,createdAt:rec.createdAt,files:{sdf:file("ligand.sdf"),pdbqt:file("ligand.pdbqt")},smiles:"CCO",inputSmiles:"CCO",ph:7.4,charge:0,conformerEnergy:1,source:{kind:"smiles",name:"Ligand",versionId:null,structureKey:null}};
  return {schema:1,jobId:"c".repeat(32),createdAt:rec.createdAt,completedAt:rec.createdAt,engine:"vina",engineVersion:"AutoDock Vina v1.2.7",tools:{rdkit:"2026.9.2"},receptor:rec,ligand:lig,settings:{receptorId:rec.id,ligandId:lig.id,engine:"vina",grid:{center:{x:0,y:0,z:0},size:{x:20,y:20,z:20}},exhaustiveness:8,poses:2,seed:42},poses:[{rank:1,affinity:-6,rmsdLower:0,rmsdUpper:0,contacts:[],truncated:false,method:"Unit fixture only"},{rank:2,affinity:-5,rmsdLower:1,rmsdUpper:2,contacts:[],truncated:false,method:"Unit fixture only"}],mappedHeavyAtomRmsd:[[0,2],[2,0]],rmsdMethod:"Fixed atom mapping; unit fixture",limitations:"Unit fixture only; no claimed experimental affinity"};
}

test("browser execution provenance survives Foundation backup and rejects mixed native/WASM identities",()=>{
  const manifest=JSON.parse(readFileSync("public/docking-wasm/manifest.json","utf8")) as {release:string;sourceCommit:string;assets:Record<string,{sha256:string}>};
  const r=fixture();r.engineVersion="AutoDock Vina v1.2.3 (WebAssembly)";
  r.engineBinarySha256=manifest.assets["webina/vina.wasm"].sha256;
  r.execution={kind:"browser-wasm",release:manifest.release,sourceCommit:manifest.sourceCommit,assetHashes:Object.fromEntries(Object.entries(manifest.assets).map(([key,value])=>[key,value.sha256]))};
  const data=saveDockingRun(emptyWorkspace("browser"),r);
  const restored=validateWorkspace(JSON.parse(JSON.stringify(data)),"browser");
  assert.deepEqual(restored.dockingRuns![0].result.execution,r.execution);
  assert.match(dockingCsv(r),/browser-wasm/);
  for(const change of [(x:DockingResult)=>{x.engineVersion="AutoDock Vina v1.2.7";},(x:DockingResult)=>{x.engineBinarySha256="b".repeat(64);},(x:DockingResult)=>{delete x.execution!.assetHashes["webina/vina.wasm"];},(x:DockingResult)=>{x.execution!.assetHashes["../external.wasm"]="a".repeat(64);},(x:DockingResult)=>{x.execution!.sourceCommit="unrecorded";}]){
    const bad=structuredClone(r);change(bad);assert.throws(()=>validateDockingResult(bad));
  }
});
test("docking snapshot saves independently of descriptor results and retains immutable inputs",()=>{const r=fixture(),data=emptyWorkspace("test"),before=JSON.stringify(data),next=saveDockingRun(data,r);assert.equal(JSON.stringify(data),before);assert.equal(next.results.length,0);assert.equal(next.dockingRuns?.length,1);r.settings.seed=100;assert.equal(next.dockingRuns![0].result.settings.seed,42);assert.doesNotThrow(()=>validateWorkspace(next,"test"));assert.equal(saveDockingRun(next,next.dockingRuns![0].result).dockingRuns?.length,1);});
test("different outputs cannot overwrite an existing docking job ID",()=>{const r=fixture(),data=saveDockingRun(emptyWorkspace("test"),r);r.poses[0].affinity=-99;assert.throws(()=>saveDockingRun(data,r),/different result/);});
test("docking provenance validation rejects wrong engine, hashes, links and finite/rank errors",()=>{for(const change of [(r:DockingResult)=>{r.engine="bad" as "vina";},(r:DockingResult)=>{r.receptor.files.pdb.sha256="bad";},(r:DockingResult)=>{r.ligand.files.sdf.name="../private";},(r:DockingResult)=>{r.settings.ligandId="missing";},(r:DockingResult)=>{r.poses[0].affinity=NaN;},(r:DockingResult)=>{r.poses[1].rank=1;},(r:DockingResult)=>{r.mappedHeavyAtomRmsd=[[0]];},(r:DockingResult)=>{r.settings.grid.size.x=0;},(r:DockingResult)=>{r.settings.seed=0;}]){const r=fixture();change(r);assert.throws(()=>validateDockingResult(r));}});
test("restored docking snapshots retain raw precision and reject missing editor-version links",()=>{const r=fixture();r.poses[0].affinity=-6.123456;const data=saveDockingRun(emptyWorkspace("test"),r),restored=validateWorkspace(JSON.parse(JSON.stringify(data)),"test");assert.equal(restored.dockingRuns![0].result.poses[0].affinity,-6.123456);const bad=fixture();bad.ligand.source={kind:"editor",name:"Draft",versionId:"missing",structureKey:"wrong"};assert.throws(()=>saveDockingRun(emptyWorkspace("test"),bad),/editor ligand/);restored.dockingRuns![0].id="wrong";assert.throws(()=>validateDockingRuns(restored.dockingRuns!,restored));});
test("CSV preserves score units, input hashes and formula-safe user text",()=>{const r=fixture();r.ligand.name='=formula, "test"';r.poses[0].contacts=[{type:"hydrophobic carbon contact",residue:"A:1:PHE",receptorAtom:"CA",ligandAtom:1,distance:3.125,angle:null,ligandDonor:null}];const csv=dockingCsv(r);assert.ok(csv.includes("'=formula"));assert.ok(csv.includes("kcal/mol"));assert.ok(csv.includes("a".repeat(64)));assert.ok(csv.includes("3.125"));assert.ok(csv.includes("Fixed atom mapping"));assert.equal(parseRoute("#/docking"),"docking");});
test("invalid contact values cannot be imported as measured interaction claims",()=>{const r=fixture();r.poses[0].contacts=[{type:"hydrogen-bond candidate",residue:"A:1:ASP",receptorAtom:"O",ligandAtom:1,distance:Infinity,angle:180,ligandDonor:true}];assert.throws(()=>validateDockingResult(r),/contact/);});

function ad4Fixture():DockingResult {
  const r=fixture();r.engine="autodock4";r.engineVersion="AutoDock 4.2.6";r.engineBinarySha256="d".repeat(64);r.settings.engine="autodock4";r.settings.exhaustiveness=null;r.settings.ad4={runs:10,evaluations:2500000};
  r.protocol={method:"Native LGA",scoring:"AD4 estimated binding energy (kcal/mol)",unboundModel:"bound",gridSpacing:.375,npts:[54,54,54],effectiveGrid:{center:{x:0,y:0,z:0},size:{x:20.25,y:20.25,z:20.25}},runs:10,evaluationsPerRun:2500000,population:150,maximumGenerations:27000,seeds:[42,43],poseSelection:"Native cluster leads",chargeModel:"Prepared Gasteiger/template",autogridVersion:"AutoGrid 4.2.6",autogridBinarySha256:"e".repeat(64),mapHashes:{"receptor.C.map":"a".repeat(64),"receptor.e.map":"b".repeat(64),"receptor.d.map":"c".repeat(64),"receptor.maps.fld":"d".repeat(64)}};
  r.poses.forEach((p,i)=>{p.rmsdLower=null;p.rmsdUpper=null;p.sourceRun=i+1;p.cluster=i+1;});return r;
}
test("AD4 runs preserve native protocol, source runs and null Vina RMSD bounds through workspace restore and CSV",()=>{
  const r=ad4Fixture(),next=saveDockingRun(emptyWorkspace("test"),r),restored=validateWorkspace(JSON.parse(JSON.stringify(next)),"test");
  assert.equal(restored.dockingRuns![0].result.protocol!.gridSpacing,.375);
  assert.equal(restored.dockingRuns![0].result.poses[0].rmsdLower,null);
  const csv=dockingCsv(r);assert.ok(csv.includes("AD4 estimated binding energy (kcal/mol)"));assert.ok(csv.includes("Source LGA run"));assert.ok(csv.includes("20.25"));assert.ok(!csv.includes('"Vina score (kcal/mol)"'));
});
test("AD4 restore rejects mixed engine controls, fictitious RMSD bounds, altered maps and incorrect effective grids",()=>{
  for(const change of [(r:DockingResult)=>{r.settings.exhaustiveness=8;},(r:DockingResult)=>{r.poses[0].rmsdLower=0;},(r:DockingResult)=>{r.protocol!.effectiveGrid.size.x=20;},(r:DockingResult)=>{r.protocol!.seeds=[42,42];},(r:DockingResult)=>{r.protocol!.mapHashes["receptor.C.map"]="wrong";},(r:DockingResult)=>{r.poses[0].sourceRun=99;},(r:DockingResult)=>{r.poses[1].cluster=1;},(r:DockingResult)=>{r.protocol=undefined;}]){const r=ad4Fixture();change(r);assert.throws(()=>validateDockingResult(r));}
});
