import {useWorkspaceStore} from "../workspace/store";
import {dockingCsv,dockingAdvisory} from "./model";
import {dockingPdf} from "./report";
import {DockingDownload} from "./DockingDownload";
export function DockingReports(){
  const stored=useWorkspaceStore(s=>s.data.dockingRuns),runs=stored??[];
  return <section className="ws-card"><h2>Docking research reports</h2><p className="descriptor-note">Saved docking runs retain their protein/ligand preparation snapshots, engine settings, scores and contacts. PDF/CSV work from those immutable snapshots; the execution ZIP retains raw coordinates and logs.</p>{runs.length?runs.map(run=><article className="docking-report-row" key={run.id}><div><h3>{run.result.ligand.name} → {run.result.receptor.name}</h3><p>{run.result.engineVersion} · {run.result.poses.length} poses · {new Date(run.savedAt).toLocaleString()}</p><small>Run {run.id}</small>{dockingAdvisory(run.result)&&<p role="status">{dockingAdvisory(run.result)}</p>}</div><div className="ws-actions"><DockingDownload label="docking PDF" filename="ChemEase-docking-report.pdf" create={()=>dockingPdf(run.result)}/><DockingDownload label="docking CSV" filename="ChemEase-docking-report.csv" inspect create={async()=>new Blob([dockingCsv(run.result)],{type:"text/csv;charset=utf-8"})}/></div></article>):<p>Save a completed run from the Docking module to retain it here.</p>}</section>;
}
