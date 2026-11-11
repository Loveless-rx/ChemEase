import { Icon } from "../../../Components/common/Icon";
import { useWorkspaceStore } from "../store";
import type { Project } from "../types";
import type { PageActions } from "../pageActions";

export function ProjectCard({project:p,actions}:{project:Project;actions:PageActions}) {
  const count=useWorkspaceStore(s=>s.data.molecules.filter(m=>m.projectId===p.id).length);
  return <article className="ws-card ws-project-card"><Icon name="folder" size={25}/><h3>{p.name}</h3><p>{p.description||"A collection of molecules, versions, and results."}</p><small>{count} molecule{count===1?"":"s"} · Updated {new Date(p.updatedAt).toLocaleDateString()}</small><button className="ws-text-button" onClick={()=>actions.project(p)}>Edit project →</button></article>;
}
