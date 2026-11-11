import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { importSmiles } from "../src/engine/toolkit";
import { calculateAlerts, validateAlertResult } from "../src/features/medicinalChemistry/analysis";
import { alertPatterns } from "../src/features/medicinalChemistry/catalog";
const engine=initRDKit();
test("all 585 pinned SMARTS compile in the installed RDKit runtime",async()=>{
  const r=await engine;
  assert.equal(alertPatterns.filter(p=>p.set==="PAINS").length,480);
  assert.equal(alertPatterns.filter(p=>p.set==="BRENK").length,105);
  assert.equal(new Set(alertPatterns.map(p=>p.id)).size,585);
  for(const p of alertPatterns){const q=r.get_qmol(p.smarts);assert.ok(q,p.id);q.delete();}
});
for(const [smiles,name,expected] of [["CCO","ethanol",[]],["CC=O","aldehyde",["aldehyde"]],["Oc1ccccc1O","catechol",["catechol"]],["O=C1C=CC(=O)C=C1","quinone",["quinone_A(370)","chinone_1"]]] as const) test(`complete structural screen and atom mapping: ${name}`,async()=>{
  const r=await engine,g=importSmiles(r,smiles,name),before=JSON.stringify(g);
  const result=await calculateAlerts(r,g);validateAlertResult(result,g);
  assert.equal(result.status,"complete");assert.equal(result.scannedPatterns,585);assert.equal(JSON.stringify(g),before);
  for(const label of expected)assert.ok(result.matches.some(m=>alertPatterns.find(p=>p.id===m.patternId)?.name.includes(label)),label);
  if(!expected.length)assert.equal(result.matches.length,0);
});
