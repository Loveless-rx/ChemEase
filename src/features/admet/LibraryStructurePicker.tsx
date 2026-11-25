import {useState} from "react";
import {useWorkspaceStore} from "../workspace/store";
import type {PageActions} from "../workspace/pageActions";
export function LibraryStructurePicker({actions}:{actions:PageActions}){
 const {data,pending}=useWorkspaceStore();
 const [selected,setSelected]=useState("");
 const versions=[...data.versions].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||a.id.localeCompare(b.id));
 const chosen=versions.find(v=>v.id===selected)??versions[0];
 return <section className="ws-card admet-library-picker" aria-label="Choose an ADMET library structure"><div><span className="eyebrow">YOUR SAVED STRUCTURES</span><h2>Continue from your library.</h2><p>Open an exact saved version, with its linked analysis and prediction history. Your current drawing is replaced only after the usual unsaved-change check.</p></div>{versions.length?<><label>Saved molecule version<select aria-label="ADMET library structure" value={chosen?.id??""} onChange={e=>setSelected(e.target.value)}>{versions.map(v=>{const record=data.molecules.find(m=>m.id===v.moleculeId),project=data.projects.find(p=>p.id===record?.projectId);return <option key={v.id} value={v.id}>{v.graph.metadata.name} · v{v.number} · {project?.name} · {v.id}</option>;})}</select></label><button className="secondary" disabled={!chosen||!!pending} onClick={()=>{if(chosen)actions.open(chosen.id,"admet");}}>Use selected structure</button></>:<><p>No saved structures in this workspace yet. Guest and account libraries are separate.</p><button className="secondary" onClick={()=>actions.navigate("library")}>Open molecule library</button></>}</section>;
}
