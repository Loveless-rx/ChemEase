import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { emptyWorkspace } from "../src/features/workspace/domain";

test("PostgreSQL policies isolate two accounts, reject anonymous access and enforce atomic revisions",async()=>{
  const db=new PGlite();
  try{
    // Supabase-managed objects, reproduced locally; application migration is run unchanged.
    await db.exec(`create role anon; create role authenticated;
      create schema auth; create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      grant usage on schema auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;
      create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
      create table storage.objects(id bigserial primary key,bucket_id text,name text);
      alter table storage.objects enable row level security;
      create function storage.foldername(name text) returns text[] language sql immutable as $$select string_to_array(name,'/')$$;
      grant usage on schema storage to authenticated;grant select,insert,update on storage.objects to authenticated;grant usage on sequence storage.objects_id_seq to authenticated;
      grant execute on function storage.foldername(text) to authenticated;
      insert into auth.users values('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');`);
    await db.exec(readFileSync("supabase/migrations/202611230001_accounts.sql","utf8"));
    const first="11111111-1111-4111-8111-111111111111",second="22222222-2222-4222-8222-222222222222";
    const login=async(id:string)=>{await db.exec("reset role; set role authenticated;");await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);};
    const doc=(owner:string,revision:number)=>JSON.stringify({...emptyWorkspace(owner),revision});
    const save=(owner:string,expected:number)=>db.query("select public.save_chemease_workspace($1,$2::jsonb)",[expected,doc(owner,expected+1)]);
    await login(first);await save(first,0);await save(first,1);
    await assert.rejects(save(first,1),/changed on another device/);
    await assert.rejects(save(second,0),/owner mismatch/);
    await db.query("insert into storage.objects(bucket_id,name) values('chemease-docking',$1)",[`${first}/run.json`]);
    await assert.rejects(db.query("insert into storage.objects(bucket_id,name) values('chemease-docking',$1)",[`${second}/run.json`]),/row-level security/);
    await login(second);
    assert.equal((await db.query("select * from public.chemease_workspaces")).rows.length,0);
    assert.equal((await db.query("select * from storage.objects")).rows.length,0);
    assert.equal((await db.query("update public.chemease_workspaces set revision=3 where owner_id=$1 returning owner_id",[first])).rows.length,0);
    await assert.rejects(db.query("insert into public.chemease_workspaces(owner_id,revision,payload) values($1,1,$2::jsonb)",[first,doc(first,1)]),/row-level security/);
    await save(second,0);assert.equal((await db.query("select * from public.chemease_workspaces")).rows.length,1);
    await login(first);const rows=await db.query<{revision:number}>("select revision from public.chemease_workspaces");assert.equal(Number(rows.rows[0].revision),2);
    await db.exec("reset role;set role anon;");
    await assert.rejects(db.query("select * from public.chemease_workspaces"),/permission denied/);
    await assert.rejects(save(first,2),/permission denied/);
  }finally{await db.close();}
});
