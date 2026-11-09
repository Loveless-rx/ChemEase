import type { MainModule, Mol } from "@rdkit/rdkit";
import type { Molecule } from "../models/Molecule";
import { emptyMolecule } from "../models/Molecule";
import { ELEMENTS } from "../utils/elementData";
import { valenceMap } from "./valence";
import { validateMolecule } from "./validation";

export interface ToolkitResult {
  smiles: string;
  logP: number;
  tpsa: number;
  molarRefractivity: number;
  donors: number;
  acceptors: number;
  rotatable: number;
  rings: number;
  heavyAtoms: number;
  charge: number;
  weight: number;
  engine: string;
}
export function parseSmilesFile(raw: string) {
  if (raw.length > 20000) throw new Error("SMILES files are limited to 20 KB.");
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith("#"));
  if (lines.length !== 1) throw new Error("Import one molecule at a time. Choose a SMILES file with a single entry.");
  const [smiles, ...name] = lines[0].split(/\s+/);
  return {smiles, name: name.join(" ").slice(0,120)};
}
interface JsonAtom { z?: number; impHs?: number; chg?: number; nRad?: number; isotope?: number; stereo?: string }
interface JsonBond { atoms: [number, number]; bo?: number; stereo?: string }
interface JsonMol {
  atoms: JsonAtom[]; bonds: JsonBond[];
  conformers?: { coords: number[][] }[];
  extensions?: { name: string; aromaticAtoms?: number[]; aromaticBonds?: number[] }[];
}
interface ToolkitJson { defaults: { atom: JsonAtom; bond: Partial<JsonBond> }; molecules: JsonMol[] }
export function chemistryKey(m: Molecule) {
  return JSON.stringify({atoms: m.atoms.map(a => ({...a, x: 0, y: 0})), bonds: m.bonds});
}
export function toolkitMol(rdkit: MainModule, m: Molecule): Mol {
  if (!m.atoms.length) throw new Error("Draw or import a structure first.");
  if (m.atoms.length > 1500 || m.bonds.length > 6000) throw new Error("Structure exceeds the editor limits.");
  if (m.atoms.some(a => a.element === "R" || !ELEMENTS[a.element]?.number)) throw new Error("Replace unspecified or unsupported atoms before calculating descriptors.");
  if (m.atoms.some(a => a.stereo) || m.bonds.some(b => b.stereo)) throw new Error("Stereo annotations cannot yet be exported faithfully by this editor.");
  if (validateMolecule(m).some(w => w.severity === "error" || /Incomplete aromatic|Unsupported aromatic/.test(w.message))) throw new Error("Invalid bonds or incomplete aromatic rings: resolve these before calculating descriptors.");
  const vals = valenceMap(m);
  const indices = new Map(m.atoms.map((a, i) => [a.id, i]));
  const atoms = m.atoms.map(a => {
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y)) throw new Error("Invalid atom coordinates.");
    const z = ELEMENTS[a.element]?.number;
    if (!z || a.element === "R") throw new Error("Replace unspecified or unsupported atoms before calculating descriptors.");
    const v = vals.get(a.id)!;
    if (v.over) throw new Error("Resolve over-valent atoms before calculating descriptors.");
    return { z, chg: a.charge, isotope: a.isotope ?? 0, impHs: v.implicitH };
  });
  const pairs = new Set<string>();
  const bonds = m.bonds.map(b => {
    const a = indices.get(b.atomA), c = indices.get(b.atomB);
    const pair = [a, c].sort().join(":");
    if (a === undefined || c === undefined || a === c || pairs.has(pair)) throw new Error("Invalid or duplicate bond in the structure.");
    pairs.add(pair);
    return { atoms: [a, c], bo: b.type === "triple" ? 3 : b.type === "double" ? 2 : 1 };
  });
  const json = { rdkitjson: { version: 12 }, defaults: { atom: { z: 6, impHs: 0, chg: 0, nRad: 0, isotope: 0, stereo: "unspecified" }, bond: { bo: 1, stereo: "unspecified" } }, molecules: [{ atoms, bonds, conformers: [{dim: 2, coords: "COORDINATES"}], extensions: [{ name: "rdkitRepresentation", formatVersion: 2, aromaticAtoms: m.atoms.flatMap((a,i) => a.aromatic ? [i] : []), aromaticBonds: m.bonds.flatMap((b,i) => b.type === "aromatic" ? [i] : []) }] }] };
  // RDKit's JSON coordinate reader requires floating-point JSON tokens, including zero.
  const coords = `[${m.atoms.map(a => `[${(a.x / 40).toFixed(6)},${(-a.y / 40).toFixed(6)}]`).join(",")}]`;
  let mol: Mol | null = null;
  try { mol = rdkit.get_mol(JSON.stringify(json).replace('"COORDINATES"', coords)); } catch { /* Report a useful error below. */ }
  if (!mol || !mol.is_valid()) { mol?.delete(); throw new Error("RDKit could not validate this structure. Review bonds, charges and aromatic rings."); }
  return mol;
}
export function calculateToolkit(rdkit: MainModule, m: Molecule): ToolkitResult {
  const mol = toolkitMol(rdkit, m);
  try {
    const d = JSON.parse(mol.get_descriptors()) as Record<string, number>;
    const read = (key: string) => { if (!Number.isFinite(d[key])) throw new Error(`Descriptor ${key} is unavailable.`); return d[key]; };
    return { smiles: mol.get_smiles(), logP: read("CrippenClogP"), tpsa: read("tpsa"), molarRefractivity: read("CrippenMR"), donors: read("NumHBD"), acceptors: read("NumHBA"), rotatable: read("NumRotatableBonds"), rings: read("NumRings"), heavyAtoms: read("NumHeavyAtoms"), charge: m.atoms.reduce((s,a) => s + a.charge, 0), weight: read("amw"), engine: `RDKit ${rdkit.version()}` };
  } finally { mol.delete(); }
}
export function importSmiles(rdkit: MainModule, input: string, name = "SMILES molecule"): Molecule {
  const text = input.trim();
  if (!text || text.length > 10000 || /\s|\|/.test(text)) throw new Error("Enter one SMILES string (up to 10,000 characters), without a name or CXSMILES annotations.");
  if (/[@/\\]/.test(text)) throw new Error("Stereo-specific SMILES cannot yet be edited faithfully. Use input without stereo annotations.");
  let mol: Mol | null = null;
  try { mol = rdkit.get_mol(text); } catch { /* Handled below. */ }
  if (!mol || !mol.is_valid()) { mol?.delete(); throw new Error("Invalid SMILES. Check atom symbols, brackets, ring numbers and valence."); }
  try {
    if (mol.get_num_atoms() > 1500 || mol.get_num_bonds() > 6000) throw new Error("SMILES exceeds the editor's atom or bond limits.");
    mol.set_new_coords();
    const json = JSON.parse(mol.get_json()) as ToolkitJson;
    const graph = json.molecules[0];
    const ext = graph.extensions?.find(e => e.name === "rdkitRepresentation");
    const aromaticAtoms = new Set(ext?.aromaticAtoms ?? []), aromaticBonds = new Set(ext?.aromaticBonds ?? []);
    const result = emptyMolecule();
    result.metadata.name = name.trim().slice(0,120) || "SMILES molecule";
    const targetH: number[] = [];
    result.atoms = graph.atoms.map((item, i) => {
      const a = {...json.defaults.atom, ...item};
      if (a.nRad) throw new Error("Radical structures are not supported by this editor yet.");
      if (a.stereo && a.stereo !== "unspecified") throw new Error("Stereochemical SMILES cannot yet be edited faithfully. Import a structure without stereo annotations.");
      const element = Object.entries(ELEMENTS).find(([,e]) => e.number === a.z)?.[0];
      if (!element || !a.z) throw new Error("SMILES contains an element or wildcard unsupported by the editor.");
      const xy = graph.conformers?.[0]?.coords[i];
      if (!xy || !xy.every(Number.isFinite)) throw new Error("Could not generate 2D coordinates.");
      targetH[i] = a.impHs ?? 0;
      return {id: crypto.randomUUID(), element, x: xy[0] * 40, y: -xy[1] * 40, charge: a.chg ?? 0, isotope: a.isotope || undefined, aromatic: aromaticAtoms.has(i), lonePairs: 0};
    });
    result.bonds = graph.bonds.map((item,i) => {
      const b = {...json.defaults.bond, ...item};
      if (b.stereo && b.stereo !== "unspecified") throw new Error("Stereochemical bonds are not supported by this editor yet.");
      if (![1,2,3].includes(b.bo ?? 1)) throw new Error("This SMILES uses an unsupported bond type.");
      return {id: crypto.randomUUID(), atomA: result.atoms[item.atoms[0]].id, atomB: result.atoms[item.atoms[1]].id, type: aromaticBonds.has(i) ? "aromatic" : b.bo === 3 ? "triple" : b.bo === 2 ? "double" : "single"};
    });
    const inferred = valenceMap(result);
    result.atoms.forEach((a,i) => { if (inferred.get(a.id)?.implicitH !== targetH[i]) a.hydrogenOverride = targetH[i]; });
    const check = toolkitMol(rdkit, result);
    try { if (check.get_smiles() !== mol.get_smiles()) throw new Error("The editor cannot preserve this SMILES faithfully. No changes were made."); } finally { check.delete(); }
    return result;
  } finally { mol.delete(); }
}
export function estimateLogD(logP: number, pH: number, pKa: number, kind: "acid" | "base") {
  if (![logP, pH, pKa].every(Number.isFinite) || pH < 0 || pH > 14 || pKa < -20 || pKa > 30) throw new Error("Enter pH from 0 to 14 and pKa from −20 to 30.");
  const exponent = kind === "acid" ? pH - pKa : pKa - pH;
  // Stable log10(1 + 10^x), even for extreme pKa inputs.
  return logP - Math.max(0, exponent) - Math.log10(1 + 10 ** -Math.abs(exponent));
}
