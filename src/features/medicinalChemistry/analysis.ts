import type { MainModule } from "@rdkit/rdkit";
import type { Molecule } from "../../models/Molecule";
import { toolkitMol, chemistryKey } from "../../engine/toolkit";
import { analyzeMolecule } from "../../engine/analysis";
import { ALERT_CATALOG_VERSION, alertPatterns } from "./catalog";

export const ALERT_METHOD="structural-alerts-v1" as const;
export const alertSets={
  PAINS:{name:"PAINS",patterns:480,reference:"Baell & Holloway (2010)",url:"https://doi.org/10.1021/jm901137j",meaning:"A matched motif associated with assay-interference concerns in the PAINS screening set. Review the assay context and supporting evidence; a match does not establish interference or inactivity."},
  BRENK:{name:"Brenk",patterns:105,reference:"Brenk et al. (2008)",url:"https://doi.org/10.1002/cmdc.200700139",meaning:"A functionality flagged by the Brenk screening-library criteria for potential reactivity, handling or pharmacokinetic concerns. It is a review signal, not a toxicity verdict."},
} as const;
export interface AlertMatch {patternId:string;atomIds:string[];bondIds:string[];occurrences:number;truncated:boolean}
export interface AlertResult {
  structureKey:string;engine:string;smiles:string;catalogVersion:typeof ALERT_CATALOG_VERSION;
  status:"complete"|"not-evaluable";reason:string|null;scannedPatterns:number;totalPatterns:number;matches:AlertMatch[];
}
export interface AlertOptions {signal?:AbortSignal;yieldTask?:()=>Promise<void>}

export function compileAlertQuery(rdkit:MainModule,smarts:string) {
  const raw=rdkit.get_qmol(smarts);
  if(!raw)throw new Error("A structural-alert SMARTS definition could not be compiled.");
  try {
    // get_qmol exposes no JSON options in MinimalLib JS. Its query JSON round trip
    // exposes the same core mergeQueryHs operation used by RDKit FilterCatalog.
    const merged=rdkit.get_mol(raw.get_json(),JSON.stringify({sanitize:false,removeHs:false,mergeQueryHs:true,assignStereo:false}));
    if(!merged)throw new Error("A structural-alert query could not preserve its hydrogen constraints.");
    return merged;
  } finally {raw.delete();}
}

/** Original editor atom/bond order is preserved; target hydrogens are not expanded. */
export async function calculateAlerts(rdkit:MainModule,graph:Molecule,options:AlertOptions={}):Promise<AlertResult> {
  const key=chemistryKey(graph), engine=`RDKit ${rdkit.version()}`;
  const unavailable=(reason:string):AlertResult=>({structureKey:key,engine,smiles:"",catalogVersion:ALERT_CATALOG_VERSION,status:"not-evaluable",reason,scannedPatterns:0,totalPatterns:alertPatterns.length,matches:[]});
  if(!graph.atoms.length)return unavailable("Draw or import a structure first.");
  if(graph.atoms.length>250)return unavailable("Structural alerts support up to 250 drawn atoms per structure in this release.");
  if(analyzeMolecule(graph).components!==1)return unavailable("Screen one connected structure. Salts and mixtures are not separated or normalized automatically.");
  const cancelled=()=>{if(options.signal?.aborted)throw new Error("Structural-alert analysis cancelled.");};
  cancelled();
  const mol=toolkitMol(rdkit,graph);
  try {
    const smiles=mol.get_smiles();
    const targetCount=mol.get_num_atoms();
    const matches:AlertMatch[]=[];
    for(let i=0;i<alertPatterns.length;i++) {
      if(i%24===0){cancelled();if(options.yieldTask)await options.yieldTask();}
      const pattern=alertPatterns[i], query=compileAlertQuery(rdkit,pattern.smarts);
      if(!query)throw new Error(`Alert pattern ${pattern.id} could not be compiled. No complete result was produced.`);
      try {
        const raw=JSON.parse(mol.get_substruct_matches(query,JSON.stringify({uniquify:true,maxMatches:128}))) as unknown;
        // MinimalLib returns {} for a valid query with no matches.
        if(raw&&typeof raw==="object"&&!Array.isArray(raw)&&Object.keys(raw).length===0)continue;
        if(!Array.isArray(raw))throw new Error(`Unexpected match response for ${pattern.id}.`);
        if(!raw.length)continue;
        const atoms=new Set<number>(),bonds=new Set<number>();
        for(const value of raw.slice(0,128)) {
          const match=value as {atoms?:number[];bonds?:number[]};
          if(!Array.isArray(match.atoms)||!Array.isArray(match.bonds))throw new Error("Invalid structural match mapping.");
          for(const index of match.atoms){if(!Number.isInteger(index)||index<0||index>=targetCount)throw new Error("Invalid matched atom index.");atoms.add(index);}
          for(const index of match.bonds)if(Number.isInteger(index)&&index>=0&&index<graph.bonds.length)bonds.add(index);
        }
        matches.push({patternId:pattern.id,atomIds:[...atoms].sort((a,b)=>a-b).map(i=>graph.atoms[i].id),bondIds:[...bonds].sort((a,b)=>a-b).map(i=>graph.bonds[i].id),occurrences:Math.min(raw.length,128),truncated:raw.length>=128});
      } finally {query.delete();}
    }
    cancelled();
    return {structureKey:key,engine,smiles,catalogVersion:ALERT_CATALOG_VERSION,status:"complete",reason:null,scannedPatterns:alertPatterns.length,totalPatterns:alertPatterns.length,matches};
  } finally {mol.delete();}
}

export function validateAlertResult(result:AlertResult,graph:Molecule) {
  if(!result||result.structureKey!==chemistryKey(graph)||result.catalogVersion!==ALERT_CATALOG_VERSION||result.totalPatterns!==585||typeof result.engine!=="string"||!result.engine||result.engine.length>100||typeof result.smiles!=="string"||result.smiles.length>20000||!Array.isArray(result.matches)||result.matches.length>585)throw new Error("Invalid structural-alert result provenance.");
  if(result.status==="not-evaluable") {
    if(result.scannedPatterns!==0||result.matches.length||typeof result.reason!=="string"||!result.reason||result.reason.length>1000)throw new Error("Invalid unavailable structural-alert result.");
    return;
  }
  if(result.status!=="complete"||result.scannedPatterns!==585||result.reason!==null||!result.smiles)throw new Error("Incomplete structural-alert result.");
  const ids=new Set<string>();
  for(const match of result.matches) {
    if(!alertPatterns.some(p=>p.id===match.patternId)||ids.has(match.patternId)||!Number.isInteger(match.occurrences)||match.occurrences<1||match.occurrences>128||typeof match.truncated!=="boolean"||(match.truncated&&match.occurrences!==128))throw new Error("Invalid structural-alert match.");
    ids.add(match.patternId);
    if(!Array.isArray(match.atomIds)||!match.atomIds.length||new Set(match.atomIds).size!==match.atomIds.length||match.atomIds.some(id=>!graph.atoms.some(a=>a.id===id))||!Array.isArray(match.bondIds)||new Set(match.bondIds).size!==match.bondIds.length||match.bondIds.some(id=>!graph.bonds.some(b=>b.id===id&&match.atomIds.includes(b.atomA)&&match.atomIds.includes(b.atomB))))throw new Error("Structural-alert mapping does not belong to its saved structure.");
  }
}
