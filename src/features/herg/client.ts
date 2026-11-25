import type { HergResult } from './model';
export function startHerg(smiles: string, structureKey: string, progress: (stage: string) => void) {
  const worker = new Worker(new URL('./herg.worker.ts', import.meta.url), { type: 'module' });
  let rejectPending: (reason: Error) => void = () => {};
  const promise = new Promise<HergResult>((resolve, reject) => {
    rejectPending = reject;
    worker.onmessage = ({ data }: MessageEvent<{ stage?: string; error?: string; result?: HergResult }>) => {
      if (data.stage) progress(data.stage);
      if (data.result) { resolve(data.result); worker.terminate(); }
      if (data.error) { reject(new Error(data.error)); worker.terminate(); }
    };
    worker.onerror = () => { reject(new Error('The browser prediction worker could not run. Retry or use a browser with more available memory.')); worker.terminate(); };
    worker.postMessage({ id: 1, smiles, structureKey, base: new URL('herg/', new URL(import.meta.env.BASE_URL, window.location.href)).href });
  });
  return { promise, cancel: () => { worker.terminate(); rejectPending(new Error('hERG prediction cancelled.')); } };
}
