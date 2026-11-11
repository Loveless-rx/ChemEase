import { useState } from "react";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { useMoleculeStore } from "../../store/moleculeStore";
import { downloadBlob } from "../../engine/export";
import { useWorkspaceStore } from "../workspace/store";
import { snapshotKey } from "../workspace/domain";
import { sameDescriptors } from "../workspace/descriptorCache";
import { ActiveMoleculeCard } from "../workspace/components/ActiveMoleculeCard";
import type { PageActions } from "../workspace/pageActions";
import type { SavedDrugLikenessAnalysis, SavedExtendedScreening } from "../workspace/types";
import { statusLabels } from "./rules";
import { screenExtendedDrugLikeness as screenDrugLikeness, EXTENDED_RULES_VERSION as RULES_VERSION, allRuleMethods } from "./extendedRules";
import { RuleCards } from "./RuleCards";
import { screeningCsv, savedScreeningCsv } from "./exports";
import "./DrugLikeness.css";

export function DrugLikenessPage({actions}:{actions:PageActions}) {
  const a=useMoleculeAnalysis(),graph=useMoleculeStore(s=>s.molecule),data=useWorkspaceStore(s=>s.data);
  const [busy,setBusy]=useState(false),[error,setError]=useState("");
  const result=screenDrugLikeness(graph,a.toolkit);
  const version=data.versions.find(v=>v.id===data.active.versionId);
  const exact=!!version&&snapshotKey(version.graph)===snapshotKey(graph);
  const saved=data.results.filter((r):r is SavedDrugLikenessAnalysis|SavedExtendedScreening=>(r.method==="drug-likeness-v1"||r.method==="drug-likeness-v2")&&r.versionId===version?.id);
  const sourceResults=data.results.filter(r=>r.method==="rdkit-descriptors-v1");
  const alreadySaved=saved.some(r=>{
    const source=sourceResults.find(s=>s.id===r.descriptorResultId);
    return r.method==="drug-likeness-v2"&&!!source&&!!a.toolkit&&sameDescriptors(source.descriptors,a.toolkit);
  });
  const save=async()=>{
    if(!exact||!a.toolkit||!version)return;
    setBusy(true);setError("");
    try{await useWorkspaceStore.getState().saveDrugLikeness(version.id,structuredClone(graph),a.toolkit);}
    catch(e){setError((e as Error).message);}finally{setBusy(false);}
  };
  const exportLive=()=>{
    if(!a.toolkit)return;
    const csv=screeningCsv(result,{moleculeName:graph.metadata.name,smiles:a.toolkit.smiles,engine:a.toolkit.engine,
      versionId:exact?version!.id:"Unsaved draft",versionNumber:exact?version!.number:"Unsaved draft",resultId:"Live calculation · not a stored result",descriptorResultId:"Live shared descriptors",createdAt:new Date().toISOString()});
    downloadBlob(new Blob([csv],{type:"text/csv;charset=utf-8"}),"ChemEase-drug-likeness.csv");
  };
  return <div className="ws-page drug-page">
    <div className="ws-page-heading"><div><span className="eyebrow">PHASE 02 / ANALYSIS MODULES</span><h1>Drug-likeness</h1><p>Understand which property thresholds your molecule meets, and where the screening guidelines stop.</p></div><button className="secondary" onClick={()=>actions.navigate("properties")}>View source properties →</button></div>
    {!graph.atoms.length?<div className="ws-empty"><h2>A structure comes first.</h2><p>Draw or import a molecule. Its shared properties will feed this screening automatically.</p><div className="ws-actions"><button className="primary" onClick={actions.smiles}>Import SMILES</button><button className="secondary" onClick={()=>actions.navigate("editor")}>Open editor</button></div></div>:<>
      <ActiveMoleculeCard analysis={a} actions={actions}/>
      <div className="drug-intro ws-card"><div><span className="ws-badge">Heuristic · not a clinical prediction</span><h2>Five documented property screens.</h2><p>Lipinski, Veber, Ghose, Egan and the explicitly labelled Muegge Crippen variant use shared, unrounded molecular descriptors. Open each method note to see its exact implementation.</p></div><div className="drug-engine"><strong>{a.toolkit?.engine??"RDKit descriptors"}</strong><small>{RULES_VERSION}</small><button className="secondary" disabled={!a.toolkit} onClick={exportLive}>Download live screening CSV</button></div></div>
      {a.toolkitLoading&&<p role="status" className="notice">Calculating the shared molecular descriptors…</p>}
      {a.toolkitError&&<div className="chemistry-error" role="alert"><p>{a.toolkitError}</p><button className="secondary" onClick={a.retryToolkit}>Retry descriptors</button></div>}
      {!!a.toolkit&&result.reasons.length>0&&<div className="ws-inline-note" role="status"><strong>Screening is not evaluable for this structure.</strong>{result.reasons.map(reason=><p key={reason}>{reason}</p>)}</div>}
      {a.toolkit&&<RuleCards result={result}/>}
      <section className="drug-history" aria-label="Saved drug-likeness results"><div className="ws-section-heading"><div><h2>Screening history</h2><p className="muted">A saved screening includes its exact descriptor source and rule version.</p></div>{exact?<button className="primary" disabled={!a.toolkit||busy||alreadySaved} onClick={()=>void save()}>{alreadySaved?"Screening saved":busy?"Saving…":"Save screening"}</button>:<button className="primary" onClick={actions.save}>Save version first</button>}</div>
        {error&&<p role="alert" className="chemistry-error">{error}</p>}
        {!exact&&version&&<p className="ws-inline-note">Historical results below belong to saved version {version.number}, not the edited draft above.</p>}
        {saved.length?saved.map(r=>{
          const source=sourceResults.find(s=>s.id===r.descriptorResultId);
          if(!source||!version)return null;
          return <article className="ws-card drug-saved" key={r.id}><div className="ws-saved-result"><div><span className="ws-badge">Version {version.number} · stored screening</span><h3>{version.graph.metadata.name}</h3><p>{r.screening.rules.map(rule=>`${allRuleMethods[rule.id].name}: ${statusLabels[rule.status]}`).join(" · ")}</p><small>{r.engine} · {new Date(r.createdAt).toLocaleString()}</small></div><button className="secondary" onClick={()=>downloadBlob(new Blob([savedScreeningCsv(r,source,version)],{type:"text/csv;charset=utf-8"}),`ChemEase-v${version.number}-screening.csv`)}>Download saved screening</button></div><details><summary>View stored criteria and provenance</summary><p className="descriptor-note">Source descriptor result: {source.id}<br/>Rules: {r.screening.rulesVersion}<br/>Canonical SMILES: {source.descriptors.smiles}</p>{r.screening.reasons.map(reason=><p className="ws-inline-note" key={reason}>{reason}</p>)}<RuleCards result={r.screening}/></details></article>;
        }):<div className="ws-empty"><p>No saved screening for this molecule version. Save a version, then save its screening.</p></div>}
      </section>
      <section className="drug-limits ws-card"><h2>How to use these results</h2><p>These are property filters for early research. A molecule can meet all five guidelines and still be inactive, poorly absorbed or unsafe. A useful drug can also lie outside these ranges. This module does not calculate a bioavailability probability or score.</p><p>The first release evaluates one neutral, connected, carbon-containing molecule. Salts, mixtures, charged structures and zwitterions are marked not evaluable; the structure is never changed silently. PAINS and Brenk screening are available in Structural alerts. The Muegge Crippen variant does not claim XLOGP3 equivalence.</p><p className="descriptor-note">Saved results retain their original inputs. Restored backup values are not independently verified; the live screening uses the current local RDKit calculation. <a href="https://www.rdkit.org/docs/cppapi/namespaceRDKit_1_1Descriptors.html" target="_blank" rel="noreferrer">RDKit descriptor definitions ↗</a></p></section>
    </>}
  </div>;
}
