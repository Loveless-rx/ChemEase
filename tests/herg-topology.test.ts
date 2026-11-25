import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { topologyFeatures } from '../src/features/herg/topologyFeatures';

test('Historical topology descriptors match native reference values', () => {
  const rows = JSON.parse(readFileSync('vendor/herg/topology-reference.json', 'utf8')) as { atoms: (number | boolean)[][]; bonds: (number | boolean)[][]; smiles: string; expected: Record<string, number> }[];
  for (const row of rows) {
    const actual = topologyFeatures(row.atoms, row.bonds);
    for (const [name, value] of Object.entries(row.expected)) assert.ok(Math.abs(actual[name] - value) <= 1e-8 * Math.max(1, Math.abs(value)), `${row.smiles} ${name}: ${actual[name]} != ${value}`);
  }
});
