import type {DockingResult,SavedDockingRun} from "./types";
import type {WorkspaceData} from "../workspace/types";
import {canonicalJson} from "../../utils/canonicalJson";

export function validateDockingResult(r:DockingResult){
  if(r?.engineBinarySha256!==undefined&&!/^[a-f0-9]{64}$/.test(r.engineBinarySha256))throw new Error("Invalid docking engine binary provenance.");
  if(!r||r.schema!==1||r.engine!=="vina"||!/^[a-f0-9]{32}$/.test(r.jobId)||typeof r.engineVersion!=="string"||r.engineVersion.length>120||!Number.isFinite(Date.parse(r.createdAt))||!Number.isFinite(Date.parse(r.completedAt))||typeof r.limitations!=="string"||r.limitations.length>5000)throw new Error("Invalid docking result provenance.");
  for(const asset of [r.receptor,r.ligand]){
    if(!asset||asset.ready!==true||!/^[a-f0-9]{32}$/.test(asset.id)||typeof asset.name!=="string"||asset.name.length>120||!asset.files||Object.keys(asset.files).length>20)throw new Error("Invalid docking preparation snapshot.");
    for(const file of Object.values(asset.files))if(!/^[a-f0-9]{64}$/.test(file.sha256)||!Number.isSafeInteger(file.bytes)||file.bytes<=0||typeof file.name!=="string"||!/^[\w.-]{1,120}$/.test(file.name))throw new Error("Invalid docking artifact manifest.");
  }
  if(r.receptor.kind!=="receptor"||r.ligand.kind!=="ligand"||!r.receptor.files.pdb||!r.receptor.files.pdbqt||!r.ligand.files.sdf||!r.ligand.files.pdbqt)throw new Error("Docking snapshots need complete prepared receptor and ligand manifests.");
  const source=r.ligand.source;if(!source||!["editor","smiles","sdf"].includes(source.kind)||typeof source.name!=="string"||source.name.length>120||(source.versionId!==null&&(typeof source.versionId!=="string"||source.versionId.length>100))||(source.structureKey!==null&&(typeof source.structureKey!=="string"||source.structureKey.length>100000)))throw new Error("Invalid docking ligand source snapshot.");
  if(source.kind!=="editor"&&(source.versionId!==null||source.structureKey!==null))throw new Error("Imported docking ligands cannot claim an editor version.");
  if(!r.settings||r.settings.receptorId!==r.receptor.id||r.settings.ligandId!==r.ligand.id||r.settings.engine!=="vina"||!Number.isSafeInteger(r.settings.seed)||r.settings.seed<1||!Number.isSafeInteger(r.settings.exhaustiveness)||r.settings.exhaustiveness<1||r.settings.exhaustiveness>32||!Number.isSafeInteger(r.settings.poses)||r.settings.poses<1||r.settings.poses>20)throw new Error("Invalid docking settings.");
  const g=r.settings.grid;for(const axis of ["x","y","z"] as const)if(!Number.isFinite(g?.center?.[axis])||Math.abs(g.center[axis])>10000||!Number.isFinite(g?.size?.[axis])||g.size[axis]<6||g.size[axis]>40)throw new Error("Invalid docking grid.");
  if(g.size.x*g.size.y*g.size.z>40000)throw new Error("Docking grid exceeds supported volume.");
  if(!Array.isArray(r.poses)||!r.poses.length||r.poses.length>r.settings.poses)throw new Error("Invalid docking pose count.");
  for(const [i,p] of r.poses.entries()){
    if(p.rank!==i+1||![p.affinity,p.rmsdLower,p.rmsdUpper].every(Number.isFinite)||p.rmsdLower<0||p.rmsdUpper<p.rmsdLower||!Array.isArray(p.contacts)||p.contacts.length>2000||typeof p.truncated!=="boolean"||typeof p.method!=="string"||p.method.length>5000)throw new Error("Invalid docking pose values.");
    for(const c of p.contacts){if(!["hydrogen-bond candidate","hydrophobic carbon contact"].includes(c.type)||![c.residue,c.receptorAtom].every(v=>typeof v==="string"&&v.length<=100)||!Number.isFinite(c.distance)||c.distance<0||c.distance>4||!Number.isSafeInteger(c.ligandAtom)||c.ligandAtom<1||(c.angle!==null&&(!Number.isFinite(c.angle)||c.angle<0||c.angle>180)))throw new Error("Invalid docking contact geometry.");
      if(c.type==="hydrogen-bond candidate"&&(c.distance>3.5||c.angle===null||c.angle<120||typeof c.ligandDonor!=="boolean"))throw new Error("Hydrogen-bond candidate violates its recorded geometry criteria.");
      for(const position of [c.ligandPosition,c.receptorPosition])if(position!==undefined&&(!Array.isArray(position)||position.length!==3||position.some(v=>!Number.isFinite(v)||Math.abs(v)>10000)))throw new Error("Invalid docking interaction coordinates.");
    }
  }
  if(!Array.isArray(r.mappedHeavyAtomRmsd)||r.mappedHeavyAtomRmsd.length!==r.poses.length||r.mappedHeavyAtomRmsd.some(row=>!Array.isArray(row)||row.length!==r.poses.length||row.some(v=>!Number.isFinite(v)||v<0)))throw new Error("Invalid pose comparison matrix.");
  return r;
}
export function saveDockingRun(data:WorkspaceData,result:DockingResult){
  validateDockingResult(result);const next=structuredClone(data),existing=next.dockingRuns?.find(r=>r.id===result.jobId);
  if(existing){if(canonicalJson(existing.result)!==canonicalJson(result))throw new Error("A different result already uses this docking job ID.");return next;}
  if((data.dockingRuns?.length??0)>=100)throw new Error("Export a backup before exceeding 100 retained docking runs.");
  const versionId=result.ligand.source?.versionId;
  if(versionId&&!data.versions.some(v=>v.id===versionId&&v.structureKey===result.ligand.source?.structureKey))throw new Error("The editor ligand source version is not in this workspace.");
  next.dockingRuns=[...(next.dockingRuns??[]),{id:result.jobId,savedAt:new Date().toISOString(),result:structuredClone(result)}];
  if(new TextEncoder().encode(JSON.stringify(next)).byteLength>20*1024*1024)throw new Error("This run would exceed the 20 MB local workspace size limit. Download its docking ZIP/PDF/CSV instead.");return next;
}
export function validateDockingRuns(rows:SavedDockingRun[],data:WorkspaceData){
  if(!Array.isArray(rows)||rows.length>100||new Set(rows.map(r=>r.id)).size!==rows.length)throw new Error("Invalid docking history.");
  for(const row of rows){if(row.id!==row.result?.jobId||!Number.isFinite(Date.parse(row.savedAt)))throw new Error("Invalid saved docking record.");validateDockingResult(row.result);const id=row.result.ligand.source?.versionId;if(id&&!data.versions.some(v=>v.id===id&&v.structureKey===row.result.ligand.source?.structureKey))throw new Error("Invalid docking ligand version link.");}
}
const cell=(v:unknown)=>`"${(typeof v==="number"?String(v):String(v??"").replace(/^\s*[=+@-]/,"'$&")).replaceAll('"','""')}"`;
export function dockingCsv(r:DockingResult){validateDockingResult(r);const rows:unknown[][]=[["Job",r.jobId],["Engine",r.engineVersion],["Receptor",r.receptor.name],["Ligand",r.ligand.name],["Ligand SMILES",r.ligand.smiles],["Editor version",r.ligand.source?.versionId??"Imported / editor draft"],["Grid and search",JSON.stringify(r.settings)],["Preparation versions",JSON.stringify(r.tools)],["Receptor artifact hashes",JSON.stringify(r.receptor.files)],["Ligand artifact hashes",JSON.stringify(r.ligand.files)],["Rank","Vina score (kcal/mol)","Vina RMSD lower (Å)","Vina RMSD upper (Å)"]];for(const p of r.poses){rows.push([p.rank,p.affinity,p.rmsdLower,p.rmsdUpper]);for(const c of p.contacts)rows.push(["Contact",p.rank,c.type,c.residue,c.receptorAtom,c.ligandAtom,c.distance,c.angle]);}rows.push(["RMSD method",r.rmsdMethod],["Limitations",r.limitations]);return "\ufeff"+rows.map(row=>row.map(cell).join(",")).join("\r\n");}
