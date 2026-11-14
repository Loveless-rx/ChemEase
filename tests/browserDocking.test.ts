import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import initRDKit from "@rdkit/rdkit";
import {chemicalIdentity} from "../src/features/docking/browser/identity";
import {pdbAtoms,inspectPdb,cleanProtein,sdfGraph,ligandCarbons,restoreSdf,vinaPoses,validateGrid} from "../src/features/docking/browser/chemistry";
const atom=(serial:number,name:string,x=0,resid=1,kind="ATOM",res="ALA",occupancy=1,alt=" ")=>`${kind.padEnd(6)}${String(serial).padStart(5)} ${name.padStart(4)}${alt}${res} A${String(resid).padStart(4)}    ${x.toFixed(3).padStart(8)}${"0.000".padStart(8)}${"0.000".padStart(8)}${occupancy.toFixed(2).padStart(6)}${"0.00".padStart(6)}          ${name[0].padStart(2)}`;
const protein=()=>Array.from({length:5},(_,i)=>["N","CA","C","O","CB"].map((name,j)=>atom(i*5+j+1,name,i*4+j,i+1)).join("\n")).join("\n");
const sdf="ethanol\n  ChemEase\n\n  3  2  0  0  0  0            999 V2000\n    0.0000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    1.5000    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n    2.5000    0.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  1  0  0  0  0\n  2  3  1  0  0  0  0\nM  END\n$$$$\n";
const qt=(serial:number,x:number,type:string)=>atom(serial,type[0],x).slice(0,66)+"    "+"0.000".padStart(6)+" "+type;
test("cross-format browser identities normalize ordinary H, preserve charge/stereo and reject ambiguous stereocenters",async()=>{
  const kit=await initRDKit();
  for(const text of ["CN","C[NH3+]","CC(=O)[O-]","C[C@H](O)C(=O)O"]){
    const mol=kit.get_mol(text)!;
    try{assert.deepEqual(chemicalIdentity(kit,mol.add_hs()),chemicalIdentity(kit,text));}finally{mol.delete();}
  }
  assert.equal(chemicalIdentity(kit,"C[NH3+]").charge,1);
  assert.equal(chemicalIdentity(kit,"CC(=O)[O-]").charge,-1);
  assert.notEqual(chemicalIdentity(kit,"C[C@H](O)C(=O)O").smiles,chemicalIdentity(kit,"C[C@@H](O)C(=O)O").smiles);
  assert.throws(()=>chemicalIdentity(kit,"CC(O)C(=O)O",true),/unspecified stereocenters/);
});
test("browser receptor inspection selects occupancy/model and refuses missing-heavy-atom preparation",()=>{const p=protein();assert.equal(inspectPdb(p).chains[0].atoms,25);assert.equal(pdbAtoms(p+"\nENDMDL\n"+atom(99,"C",999)).length,25);const alt=atom(1,"CA",1,1,"ATOM","ALA",.2,"A")+"\n"+atom(2,"CA",2,1,"ATOM","ALA",.8,"B");assert.equal(pdbAtoms(alt)[0].xyz[0],2);assert.ok(cleanProtein(p,["A"]).endsWith("END\n"));assert.throws(()=>cleanProtein(p.replace(/^.* CB .*\n/m,""),["A"]));assert.throws(()=>cleanProtein(p,["B"]));});
test("browser ligand mapping preserves source SDF bonds and atom identity while changing only pose coordinates",()=>{const pdbqt=[qt(1,0,"C"),qt(2,1.5,"C"),qt(3,2.5,"OA")].join("\n");assert.deepEqual(ligandCarbons(sdf,pdbqt),[1]);const pose=[qt(3,5,"OA"),qt(1,3,"C"),qt(2,4,"C")].join("\n");const restored=restoreSdf(sdf,pose);assert.deepEqual(restored.coords.map(p=>p[0]),[3,4,5]);assert.deepEqual(sdfGraph(restored.sdf).neighbors,sdfGraph(sdf).neighbors);assert.ok(restored.sdf.includes("  2  3  1"));assert.throws(()=>restoreSdf(sdf,qt(1,0,"C")));assert.throws(()=>ligandCarbons(sdf,pdbqt.replace("  2.500","  9.500")));});
test("browser Vina score parser and grid checks reject incomplete/nonfinite results",()=>{const output="MODEL 1\nREMARK VINA RESULT: -6.125 0 0\nENDMDL\n";assert.equal(vinaPoses(output,1)[0].affinity,-6.125);assert.throws(()=>vinaPoses(output.replace("-6.125","nan"),1));assert.throws(()=>vinaPoses(output+output,1));assert.throws(()=>validateGrid({center:{x:0,y:0,z:0},size:{x:40,y:40,z:40}}));});
test("vendored browser engines and chemistry data match the pinned asset manifest",()=>{const manifest=JSON.parse(readFileSync("public/docking-wasm/manifest.json","utf8")) as {assets:Record<string,{bytes:number;sha256:string}>};assert.equal(Object.keys(manifest.assets).length,9);for(const [name,value] of Object.entries(manifest.assets)){const data=readFileSync("public/docking-wasm/"+name);assert.equal(data.length,value.bytes);assert.equal(createHash("sha256").update(data).digest("hex"),value.sha256,name);}});
