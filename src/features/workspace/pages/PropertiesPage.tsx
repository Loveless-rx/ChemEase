import { useState } from "react";
import { Descriptors } from "../../../Components/sidebar/Descriptors";
import { useMoleculeAnalysis } from "../../../hooks/useMoleculeAnalysis";
import { useMoleculeStore } from "../../../store/moleculeStore";
import { downloadBlob } from "../../../engine/export";
import { chemistryKey } from "../../../engine/toolkit";
import { useWorkspaceStore } from "../store";
import { snapshotKey } from "../domain";
import { savedResultCsv } from "../resultExport";
import type { PageActions } from "../pageActions";
import type { SavedDescriptorAnalysis } from "../types";
import { sameDescriptors } from "../descriptorCache";
import { ActiveMoleculeCard } from "../components/ActiveMoleculeCard";

export function PropertiesPage({actions}:{actions:PageActions}) {
  const a=useMoleculeAnalysis(), graph=useMoleculeStore(s=>s.molecule), data=useWorkspaceStore(s=>s.data);
  const [busy,setBusy]=useState(false),[error,setError]=useState("");
  const version=data.versions.find(v=>v.id===data.active.versionId);
  const exact=version&&snapshotKey(version.graph)===snapshotKey(graph);
  const results=data.results.filter((r):r is SavedDescriptorAnalysis=>r.method==="rdkit-descriptors-v1"&&r.versionId===version?.id);
  const saved=results.some(r=>!!a.toolkit&&sameDescriptors(r.descriptors,a.toolkit));
  return <div className="ws-page ws-properties"><div className="ws-page-heading"><div><span className="eyebrow">ONE STRUCTURE, SHARED CALCULATIONS</span><h1>Physicochemical properties</h1><p>Explore the current drawing. Save an analysis to a specific molecule version.</p></div><button className="secondary" onClick={()=>actions.navigate("drug-likeness")}>Drug-likeness screening →</button></div>{!graph.atoms.length?<div className="ws-empty"><h3>Start with a molecule.</h3><p>Draw or import a structure to calculate its properties.</p><button className="primary" onClick={actions.smiles}>Import SMILES</button></div>:<><ActiveMoleculeCard analysis={a} actions={actions}/><Descriptors key={chemistryKey(graph)} analysis={a}/><section className="ws-result-history"><div className="ws-section-heading"><div><h2>Analysis history</h2><p className="muted">Results stay attached to their saved structure, even after you edit the drawing.</p></div>{exact?<button className="primary" disabled={!a.toolkit||busy||saved} onClick={async()=>{
    setBusy(true);setError("");
    try{await useWorkspaceStore.getState().saveAnalysis(version.id,structuredClone(graph),a.toolkit!);}catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }}>{saved?"Analysis saved":busy?"Saving…":"Save analysis"}</button>:<button className="primary" onClick={actions.save}>Save version first</button>}</div>{error&&<p role="alert" className="chemistry-error">{error}</p>}{!exact&&version&&<p className="ws-inline-note">The results below belong to saved version {version.number}. They do not describe the edited draft.</p>}{results.length?results.map(r=><article className="ws-card ws-saved-result" key={r.id}><div><span className="ws-badge">Version {version!.number} · stored result</span><h3>{r.local.formula} · {r.descriptors.smiles}</h3><p>LogP {r.descriptors.logP.toFixed(3)} · TPSA {r.descriptors.tpsa.toFixed(2)} Å² · HBD {r.descriptors.donors} · HBA {r.descriptors.acceptors}</p><small>{r.engine} · {new Date(r.createdAt).toLocaleString()}</small></div><button className="secondary" onClick={()=>downloadBlob(new Blob([savedResultCsv(r,version!)],{type:"text/csv;charset=utf-8"}),`ChemEase-v${version!.number}-analysis.csv`)}>Download saved result</button></article>):<div className="ws-empty"><p>No stored analysis for this version. Save a version, then save its completed RDKit calculation.</p></div>}<p className="descriptor-note">Saved snapshots include RDKit descriptors and their engine version. The interactive LogD estimate above is exported through the live properties CSV with your pH/pKa inputs; it is not part of these saved snapshots. Imported backups restore stored values without independent scientific verification.</p></section></>}</div>;
}
