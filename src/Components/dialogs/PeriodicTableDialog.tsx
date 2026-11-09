import { useRef, useState, type CSSProperties } from "react";
import { Modal } from "../common/Modal";
import { Icon } from "../common/Icon";
import { PERIODIC_ELEMENTS, findElements, periodicNeighbor, type PeriodicElement } from "../../utils/periodicTable";
import { useUIStore } from "../../store/chemUIStore";
import "./PeriodicTable.css";

const families: Record<string,string> = {
  "Nonmetal": "#8c71ba", "Noble gas": "#738fb5", "Alkali metal": "#b67b83",
  "Alkaline earth metal": "#b6975b", "Metalloid": "#6d9a84", "Halogen": "#51998e",
  "Transition metal": "#a481bc", "Post-transition metal": "#7a9299",
  "Lanthanide": "#bd8ca5", "Actinide": "#ad9273",
};

export function PeriodicTableDialog({onClose}: {onClose: () => void}) {
  const selected = useUIStore(s => s.atom);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(PERIODIC_ELEMENTS.find(e => e.symbol === selected)?.number ?? 6);
  const refs = useRef(new Map<number,HTMLButtonElement>());
  const results = findElements(query);
  const filtered = !!query.trim();
  const choose = (e: PeriodicElement) => {
    useUIStore.getState().set({atom: e.symbol, tool: "draw", pendingAtom: null});
    useUIStore.getState().notify(`${e.name} selected. Click or tap the canvas to place ${e.symbol}.`);
    onClose();
  };
  const tile = (e: PeriodicElement) => <button
    key={e.number}
    ref={node => { if (node) refs.current.set(e.number,node); else refs.current.delete(e.number); }}
    className={`periodic-element ${selected === e.symbol ? "is-current" : ""}`}
    style={{"--element-family": families[e.family] ?? "#8c71ba", ...(filtered ? {} : {gridColumn: e.column, gridRow: e.row + 1})} as CSSProperties}
    tabIndex={filtered || e.number === focused ? 0 : -1}
    aria-label={`${e.name} (${e.symbol}), atomic number ${e.number}`}
    aria-pressed={selected === e.symbol}
    title={`${e.name} · ${e.family} · ${e.number}`}
    onFocus={() => setFocused(e.number)}
    onClick={() => choose(e)}
    onKeyDown={event => {
      if (!filtered && ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(event.key)) {
        event.preventDefault();
        refs.current.get(periodicNeighbor(e.number,event.key))?.focus();
      }
    }}
  ><span className="periodic-number">{e.number}</span><strong>{e.symbol}</strong><span className="periodic-name">{e.name}</span>{selected === e.symbol && <Icon name="check" size={10}/>}</button>;
  return <Modal title="Choose an element" onClose={onClose} wide className="periodic-modal">
    <div className="periodic-body">
      <div className="periodic-search">
        <label>Find an element<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Name, symbol or number" onKeyDown={e => {if (e.key === "Enter" && results.length === 1) choose(results[0]);}}/></label>
        <span className="periodic-selection">Drawing <b>{selected}</b></span>
      </div>
      <p className="periodic-instruction">Select an element to start drawing. On a keyboard, use arrow keys within the table and Enter to select.</p>
      {filtered ? <>
        <p className="periodic-result-count" role="status">{results.length} {results.length === 1 ? "element" : "elements"} found</p>
        {results.length ? <div className="periodic-results">{results.map(tile)}</div> : <p className="notice">No elements match. Try a symbol such as Fe, a name such as iron, or an atomic number such as 26.</p>}
      </> : <>
        <p className="periodic-swipe">Swipe sideways to explore the table, or search above.</p>
        <div className="periodic-scroll" role="region" aria-label="Periodic table of all 118 elements">
          <div className="periodic-grid">
            {Array.from({length:18},(_,i) => <span className="periodic-group" key={`group-${i}`} style={{gridColumn:i+1,gridRow:1}}>{i+1}</span>)}
            <div className="periodic-gap-label" style={{gridColumn:3,gridRow:7}}>57–71<br/>Lanthanides</div>
            <div className="periodic-gap-label" style={{gridColumn:3,gridRow:8}}>89–103<br/>Actinides</div>
            <span className="periodic-series-label" style={{gridColumn:"1 / 3",gridRow:10}}>Lanthanides</span>
            <span className="periodic-series-label" style={{gridColumn:"1 / 3",gridRow:11}}>Actinides</span>
            {PERIODIC_ELEMENTS.map(tile)}
          </div>
        </div>
      </>}
      <div className="periodic-legend">{Object.entries(families).map(([name,color]) => <span key={name}><i style={{background:color}}/>{name}</span>)}</div>
      <p className="periodic-note">For less common elements, set hydrogens and charges explicitly. Automatic valence and bonding models remain limited; adding an element does not validate its chemistry.</p>
    </div>
  </Modal>;
}
