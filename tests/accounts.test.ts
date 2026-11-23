import test from "node:test";
import assert from "node:assert/strict";
import type { SupabaseClient } from "@supabase/supabase-js";
import { accountConfig } from "../src/features/account/config";
import { CloudWorkspaceRepository } from "../src/features/account/cloudRepository";
import { mergeGuestWorkspace } from "../src/features/account/guestImport";
import { createWorkspaceStore } from "../src/features/workspace/store";
import { emptyWorkspace, addProject } from "../src/features/workspace/domain";
import type { WorkspaceData, WorkspaceRepository } from "../src/features/workspace/types";
import { validateCloudRecord } from "../src/features/account/dockingCloud";
import { sha } from "../src/features/docking/browser/storage";

function deferred<T>(){let resolve!:(value:T)=>void;const promise=new Promise<T>(r=>resolve=r);return {promise,resolve};}
function repository(ownerId:string,initial:WorkspaceData|null=null):WorkspaceRepository{
  let data=initial;
  return {ownerId,load:async()=>data,save:async(next,revision)=>{assert.equal(next.ownerId,ownerId);assert.equal(data?.revision??0,revision);data=structuredClone(next);}};
}
test("account configuration accepts public keys and rejects server keys and unsafe URLs",()=>{
  assert.equal(accountConfig().config,null);
  assert.ok(accountConfig("https://project.supabase.co","sb_publishable_test").config);
  const jwt=(role:string)=>`x.${btoa(JSON.stringify({role}))}.x`;
  assert.ok(accountConfig("http://localhost:54321",jwt("anon")).config);
  for(const key of ["sb_secret_test",jwt("service_role"),"garbage"]){assert.equal(accountConfig("https://project.supabase.co",key).config,null);}
  for(const url of ["http://project.supabase.co","https://user:pass@project.supabase.co","https://project.supabase.co/path","https://project.supabase.co?key=x"]){assert.equal(accountConfig(url,"sb_publishable_test").config,null);}
});
test("account switch drops old queued mutations and never publishes an in-flight result to the new owner",async()=>{
  const gate=deferred<void>(),started=deferred<void>();let saves=0;
  const first:WorkspaceRepository={ownerId:"first",load:async()=>null,save:async()=>{saves++;started.resolve();await gate.promise;}};
  const store=createWorkspaceStore(first);await store.getState().initialize();
  const inFlight=store.getState().createProject("First",""),queued=store.getState().createProject("Queued","").catch(e=>e);
  await started.promise;await store.getState().changeRepository(repository("second"));
  assert.equal(store.getState().data.ownerId,"second");assert.equal(store.getState().pending,0);
  gate.resolve();await inFlight;assert.match((await queued).message,/account changed/);
  assert.equal(saves,1);assert.equal(store.getState().data.projects.length,0);assert.equal(store.getState().error,null);
  await store.getState().createProject("Second","");assert.equal(store.getState().data.projects[0].name,"Second");
});
test("a late account load cannot restore the previous user's data",async()=>{
  const gate=deferred<WorkspaceData|null>();const store=createWorkspaceStore({ownerId:"first",load:()=>gate.promise,save:async()=>{}});
  const loading=store.getState().initialize();await store.getState().changeRepository(repository("second"));
  gate.resolve(addProject(emptyWorkspace("first"),"Private first","","private").data);await loading;
  assert.equal(store.getState().data.ownerId,"second");assert.equal(store.getState().data.projects.length,0);
});
test("failed cloud initialization is read-only and cannot fall back to an empty writable account",async()=>{
  let wrote=false;const store=createWorkspaceStore({ownerId:"user",load:async()=>{throw Error("offline");},save:async()=>{wrote=true;}});
  await store.getState().initialize();assert.equal(store.getState().writable,false);
  await assert.rejects(store.getState().createProject("No overwrite",""),/unavailable/);assert.equal(wrote,false);
});
test("guest import preserves existing account data and refuses duplicate records without changing either input",()=>{
  const guest=addProject(emptyWorkspace("local-device"),"Guest","","guest-project").data;
  const account=addProject(emptyWorkspace("user"),"Account","","account-project").data;
  const before=JSON.stringify([guest,account]);const merged=mergeGuestWorkspace(account,guest);
  assert.equal(merged.ownerId,"user");assert.equal(merged.projects.length,2);assert.equal(JSON.stringify([guest,account]),before);
  assert.throws(()=>mergeGuestWorkspace(merged,guest),/already/);
  assert.throws(()=>mergeGuestWorkspace(guest,account),/Choose an account/);
});
test("cloud repository checks session ownership, validates payloads and exposes atomic revision conflicts",async()=>{
  let sessionOwner="owner",payload:WorkspaceData|null=null;let sent:unknown;
  const mock={auth:{getSession:async()=>({data:{session:{user:{id:sessionOwner}}},error:null})},
    from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:payload?{payload,revision:payload.revision}:null,error:null})})})}),
    rpc:async(_name:string,args:{document:WorkspaceData;expected_revision:number})=>{sent=args;if((payload?.revision??0)!==args.expected_revision)return {error:{code:"40001",message:"Conflict"}};payload=args.document;return {error:null};}} as unknown as SupabaseClient;
  const repo=new CloudWorkspaceRepository("owner",mock);assert.equal(await repo.load(),null);
  const next=emptyWorkspace("owner");next.revision=1;await repo.save(next,0);assert.ok(sent);assert.deepEqual(await repo.load(),next);
  await assert.rejects(repo.save(next,0),/another device/);sessionOwner="someone-else";await assert.rejects(repo.load(),/session changed/);await assert.rejects(repo.save({...next,revision:2},1),/session changed/);
});
test("cloud docking downloads reject a different owner and modified preparation bytes",async()=>{
  const text="prepared PDB",id="a".repeat(32),record={owner:"owner",id,kind:"receptor",files:{pdb:{name:"receptor.pdb",text}},value:{id,kind:"receptor",name:"Protein",ready:true,createdAt:new Date().toISOString(),files:{pdb:{name:"receptor.pdb",bytes:new TextEncoder().encode(text).length,sha256:await sha(text)}}}};
  assert.equal((await validateCloudRecord(record,"owner")).id,id);
  await assert.rejects(validateCloudRecord(record,"other"),/Invalid account/);
  record.files.pdb.text="changed";await assert.rejects(validateCloudRecord(record,"owner"),/integrity/);
});
