import { useState } from "react";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import type { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { estimateLogD } from "../../engine/toolkit";
import { exportChemistry } from "../../engine/chemicalExport";
import { Icon } from "../common/Icon";
export function Descriptors({analysis: a}: {analysis: ReturnType<typeof useMoleculeAnalysis>}) {
  const m = useMoleculeStore(s => s.molecule);
  const [pH, setPH] = useState("7.4"), [pKa, setPKa] = useState("");
  const [kind, setKind] = useState<"acid" | "base">("acid");
  const [busy, setBusy] = useState(false);
  const d = a.toolkit;
  const neutral = m.atoms.every(atom => atom.charge === 0) && a.components === 1;
  let logD: number | null = null, inputError = "";
  if (d && neutral && pKa.trim() && pH.trim()) {
    try { logD = estimateLogD(d.logP, Number(pH), Number(pKa), kind); }
    catch (e) { inputError = (e as Error).message; }
  }
  const stats: [string, number | undefined, string, string][] = [
    ["LogP", d?.logP, "", "Wildman–Crippen lipophilicity estimate for the structure as drawn"],
    ["TPSA", d?.tpsa, "Å²", "Topological polar surface area"],
    ["HBD", d?.donors, "", "Hydrogen bond donors"],
    ["HBA", d?.acceptors, "", "Hydrogen bond acceptors"],
    ["Rotatable bonds", d?.rotatable, "", "Strict rotatable-bond count; a measure of molecular flexibility"],
    ["Molar refractivity", d?.molarRefractivity, "cm³/mol", "Wildman–Crippen estimate related to molecular polarizability"],
    ["Formal charge", d?.charge, "", "Net formal molecular charge"],
    ["Ring count", d?.rings, "", "RDKit perceived ring count"],
    ["Heavy atom count", d?.heavyAtoms, "", "Number of non-hydrogen atoms"],
  ];
  return <section className="descriptor-section">
    <div className="info-section-title"><h3>Molecular descriptors</h3><span>{d?.engine || "Local chemistry engine"}</span></div>
    {a.toolkitLoading && <p role="status" className="notice">Calculating descriptors… The chemistry engine may take a moment to load the first time.</p>}
    {a.toolkitError && <div className="chemistry-error" role="alert"><p>{a.toolkitError}</p><button className="secondary" onClick={a.retryToolkit}>Retry calculation</button></div>}
    <div className="descriptor-grid">{stats.map(([label,value,unit,help]) => <div className="descriptor-card" key={label} title={help}><span>{label}</span><strong>{value === undefined ? "—" : Number.isInteger(value) ? value : value.toFixed(2)} <small>{value === undefined ? "" : unit}</small></strong><p>{help}</p></div>)}</div>
    <div className="logd-panel">
      <h3>LogD at your pH <span className="estimate-tag">Estimate</span></h3>
      <p className="muted">For a neutral molecule with one ionizable site. Enter its pKa; the app does not predict pKa.</p>
      <div className="logd-inputs">
        <label>Ionization<select value={kind} onChange={e => setKind(e.target.value as "acid" | "base")}><option value="acid">Monoprotic acid</option><option value="base">Monoprotic base</option></select></label>
        <label>pH<input type="number" min="0" max="14" step="0.1" value={pH} onChange={e => setPH(e.target.value)}/></label>
        <label>pKa<input type="number" min="-20" max="30" step="0.1" placeholder="Enter pKa" value={pKa} onChange={e => setPKa(e.target.value)}/></label>
      </div>
      <output aria-live="polite">{logD === null ? "LogD: —" : `LogD at pH ${pH}: ${logD.toFixed(2)}`}</output>
      {!neutral && <p className="chemistry-error">Use one neutral molecule for this estimate. Charged structures, salts and zwitterions need a more detailed model.</p>}
      {inputError && <p className="chemistry-error" role="alert">{inputError}</p>}
      <p className="descriptor-note">Henderson–Hasselbalch approximation: acid, LogD = LogP − log₁₀(1 + 10^(pH − pKa)); base, reverse pH and pKa. Assumes only the neutral species partitions into octanol. Not suitable for multiple ionizable sites or measured-data replacement. Inputs reset when the chemistry changes.</p>
    </div>
    <button className="secondary" disabled={!d || busy} onClick={async () => {
      setBusy(true);
      try { await exportChemistry(m, "csv", logD !== null ? {pH: Number(pH), pKa: Number(pKa), kind} : undefined); useUIStore.getState().notify("Properties CSV downloaded."); }
      catch (e) { useUIStore.getState().notify((e as Error).message); }
      finally { setBusy(false); }
    }}><Icon name="download" size={15}/>{busy ? "Preparing…" : "Download properties CSV"}</button>
    <p className="descriptor-note">RDKit calculates these descriptors locally from the current structure. LogP and molar refractivity are estimates; charged-structure LogP is not a neutral-parent prediction. Values update after atom, bond, charge and hydrogen edits.</p>
  </section>;
}
