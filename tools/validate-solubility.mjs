import fs from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import initRDKit from "@rdkit/rdkit";
const require=createRequire(import.meta.url);
const {calculateESOL,esolValidation,esolReferenceRanges}=require("../.test-build/src/features/solubility/model.js");
const directory=process.argv[2]??"qa/esol";
function csv(name){const text=fs.readFileSync(`${directory}/${name}`,"utf8");let fields=[],value="",quoted=false;const records=[];for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){value+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n'||c==='\r')){fields.push(value);value="";if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(fields.some(Boolean))records.push(fields);fields=[];}}else value+=c;}fields.push(value);if(fields.some(Boolean))records.push(fields);const headers=records.shift();return records.map(row=>Object.fromEntries(headers.map((h,i)=>[h,row[i]])));}
const r=await initRDKit();
function descriptor(smiles){const mol=r.get_mol(smiles);if(!mol)throw Error("Invalid benchmark SMILES");try{const d=JSON.parse(mol.get_descriptors()),j=JSON.parse(mol.get_json()),aromatic=j.molecules[0].extensions.find(e=>e.name==="rdkitRepresentation")?.aromaticAtoms?.length??0;return {inputs:{weight:d.amw,logP:d.CrippenClogP,rotatable:d.NumRotatableBonds,aromaticProportion:aromatic/mol.get_num_atoms()},identity:mol.get_smiles(JSON.stringify({doIsomericSmiles:false}))};}finally{mol.delete();}}
const training=csv("delaney.csv"),external=csv("dls_100_unique.csv"),reference=csv("solubility_comparison.csv"),keys=new Set(),ranges=Object.fromEntries(Object.keys(esolReferenceRanges).map(k=>[k,[Infinity,-Infinity]]));
for(const row of training){const d=descriptor(row.SMILES);keys.add(d.identity);for(const [key,value] of Object.entries(d.inputs)){ranges[key][0]=Math.min(ranges[key][0],value);ranges[key][1]=Math.max(ranges[key][1],value);}}
let sq=0,abs=0,bias=0,overlap=0,maxDifference=0;const predictions=[];
for(const row of external){const d=descriptor(row.SMILES),prediction=calculateESOL(d.inputs),measured=Number(row["LogS exp (mol/L)"]),error=prediction.logS-measured;if(keys.has(d.identity))overlap++;sq+=error*error;abs+=Math.abs(error);bias+=error;const golden=reference.find(v=>v["Chemical name"]===row["Chemical name"]);if(!golden)throw Error("Missing external reference");maxDifference=Math.max(maxDifference,Math.abs(prediction.logS-Number(golden.ESOL)));predictions.push({name:row["Chemical name"],measured,predicted:prediction.logS});}
const metrics={count:external.length,rmse:Math.sqrt(sq/external.length),mae:abs/external.length,bias:bias/external.length,overlap,roundedReferenceMaxDifference:maxDifference,trainingCount:training.length};
for(const [key,value] of Object.entries(metrics))if(Math.abs(value-esolValidation[key])>1e-10)throw Error(`Validation metric changed: ${key}`);
for(const key of Object.keys(ranges))for(let i=0;i<2;i++)if(Math.abs(ranges[key][i]-esolReferenceRanges[key][i])>1e-10)throw Error(`Reference range changed: ${key}`);
const hashes=Object.fromEntries(["delaney.csv","dls_100_unique.csv","solubility_comparison.csv"].map(name=>[name,createHash("sha256").update(fs.readFileSync(`${directory}/${name}`)).digest("hex")]));
const result={engine:`RDKit ${r.version()}`,implementationCommit:"d1536c58afe5e0e7ac4c96e2ffef496d5b98664b",metrics,ranges,hashes,notes:"Fixed coefficients; no fitting or selection on the external set. Stereo-aware molecules are evaluated directly for descriptor-only benchmarking; production editor import continues to reject unsupported stereo. Reference-ranges are not a validated similarity applicability domain. DLS source data are not part of the app distribution."};
const pinned=JSON.parse(fs.readFileSync("vendor/esol/validation-summary.json","utf8"));if(JSON.stringify(hashes)!==JSON.stringify(pinned.hashes))throw Error("Validation file hash mismatch");
fs.writeFileSync(`${directory}/validation-results.json`,JSON.stringify({...result,predictions},null,2)+"\n");console.log(JSON.stringify(result,null,2));
