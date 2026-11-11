import { useCallback, useState } from "react";
import { Modal } from "../../Components/common/Modal";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { useWorkspaceStore } from "./store";
import { flushDraft, applyGraph } from "./editorBridge";
import type { Project } from "./types";

export function ProjectDialog({project,onClose}:{project?:Project;onClose:()=>void}) {
  const [name,setName]=useState(project?.name??""),[description,setDescription]=useState(project?.description??"");
  const [busy,setBusy]=useState(false),[error,setError]=useState("");
  const dismiss=useCallback(()=>{if(!busy)onClose();},[busy,onClose]);
  return <Modal title={project?"Edit project":"Create a project"} onClose={dismiss}><form className="dialog-body ws-form" onSubmit={async e=>{
    e.preventDefault();setBusy(true);setError("");
    try {const s=useWorkspaceStore.getState();if(project)await s.editProject(project.id,name,description);else await s.createProject(name,description);onClose();}
    catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }}><p className="muted">Keep related molecules and their versions together. Projects are saved on this device.</p><label>Project name<input required maxLength={120} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Organic chemistry practical"/></label><label>Description<textarea maxLength={3000} rows={3} value={description} onChange={e=>setDescription(e.target.value)} placeholder="What are you studying?"/></label>{error&&<p role="alert" className="chemistry-error">{error}</p>}<button className="primary" disabled={busy||!name.trim()}>{busy?"Saving…":project?"Save project":"Create project"}</button></form></Modal>;
}

export function SaveVersionDialog({onClose}:{onClose:()=>void}) {
  const data=useWorkspaceStore(s=>s.data), molecule=useMoleculeStore(s=>s.molecule);
  const [name,setName]=useState(molecule.metadata.name),[projectId,setProjectId]=useState(data.active.projectId??data.projects[0]?.id??"");
  const [projectName,setProjectName]=useState(""),[asNew,setAsNew]=useState(!data.active.moleculeId);
  const [busy,setBusy]=useState(false),[error,setError]=useState("");
  const dismiss=useCallback(()=>{if(!busy)onClose();},[busy,onClose]);
  const existing=data.molecules.find(m=>m.id===data.active.moleculeId&&m.projectId===projectId);
  return <Modal title="Save molecule version" onClose={dismiss}><form className="dialog-body ws-form" onSubmit={async e=>{
    e.preventDefault();setBusy(true);setError("");
    try {
      await flushDraft();const s=useWorkspaceStore.getState();
      const id=projectId||await s.createProject(projectName,"");
      const graph=structuredClone(useMoleculeStore.getState().molecule);graph.metadata.name=name.trim();
      graph.metadata.updatedAt=new Date().toISOString();
      await s.saveVersion(id,!asNew&&existing?existing.id:null,graph);
      applyGraph(graph,false);useMoleculeStore.setState({savedFingerprint:fingerprint(graph)});
      useUIStore.getState().notify("Molecule version saved to your library.");onClose();
    } catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }}><p className="muted">Each version keeps an independent structure. Saving again preserves earlier versions and their results.</p><label>Molecule name<input required value={name} maxLength={120} onChange={e=>setName(e.target.value)}/></label><label>Project<select value={projectId} onChange={e=>setProjectId(e.target.value)}><option value="">Create a new project…</option>{data.projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>{!projectId&&<label>New project name<input required maxLength={120} value={projectName} onChange={e=>setProjectName(e.target.value)} placeholder="My first project"/></label>}{existing&&<label className="ws-checkbox"><input type="checkbox" checked={asNew} onChange={e=>setAsNew(e.target.checked)}/>Save as a separate molecule</label>}{error&&<p className="chemistry-error" role="alert">{error}</p>}<button className="primary" disabled={busy||!name.trim()||!molecule.atoms.length||(!projectId&&!projectName.trim())}>{busy?"Saving…":"Save version"}</button></form></Modal>;
}
