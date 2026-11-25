import type { MainModule } from '@rdkit/rdkit';
import { HERG_ASSETS } from './assetIdentity';
import { researchHergFeatures } from './researchFeatures';
import { inferHerg, type TensorSpec } from './network';
import { HERG_MODEL, HERG_SOURCE, type HergResult } from './model';

interface PyRuntime { loadPackage(names: string[]): Promise<void>; globals: { set(name: string, value: string): void }; runPythonAsync(code: string): Promise<string> }
const scope = globalThis as unknown as {
  initRDKitModule(options: { wasmBinary: ArrayBuffer }): Promise<MainModule>;
  loadPyodide(options: { indexURL: string }): Promise<PyRuntime>;
  postMessage(value: unknown): void;
  onmessage: (event: MessageEvent<{ id: number; base: string; smiles: string; structureKey: string }>) => void;
};
interface Parameters { columns: string[]; models: TensorSpec[]; normalization: Record<string, unknown> }
let loaded: Promise<{ rdkit: MainModule; py: PyRuntime; parameters: Parameters; weights: Uint8Array }> | undefined;
async function verified(base: string, name: keyof typeof HERG_ASSETS) {
  const response = await fetch(new URL(name, base));
  if (!response.ok) throw new Error(`hERG asset unavailable (${response.status}): ${name}`);
  const bytes = await response.arrayBuffer();
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(x => x.toString(16).padStart(2, '0')).join('');
  if (hash !== HERG_ASSETS[name]) throw new Error(`hERG asset integrity check failed: ${name}`);
  return bytes;
}
async function initialize(base: string, progress: (stage: string) => void) {
  progress('Loading verified chemistry and model assets…');
  // Scripts are verified before execution. All requests stay on the static site.
  for (const name of ['chemistry/RDKit_minimal.js', 'normalization/pyodide.js'] as const) {
    const code = await verified(base, name);
    const suffix = name.startsWith('chemistry/') ? '\nexport default initRDKitModule;' : '\nexport default globalThis.loadPyodide;';
    const blob = URL.createObjectURL(new Blob([code, suffix], { type: 'application/javascript' }));
    try {
      const module = await import(/* @vite-ignore */ blob);
      if (name.startsWith('chemistry/')) scope.initRDKitModule = module.default;
      else scope.loadPyodide = module.default;
    } finally { URL.revokeObjectURL(blob); }
  }
  const [wasmBinary, weights, params] = await Promise.all([verified(base, 'chemistry/RDKit_minimal.wasm'), verified(base, 'weights.bin'), verified(base, 'parameters.json')]);
  const rdkit = await scope.initRDKitModule({ wasmBinary });
  progress('Starting browser scientific runtime (first load about 92 MB)…');
  const py = await scope.loadPyodide({ indexURL: new URL('normalization/', base).href });
  await py.loadPackage(['numpy', 'scipy']);
  return { rdkit, py, parameters: JSON.parse(new TextDecoder().decode(params)) as Parameters, weights: new Uint8Array(weights) };
}
scope.onmessage = async ({ data }) => {
  const progress = (stage: string) => scope.postMessage({ id: data.id, stage });
  try {
    loaded ??= initialize(data.base, progress).catch(e => { loaded = undefined; throw e; });
    const { rdkit, py, parameters, weights } = await loaded;
    progress('Preparing historical descriptors and molecular graph…');
    const features = researchHergFeatures(rdkit, data.smiles, parameters.columns);
    progress('Normalizing 200 features…');
    py.globals.set('payload', JSON.stringify({ columns: parameters.columns, raw: features.raw, normalization: parameters.normalization }));
    const normalized = JSON.parse(await py.runPythonAsync(`import json,numpy as np,scipy.stats as st
p=json.loads(payload)
features=[]
for name,raw in zip(p['columns'],p['raw']):
 dist,params,low,high,avg,std=p['normalization'][name]
 params=[float(v) for v in params];low=float(low);high=float(high)
 if dist=='gilbrat':dist='gibrat'
 value=float(np.float32(np.clip(getattr(st,dist).cdf(np.clip(raw,low,high),*params[:-2],loc=params[-2],scale=params[-1]),0,1)))
 features.append(0 if np.isnan(value) else value)
json.dumps(features)`)) as number[];
    progress('Running the five-member hERG ensemble…');
    const prediction = inferHerg(features.graph, normalized, parameters.models, weights);
    const result: HergResult = { modelVersion: HERG_MODEL, sourceCommit: HERG_SOURCE, chemistry: 'RDKit 2023.03.3', preprocessing: 'chemprop-1.6.1-rdkit2dnormalized-200', structureKey: data.structureKey, inputSmiles: data.smiles, canonicalSmiles: features.canonical, raw: features.raw, normalized, ...prediction, status: 'predicted' };
    scope.postMessage({ id: data.id, result });
  } catch (error) { scope.postMessage({ id: data.id, error: error instanceof Error ? error.message : 'hERG calculation failed.' }); }
};
