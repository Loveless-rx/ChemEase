import {
  useEffect,
  useCallback,
  useRef,
  useState,
  type RefObject,
  type PointerEvent as RPointerEvent,
} from "react";
import { useUIStore } from "../store/chemUIStore";
import { useMoleculeStore } from "../store/moleculeStore";
import {
  screenToWorld,
  targetId,
} from "../Components/canvas/canvasInteractions";
import { pointInRect } from "../engine/geometry";
import type { Point } from "../types/editor";
interface Gesture {
  kind: "move" | "pan" | "lasso";
  start: Point;
  screen: Point;
  pan: Point;
  positions: Map<string, Point>;
  additive: boolean;
  selection: string[];
  pointerId: number;
}
export function useCanvasInteraction(ref: RefObject<SVGSVGElement | null>) {
  const gesture = useRef<Gesture | null>(null),
    space = useRef(false);
  const [lasso, setLasso] = useState<{ a: Point; b: Point } | null>(null);
  const point = (e: { clientX: number; clientY: number }) => {
    const u = useUIStore.getState();
    return screenToWorld(
      e.clientX,
      e.clientY,
      ref.current!.getBoundingClientRect(),
      u.pan,
      u.zoom,
    );
  };
  const cancel = useCallback(() => {
    const g = gesture.current;
    if (g?.kind === "move") useMoleculeStore.getState().endDrag(true);
    if (g?.kind === "pan") useUIStore.getState().set({ pan: g.pan });
    if (g && ref.current?.hasPointerCapture(g.pointerId))
      ref.current.releasePointerCapture(g.pointerId);
    gesture.current = null;
    setLasso(null);
  }, [ref]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        useUIStore.getState().dialog ||
        (e.target as HTMLElement)?.matches("input,textarea,select")
      )
        return;
      if (e.code === "Space") {
        space.current = true;
        e.preventDefault();
      }
      if (
        e.key === "Escape" ||
        ((e.ctrlKey || e.metaKey) && ["z", "y"].includes(e.key.toLowerCase()))
      )
        cancel();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") space.current = false;
    };
    const blur = () => {
      space.current = false;
      cancel();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    const el = ref.current;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const u = useUIStore.getState(),
        r = el!.getBoundingClientRect();
      const w = screenToWorld(e.clientX, e.clientY, r, u.pan, u.zoom);
      const zoom = Math.max(
        0.2,
        Math.min(4, u.zoom * Math.exp(-e.deltaY * 0.0012)),
      );
      useUIStore.getState().set({
        zoom,
        pan: {
          x: e.clientX - r.left - r.width / 2 - w.x * zoom,
          y: e.clientY - r.top - r.height / 2 - w.y * zoom,
        },
      });
    };
    el?.addEventListener("wheel", wheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      el?.removeEventListener("wheel", wheel);
    };
  }, [cancel, ref]);
  function onPointerDown(e: RPointerEvent<SVGSVGElement>) {
    if (e.button !== 0 && e.button !== 1) return;
    e.preventDefault();
    const u = useUIStore.getState(),
      s = useMoleculeStore.getState(),
      p = point(e),
      atomId = targetId(e.target, "atom"),
      bondId = targetId(e.target, "bond");
    ref.current?.focus();
    if (e.button === 1 || space.current || u.tool === "pan") {
      gesture.current = {
        kind: "pan",
        start: p,
        screen: { x: e.clientX, y: e.clientY },
        pan: { ...u.pan },
        positions: new Map(),
        selection: [],
        additive: false,
        pointerId: e.pointerId,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    if (u.tool === "erase") {
      if (atomId || bondId)
        s.remove(atomId ? [atomId] : [], bondId ? [bondId] : []);
      return;
    }
    if (atomId) {
      const a = s.molecule.atoms.find((v) => v.id === atomId)!;
      if (u.tool === "draw") {
        s.patchAtom(atomId, { element: u.atom, hydrogenOverride: undefined });
        return;
      }
      if (u.tool === "charge") {
        s.patchAtom(atomId, {
          charge: Math.max(
            -8,
            Math.min(8, a.charge + (e.altKey ? -u.chargeDelta : u.chargeDelta)),
          ),
        });
        return;
      }
      if (u.tool === "lonePair") {
        s.patchAtom(atomId, { lonePairs: (a.lonePairs + 1) % 5 });
        return;
      }
      if (u.tool === "hydrogen") {
        s.mutate("Add explicit hydrogen", (m) => {
          const count = m.bonds.filter(
              (b) => b.atomA === a.id || b.atomB === a.id,
            ).length,
            angle = (count * Math.PI) / 3;
          const id = crypto.randomUUID();
          m.atoms.push({
            id,
            element: "H",
            x: a.x + 48 * Math.cos(angle),
            y: a.y + 48 * Math.sin(angle),
            charge: 0,
            aromatic: false,
            lonePairs: 0,
          });
          m.bonds.push({
            id: crypto.randomUUID(),
            atomA: a.id,
            atomB: id,
            type: "single",
          });
        });
        return;
      }
      if (u.tool === "bond") {
        if (u.pendingAtom && u.pendingAtom !== atomId) {
          s.addBond(u.pendingAtom, atomId, u.bond);
          u.set({ pendingAtom: null });
        } else u.set({ pendingAtom: atomId });
        return;
      }
      if (u.tool === "select") {
        const ids = e.shiftKey
          ? s.selectedAtoms.includes(atomId)
            ? s.selectedAtoms.filter((id) => id !== atomId)
            : [...s.selectedAtoms, atomId]
          : s.selectedAtoms.includes(atomId)
            ? s.selectedAtoms
            : [atomId];
        s.setSelection(ids);
        if (!ids.includes(atomId)) return;
        s.beginDrag();
        gesture.current = {
          kind: "move",
          start: p,
          screen: { x: e.clientX, y: e.clientY },
          pan: u.pan,
          positions: new Map(
            s.molecule.atoms
              .filter((a) => ids.includes(a.id))
              .map((a) => [a.id, { x: a.x, y: a.y }]),
          ),
          selection: ids,
          additive: e.shiftKey,
          pointerId: e.pointerId,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
        return;
      }
    }
    if (bondId) {
      if (u.tool === "bond") {
        s.patchBond(bondId, u.bond);
        u.set({ pendingAtom: null });
        return;
      }
      if (u.tool === "select") {
        s.setSelection(
          [],
          e.shiftKey ? [...new Set([...s.selectedBonds, bondId])] : [bondId],
        );
        return;
      }
    }
    if (u.tool === "lasso") {
      gesture.current = {
        kind: "lasso",
        start: p,
        screen: { x: e.clientX, y: e.clientY },
        pan: u.pan,
        positions: new Map(),
        additive: e.shiftKey,
        selection: s.selectedAtoms,
        pointerId: e.pointerId,
      };
      setLasso({ a: p, b: p });
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    if (atomId || bondId) return;
    if (u.tool === "draw") s.addAtom(p.x, p.y, u.atom);
    else if (u.tool === "ring") s.addRing(p.x, p.y, u.ring, u.benzene);
    else if (u.tool === "bond") {
      if (u.pendingAtom) {
        const from = u.pendingAtom;
        let id = "";
        s.mutate("Extend bond", (m) => {
          const start = m.atoms.find((a) => a.id === from);
          if (!start) return;
          const angle =
            (Math.round(
              Math.atan2(p.y - start.y, p.x - start.x) / (Math.PI / 6),
            ) *
              Math.PI) /
            6;
          id = crypto.randomUUID();
          m.atoms.push({
            id,
            element: u.atom,
            x: start.x + 64 * Math.cos(angle),
            y: start.y + 64 * Math.sin(angle),
            charge: 0,
            aromatic: false,
            lonePairs: 0,
          });
          m.bonds.push({
            id: crypto.randomUUID(),
            atomA: from,
            atomB: id,
            type: u.bond,
          });
        });
        u.set({ pendingAtom: id || null });
      } else {
        s.addAtom(p.x, p.y, u.atom);
        u.set({
          pendingAtom:
            useMoleculeStore.getState().molecule.atoms.at(-1)?.id || null,
        });
      }
    } else if (u.tool === "select") s.setSelection([]);
  }
  function onPointerMove(e: RPointerEvent<SVGSVGElement>) {
    const p = point(e),
      g = gesture.current;
    useUIStore.getState().set({ cursor: p });
    if (!g) return;
    if (g.kind === "pan") {
      useUIStore.getState().set({
        pan: {
          x: g.pan.x + e.clientX - g.screen.x,
          y: g.pan.y + e.clientY - g.screen.y,
        },
      });
    } else if (g.kind === "move") {
      const positions = new Map(
        [...g.positions].map(([id, v]) => [
          id,
          { x: v.x + p.x - g.start.x, y: v.y + p.y - g.start.y },
        ]),
      );
      useMoleculeStore.getState().moveAtoms(positions);
    } else setLasso({ a: g.start, b: p });
  }
  function onPointerUp(e: RPointerEvent<SVGSVGElement>) {
    const g = gesture.current;
    if (!g) return;
    if (g.kind === "move") useMoleculeStore.getState().endDrag();
    if (g.kind === "lasso") {
      const s = useMoleculeStore.getState(),
        p = point(e);
      const ids = s.molecule.atoms
        .filter((a) => pointInRect(a, g.start, p))
        .map((a) => a.id);
      s.setSelection([
        ...new Set([...(g.additive ? g.selection : []), ...ids]),
      ]);
    }
    gesture.current = null;
    setLasso(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  }
  return {
    lasso,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: cancel,
  };
}
