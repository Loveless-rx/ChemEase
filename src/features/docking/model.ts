import type {DockingResult,SavedDockingRun} from "./types";
import type {WorkspaceData} from "../workspace/types";
import {canonicalJson} from "../../utils/canonicalJson";

export function validateDockingResult(r:DockingResult){
  if(r?.execution!==undefined){const e=r.execution;if(e.kind!=="browser-wasm"||r.engine!=="vina"||!/^AutoDock Vina v1\.2\.3 \(WebAssembly\)$/.test(r.engineVersion)||e.release!=="molmoda-d458231d"||e.sourceCommit!=="d458231d7ea235fa0e7c60ca8fe1526622e06b88"||!e.assetHashes||Object.keys(e.assetHashes).length!==9||Object.entries(e.assetHashes).some(([k,v])=>!/^(webina|obabel-wasm|reduce)\/[\w.-]+$/.test(k)||!/^[a-f0-9]{64}$/.test(v))||e.assetHashes["webina/vina.wasm"]!==r.engineBinarySha256)throw new Error("Invalid browser runtime provenance.");}
  if(r?.engineBinarySha256!==undefined&&!/^[a-f0-9]{64}$/.test(r.engineBinarySha256))throw new Error("Invalid docking engine binary provenance.");
  if(!r||r.schema!==1||!["vina","autodock4"].includes(r.engine)||!/^[a-f0-9]{32}$/.test(r.jobId)||typeof r.engineVersion!=="string"||r.engineVersion.length>120||!Number.isFinite(Date.parse(r.createdAt))||!Number.isFinite(Date.parse(r.completedAt))||typeof r.limitations!=="string"||r.limitations.length>5000)throw new Error("Invalid docking result provenance.");
  for(const asset of [r.receptor,r.ligand]){
    if(!asset||asset.ready!==true||!/^[a-f0-9]{32}$/.test(asset.id)||typeof asset.name!=="string"||asset.name.length>120||!asset.files||Object.keys(asset.files).length>20)throw new Error("Invalid docking preparation snapshot.");
    for(const file of Object.values(asset.files))if(!/^[a-f0-9]{64}$/.test(file.sha256)||!Number.isSafeInteger(file.bytes)||file.bytes<=0||typeof file.name!=="string"||!/^[\w.-]{1,120}$/.test(file.name))throw new Error("Invalid docking artifact manifest.");
  }
  if(r.receptor.kind!=="receptor"||r.ligand.kind!=="ligand"||!r.receptor.files.pdb||!r.receptor.files.pdbqt||!r.ligand.files.sdf||!r.ligand.files.pdbqt)throw new Error("Docking snapshots need complete prepared receptor and ligand manifests.");
  const source=r.ligand.source;if(!source||!["editor","smiles","sdf"].includes(source.kind)||typeof source.name!=="string"||source.name.length>120||(source.versionId!==null&&(typeof source.versionId!=="string"||source.versionId.length>100))||(source.structureKey!==null&&(typeof source.structureKey!=="string"||source.structureKey.length>100000)))throw new Error("Invalid docking ligand source snapshot.");
  if(source.kind!=="editor"&&(source.versionId!==null||source.structureKey!==null))throw new Error("Imported docking ligands cannot claim an editor version.");
  if(!r.settings||r.settings.receptorId!==r.receptor.id||r.settings.ligandId!==r.ligand.id||r.settings.engine!==r.engine||!Number.isSafeInteger(r.settings.seed)||r.settings.seed<1||r.settings.seed>2147483647||!Number.isSafeInteger(r.settings.poses)||r.settings.poses<1||r.settings.poses>20)throw new Error("Invalid docking settings.");
  if(r.engine==="vina"&&(!Number.isSafeInteger(r.settings.exhaustiveness)||(r.settings.exhaustiveness??0)<1||(r.settings.exhaustiveness??0)>32||r.settings.ad4!=null))throw new Error("Invalid Vina search settings.");
  if(r.engine==="autodock4"){
    const a=r.settings.ad4,p=r.protocol;
    if(!/^AutoDock 4\.2\./.test(r.engineVersion)||!r.engineBinarySha256)throw new Error("Missing native AutoDock 4 engine provenance.");
    if(r.settings.exhaustiveness!=null||!a||!Number.isSafeInteger(a.runs)||a.runs<1||a.runs>50||!Number.isSafeInteger(a.evaluations)||a.evaluations<100000||a.evaluations>10000000||!p||p.runs!==a.runs||p.evaluationsPerRun!==a.evaluations||p.gridSpacing!==.375||p.unboundModel!=="bound"||p.population!==150||p.maximumGenerations!==27000||!/^AutoGrid 4\.2\./.test(p.autogridVersion)||!/^[a-f0-9]{64}$/.test(p.autogridBinarySha256)||JSON.stringify(p).length>30000)throw new Error("Invalid AutoDock 4 protocol provenance.");
    if(!Array.isArray(p.npts)||p.npts.length!==3||!Array.isArray(p.seeds)||p.seeds.length!==2||p.seeds[0]!==r.settings.seed||p.seeds[1]!==r.settings.seed%2147483646+1)throw new Error("Invalid AutoDock 4 seeds/grid.");
    if([p.method,p.scoring,p.chargeModel,p.poseSelection].some(v=>typeof v!=="string"||!v.trim()||v.length>5000))throw new Error("Missing AutoDock 4 protocol interpretation.");
    for(const [i,axis] of (["x","y","z"] as const).entries())if(p.npts[i]!==2*Math.ceil(r.settings.grid.size[axis]/.75)||p.effectiveGrid?.size?.[axis]!==p.npts[i]*.375||p.effectiveGrid?.center?.[axis]!==r.settings.grid.center[axis])throw new Error("Invalid effective AutoDock 4 grid.");
    if(!p.mapHashes||Object.keys(p.mapHashes).length<4||Object.keys(p.mapHashes).length>16||Object.entries(p.mapHashes).some(([name,hash])=>!/^receptor\.[\w.]+$/.test(name)||!/^[a-f0-9]{64}$/.test(hash)))throw new Error("Invalid AutoGrid map provenance.");
  }
  const g=r.settings.grid;for(const axis of ["x","y","z"] as const)if(!Number.isFinite(g?.center?.[axis])||Math.abs(g.center[axis])>10000||!Number.isFinite(g?.size?.[axis])||g.size[axis]<6||g.size[axis]>40)throw new Error("Invalid docking grid.");
  if(g.size.x*g.size.y*g.size.z>40000)throw new Error("Docking grid exceeds supported volume.");
  if(!Array.isArray(r.poses)||!r.poses.length||r.poses.length>r.settings.poses)throw new Error("Invalid docking pose count.");
  for(const [i,p] of r.poses.entries()){
    if(p.rank!==i+1||!Number.isFinite(p.affinity)||!Array.isArray(p.contacts)||p.contacts.length>2000||typeof p.truncated!=="boolean"||typeof p.method!=="string"||p.method.length>5000)throw new Error("Invalid docking pose values.");
    if(r.engine==="vina"&&(!Number.isFinite(p.rmsdLower)||!Number.isFinite(p.rmsdUpper)||(p.rmsdLower??-1)<0||(p.rmsdUpper??-1)<(p.rmsdLower??0)))throw new Error("Invalid Vina RMSD bounds.");
    if(r.engine==="autodock4"&&(p.rmsdLower!==null||p.rmsdUpper!==null||!Number.isSafeInteger(p.sourceRun)||(p.sourceRun??0)<1||(p.sourceRun??0)>r.settings.ad4!.runs||!Number.isSafeInteger(p.cluster)||(p.cluster??0)<1||(p.cluster??0)>r.settings.ad4!.runs))throw new Error("Invalid AutoDock 4 pose provenance.");
    for(const c of p.contacts){if(!["hydrogen-bond candidate","hydrophobic carbon contact"].includes(c.type)||![c.residue,c.receptorAtom].every(v=>typeof v==="string"&&v.length<=100)||!Number.isFinite(c.distance)||c.distance<0||c.distance>4||!Number.isSafeInteger(c.ligandAtom)||c.ligandAtom<1||(c.angle!==null&&(!Number.isFinite(c.angle)||c.angle<0||c.angle>180)))throw new Error("Invalid docking contact geometry.");
      if(c.type==="hydrogen-bond candidate"&&(c.distance>3.5||c.angle===null||c.angle<120||typeof c.ligandDonor!=="boolean"))throw new Error("Hydrogen-bond candidate violates its recorded geometry criteria.");
      for(const position of [c.ligandPosition,c.receptorPosition])if(position!==undefined&&(!Array.isArray(position)||position.length!==3||position.some(v=>!Number.isFinite(v)||Math.abs(v)>10000)))throw new Error("Invalid docking interaction coordinates.");
    }
  }
  if(r.engine==="autodock4"&&(new Set(r.poses.map(p=>p.sourceRun)).size!==r.poses.length||new Set(r.poses.map(p=>p.cluster)).size!==r.poses.length||r.poses.some((p,i)=>i>0&&p.affinity<r.poses[i-1].affinity)))throw new Error("Invalid ranked AutoDock 4 cluster representatives.");
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
export function dockingCsv(r:DockingResult){validateDockingResult(r);const rows:unknown[][]=[["Job",r.jobId],["Engine",r.engineVersion],["Execution provider",JSON.stringify(r.execution??"Native / legacy snapshot")],["Receptor",r.receptor.name],["Ligand",r.ligand.name],["Ligand SMILES",r.ligand.smiles],["Editor version",r.ligand.source?.versionId??"Imported / editor draft"],["Grid and search",JSON.stringify(r.settings)],["Preparation versions",JSON.stringify(r.tools)],["Receptor artifact hashes",JSON.stringify(r.receptor.files)],["Ligand artifact hashes",JSON.stringify(r.ligand.files)],["Engine protocol",JSON.stringify(r.protocol??"Vina settings recorded above")],["Rank",r.engine==="vina"?"Vina score (kcal/mol)":"AD4 estimated binding energy (kcal/mol)",r.engine==="vina"?"Vina RMSD lower (Angstrom)":"Source LGA run",r.engine==="vina"?"Vina RMSD upper (Angstrom)":"Native cluster"]];for(const p of r.poses){rows.push([p.rank,p.affinity,r.engine==="vina"?p.rmsdLower:p.sourceRun,r.engine==="vina"?p.rmsdUpper:p.cluster]);for(const c of p.contacts)rows.push(["Contact",p.rank,c.type,c.residue,c.receptorAtom,c.ligandAtom,c.distance,c.angle]);}rows.push(["RMSD method",r.rmsdMethod],["Limitations",r.limitations]);return "\ufeff"+rows.map(row=>row.map(cell).join(",")).join("\r\n");}
