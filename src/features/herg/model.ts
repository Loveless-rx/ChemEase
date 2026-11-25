import type { Molecule } from '../../models/Molecule';
export const HERG_MODEL = 'admet-ai-1.4.0-herg-browser-v1';
export const HERG_SOURCE = '9c8430862b2afd997ff1d314b30bda4418fa9b33';
export const hergSources = { paper: 'https://doi.org/10.1093/bioinformatics/btae416', code: `https://github.com/swansonk14/admet_ai/tree/${HERG_SOURCE}`, endpoint: 'https://tdcommons.ai/single_pred_tasks/tox/#herg-blockers' };
export const hergLimitations = 'Research model score for the hERG blocker class, not an IC50, clinical risk, calibrated confidence or proof of safety. Browser conversion was compared with native inference on 78 structures; this is implementation verification, not an independent accuracy benchmark. Published benchmark models and these full-data production checkpoints have different training roles; no benchmark AUROC is assigned to an individual prediction. No automatic protonation, neutralization or salt removal is performed. Conservative input guards are not a validated applicability domain.';
export interface HergResult {
  modelVersion: typeof HERG_MODEL; sourceCommit: typeof HERG_SOURCE;
  chemistry: 'RDKit 2023.03.3'; preprocessing: 'chemprop-1.6.1-rdkit2dnormalized-200';
  structureKey: string; inputSmiles: string; canonicalSmiles: string;
  raw: number[]; normalized: number[]; members: number[]; score: number;
  status: 'predicted';
}
export function hergInputReasons(graph: Molecule): string[] {
  const reasons: string[] = [];
  if (graph.atoms.length < 2 || graph.atoms.length > 80) reasons.push('Use a small molecule with 2–80 atoms for this initial release.');
  if (graph.atoms.some(a => !['B','C','N','O','F','P','S','Cl','Br','I'].includes(a.element))) reasons.push('Unsupported elements or explicit hydrogen atoms.');
  if (graph.atoms.some(a => a.charge !== 0)) reasons.push('Charged structures are outside this release’s supported input set. Review the chemical state; it will not be changed automatically.');
  if (graph.atoms.some(a => a.isotope || a.stereo) || graph.bonds.some(b => b.stereo)) reasons.push('Isotope labels and editor stereo annotations are not supported.');
  if (graph.atoms.length) {
    const seen = new Set([graph.atoms[0].id]);
    for (let i = 0; i < graph.atoms.length; i++) for (const b of graph.bonds) {
      if (seen.has(b.atomA)) seen.add(b.atomB); if (seen.has(b.atomB)) seen.add(b.atomA);
    }
    if (seen.size !== graph.atoms.length) reasons.push('Use a single connected compound; mixtures and salts are not automatically stripped.');
  }
  return reasons;
}
export function validateHergResult(value: HergResult, structureKey: string) {
  if (!value || value.modelVersion !== HERG_MODEL || value.sourceCommit !== HERG_SOURCE || value.chemistry !== 'RDKit 2023.03.3' || value.preprocessing !== 'chemprop-1.6.1-rdkit2dnormalized-200' || value.status !== 'predicted' || value.structureKey !== structureKey) throw new Error('Invalid hERG model or structure provenance.');
  for (const s of [value.inputSmiles, value.canonicalSmiles]) if (typeof s !== 'string' || !s || s.length > 4000) throw new Error('Invalid hERG structure input.');
  for (const [values, size, bounded] of [[value.raw, 200, false], [value.normalized, 200, true], [value.members, 5, true]] as const) {
    if (!Array.isArray(values) || values.length !== size || values.some(x => typeof x !== 'number' || !Number.isFinite(x) || (bounded && (x < 0 || x > 1)))) throw new Error('Invalid hERG recorded features or member scores.');
  }
  const mean = value.members.reduce((a, b) => a + b, 0) / 5;
  if (!Number.isFinite(value.score) || Math.abs(mean - value.score) > 1e-12) throw new Error('Invalid hERG ensemble mean.');
}
export function hergRows(p: HergResult): [string, string][] {
  return [['hERG blocker-class score (0–1)', String(p.score)], ['hERG ensemble member scores', p.members.join('; ')], ['hERG model / source commit', `${p.modelVersion} / ${p.sourceCommit}`], ['hERG chemistry / preprocessing', `${p.chemistry} / ${p.preprocessing}`], ['hERG input SMILES', p.inputSmiles], ['hERG canonical descriptor SMILES', p.canonicalSmiles], ['hERG interpretation and evidence', hergLimitations]];
}
