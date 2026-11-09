import { useState } from "react";
import { Modal } from "../common/Modal";
import { Icon } from "../common/Icon";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { exportMolecule } from "../../engine/export";
import { exportChemistry } from "../../engine/chemicalExport";
export function ExportDialog({ onClose }: { onClose: () => void }) {
  const [busy, setBusy] = useState(false),
    [dark, setDark] = useState(false);
  const m = useMoleculeStore((s) => s.molecule);
  return (
    <Modal title="Take your chemistry with you" onClose={onClose}>
      <div className="dialog-body">
        <div className="export-options">
          {(
            [
              ["png", "PNG image", "High-resolution image · up to 3× scale"],
              ["svg", "SVG vector", "Resolution-independent · editable vector"],
              ["json", "Molecule JSON", "Complete graph · re-open in ChemEase"],
              ["smi", "SMILES file", "Canonical SMILES · .smi text file"],
              ["mol", "MOL structure", "2D coordinates, charges and isotopes · V3000"],
              ["sdf", "SDF structure", "2D structure with name and canonical SMILES"],
              ["csv", "Properties CSV", "RDKit descriptors · spreadsheet-ready"],
            ] as const
          ).map(([format, title, description]) => (
            <button
              className="export-option"
              disabled={busy || (!m.atoms.length && format !== "json")}
              key={format}
              onClick={async () => {
                setBusy(true);
                try {
                  const u = useUIStore.getState();
                  if (format === "smi" || format === "mol" || format === "sdf" || format === "csv") await exportChemistry(m, format);
                  else await exportMolecule(m, format, {
                    dark,
                    showCarbons: u.showCarbons,
                    showHydrogens: u.showHydrogens,
                  });
                  u.notify(`${format.toUpperCase()} exported.`);
                } catch (e) {
                  useUIStore.getState().notify((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              <Icon name="download" size={22} />
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </button>
          ))}
        </div>
        <label className="setting-row" style={{ marginTop: 12 }}>
          Dark background for images
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
        </label>
        <p className="muted" style={{ fontSize: 11 }}>
          Only your actual molecular structure is exported. Grid, selection and
          interface controls are excluded.
        </p>
      </div>
    </Modal>
  );
}
