import type { Asset, Job } from "../types";
export interface Stored {
    owner: string;
    id: string;
    kind: string;
    value: Asset | Job;
    request?: unknown;
    files: Record<string, {
        name: string;
        text: string;
    }>;
}
let opened: Promise<IDBDatabase> | undefined;
function database() { return opened ??= new Promise<IDBDatabase>((resolve, reject) => { const r = indexedDB.open("chemease-browser-docking-v1", 1); r.onupgradeneeded = () => r.result.createObjectStore("records", { keyPath: ["owner", "id"] }); r.onsuccess = () => resolve(r.result); r.onerror = () => { opened = undefined; reject(r.error); }; }); }
export async function all(owner: string) { const db = await database(); return new Promise<Stored[]>((resolve, reject) => { const t = db.transaction("records", "readonly"), r = t.objectStore("records").getAll(IDBKeyRange.bound([owner, ""], [owner, "\uffff"])); r.onsuccess = () => resolve(r.result as Stored[]); r.onerror = () => reject(r.error); }); }
export async function get(owner: string, id: string) { const db = await database(); return new Promise<Stored>((resolve, reject) => { const r = db.transaction("records", "readonly").objectStore("records").get([owner, id]); r.onsuccess = () => r.result ? resolve(r.result as Stored) : reject(new Error("Browser docking record not found in this workspace.")); r.onerror = () => reject(r.error); }); }
export async function put(...rows: Stored[]) { const db = await database(); await new Promise<void>((resolve, reject) => { const t = db.transaction("records", "readwrite"); for (const row of rows)
    t.objectStore("records").put(row); t.oncomplete = () => resolve(); t.onerror = () => reject(t.error); t.onabort = () => reject(t.error ?? new Error("Could not retain browser docking data.")); }); }
export const id = () => crypto.randomUUID().replaceAll("-", "");
export const now = () => new Date().toISOString();
export async function sha(text: string | ArrayBuffer) { const data = typeof text === "string" ? new TextEncoder().encode(text) : text; return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", data)), n => n.toString(16).padStart(2, "0")).join(""); }
export async function assetRecord(owner: string, kind: string, name: string, files: Record<string, {
    name: string;
    text: string;
}>, extra: Partial<Asset> = {}): Promise<Stored> { const manifest: Asset["files"] = {}; for (const [key, file] of Object.entries(files))
    manifest[key] = { name: file.name, sha256: await sha(file.text), bytes: new TextEncoder().encode(file.text).byteLength }; const identifier = id(); return { owner, id: identifier, kind, files, value: { id: identifier, kind, name, ready: true, createdAt: now(), files: manifest, ...extra } }; }
