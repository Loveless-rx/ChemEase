import type { Molecule } from "../../models/Molecule";
import { chemistryKey, type ToolkitResult } from "../../engine/toolkit";
export type BoundToolkitResult=ToolkitResult & {structureKey:string};

/** Compare reproducible inputs; ignore request binding and presentation metadata. */
export function sameDescriptors(a:ToolkitResult,b:ToolkitResult) {
  return (["smiles","engine","weight","logP","tpsa","molarRefractivity","donors","acceptors","rotatable","rings","heavyAtoms","charge"] as const).every(key=>a[key]===b[key]);
}

/** All modules share one computation per chemical graph; layout is irrelevant. */
export function createDescriptorCache(calculate: (graph:Molecule)=>Promise<ToolkitResult>, capacity=80) {
  const cache=new Map<string,Promise<BoundToolkitResult>>();
  return {
    get(graph:Molecule) {
      const key=chemistryKey(graph), found=cache.get(key);
      if(found) return found.then(structuredClone);
      const snapshot=structuredClone(graph);
      const job=Promise.resolve().then(()=>calculate(snapshot)).then(result=>({...result,structureKey:key}));
      cache.set(key,job);
      if(cache.size>capacity) cache.delete(cache.keys().next().value!);
      job.catch(()=>{if(cache.get(key)===job) cache.delete(key);});
      return job.then(structuredClone);
    },
  };
}
