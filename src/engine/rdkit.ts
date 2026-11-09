import type { MainModule } from "@rdkit/rdkit";

declare global {
  interface Window { initRDKitModule?: (options?: unknown) => Promise<MainModule> }
}
let pending: Promise<MainModule> | null = null;
export function loadRDKit(): Promise<MainModule> {
  if (pending) return pending;
  pending = (async () => {
    if (!window.initRDKitModule) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = new URL(`${import.meta.env.BASE_URL}rdkit/RDKit_minimal.js`, document.baseURI).href;
        script.onload = () => { script.remove(); resolve(); };
        script.onerror = () => { script.remove(); reject(new Error("Could not load the chemistry engine. Check your connection and retry.")); };
        document.head.appendChild(script);
      });
    }
    const init = window.initRDKitModule;
    if (!init) throw new Error("The chemistry engine did not initialize. Please retry.");
    const embedded = document.getElementById("rdkit-wasm")?.textContent;
    return init({ locateFile: () => embedded
      ? `data:application/wasm;base64,${embedded}`
      : new URL(`${import.meta.env.BASE_URL}rdkit/RDKit_minimal.wasm`, document.baseURI).href });
  })().catch((error) => { pending = null; throw error; });
  return pending;
}
