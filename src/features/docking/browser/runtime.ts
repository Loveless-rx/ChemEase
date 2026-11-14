export interface ToolOutput {
    files: Record<string, string>;
    stdout: string;
    stderr: string;
}
export const runtimeRoot = () => new URL(`${import.meta.env.BASE_URL}docking-wasm/`, document.baseURI);
export async function runTool(tool: "vina" | "babel" | "reduce", args: string[], files: Record<string, string>, outputs: string[], signal: AbortSignal): Promise<ToolOutput> {
    if (signal.aborted)
        throw new DOMException("Job cancelled", "AbortError");
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL("run-tool.js", runtimeRoot()));
        const cleanup = () => { clearTimeout(timer); signal.removeEventListener("abort", cancel); worker.terminate(); };
        const cancel = () => { worker.postMessage({ cancel: true }); cleanup(); reject(new DOMException("Job cancelled; partial outputs are unavailable.", "AbortError")); };
        const timer = setTimeout(() => { cleanup(); reject(new Error("Browser chemistry exceeded its 20-minute limit. Use smaller inputs or a smaller search budget.")); }, 20 * 60 * 1000);
        signal.addEventListener("abort", cancel, { once: true });
        worker.onerror = event => { cleanup(); reject(new Error(event.message || "The browser chemistry worker stopped unexpectedly.")); };
        worker.onmessage = ({ data }) => { cleanup(); if (data.ok)
            resolve(data as ToolOutput);
        else
            reject(new Error(data.error)); };
        worker.postMessage({ tool, args, files, outputs });
    });
}
