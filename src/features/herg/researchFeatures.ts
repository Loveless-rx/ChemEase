import type { MainModule } from '@rdkit/rdkit';
import { browserFragmentFeatures, historicalAcceptorCount } from './browserFragments';
import { estateFeatures } from './estateFeatures';
import { topologyFeatures } from './topologyFeatures';
import { historicalQed } from './qedFeatures';
import { buildHergGraph } from './graphFeatures';

const aliases: Record<string, string> = {
  MolWt: 'amw', MolLogP: 'CrippenClogP', MolMR: 'CrippenMR', TPSA: 'tpsa',
  LabuteASA: 'labuteASA', HeavyAtomCount: 'NumHeavyAtoms', NHOHCount: 'lipinskiHBD',
  NOCount: 'lipinskiHBA', ExactMolWt: 'exactmw', NumHDonors: 'NumHBD', RingCount: 'NumRings',
};

/** Research-only pipeline. Requires the pinned extended historical WASM.
 * No fallback to the application's newer chemistry runtime is allowed.
 */
export function researchHergFeatures(rdkit: MainModule, smiles: string, columns: string[]) {
  if (!rdkit.version().startsWith('2023.03.3')) throw new Error('Wrong hERG chemistry runtime.');
  const mol = rdkit.get_mol(smiles);
  if (!mol) throw new Error('Cannot parse hERG structure.');
  let source: Record<string, unknown>, original: Record<string, unknown>, canonical: string;
  try { canonical = mol.get_smiles(); original = JSON.parse(mol.get_descriptors()); } finally { mol.delete(); }
  // ADMET-AI passes Mol objects to chemfunc: descriptors use canonical isomeric
  // SMILES, while Chemprop builds its graph from the supplied input SMILES.
  const canonicalMol = rdkit.get_mol(canonical);
  if (!canonicalMol) throw new Error('Cannot canonicalize hERG structure.');
  try { source = JSON.parse(canonicalMol.get_descriptors()); } finally { canonicalMol.delete(); }
  const atoms = source.hergAtomInputs as (number | boolean)[][];
  const bonds = source.hergBondInputs as (number | boolean)[][];
  const areas = source.hergAtomAreas as number[];
  if (!Array.isArray(atoms) || !Array.isArray(bonds) || !Array.isArray(areas)) throw new Error('Historical hERG bindings unavailable.');
  const lookup = Object.fromEntries(Object.entries(source).map(([k, v]) => [k.toLowerCase(), v]));
  const named: Record<string, number> = {};
  for (const name of [...columns, 'hergQEDAROM']) {
    const value = lookup[(aliases[name] ?? name).toLowerCase()];
    if (typeof value === 'number' && Number.isFinite(value)) named[name] = value;
  }
  Object.assign(named, browserFragmentFeatures(rdkit, canonical), estateFeatures(atoms, bonds, areas), topologyFeatures(atoms, bonds));
  named.NumHAcceptors = historicalAcceptorCount(rdkit, canonical);
  named.qed = historicalQed(rdkit, canonical, named);
  const missing = columns.filter(name => !Number.isFinite(named[name]));
  if (missing.length) throw new Error(`Missing historical descriptors: ${missing.join(', ')}`);
  return { canonical, raw: columns.map(name => named[name]), named, graph: buildHergGraph(original.hergAtomInputs as (number | boolean)[][], original.hergBondInputs as (number | boolean)[][]), atoms, bonds, areas };
}
