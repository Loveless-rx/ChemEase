import { useEffect } from "react";
import { useMoleculeStore } from "../store/moleculeStore";
import { useUIStore } from "../store/chemUIStore";
export function useKeyboardShortcuts() {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.matches(
          "input,textarea,select,[contenteditable=true]",
        )
      )
        return;
      const u = useUIStore.getState(),
        m = useMoleculeStore.getState();
      if (u.dialog) return;
      const k = e.key.toLowerCase(),
        mod = e.ctrlKey || e.metaKey;
      if (mod) {
        if (["z", "y", "s", "n"].includes(k)) e.preventDefault();
        if (k === "z") {
          if (e.shiftKey) m.redo();
          else m.undo();
        } else if (k === "y") m.redo();
        else if (k === "s") m.save();
        else if (k === "n") u.set({ dialog: "new" });
        return;
      }
      if (e.altKey) return;
      if (k === "delete" || k === "backspace") {
        e.preventDefault();
        m.remove(m.selectedAtoms, m.selectedBonds);
      } else if (k === "escape") {
        u.set({ pendingAtom: null, tool: "select" });
        m.setSelection([]);
      } else if (["v", "e", "l"].includes(k)) {
        u.set({
          tool: ({ v: "select", e: "erase", l: "lasso" } as const)[
            k as "v" | "e" | "l"
          ],
          pendingAtom: null,
        });
      } else if (["1", "2", "3"].includes(k)) {
        u.set({
          tool: "bond",
          bond: ({ "1": "single", "2": "double", "3": "triple" } as const)[
            k as "1" | "2" | "3"
          ],
          pendingAtom: null,
        });
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
}
