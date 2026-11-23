import type { WorkspaceData } from "../workspace/types";
import { validateWorkspace } from "../workspace/domain";

export function mergeGuestWorkspace(target:WorkspaceData,guest:WorkspaceData):WorkspaceData {
  if(target.ownerId==="local-device"||guest.ownerId!=="local-device")throw new Error("Choose an account before importing guest work.");
  validateWorkspace(guest,"local-device");
  const next=structuredClone(target);
  for(const key of ["projects","molecules","versions","results","reports","dockingRuns"] as const){
    const existing=next[key]??[],incoming=guest[key]??[];
    const ids=new Set(existing.map(r=>r.id));
    if(incoming.some(r=>ids.has(r.id)))throw new Error("Some guest records are already in this account. Import stopped to avoid duplicate or overwritten work.");
    Object.assign(next,{[key]:[...existing,...structuredClone(incoming)]});
  }
  // Keep the account's current drawing; use the guest drawing for a fresh account.
  if(!target.projects.length&&!target.draft){next.active=structuredClone(guest.active);next.draft=structuredClone(guest.draft);}
  return validateWorkspace(next,target.ownerId);
}
