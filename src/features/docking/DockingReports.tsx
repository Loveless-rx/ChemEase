import {useState} from "react";
import {useWorkspaceStore} from "../workspace/store";
import {downloadBlob} from "../../engine/export";
import {dockingCsv} from "./model";
import {dockingPdf} from "./report";
export function DockingReports(){
  const stored=useWorkspaceStore(s=>s.data.dockingRuns),runs=stored??[],[busy,setBusy]=useState(""),[error,setError]=useState("");
  return <section className="ws-card"><h2>Docking research reports</h2><p className="descriptor-note">Saved docking runs retain their protein/ligand preparation snapshots, engine settings, scores and contacts. PDF/CSV work from those immutable snapshots; the backend ZIP retains raw coordinates and logs.</p>{runs.length?runs.map(run=><article className="docking-report-row" key={run.id}><div><h3>{run.result.ligand.name} → {run.result.receptor.name}</h3><p>{run.result.engineVersion} · {run.result.poses.length} poses · {new Date(run.savedAt).toLocaleString()}</p><small>Run {run.id}</small></div><div className="ws-actions"><button className="secondary" disabled={!!busy} onClick={()=>{setBusy(run.id);setError("");void dockingPdf(run.result).then(blob=>downloadBlob(blob,"ChemEase-docking-report.pdf")).catch(e=>setError((e as Error).message)).finally(()=>setBusy(""));}}>{busy===run.id?"Preparing PDF…":"Download docking PDF"}</button><button className="secondary" onClick={()=>downloadBlob(new Blob([dockingCsv(run.result)],{type:"text/csv;charset=utf-8"}),"ChemEase-docking-report.csv")}>Download docking CSV</button></div></article>):<p>Save a completed run from the Docking module to retain it here.</p>}{error&&<p role="alert">{error}</p>}</section>;
}
