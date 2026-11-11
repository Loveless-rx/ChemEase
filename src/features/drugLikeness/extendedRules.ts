import type { Molecule } from "../../models/Molecule";
import { analyzeMolecule } from "../../engine/analysis";
import type { BoundToolkitResult } from "../workspace/descriptorCache";
import { screenDrugLikeness, ruleMethods, type Criterion, type RuleResult, type DrugLikenessResult, type RuleStatus } from "./rules";

export const EXTENDED_METHOD="drug-likeness-v2" as const;
export const EXTENDED_RULES_VERSION="five-filters-crippen-v2" as const;
export type ExtendedRuleId=RuleResult["id"]|"ghose"|"egan"|"muegge";
export type ExtendedCriterion=Omit<Criterion,"input"|"maximum"> & {input:string;minimum?:number;maximum?:number};
export interface ExtendedRuleResult {id:ExtendedRuleId;status:RuleStatus;violations:number|null;criteria:ExtendedCriterion[]}
export interface ExtendedScreening {rulesVersion:typeof EXTENDED_RULES_VERSION;reasons:string[];rules:ExtendedRuleResult[]}
export type AnyScreening=DrugLikenessResult|ExtendedScreening;
export const allRuleMethods={...ruleMethods,
  ghose:{name:"Ghose · RDKit variant",description:"MW 160–480 g/mol; LogP −0.4–5.6; molar refractivity 40–130 cm³/mol; total atoms 20–70, including hydrogens. All four ranges are inclusive.",implementation:"Uses Wildman–Crippen LogP and molar refractivity, plus the validated graph’s total atom count. This property-range implementation does not reproduce the original ALOGP/AMR software or add its functional-group classifications.",source:"Ghose, Viswanadhan & Wendoloski (1999)",url:"https://doi.org/10.1021/cc9800071",allowedViolations:0},
  egan:{name:"Egan · WLOGP threshold variant",description:"Wildman–Crippen LogP ≤ 5.88 and TPSA ≤ 131.6 Å². Both criteria must meet their limits.",implementation:"The transparent rectangular threshold variant uses WLOGP in place of the original ALOGP98 model. It is not the original multivariate Egan ellipse and does not predict a human absorption percentage.",source:"Egan, Merz & Baldwin (2000); SwissADME implementation notes",url:"https://doi.org/10.1021/jm000292e",allowedViolations:0},
  muegge:{name:"Muegge · Crippen variant",description:"MW 200–600; LogP −2–5; TPSA ≤ 150; rings ≤ 7; carbon atoms ≥ 5; heteroatoms ≥ 2; rotatable bonds ≤ 15; HBA ≤ 10; HBD ≤ 5.",implementation:"This explicitly adapted property filter uses RDKit Wildman–Crippen LogP, not XLOGP3. It does not reproduce the original pharmacophore-point classification. Ring, donor, acceptor and flexibility definitions are those of the shared RDKit engine. Outcomes can differ from XLOGP-based tools.",source:"Muegge, Heald & Brittelli (2001); adapted property ranges",url:"https://doi.org/10.1021/jm015507e",allowedViolations:0},
} as const;

type Range={input:string;label:string;minimum?:number;maximum?:number;unit?:string;count?:boolean};
export const extendedRanges:Record<"ghose"|"egan"|"muegge",Range[]>={
  ghose:[{input:"weight",label:"Molecular weight",minimum:160,maximum:480,unit:"g/mol"},{input:"logP",label:"LogP · Wildman–Crippen",minimum:-.4,maximum:5.6},{input:"molarRefractivity",label:"Molar refractivity",minimum:40,maximum:130,unit:"cm³/mol"},{input:"totalAtoms",label:"Total atoms · including H",minimum:20,maximum:70,count:true}],
  egan:[{input:"logP",label:"LogP · Wildman–Crippen",maximum:5.88},{input:"tpsa",label:"TPSA",maximum:131.6,unit:"Å²"}],
  muegge:[{input:"weight",label:"Molecular weight",minimum:200,maximum:600,unit:"g/mol"},{input:"logP",label:"LogP · Crippen, not XLOGP3",minimum:-2,maximum:5},{input:"tpsa",label:"TPSA",maximum:150,unit:"Å²"},{input:"rings",label:"Ring count · RDKit",maximum:7,count:true},{input:"carbons",label:"Carbon atoms (> 4)",minimum:5,count:true},{input:"heteroAtoms",label:"Heteroatoms · excluding C/H (> 1)",minimum:2,count:true},{input:"rotatable",label:"Rotatable bonds · strict",maximum:15,count:true},{input:"acceptors",label:"Hydrogen bond acceptors",maximum:10,count:true},{input:"donors",label:"Hydrogen bond donors",maximum:5,count:true}],
};

export function evaluateExtendedRanges(inputs:Record<string,number|undefined>,reasons:string[]=[]) {
  return (["ghose","egan","muegge"] as const).map(id=>{
    const criteria:ExtendedCriterion[]=extendedRanges[id].map(range=>{
      const raw=inputs[range.input];
      const valid=typeof raw==="number"&&Number.isFinite(raw)&&(range.input==="logP"||raw>=0)&&(!range.count||Number.isSafeInteger(raw))&&(range.input!=="weight"||raw>0);
      const value=valid?raw:null;
      const violation=value!==null&&(value< (range.minimum??-Infinity)||value>(range.maximum??Infinity));
      return {input:range.input,label:range.label,minimum:range.minimum,maximum:range.maximum,unit:range.unit??"",value,status:reasons.length||value===null?"not-evaluable":violation?"violation":"within-limit"};
    });
    const violations=criteria.some(c=>c.status==="not-evaluable")?null:criteria.filter(c=>c.status==="violation").length;
    return {id,criteria,violations,status:violations===null?"not-evaluable":violations?"outside-guideline":"within-guideline"} satisfies ExtendedRuleResult;
  });
}
export function screenExtendedDrugLikeness(graph:Molecule,descriptors?:BoundToolkitResult):ExtendedScreening {
  const base=screenDrugLikeness(graph,descriptors), local=analyzeMolecule(graph);
  const inputs={weight:descriptors?.weight,logP:descriptors?.logP,tpsa:descriptors?.tpsa,molarRefractivity:descriptors?.molarRefractivity,rings:descriptors?.rings,rotatable:descriptors?.rotatable,donors:descriptors?.donors,acceptors:descriptors?.acceptors,totalAtoms:local.totalAtoms,carbons:graph.atoms.filter(a=>a.element==="C").length,heteroAtoms:graph.atoms.filter(a=>a.element!=="C"&&a.element!=="H").length};
  return {rulesVersion:EXTENDED_RULES_VERSION,reasons:base.reasons,rules:[...base.rules,...evaluateExtendedRanges(inputs,base.reasons)]};
}
export function criterionLimit(c:ExtendedCriterion) {
  if((c.input==="carbons"||c.input==="heteroAtoms")&&c.minimum!==undefined) return `≥ ${c.minimum}`;
  return c.minimum===undefined?`≤ ${c.maximum} ${c.unit}`:`${c.minimum}–${c.maximum} ${c.unit}`;
}
export function extendedCriterionValue(c:ExtendedCriterion) {
  if(c.value===null)return "Not available";
  const rounded=Number(c.value.toFixed(3)),violates=(v:number)=>v>(c.maximum??Infinity)||(c.minimum!==undefined&&v<c.minimum);
  return String(violates(rounded)!==violates(c.value)?c.value:rounded);
}
