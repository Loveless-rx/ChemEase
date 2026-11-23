import type { SupabaseClient } from "@supabase/supabase-js";
import type { WorkspaceData, WorkspaceRepository } from "../workspace/types";
import { validateWorkspace } from "../workspace/domain";

export async function requireOwner(client: SupabaseClient, owner: string) {
  const {data,error} = await client.auth.getSession();
  if(error || data.session?.user.id !== owner) throw new Error("Your account session changed. Sign in again before saving.");
}
export function cloudError(error: {message:string;code?:string}) {
  if(error.code === "40001") return new Error("This workspace changed on another device. Download a backup of this drawing, then reload cloud data before continuing. Nothing was overwritten.");
  if(error.code === "42P01" || error.code === "PGRST202") return new Error("Account storage is not set up yet. Run the ChemEase Supabase migration, then retry.");
  return new Error(`Cloud save/read failed: ${error.message}. Your drawing is still available; check your connection and retry.`);
}
export class CloudWorkspaceRepository implements WorkspaceRepository {
  readonly ownerId:string;
  private client:SupabaseClient;
  constructor(ownerId:string,client:SupabaseClient){this.ownerId=ownerId;this.client=client;}
  async load() {
    await requireOwner(this.client,this.ownerId);
    const {data,error}=await this.client.from("chemease_workspaces").select("payload,revision").eq("owner_id",this.ownerId).maybeSingle();
    if(error) throw cloudError(error);
    if(!data) return null;
    const safe=validateWorkspace(data.payload,this.ownerId);
    if(safe.revision!==data.revision) throw new Error("The cloud workspace revision is inconsistent.");
    return safe;
  }
  async save(data:WorkspaceData,expectedRevision:number) {
    const safe=validateWorkspace(data,this.ownerId);
    if(safe.revision!==expectedRevision+1) throw new Error("Invalid workspace revision.");
    if(new Blob([JSON.stringify(safe)]).size>20*1024*1024) throw new Error("The account workspace has reached its 20 MB limit. Export a backup before continuing.");
    await requireOwner(this.client,this.ownerId);
    const {error}=await this.client.rpc("save_chemease_workspace",{expected_revision:expectedRevision,document:safe});
    if(error) throw cloudError(error);
  }
}
