import type { Asset, DockingEngine, Grid, Health } from './types';

export const dockingStages = [
  { id: 'preparation', label: 'Preparation', detail: 'Protein & ligand' },
  { id: 'site', label: 'Binding site', detail: 'Position the grid' },
  { id: 'settings', label: 'Settings', detail: 'Search & review' },
  { id: 'run', label: 'Run docking', detail: 'Launch & monitor' },
  { id: 'results', label: 'Results', detail: 'Compare & report' },
] as const;
export type DockingStage = typeof dockingStages[number]['id'];
export interface SearchFields { exhaustiveness:string; cpu:string; poseCount:string; seed:string; ad4Runs:string; ad4Evaluations:string }
const integerInRange = (text:string, min:number, max:number) => !!text.trim() && Number.isInteger(Number(text)) && Number(text)>=min && Number(text)<=max;
export function dockingReadiness({receptor,ligand,grid,health,engine,browser,fields,reviewed}:{receptor?:Asset;ligand?:Asset;grid?:Grid;health:Health|null;engine:DockingEngine;browser:boolean;fields:SearchFields;reviewed:boolean}) {
  const missing:string[]=[];
  const receptorReady=!!receptor?.ready&&!!receptor.files.features;
  const ligandReady=!!ligand?.ready&&!!ligand.files.features&&(!browser||ligand.tools?.protocol==='chemease-browser-v2');
  if(!receptorReady)missing.push('Choose a prepared receptor with interaction topology.');
  if(!ligandReady)missing.push(browser?'Choose a ligand prepared with the current browser protocol.':'Choose a prepared ligand with interaction topology.');
  if(!grid)missing.push('Define a complete, valid binding-site grid.');
  const engineReady=!!health?.engines.find(item=>item.id===engine)?.available;
  if(!engineReady)missing.push('Choose an available docking engine.');
  const searchReady=integerInRange(fields.poseCount,1,20)&&integerInRange(fields.seed,1,2147483647)&&(!browser||integerInRange(fields.cpu,1,4))&&(engine==='vina'?integerInRange(fields.exhaustiveness,1,32):integerInRange(fields.ad4Runs,1,50)&&integerInRange(fields.ad4Evaluations,100000,10000000));
  if(!searchReady)missing.push('Complete the search settings with whole numbers in the displayed ranges.');
  if(!reviewed)missing.push('Confirm your review of preparation, ligand state and the complete grid.');
  return {receptorReady,ligandReady,inputsReady:receptorReady&&ligandReady,siteReady:receptorReady&&ligandReady&&!!grid,engineReady,searchReady,canRun:missing.length===0,missing};
}
