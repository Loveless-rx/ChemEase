import type { Candidate } from './model';

/** A small, explicit teaching collection, not an exhaustive chemical database. */
export const demonstrationCompounds:Candidate[]=[
 ['Aspirin','CC(=O)Oc1ccccc1C(=O)O'],['Salicylic acid','O=C(O)c1ccccc1O'],['Methyl salicylate','COC(=O)c1ccccc1O'],
 ['Ethyl salicylate','CCOC(=O)c1ccccc1O'],['Salicylamide','NC(=O)c1ccccc1O'],['Benzoic acid','O=C(O)c1ccccc1'],
 ['Methyl benzoate','COC(=O)c1ccccc1'],['Ethyl benzoate','CCOC(=O)c1ccccc1'],['Benzamide','NC(=O)c1ccccc1'],
 ['Phenol','Oc1ccccc1'],['Catechol','Oc1ccccc1O'],['Resorcinol','Oc1cccc(O)c1'],['Hydroquinone','Oc1ccc(O)cc1'],
 ['Acetaminophen','CC(=O)Nc1ccc(O)cc1'],['Acetanilide','CC(=O)Nc1ccccc1'],['Aniline','Nc1ccccc1'],
 ['Benzene','c1ccccc1'],['Toluene','Cc1ccccc1'],['Ethylbenzene','CCc1ccccc1'],['Pyridine','c1ccncc1'],
 ['Nicotinamide','NC(=O)c1cccnc1'],['Nicotinic acid','O=C(O)c1cccnc1'],['Isonicotinamide','NC(=O)c1ccncc1'],
 ['Ethanol','CCO'],['1-Propanol','CCCO'],['2-Propanol','CC(O)C'],['Acetic acid','CC(=O)O'],['Ethyl acetate','CCOC(C)=O'],
].map(([name,smiles],i)=>({id:`demo-${i+1}`,name,smiles}));

export async function pubchemCandidates(smiles:string,threshold:number,signal:AbortSignal,request:typeof fetch=fetch):Promise<Candidate[]>{
 if(!Number.isInteger(threshold)||threshold<80||threshold>100)throw new Error('PubChem retrieval threshold must be an integer from 80 to 100.');
 const base='https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound';
 const read=async(url:string,options?:RequestInit)=>{
  const response=await request(url,{...options,signal});
  if(response.status===404)return null;
  if(!response.ok)throw new Error(`PubChem request failed (${response.status}). Its service may be busy; retry later or search your library.`);
  return response.json() as Promise<unknown>;
 };
 const ids=await read(`${base}/fastsimilarity_2d/smiles/cids/JSON?Threshold=${threshold}&MaxRecords=100&MaxSeconds=20`,{method:'POST',body:new URLSearchParams({smiles})}) as {IdentifierList?:{CID?:unknown[]}}|null;
 if(!ids)return [];
 const cids=ids.IdentifierList?.CID;
 if(!Array.isArray(cids)||cids.length>100||cids.some(c=>!Number.isSafeInteger(c)||Number(c)<1))throw new Error('PubChem returned an unexpected candidate list.');
 if(!cids.length)return [];
 // Two sequential requests only, below PubChem's five-requests/second service limit.
 await new Promise<void>((resolve,reject)=>{const abort=()=>{clearTimeout(timer);reject(signal.reason);};const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},250);if(signal.aborted)abort();else signal.addEventListener('abort',abort,{once:true});});
 const records=await read(`${base}/cid/${cids.join(',')}/property/Title,SMILES,MolecularWeight/JSON`) as {PropertyTable?:{Properties?:{CID:number;Title?:string;SMILES?:string;ConnectivitySMILES?:string}[]}}|null;
 const rows=records?.PropertyTable?.Properties;
 if(!Array.isArray(rows)||rows.length!==cids.length||new Set(rows.map(r=>r.CID)).size!==cids.length||rows.some(r=>!cids.includes(r.CID)||typeof (r.SMILES??r.ConnectivitySMILES)!=='string'))throw new Error('PubChem returned incomplete compound structures. No partial search was presented.');
 return rows.map(r=>({id:`pubchem-${r.CID}`,cid:r.CID,name:(r.Title||`PubChem CID ${r.CID}`).slice(0,120),smiles:(r.SMILES??r.ConnectivitySMILES)!}));
}
