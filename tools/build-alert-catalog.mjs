import {readFileSync,writeFileSync} from "node:fs";
import {createHash} from "node:crypto";
const directory="vendor/rdkit-filter-catalog";
const manifest=JSON.parse(readFileSync(`${directory}/manifest.json`,"utf8"));
const stringToken='"(?:[^"\\\\]|\\\\.)*"';
const entryPattern=new RegExp('\\{\\s*('+stringToken+')\\s*,\\s*((?:'+stringToken+'\\s*)+),\\s*(\\d+)\\s*,\\s*'+stringToken+'\\s*\\}',"g");
const patterns=[];
for(const file of manifest.files) {
  const bytes=readFileSync(`${directory}/${file.file}`);
  if(createHash("sha256").update(bytes).digest("hex")!==file.sha256)throw new Error(`Source hash changed: ${file.file}. Review the source and version before updating the catalog.`);
  const entries=[...bytes.toString("utf8").matchAll(entryPattern)];
  if(entries.length!==file.patterns)throw new Error(`Unexpected source pattern count: ${file.file}`);
  const set=file.file==="brenk.in"?"BRENK":"PAINS",subset=file.file==="brenk.in"?"BRENK":file.file.replace(".in","").toUpperCase();
  for(const [i,entry] of entries.entries()) {
    if(Number(entry[3])!==0)throw new Error("Unsupported count semantics in catalog source.");
    patterns.push({id:`${subset}-${String(i+1).padStart(3,"0")}`,set,subset,name:JSON.parse(entry[1]),smarts:entry[2].match(new RegExp(stringToken,"g")).map(token=>JSON.parse(token)).join("")});
  }
}
if(patterns.length!==585)throw new Error("The complete 585-pattern catalog is required.");
const header='// Derived without SMARTS changes from RDKit Release_2026_09_2. BSD-3-Clause.\n// See vendor/rdkit-filter-catalog/LICENSE.txt and manifest.json.\nexport const ALERT_CATALOG_VERSION = "rdkit-2026.09.2-pains-brenk-v1" as const;\nexport interface AlertPattern {id:string;set:"PAINS"|"BRENK";subset:string;name:string;smarts:string}\nexport const alertPatterns:readonly AlertPattern[] = ';
const output=header+JSON.stringify(patterns,null,2)+";\n",path="src/features/medicinalChemistry/catalog.ts";
if(process.argv.includes("--check")) {
  if(readFileSync(path,"utf8").replaceAll("\r\n","\n")!==output)throw new Error("Generated alert definitions differ from the pinned scientific source.");
  console.log("Verified all 585 alert definitions against pinned source files.");
} else {writeFileSync(path,output);console.log("Generated 585 pinned structural-alert definitions.");}
