import type { Molecule } from "../../models/Molecule";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useHistoryStore } from "../../store/historyStore";
import { useUIStore } from "../../store/chemUIStore";
import { loadMolecule } from "../../utils/storage";
import { useWorkspaceStore } from "./store";
import { snapshotKey } from "./domain";

let timer:ReturnType<typeof setTimeout>|undefined;
let applying=false;
let queued:Molecule|null=null;
export function applyGraph(graph:Molecule, clearHistory=true) {
  applying=true;
  try {
    useMoleculeStore.getState().replace(structuredClone(graph));
    const d=useWorkspaceStore.getState().data, saved=d.versions.find(v=>v.id===d.active.versionId);
    useMoleculeStore.setState({savedFingerprint:fingerprint(saved?.graph??graph)});
    if(clearHistory) useHistoryStore.getState().clear();
  } finally {applying=false;}
}
export async function flushDraft() {
  clearTimeout(timer);
  const graph=queued;queued=null;
  if(graph) await useWorkspaceStore.getState().draft(graph);
}
export async function initializeEditor() {
  // Replaying the intro must not replace an unsaved in-memory drawing.
  if(useWorkspaceStore.getState().ready) return;
  await useWorkspaceStore.getState().initialize();
  const d=useWorkspaceStore.getState().data;
  const graph=d.draft??d.versions.find(v=>v.id===d.active.versionId)?.graph??loadMolecule();
  if(graph) applyGraph(graph);
}
export function subscribeDraft() {
  const warn=(event:BeforeUnloadEvent)=>{
    const workspace=useWorkspaceStore.getState(),graph=useMoleculeStore.getState().molecule;
    const failedDraft=workspace.error && graph.atoms.length>0 && (!workspace.data.draft || snapshotKey(workspace.data.draft)!==snapshotKey(graph));
    if(queued || workspace.pending || failedDraft){event.preventDefault();event.returnValue="";}
  };
  window.addEventListener("beforeunload",warn);
  const unsubscribe=useMoleculeStore.subscribe((s,previous)=>{
    if(applying||s.molecule===previous.molecule||!useWorkspaceStore.getState().writable) return;
    queued=structuredClone(s.molecule);clearTimeout(timer);
    timer=setTimeout(()=>{void flushDraft().catch(()=>{});},400);
  });
  return ()=>{unsubscribe();window.removeEventListener("beforeunload",warn);void flushDraft().catch(()=>{});};
}
export function confirmSwitch() {
  const d=useWorkspaceStore.getState().data, graph=useMoleculeStore.getState().molecule;
  const saved=d.versions.find(v=>v.id===d.active.versionId);
  return !graph.atoms.length || (saved&&snapshotKey(saved.graph)===snapshotKey(graph)) || window.confirm("This drawing has changes without a saved version. Switch and replace the current draft? Save a version first if you want to keep it in the library.");
}
export async function openSavedVersion(id:string) {
  if(!confirmSwitch()) return false;
  await flushDraft();
  const graph=await useWorkspaceStore.getState().openVersion(id);
  applyGraph(graph);useUIStore.getState().set({dialog:null});return true;
}
