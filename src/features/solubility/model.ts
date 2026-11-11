import type { Molecule } from "../../models/Molecule";
import type { BoundToolkitResult } from "../workspace/descriptorCache";
import { chemistryKey } from "../../engine/toolkit";
import { analyzeMolecule } from "../../engine/analysis";
export const SOLUBILITY_METHOD="esol-rdkit-v1" as const;
export const ESOL_VERSION="walters-d1536c58-rdkit-2026.09.2-v1" as const;
export const esolCoefficients={intercept:0.26121066137801696,weight:-0.0066138847738667125,logP:-0.7416739523408995,rotatable:0.003451545565957996,aromaticProportion:-0.42624840441316975} as const;
export const esolReferenceRanges={weight:[16.043,780.9490000000001],logP:[-7.571399999999989,10.388599999999993],rotatable:[0,23],aromaticProportion:[0,1]} as const;
export const esolValidation={version:"dls56-rdkit-2026.09.2-v1",count:56,rmse:1.0295186294607326,mae:0.8219761655050376,bias:-0.018255540594854545,roundedReferenceMaxDifference:0.004971432921154761,overlap:0,trainingCount:1144} as const;
export const esolSources={paper:"https://doi.org/10.1021/ci034243x",implementation:"https://github.com/PatWalters/solubility/blob/d1536c58afe5e0e7ac4c96e2ffef496d5b98664b/esol.py",validation:"https://doi.org/10.17630/3a3a5abc-8458-4924-8e6c-b804347605e8"} as const;
export interface SolubilityInputs {weight:number;logP:number;rotatable:number;aromaticProportion:number}
export interface SolubilityResult {modelVersion:typeof ESOL_VERSION;validationVersion:typeof esolValidation.version;structureKey:string;engine:string;status:"predicted"|"not-evaluable";reasons:string[];inputs:SolubilityInputs|null;contributions:{intercept:number;weight:number;logP:number;rotatable:number;aromaticProportion:number}|null;logS:number|null;molPerL:number|null;gPerL:number|null;rangeCheck:"within-reference-ranges"|"outside-reference-ranges"|"not-checked"}
/** Frozen published RDKit refit, not the original Daylight-coefficient equation. */
export function calculateESOL(inputs:SolubilityInputs) {
  for(const key of Object.keys(esolReferenceRanges) as (keyof SolubilityInputs)[])if(!Number.isFinite(inputs[key]))throw new Error("ESOL inputs must be finite.");
  if(inputs.weight<=0||!Number.isSafeInteger(inputs.rotatable)||inputs.rotatable<0||inputs.aromaticProportion<0||inputs.aromaticProportion>1)throw new Error("Invalid ESOL input range or count.");
  const contributions={intercept:esolCoefficients.intercept,weight:esolCoefficients.weight*inputs.weight,logP:esolCoefficients.logP*inputs.logP,rotatable:esolCoefficients.rotatable*inputs.rotatable,aromaticProportion:esolCoefficients.aromaticProportion*inputs.aromaticProportion};
  const logS=contributions.intercept+contributions.logP+contributions.weight+contributions.rotatable+contributions.aromaticProportion,molPerL=10**logS,gPerL=molPerL*inputs.weight;
  if(![logS,molPerL,gPerL].every(Number.isFinite)||molPerL===0||gPerL===0)throw new Error("ESOL result exceeds supported numeric precision.");
  return {contributions,logS,molPerL,gPerL};
}
export function predictSolubility(graph:Molecule,descriptors:BoundToolkitResult):SolubilityResult {
  const key=chemistryKey(graph);if(descriptors.structureKey!==key)throw new Error("The solubility descriptors belong to a different structure.");
  const reasons:string[]=[];
  if(descriptors.engine!=="RDKit 2026.09.2")reasons.push("This model is verified only with RDKit 2026.09.2.");
  if(!graph.atoms.length||analyzeMolecule(graph).components!==1)reasons.push("Use one connected molecule. Salts and mixtures are not separated automatically.");
  if(!graph.atoms.some(a=>a.element==="C"))reasons.push("This release supports carbon-containing organic structures.");
  if(graph.atoms.some(a=>a.charge!==0))reasons.push("Charged structures and zwitterions are outside this release; no neutralization is performed.");
  const allowed=new Set(["H","B","C","N","O","F","P","S","Cl","Br","I"]);
  if(graph.atoms.some(a=>!allowed.has(a.element)||a.isotope!==undefined))reasons.push("Metals, unspecified atoms and isotope-labelled structures are outside this release.");
  if(graph.atoms.some(a=>a.stereo)||graph.bonds.some(b=>b.stereo))reasons.push("The editor does not yet preserve stereo annotations faithfully.");
  const heavy=graph.atoms.filter(a=>a.element!=="H").length,aromatic=graph.atoms.filter(a=>a.element!=="H"&&a.aromatic).length;
  const inputs:SolubilityInputs={weight:descriptors.weight,logP:descriptors.logP,rotatable:descriptors.rotatable,aromaticProportion:aromatic/heavy};
  if(!heavy||heavy!==descriptors.heavyAtoms||Object.values(inputs).some(v=>!Number.isFinite(v)))reasons.push("Complete, consistent shared descriptors are required.");
  const base={modelVersion:ESOL_VERSION,validationVersion:esolValidation.version,structureKey:key,engine:descriptors.engine};
  if(reasons.length)return {...base,status:"not-evaluable",reasons,inputs:null,contributions:null,logS:null,molPerL:null,gPerL:null,rangeCheck:"not-checked"};
  const outside=(Object.keys(esolReferenceRanges) as (keyof SolubilityInputs)[]).filter(k=>inputs[k]<esolReferenceRanges[k][0]-1e-10||inputs[k]>esolReferenceRanges[k][1]+1e-10);
  if(outside.length)return {...base,status:"not-evaluable",reasons:[`Outside the 1,144-structure reference descriptor ranges: ${outside.join(", ")}.`],inputs,contributions:null,logS:null,molPerL:null,gPerL:null,rangeCheck:"outside-reference-ranges"};
  return {...base,status:"predicted",reasons:[],inputs,...calculateESOL(inputs),rangeCheck:"within-reference-ranges"};
}
export const solubilityLimitations="ESOL predicts aqueous log10 solubility in mol/L from four descriptors. This is the Walters RDKit refit, not the original Daylight model. No pH, temperature, solid form, salt form, formulation or miscibility adjustment is made. A reference-range check is not a validated molecule-specific applicability domain. The external-test error is aggregate performance, not a confidence interval for this molecule. Experimental measurement is needed for decisions; this is not a safety or efficacy prediction.";
