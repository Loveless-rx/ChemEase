import {configureExportAccess} from "./access";
import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./client";
import { CloudWorkspaceRepository } from "./cloudRepository";
import { LocalWorkspaceRepository } from "../workspace/repository";
import { useWorkspaceStore } from "../workspace/store";
import { applyGraph, discardQueuedDraft, flushDraft } from "../workspace/editorBridge";
import { emptyMolecule } from "../../models/Molecule";
import { loadMolecule, setMoleculeStorageOwner } from "../../utils/storage";
import { useUIStore } from "../../store/chemUIStore";
import { configureDockingStorage } from "../docking/browser/storage";
import { cancelAccountJobs } from "../docking/browser/service";
import { dockingCloud, saveDockingFiles } from "./dockingCloud";
import type { DockingResult } from "../docking/types";

export const useAccount = create<{
  user:User|null;guest:boolean;ready:boolean;error:string;dialog:boolean;recovery:boolean;
}>(()=>({user:null,guest:false,ready:false,error:"",dialog:false,recovery:false}));
let started=false,activeOwner:string|undefined,generation=0;
async function activate(user:User|null,force=false){
  const owner=user?.id??"local-device";
  if(owner===activeOwner&&!force){useAccount.setState({user});return;}
  const current=++generation;activeOwner=owner;
  useAccount.setState({user,ready:false,error:""});
  configureExportAccess(!!user,()=>useAccount.setState({dialog:true,error:"Create an account or sign in to export and download your work."}));
  discardQueuedDraft();cancelAccountJobs();
  useWorkspaceStore.setState({writable:false});
  setMoleculeStorageOwner(owner);
  useUIStore.getState().set({dialog:null,pendingAtom:null,toast:"",pan:{x:0,y:0},zoom:1});
  applyGraph(emptyMolecule());
  configureDockingStorage(user&&supabase?{owner,...dockingCloud(supabase,owner)}:null);
  const repository=user&&supabase?new CloudWorkspaceRepository(owner,supabase):new LocalWorkspaceRepository(owner);
  await useWorkspaceStore.getState().changeRepository(repository);
  if(current!==generation)return;
  const workspace=useWorkspaceStore.getState();
  const graph=workspace.data.draft??workspace.data.versions.find(v=>v.id===workspace.data.active.versionId)?.graph;
  try{applyGraph(graph??(!user?loadMolecule():null)??emptyMolecule());}
  catch(error){useAccount.setState({error:(error as Error).message});}
  useAccount.setState({ready:true});
}
export function initializeAccount(){
  if(started)return;started=true;
  if(!supabase){void activate(null);return;}
  const url=new URL(location.href);
  const error=url.searchParams.get("error_description");
  if(error)useAccount.setState({error,dialog:true});
  supabase.auth.onAuthStateChange((event,session)=>{
    if(event==="PASSWORD_RECOVERY")useAccount.setState({recovery:true,dialog:true});
    // Do not await another Supabase call while the auth callback holds its lock.
    if(event!=="TOKEN_REFRESHED")queueMicrotask(()=>{void activate(session?.user??null).catch(e=>useAccount.setState({ready:true,error:e.message,dialog:true}));});
  });
  void supabase.auth.getSession().then(({data,error})=>{
    if(error){useAccount.setState({error:error.message,dialog:true});}
    if(activeOwner===undefined)return activate(data.session?.user??null);
  }).catch(e=>useAccount.setState({ready:true,error:e.message,dialog:true}));
}
export async function prepareAccountChange(){
  await flushDraft();
  await useWorkspaceStore.getState().settle();
  if(useWorkspaceStore.getState().error)throw new Error("Keep this workspace open and retry its save, or download a backup before changing accounts.");
}
export async function reloadAccount(){
  if(useWorkspaceStore.getState().pending)throw new Error("Wait for the current save before reloading.");
  await activate(useAccount.getState().user,true);
}
export async function saveAccountDocking(result:DockingResult){
  const user=useAccount.getState().user;
  if(user&&supabase)await saveDockingFiles(supabase,user.id,result);
}
