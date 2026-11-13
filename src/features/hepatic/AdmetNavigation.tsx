import "./Hepatic.css";
export function AdmetNavigation({active}:{active:"skin"|"hepatic"}) {
  return <nav className="admet-navigation" aria-label="ADMET endpoints"><a className="secondary" href="#/admet" aria-current={active==="skin"?"page":undefined}>Skin permeability</a><a className="secondary" href="#/hepatic-clearance" aria-current={active==="hepatic"?"page":undefined}>Hepatic clearance</a></nav>;
}
