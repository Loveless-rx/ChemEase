import { Modal } from "../common/Modal";
export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Make yourself at home" onClose={onClose}>
      <div className="dialog-body">
        <div className="shortcut-list">
          {[
            ["Undo", "Ctrl / ⌘ Z"],
            ["Redo", "Ctrl / ⌘ Shift Z"],
            ["Save molecule version", "Ctrl / ⌘ S"],
            ["New molecule", "Ctrl / ⌘ N"],
            ["Select / Erase / Lasso", "V / E / L"],
            ["Single / Double / Triple bond", "1 / 2 / 3"],
            ["Delete selection", "Delete / Backspace"],
            ["Cancel operation", "Escape"],
            ["Pan canvas", "Space + drag"],
            ["Zoom canvas", "Mouse wheel"],
            ["Select a focused atom / bond", "Enter"],
          ].map(([label, key]) => (
            <div style={{ display: "contents" }} key={label}>
              <span>{label}</span>
              <kbd>{key}</kbd>
            </div>
          ))}
        </div>
        <div className="notice">
          Place atoms, then choose a bond tool and click two atoms. Click a bond
          to change its order. With a bond started, click empty space to extend
          a 64-unit, 30°-snapped chain. Use the Hydrogen tool for explicit H, or
          atom properties to set implicit H (for example, aromatic [nH]).
        </div>
        <p style={{ fontSize: 12, marginTop: 16 }}>
          Use Home, Projects, Library and Properties from the workspace navigation.
          Save version keeps the drawing in a project; Library lets you reopen
          earlier versions and export a workspace backup. Properties can store
          descriptor results for the exact saved version.
        </p>
        <p style={{ fontSize: 12, marginTop: 16 }}>
          Open the periodic table from Extended elements to select by position,
          name, symbol or atomic number. The Carbon labels and Hydrogens controls
          on the canvas switch between labelled and skeletal drawings.
        </p>
        <p style={{ fontSize: 12, marginTop: 16 }}>
          Use the SMILES button above the canvas to paste a string or open a
          single-molecule .smi file, validate it, and load an editable structure.
          Analyze Structure shows RDKit descriptors and a pH/pKa LogD estimator.
          Export downloads images, JSON, SMILES, MOL, SDF or properties CSV.
          Structures are not evaluated for stability, hazards or synthetic feasibility.
        </p>
      </div>
    </Modal>
  );
}
