import { useState } from 'react';
import { useWorkspaceStore } from '../workspace/store';
import { downloadBlob } from '../../engine/export';
import { similarityCsv, similarityPdf } from './report';
import { requireExportAccount } from '../account/access';
import type { SimilaritySearch } from './model';

export function SimilarityExports({result}:{result:SimilaritySearch}){
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const pdf=async()=>{if(!requireExportAccount())return;const owner=useWorkspaceStore.getState().data.ownerId;setBusy(true);setError('');try{const blob=await similarityPdf(result);if(useWorkspaceStore.getState().data.ownerId!==owner)throw new Error('The account changed while preparing this report. Reopen it in its original workspace.');downloadBlob(blob,'ChemEase-similarity-report.pdf');}catch(e){setError((e as Error).message);}finally{setBusy(false);}};
 return <><div className="ws-actions"><button className="secondary" disabled={busy} onClick={()=>void pdf()}>{busy?'Preparing PDF…':'Download similarity PDF'}</button><button className="secondary" disabled={busy} onClick={()=>{if(!requireExportAccount())return;try{downloadBlob(new Blob([similarityCsv(result)],{type:'text/csv;charset=utf-8'}),'ChemEase-similarity-results.csv');}catch(e){setError((e as Error).message);}}}>Download similarity CSV</button></div>{error&&<p role="alert">{error}</p>}</>;
}
export function SimilarityReports(){
 const searches=useWorkspaceStore(s=>s.data.similaritySearches);
 return <section className="ws-card"><h2>Molecular similarity reports</h2><p className="descriptor-note">Saved searches retain their exact query, fingerprint settings, candidate source and ranked results. These snapshots stay separate from prediction and docking reports.</p>{searches?.length?searches.map(r=><article className="docking-report-row" key={r.id}><div><h3>{r.query.name}</h3><p>{r.databaseLabel} · {r.hits.length} reported matches · {new Date(r.createdAt).toLocaleString()}</p><small>{r.engine} · Morgan / Tanimoto</small></div><SimilarityExports result={r}/></article>):<p>Save a completed search from Similarity to retain its PDF/CSV report here.</p>}</section>;
}
