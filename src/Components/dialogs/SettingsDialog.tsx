import { useState } from "react";
import { Modal } from "../common/Modal";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
export function SettingsDialog({
  onClose,
  onIntro,
  onLibrary,
}: {
  onClose: () => void;
  onIntro: () => void;
  onLibrary?:()=>void;
}) {
  const m = useMoleculeStore((s) => s.molecule),
    carbons = useUIStore((s) => s.showCarbons),
    hydrogens = useUIStore((s) => s.showHydrogens),
    grid = useUIStore((s) => s.showGrid);
  const [name, setName] = useState(m.metadata.name);
  return (
    <Modal title="Workspace settings" onClose={onClose}>
      <div className="dialog-body">
        <label className="setting-row">
          Molecule name
          <input
            aria-label="Molecule name"
            value={name}
            maxLength={120}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => useMoleculeStore.getState().rename(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter") useMoleculeStore.getState().rename(name);
            }}
          />
        </label>
        {(
          [
            ["Show carbon labels", carbons, "showCarbons"],
            ["Show implicit hydrogen labels", hydrogens, "showHydrogens"],
            ["Show dotted grid", grid, "showGrid"],
          ] as const
        ).map(([label, checked, key]) => (
          <label className="setting-row" key={key}>
            {label}
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                useUIStore.getState().set({ [key]: e.target.checked })
              }
            />
          </label>
        ))}
        <hr />
        <div className="setting-row">
          <span>{onLibrary?"Saved molecule versions":"Saved structure"}</span>
          <button
            className="secondary"
            onClick={() => {
              if(onLibrary){onClose();onLibrary();return;}
              const s = useMoleculeStore.getState();
              if (
                fingerprint(s.molecule) !== s.savedFingerprint &&
                !window.confirm(
                  "Restore the last saved structure? You can undo this.",
                )
              )
                return;
              s.restore();
              onClose();
            }}
          >
            {onLibrary?"Open molecule library":"Restore local save"}
          </button>
        </div>
        <button className="secondary" onClick={onIntro}>
          Replay introduction
        </button>
        <p className="notice">
          {onLibrary?"Save version keeps this structure in a project on this device. Export a workspace backup from Library to keep a portable copy.":"Save stores one molecule on this browser. Export JSON for a portable backup."} Private-browsing or blocked storage may not persist across visits.
        </p>
      </div>
    </Modal>
  );
}
