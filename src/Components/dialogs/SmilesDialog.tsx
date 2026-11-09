import { useEffect, useRef, useState } from "react";
import { Modal } from "../common/Modal";
import { Icon } from "../common/Icon";
import { loadRDKit } from "../../engine/rdkit";
import { importSmiles, calculateToolkit, parseSmilesFile } from "../../engine/toolkit";
import type { Molecule } from "../../models/Molecule";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { analyzeMolecule } from "../../engine/analysis";
export function SmilesDialog({onClose}: {onClose: () => void}) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [candidate, setCandidate] = useState<{m: Molecule; smiles: string} | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const alive = useRef(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const revision = useRef(0);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  const change = (value: string) => { revision.current++; setText(value); setCandidate(null); setError(""); };
  const preview = async () => {
    const version = ++revision.current;
    setBusy(true); setError(""); setCandidate(null);
    try {
      const rdkit = await loadRDKit();
      const m = importSmiles(rdkit, text, name || "SMILES molecule");
      const smiles = calculateToolkit(rdkit, m).smiles;
      if (alive.current && version === revision.current) setCandidate({m, smiles});
    } catch (e) { if (alive.current && version === revision.current) setError(e instanceof Error ? e.message : "Could not convert SMILES."); }
    finally { if (alive.current) setBusy(false); }
  };
  return <Modal title="SMILES to structure" onClose={onClose}>
    <div className="dialog-body smiles-import">
      <p className="muted">Paste a SMILES string to create an editable 2D structure. Conversion runs locally in your browser.</p>
      <label>Molecule name <input value={name} maxLength={120} onChange={e => {setName(e.target.value); setCandidate(null); revision.current++;}} placeholder="Optional name" /></label>
      <label>SMILES <textarea value={text} maxLength={10000} onChange={e => change(e.target.value)} placeholder="e.g. CC(=O)Oc1ccccc1C(=O)O" spellCheck={false} rows={3} /></label>
      <div className="smiles-examples">Try {[["Ethanol","CCO"],["Aspirin","CC(=O)Oc1ccccc1C(=O)O"],["Caffeine","Cn1c(=O)c2c(ncn2C)n(C)c1=O"]].map(([label,value]) => <button key={label} onClick={() => change(value)}>{label}</button>)}</div>
      <button className="secondary" disabled={busy} onClick={() => fileInput.current?.click()}><Icon name="folder" size={15}/>Open SMILES file</button>
      <input ref={fileInput} className="sr-only" aria-label="Open single-molecule SMILES file" type="file" accept=".smi,.smiles,.txt,text/plain" disabled={busy} onChange={async e => {
        const file = e.target.files?.[0]; e.target.value = "";
        if (!file) return;
        const version = ++revision.current;
        setCandidate(null); setError("");
        try {
          if (file.size > 20000) throw new Error("SMILES files are limited to 20 KB.");
          const value = parseSmilesFile(await file.text());
          if (alive.current && version === revision.current) { setText(value.smiles); setName(value.name); }
        } catch (e) { if (alive.current && version === revision.current) setError((e as Error).message); }
      }}/>
      {error && <p className="chemistry-error" role="alert">{error}</p>}
      {candidate && <div className="smiles-preview" role="status"><Icon name="check" size={18}/><div><strong>Structure ready</strong><p>{candidate.m.atoms.length} drawn atoms · {candidate.m.bonds.length} bonds · {analyzeMolecule(candidate.m).formula}</p><code>{candidate.smiles}</code></div></div>}
      <p className="notice">Stereo-specific, radical, wildcard and unsupported-element inputs are rejected rather than altered. Import replaces the canvas and can be undone.</p>
    </div>
    <div className="dialog-actions">
      <button className="secondary" onClick={preview} disabled={busy || !text.trim()}>{busy ? "Converting…" : "Validate SMILES"}</button>
      <button className="primary" disabled={!candidate || busy} onClick={() => {
        if (!candidate) return;
        const state = useMoleculeStore.getState();
        if (state.molecule.atoms.length && fingerprint(state.molecule) !== state.savedFingerprint && !window.confirm("Replace the current unsaved structure? You can undo this change.")) return;
        useMoleculeStore.getState().replace(candidate.m);
        useUIStore.getState().notify("SMILES imported. You can edit, analyze or export the structure.");
        onClose();
      }}>Open in editor <Icon name="arrow" size={16}/></button>
    </div>
  </Modal>;
}
