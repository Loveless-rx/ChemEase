import { useState } from "react";
import { useWorkspaceStore } from "../store";
import { ProjectCard } from "../components/ProjectCard";
import type { PageActions } from "../pageActions";

export function ProjectsPage({actions}:{actions:PageActions}) {
  const data=useWorkspaceStore(s=>s.data),[filter,setFilter]=useState("");
  return <div className="ws-page"><div className="ws-page-heading"><div><span className="eyebrow">ORGANIZE YOUR WORK</span><h1>Projects</h1><p>Separate collections, connected to one molecule library.</p></div><button className="primary" onClick={()=>actions.project()}>Create project</button></div><label className="ws-search">Search projects<input type="search" placeholder="Find a project…" value={filter} onChange={e=>setFilter(e.target.value)}/></label><div className="ws-project-grid">{data.projects.filter(p=>`${p.name} ${p.description}`.toLowerCase().includes(filter.toLowerCase())).map(p=><section key={p.id} className="ws-project-group"><ProjectCard project={p} actions={actions}/><div className="ws-project-molecules">{data.molecules.filter(m=>m.projectId===p.id).map(m=>{const latest=data.versions.filter(v=>v.moleculeId===m.id).at(-1)!;return <button key={m.id} onClick={()=>actions.open(latest.id)}><span>{m.name}</span><small>v{latest.number} →</small></button>;})}<button className="ws-text-button" onClick={()=>actions.navigate("library")}>Browse library →</button></div></section>)}</div>{!data.projects.length&&<div className="ws-empty"><h3>No projects yet.</h3><p>Create a project, then save a molecule version into it.</p></div>}</div>;
}
