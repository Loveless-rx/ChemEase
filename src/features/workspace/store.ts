import { create } from "zustand";
import type { Molecule } from "../../models/Molecule";
import type { BoundToolkitResult } from "./descriptorCache";
import { addProject, emptyWorkspace, saveVersion, saveAnalysis, saveExtendedDrugLikeness, saveStructuralAlerts, saveSolubility, saveSkin, saveHepatic, validateWorkspace } from "./domain";
import type { HepaticSettings } from "../hepatic/model";
import type { SkinSettings } from "../skin/model";
import type { AlertResult } from "../medicinalChemistry/analysis";
import type { WorkspaceData, WorkspaceRepository } from "./types";
import { LocalWorkspaceRepository } from "./repository";

export function createWorkspaceStore(repository: WorkspaceRepository) {
  let epoch=0;
  let tail:Promise<unknown>=Promise.resolve(), loading:Promise<void>|null=null;
  return create<{
    data:WorkspaceData;ready:boolean;writable:boolean;pending:number;error:string|null;
    initialize:()=>Promise<void>;
    settle:()=>Promise<void>;
    changeRepository:(next:WorkspaceRepository)=>Promise<void>;
    transact:(change:(data:WorkspaceData)=>WorkspaceData)=>Promise<void>;
    createProject:(name:string,description:string)=>Promise<string>;
    editProject:(id:string,name:string,description:string)=>Promise<void>;
    saveVersion:(projectId:string,recordId:string|null,graph:Molecule)=>Promise<string>;
    openVersion:(versionId:string)=>Promise<Molecule>;
    draft:(graph:Molecule)=>Promise<void>;
    newDraft:(graph:Molecule)=>Promise<void>;
    saveAnalysis:(versionId:string,graph:Molecule,descriptors:BoundToolkitResult)=>Promise<void>;
    saveDrugLikeness:(versionId:string,graph:Molecule,descriptors:BoundToolkitResult)=>Promise<void>;
    saveStructuralAlerts:(versionId:string,graph:Molecule,alerts:AlertResult)=>Promise<void>;
    saveSolubility:(versionId:string,graph:Molecule,descriptors:BoundToolkitResult)=>Promise<void>;
    saveSkin:(versionId:string,graph:Molecule,descriptors:BoundToolkitResult,settings:SkinSettings)=>Promise<void>;
    saveHepatic:(versionId:string,graph:Molecule,settings:HepaticSettings)=>Promise<void>;
    restore:(input:unknown)=>Promise<void>;
  }>((set,get)=>({
    data:emptyWorkspace(repository.ownerId),ready:false,writable:false,pending:0,error:null,
    settle:async()=>{await tail;},
    initialize:()=>{
      if(loading) return loading;
      const scope=epoch,repo=repository;
      loading=(async()=>{
        try { const data=await repo.load();if(scope!==epoch)return;set({data:data??emptyWorkspace(repo.ownerId),ready:true,writable:true,error:null}); }
        catch(e) {if(scope!==epoch)return;set({ready:true,writable:false,error:(e as Error).message});}
        finally {if(scope===epoch)loading=null;}
      })();
      return loading;
    },
    changeRepository:async next=>{
      epoch++;repository=next;loading=null;
      set({data:emptyWorkspace(next.ownerId),ready:false,writable:false,pending:0,error:null});
      await get().initialize();
    },
    transact:change=>{
      const scope=epoch,repo=repository;
      set(s=>({pending:s.pending+1}));
      const job=tail.then(async()=>{
        if(scope!==epoch)throw new Error("The account changed before this operation could be saved.");
        if(!get().writable) throw new Error("Project storage is unavailable. Retry loading it before saving.");
        const current=get().data;
        const next=change(structuredClone(current));next.revision=current.revision+1;
        await repo.save(next,current.revision);
        if(scope!==epoch)return;
        set({data:next,error:null});
      }).catch((e:unknown)=>{if(scope===epoch)set({error:e instanceof Error?e.message:"Workspace save failed."});throw e;})
        .finally(()=>{if(scope===epoch)set(s=>({pending:s.pending-1}));});
      tail=job.catch(()=>undefined);return job;
    },
    createProject:async(name,description)=>{
      let id="";await get().transact(data=>{const result=addProject(data,name,description);id=result.id;return result.data;});return id;
    },
    editProject:async(id,name,description)=>{
      if(!name.trim()) throw new Error("Enter a project name.");
      await get().transact(data=>{const p=data.projects.find(p=>p.id===id);if(!p)throw new Error("Project not found.");p.name=name.trim().slice(0,120);p.description=description.slice(0,3000);p.updatedAt=new Date().toISOString();return data;});
    },
    saveVersion:async(projectId,recordId,graph)=>{
      let id="";await get().transact(data=>{const result=saveVersion(data,projectId,recordId,graph);id=result.versionId;return result.data;});return id;
    },
    openVersion:async(versionId)=>{
      let graph:Molecule|undefined;
      await get().transact(data=>{
        const v=data.versions.find(v=>v.id===versionId),m=data.molecules.find(m=>m.id===v?.moleculeId);
        if(!v||!m)throw new Error("Saved version not found.");
        graph=structuredClone(v.graph);data.active={projectId:m.projectId,moleculeId:m.id,versionId:v.id};data.draft=structuredClone(graph);return data;
      });return graph!;
    },
    draft:async graph=>{await get().transact(data=>{data.draft=structuredClone(graph);return data;});},
    newDraft:async graph=>{await get().transact(data=>{data.active={projectId:data.active.projectId,moleculeId:null,versionId:null};data.draft=structuredClone(graph);return data;});},
    saveAnalysis:async(versionId,graph,descriptors)=>{await get().transact(data=>saveAnalysis(data,versionId,graph,descriptors));},
    saveDrugLikeness:async(versionId,graph,descriptors)=>{await get().transact(data=>saveExtendedDrugLikeness(data,versionId,graph,descriptors));},
    saveStructuralAlerts:async(versionId,graph,alerts)=>{await get().transact(data=>saveStructuralAlerts(data,versionId,graph,alerts));},
    saveSolubility:async(versionId,graph,descriptors)=>{await get().transact(data=>saveSolubility(data,versionId,graph,descriptors));},
    saveSkin:async(versionId,graph,descriptors,settings)=>{await get().transact(data=>saveSkin(data,versionId,graph,descriptors,settings));},
    saveHepatic:async(versionId,graph,settings)=>{const capturedGraph=structuredClone(graph),capturedSettings=structuredClone(settings);await get().transact(data=>saveHepatic(data,versionId,capturedGraph,capturedSettings));},
    restore:async input=>{
      const data=validateWorkspace(structuredClone(input),repository.ownerId);
      await get().transact(()=>data);
    },
  }));
}
export const useWorkspaceStore=createWorkspaceStore(new LocalWorkspaceRepository("local-device"));
