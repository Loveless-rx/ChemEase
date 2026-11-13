import type { Molecule } from "../../models/Molecule";
import { chemistryKey } from "../../engine/toolkit";
import { analyzeMolecule } from "../../engine/analysis";

export const HEPATIC_METHOD = "hepatic-well-stirred-v1" as const;
export const HEPATIC_MODEL = "well-stirred-blood-lh-v1" as const;
export interface HepaticSettings {
  flow: number; fuBlood: number; intrinsic: number;
  flowSource: string; fuSource: string; intrinsicSource: string; context: string;
  evidence: "reported" | "scenario"; assumptionsConfirmed: boolean;
}
export interface HepaticResult {
  modelVersion: typeof HEPATIC_MODEL; structureKey: string; settings: HepaticSettings;
  status: "predicted" | "not-evaluable"; reasons: string[];
  clearance: number | null; extraction: number | null; hepaticAvailability: number | null;
}
export const hepaticSources = {
  experimental: "https://doi.org/10.1007/BF01059689",
  framework: "https://doi.org/10.1007/s10928-010-9187-8",
  regulatory: "https://www.ema.europa.eu/en/documents/other/annex-6-additional-supporting-documentation-system-parameters-compound-files_en.pdf",
};
export const hepaticEvidence = "The well-stirred model has experimental support from Pang & Rowland (1977), using lidocaine in perfused rat liver, and is used in mechanistic pharmacokinetic modeling. That evidence does not validate this compound, species or input set. No human external-test error or molecule-specific confidence interval is claimed.";
export const hepaticLimitations = "Conditional steady-state, linear well-stirred liver model. Inputs must use the same species/context and whole-liver basis: hepatic blood flow and unbound intrinsic clearance in L/h; fraction unbound in whole blood, not plasma. No automatic in-vitro scaling or plasma-to-blood conversion is performed. The drawing supplies identity only; parameters are entered, not predicted from structure. Assumes venous equilibrium, rapid mixing and no permeability/uptake limitation. Saturation, transporters, disease, drug interactions and time dependence are not modeled. Hepatic availability is the fraction escaping hepatic first pass only, not total oral bioavailability. Clearance is not total body clearance, half-life, toxicity, dose advice or a clinical decision. Sources are recorded but not certified. Experimental validation is needed for the intended use.";

export function validateHepaticSettings(s: HepaticSettings) {
  if (!s || !Number.isFinite(s.flow) || s.flow <= 0 || !Number.isFinite(s.intrinsic) || s.intrinsic < 0 || !Number.isFinite(s.fuBlood) || s.fuBlood < 0 || s.fuBlood > 1)
    throw new Error("Use flow > 0 L/h, unbound intrinsic clearance ≥ 0 L/h, and blood fraction unbound from 0 to 1.");
  for (const key of ["flowSource", "fuSource", "intrinsicSource", "context"] as const)
    if (typeof s[key] !== "string" || !s[key].trim() || s[key].length > 500) throw new Error("Provide each parameter source and the species/experimental context (up to 500 characters each).");
  if (!["reported", "scenario"].includes(s.evidence) || s.assumptionsConfirmed !== true)
    throw new Error("Confirm the blood basis, whole-liver units and model assumptions before calculating.");
}

/** Algebraically identical to Q*fu*CLint/(Q+fu*CLint), avoiding sum overflow and 1-E cancellation. */
export function calculateHepatic(flow: number, fuBlood: number, intrinsic: number) {
  if (!Number.isFinite(flow) || flow <= 0 || !Number.isFinite(fuBlood) || fuBlood < 0 || fuBlood > 1 || !Number.isFinite(intrinsic) || intrinsic < 0) throw new Error("Invalid hepatic model inputs.");
  if (fuBlood === 0 || intrinsic === 0) return { clearance: 0, extraction: 0, hepaticAvailability: 1 };
  const capacity = fuBlood * intrinsic;
  const ratio = Math.min(capacity, flow) / Math.max(capacity, flow);
  if (!Number.isFinite(capacity) || capacity <= 0 || ratio <= 0) throw new Error("The hepatic calculation exceeds supported numeric precision.");
  const extraction = capacity <= flow ? ratio / (1 + ratio) : 1 / (1 + ratio);
  const hepaticAvailability = capacity <= flow ? 1 / (1 + ratio) : ratio / (1 + ratio);
  const clearance = flow * extraction;
  if (![extraction, hepaticAvailability, clearance].every(Number.isFinite) || clearance <= 0) throw new Error("The hepatic calculation exceeds supported numeric precision.");
  return { clearance, extraction, hepaticAvailability };
}

export function predictHepatic(graph: Molecule, settings: HepaticSettings): HepaticResult {
  validateHepaticSettings(settings);
  const normalized = { ...settings };
  for (const key of ["flowSource", "fuSource", "intrinsicSource", "context"] as const) normalized[key] = settings[key].trim();
  const base = { modelVersion: HEPATIC_MODEL, structureKey: chemistryKey(graph), settings: normalized };
  const reasons: string[] = [];
  if (!graph.atoms.length || analyzeMolecule(graph).components !== 1) reasons.push("Attach the inputs to one connected compound. Mixtures/salts are not assigned a parent automatically.");
  if (!reasons.length) {
    try { return { ...base, status: "predicted", reasons: [], ...calculateHepatic(settings.flow, settings.fuBlood, settings.intrinsic) }; }
    catch (e) { reasons.push((e as Error).message); }
  }
  return { ...base, status: "not-evaluable", reasons, clearance: null, extraction: null, hepaticAvailability: null };
}

export function hepaticRows(p: HepaticResult): [string, string][] {
  return [["Hepatic model", p.modelVersion], ["Hepatic status", p.status], ["Hepatic exclusion reasons", p.reasons.join("; ")],
    ["Species / experimental context", p.settings.context], ["Input evidence", p.settings.evidence],
    ["Hepatic blood flow (L/h)", String(p.settings.flow)], ["Blood-flow source", p.settings.flowSource],
    ["Fraction unbound in whole blood", String(p.settings.fuBlood)], ["Unbound-fraction source", p.settings.fuSource],
    ["Unbound whole-liver intrinsic clearance (L/h)", String(p.settings.intrinsic)], ["Intrinsic-clearance source", p.settings.intrinsicSource],
    ["Blood basis and assumptions confirmed", String(p.settings.assumptionsConfirmed)],
    ["Predicted hepatic blood clearance (L/h)", p.clearance === null ? "Not evaluable" : String(p.clearance)],
    ["Hepatic extraction ratio", p.extraction === null ? "Not evaluable" : String(p.extraction)],
    ["Fraction escaping hepatic first pass (FH)", p.hepaticAvailability === null ? "Not evaluable" : String(p.hepaticAvailability)],
    ["Hepatic model evidence", hepaticEvidence], ["Hepatic interpretation", hepaticLimitations]];
}
