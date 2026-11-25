import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildHergGraph,type HergGraph} from "../src/features/herg/graphFeatures";
test("historical Chemprop graph encoding matches native tensors for ten diverse structures",()=>{
 const rows=JSON.parse(readFileSync("vendor/herg/graph-reference.json","utf8")) as {atoms:(number|boolean)[][];bonds:(number|boolean)[][];expected:HergGraph;smiles:string}[];
 for(const row of rows)assert.deepEqual(buildHergGraph(row.atoms,row.bonds),row.expected,row.smiles);
 assert.throws(()=>buildHergGraph([],[]),/size/);
});
