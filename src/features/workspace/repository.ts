import type { WorkspaceData, WorkspaceRepository } from "./types";
import { validateWorkspace } from "./domain";

export class LocalWorkspaceRepository implements WorkspaceRepository {
  readonly ownerId:string;
  constructor(ownerId: string) {this.ownerId=ownerId;}
  private async db() {
    return new Promise<IDBDatabase>((resolve,reject)=>{
      const request=indexedDB.open("chemease-workspaces",1);
      request.onupgradeneeded=()=>request.result.createObjectStore("workspaces");
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(new Error("Project storage could not be opened. Check browser storage permissions."));
      request.onblocked=()=>reject(new Error("Close other ChemEase tabs to finish opening project storage."));
    });
  }
  async load() {
    const db=await this.db();
    try {
      const data=await new Promise<unknown>((resolve,reject)=>{
        const request=db.transaction("workspaces").objectStore("workspaces").get(this.ownerId);
        request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error("Could not read projects on this device."));
      });
      return data ? validateWorkspace(data,this.ownerId) : null;
    } finally { db.close(); }
  }
  async save(data:WorkspaceData,expectedRevision:number) {
    const safe=validateWorkspace(structuredClone(data),this.ownerId);
    if(new Blob([JSON.stringify(safe)]).size>20*1024*1024) throw new Error("The local workspace has reached its 20 MB limit. Export a backup before continuing in another browser workspace.");
    if(safe.revision!==expectedRevision+1) throw new Error("Invalid workspace revision.");
    const db=await this.db();
    try {
      await new Promise<void>((resolve,reject)=>{
        const transaction=db.transaction("workspaces","readwrite");
        const store=transaction.objectStore("workspaces");
        let conflict=false;
        const read=store.get(this.ownerId);
        read.onsuccess=()=>{
          const previous=read.result as WorkspaceData|undefined;
          if((previous?.revision??0)!==expectedRevision) {conflict=true;transaction.abort();return;}
          store.put(safe,this.ownerId);
        };
        transaction.oncomplete=()=>resolve();
        transaction.onabort=()=>reject(new Error(conflict ? "Projects changed in another tab. Reload the workspace before saving again; your current drawing is still available." : "Project save failed. Browser storage may be full. Export a backup and keep this tab open."));
        transaction.onerror=()=>{ /* onabort reports the transaction failure. */ };
      });
    } finally { db.close(); }
  }
}
