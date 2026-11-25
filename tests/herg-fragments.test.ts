import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import initRDKit from "@rdkit/rdkit";
import {browserFragmentFeatures,historicalAcceptorCount} from "../src/features/herg/browserFragments";
test("hERG fragment conversion matches all 850 native reference counts without changing chemistry",async()=>{
 const rdkit=await initRDKit();
 const fixture=JSON.parse(readFileSync("vendor/herg/fragment-reference.json","utf8")) as {rows:{smiles:string;values:Record<string,number>}[]};
 assert.equal(fixture.rows.length,10);
 for(const row of fixture.rows){assert.equal(Object.keys(row.values).length,85);assert.deepEqual(browserFragmentFeatures(rdkit,row.smiles),row.values);}
 assert.throws(()=>browserFragmentFeatures(rdkit,"not-a-molecule"),/parse/);
});

test("historical hERG acceptor query matches native counts including caffeine regression",async()=>{
 const rdkit=await initRDKit();const rows=JSON.parse(readFileSync("vendor/herg/acceptor-reference.json","utf8")) as {smiles:string;count:number}[];
 for(const row of rows)assert.equal(historicalAcceptorCount(rdkit,row.smiles),row.count);
 assert.equal(historicalAcceptorCount(rdkit,"Cn1c(=O)c2c(ncn2C)n(C)c1=O"),6);
});
