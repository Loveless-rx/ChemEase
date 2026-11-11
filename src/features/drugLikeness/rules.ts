import type { Molecule } from "../../models/Molecule";
import { analyzeMolecule } from "../../engine/analysis";
import { chemistryKey } from "../../engine/toolkit";
import type { BoundToolkitResult } from "../workspace/descriptorCache";

export const SCREENING_METHOD = "drug-likeness-v1" as const;
export const RULES_VERSION = "lipinski-veber-rdkit-v1" as const;
export type RuleStatus = "within-guideline" | "outside-guideline" | "not-evaluable";
export const statusLabels:Record<RuleStatus,string>={
  "within-guideline":"Within guideline",
  "outside-guideline":"Outside guideline",
  "not-evaluable":"Not evaluable",
};
export type CriterionStatus = "within-limit" | "violation" | "not-evaluable";
export type RuleInput = "weight" | "logP" | "donors" | "acceptors" | "rotatable" | "tpsa";
export interface Criterion {
  input: RuleInput;
  label: string;
  value: number | null;
  maximum: number;
  unit: string;
  status: CriterionStatus;
}
export interface RuleResult {
  id: "lipinski" | "veber";
  status: RuleStatus;
  violations: number | null;
  criteria: Criterion[];
}
export interface DrugLikenessResult {
  rulesVersion: typeof RULES_VERSION;
  reasons: string[];
  rules: RuleResult[];
}
export const ruleMethods = {
  lipinski: {
    name: "Lipinski Rule of Five",
    description: "MW ≤ 500 g/mol, calculated LogP ≤ 5, HBD ≤ 5 and HBA ≤ 10. This implementation flags the guideline when more than one criterion is violated; every individual violation remains visible.",
    implementation: "Uses the existing RDKit Wildman–Crippen LogP, NumHBD and NumHBA descriptors. This is an operational RDKit implementation, not a reproduction of the original CLogP/MLogP software or SwissADME’s MLOGP variant.",
    source: "Lipinski et al., Advanced Drug Delivery Reviews (1997)",
    url: "https://doi.org/10.1016/S0169-409X(96)00423-1",
    allowedViolations: 1,
  },
  veber: {
    name: "Veber · TPSA variant",
    description: "Rotatable bonds ≤ 10 and TPSA ≤ 140 Å². Both criteria must be within their limits. The alternative donor-plus-acceptor criterion from the paper is not applied in this variant.",
    implementation: "Uses RDKit topological PSA and the existing strict rotatable-bond definition (which excludes bonds such as amide and ester bonds). This does not reproduce every PSA or flexibility calculation used in the original rat study.",
    source: "Veber et al., Journal of Medicinal Chemistry (2002)",
    url: "https://doi.org/10.1021/jm020017n",
    allowedViolations: 0,
  },
} as const;

const criteriaDefinitions: Record<RuleInput, {label:string;maximum:number;unit:string;count?:boolean}> = {
  weight: {label:"Molecular weight", maximum:500, unit:"g/mol"},
  logP: {label:"LogP · Wildman–Crippen", maximum:5, unit:""},
  donors: {label:"Hydrogen bond donors", maximum:5, unit:"", count:true},
  acceptors: {label:"Hydrogen bond acceptors", maximum:10, unit:"", count:true},
  rotatable: {label:"Rotatable bonds · strict", maximum:10, unit:"", count:true},
  tpsa: {label:"TPSA", maximum:140, unit:"Å²"},
};

/** Pure threshold engine: no chemistry computation or storage access. */
export function evaluateRules(inputs: Partial<Record<RuleInput, number | null>>, reasons: string[] = []): DrugLikenessResult {
  const criterion = (input:RuleInput):Criterion => {
    const definition = criteriaDefinitions[input], raw = inputs[input];
    const valid = typeof raw === "number" && Number.isFinite(raw)
      && (input === "logP" || raw >= 0) && (input !== "weight" || raw > 0)
      && (!definition.count || Number.isSafeInteger(raw));
    const value = valid ? raw : null;
    return {input,label:definition.label,value,maximum:definition.maximum,unit:definition.unit,
      status: reasons.length || value === null ? "not-evaluable" : value > definition.maximum ? "violation" : "within-limit"};
  };
  const rule = (id:RuleResult["id"], inputs:RuleInput[]):RuleResult => {
    const criteria = inputs.map(criterion);
    const complete = criteria.every(c=>c.status!=="not-evaluable");
    const violations = complete ? criteria.filter(c=>c.status==="violation").length : null;
    return {id,criteria,violations,status:violations===null?"not-evaluable":violations>ruleMethods[id].allowedViolations?"outside-guideline":"within-guideline"};
  };
  return {rulesVersion:RULES_VERSION,reasons:[...reasons],rules:[rule("lipinski",["weight","logP","donors","acceptors"]),rule("veber",["rotatable","tpsa"])]};
}

export function screenDrugLikeness(graph:Molecule, descriptors?:BoundToolkitResult):DrugLikenessResult {
  const reasons:string[]=[];
  if (!graph.atoms.length) reasons.push("Draw or import a molecule to begin screening.");
  else {
    if(analyzeMolecule(graph).components!==1) reasons.push("Screen one connected molecule. Salts and mixtures are not evaluated; no fragment is removed automatically.");
    if(graph.atoms.some(a=>a.charge!==0)) reasons.push("This first screening release supports neutral structures. Charged molecules and zwitterions are not evaluated or neutralized automatically.");
    if(!graph.atoms.some(a=>a.element==="C")) reasons.push("These filters are intended for organic small molecules. Carbon-free structures are outside this implementation’s scope.");
  }
  if(!descriptors) reasons.push("A completed, validated RDKit descriptor calculation is required.");
  if(descriptors && descriptors.structureKey!==chemistryKey(graph)) throw new Error("The screening descriptors belong to a different structure. Recalculate this molecule.");
  return evaluateRules(descriptors??{},reasons);
}

export function criterionValue(c:Criterion) {
  if(c.value===null) return "Not available";
  const rounded=Number(c.value.toFixed(3));
  // Never round a violation back onto the permitted boundary in the display.
  return String((rounded>c.maximum)!==(c.value>c.maximum)?c.value:rounded);
}
