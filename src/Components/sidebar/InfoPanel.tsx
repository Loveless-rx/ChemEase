import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { ELEMENTS } from "../../utils/elementData";
import { atomValence } from "../../engine/valence";
import { bondOrder } from "../../engine/chemistry";
import { exportMolecule, copyText } from "../../engine/export";
import { Icon } from "../common/Icon";
import { Formula } from "../common/Formula";
import { formatNumber } from "../../utils/format";
import type { BondType } from "../../types/chem";
import "./InfoPanel.css";
export function InfoPanel() {
  const m = useMoleculeStore((s) => s.molecule),
    ids = useMoleculeStore((s) => s.selectedAtoms),
    bondIds = useMoleculeStore((s) => s.selectedBonds);
  const analysis = useMoleculeAnalysis();
  const a = ids.length === 1 ? m.atoms.find((a) => a.id === ids[0]) : undefined,
    b =
      bondIds.length === 1
        ? m.bonds.find((b) => b.id === bondIds[0])
        : undefined;
  const u = useUIStore.getState();
  const v = a ? atomValence(a, m) : null;
  const doCopy = async () => {
    try {
      await copyText(analysis.smiles);
      u.notify("SMILES copied.");
    } catch (e) {
      u.notify((e as Error).message);
    }
  };
  const png = async () => {
    try {
      await exportMolecule(m, "png", {
        showCarbons: useUIStore.getState().showCarbons,
        showHydrogens: useUIStore.getState().showHydrogens,
      });
      u.notify("PNG exported.");
    } catch (e) {
      u.notify((e as Error).message);
    }
  };
  return (
    <aside className="info-panel" aria-label="Structure information">
      <header>
        <span className="eyebrow">Structure information</span>
        <Icon name="info" size={15} />
      </header>
      <div className="info-scroll">
        <div className="structure-context">
          <div className="context-icon">
            <Icon name={a ? "atom" : b ? "bond" : "ring"} size={20} />
          </div>
          <div>
            <h2>
              {a
                ? ELEMENTS[a.element]?.name || a.element
                : b
                  ? `${b.type} bond`
                  : ids.length > 1
                    ? `${ids.length} atoms selected`
                    : "Molecule overview"}
            </h2>
            <p>
              {a
                ? "Atom properties"
                : b
                  ? "Bond properties"
                  : ids.length > 1
                    ? "Drag together · Delete to remove"
                    : "Every connection, accounted for."}
            </p>
          </div>
        </div>
        {(a || b || ids.length > 1) && (
          <section className="selection-details">
            <span className="eyebrow muted">Selection</span>
            {a && v && (
              <>
                <dl>
                  <dt>Element</dt>
                  <dd>
                    {a.element}{" "}
                    <small>#{ELEMENTS[a.element]?.number || "—"}</small>
                  </dd>
                  <dt>Bond order sum</dt>
                  <dd>{v.used}</dd>
                  <dt>Implicit H</dt>
                  <dd>{v.implicitH}</dd>
                  <dt>Typical valence</dt>
                  <dd>{v.allowed.join(", ") || "Unknown"}</dd>
                  <dt>Coordinates</dt>
                  <dd>
                    {a.x.toFixed(0)}, {a.y.toFixed(0)}
                  </dd>
                </dl>
                <label className="atom-control">
                  Formal charge
                  <input
                    aria-label="Selected atom charge"
                    type="number"
                    min="-8"
                    max="8"
                    value={a.charge}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (Number.isInteger(n) && Math.abs(n) <= 8)
                        useMoleculeStore
                          .getState()
                          .patchAtom(a.id, { charge: n });
                    }}
                  />
                </label>
                <label className="atom-control">
                  Hydrogens
                  <select
                    aria-label="Implicit hydrogen override"
                    value={
                      a.hydrogenOverride === undefined
                        ? "auto"
                        : a.hydrogenOverride
                    }
                    onChange={(e) =>
                      useMoleculeStore.getState().patchAtom(a.id, {
                        hydrogenOverride:
                          e.target.value === "auto"
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                  >
                    <option value="auto">Auto</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
            {b && (
              <>
                <dl>
                  <dt>Bond order</dt>
                  <dd>{bondOrder(b.type)}</dd>
                  <dt>Connected atoms</dt>
                  <dd>
                    {m.atoms.find((a) => a.id === b.atomA)?.element} –{" "}
                    {m.atoms.find((a) => a.id === b.atomB)?.element}
                  </dd>
                </dl>
                <select
                  aria-label="Selected bond type"
                  value={b.type}
                  onChange={(e) =>
                    useMoleculeStore
                      .getState()
                      .patchBond(b.id, e.target.value as BondType)
                  }
                >
                  {["single", "double", "triple", "aromatic"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </>
            )}
            <button
              className="clear-selection"
              onClick={() => useMoleculeStore.getState().setSelection([])}
            >
              Clear selection
            </button>
          </section>
        )}
        <section className="formula-section">
          <div className="info-label">Molecular formula</div>
          <div className="formula-large" data-testid="formula">
            <Formula value={analysis.formula} />
          </div>
          <div className="weight-label">Molecular weight</div>
          <div className="weight-number" data-testid="weight">
            {m.atoms.length && analysis.weight !== null
              ? formatNumber(analysis.weight)
              : "—"}{" "}
            <span>g/mol</span>
          </div>
          {analysis.warnings.length > 0 && (
            <small className="provisional">
              Check warnings · chemistry may be incomplete
            </small>
          )}
        </section>
        <section className="structure-numbers">
          <span className="eyebrow muted">Structure at a glance</span>
          <div className="number-grid">
            {[
              ["Atoms", analysis.atoms],
              ["Bonds", analysis.bonds],
              ["Rings", analysis.rings],
              ["Charge", analysis.charge],
            ].map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="smiles-section">
          <div className="info-section-title">
            <span className="eyebrow muted">SMILES</span>
            <button
              onClick={doCopy}
              disabled={!analysis.smiles}
              aria-label="Copy SMILES string"
              title="Copy SMILES"
            >
              <Icon name="copy" size={13} />
            </button>
          </div>
          <div className="smiles-value" tabIndex={0}>
            {analysis.smiles || (
              <span className="muted">
                {analysis.smilesError
                  ? "Unavailable · review warnings"
                  : "Draw a structure to generate SMILES"}
              </span>
            )}
          </div>
          <p>Graph-derived · non-canonical</p>
        </section>
        <section
          className={`validation-summary ${analysis.warnings.length ? "has-warnings" : ""}`}
        >
          <Icon name={analysis.warnings.length ? "info" : "check"} size={15} />
          <div>
            <strong>
              {!m.atoms.length
                ? "Ready when you are"
                : analysis.warnings.length
                  ? `${analysis.warnings.length} chemistry warning${analysis.warnings.length > 1 ? "s" : ""}`
                  : "No basic valence warnings"}
            </strong>
            <p>
              {!m.atoms.length
                ? "Your analysis updates as you draw."
                : analysis.warnings.length
                  ? analysis.warnings[0].message
                  : "Within the supported chemistry rules."}
            </p>
          </div>
        </section>
      </div>
      <footer className="info-actions">
        <button className="secondary" disabled={!m.atoms.length} onClick={() => u.set({ dialog: "3d" })}>View molecule in 3D</button>
        <button
          className="primary"
          disabled={!m.atoms.length}
          onClick={() => u.set({ dialog: "analysis" })}
        >
          <Icon name="flask" size={16} />
          Analyze Structure
          <Icon name="arrow" size={15} />
        </button>
        <div>
          <button
            className="secondary"
            disabled={!analysis.smiles}
            onClick={doCopy}
          >
            <Icon name="copy" size={13} />
            Copy SMILES
          </button>
          <button
            className="secondary"
            disabled={!m.atoms.length}
            onClick={png}
          >
            <Icon name="download" size={13} />
            PNG
          </button>
        </div>
        <span>Local editing · 3D lookup shares SMILES only when requested.</span>
      </footer>
    </aside>
  );
}
