import type { Asset, Contact, Grid, Pose, Vec } from "../types";
export const AMINO = new Set("ALA ARG ASN ASP CYS GLN GLU GLY HIS ILE LEU LYS MET PHE PRO SER THR TRP TYR VAL".split(" "));
const required: Record<string, string> = { ALA: "CB", ARG: "CB CG CD NE CZ NH1 NH2", ASN: "CB CG OD1 ND2", ASP: "CB CG OD1 OD2", CYS: "CB SG", GLN: "CB CG CD OE1 NE2", GLU: "CB CG CD OE1 OE2", GLY: "", HIS: "CB CG ND1 CD2 CE1 NE2", ILE: "CB CG1 CG2 CD1", LEU: "CB CG CD1 CD2", LYS: "CB CG CD CE NZ", MET: "CB CG SD CE", PHE: "CB CG CD1 CD2 CE1 CE2 CZ", PRO: "CB CG CD", SER: "CB OG", THR: "CB OG1 CG2", TRP: "CB CG CD1 CD2 NE1 CE2 CE3 CZ2 CZ3 CH2", TYR: "CB CG CD1 CD2 CE1 CE2 CZ OH", VAL: "CB CG1 CG2" };
const carbon: Record<string, string> = { ALA: "CB", ARG: "CB CG", ASN: "CB", ASP: "CB", CYS: "", GLN: "CB CG", GLU: "CB CG", GLY: "", HIS: "CB", ILE: "CB CG1 CG2 CD1", LEU: "CB CG CD1 CD2", LYS: "CB CG CD", MET: "CB", PHE: "CB CG CD1 CD2 CE1 CE2 CZ", PRO: "CB CG", SER: "", THR: "CG2", TRP: "CB CG CD2 CE3 CZ2 CZ3 CH2", TYR: "CB CG CD1 CD2 CE1 CE2", VAL: "CB CG1 CG2" };
export interface PdbAtom {
    line: string;
    xyz: number[];
    name: string;
    chain: string;
    resid: string;
    resname: string;
    element: string;
    protein: boolean;
    occupancy: number;
}
export function pdbAtoms(text: string): PdbAtom[] { const selected = new Map<string, PdbAtom>(); for (const line of text.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    if (line.startsWith("ENDMDL"))
        break;
    if (!/^(ATOM {2}|HETATM)/.test(line))
        continue;
    if (line.length < 54)
        throw Error("Truncated PDB record.");
    const xyz = [30, 38, 46].map(n => Number(line.slice(n, n + 8)));
    if (xyz.some(n => !Number.isFinite(n) || Math.abs(n) >= 10000))
        throw Error("Invalid protein coordinates.");
    const chain = line.slice(21, 22).trim() || "_", resid = line.slice(22, 27).trim(), resname = line.slice(17, 20).trim(), name = line.slice(12, 16).trim(), element = line.slice(76, 78).trim() || name.replace(/^\d/, "")[0], occupancy = Number(line.slice(54, 60).trim() || 0);
    if (!Number.isFinite(occupancy))
        throw Error("Invalid occupancy.");
    const key = [chain, resid, resname, name].join(":"), old = selected.get(key);
    if (!old || occupancy > old.occupancy)
        selected.set(key, { line: line.slice(0, 16) + " " + line.slice(17), xyz, name, chain, resid, resname, element, protein: line.startsWith("ATOM") && AMINO.has(resname), occupancy });
} if (!selected.size || selected.size > 60000)
    throw Error("Use a first-model PDB with 1–60,000 atoms."); return [...selected.values()]; }
function bounds(rows: PdbAtom[]) { const min = {} as Vec, max = {} as Vec, center = {} as Vec; for (const [i, axis] of (["x", "y", "z"] as const).entries()) {
    min[axis] = Math.min(...rows.map(a => a.xyz[i]));
    max[axis] = Math.max(...rows.map(a => a.xyz[i]));
    center[axis] = (min[axis] + max[axis]) / 2;
} return { min, max, center }; }
export function inspectPdb(text: string): NonNullable<Asset["metadata"]> { const rows = pdbAtoms(text), protein = rows.filter(a => a.protein); if (protein.length < 20)
    throw Error("No supported protein chain found. Browser preparation accepts the 20 standard amino acids."); const groups = new Map<string, PdbAtom[]>(); for (const a of rows.filter(a => !a.protein && a.element !== "H")) {
    const key = [a.chain, a.resid, a.resname].join(":");
    groups.set(key, [...(groups.get(key) ?? []), a]);
} const nonProtein = [...groups.values()].map(g => ({ chain: g[0].chain, resid: g[0].resid, name: g[0].resname, atoms: g.length })); const sites = [...groups.entries()].filter(([, g]) => g.length >= 4 && g.length <= 150 && !['HOH', 'WAT', 'DOD'].includes(g[0].resname)).map(([id, g]) => { const b = bounds(g); return { id, label: `${g[0].resname} · chain ${g[0].chain} · residue ${g[0].resid}`, chain: g[0].chain, center: b.center, size: { x: Math.max(12, b.max.x - b.min.x + 10), y: Math.max(12, b.max.y - b.min.y + 10), z: Math.max(12, b.max.z - b.min.z + 10) } }; }); return { atoms: rows.length, chains: [...new Set(protein.map(a => a.chain))].sort().map(id => ({ id, atoms: protein.filter(a => a.chain === id).length })), sites, nonProtein: nonProtein.slice(0, 500), nonProteinCount: nonProtein.length, bounds: bounds(protein), warnings: ["First model, highest occupancy alternate locations; first record breaks ties.", "Co-crystal sites are suggestions, not validated pockets."] }; }
export function cleanProtein(text: string, chains: string[]) { const rows = pdbAtoms(text); if (rows.some(a => chains.includes(a.chain) && a.line.startsWith("ATOM") && !a.protein))
    throw Error("Resolve unsupported/nonstandard protein residues before browser preparation."); const kept = rows.filter(a => a.protein && chains.includes(a.chain) && a.element !== "H"); if (kept.length < 20 || kept.length > 20000)
    throw Error("Select 20–20,000 protein heavy atoms for browser preparation."); const residues = new Map<string, Set<string>>(); for (const a of kept) {
    const key = [a.chain, a.resid, a.resname].join(":");
    if (!residues.has(key))
        residues.set(key, new Set());
    residues.get(key)!.add(a.name);
} for (const [key, names] of residues) {
    const res = key.split(":").at(-1)!;
    for (const atom of ("N CA C O " + required[res]).trim().split(/\s+/))
        if (!names.has(atom))
            throw Error(`Missing protein heavy atom ${key} ${atom}. Browser mode adds hydrogens but does not rebuild missing atoms/loops. Supply a repaired PDB or use advanced native preparation.`);
} return kept.map(a => a.line).join("\n") + "\nEND\n"; }
export interface QtAtom {
    serial: number;
    name: string;
    residue: string;
    resname: string;
    xyz: number[];
    type: string;
}
export function qtAtoms(text: string): QtAtom[] { return text.split(/\r?\n/).filter(l => /^(ATOM {2}|HETATM)/.test(l)).map(l => { const xyz = [30, 38, 46].map(i => Number(l.slice(i, i + 8))), serial = Number(l.slice(6, 11)), type = l.trim().split(/\s+/).at(-1)!; if (!Number.isSafeInteger(serial) || xyz.some(n => !Number.isFinite(n) || Math.abs(n) >= 10000) || !Number.isFinite(Number(l.slice(70, 76))))
    throw Error("Invalid prepared PDBQT atom."); const resname = l.slice(17, 20).trim(); return { serial, name: l.slice(12, 16).trim(), resname, residue: `${l.slice(21, 22).trim() || "_"}:${l.slice(22, 27).trim()}:${resname}`, xyz, type }; }); }
export function receptorCarbons(text: string) { return qtAtoms(text).filter(a => ["C", "A"].includes(a.type) && (carbon[a.resname] ?? "").split(" ").includes(a.name)).map(a => a.serial); }
export function sdfGraph(text: string) { const lines = text.replace(/\r/g, "").split("\n"); if ((text.match(/\$\$\$\$/g) ?? []).length > 1 || !lines[3]?.includes("V2000"))
    throw Error("Browser pose restoration requires one V2000 SDF molecule."); const n = Number(lines[3].slice(0, 3)), b = Number(lines[3].slice(3, 6)); if (!Number.isSafeInteger(n) || n < 1 || n > 250 || !Number.isSafeInteger(b) || b < 0)
    throw Error("Invalid ligand SDF counts."); const elements = lines.slice(4, 4 + n).map(l => l.slice(31, 34).trim()), xyz = lines.slice(4, 4 + n).map(l => [0, 10, 20].map(i => Number(l.slice(i, i + 10)))); if (elements.length !== n || elements.some(e => !["C", "N", "O", "S", "P", "F", "Cl", "Br", "I", "H"].includes(e)) || xyz.some(v => v.some(n => !Number.isFinite(n))))
    throw Error("Unsupported or invalid SDF atoms."); const neighbors = elements.map(() => [] as number[]); for (const l of lines.slice(4 + n, 4 + n + b)) {
    const a = Number(l.slice(0, 3)) - 1, c = Number(l.slice(3, 6)) - 1;
    if (!neighbors[a] || !neighbors[c] || a === c)
        throw Error("Invalid SDF bond.");
    neighbors[a].push(c);
    neighbors[c].push(a);
} return { lines, n, elements, xyz, neighbors }; }
export function ligandCarbons(sdf: string, pdbqt: string) { const g = sdfGraph(sdf), atoms = qtAtoms(pdbqt); const heavy = g.elements.map((e, i) => ({ e, i })).filter(a => a.e !== "H"); for (const { i, e } of heavy) {
    const q = atoms.find(a => a.serial === i + 1);
    if (!q || Math.hypot(...q.xyz.map((v, j) => v - g.xyz[i][j])) > .002 || (["C", "A"].includes(q.type) ? "C" : q.type.replace(/A$/, "")).toLowerCase() !== e.toLowerCase())
        throw Error("Open Babel atom-index mapping did not preserve the prepared ligand. Results withheld.");
} return heavy.filter(({ e, i }) => e === "C" && g.neighbors[i].every(j => ["C", "H"].includes(g.elements[j]))).map(a => a.i + 1); }
export function restoreSdf(template: string, pose: string) { const g = sdfGraph(template), atoms = qtAtoms(pose), byId = new Map(atoms.map(a => [a.serial, a])); const coords: number[][] = []; for (let i = 0; i < g.n; i++) {
    if (g.elements[i] === "H")
        throw Error("Pose templates must contain heavy atoms only.");
    const a = byId.get(i + 1);
    if (!a)
        throw Error("Docked heavy atom missing.");
    coords.push(a.xyz);
    g.lines[4 + i] = a.xyz.map(v => v.toFixed(4).padStart(10)).join("") + g.lines[4 + i].slice(30);
} return { sdf: g.lines.join("\n"), coords }; }
export function vinaPoses(text: string, maximum: number) { const blocks = text.split(/(?=^MODEL\s)/m).filter(s => s.startsWith("MODEL")); if (!blocks.length || blocks.length > maximum)
    throw Error("Vina returned an invalid pose count."); return blocks.map((block, i) => { const match = block.match(/REMARK VINA RESULT:\s+([-+\d.eE]+)\s+([-+\d.eE]+)\s+([-+\d.eE]+)/); if (!match || match.slice(1).some(v => !Number.isFinite(Number(v))))
    throw Error("Missing/invalid Vina scores."); return { block, rank: i + 1, affinity: Number(match[1]), rmsdLower: Number(match[2]), rmsdUpper: Number(match[3]) }; }); }
const distance = (a: number[], b: number[]) => Math.hypot(...a.map((n, i) => n - b[i]));
export function interactionReview(receptor: string, ligand: string, recCarbons: number[], ligCarbons: number[]): Pick<Pose, "contacts" | "method" | "truncated"> {
    const rec = qtAtoms(receptor), lig = qtAtoms(ligand), found: Contact[] = [];
    function bonds(rows: QtAtom[]) { const ds = rows.filter(a => ["N", "NA", "O", "OA", "S", "SA"].includes(a.type)); return rows.filter(a => a.type === "HD").flatMap(h => { let d: QtAtom | undefined, best = 1.35; for (const a of ds) {
        const v = distance(a.xyz, h.xyz);
        if (v <= best) {
            d = a;
            best = v;
        }
    } return d ? [{ d, h }] : []; }); }
    function hbs(donors: ReturnType<typeof bonds>, acceptors: QtAtom[], ligandDonor: boolean) { for (const { d, h } of donors)
        for (const a of acceptors.filter(a => ["NA", "OA", "SA"].includes(a.type))) {
            const da = distance(d.xyz, a.xyz), ha = distance(h.xyz, a.xyz);
            if (da > 3.5 || ha > 2.5 || ha === 0)
                continue;
            const x = d.xyz.map((v, i) => v - h.xyz[i]), y = a.xyz.map((v, i) => v - h.xyz[i]);
            const cos = x.reduce((n, v, i) => n + v * y[i], 0) / (Math.hypot(...x) * Math.hypot(...y)), angle = Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
            if (angle < 120)
                continue;
            const l = ligandDonor ? d : a, r = ligandDonor ? a : d;
            found.push({ type: "hydrogen-bond candidate", residue: r.residue, receptorAtom: r.name, ligandAtom: l.serial, distance: Math.round(da * 1000) / 1000, angle: Math.round(angle * 100) / 100, ligandDonor, ligandPosition: l.xyz, receptorPosition: r.xyz });
        } }
    hbs(bonds(lig), rec, true);
    hbs(bonds(rec), lig, false);
    const rc = new Set(recCarbons), lc = new Set(ligCarbons), nearest = new Map<string, Contact>();
    for (const l of lig.filter(a => lc.has(a.serial)))
        for (const r of rec.filter(a => rc.has(a.serial))) {
            const dist = distance(l.xyz, r.xyz);
            if (dist > 4)
                continue;
            const key = r.residue + ":" + l.serial;
            if (!nearest.has(key) || nearest.get(key)!.distance > dist)
                nearest.set(key, { type: "hydrophobic carbon contact", residue: r.residue, receptorAtom: r.name, ligandAtom: l.serial, distance: Math.round(dist * 1000) / 1000, angle: null, ligandDonor: null, ligandPosition: l.xyz, receptorPosition: r.xyz });
        }
    found.push(...nearest.values());
    found.sort((a, b) => a.type.localeCompare(b.type) || a.distance - b.distance);
    return { contacts: found.slice(0, 2000), truncated: found.length > 2000, method: "browser-geometry-v1: PDBQT N/O/S–HD donor bond <=1.35 A; D–A <=3.5 A, H–A <=2.5 A, D–H–A >=120 degrees. Hydrophobic C/H-only carbons from standard amino-acid connectivity templates and the ligand SDF bond graph; carbon contact <=4 A, nearest receptor atom per residue/ligand carbon. Geometric review signals, not experimental or PLIP annotations." };
}
export function validateGrid(grid: Grid) { for (const a of ["x", "y", "z"] as const)
    if (!Number.isFinite(grid?.center?.[a]) || Math.abs(grid.center[a]) > 10000 || !Number.isFinite(grid?.size?.[a]) || grid.size[a] < 6 || grid.size[a] > 40)
        throw Error("Use finite box centers and sides of 6–40 Angstrom."); if (grid.size.x * grid.size.y * grid.size.z > 40000)
    throw Error("Grid volume exceeds 40,000 cubic Angstrom."); }
