import { useEffect, useMemo, useRef, useState } from "react";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { chemistryKey } from "../../engine/toolkit";
import { downloadBlob } from "../../engine/export";
import { canonicalJson } from "../../utils/canonicalJson";
import { useWorkspaceStore } from "../workspace/store";
import { snapshotKey } from "../workspace/domain";
import { ActiveMoleculeCard } from "../workspace/components/ActiveMoleculeCard";
import type { PageActions } from "../workspace/pageActions";
import type { SavedStructuralAlerts } from "../workspace/types";
import { analyzeAlerts } from "./service";
import { AlertResults } from "./AlertResults";
import { alertsCsv } from "./exports";
import { alertSets, type AlertResult, type AlertMatch } from "./analysis";
import "./MedicinalChemistry.css";

export function MedicinalChemistryPage({actions}:{actions:PageActions}) {
  const graph=useMoleculeStore(s=>s.molecule),data=useWorkspaceStore(s=>s.data),a=useMoleculeAnalysis();
  const key=useMemo(()=>chemistryKey(graph),[graph]);
  const [job,setJob]=useState<{key:string;busy:boolean;result?:AlertResult;error?:string}>({key:"",busy:false});
  const [saveError,setSaveError]=useState(""),[saving,setSaving]=useState(false);
  const controller=useRef<AbortController|null>(null);
  useEffect(()=>()=>controller.current?.abort(),[key]);
  const live=job.key===key?job:undefined;
  const version=data.versions.find(v=>v.id===data.active.versionId),exact=!!version&&snapshotKey(version.graph)===snapshotKey(graph);
  const saved=data.results.filter((r):r is SavedStructuralAlerts=>r.method==="structural-alerts-v1"&&r.versionId===version?.id);
  const alreadySaved=!!live?.result&&saved.some(r=>canonicalJson(r.alerts)===canonicalJson(live.result));
  const run=async()=>{
    controller.current?.abort();const request=new AbortController();controller.current=request;
    setJob({key,busy:true});setSaveError("");
    try{const result=await analyzeAlerts(structuredClone(graph),request.signal);if(!request.signal.aborted)setJob({key,busy:false,result});}
    catch(e){if(!request.signal.aborted)setJob({key,busy:false,error:(e as Error).message});}
  };
  const inspect=(match:AlertMatch)=>{useMoleculeStore.getState().setSelection(match.atomIds,match.bondIds);useUIStore.getState().set({tool:"select"});actions.navigate("editor");};
  const exportResult=(result:AlertResult,name:string,versionId:string,versionNumber:number|string,resultId:string,createdAt:string)=>downloadBlob(new Blob([alertsCsv(result,{name,versionId,versionNumber,resultId,createdAt})],{type:"text/csv;charset=utf-8"}),"ChemEase-structural-alerts.csv");
  return <div className="ws-page alerts-page">
    <div className="ws-page-heading"><div><span className="eyebrow">PHASE 02 / MEDICINAL CHEMISTRY</span><h1>Structural alerts</h1><p>Review PAINS and Brenk patterns against the same validated molecule, with mapped fragments and traceable sources.</p></div><button className="secondary" onClick={()=>actions.navigate("drug-likeness")}>Drug-likeness →</button></div>
    {!graph.atoms.length?<div className="ws-empty"><h2>Choose a molecule to screen.</h2><p>Draw, import or open a saved structure from the library.</p><button className="primary" onClick={actions.smiles}>Import SMILES</button></div>:<>
      <ActiveMoleculeCard analysis={a} actions={actions}/>
      <section className="ws-card alerts-run"><div><span className="ws-badge">Substructure screen · not a toxicity prediction</span><h2>585 documented definitions.</h2><p>480 PAINS patterns and 105 Brenk patterns from RDKit 2026.09.2. Every definition is checked before a complete result is shown.</p></div><div className="ws-actions"><button className="primary" disabled={!!live?.busy} onClick={()=>void run()}>{live?.busy?"Screening 585 patterns…":live?.result?"Re-run structural alerts":"Run structural alerts"}</button>{live?.busy&&<button className="secondary" onClick={()=>{controller.current?.abort();setJob({key,busy:false});}}>Cancel screening</button>}</div></section>
      {live?.busy&&<p className="notice" role="status">Scanning the complete PAINS/Brenk catalog. Your drawing is preserved; changes cancel this calculation.</p>}
      {live?.error&&<p className="chemistry-error" role="alert">{live.error} No complete screening result was produced.</p>}
      {live?.result&&<><AlertResults result={live.result} graph={graph} onInspect={inspect}/><div className="ws-actions alerts-result-actions"><button className="secondary" onClick={()=>exportResult(live.result!,graph.metadata.name,exact?version!.id:"Unsaved draft",exact?version!.number:"Unsaved draft","Live calculation",new Date().toISOString())}>Download live alerts CSV</button>{exact?<button className="primary" disabled={saving||alreadySaved} onClick={async()=>{setSaving(true);setSaveError("");try{await useWorkspaceStore.getState().saveStructuralAlerts(version!.id,structuredClone(graph),live.result!);}catch(e){setSaveError((e as Error).message);}finally{setSaving(false);}}}>{alreadySaved?"Alerts saved":saving?"Saving…":"Save alerts"}</button>:<button className="primary" onClick={actions.save}>Save version first</button>}</div></>}
      {saveError&&<p role="alert" className="chemistry-error">{saveError}</p>}
      <section aria-label="Structural-alert history"><div className="ws-section-heading"><h2>Saved alert history</h2><button className="secondary" onClick={()=>actions.navigate("visualizations")}>View saved visualizations →</button></div>{!exact&&version&&<p className="ws-inline-note">Historical results below belong to saved version {version.number}, not the edited draft.</p>}{saved.length?saved.map(r=><article className="ws-card alerts-history" key={r.id}><span className="ws-badge">Version {version!.number} · stored structural alerts</span><h3>{version!.graph.metadata.name}</h3><p>{r.alerts.status==="complete"?`${r.alerts.matches.length} alert patterns matched`:`Not evaluable: ${r.alerts.reason}`}</p><small>{r.engine} · {new Date(r.createdAt).toLocaleString()} · {r.alerts.catalogVersion}</small><details><summary>View stored fragments</summary><AlertResults result={r.alerts} graph={version!.graph} onInspect={exact?inspect:undefined}/></details><button className="secondary" onClick={()=>exportResult(r.alerts,version!.graph.metadata.name,version!.id,version!.number,r.id,r.createdAt)}>Download saved alerts CSV</button></article>):<div className="ws-empty"><p>No structural-alert results saved for this version.</p></div>}</section>
    </>}
    <section className="ws-card alerts-methods"><h2>Interpretation and methods</h2><p>Matches identify motifs for human review. They do not prove assay interference, toxicity or inactivity. No matches do not establish safety. Patterns are applied to the structure as drawn, without charge normalization or salt removal. The local screen supports one connected structure with up to 250 drawn atoms.</p><p>Query hydrogen constraints are merged using RDKit’s FilterCatalog operation. Target hydrogens are not expanded, so degree-sensitive patterns retain their meaning and your drawing is unchanged. Mapped occurrences are capped at 128 per pattern; a capped count is labelled “at least”. Every catalog pattern is still screened. An invalid definition or matching failure stops the run instead of displaying a false zero.</p>{Object.values(alertSets).map(set=><p key={set.name}><strong>{set.name}: </strong>{set.meaning} <a href={set.url} target="_blank" rel="noreferrer">{set.reference} ↗</a></p>)}<p className="descriptor-note">Definitions: RDKit Release_2026_09_2, BSD-3-Clause. Original SMARTS and file hashes are retained with the source. Imported alert snapshots are validated for references and graph mappings; independently re-run a live screen to verify their scientific content.</p></section>
  </div>;
}
