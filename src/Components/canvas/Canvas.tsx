import { useEffect, useMemo, useRef, useState } from "react";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useCanvasInteraction } from "../../hooks/useCanvasInteraction";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { renderContext, atomLabel } from "../../engine/rendering";
import { bounds } from "../../engine/geometry";
import { AtomShape } from "./AtomShape";
import { BondShape } from "./BondShape";
import { Icon } from "../common/Icon";
import { template } from "../../engine/templates";
import "./Canvas.css";
const hints: Record<string, string> = {
  draw: "Click to place an atom · click an existing atom to replace it",
  select: "Drag to move · Shift-click to extend selection",
  bond: "Click two atoms to connect · click a bond to change its order",
  erase: "Click an atom or bond to erase",
  lasso: "Drag a rectangle to select atoms · Shift to add",
  ring: "Click the canvas to place an editable ring",
  charge: "Click an atom to apply charge · Alt-click reverses the sign",
  lonePair: "Click an atom to cycle lone-pair annotations",
  hydrogen: "Click an atom to attach an explicit hydrogen",
  pan: "Drag to pan your workspace",
};
export function Canvas() {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const m = useMoleculeStore((s) => s.molecule),
    selectedAtoms = useMoleculeStore((s) => s.selectedAtoms),
    selectedBonds = useMoleculeStore((s) => s.selectedBonds);
  const tool = useUIStore((s) => s.tool),
    pan = useUIStore((s) => s.pan),
    zoom = useUIStore((s) => s.zoom),
    theme = useUIStore((s) => s.theme),
    showCarbons = useUIStore((s) => s.showCarbons),
    showHydrogens = useUIStore((s) => s.showHydrogens),
    grid = useUIStore((s) => s.showGrid),
    pending = useUIStore((s) => s.pendingAtom),
    fitVersion = useUIStore((s) => s.fitVersion);
  const { lasso, ...handlers } = useCanvasInteraction(ref);
  const context = useMemo(() => renderContext(m), [m]);
  const analysis = useMoleculeAnalysis();
  const warningIds = new Set(analysis.warnings.map((w) => w.atomId));
  useEffect(() => {
    const node = ref.current!;
    const ro = new ResizeObserver(() => {
      const r = node.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const state = useMoleculeStore.getState();
    if (!state.molecule.atoms.length) {
      useUIStore.getState().set({ zoom: 1, pan: { x: 0, y: 0 } });
      return;
    }
    const box = bounds(state.molecule.atoms),
      rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const z = Math.max(
      0.2,
      Math.min(
        2,
        (rect.width - 140) / (box.width + 50),
        (rect.height - 170) / (box.height + 50),
      ),
    );
    useUIStore.getState().set({
      zoom: z,
      pan: {
        x: -(box.x + box.width / 2) * z,
        y: -(box.y + box.height / 2) * z,
      },
    });
  }, [fitVersion, size.w, size.h]);
  const selectAtom = (id: string) => {
      useMoleculeStore.getState().setSelection([id]);
      useUIStore.getState().set({ tool: "select" });
    },
    selectBond = (id: string) => {
      useMoleculeStore.getState().setSelection([], [id]);
      useUIStore.getState().set({ tool: "select" });
    };
  const loadExample = (name: "benzene" | "ethanol" | "aspirin") => {
    const s = useMoleculeStore.getState();
    if (
      s.molecule.atoms.length &&
      fingerprint(s.molecule) !== s.savedFingerprint &&
      !window.confirm(
        "Replace the current structure? You can undo this change.",
      )
    )
      return;
    s.replace(template(name));
  };
  return (
    <section
      className={`canvas-workspace tool-${tool}`}
      aria-label="Molecular drawing workspace"
    >
      <div className="canvas-top">
        <div className="document-heading">
          <span className="eyebrow muted">Your molecular workspace</span>
          <h1>{m.metadata.name}</h1>
          <span className="document-meta">
            2D structure <i />{" "}
            {m.atoms.length
              ? `${m.atoms.length} atoms · ${m.bonds.length} bonds`
              : "A blank canvas for your next idea"}
          </span>
        </div>
        <div className="canvas-imports">
        <button className="secondary smiles-import-button" onClick={() => useUIStore.getState().set({dialog: "smiles"})}>
          <Icon name="plus" size={14} /> SMILES
        </button>
        <label className="template-select">
          <Icon name="folder" size={15} />
          <select
            aria-label="Load example structure"
            value=""
            onChange={(e) => {
              if (e.target.value)
                loadExample(
                  e.target.value as "benzene" | "ethanol" | "aspirin",
                );
            }}
          >
            <option value="">Examples</option>
            <option value="benzene">Benzene</option>
            <option value="ethanol">Ethanol</option>
            <option value="aspirin">Aspirin</option>
          </select>
        </label>
        </div>
      </div>
      <svg
        ref={ref}
        id="molecular-canvas"
        role="group"
        className="molecular-canvas"
        aria-label="Molecule canvas"
        tabIndex={0}
        {...handlers}
        onContextMenu={(e) => e.preventDefault()}
      >
        <defs>
          <pattern
            id="dots"
            width={20 * zoom}
            height={20 * zoom}
            x={size.w / 2 + pan.x}
            y={size.h / 2 + pan.y}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".65" fill="var(--grid)" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={grid ? "url(#dots)" : "var(--canvas)"}
        />
        <g
          transform={`translate(${size.w / 2 + pan.x} ${size.h / 2 + pan.y}) scale(${zoom})`}
        >
          {m.bonds.map((b) => {
            const a = context.atomMap.get(b.atomA),
              d = context.atomMap.get(b.atomB);
            return a && d ? (
              <BondShape
                key={b.id}
                bond={b}
                a={a}
                d={d}
                labelA={atomLabel(
                  a,
                  context.adj.get(a.id)?.length || 0,
                  showCarbons,
                )}
                labelB={atomLabel(
                  d,
                  context.adj.get(d.id)?.length || 0,
                  showCarbons,
                )}
                selected={selectedBonds.includes(b.id)}
                onKeyboardSelect={selectBond}
              />
            ) : null;
          })}
          {m.atoms.map((a) => (
            <AtomShape
              key={a.id}
              atom={a}
              degree={context.adj.get(a.id)?.length || 0}
              valence={context.valences.get(a.id)!}
              selected={selectedAtoms.includes(a.id)}
              pending={pending === a.id}
              showCarbons={showCarbons}
              showHydrogens={showHydrogens}
              dark={theme === "dark"}
              warning={warningIds.has(a.id)}
              onKeyboardSelect={selectAtom}
            />
          ))}
          {lasso && (
            <rect
              x={Math.min(lasso.a.x, lasso.b.x)}
              y={Math.min(lasso.a.y, lasso.b.y)}
              width={Math.abs(lasso.a.x - lasso.b.x)}
              height={Math.abs(lasso.a.y - lasso.b.y)}
              className="lasso-box"
            />
          )}
        </g>
      </svg>
      {!m.atoms.length && (
        <div className="empty-canvas">
          <div className="empty-hex">
            <Icon name="ring" size={38} />
            <span>+</span>
          </div>
          <h2>Start drawing</h2>
          <p>
            Select an element from the toolbar
            <br />
            and click anywhere on the canvas.
          </p>
          <div>
            or begin with{" "}
            <button onClick={() => loadExample("benzene")}>
              benzene <Icon name="arrow" size={12} />
            </button>
          </div>
        </div>
      )}
      <div className="canvas-bottom">
        <div className="canvas-bottom-left">
          <div className="canvas-label-controls" role="group" aria-label="Atom label display">
            <button aria-label="Show carbon labels" aria-pressed={showCarbons} title="Show C labels in rings and chains. Other element symbols remain visible." onClick={() => useUIStore.getState().set({showCarbons: !showCarbons})}>
              <b>C</b><span>Carbon labels</span><small>{showCarbons ? "On" : "Off"}</small>
            </button>
            <button aria-label="Show implicit hydrogen labels" aria-pressed={showHydrogens} title="Show implicit hydrogen counts next to visible atom symbols" onClick={() => useUIStore.getState().set({showHydrogens: !showHydrogens})}>
              <b>H</b><span>Hydrogens</span><small>{showHydrogens ? "On" : "Off"}</small>
            </button>
          </div>
        <span className="canvas-hint">
          <Icon name={pending ? "bond" : "info"} size={13} />
          {pending
            ? "Select another atom to connect · Esc to cancel"
            : hints[tool]}
        </span>
        </div>
        <span className="canvas-watermark">CHEMEASE / STUDIO</span>
      </div>
    </section>
  );
}
