import { useEffect, useRef, useState } from "react";
import { createViewer, type GLViewer } from "3dmol";
import { Modal } from "../common/Modal";
import { useMoleculeStore } from "../../store/moleculeStore";
import { conformerQuery, fetchConformer } from "../../engine/conformer";
import { downloadBlob } from "../../engine/export";
import "./Molecule3D.css";

export function Molecule3DDialog({ onClose }: { onClose: () => void }) {
  const molecule = useMoleculeStore(s => s.molecule);
  const host = useRef<HTMLDivElement>(null);
  const viewer = useRef<GLViewer | null>(null);
  const request = useRef<AbortController | null>(null);
  const [sdf, setSdf] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [style, setStyle] = useState("ball-stick");
  const [hydrogens, setHydrogens] = useState(true);
  let smiles = "", blocked = "";
  try { smiles = conformerQuery(molecule); } catch (e) { blocked = (e as Error).message; }

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!sdf || !host.current) return;
    let instance: GLViewer | null = null;
    let observer: ResizeObserver | null = null;
    const container = host.current;
    try {
      instance = createViewer(container, { backgroundColor: "#111827" });
      viewer.current = instance;
      const model = instance.addModel(sdf, "sdf");
      if (!model.selectedAtoms({}).length) throw new Error("No atoms found in the returned conformer.");
      instance.zoomTo();
      observer = new ResizeObserver(() => { instance?.resize(); instance?.render(); });
      observer.observe(container);
      applyStyle(instance, style, hydrogens);
    } catch { setError("Unable to open the 3D viewer. Check that WebGL is enabled in your browser."); }
    return () => {
      observer?.disconnect();
      instance?.clear();
      viewer.current = null;
      container.replaceChildren();
    };
    // Style changes update the existing viewer below, preserving camera position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdf]);
  useEffect(() => { if (viewer.current) applyStyle(viewer.current, style, hydrogens); }, [style, hydrogens]);

  async function load() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25000);
    setBusy(true); setError(""); setSdf("");
    try {
      const result = await fetchConformer(smiles, controller.signal);
      if (!controller.signal.aborted) setSdf(result);
    } catch (e) {
      if (request.current === controller) setError(controller.signal.aborted
        ? "3D lookup timed out or was cancelled. Please retry."
        : e instanceof TypeError ? "Cannot reach PubChem. Check your internet connection and retry." : (e as Error).message);
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }
  return <Modal title="3D molecular view" wide onClose={onClose}>
    <div className="dialog-body molecule-3d">
      <p>Explore an available PubChem conformer of your drawn structure.</p>
      <p className="notice">Clicking “Load from PubChem” sends this molecule’s SMILES to PubChem. The returned coordinates are a database conformer; they do not establish experimental geometry or a unique stereoisomer when stereo is unspecified.</p>
      {blocked && <p role="status">{blocked}</p>}
      <div className="viewer-controls">
        <button className="secondary" disabled={!!blocked || busy} onClick={() => void load()}>{busy ? "Looking up conformer…" : "Load from PubChem"}</button>
        <label>Style <select value={style} onChange={e => setStyle(e.target.value)}>
          <option value="ball-stick">Ball and stick</option><option value="stick">Sticks</option><option value="space-fill">Space filling</option>
        </select></label>
        <label><input type="checkbox" checked={hydrogens} onChange={e => setHydrogens(e.target.checked)} /> Hydrogens</label>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="molecule-viewport" ref={host} aria-label="Interactive 3D molecule" />
      {!sdf && <p className="viewer-caption">{busy ? "Retrieving 3D coordinates…" : "Load a conformer to begin. No structure is sent automatically."}</p>}
      {sdf && <>
        <p className="viewer-caption">Drag to rotate · scroll to zoom · Source: PubChem 3D</p>
        <div className="viewer-controls">
          <button className="secondary" onClick={() => { viewer.current?.zoomTo(); viewer.current?.render(); }}>Fit molecule</button>
          <button className="secondary" onClick={() => downloadBlob(new Blob([sdf], { type: "chemical/x-mdl-sdfile" }), "pubchem-conformer.sdf")}>Download 3D SDF</button>
        </div>
      </>}
    </div>
  </Modal>;
}
function applyStyle(viewer: GLViewer, style: string, hydrogens: boolean) {
  viewer.setStyle({}, {});
  viewer.setStyle(hydrogens ? {} : { not: { elem: "H" } }, style === "space-fill"
    ? { sphere: {} }
    : style === "stick" ? { stick: { radius: 0.18 } }
    : { stick: { radius: 0.13 }, sphere: { scale: 0.28 } });
  viewer.render();
}
