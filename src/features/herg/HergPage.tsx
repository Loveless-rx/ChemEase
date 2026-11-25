import { chemistryKey } from "../../engine/toolkit";
import { useEffect, useRef, useState } from 'react';
import { useMoleculeStore } from '../../store/moleculeStore';
import { useMoleculeAnalysis } from '../../hooks/useMoleculeAnalysis';
import { useWorkspaceStore } from '../workspace/store';
import { snapshotKey } from '../workspace/domain';
import { ActiveMoleculeCard } from '../workspace/components/ActiveMoleculeCard';
import { LibraryStructurePicker } from '../admet/LibraryStructurePicker';
import type { PageActions } from '../workspace/pageActions';
import { downloadBlob } from '../../engine/export';
import { exportIdentity } from '../account/access';
import { startHerg } from './client';
import { HERG_MODEL, hergInputReasons, hergLimitations, hergRows, hergSources, type HergResult } from './model';
import '../research.css';
import '../solubility/Solubility.css';

function Values({ result }: { result: HergResult }) {
  return <><div className="solubility-values"><div><span>hERG blocker-class score</span><strong>{result.score.toFixed(4)}</strong><small>0–1 model output · no clinical threshold assigned</small></div><div><span>Ensemble</span><strong>5 models</strong><small>Directed molecular graph + 200 normalized features</small></div></div><p className="descriptor-note">A larger score supports the blocker class in this model. It is not a measured binding value or a confidence percentage.</p><details><summary>Exact score, inputs and model provenance</summary><dl className="solubility-inputs">{hergRows(result).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></details></>;
}
function csv(result: HergResult, name: string, resultId?: string, versionId?: string) {
  const cell = (value: string) => `"${value.replace(/^\s*[=+@-]/, "'$&").replaceAll('"', '""')}"`;
  const rows = [['ChemEase', 'hERG research prediction'], ['Exported by', exportIdentity()], ['Molecule', name], ['Result ID', resultId ?? 'Unsaved prediction'], ['Version ID', versionId ?? 'Unsaved draft'], ...hergRows(result), ['Raw descriptor vector', JSON.stringify(result.raw)], ['Normalized float32 vector', JSON.stringify(result.normalized)]];
  downloadBlob(new Blob(['\uFEFF' + rows.map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' }), 'ChemEase-hERG-prediction.csv');
}
export function HergPage({ actions }: { actions: PageActions }) {
  const graph = useMoleculeStore(s => s.molecule), analysis = useMoleculeAnalysis();
  const { data, writable, pending } = useWorkspaceStore();
  const key = snapshotKey(graph);
  const operation = useRef<ReturnType<typeof startHerg> | null>(null);
  const [result, setResult] = useState<{owner:string;prediction:HergResult} | null>(null), [stage, setStage] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const version = data.versions.find(v => v.id === data.active.versionId), exact = !!version && snapshotKey(version.graph) === key;
  const reasons = hergInputReasons(graph);
  const visible = result?.owner === data.ownerId && result.prediction.structureKey === chemistryKey(graph) ? result.prediction : null;
  const history = data.results.filter(r => r.method === 'herg-admet-ai-v1' && r.versionId === version?.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  useEffect(() => () => { operation.current?.cancel(); }, []);
  const calculate = async () => {
    if (!analysis.toolkit || reasons.length || busy) return;
    const captured = key, owner = data.ownerId; setBusy(true); setError(''); setStage('Preparing browser prediction…');
    const job = startHerg(analysis.toolkit.smiles, chemistryKey(graph), setStage); operation.current = job;
    try { const next = await job.promise; if (snapshotKey(useMoleculeStore.getState().molecule) === captured && useWorkspaceStore.getState().data.ownerId === owner) setResult({owner,prediction:next}); else setError('The structure changed during calculation. Run the prediction for the current structure.'); }
    catch (e) { setError((e as Error).message); }
    finally { operation.current = null; setBusy(false); setStage(''); }
  };
  const save = async () => {
    if (!version || !visible || !exact) return;
    setError(''); try { await useWorkspaceStore.getState().saveHerg(version.id, graph, visible); } catch (e) { setError((e as Error).message); }
  };
  return <main className="ws-page research-page"><div className="ws-page-heading"><div><span className="eyebrow">ADMET / TOXICITY RESEARCH</span><h1>hERG blocker prediction</h1><p>Explore a published molecular-graph model with a verified browser conversion.</p></div><button className="secondary" onClick={() => actions.navigate('reports')}>Open research reports →</button></div><LibraryStructurePicker actions={actions}/>{graph.atoms.length ? <><ActiveMoleculeCard analysis={analysis} actions={actions}/><section className="ws-card"><span className="ws-badge">Browser only · {HERG_MODEL}</span><h2>A traceable prediction for this structure</h2><p>The first run loads about 92 MB of scientific runtime and model files from this site. Calculation runs in a background worker; your molecule is not sent to an inference server. Browser memory and network speed affect the first load.</p>{reasons.length > 0 && <div className="ws-inline-note" role="status">{reasons.map(reason => <p key={reason}>{reason}</p>)}</div>}<div className="ws-actions"><button className="primary" disabled={busy || !!reasons.length || !analysis.toolkit} onClick={() => void calculate()}>{busy ? 'Calculating…' : 'Run hERG prediction'}</button>{busy && <button className="secondary" onClick={() => operation.current?.cancel()}>Cancel prediction</button>}</div>{stage && <p role="status" aria-live="polite">{stage}</p>}{analysis.toolkitError && <p role="alert">{analysis.toolkitError} <button onClick={analysis.retryToolkit}>Retry structure calculation</button></p>}{error && <p role="alert">{error}</p>}{visible && <><Values result={visible}/><div className="ws-actions">{exact ? <button className="primary" disabled={!writable || !!pending || history.some(r => r.method === 'herg-admet-ai-v1' && r.prediction.score === visible.score && r.prediction.inputSmiles === visible.inputSmiles)} onClick={() => void save()}>Save hERG prediction</button> : <button className="primary" onClick={actions.save}>Save version first</button>}<button className="secondary" onClick={() => csv(visible, graph.metadata.name, undefined, exact ? version?.id : undefined)}>Download prediction CSV</button></div></>}</section><section className="ws-card"><h2>Saved prediction history</h2>{!exact && version && <p className="ws-inline-note">History belongs to saved version {version.number}, not the edited draft.</p>}{history.length ? history.map(record => record.method === 'herg-admet-ai-v1' && <article className="solubility-history" key={record.id}><span className="ws-badge">Version {version?.number} · score {record.prediction.score.toFixed(4)}</span><p>{new Date(record.createdAt).toLocaleString()} · {record.id}</p><Values result={record.prediction}/><button className="secondary" onClick={() => csv(record.prediction, version!.graph.metadata.name, record.id, record.versionId)}>Download saved hERG CSV</button></article>) : <p>No saved hERG prediction for this version.</p>}</section></> : <section className="ws-empty"><h2>Choose a molecule to begin.</h2><p>Open a saved structure above, import SMILES, or draw in the editor.</p><div className="ws-actions"><button className="primary" onClick={actions.smiles}>Import SMILES</button><button className="secondary" onClick={() => actions.navigate('editor')}>Open editor</button></div></section>}<section className="ws-card"><h2>Evidence and interpretation</h2><p>{hergLimitations}</p><p>Five pinned ADMET-AI v1.4.0 classification checkpoints, hERG task index 30. Native/browser checks cover 78 structures and 15,600 normalized feature values, with a maximum ensemble difference below 8 × 10⁻⁸. This release supports connected, uncharged organic structures with 2–80 atoms and these elements: B, C, N, O, F, P, S, Cl, Br and I. Unsupported chemical states are rejected.</p><div className="solubility-links"><a href={hergSources.paper} target="_blank" rel="noreferrer">Model publication ↗</a><a href={hergSources.code} target="_blank" rel="noreferrer">Pinned model source ↗</a><a href={hergSources.endpoint} target="_blank" rel="noreferrer">hERG endpoint ↗</a></div></section></main>;
}
