import { create } from "zustand";
import type { Atom, BondType, Molecule } from "../types/chem";
import { emptyMolecule } from "../models/Molecule";
import { useHistoryStore } from "./historyStore";
import { useUIStore } from "./chemUIStore";
import { makeRing } from "../engine/rings";
import { saveMolecule, loadMolecule } from "../utils/storage";
interface MoleculeState {
  molecule: Molecule;
  selectedAtoms: string[];
  selectedBonds: string[];
  savedFingerprint: string;
  dragStart: Molecule | null;
  setSelection: (atoms: string[], bonds?: string[]) => void;
  mutate: (label: string, fn: (m: Molecule) => void) => void;
  addAtom: (x: number, y: number, element: string) => void;
  patchAtom: (id: string, patch: Partial<Atom>) => void;
  addBond: (a: string, b: string, type: BondType) => void;
  patchBond: (id: string, type: BondType) => void;
  remove: (atoms: string[], bonds: string[]) => void;
  addRing: (x: number, y: number, size: 5 | 6, aromatic: boolean) => void;
  beginDrag: () => void;
  moveAtoms: (positions: Map<string, { x: number; y: number }>) => void;
  endDrag: (cancel?: boolean) => void;
  undo: () => void;
  redo: () => void;
  newMolecule: () => void;
  save: () => void;
  restore: () => void;
  replace: (m: Molecule) => void;
  rename: (name: string) => void;
}
export function fingerprint(m: Molecule) {
  return JSON.stringify({
    atoms: m.atoms,
    bonds: m.bonds,
    name: m.metadata.name,
  });
}
const initial = emptyMolecule();
function normalize(m: Molecule) {
  const aromaticIds = new Set(
    m.bonds
      .filter((b) => b.type === "aromatic")
      .flatMap((b) => [b.atomA, b.atomB]),
  );
  for (const a of m.atoms) a.aromatic = aromaticIds.has(a.id);
  m.metadata.updatedAt = new Date().toISOString();
}
export const useMoleculeStore = create<MoleculeState>((set, get) => ({
  molecule: initial,
  selectedAtoms: [],
  selectedBonds: [],
  savedFingerprint: fingerprint(initial),
  dragStart: null,
  setSelection: (selectedAtoms, selectedBonds = []) =>
    set({ selectedAtoms, selectedBonds }),
  mutate: (label, fn) => {
    const before = get().molecule,
      next = structuredClone(before);
    fn(next);
    if (next.atoms.length > 1500 || next.bonds.length > 6000) {
      useUIStore
        .getState()
        .notify("Structure limit: 1,500 atoms / 6,000 bonds.");
      return;
    }
    normalize(next);
    if (fingerprint(before) === fingerprint(next)) return;
    useHistoryStore.getState().record(before, label);
    set({ molecule: next });
  },
  addAtom: (x, y, element) =>
    get().mutate("Add atom", (m) =>
      m.atoms.push({
        id: crypto.randomUUID(),
        element,
        x,
        y,
        charge: 0,
        aromatic: false,
        lonePairs: 0,
      }),
    ),
  patchAtom: (id, patch) =>
    get().mutate("Edit atom", (m) => {
      const a = m.atoms.find((a) => a.id === id);
      if (a) Object.assign(a, { ...patch, id: a.id });
    }),
  addBond: (a, b, type) => {
    if (a === b) return;
    get().mutate("Add bond", (m) => {
      if (!m.atoms.some((v) => v.id === a) || !m.atoms.some((v) => v.id === b))
        return;
      const existing = m.bonds.find(
        (v) =>
          (v.atomA === a && v.atomB === b) || (v.atomA === b && v.atomB === a),
      );
      if (existing) existing.type = type;
      else m.bonds.push({ id: crypto.randomUUID(), atomA: a, atomB: b, type });
    });
  },
  patchBond: (id, type) =>
    get().mutate("Change bond", (m) => {
      const b = m.bonds.find((b) => b.id === id);
      if (b) b.type = type;
    }),
  remove: (atoms, bonds) => {
    const a = new Set(atoms),
      b = new Set(bonds);
    get().mutate("Delete selection", (m) => {
      m.atoms = m.atoms.filter((v) => !a.has(v.id));
      m.bonds = m.bonds.filter(
        (v) => !b.has(v.id) && !a.has(v.atomA) && !a.has(v.atomB),
      );
    });
    set({ selectedAtoms: [], selectedBonds: [] });
    if (a.has(useUIStore.getState().pendingAtom || ""))
      useUIStore.getState().set({ pendingAtom: null });
  },
  addRing: (x, y, size, aromatic) =>
    get().mutate(aromatic ? "Add benzene" : "Add ring", (m) => {
      const r = makeRing(x, y, size, aromatic);
      m.atoms.push(...r.atoms);
      m.bonds.push(...r.bonds);
    }),
  beginDrag: () => set({ dragStart: structuredClone(get().molecule) }),
  moveAtoms: (positions) =>
    set((s) => ({
      molecule: {
        ...s.molecule,
        atoms: s.molecule.atoms.map((a) =>
          positions.has(a.id) ? { ...a, ...positions.get(a.id) } : a,
        ),
      },
    })),
  endDrag: (cancel) => {
    const before = get().dragStart;
    if (!before) return;
    if (cancel) set({ molecule: before });
    else if (fingerprint(before) !== fingerprint(get().molecule))
      useHistoryStore.getState().record(before, "Move atoms");
    set({ dragStart: null });
  },
  undo: () => {
    get().endDrag(true);
    const m = useHistoryStore.getState().undo(get().molecule);
    if (m) set({ molecule: m, selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({ pendingAtom: null });
  },
  redo: () => {
    get().endDrag(true);
    const m = useHistoryStore.getState().redo(get().molecule);
    if (m) set({ molecule: m, selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({ pendingAtom: null });
  },
  newMolecule: () => {
    get().mutate("New molecule", (m) => Object.assign(m, emptyMolecule()));
    set({ selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({
      pendingAtom: null,
      pan: { x: 0, y: 0 },
      zoom: 1,
      tool: "draw",
      atom: "C",
    });
  },
  save: () => {
    try {
      saveMolecule(get().molecule);
      set({ savedFingerprint: fingerprint(get().molecule) });
      useUIStore.getState().notify("Saved on this device.");
    } catch (e) {
      useUIStore.getState().notify((e as Error).message);
    }
  },
  restore: () => {
    try {
      const m = loadMolecule();
      if (m) {
        get().replace(m);
        set({ savedFingerprint: fingerprint(m) });
        useUIStore.getState().notify("Saved structure restored.");
      } else useUIStore.getState().notify("No saved structure on this device.");
    } catch (e) {
      useUIStore.getState().notify((e as Error).message);
    }
  },
  replace: (m) => {
    get().mutate("Load molecule", (next) =>
      Object.assign(next, structuredClone(m)),
    );
    set({ selectedAtoms: [], selectedBonds: [] });
    const ui = useUIStore.getState();
    ui.set({
      pendingAtom: null,
      fitVersion: ui.fitVersion + 1,
      tool: "select",
    });
  },
  rename: (name) =>
    get().mutate("Rename molecule", (m) => {
      m.metadata.name = name.trim() || "Untitled molecule";
    }),
}));
