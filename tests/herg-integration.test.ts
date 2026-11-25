import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import initRDKit from '@rdkit/rdkit';
import { importSmiles, chemistryKey } from '../src/engine/toolkit';
import { addProject, emptyWorkspace, saveVersion, saveHerg, validateWorkspace } from '../src/features/workspace/domain';
import { createWorkspaceStore } from '../src/features/workspace/store';
import type { WorkspaceData, WorkspaceRepository } from '../src/features/workspace/types';
import { HERG_MODEL, HERG_SOURCE, hergInputReasons, validateHergResult, type HergResult } from '../src/features/herg/model';
import { inferHerg, type TensorSpec } from '../src/features/herg/network';
import type { HergGraph } from '../src/features/herg/graphFeatures';
import { comparisonColumns, comparisonCsv } from '../src/features/comparison/model';
import { createReport, reportColumns, reportCsv, validateReport, storeReport } from '../src/features/reports/model';
import { layoutReport } from '../src/features/reports/pdf';

const engine = initRDKit();
const reference = JSON.parse(readFileSync('vendor/herg/inference-reference.json', 'utf8')) as { models: TensorSpec[]; rows: { smiles: string; graph: HergGraph; features: number[]; expected: number }[] };
async function fixture() {
  const graph = importSmiles(await engine, 'CCO', 'hERG test'); let i = 0; const ids = () => `herg-${++i}`;
  const saved = saveVersion(addProject(emptyWorkspace('account-a'), 'Research', '', 'project').data, 'project', null, graph, ids);
  const prediction: HergResult = { modelVersion: HERG_MODEL, sourceCommit: HERG_SOURCE, chemistry: 'RDKit 2023.03.3', preprocessing: 'chemprop-1.6.1-rdkit2dnormalized-200', structureKey: chemistryKey(graph), inputSmiles: 'CCO', canonicalSmiles: 'CCO', raw: Array(200).fill(1), normalized: reference.rows[0].features, members: [.01,.02,.03,.04,.05], score: .03, status: 'predicted' };
  return { graph, ids, prediction, ...saved };
}
test('Typed inference reproduces native checkpoint means on all ten graph fixtures', () => {
  const bytes = readFileSync('public/herg/weights.bin');
  for (const row of reference.rows) assert.ok(Math.abs(inferHerg(row.graph, row.features, reference.models, bytes).score - row.expected) < 1e-5, row.smiles);
});
test('Saved hERG records survive JSON reload, deduplicate and reject stale structures', async () => {
  const f = await fixture(), saved = saveHerg(f.data, f.versionId, f.graph, f.prediction, f.ids);
  assert.equal(saved.results.length, 1); assert.equal(f.data.results.length, 0);
  assert.equal(saveHerg(saved, f.versionId, f.graph, f.prediction, f.ids).results.length, 1);
  const restored=validateWorkspace(JSON.parse(JSON.stringify(saved)), 'account-a'); assert.deepEqual(restored.results, saved.results); assert.equal(restored.versions[0].structureKey,saved.versions[0].structureKey);
  assert.throws(() => validateWorkspace(saved, 'account-b'), /owner/);
  const changed = structuredClone(f.graph); changed.atoms[0].x++;
  assert.throws(() => saveHerg(saved, f.versionId, changed, f.prediction), /version/);
  f.prediction.members[0] = .9; assert.equal(saved.results[0].method === 'herg-admet-ai-v1' && saved.results[0].prediction.members[0], .01);
});
test('Recorded hERG provenance, vectors and ensemble consistency are validated', async () => {
  const f = await fixture();
  for (const mutate of [(p:HergResult) => { p.modelVersion = 'wrong' as typeof HERG_MODEL; }, (p:HergResult) => { p.score = .8; }, (p:HergResult) => { p.raw[0] = NaN; }, (p:HergResult) => { p.normalized.pop(); }, (p:HergResult) => { p.members[0] = -1; }]) {
    const prediction = structuredClone(f.prediction); mutate(prediction);
    assert.throws(() => validateHergResult(prediction, f.prediction.structureKey));
  }
});
test('Chemical-state guards reject salts, charge, unsupported elements and oversized inputs', async () => {
  const r = await engine;
  for (const smiles of ['[Na+].[Cl-]', 'CC[NH3+]', '[13CH3]CO', '[SiH3]C', 'C'.repeat(81)]) assert.ok(hergInputReasons(importSmiles(r, smiles, 'Unsupported')).length, smiles);
  assert.deepEqual(hergInputReasons(importSmiles(r, 'CCO', 'Supported')), []);
});
test('Reports freeze hERG IDs, preserve missing results, exclude sections and retain v4 semantics', async () => {
  const f = await fixture(), sections = { properties:false, rules:false, alerts:false, chart:false, herg:true };
  const missing = createReport(f.data, [f.versionId], 'Before', '', sections, 'logP', 'tpsa');
  const saved = saveHerg(f.data, f.versionId, f.graph, f.prediction, f.ids), report = createReport(saved, [f.versionId], 'hERG report', '', sections, 'logP', 'tpsa');
  assert.equal(report.method, 'research-report-v5'); assert.ok(report.refs[0].hergId);
  assert.equal(reportColumns(saved, missing)[0].herg, undefined);
  const before = reportCsv(saved, report), updated = structuredClone(f.prediction); updated.members = [.1,.2,.3,.4,.5]; updated.score = .3;
  const later = saveHerg(saved, f.versionId, f.graph, updated, f.ids);
  assert.equal(reportCsv(later, report), before); assert.ok(before.includes(HERG_SOURCE));
  assert.doesNotThrow(() => validateWorkspace(storeReport(saved, report), 'account-a'));
  const excluded = structuredClone(report); excluded.sections.herg = false; assert.ok(!reportCsv(saved, excluded).includes('hERG blocker-class score'));
  const old = structuredClone(report); old.method = 'research-report-v4'; delete old.sections.herg; for (const ref of old.refs) delete ref.hergId;
  assert.doesNotThrow(() => validateReport(saved, old)); assert.ok(!reportCsv(saved, old).includes('hERG blocker-class score'));
  old.refs[0].hergId = report.refs[0].hergId; assert.throws(() => validateReport(saved, old), /Legacy/);
  const pages = layoutReport(saved, report, (text, size) => text.length * size * .6);
  for (const page of pages) for (const op of page) assert.ok(op.y >= 0 && op.y <= 1080);
  assert.ok(comparisonCsv(comparisonColumns(saved, [{versionId:f.versionId}])).includes('hERG blocker-class score'));
});
test('Account and guest repository switching retain separate hERG data after reload', async () => {
  const f = await fixture();
  class Memory implements WorkspaceRepository {
    constructor(readonly ownerId:string, public data:WorkspaceData|null) {}
    async load() { return this.data ? validateWorkspace(structuredClone(this.data), this.ownerId) : null; }
    async save(data:WorkspaceData) { this.data = validateWorkspace(structuredClone(data), this.ownerId); }
  }
  const account = new Memory('account-a', f.data), guest = new Memory('local-device', null), other = new Memory('account-b', null);
  const store = createWorkspaceStore(account); await store.getState().initialize(); await store.getState().saveHerg(f.versionId, f.graph, f.prediction);
  await store.getState().changeRepository(guest); assert.equal(store.getState().data.results.length, 0);
  await store.getState().changeRepository(other); assert.equal(store.getState().data.results.length, 0);
  const reloaded = createWorkspaceStore(account); await reloaded.getState().initialize(); assert.equal(reloaded.getState().data.results[0].method, 'herg-admet-ai-v1');
});
