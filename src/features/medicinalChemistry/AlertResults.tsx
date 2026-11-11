import { useState } from "react";
import type { Molecule } from "../../models/Molecule";
import { moleculeSvg, downloadBlob } from "../../engine/export";
import { alertPatterns } from "./catalog";
import { alertSets, type AlertResult, type AlertMatch } from "./analysis";

const displayName=(name:string)=>name.replaceAll("_"," ").replace(/\(\d+\)$/,"").trim();

export function AlertResults({result,graph,onInspect}:{result:AlertResult;graph:Molecule;onInspect?:(match:AlertMatch)=>void}) {
  const [selectedId,setSelectedId]=useState(""),[filter,setFilter]=useState("all");
  const visible=result.matches.filter(m=>filter==="all"||alertPatterns.find(p=>p.id===m.patternId)?.set===filter);
  const selected=visible.find(m=>m.patternId===selectedId)??visible[0];
  const pattern=alertPatterns.find(p=>p.id===selected?.patternId);
  const svg=moleculeSvg(graph,{showCarbons:true,highlightAtoms:selected?.atomIds,highlightBonds:selected?.bondIds});
  return <div className="alerts-results">
    <div className="alerts-counts">{(["PAINS","BRENK"] as const).map(set=><div className="ws-card" key={set}><span>{alertSets[set].name}</span><strong>{result.status==="complete"?result.matches.filter(m=>alertPatterns.find(p=>p.id===m.patternId)?.set===set).length:"—"}</strong><small>{alertSets[set].patterns} catalog definitions</small></div>)}</div>
    {result.status!=="complete"?<p className="ws-inline-note" role="status">Not evaluable: {result.reason}</p>:<>
      <p className="descriptor-note">Completed {result.scannedPatterns}/{result.totalPatterns} patterns · {result.matches.length} distinct alert patterns matched. Counts are patterns, not molecules or a toxicity score.</p>
      {!result.matches.length?<div className="ws-empty"><h3>No catalog matches.</h3><p>All PAINS and Brenk definitions were screened. This does not establish safety or exclude other liabilities.</p></div>:<div className="alerts-inspector ws-card">
        <div className="alerts-list"><label>Alert set<select aria-label="Alert set" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All matched alerts</option><option value="PAINS">PAINS</option><option value="BRENK">Brenk</option></select></label><div className="alerts-pattern-list" aria-label="Matched alert patterns">{visible.map(match=>{const p=alertPatterns.find(p=>p.id===match.patternId)!;return <button key={p.id} aria-pressed={selected?.patternId===p.id} onClick={()=>setSelectedId(p.id)}><span>{displayName(p.name)}</span><small>{p.set} · {p.id}</small></button>;})}</div></div>
        <div className="alerts-fragment"><img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} alt={pattern?`Highlighted atoms matching ${pattern.name}`:"Molecular structure"}/>{pattern&&selected?<><span className="ws-badge">{pattern.set} · {pattern.id}</span><h3>{displayName(pattern.name)}</h3><p>{alertSets[pattern.set].meaning}</p><p className="descriptor-note">{selected.truncated?"At least ":""}{selected.occurrences} mapped occurrence{selected.occurrences===1?"":"s"}{selected.truncated?" (128-map display limit)":""}. Highlight shows the union of mapped editor atoms and bonds. Query hydrogens are merged into atom constraints, matching RDKit FilterCatalog behavior.</p><details><summary>SMARTS and source</summary><p>Original catalog label: {pattern.name}</p><code>{pattern.smarts}</code><a href={alertSets[pattern.set].url} target="_blank" rel="noreferrer">{alertSets[pattern.set].reference} ↗</a></details><div className="ws-actions">{onInspect&&<button className="secondary" onClick={()=>onInspect(selected)}>Select matched atoms in editor</button>}<button className="secondary" onClick={()=>downloadBlob(new Blob([svg],{type:"image/svg+xml"}),`${pattern.id}-highlight.svg`)}>Download highlighted SVG</button></div></>:<p className="muted">No matches in this alert set.</p>}</div>
      </div>}
    </>}
  </div>;
}
