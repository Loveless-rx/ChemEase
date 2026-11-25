import { useEffect, useRef, useState } from 'react';
import type { MainModule } from '@rdkit/rdkit';
import { loadRDKit } from '../../engine/rdkit';
import { importSmiles, toolkitMol } from '../../engine/toolkit';
import { useMoleculeStore } from '../../store/moleculeStore';
import { useMoleculeAnalysis } from '../../hooks/useMoleculeAnalysis';
import { useWorkspaceStore } from '../workspace/store';
import { applyGraph, confirmSwitch, flushDraft } from '../workspace/editorBridge';
import { snapshotKey } from '../workspace/domain';
import type { PageActions } from '../workspace/pageActions';
import { searchSimilarity, parseCandidateList, storeSimilaritySearch, similarityLimits, fingerprintCandidate, validateSearchSettings, type Candidate, type SimilaritySearch } from './model';
import { demonstrationCompounds, pubchemCandidates } from './sources';
import { SimilarityExports } from './SimilarityReports';
import '../research.css';
import './Similarity.css';

function StructureFigure({smiles,name,rdkit}:{smiles:string;name:string;rdkit:MainModule|null}){
 let svg='';
 if(rdkit){let mol;try{mol=rdkit.get_mol(smiles);if(mol){mol.set_new_coords();svg=mol.get_svg(300,190);}}catch{/* Show a text fallback; no chemical structure is invented. */}finally{mol?.delete();}}
 return <div className="similarity-structure">{svg?<img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} alt={`2D structure of ${name}`}/>:<span>Structure preview unavailable</span>}</div>;
}
export function SimilarityPage({actions}:{actions:PageActions}){
 const graph=useMoleculeStore(s=>s.molecule),analysis=useMoleculeAnalysis(),{data,pending,writable}=useWorkspaceStore();
 const [rdkit,setRdkit]=useState<MainModule|null>(null),[queryMode,setQueryMode]=useState('editor'),[versionId,setVersionId]=useState('');
 const [smiles,setSmiles]=useState(''),[name,setName]=useState('Query molecule'),[database,setDatabase]=useState<SimilaritySearch['database']>('library');
 const [candidateText,setCandidateText]=useState(''),[threshold,setThreshold]=useState('0.30'),[limit,setLimit]=useState('20'),[retrievalThreshold,setRetrievalThreshold]=useState('90'),[excludeIdentical,setExcludeIdentical]=useState(true);
 const [result,setResult]=useState<SimilaritySearch|null>(null),[busy,setBusy]=useState(false),[status,setStatus]=useState(''),[error,setError]=useState('');
 const controller=useRef<AbortController|null>(null),resultsRef=useRef<HTMLElement|null>(null);
 const showResult=(record:SimilaritySearch)=>{setResult(record);requestAnimationFrame(()=>{resultsRef.current?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});resultsRef.current?.focus({preventScroll:true});});};
 useEffect(()=>{let alive=true;void loadRDKit().then(r=>{if(alive)setRdkit(r);}).catch(e=>{if(alive)setError(e.message);});return()=>{alive=false;controller.current?.abort();};},[]);
 const versions=[...data.versions].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||a.id.localeCompare(b.id));
 const chosen=versions.find(v=>v.id===versionId)??versions[0];
 const saved=!!result&&!!data.similaritySearches?.some(r=>r.id===result.id);
 const operate=async(fn:()=>Promise<void>)=>{setError('');try{await fn();}catch(e){setError((e as Error).message);}};
 const search=async()=>{
  setBusy(true);setError('');setStatus('Preparing fingerprints…');const abort=new AbortController();controller.current=abort;
  const timeout=setTimeout(()=>abort.abort(new Error('Search timed out. Retry or use a local collection.')),60000);
  try{
   const engine=rdkit??await loadRDKit();setRdkit(engine);
   const fromGraph=(g:typeof graph)=>{const m=toolkitMol(engine,g);try{return m.get_smiles();}finally{m.delete();}};
   let query:Candidate;
   if(queryMode==='editor'){
    const active=data.versions.find(v=>v.id===data.active.versionId&&snapshotKey(v.graph)===snapshotKey(graph));
    query={id:'editor-query',name:graph.metadata.name,smiles:fromGraph(graph),...(active?{versionId:active.id}:{})};
   }else if(queryMode==='library'){
    if(!chosen)throw new Error('Choose a saved structure version first.');
    query={id:chosen.id,versionId:chosen.id,name:chosen.graph.metadata.name,smiles:fromGraph(chosen.graph)};
   }else query={id:'smiles-query',smiles:smiles.trim(),name:name.trim()||'Query molecule'};
   // Validate before sending anything to the optional public database.
   const queryStructure=fingerprintCandidate(engine,query),settings={threshold:Number(threshold),limit:Number(limit),excludeIdentical};
   if(!threshold.trim()||!limit.trim())throw new Error('Enter the threshold and result limit.');validateSearchSettings(settings);
   let candidates:Candidate[],databaseLabel:string;
   if(database==='pubchem'){
    setStatus('Retrieving up to 100 PubChem candidates…');
    candidates=await pubchemCandidates(queryStructure.canonical,Number(retrievalThreshold),abort.signal);databaseLabel='PubChem / up to 100 retrieved candidates';
   }else if(database==='demo'){candidates=demonstrationCompounds;databaseLabel='ChemEase teaching collection / 28 structures';}
   else if(database==='import'){candidates=parseCandidateList(candidateText);databaseLabel='Imported SMILES collection';}
   else{
    if(!versions.length)throw new Error('Your library has no saved versions yet. Save molecules or choose the teaching collection.');
    candidates=versions.map(v=>{let text='';try{text=fromGraph(v.graph);}catch{/* Invalid versions are reported as skipped. */}return {id:v.id,versionId:v.id,name:`${v.graph.metadata.name} · v${v.number}`.slice(0,120),smiles:text};});databaseLabel='Your library / saved structure versions';
   }
   setStatus('Comparing Morgan fingerprints…');
   const record=await searchSimilarity(engine,query,candidates,settings,{database,databaseLabel,...(database==='pubchem'?{retrievalThreshold:Number(retrievalThreshold)}:{})},abort.signal);
   abort.signal.throwIfAborted();showResult(record);setStatus(`Search complete. ${record.hits.length} ranked matches shown.`);
  }catch(e){if(abort.signal.aborted)setStatus(abort.signal.reason instanceof Error&&abort.signal.reason.name!=='AbortError'?abort.signal.reason.message:'Search cancelled. Previous results are unchanged.');else{setError((e as Error).message);setStatus('Search did not complete. Previous results are unchanged.');}}
  finally{clearTimeout(timeout);setBusy(false);controller.current=null;}
 };
 const openHit=async(hit:Candidate)=>{
  if(hit.versionId&&data.versions.some(v=>v.id===hit.versionId)){actions.open(hit.versionId,'editor');return;}
  const engine=rdkit??await loadRDKit();const molecule=importSmiles(engine,hit.smiles,hit.name);
  if(!confirmSwitch())return;await flushDraft();await useWorkspaceStore.getState().newDraft(molecule);applyGraph(molecule);actions.navigate('editor');
 };
 return <div className="ws-page research-page similarity-page">
  <div className="ws-page-heading"><div><span className="eyebrow">STRUCTURE DISCOVERY / SIMILARITY</span><div className="similarity-title"><span className="similarity-feature-badge" aria-hidden="true"><span style={{maskImage:`url(${import.meta.env.BASE_URL}navigation/similarity-badge.svg)`,WebkitMaskImage:`url(${import.meta.env.BASE_URL}navigation/similarity-badge.svg)`}}/></span><h1>Molecular similarity</h1></div><p>Find structural neighbors. Compare your molecule with saved structures or explore candidates from PubChem.</p></div><button className="secondary" onClick={()=>actions.navigate('reports')}>Research reports →</button></div>
  <section className="similarity-method-strip" aria-label="Similarity method"><span><strong>01</strong> Choose a molecule</span><span><strong>02</strong> Select a collection</span><span><strong>03</strong> Explore ranked matches</span><small>Morgan radius 2 · 2,048 bits · Tanimoto</small></section>
  <fieldset disabled={busy} className="similarity-search-form"><legend className="sr-only">Similarity search settings</legend><div className="similarity-input-grid">
   <section className="ws-card"><span className="eyebrow">01 / QUERY STRUCTURE</span><h2>Start with your molecule.</h2><label>Structure source<select aria-label="Similarity query source" value={queryMode} onChange={e=>setQueryMode(e.target.value)}><option value="editor">Current editor molecule</option><option value="library">Saved library version</option><option value="smiles">Enter SMILES</option></select></label>
    {queryMode==='editor'?<div className="similarity-query-summary"><h3>{graph.metadata.name}</h3><p>{graph.atoms.length} drawn atoms · {analysis.toolkit?'Ready for fingerprinting':'Draw or import a valid structure first'}</p><button className="secondary" onClick={()=>actions.navigate('editor')}>Open molecular editor →</button></div>:queryMode==='library'?<><label>Exact saved version<select aria-label="Similarity library query" value={chosen?.id??''} onChange={e=>setVersionId(e.target.value)}><option value="" disabled>No saved version selected</option>{versions.map(v=><option key={v.id} value={v.id}>{v.graph.metadata.name} · v{v.number} · {v.id.slice(0,8)}</option>)}</select></label>{!chosen&&<p>No saved versions yet. Save a molecule from the editor or use SMILES.</p>}</>:<><label>Query name<input aria-label="Similarity query name" value={name} maxLength={120} onChange={e=>setName(e.target.value)}/></label><label>SMILES<textarea aria-label="Similarity query SMILES" value={smiles} onChange={e=>setSmiles(e.target.value)} maxLength={10000} placeholder="CC(=O)Oc1ccccc1C(=O)O"/></label></>}
    <button className="similarity-example" onClick={()=>{setQueryMode('smiles');setName('Aspirin');setSmiles('CC(=O)Oc1ccccc1C(=O)O');setDatabase('demo');setThreshold('0.20');setExcludeIdentical(true);}}>Try aspirin against the teaching collection →</button>
   </section>
   <section className="ws-card"><span className="eyebrow">02 / SEARCH COLLECTION</span><h2>Choose where to explore.</h2><label>Candidate collection<select aria-label="Similarity database" value={database} onChange={e=>setDatabase(e.target.value as SimilaritySearch['database'])}><option value="library">Your library · {versions.length} saved versions</option><option value="pubchem">PubChem · live candidate discovery</option><option value="import">Import a SMILES collection</option><option value="demo">Teaching collection · 28 structures</option></select></label>
    {database==='pubchem'?<><p className="ws-inline-note">Searching sends this query structure to PubChem. Up to 100 candidates are retrieved with PubChem's 2D fingerprint search, then re-ranked locally with Morgan / Tanimoto. The thresholds belong to different fingerprints.</p><label>PubChem candidate retrieval threshold (%)<input aria-label="PubChem retrieval threshold" type="number" min={80} max={100} value={retrievalThreshold} onChange={e=>setRetrievalThreshold(e.target.value)}/></label></>:database==='import'?<><label>SMILES collection (.smi / .txt)<input aria-label="Import similarity collection" type="file" accept=".smi,.smiles,.txt" onChange={e=>{const file=e.target.files?.[0];if(file)void operate(async()=>{if(file.size>500000)throw new Error('Candidate files are limited to 500 KB.');setCandidateText(await file.text());});e.target.value='';}}/></label><label>One SMILES and optional name per line<textarea aria-label="Similarity candidate collection" value={candidateText} maxLength={500000} onChange={e=>setCandidateText(e.target.value)} placeholder={'CCO Ethanol\nCCCO Propanol'}/></label></>:<p className="descriptor-note">{database==='library'?'Your account or guest library only. All saved versions are searched; identical canonical structures are collapsed. No structures are sent to a public service.':'A small, offline collection for learning and demonstrations. It is not a representative drug-discovery database.'}</p>}
    <div className="similarity-controls"><label>Minimum Tanimoto (0–1)<input aria-label="Similarity minimum Tanimoto" type="number" min={0} max={1} step="0.05" value={threshold} onChange={e=>setThreshold(e.target.value)}/></label><label>Maximum matches<input aria-label="Similarity result limit" type="number" min={1} max={50} value={limit} onChange={e=>setLimit(e.target.value)}/></label></div><label className="similarity-checkbox"><input type="checkbox" checked={excludeIdentical} onChange={e=>setExcludeIdentical(e.target.checked)}/>Exclude identical canonical query structures</label>
   </section>
  </div><div className="similarity-submit"><p>One consistent fingerprint method for every displayed score. Higher means more shared 2D fingerprint features.</p><button className="primary" disabled={!rdkit||queryMode==='editor'&&!analysis.toolkit||queryMode==='library'&&!chosen||queryMode==='smiles'&&!smiles.trim()} onClick={()=>void search()}>{rdkit?'Find similar molecules':'Loading chemistry engine…'}</button></div></fieldset>
  {busy&&<button className="secondary" onClick={()=>controller.current?.abort()}>Cancel search</button>}{status&&<p role="status">{status}</p>}{error&&<p role="alert" className="ws-inline-note">{error}</p>}
  {result&&<section ref={resultsRef} tabIndex={-1} className="ws-card similarity-results" aria-label="Similarity search results"><div className="ws-page-heading"><div><span className="eyebrow">03 / RANKED MATCHES</span><h2>Neighbors of {result.query.name}</h2><p>{result.databaseLabel} · {result.engine} · minimum Tanimoto {result.settings.threshold}</p></div><button className="primary" disabled={busy||saved||!writable||!!pending} onClick={()=>void operate(async()=>{await useWorkspaceStore.getState().transact(current=>storeSimilaritySearch(current,result));})}>{saved?'Search saved to reports':'Save search / reports'}</button></div>
   <div className="similarity-result-summary"><StructureFigure rdkit={rdkit} smiles={result.query.canonical} name={result.query.name}/><div><span className="ws-badge">Recorded query / immutable snapshot</span><h3>{result.query.name}</h3><p className="research-code">{result.query.canonical}</p><p>{result.candidateCount} candidates · {result.validCount} valid · {result.duplicateCount} duplicates collapsed · {result.matchedCount} matches · {result.hits.length} shown</p><small>{result.createdAt} · {result.query.versionId?`Saved version ${result.query.versionId}`:'Draft or imported query'}</small><p className="descriptor-note">Changing the editor or settings above does not alter these results. Run a new search to refresh them.</p></div></div>
   <SimilarityExports result={result}/>
   {!result.hits.length&&<div className="ws-empty"><h3>No matches at these settings.</h3><p>Lower the local Tanimoto threshold or choose a different collection. This does not mean no analogues exist.</p></div>}
   <div className="similarity-hit-grid">{result.hits.map((hit,i)=><article className="similarity-hit" key={hit.id}><div className="similarity-hit-heading"><span className="eyebrow">MATCH {String(i+1).padStart(2,'0')}</span><strong title={`Tanimoto ${hit.score}`}>{hit.score.toFixed(3)}<small>Tanimoto</small></strong></div><StructureFigure rdkit={rdkit} smiles={hit.canonical} name={hit.name}/><h3>{hit.name}</h3><div className="similarity-score-track" aria-hidden="true"><span style={{width:`${hit.score*100}%`}}/></div><p>{hit.sharedBits} shared / {hit.unionBits} union bits · {hit.weight.toFixed(2)} g/mol</p>{hit.identical&&<span className="ws-badge">Same canonical query structure</span>}{hit.canonical.includes('.')&&<span className="ws-badge">Multiple chemical components</span>}<details><summary>Structure & source</summary><p className="research-code">{hit.canonical}</p><p>{hit.versionId?`Saved version ${hit.versionId}`:result.databaseLabel}</p>{hit.cid&&<a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${hit.cid}`} target="_blank" rel="noreferrer">PubChem CID {hit.cid} ↗</a>}</details><button className="secondary" disabled={busy||!writable||!!pending} onClick={()=>void operate(()=>openHit(hit))}>Open in editor →</button>{/[@/\\]/.test(hit.smiles)&&<small>The editor may reject stereo-specific structures; the search and reports preserve their supplied SMILES.</small>}</article>)}</div>
   {result.skipped.length>0&&<details><summary>{result.skipped.length} structures skipped</summary>{result.skipped.map((s,i)=><p key={i}>{s.name}: {s.reason}</p>)}</details>}
  </section>}
  <section className="ws-card"><h2>Saved similarity searches</h2><p className="descriptor-note">Up to 20 search snapshots are retained in this account or guest workspace and included in backups. PDF and CSV exports are available from Research reports.</p>{data.similaritySearches?.length?data.similaritySearches.map(r=><article className="similarity-history" key={r.id}><div><h3>{r.query.name}</h3><p>{r.databaseLabel} · {r.hits.length} shown · {new Date(r.createdAt).toLocaleString()}</p></div><div className="ws-actions"><button className="secondary" disabled={busy} onClick={()=>{showResult(structuredClone(r));setStatus('Showing a saved search snapshot.');}}>Open search</button><button className="secondary" disabled={busy||!writable||!!pending} onClick={()=>{if(window.confirm('Remove this saved similarity search? Export a report first if you want to retain it.'))void operate(()=>useWorkspaceStore.getState().transact(current=>({...current,similaritySearches:current.similaritySearches?.filter(s=>s.id!==r.id)})));}}>Remove saved search</button></div></article>):<p>No searches saved yet.</p>}</section>
  <details className="ws-card"><summary>How the scores work / method and limits</summary><p>Tanimoto = shared on-bits ÷ union on-bits. Morgan fingerprints encode atom neighborhoods out to two bonds, folded into 2,048 bits. A score of 0 has no shared bits; a score of 1 has identical fingerprint bits.</p><p>{similarityLimits}</p><p><a href="https://www.rdkit.org/docs/GettingStartedInPython.html#morgan-fingerprints-circular-fingerprints" target="_blank" rel="noreferrer">RDKit fingerprint documentation ↗</a> · <a href="https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest" target="_blank" rel="noreferrer">PubChem API and retrieval method ↗</a></p></details>
 </div>;
}
