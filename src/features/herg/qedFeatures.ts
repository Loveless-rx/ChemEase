import type { MainModule } from '@rdkit/rdkit';
import { qedParameters } from './qedParameters';

/** Historical QED implementation. AROM must come from deletion + SSSR,
 * not the ordinary aromatic-ring descriptor. See vendor/herg/QED_LICENSE.txt.
 */
export function historicalQed(rdkit: MainModule, smiles: string, descriptors: Record<string, number>): number {
  const mol = rdkit.get_mol(smiles);
  if (!mol) throw new Error('Cannot parse QED structure.');
  try {
    const count = (smarts: string) => {
      const query = rdkit.get_qmol(smarts);
      if (!query) throw new Error('Historical QED query unavailable.');
      try {
        const matches: unknown = JSON.parse(mol.get_substruct_matches(query));
        if (!Array.isArray(matches)) return 0;
        if (matches.length >= 1000) throw new Error('QED substructure match limit reached.');
        return matches.length;
      } finally { query.delete(); }
    };
    const values = {
      MW: descriptors.MolWt, ALOGP: descriptors.MolLogP,
      HBA: qedParameters.acceptors.reduce((sum, pattern) => sum + count(pattern), 0),
      HBD: descriptors.NumHDonors, PSA: descriptors.TPSA,
      ROTB: descriptors.NumRotatableBonds, AROM: descriptors.hergQEDAROM,
      ALERTS: qedParameters.alerts.reduce((sum, pattern) => sum + (count(pattern) ? 1 : 0), 0),
    };
    let sum = 0, weight = 0;
    for (const name of Object.keys(values) as (keyof typeof values)[]) {
      const x = values[name], p = qedParameters.ads[name], w = qedParameters.weights[name];
      if (!Number.isFinite(x)) throw new Error(`Missing QED input: ${name}`);
      const exp1 = 1 + Math.exp(-(x - p.C + p.D / 2) / p.E);
      const exp2 = 1 + Math.exp(-(x - p.C - p.D / 2) / p.F);
      const d = (p.A + p.B / exp1 * (1 - 1 / exp2)) / p.DMAX;
      sum += w * Math.log(d); weight += w;
    }
    return Math.exp(sum / weight);
  } finally { mol.delete(); }
}
