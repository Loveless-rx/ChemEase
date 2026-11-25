import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { HERG_ASSETS } from '../src/features/herg/assetIdentity';

test('Static hERG assets retain their pinned bytes across deployment checkouts', () => {
  for (const [name, expected] of Object.entries(HERG_ASSETS)) {
    assert.equal(createHash('sha256').update(readFileSync(`public/herg/${name}`)).digest('hex'), expected, name);
  }
  const parameters = JSON.parse(readFileSync('public/herg/parameters.json', 'utf8'));
  assert.equal(parameters.columns.length, 200);
  assert.equal(new Set(parameters.columns).size, 200);
  assert.equal(parameters.models.length, 5);
});
