import { useState } from "react";
import { Modal } from "../common/Modal";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { readPreference, writePreference } from "../../utils/storage";
export function SettingsDialog({
  onClose,
  onIntro,
}: {
  onClose: () => void;
  onIntro: () => void;
}) {
  const m = useMoleculeStore((s) => s.molecule),
    carbons = useUIStore((s) => s.showCarbons),
    hydrogens = useUIStore((s) => s.showHydrogens),
    grid = useUIStore((s) => s.showGrid);
  const [name, setName] = useState(m.metadata.name),
    [skip, setSkip] = useState(
      readPreference("chemease.skipIntro", "true") === "true",
    );
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
        <label className="setting-row">
          Skip intro on future visits
          <input
            type="checkbox"
            checked={skip}
            onChange={(e) => {
              setSkip(e.target.checked);
              writePreference("chemease.skipIntro", String(e.target.checked));
            }}
          />
        </label>
        <hr />
        <div className="setting-row">
          <span>Saved structure</span>
          <button
            className="secondary"
            onClick={() => {
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
            Restore local save
          </button>
        </div>
        <button className="secondary" onClick={onIntro}>
          Replay introduction
        </button>
        <p className="notice">
          Save stores one molecule on this browser. Export JSON for a portable
          backup. Private-browsing or blocked storage may not persist across
          visits.
        </p>
      </div>
    </Modal>
  );
}
