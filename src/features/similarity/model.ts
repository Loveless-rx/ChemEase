import type { MainModule } from '@rdkit/rdkit';
import type { WorkspaceData } from '../workspace/types';

export const SIMILARITY_METHOD='morgan-tanimoto-v1';
export const fingerprintSettings={radius:2,nBits:2048,useChirality:false} as const;
export const similarityLimits='2D fingerprint overlap is not a probability of shared activity, efficacy or safety. Hashed fingerprints can collide: a score of 1 does not prove molecular identity. Stereochemistry is not encoded. Structures retain their supplied charge, salts and tautomers; no neutralization, tautomer canonicalization or pH adjustment is performed. PubChem may standardize the query and candidates before retrieval. PubChem searches return a limited candidate set, not an exhaustive Morgan-neighbor search.';
export interface Candidate {id:string;name:string;smiles:string;versionId?:string;cid?:number}
export interface SearchSettings {threshold:number;limit:number;excludeIdentical:boolean}
export interface Fingerprinted extends Candidate {fingerprint:string;weight:number;canonical:string}
export interface SimilarityHit extends Fingerprinted {score:number;identical:boolean;sharedBits:number;unionBits:number}
export interface SimilaritySearch {
 schema:1;id:string;createdAt:string;method:typeof SIMILARITY_METHOD;engine:string;
 query:Fingerprinted;settings:SearchSettings;database:'library'|'demo'|'import'|'pubchem';
 databaseLabel:string;retrievalThreshold?:number;candidateCount:number;validCount:number;duplicateCount:number;
 matchedCount:number;skipped:{name:string;reason:string}[];hits:SimilarityHit[];
}
const pop=(n:number)=>{let count=0;while(n){n&=n-1;count++;}return count;};
export function overlap(a:string,b:string){
 if(!/^[0-9a-f]{512}$/.test(a)||!/^[0-9a-f]{512}$/.test(b))throw new Error('Invalid 2048-bit fingerprint.');
 let sharedBits=0,unionBits=0;
 for(let i=0;i<a.length;i++){const x=parseInt(a[i],16),y=parseInt(b[i],16);sharedBits+=pop(x&y);unionBits+=pop(x|y);}
 if(!unionBits)throw new Error('Empty fingerprints cannot be compared.');
 return {sharedBits,unionBits,score:sharedBits/unionBits};
}
export function fingerprintCandidate(rdkit:MainModule,input:Candidate):Fingerprinted {
 if(!input.smiles.trim()||input.smiles.length>10000||/\s|\|/.test(input.smiles))throw new Error('Enter one SMILES string without annotations (up to 10,000 characters).');
 const mol=rdkit.get_mol(input.smiles);
 if(!mol)throw new Error('Invalid SMILES or unsupported chemical structure.');
 try{
  if(!mol.is_valid()||mol.get_num_atoms()<1||mol.get_num_atoms()>500||mol.get_smiles().includes('*'))throw new Error('Use a valid molecule with 1–500 specified atoms.');
  const bytes=Uint8Array.from(mol.get_morgan_fp_as_uint8array(JSON.stringify(fingerprintSettings)) as ArrayLike<number>);
  const fingerprint=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  overlap(fingerprint,fingerprint);
  const weight=(JSON.parse(mol.get_descriptors()) as Record<string,number>).amw;
  if(!Number.isFinite(weight)||weight<=0)throw new Error('Molecular weight is unavailable.');
  return {...input,name:input.name.slice(0,120),canonical:mol.get_smiles(),fingerprint,weight};
 }finally{mol.delete();}
}
export function validateSearchSettings(settings:SearchSettings){
 if(!Number.isFinite(settings.threshold)||settings.threshold<0||settings.threshold>1||!Number.isInteger(settings.limit)||settings.limit<1||settings.limit>50||typeof settings.excludeIdentical!=='boolean')throw new Error('Use a Tanimoto threshold from 0 to 1 and a result limit from 1 to 50.');
}
export async function searchSimilarity(rdkit:MainModule,query:Candidate,candidates:Candidate[],settings:SearchSettings,source:{database:SimilaritySearch['database'];databaseLabel:string;retrievalThreshold?:number},signal?:AbortSignal):Promise<SimilaritySearch>{
 validateSearchSettings(settings);
 if(candidates.length>2000)throw new Error('Search up to 2,000 candidate structures at a time.');
 const q=fingerprintCandidate(rdkit,query),seen=new Set<string>(),hits:SimilarityHit[]=[],skipped:SimilaritySearch['skipped']=[];
 let validCount=0,duplicateCount=0;
 for(let i=0;i<candidates.length;i++){
  signal?.throwIfAborted();
  try{
   const c=fingerprintCandidate(rdkit,candidates[i]);validCount++;
   if(seen.has(c.canonical)){duplicateCount++;continue;}seen.add(c.canonical);
   const identical=c.canonical===q.canonical;
   if(settings.excludeIdentical&&identical)continue;
   const stats=overlap(q.fingerprint,c.fingerprint);
   if(stats.score>=settings.threshold)hits.push({...c,...stats,identical});
  }catch(e){skipped.push({name:candidates[i].name.slice(0,120),reason:e instanceof Error?e.message:'Could not fingerprint structure.'});}
  if(i%20===19)await new Promise(resolve=>setTimeout(resolve,0));
 }
 signal?.throwIfAborted();
 const compare=(a:string,b:string)=>a<b?-1:a>b?1:0;
 hits.sort((a,b)=>b.score-a.score||compare(a.canonical,b.canonical)||compare(a.id,b.id));
 return {schema:1,id:crypto.randomUUID(),createdAt:new Date().toISOString(),method:SIMILARITY_METHOD,engine:`RDKit ${rdkit.version()}`,query:q,settings:{...settings},...source,candidateCount:candidates.length,validCount,duplicateCount,matchedCount:hits.length,skipped,hits:hits.slice(0,settings.limit)};
}
export function validateSimilaritySearch(value:unknown):asserts value is SimilaritySearch {
 const r=value as SimilaritySearch;
 if(!r||r.schema!==1||r.method!==SIMILARITY_METHOD||typeof r.id!=='string'||r.id.length>100||!r.id||!Number.isFinite(Date.parse(r.createdAt))||typeof r.engine!=='string'||!r.engine.startsWith('RDKit ')||!['library','demo','import','pubchem'].includes(r.database)||typeof r.databaseLabel!=='string'||r.databaseLabel.length>200)throw new Error('Invalid similarity search record.');
 validateSearchSettings(r.settings);
 const structure=(s:Fingerprinted)=>{
  if(!s||typeof s.name!=='string'||s.name.length>120||typeof s.id!=='string'||s.id.length>200||typeof s.smiles!=='string'||s.smiles.length>10000||typeof s.canonical!=='string'||s.canonical.length>10000||!Number.isFinite(s.weight)||s.weight<=0||s.versionId!==undefined&&(typeof s.versionId!=='string'||s.versionId.length>100)||s.cid!==undefined&&(!Number.isSafeInteger(s.cid)||s.cid<1))throw new Error('Invalid similarity structure.');
  overlap(s.fingerprint,s.fingerprint);
 };
 structure(r.query);
 for(const n of [r.candidateCount,r.validCount,r.duplicateCount,r.matchedCount])if(!Number.isInteger(n)||n<0||n>2000)throw new Error('Invalid search counts.');
 if(r.validCount>r.candidateCount||r.duplicateCount>r.validCount||r.matchedCount>r.validCount-r.duplicateCount||!Array.isArray(r.skipped)||r.skipped.length!==r.candidateCount-r.validCount||r.skipped.some(s=>!s||typeof s.name!=='string'||s.name.length>120||typeof s.reason!=='string'||s.reason.length>1000)||!Array.isArray(r.hits)||r.hits.length!==Math.min(r.matchedCount,r.settings.limit))throw new Error('Inconsistent similarity search counts.');
 if(r.database==='pubchem'&&(!Number.isInteger(r.retrievalThreshold)||r.retrievalThreshold!<80||r.retrievalThreshold!>100))throw new Error('Invalid PubChem retrieval threshold.');
 const seen=new Set<string>();let last=Infinity;
 for(const hit of r.hits){structure(hit);const expected=overlap(r.query.fingerprint,hit.fingerprint);
  if(hit.score!==expected.score||hit.sharedBits!==expected.sharedBits||hit.unionBits!==expected.unionBits||hit.identical!==(hit.canonical===r.query.canonical)||hit.score<r.settings.threshold||hit.score>last||seen.has(hit.canonical)||r.settings.excludeIdentical&&hit.identical)throw new Error('Invalid similarity ranking or fingerprint score.');
  seen.add(hit.canonical);last=hit.score;
 }
}
export function storeSimilaritySearch(data:WorkspaceData,result:SimilaritySearch):WorkspaceData {
 validateSimilaritySearch(result);
 if(data.similaritySearches?.some(r=>r.id===result.id))return data;
 if((data.similaritySearches?.length??0)>=20)throw new Error('The workspace retains up to 20 similarity searches. Remove an older search after exporting it.');
 const next=structuredClone(data);next.similaritySearches=[...(next.similaritySearches??[]),structuredClone(result)];return next;
}
export function parseCandidateList(text:string):Candidate[]{
 if(text.length>500000)throw new Error('Candidate files are limited to 500 KB.');
 const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith('#'));
 if(!lines.length||lines.length>2000)throw new Error('Supply 1–2,000 lines: SMILES followed by an optional name.');
 return lines.map((line,i)=>{const [smiles,...name]=line.split(/\s+/);return {id:`import-${i+1}`,smiles,name:(name.join(' ')||`Candidate ${i+1}`).slice(0,120)};});
}
