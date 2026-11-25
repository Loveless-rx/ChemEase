import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import initRDKit from '@rdkit/rdkit';
import { historicalQed } from '../src/features/herg/qedFeatures';

test('Historical QED matches native fixtures with explicit historical property inputs', async () => {
  const rdkit = await initRDKit();
  const rows = JSON.parse(readFileSync('vendor/herg/qed-reference.json', 'utf8')) as { smiles: string; inputs: Record<string, number>; expected: number }[];
  for (const row of rows) assert.ok(Math.abs(historicalQed(rdkit, row.smiles, row.inputs) - row.expected) < 1e-12, row.smiles);
  assert.throws(() => historicalQed(rdkit, 'CCO', {}), /Missing QED input/);
});
