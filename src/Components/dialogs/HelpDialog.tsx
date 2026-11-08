import { Modal } from "../common/Modal";
export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Make yourself at home" onClose={onClose}>
      <div className="dialog-body">
        <div className="shortcut-list">
          {[
            ["Undo", "Ctrl / ⌘ Z"],
            ["Redo", "Ctrl / ⌘ Shift Z"],
            ["Save locally", "Ctrl / ⌘ S"],
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
          ChemEase uses a local graph engine for common valence states. SMILES
          is non-canonical. Aromaticity is user-assigned, not perceived; lone
          pairs are annotations. Structures are not evaluated for chemical
          stability, hazards or synthetic feasibility.
        </p>
      </div>
    </Modal>
  );
}
