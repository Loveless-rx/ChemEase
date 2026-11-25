import test from 'node:test';
import assert from 'node:assert/strict';
import initRDKit from '@rdkit/rdkit';
import { fingerprintCandidate, fingerprintSettings, overlap, parseCandidateList, searchSimilarity, storeSimilaritySearch, validateSimilaritySearch } from '../src/features/similarity/model';
import { demonstrationCompounds, pubchemCandidates } from '../src/features/similarity/sources';
import { emptyWorkspace, validateWorkspace } from '../src/features/workspace/domain';
import {mergeGuestWorkspace} from '../src/features/account/guestImport';
import { layoutSimilarityReport, similarityCsv } from '../src/features/similarity/report';
const engine=initRDKit();
const query={id:'query',name:'Ethanol',smiles:'CCO'};
const settings={threshold:0,limit:20,excludeIdentical:false};
const source={database:'demo' as const,databaseLabel:'Unit collection'};

test('Morgan radius-2 reference ethanol fingerprint and independently counted bit-string Tanimoto agree',async()=>{
 const rdkit=await engine,fp=fingerprintCandidate(rdkit,query);
 const bytes=fp.fingerprint.match(/../g)!.map(s=>parseInt(s,16));
 const onBits=bytes.flatMap((b,i)=>Array.from({length:8},(_,j)=>b&(1<<j)?i*8+j:-1).filter(n=>n>=0));
 assert.deepEqual(onBits,[80,222,294,807,1057,1410]);
 const a=rdkit.get_mol('CCO')!,b=rdkit.get_mol('CCCO')!;
 try{
  const x=a.get_morgan_fp(JSON.stringify(fingerprintSettings)),y=b.get_morgan_fp(JSON.stringify(fingerprintSettings));
  let shared=0,union=0;for(let i=0;i<x.length;i++){if(x[i]==='1'&&y[i]==='1')shared++;if(x[i]==='1'||y[i]==='1')union++;}
  const got=overlap(fp.fingerprint,fingerprintCandidate(rdkit,{...query,smiles:'CCCO'}).fingerprint);
  assert.deepEqual(got,{sharedBits:shared,unionBits:union,score:shared/union});
  assert.equal(got.score,5/9);
 }finally{a.delete();b.delete();}
});
test('similarity is symmetric, canonical-equivalent structures match, and chirality is explicitly ignored',async()=>{
 const r=await engine,f=(smiles:string)=>fingerprintCandidate(r,{...query,smiles}).fingerprint;
 assert.equal(overlap(f('CCO'),f('OCC')).score,1);
 assert.equal(overlap(f('c1ccccc1'),f('C1=CC=CC=C1')).score,1);
 assert.equal(overlap(f('CCO'),f('CCCO')).score,overlap(f('CCCO'),f('CCO')).score);
 assert.equal(overlap(f('C[C@H](O)C(=O)O'),f('C[C@@H](O)C(=O)O')).score,1);
 assert.notEqual(f('CC(=O)O'),f('CC(=O)[O-]'));
 assert.throws(()=>overlap('0'.repeat(512),'0'.repeat(512)),/Empty/);
 assert.throws(()=>fingerprintCandidate(r,{...query,smiles:'invalid'}));
});
test('search ranks deterministic neighbors, removes canonical duplicates, reports invalid rows and applies limits',async()=>{
 const r=await engine,run=await searchSimilarity(r,query,[query,{id:'duplicate',name:'duplicate',smiles:'OCC'},{id:'propanol',name:'Propanol',smiles:'CCCO'},{id:'bad',name:'Bad row',smiles:'bad'}],{...settings,limit:1},source);
 assert.equal(run.hits[0].score,1);assert.equal(run.matchedCount,2);assert.equal(run.duplicateCount,1);assert.equal(run.validCount,3);assert.equal(run.skipped.length,1);
 const withoutSelf=await searchSimilarity(r,query,[query,{id:'propanol',name:'Propanol',smiles:'CCCO'}],{...settings,excludeIdentical:true},source);
 assert.equal(withoutSelf.hits.length,1);assert.equal(withoutSelf.hits[0].id,'propanol');
 const noHits=await searchSimilarity(r,query,[{id:'prop',name:'Prop',smiles:'CCCO'}],{...settings,threshold:0.8},source);assert.equal(noHits.hits.length,0);validateSimilaritySearch(noHits);
 await assert.rejects(searchSimilarity(r,query,[],{...settings,threshold:NaN},source));
 await assert.rejects(searchSimilarity(r,query,[],{...settings,limit:51},source));
 const abort=new AbortController();abort.abort();await assert.rejects(searchSimilarity(r,query,[query],settings,source,abort.signal));
});
test('teaching structures are valid and saved search snapshots survive workspace backup with score validation',async()=>{
 const r=await engine,run=await searchSimilarity(r,{id:'q',name:'Aspirin',smiles:'CC(=O)Oc1ccccc1C(=O)O'},demonstrationCompounds,{...settings,threshold:.2,excludeIdentical:true},source);
 assert.equal(run.skipped.length,0);assert.ok(run.hits.length>3);validateSimilaritySearch(run);
 const data=emptyWorkspace('guest'),stored=storeSimilaritySearch(data,run);assert.equal(data.similaritySearches,undefined);
 const restored=validateWorkspace(JSON.parse(JSON.stringify(stored)),'guest');assert.deepEqual(restored.similaritySearches,[run]);
 assert.throws(()=>validateWorkspace(restored,'other-owner'));
 run.query.name='Changed after save';assert.notEqual(stored.similaritySearches![0].query.name,run.query.name);
 const bad=structuredClone(stored);bad.similaritySearches![0].hits[0].score=.999;assert.throws(()=>validateWorkspace(bad,'guest'),/score|ranking/);
 assert.equal(storeSimilaritySearch(stored,stored.similaritySearches![0]).similaritySearches!.length,1);
 assert.throws(()=>validateSimilaritySearch({...run,candidateCount:0}));
});
test('CSV and PDF layouts include frozen method, counts, source identities and scientific limits',async()=>{
 const run=await searchSimilarity(await engine,query,[{id:'p',name:'=unsafe',smiles:'CCCO'}],settings,source);
 const csv=similarityCsv(run);assert.match(csv,/2D fingerprint overlap/);assert.match(csv,/'=unsafe/);assert.match(csv,/Shared bits/);assert.match(csv,/2048/);
 const pages=layoutSimilarityReport(run,(s,size)=>s.length*size*.53),text=pages.flat().filter(op=>op.kind==='text').map(op=>op.text).join(' ');
 assert.ok(pages.length>=3);assert.match(text,/Morgan/);assert.match(text,/Tanimoto/);assert.match(text,/0\.555556/);assert.match(text,/Stereochemistry is not encoded/);
});
test('SMILES collections enforce format and size boundaries',()=>{
 assert.deepEqual(parseCandidateList('\uFEFF# collection\nCCO Ethanol\nCCCO'),[{id:'import-1',smiles:'CCO',name:'Ethanol'},{id:'import-2',smiles:'CCCO',name:'Candidate 2'}]);
 assert.throws(()=>parseCandidateList(''));assert.throws(()=>parseCandidateList('C\n'.repeat(2001)));assert.throws(()=>parseCandidateList('x'.repeat(500001)));
});
test('PubChem retrieval uses encoded POST, limited candidates and validated complete structures',async()=>{
 const calls:{url:string;options?:RequestInit}[]=[];
 const request:typeof fetch=async(input,options)=>{calls.push({url:String(input),options});return new Response(JSON.stringify(calls.length===1?{IdentifierList:{CID:[702]}}:{PropertyTable:{Properties:[{CID:702,Title:'Ethanol',SMILES:'CCO'}]}}),{status:200});};
 const hits=await pubchemCandidates('C[NH3+]',90,new AbortController().signal,request);
 assert.equal(hits[0].cid,702);assert.match(calls[0].url,/MaxRecords=100/);assert.equal(calls[0].options?.method,'POST');assert.equal(String(calls[0].options?.body),'smiles=C%5BNH3%2B%5D');
 assert.match(calls[1].url,/Title,SMILES/);
 const empty:typeof fetch=async()=>new Response('',{status:404});assert.deepEqual(await pubchemCandidates('CCO',90,new AbortController().signal,empty),[]);
 const failed:typeof fetch=async()=>new Response('',{status:503});await assert.rejects(pubchemCandidates('CCO',90,new AbortController().signal,failed),/503/);
 const malformed:typeof fetch=async()=>new Response('{}',{status:200});await assert.rejects(pubchemCandidates('CCO',90,new AbortController().signal,malformed),/unexpected/);
});


test('guest import carries independent similarity snapshots into the signed-in workspace',async()=>{
 const run=await searchSimilarity(await engine,query,[query],settings,source);
 const guest=storeSimilaritySearch(emptyWorkspace('local-device'),run),account=emptyWorkspace('account-owner');
 const merged=mergeGuestWorkspace(account,guest);
 assert.deepEqual(merged.similaritySearches,[run]);assert.equal(merged.ownerId,'account-owner');
 assert.equal(account.similaritySearches,undefined);assert.equal(guest.ownerId,'local-device');
 assert.throws(()=>mergeGuestWorkspace(merged,guest),/already/);
});
