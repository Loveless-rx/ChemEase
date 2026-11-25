import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {estateFeatures} from "../src/features/herg/estateFeatures";
test("EState, hybrid surface and basic mass ports match native descriptor fixtures",()=>{
 const rows=JSON.parse(readFileSync("vendor/herg/estate-reference.json","utf8")) as {atoms:(number|boolean)[][];bonds:(number|boolean)[][];areas:number[];smiles:string;expected:Record<string,number>}[];
 for(const row of rows){const actual=estateFeatures(row.atoms,row.bonds,row.areas);for(const [name,value] of Object.entries(row.expected))assert.ok(Math.abs(actual[name]-value)<1e-8,`${row.smiles} ${name}: ${actual[name]} != ${value}`);}
});
