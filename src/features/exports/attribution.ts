import {unzipSync,zipSync,strToU8} from "fflate";
import {exportIdentity} from "../account/access";
/** Append metadata without changing chemical coordinates or descriptor values. */
export async function attributeDataFile(blob:Blob,name:string,identity=exportIdentity()):Promise<Blob>{
 if(!identity)return blob;
 const ext=name.split(".").pop()?.toLowerCase();
 if(ext==="zip"){
  const files=unzipSync(new Uint8Array(await blob.arrayBuffer()));
  files["ChemEase-export-attribution.txt"]=strToU8(`ChemEase / Research export\nExported by: ${identity}\nhttps://loveless-rx.github.io/ChemEase/\nScientific files retain their original values and provenance.\n`);
  const bytes=zipSync(files);return new Blob([bytes.buffer as ArrayBuffer],{type:blob.type});
 }
 if(!["csv","json","sdf","mol"].includes(ext??""))return blob;
 const text=await blob.text();
 if(ext==="json"){
  const value=JSON.parse(text);
  if(value&&typeof value==="object"&&!Array.isArray(value))value.exportAttribution={application:"ChemEase",exportedBy:identity,site:"https://loveless-rx.github.io/ChemEase/"};
  return new Blob([JSON.stringify(value,null,2)],{type:blob.type});
 }
 if(ext==="csv"){
  const cell=(v:string)=>`"${v.replace(/^\s*[=+@-]/,"'$&").replaceAll('"','""')}"`;
  return new Blob([text,"\r\n",["Export application","ChemEase"].map(cell).join(","),"\r\n",["Exported by",identity].map(cell).join(",")],{type:blob.type});
 }
 if(ext==="mol"){
  const lines=text.split("\n");if(lines.length>=3)lines[2]=`ChemEase | Exported by ${identity}`;
  return new Blob([lines.join("\n")],{type:blob.type});
 }
 return new Blob([text.replace(/\$\$\$\$/g,()=>`>  <CHEMEASE_EXPORT_APPLICATION>\nChemEase\n\n>  <CHEMEASE_EXPORTED_BY>\n${identity}\n\n$$$$`)],{type:blob.type});
}
