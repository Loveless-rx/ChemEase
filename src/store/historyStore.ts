import { create } from "zustand";
import type { Molecule } from "../types/chem";
import type { HistoryEntry } from "../models/History";
import { HISTORY_LIMIT } from "../utils/canvasConfig";
interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  record: (m: Molecule, label: string) => void;
  undo: (current: Molecule) => Molecule | null;
  redo: (current: Molecule) => Molecule | null;
  clear: () => void;
}
export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  record: (m, label) =>
    set((s) => ({
      past: [...s.past, { molecule: structuredClone(m), label }].slice(
        -HISTORY_LIMIT,
      ),
      future: [],
    })),
  undo: (current) => {
    const { past, future } = get();
    const entry = past.at(-1);
    if (!entry) return null;
    set({
      past: past.slice(0, -1),
      future: [
        ...future,
        { molecule: structuredClone(current), label: entry.label },
      ],
    });
    return structuredClone(entry.molecule);
  },
  redo: (current) => {
    const { past, future } = get();
    const entry = future.at(-1);
    if (!entry) return null;
    set({
      future: future.slice(0, -1),
      past: [
        ...past,
        { molecule: structuredClone(current), label: entry.label },
      ],
    });
    return structuredClone(entry.molecule);
  },
  clear: () => set({ past: [], future: [] }),
}));
