import type { SupabaseClient } from "@supabase/supabase-js";
import type { DockingResult, Job } from "../docking/types";
import type { Stored } from "../docking/browser/storage";
import { get, put, sha } from "../docking/browser/storage";
import { requireOwner } from "./cloudRepository";
import { validateDockingResult } from "../docking/model";
import { canonicalJson } from "../../utils/canonicalJson";

const bucket="chemease-docking";
export async function validateCloudRecord(input: unknown, owner:string, id?:string):Promise<Stored> {
  const r=input as Stored;
  if(!r||r.owner!==owner||! /^[a-f0-9]{32}$/.test(r.id)||id&&r.id!==id||
    !["receptor","ligand","job"].includes(r.kind)||!r.value||r.value.id!==r.id||!r.files||typeof r.files!=="object") throw new Error("Invalid account docking record.");
  for(const f of Object.values(r.files))if(!f||typeof f.name!=="string"||typeof f.text!=="string")throw new Error("Invalid account docking file.");
  if(r.kind==="job"){
    const j=r.value as Job;
    if(j.status!=="completed"||j.task!=="dock"||!j.result||!("poses" in j.result))throw new Error("Only completed docking runs can be synced.");
    validateDockingResult(j.result);
  }else{
    if(!("files" in r.value)||!r.value.ready)throw new Error("Incomplete account preparation.");
    for(const [key,manifest] of Object.entries(r.value.files)){
      const f=r.files[key];
      if(!f||await sha(f.text)!==manifest.sha256||new TextEncoder().encode(f.text).byteLength!==manifest.bytes)throw new Error("Account preparation integrity check failed.");
    }
  }
  return r;
}
export function dockingCloud(client:SupabaseClient,owner:string) {
  return {
    async list():Promise<Stored[]>{
      await requireOwner(client,owner);
      const {data,error}=await client.storage.from(bucket).list(owner,{limit:1000,sortBy:{column:"name",order:"asc"}});
      if(error)throw new Error(`Cannot load account docking files: ${error.message}`);
      const rows:Stored[]=[];
      // Bound concurrent downloads and do not accept arbitrary object paths.
      const names=(data??[]).map(f=>f.name).filter(name=>/^[a-f0-9]{32}\.json$/.test(name));
      for(let i=0;i<names.length;i+=4)rows.push(...await Promise.all(names.slice(i,i+4).map(name=>this.read(name.slice(0,-5)))));
      return rows;
    },
    async read(id:string):Promise<Stored>{
      if(!/^[a-f0-9]{32}$/.test(id))throw new Error("Invalid docking file ID.");
      await requireOwner(client,owner);
      const {data,error}=await client.storage.from(bucket).download(`${owner}/${id}.json`);
      if(error||!data)throw new Error(`Account docking file unavailable: ${error?.message??id}`);
      if(data.size>50*1024*1024)throw new Error("Account docking file exceeds 50 MB.");
      return validateCloudRecord(JSON.parse(await data.text()),owner,id);
    },
    async upload(record:Stored){
      await requireOwner(client,owner);
      await validateCloudRecord(record,owner);
      const body=new Blob([JSON.stringify(record)],{type:"application/json"});
      if(body.size>50*1024*1024)throw new Error("This docking record exceeds the 50 MB cloud file limit. Download its ZIP to retain it.");
      const {error}=await client.storage.from(bucket).upload(`${owner}/${record.id}.json`,body,{contentType:"application/json",upsert:true});
      if(error)throw new Error(`Docking file sync failed: ${error.message}. The local files are retained; retry saving the run.`);
    },
  };
}
export async function saveDockingFiles(client:SupabaseClient,owner:string,result:DockingResult,fromOwner=owner){
  if(result.execution?.kind!=="browser-wasm")throw new Error("Cloud docking files currently require browser docking. Download native-engine artifacts separately.");
  const transport=dockingCloud(client,owner);
  const records=await Promise.all([result.receptor.id,result.ligand.id,result.jobId].map(id=>get(fromOwner,id)));
  const job=records[2].value as Job;
  if(canonicalJson(job.result)!==canonicalJson(result))throw new Error("Saved docking files do not match the result being saved.");
  for(const r of records){const copy={...r,owner};await transport.upload(copy);if(fromOwner!==owner)await put(copy);}
}
