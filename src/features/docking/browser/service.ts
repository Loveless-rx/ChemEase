import { zipSync, strToU8 } from "fflate";
import { chemicalIdentity } from "./identity";
import { loadRDKit } from "../../../engine/rdkit";
import { useWorkspaceStore } from "../../workspace/store";
import type { Asset, DockingResult, Grid, Job, LigandSource } from "../types";
import { validateDockingResult, dockingCsv } from "../model";
import { all, get, put, assetRecord, id, now, sha, type Stored } from "./storage";
import { runTool, runtimeRoot } from "./runtime";
import { inspectPdb, cleanProtein, pdbAtoms, qtAtoms, receptorCarbons, ligandCarbons, restoreSdf, vinaPoses, interactionReview, validateGrid, sdfGraph } from "./chemistry";
interface PrepLigand {
    content: string;
    format: "smiles" | "sdf";
    ph: number;
    protonation: "rules" | "supplied";
    source: LigandSource;
}
interface PrepReceptor {
    receptorId: string;
    chains: string[];
    ph: number;
    rebuildSidechains: boolean;
    removeNonProteinConfirmed: boolean;
}
interface Search {
    receptorId: string;
    ligandId: string;
    engine: "vina";
    grid: Grid;
    exhaustiveness: number;
    poses: number;
    seed: number;
}
const active = new Map<string, AbortController>();
const owner = () => useWorkspaceStore.getState().data.ownerId;
const tools = { vina: "AutoDock Vina 1.2.3 / WebAssembly", openbabel: "Open Babel 3.1.0 / WebAssembly", reduce: "Reduce 4.13 / WebAssembly", protocol: "chemease-browser-v1" };
const textFile = (name: string, text: string) => ({ name, text });
const json = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json" } });
const finished = (j: Job) => ["completed", "failed", "cancelled"].includes(j.status);
async function canonical(text: string, checkStereo = false) { return chemicalIdentity(await loadRDKit(), text, checkStereo); }
async function updated(owner: string, jid: string, change: Partial<Job>) { const record = await get(owner, jid); record.value = { ...record.value, ...change } as Job; await put(record); return record; }
async function validArtifact(record: Stored, key: string) { const file = record.files[key], manifest = (record.value as Asset).files?.[key]; if (!file || !manifest || await sha(file.text) !== manifest.sha256)
    throw Error("Prepared browser artifact is missing or changed; prepare again."); return file.text; }
async function prepared(owner: string, identifier: string, kind: string) { const r = await get(owner, identifier); if (r.kind !== kind || !(r.value as Asset).ready)
    throw Error("Choose a completed browser preparation."); return r; }
function ph(value: number) { if (!Number.isFinite(value) || value < 2 || value > 12)
    throw Error("Preparation pH must be from 2 to 12."); }
async function executeJob(record: Stored, signal: AbortSignal) {
    const job = record.value as Job, o = record.owner;
    const check = () => { if (signal.aborted)
        throw new DOMException("Job cancelled", "AbortError"); };
    const stage = async (name: string, message: string) => { check(); await updated(o, job.id, { status: "running", stage: name, message }); };
    const run = async (tool: "vina" | "babel" | "reduce", args: string[], files: Record<string, string>, outputs: string[]) => { check(); const value = await runTool(tool, args, files, outputs, signal); check(); return value; };
    try {
        await updated(o, job.id, { startedAt: now(), status: "running" });
        let result: Job["result"], assets: Stored[] = [], jobFiles: Stored["files"] = {};
        if (job.task === "receptor") {
            const r = record.request as PrepReceptor;
            ph(r.ph);
            if (!r.removeNonProteinConfirmed || r.rebuildSidechains || !Array.isArray(r.chains) || !r.chains.length)
                throw Error("Confirm cleanup and select protein chains. Browser preparation does not rebuild missing heavy atoms.");
            const raw = await get(o, r.receptorId);
            if (raw.kind !== "receptor-upload")
                throw Error("Inspect a protein first.");
            await stage("cleaning-receptor", "Checking complete standard residues and removing waters/non-protein residues");
            const original = await validArtifact(raw, "pdb"), clean = cleanProtein(original, r.chains);
            await stage("adding-receptor-hydrogens", "Reduce is adding protein hydrogens in your browser. First use downloads its chemistry data, then caches it locally.");
            const reduced = await run("reduce", ["-NOFLIP", "/input.pdb"], { "input.pdb": clean }, []);
            const pdb = reduced.stdout;
            const before = pdbAtoms(clean), after = pdbAtoms(pdb);
            for (const atom of before) {
                const match = after.find(a => a.name === atom.name && a.chain === atom.chain && a.resid === atom.resid);
                if (!match || Math.hypot(...atom.xyz.map((v, i) => v - match.xyz[i])) > .005)
                    throw Error(`Reduce heavy-atom check failed for ${atom.chain}:${atom.resid} ${atom.name}: ${match ? Math.hypot(...atom.xyz.map((v, i) => v - match.xyz[i])) : "missing"}. ${reduced.stderr.slice(-800)}`);
            }
            await stage("typing-receptor", "Open Babel is assigning Gasteiger charges and rigid-receptor PDBQT atom types");
            const converted = await run("babel", ["-ipdb", "input.pdb", "-opdbqt", "-O", "receptor.pdbqt", "-xr", "-xn", "--partialcharge", "gasteiger"], { "input.pdb": pdb }, ["receptor.pdbqt"]);
            const pdbqt = converted.files["receptor.pdbqt"].split("\n").filter(l => /^(ATOM {2}|HETATM)/.test(l)).join("\n") + "\n";
            if (qtAtoms(pdbqt).length < 20)
                throw Error("Receptor PDBQT conversion failed.");
            const sites = (raw.value as Asset).metadata!.sites.filter(s => r.chains.includes(s.chain));
            const asset = await assetRecord(o, "receptor", (raw.value as Asset).name, { pdb: textFile("receptor.pdb", pdb), pdbqt: textFile("receptor.pdbqt", pdbqt), features: textFile("features.json", JSON.stringify({ hydrophobicSerials: receptorCarbons(pdbqt) })), source: textFile("original-receptor.pdb", original), log: textFile("preparation.log", reduced.stderr + converted.stderr) }, { metadata: inspectPdb(pdb), bindingSites: sites, settings: r, sourceHash: await sha(original), tools, warnings: ["Browser protocol: Reduce hydrogen placement without heavy-atom flips; Open Babel Gasteiger charges/PDBQT typing. No missing-heavy-atom or loop repair.", "Receptor pH is an annotation: Reduce does not perform a site-specific pKa/pH titration. Review protein protonation and essential cofactors.", "All waters and non-protein residues were removed."] });
            assets = [asset];
            result = { receptor: asset.value as Asset, sites };
        }
        else if (job.task === "ligand") {
            const r = record.request as PrepLigand;
            ph(r.ph);
            if (!r.source || !["editor", "smiles", "sdf"].includes(r.source.kind) || !r.source.name?.trim() || r.source.name.length > 120 || r.content.length > 2000000 || !["rules", "supplied"].includes(r.protonation))
                throw Error("Invalid ligand input/source.");
            if (r.source.kind !== "editor" && (r.source.versionId !== null || r.source.structureKey !== null))
                throw Error("Imported ligands cannot claim editor versions.");
            const input = r.format === "smiles" ? r.content.trim().split(/\s+/)[0] : r.content;
            if (r.format === "smiles" && r.content.trim().split(/\r?\n/).filter(Boolean).length !== 1)
                throw Error("Import exactly one SMILES line.");
            if (r.format === "sdf" && (r.content.match(/\$\$\$\$/g) ?? []).length > 1)
                throw Error("Import exactly one SDF molecule.");
            const original = await canonical(input, true);
            await stage("generating-conformer", "Open Babel is generating and optimizing a 3D ligand in your browser");
            const ext = r.format === "smiles" ? "smi" : "sdf";
            const generated = await run("babel", ["-i" + ext, "input." + ext, "-osdf", "-O", "generated.sdf", "--gen3d", "better", "-h"], { ["input." + ext]: input }, ["generated.sdf"]);
            const generatedIdentity = (await canonical(generated.files["generated.sdf"])).smiles;
            if (generatedIdentity !== original.smiles)
                throw Error(`3D generation changed source chemical/stereochemical identity; preparation withheld. Input: ${original.smiles}. Generated: ${generatedIdentity}`);
            const state = r.protonation === "rules" ? await run("babel", ["-isdf", "input.sdf", "-osdf", "-O", "state.sdf", "-p", String(r.ph)], { "input.sdf": generated.files["generated.sdf"] }, ["state.sdf"]) : { files: { "state.sdf": generated.files["generated.sdf"] }, stderr: "", stdout: "" };
            const heavy = await run("babel", ["-isdf", "input.sdf", "-osdf", "-O", "ligand.sdf", "-d"], { "input.sdf": state.files["state.sdf"] }, ["ligand.sdf"]);
            const sdf = heavy.files["ligand.sdf"];
            const preparedMol = await canonical(sdf), generatedMol = await canonical(state.files["state.sdf"]);
            if (preparedMol.smiles !== generatedMol.smiles)
                throw Error("Hydrogen removal changed chemical/stereochemical identity; preparation withheld.");
            if (preparedMol.charge !== generatedMol.charge)
                throw Error(`Hydrogen removal changed formal charge (${generatedMol.charge} to ${preparedMol.charge}); preparation withheld.`);
            if (r.protonation === "supplied" && preparedMol.charge !== original.charge)
                throw Error("Supplied formal charge changed; preparation withheld.");
            if (preparedMol.heavy !== original.heavy)
                throw Error("Preparation changed ligand heavy-atom count.");
            const graph = sdfGraph(sdf);
            if (graph.elements.includes("H") || graph.xyz.every(p => p.every(n => n === 0)))
                throw Error("3D conformer generation failed.");
            await stage("typing-ligand", "Assigning Gasteiger charges and a torsion tree with preserved heavy-atom indices");
            const typed = await run("babel", ["-isdf", "input.sdf", "-opdbqt", "-O", "ligand.pdbqt", "-h", "-xp", "--partialcharge", "gasteiger"], { "input.sdf": sdf }, ["ligand.pdbqt"]);
            const pdbqt = typed.files["ligand.pdbqt"], carbons = ligandCarbons(sdf, pdbqt);
            const asset = await assetRecord(o, "ligand", r.source.name, { sdf: textFile("ligand.sdf", sdf), pdbqt: textFile("ligand.pdbqt", pdbqt), source: textFile("original." + ext, r.content), features: textFile("features.json", JSON.stringify({ hydrophobicSerials: carbons })), log: textFile("preparation.log", generated.stderr + state.stderr + heavy.stderr + typed.stderr) }, { source: r.source, inputSmiles: original.smiles, smiles: preparedMol.smiles, charge: preparedMol.charge, ph: r.ph, protonation: r.protonation, sourceHash: await sha(r.content), tools, warnings: ["Browser protocol: Open Babel 3D generation/optimization, Gasteiger charges and torsion tree. No RDKit ETKDG/MMFF94s or MolScrub computation is claimed.", r.protonation === "rules" ? "Open Babel rule-based pH transforms; no state populations, tautomer or stereoisomer ensemble is predicted." : "Supplied charge/protonation is preserved; pH is an annotation only.", "Inspect unspecified stereochemistry; generated geometry is not an experimental assignment."] });
            assets = [asset];
            result = { ligands: [asset.value as Asset] };
        }
        else {
            const r = record.request as Search;
            if (r.engine !== "vina")
                throw Error("Browser mode supports Vina; AutoDock 4 requires advanced native mode.");
            validateGrid(r.grid);
            for (const [v, min, max] of [[r.exhaustiveness, 1, 32], [r.poses, 1, 20], [r.seed, 1, 2147483647]])
                if (!Number.isSafeInteger(v) || v < min || v > max)
                    throw Error("Invalid Vina search settings.");
            const rec = await prepared(o, r.receptorId, "receptor"), lig = await prepared(o, r.ligandId, "ligand"), receptor = await validArtifact(rec, "pdbqt"), ligand = await validArtifact(lig, "pdbqt"), pdb = await validArtifact(rec, "pdb"), template = await validArtifact(lig, "sdf");
            const c = r.grid.center;
            if (Math.min(...pdbAtoms(pdb).map(a => Math.hypot(a.xyz[0] - c.x, a.xyz[1] - c.y, a.xyz[2] - c.z))) > 15)
                throw Error("Grid center is more than 15 Angstrom from every protein atom.");
            await stage("docking", "AutoDock Vina is searching entirely in your browser. You can cancel; there is no reliable search percentage.");
            const args = ["--cpu", "1", "--seed", String(r.seed), "--exhaustiveness", String(r.exhaustiveness), "--num_modes", String(r.poses)];
            for (const field of ["center", "size"] as const)
                for (const axis of ["x", "y", "z"] as const)
                    args.push(`--${field}_${axis}`, String(r.grid[field][axis]));
            const outputName = "0--receptor.pdbqt--ligand.pdbqt.out";
            const out = await run("vina", args, { "receptor.pdbqt": receptor, "ligand.pdbqt": ligand, "receptor_list.txt": "receptor.pdbqt\n", "ligand_list.txt": "ligand.pdbqt\n" }, [outputName]);
            out.files["poses.pdbqt"] = out.files[outputName];
            await stage("processing-poses", "Restoring original ligand chemistry, checking SDF identity and reviewing geometric contacts");
            const rc = JSON.parse(await validArtifact(rec, "features")).hydrophobicSerials as number[], lc = JSON.parse(await validArtifact(lig, "features")).hydrophobicSerials as number[];
            const poses: DockingResult["poses"] = [], coords: number[][][] = [], sdfs: string[] = [];
            jobFiles = { receptor: textFile("receptor.pdb", pdb), receptorPdbqt: textFile("receptor.pdbqt", receptor), inputLigand: textFile("input-ligand.sdf", template), inputLigandPdbqt: textFile("ligand.pdbqt", ligand), pdbqt: textFile("poses.pdbqt", out.files["poses.pdbqt"]), log: textFile("vina.log", out.stdout + out.stderr), config: textFile("config.json", JSON.stringify(r, null, 2)) };
            const identity = (await canonical(template)).smiles;
            for (const p of vinaPoses(out.files["poses.pdbqt"], r.poses)) {
                check();
                const restored = restoreSdf(template, p.block);
                if ((await canonical(restored.sdf)).smiles !== identity)
                    throw Error("Docked export changed prepared ligand chemical/stereochemical identity; outputs withheld.");
                coords.push(restored.coords);
                sdfs.push(restored.sdf.replace(/\$\$\$\$\s*$/, "").trimEnd() + `\n>  <DOCKING_ENGINE>\nvina-browser-wasm\n\n>  <POSE_RANK>\n${p.rank}\n\n>  <VINA_AFFINITY_KCAL_MOL>\n${p.affinity}\n\n$$$$\n`);
                jobFiles[`pose-${p.rank}`] = textFile(`pose-${p.rank}.sdf`, sdfs.at(-1)!);
                poses.push({ rank: p.rank, affinity: p.affinity, rmsdLower: p.rmsdLower, rmsdUpper: p.rmsdUpper, ...interactionReview(receptor, p.block, rc, lc) });
            }
            jobFiles.sdf = textFile("poses.sdf", sdfs.join(""));
            const manifest = await (await fetch(new URL("manifest.json", runtimeRoot()))).json() as {
                release: string;
                sourceCommit: string;
                assets: Record<string, {
                    sha256: string;
                    bytes: number;
                }>;
            };
            const docked: DockingResult = { schema: 1, jobId: job.id, createdAt: job.createdAt, completedAt: now(), engine: "vina", engineVersion: "AutoDock Vina v1.2.3 (WebAssembly)", engineBinarySha256: manifest.assets["webina/vina.wasm"].sha256, execution: { kind: "browser-wasm", release: manifest.release, sourceCommit: manifest.sourceCommit, assetHashes: Object.fromEntries(Object.entries(manifest.assets).map(([key, v]) => [key, v.sha256])) }, tools, receptor: rec.value as Asset, ligand: lig.value as Asset, settings: r, poses, mappedHeavyAtomRmsd: coords.map(a => coords.map(b => Math.round(Math.sqrt(a.reduce((s, v, i) => s + v.reduce((t, n, j) => t + (n - b[i][j]) ** 2, 0), 0) / a.length) * 10000) / 10000)), rmsdMethod: "Common receptor frame, fixed heavy-atom mapping, no alignment or symmetry correction. Vina bounds are relative to its best pose, not the crystal ligand.", limitations: "Browser-only rigid-receptor noncovalent Vina search. Scores in kcal/mol are scoring-function estimates, not measured affinities/Kd, efficacy or safety. Open Babel/Reduce preparation differs from the native protocol. No missing-heavy-atom/loop repair, metal/cofactor, covalent, flexible-receptor or explicit-water protocol. Geometric contacts are review signals, not experimental interactions. Validate protonation, stereochemistry, sampling and target-specific redocking/enrichment before research use." };
            validateDockingResult(docked);
            result = docked;
            jobFiles.result = textFile("result.json", JSON.stringify(docked, null, 2));
            jobFiles.csv = textFile("docking.csv", dockingCsv(docked));
            jobFiles.command = textFile("command.json", JSON.stringify({ args, interface: "MolModa batch wrapper", outputName }, null, 2));
            jobFiles.receptorList = textFile("receptor_list.txt", "receptor.pdbqt\n");
            jobFiles.ligandList = textFile("ligand_list.txt", "ligand.pdbqt\n");
            jobFiles.preparation = textFile("preparation.json", JSON.stringify({ receptor: rec.value, ligand: lig.value }, null, 2));
            for (const [key, value] of Object.entries(rec.files))
                if (key === "source" || key === "features" || key === "log")
                    jobFiles["receptor-" + key] = textFile("receptor-" + value.name, value.text);
            for (const [key, value] of Object.entries(lig.files))
                if (key === "source" || key === "features" || key === "log")
                    jobFiles["ligand-" + key] = textFile("ligand-" + value.name, value.text);
        }
        check();
        const fresh = await get(o, job.id);
        if ((fresh.value as Job).status === "cancelled")
            return;
        fresh.value = { ...fresh.value, status: "completed", stage: "completed", message: "Finished in your browser", result } as Job;
        fresh.files = jobFiles;
        await put(...assets, fresh);
    }
    catch (error) {
        const cancelled = signal.aborted;
        await updated(o, job.id, { status: cancelled ? "cancelled" : "failed", stage: cancelled ? "cancelled" : "failed", message: (error as Error).message.slice(0, 4000) });
    }
    finally {
        active.delete(job.id);
    }
}
export async function browserRequest(path: string, body?: unknown): Promise<Response> {
    const o = owner();
    if (path === "/health") {
        const available = globalThis.crossOriginIsolated && !!navigator.locks && typeof Worker !== "undefined" && typeof WebAssembly !== "undefined";
        return json({ service: "chemease-docking", apiVersion: 1, engines: [{ id: "vina", label: "AutoDock Vina (browser)", available, version: "AutoDock Vina v1.2.3 (WebAssembly)", reason: available ? undefined : "Browser isolation is not ready. Reload the site over HTTPS or localhost; allow its service worker." }], tools });
    }
    if (path === "/assets") {
        const rows = await all(o);
        return json({ receptors: rows.filter(r => r.kind === "receptor").map(r => r.value), ligands: rows.filter(r => r.kind === "ligand").map(r => r.value) });
    }
    if (path === "/receptors" && body instanceof FormData) {
        if ((await all(o)).filter(r => r.kind === "receptor-upload").length >= 100)
            throw Error("Browser receptor upload limit reached (100).");
        const file = body.get("file"), pdbId = String(body.get("pdbId") ?? "");
        let text: string, name: string;
        if (pdbId) {
            if (!/^[0-9a-z]{4}$/i.test(pdbId))
                throw Error("Use a four-character PDB ID.");
            const response = await fetch(`https://files.rcsb.org/download/${pdbId.toUpperCase()}.pdb`, { signal: AbortSignal.timeout(30000) });
            if (!response.ok)
                throw Error("RCSB retrieval failed. Upload a PDB or use the bundled presentation example.");
            text = await response.text();
            name = pdbId.toUpperCase() + ".pdb";
        }
        else if (file instanceof File) {
            if (file.size > 16 * 1024 * 1024)
                throw Error("PDB exceeds 16 MB.");
            text = await file.text();
            name = file.name.slice(0, 120);
        }
        else
            throw Error("Select a PDB file or ID.");
        if (text.length > 16 * 1024 * 1024)
            throw Error("PDB exceeds 16 MB.");
        const record = await assetRecord(o, "receptor-upload", name, { pdb: textFile("original.pdb", text) }, { metadata: inspectPdb(text) });
        await put(record);
        return json(record.value);
    }
    if (path === "/jobs" && body === undefined) {
        const rows = await all(o);
        for (const r of rows) {
            if (r.kind === "job" && !finished(r.value as Job) && !active.has(r.id) && Date.now() - Date.parse(r.value.createdAt) > 30000) {
                const held = await navigator.locks?.query();
                if (!held?.held?.some(l => l.name === "chemease-dock-" + r.id)) {
                    r.value = { ...r.value, status: "failed", stage: "interrupted", message: "Browser execution was interrupted. Submit a new job; partial files are not results." } as Job;
                    await put(r);
                }
            }
        }
        return json(rows.filter(r => r.kind === "job").map(r => ({ ...r.value, result: undefined })).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));
    }
    if (/^\/jobs\/(receptor|ligand|dock)$/.test(path) && body) {
        if ([...active.values()].length)
            throw Error("Wait for the running browser preparation/search or cancel it first.");
        if ((await all(o)).filter(r => r.kind === "job").length >= 100)
            throw Error("Browser job history reached 100 runs. Export your results before continuing in another browser workspace.");
        const task = path.split("/")[2] as Job["task"], identifier = id(), controller = new AbortController();
        const record: Stored = { owner: o, id: identifier, kind: "job", files: {}, request: structuredClone(body), value: { id: identifier, createdAt: now(), task, status: "queued", stage: "queued", message: "Starting local browser worker" } };
        await put(record);
        active.set(identifier, controller);
        void navigator.locks.request("chemease-dock-" + identifier, () => executeJob(record, controller.signal));
        return json(record.value, 202);
    }
    const cancel = path.match(/^\/jobs\/([a-f0-9]{32})\/cancel$/);
    if (cancel) {
        const record = await get(o, cancel[1]);
        if (finished(record.value as Job))
            return json(record.value);
        active.get(cancel[1])?.abort();
        record.value = { ...record.value, status: "cancelled", stage: "cancelled", message: "Browser job cancelled; partial outputs are unavailable." } as Job;
        await put(record);
        return json(record.value);
    }
    const job = path.match(/^\/jobs\/([a-f0-9]{32})$/);
    if (job) {
        const record = await get(o, job[1]);
        if (!finished(record.value as Job) && !active.has(record.id) && Date.now() - Date.parse(record.value.createdAt) > 30000) {
            const locks = await navigator.locks.query();
            if (!locks.held?.some(l => l.name === "chemease-dock-" + record.id)) {
                record.value = { ...record.value, status: "failed", stage: "interrupted", message: "Browser execution was interrupted; submit a new job." } as Job;
                await put(record);
            }
        }
        return json(record.value);
    }
    const artifact = path.match(/^\/artifacts\/([a-f0-9]{32})\/([\w-]+)$/);
    if (artifact) {
        const r = await get(o, artifact[1]);
        if (r.kind === "job" && (r.value as Job).status !== "completed")
            throw Error("Only completed jobs have downloadable outputs.");
        const f = r.files[artifact[2]];
        if (!f)
            throw Error("Browser artifact unavailable.");
        return new Response(f.text, { headers: { "Content-Type": "text/plain" } });
    }
    const archive = path.match(/^\/jobs\/([a-f0-9]{32})\/archive$/);
    if (archive) {
        const r = await get(o, archive[1]);
        if (r.kind !== "job" || (r.value as Job).task !== "dock" || (r.value as Job).status !== "completed")
            throw Error("Only completed docking jobs have downloadable results.");
        const bytes = zipSync(Object.fromEntries(Object.values(r.files).map(f => [f.name, strToU8(f.text)])), { level: 3 });
        return new Response(bytes.buffer as ArrayBuffer, { headers: { "Content-Type": "application/zip" } });
    }
    throw Error("Unsupported browser docking operation.");
}
