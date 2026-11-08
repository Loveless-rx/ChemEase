import { Modal } from "../common/Modal";
import { useMoleculeStore } from "../../store/moleculeStore";
export function NewMoleculeDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="A fresh canvas" onClose={onClose}>
      <div className="dialog-body">
        <p>
          Start a new molecule? Save or export the current structure first if
          you want to keep a permanent copy.
        </p>
        <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
          You can undo this action during the current session.
        </p>
      </div>
      <div className="dialog-actions">
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="primary"
          onClick={() => {
            useMoleculeStore.getState().newMolecule();
            onClose();
          }}
        >
          New molecule
        </button>
      </div>
    </Modal>
  );
}
