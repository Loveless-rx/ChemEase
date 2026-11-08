import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore } from "../../store/moleculeStore";
import { IconButton } from "../common/IconButton";
import "./StatusBar.css";
export function StatusBar() {
  const tool = useUIStore((s) => s.tool),
    cursor = useUIStore((s) => s.cursor),
    zoom = useUIStore((s) => s.zoom);
  const atoms = useMoleculeStore((s) => s.molecule.atoms.length),
    bonds = useMoleculeStore((s) => s.molecule.bonds.length);
  const set = useUIStore.getState().set;
  return (
    <footer className="statusbar">
      <div className="status-left">
        <span className="status-tool">
          <i />
          {tool === "draw"
            ? "Atom"
            : tool === "lonePair"
              ? "Lone pair"
              : tool[0].toUpperCase() + tool.slice(1)}{" "}
          tool
        </span>
        <span className="cursor-coordinates">
          X <b>{cursor.x.toFixed(0)}</b> Y <b>{cursor.y.toFixed(0)}</b>
        </span>
        <span>
          {atoms} atoms <i className="separator" /> {bonds} bonds
        </span>
      </div>
      <div className="zoom-controls">
        <span className="pan-help">Space + drag to pan</span>
        <IconButton
          label="Zoom out"
          icon="minus"
          disabled={zoom <= 0.2}
          onClick={() => set({ zoom: Math.max(0.2, zoom / 1.2) })}
        />
        <button
          className="zoom-percent"
          title="Reset zoom to 100%"
          onClick={() => set({ zoom: 1 })}
        >
          {Math.round(zoom * 100)}%
        </button>
        <IconButton
          label="Zoom in"
          icon="plus"
          disabled={zoom >= 4}
          onClick={() => set({ zoom: Math.min(4, zoom * 1.2) })}
        />
        <button
          className="fit-button"
          onClick={() =>
            set({ fitVersion: useUIStore.getState().fitVersion + 1 })
          }
        >
          Fit
        </button>
      </div>
    </footer>
  );
}
