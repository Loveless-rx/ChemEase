import type { Molecule } from "../../models/Molecule";
import type { BoundToolkitResult } from "../workspace/descriptorCache";
import { chemistryKey } from "../../engine/toolkit";
import { analyzeMolecule } from "../../engine/analysis";
export const SKIN_METHOD="skin-pg-cdc-v1" as const;
export const SKIN_MODEL="potts-guy-niosh-cmh-v1" as const;
export interface SkinSettings {logKow:number;source:string;evidence:"reported"|"estimate"}
export interface SkinResult {modelVersion:typeof SKIN_MODEL;structureKey:string;engine:string;settings:SkinSettings;weight:number;status:"predicted"|"not-evaluable";reasons:string[];logKpCmHour:number|null;kpCmHour:number|null;kpCmSecond:number|null;contributions:{intercept:number;lipophilicity:number;size:number}|null}
export const skinCoefficients={intercept:-2.74,logKow:.71,weight:-.0061} as const;
export const skinBounds={weight:[18,750],logKow:[-3,6]} as const;
export const skinSources={paper:"https://doi.org/10.1023/A:1015810312465",niosh:"https://www.cdc.gov/niosh/skin-exposure/resources/skin-permeation-calculator.html",calculator:"https://ftp.cdc.gov/pub/niosh/skin/SkinPerm.jar",evaluation:"https://doi.org/10.1002/jps.21074"} as const;
export const skinLimitations="This is an aqueous-vehicle skin permeability coefficient, not a percentage absorbed, dose, exposure limit or safety assessment. The Potts–Guy relationship does not model formulation, damaged skin, ionization/pH, exposure duration, transporters or clinical outcomes. Input LogKow is a user-sourced neutral-species value; its accuracy is not certified. Estimated inputs add uncertainty. The model supplies no molecule-specific confidence interval. Bounds are reference-range guards, not proof of a validated applicability domain. Experimental confirmation is needed.";
export function validateSkinSettings(value:SkinSettings){if(!value||!Number.isFinite(value.logKow)||typeof value.source!=="string"||!value.source.trim()||value.source.length>500||!["reported","estimate"].includes(value.evidence))throw new Error("Enter a finite neutral-species LogKow and its source (up to 500 characters).");}
export function calculateSkin(weight:number,logKow:number){
  if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(logKow))throw new Error("Valid molecular weight and LogKow are required.");
  const contributions={intercept:skinCoefficients.intercept,lipophilicity:skinCoefficients.logKow*logKow,size:skinCoefficients.weight*weight};
  const logKpCmHour=contributions.intercept+contributions.lipophilicity+contributions.size,kpCmHour=10**logKpCmHour,kpCmSecond=kpCmHour/3600;
  if(![logKpCmHour,kpCmHour,kpCmSecond].every(Number.isFinite)||kpCmHour<=0||kpCmSecond<=0)throw new Error("Skin prediction exceeds supported numeric precision.");
  return {contributions,logKpCmHour,kpCmHour,kpCmSecond};
}
export function predictSkin(graph:Molecule,descriptors:BoundToolkitResult,settings:SkinSettings):SkinResult {
  validateSkinSettings(settings);const key=chemistryKey(graph);if(key!==descriptors.structureKey)throw new Error("The skin-permeability descriptors belong to another structure.");
  const reasons:string[]=[];
  if(descriptors.engine!=="RDKit 2026.09.2")reasons.push("This implementation is checked with RDKit 2026.09.2 molecular weights only.");
  if(!graph.atoms.length||analyzeMolecule(graph).components!==1)reasons.push("Use one connected molecule. Salts and mixtures are not normalized automatically.");
  if(!graph.atoms.some(a=>a.element==="C"))reasons.push("This release supports carbon-containing organic compounds.");
  if(graph.atoms.some(a=>a.charge!==0))reasons.push("Use a neutral structure and neutral-species LogKow; ions and zwitterions are not evaluated.");
  const supported=new Set(["H","B","C","N","O","F","P","S","Cl","Br","I"]);
  if(graph.atoms.some(a=>!supported.has(a.element)||a.isotope!==undefined||a.stereo)||graph.bonds.some(b=>b.stereo))reasons.push("Metals, isotope labels, unspecified atoms and unsupported stereo are outside this release.");
  if(!Number.isFinite(descriptors.weight)||descriptors.weight<skinBounds.weight[0]||descriptors.weight>skinBounds.weight[1])reasons.push("Molecular weight is outside the 18–750 g/mol reference-range guard.");
  if(settings.logKow<skinBounds.logKow[0]||settings.logKow>skinBounds.logKow[1])reasons.push("LogKow is outside the -3 to 6 reference-range guard.");
  const base={modelVersion:SKIN_MODEL,structureKey:key,engine:descriptors.engine,settings:{...settings,source:settings.source.trim()},weight:descriptors.weight};
  return reasons.length?{...base,status:"not-evaluable",reasons,logKpCmHour:null,kpCmHour:null,kpCmSecond:null,contributions:null}:{...base,status:"predicted",reasons:[],...calculateSkin(descriptors.weight,settings.logKow)};
}
