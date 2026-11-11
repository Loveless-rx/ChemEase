import { loadRDKit } from "../../engine/rdkit";
import { calculateAlerts } from "./analysis";
import type { Molecule } from "../../models/Molecule";
export async function analyzeAlerts(graph:Molecule,signal?:AbortSignal) {
  return calculateAlerts(await loadRDKit(),structuredClone(graph),{signal,yieldTask:()=>new Promise(resolve=>setTimeout(resolve,0))});
}
