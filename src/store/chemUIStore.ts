import { create } from "zustand";
import type { WorkspaceTool, Point, Dialog } from "../types/editor";
import type { BondType } from "../types/chem";
import { readPreference, writePreference } from "../utils/storage";
interface UIState {
  tool: WorkspaceTool;
  atom: string;
  bond: BondType;
  ring: 5 | 6;
  benzene: boolean;
  chargeDelta: number;
  zoom: number;
  pan: Point;
  cursor: Point;
  theme: "light" | "dark";
  expanded: boolean;
  showCarbons: boolean;
  showHydrogens: boolean;
  showGrid: boolean;
  dialog: Dialog;
  pendingAtom: string | null;
  fitVersion: number;
  toast: string;
  set: (patch: Partial<Omit<UIState, "set" | "notify" | "setTheme">>) => void;
  notify: (message: string) => void;
  setTheme: (theme: "light" | "dark") => void;
}
let timer: ReturnType<typeof setTimeout>;
export const useUIStore = create<UIState>((set) => ({
  tool: "draw",
  atom: "C",
  bond: "single",
  ring: 6,
  benzene: true,
  chargeDelta: 1,
  zoom: 1,
  pan: { x: 0, y: 0 },
  cursor: { x: 0, y: 0 },
  theme:
    readPreference(
      "chemease.theme",
      typeof matchMedia !== "undefined" &&
        matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    ) === "dark"
      ? "dark"
      : "light",
  expanded: true,
  showCarbons: readPreference("chemease.showCarbons", "false") === "true",
  showHydrogens: readPreference("chemease.showHydrogens", "true") === "true",
  showGrid: true,
  dialog: null,
  pendingAtom: null,
  fitVersion: 0,
  toast: "",
  set: (patch) => {
    if (patch.showCarbons !== undefined) writePreference("chemease.showCarbons", String(patch.showCarbons));
    if (patch.showHydrogens !== undefined) writePreference("chemease.showHydrogens", String(patch.showHydrogens));
    set(patch);
  },
  notify: (message) => {
    clearTimeout(timer);
    set({ toast: message });
    timer = setTimeout(() => set({ toast: "" }), 4500);
  },
  setTheme: (theme) => {
    writePreference("chemease.theme", theme);
    set({ theme });
  },
}));
