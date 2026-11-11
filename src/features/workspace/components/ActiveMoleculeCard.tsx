import { useMoleculeStore } from "../../../store/moleculeStore";
import { moleculeSvg } from "../../../engine/export";
import { useWorkspaceStore } from "../store";
import { snapshotKey } from "../domain";
import type { useMoleculeAnalysis } from "../../../hooks/useMoleculeAnalysis";
import type { PageActions } from "../pageActions";

export function ActiveMoleculeCard({analysis,actions}:{
  analysis:ReturnType<typeof useMoleculeAnalysis>;
  actions:PageActions;
}) {
  const graph=useMoleculeStore(s=>s.molecule), data=useWorkspaceStore(s=>s.data);
  const version=data.versions.find(v=>v.id===data.active.versionId);
  const project=data.projects.find(p=>p.id===data.active.projectId);
  const exact=version&&snapshotKey(version.graph)===snapshotKey(graph);
  return <section className="ws-structure-summary ws-card" aria-label="Active molecule">
    <img alt="Current molecular structure" src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(moleculeSvg(graph))}`}/>
    <div className="ws-active-details">
      <span className="eyebrow">{project?.name??"PERSONAL WORKSPACE"}</span>
      <h2>{graph.metadata.name}</h2>
      <p>{analysis.formula} · {analysis.weight?.toFixed(2)??"—"} g/mol</p>
      <span className="ws-badge">{exact?`Saved version ${version.number}`:version?`Draft · edited from version ${version.number}`:"Draft · changes not versioned"}</span>
      <div className="ws-actions ws-active-actions">
        <button className="ws-text-button" onClick={()=>actions.navigate("editor")}>View structure →</button>
        <button className="ws-text-button" onClick={()=>actions.navigate("library")}>Change molecule →</button>
        {!exact&&<button className="ws-text-button" onClick={actions.save}>Save version →</button>}
      </div>
      {analysis.warnings.length>0&&<p className="chemistry-error">{analysis.warnings.map(w=>w.message).join(" ")}</p>}
    </div>
  </section>;
}
