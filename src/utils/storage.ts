import { convertLegacySnapshot } from "./legacyImport";
import type { Molecule } from "../types/chem";
export const STORAGE_KEY = "chemease.molecule.v1";
export function readPreference(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
export function parseMolecule(raw: string): Molecule {
  const m = convertLegacySnapshot(JSON.parse(raw)) as ReturnType<
    typeof JSON.parse
  >;
  if (
    !m ||
    m.version !== 1 ||
    !Array.isArray(m.atoms) ||
    !Array.isArray(m.bonds) ||
    m.atoms.length > 1500 ||
    m.bonds.length > 6000
  )
    throw new Error(
      "Invalid ChemEase JSON or structure exceeds 1,500 atoms / 6,000 bonds.",
    );
  const ids = new Set<string>();
  for (const a of m.atoms) {
    if (
      !a ||
      typeof a.id !== "string" ||
      ids.has(a.id) ||
      typeof a.element !== "string" ||
      !/^[A-Z][a-z]?$/.test(a.element) ||
      !Number.isFinite(a.x) ||
      !Number.isFinite(a.y) ||
      Math.abs(a.x) > 1e6 ||
      Math.abs(a.y) > 1e6 ||
      !Number.isInteger(a.charge) ||
      Math.abs(a.charge) > 8 ||
      typeof a.aromatic !== "boolean"
    )
      throw new Error("Invalid atom data.");
    ids.add(a.id);
    if (
      a.isotope !== undefined &&
      (!Number.isInteger(a.isotope) || a.isotope < 1 || a.isotope > 300)
    )
      throw new Error("Invalid isotope.");
    if (
      a.hydrogenOverride !== undefined &&
      (!Number.isInteger(a.hydrogenOverride) ||
        a.hydrogenOverride < 0 ||
        a.hydrogenOverride > 8)
    )
      throw new Error("Invalid hydrogen count.");
    if (a.stereo !== undefined && !["@", "@@"].includes(a.stereo))
      throw new Error("Invalid atom stereochemistry.");
    a.lonePairs = a.lonePairs ?? 0;
    if (!Number.isInteger(a.lonePairs) || a.lonePairs < 0 || a.lonePairs > 8)
      throw new Error("Invalid lone-pair count.");
  }
  const bondIds = new Set<string>(),
    pairs = new Set<string>();
  for (const b of m.bonds) {
    if (!b) throw new Error("Invalid bond data.");
    const pair = [b.atomA, b.atomB].sort().join("|");
    if (
      !b ||
      typeof b.id !== "string" ||
      bondIds.has(b.id) ||
      pairs.has(pair) ||
      !ids.has(b.atomA) ||
      !ids.has(b.atomB) ||
      b.atomA === b.atomB ||
      !["single", "double", "triple", "aromatic"].includes(b.type) ||
      (b.stereo !== undefined && !["up", "down"].includes(b.stereo))
    )
      throw new Error("Invalid or duplicate bond.");
    bondIds.add(b.id);
    pairs.add(pair);
  }
  return {
    version: 1,
    atoms: m.atoms.map((a: Molecule["atoms"][number]) => ({
      id: a.id,
      element: a.element,
      x: a.x,
      y: a.y,
      charge: a.charge,
      aromatic: a.aromatic,
      lonePairs: a.lonePairs,
      isotope: a.isotope,
      hydrogenOverride: a.hydrogenOverride,
      stereo: a.stereo,
    })),
    bonds: m.bonds.map((b: Molecule["bonds"][number]) => ({
      id: b.id,
      atomA: b.atomA,
      atomB: b.atomB,
      type: b.type,
      stereo: b.stereo,
    })),
    metadata: {
      name:
        typeof m.metadata?.name === "string"
          ? m.metadata.name.slice(0, 120)
          : "Imported molecule",
      createdAt:
        typeof m.metadata?.createdAt === "string"
          ? m.metadata.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}
export function saveMolecule(m: Molecule) {
  if (!writePreference(STORAGE_KEY, JSON.stringify(m)))
    throw new Error(
      "Browser storage unavailable or full. Export JSON to keep your work.",
    );
}
export function loadMolecule() {
  const raw = readPreference(STORAGE_KEY, "");
  return raw ? parseMolecule(raw) : null;
}
