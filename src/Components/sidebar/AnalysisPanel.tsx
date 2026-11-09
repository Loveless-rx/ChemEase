import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { Modal } from "../common/Modal";
import { Formula } from "../common/Formula";
import { Icon } from "../common/Icon";
import { copyText } from "../../engine/export";
import { ELEMENTS } from "../../utils/elementData";
import { formatNumber } from "../../utils/format";
import "./AnalysisPanel.css";
import { Descriptors } from "./Descriptors";
import { chemistryKey } from "../../engine/toolkit";
import { exportChemistry } from "../../engine/chemicalExport";
export function AnalysisPanel({ onClose }: { onClose: () => void }) {
  const a = useMoleculeAnalysis();
  const molecule = useMoleculeStore((s) => s.molecule);
  const name = molecule.metadata.name;
  const stat = (label: string, value: number | null) => (
    <div className="analysis-stat" key={label}>
      <span>{label}</span>
      <strong>{value ?? "Not evaluated"}</strong>
    </div>
  );
  return (
    <Modal title="Molecular analysis" onClose={onClose} wide>
      <div className="analysis-content">
        <div className="analysis-hero">
          <div>
            <span className="eyebrow muted">{name}</span>
            <div className="analysis-formula">
              <Formula value={a.formula} />
            </div>
          </div>
          <div className="analysis-mass">
            <span>Molecular weight</span>
            <strong>
              {a.weight === null ? "Unavailable" : formatNumber(a.weight)}
            </strong>
            <span>g/mol · average atomic weights</span>
          </div>
        </div>
        <Descriptors key={chemistryKey(molecule)} analysis={a}/>
        <div className="analysis-composition">
          <div className="info-section-title">
            <h3>Elemental composition</h3>
            <span>{a.totalAtoms} atoms, including hydrogens</span>
          </div>
          <div className="composition-elements">
            {Object.entries(a.composition).map(([e, n]) => (
              <div key={e}>
                <span className="composition-symbol">{e}</span>
                <div>
                  <strong>{n}</strong>
                  <span>{ELEMENTS[e]?.name || "Unspecified"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="analysis-columns">
          <section>
            <h3>Structural properties</h3>
            {[
              ["Drawn atoms", a.atoms],
              ["Heavy atoms", a.heavyAtoms],
              ["Implicit hydrogens", a.implicitH],
              ["Bonds", a.bonds],
              ["Independent rings", a.rings],
              ["Aromatic cycles", a.aromaticRings],
              ["Connected fragments", a.components],
            ].map(([label, value]) => stat(label as string, value as number))}
          </section>
          <section>
            <h3>Structure model</h3>
            {stat("Formal charge", a.charge)}
            <p className="descriptor-note">
              The drawing is the source of truth. RDKit descriptors below use
              the current bonds, charges, isotopes and hydrogen counts. Independent
              graph cycles and RDKit perceived rings may differ for complex ring systems.
            </p>
          </section>
        </div>
        <section className="analysis-validation">
          <h3>
            Validation{" "}
            <span className={a.warnings.length ? "warn-tag" : "valid-tag"}>
              {a.warnings.length
                ? `${a.warnings.length} warnings`
                : "No basic warnings"}
            </span>
          </h3>
          {a.warnings.length ? (
            <ul>
              {a.warnings.map((w, i) => (
                <li key={i}>
                  <button
                    disabled={!w.atomId}
                    onClick={() => {
                      if (w.atomId) {
                        useMoleculeStore.getState().setSelection([w.atomId]);
                        useUIStore.getState().set({ tool: "select" });
                        onClose();
                      }
                    }}
                  >
                    {w.message}
                    {w.atomId && <Icon name="arrow" size={12} />}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <Icon name="check" size={14} />
              Within the supported valence rules. This does not establish
              chemical stability or safety.
            </p>
          )}
        </section>
        <section className="analysis-smiles">
          <div className="info-section-title">
            <h3>
              SMILES <small>{a.toolkit ? "Canonical · RDKit" : "Non-canonical · editor"}</small>
            </h3>
            <button
              className="secondary"
              disabled={!a.smiles}
              onClick={async () => {
                try {
                  await copyText(a.smiles);
                  useUIStore.getState().notify("SMILES copied.");
                } catch (e) {
                  useUIStore.getState().notify((e as Error).message);
                }
              }}
            >
              <Icon name="copy" size={13} />
              Copy
            </button>
          </div>
          <code>{a.smiles || a.smilesError || "Empty structure"}</code>
          <button className="secondary" disabled={!a.toolkit} onClick={async () => {
            try { await exportChemistry(molecule, "smi"); useUIStore.getState().notify("SMILES file downloaded."); }
            catch (e) { useUIStore.getState().notify((e as Error).message); }
          }}><Icon name="download" size={14}/>Download SMILES</button>
        </section>
        <p className="analysis-disclaimer">
          Formula and mass use the displayed implicit-hydrogen model. Ring
          counts in Structural properties are graph cycle rank (E − V + components).
          RDKit descriptors are computed estimates, not experimental measurements
          or a prediction of chemical stability.
        </p>
      </div>
    </Modal>
  );
}
