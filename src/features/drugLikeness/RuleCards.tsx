import { statusLabels } from "./rules";
import { allRuleMethods, criterionLimit, extendedCriterionValue, type AnyScreening } from "./extendedRules";

export function RuleCards({result}:{result:AnyScreening}) {
  return <div className="drug-rule-grid">{result.rules.map(rule=>{
    const method=allRuleMethods[rule.id];
    return <section key={rule.id} className="ws-card drug-rule" aria-label={method.name}>
      <header><div><span className="eyebrow">RULE-BASED SCREENING</span><h2>{method.name}</h2></div><span className={`drug-status ${rule.status}`}>{statusLabels[rule.status]}</span></header>
      <p>{method.description}</p>
      <div className="drug-criteria" role="table" aria-label={`${method.name} criteria`}>
        <div className="drug-criterion drug-criterion-heading" role="row"><span role="columnheader">Property</span><span role="columnheader">Value / limit</span><span role="columnheader">Check</span></div>
        {rule.criteria.map(c=><div className="drug-criterion" role="row" key={c.input}>
          <span role="cell">{c.label}</span>
          <span role="cell" className="drug-numeric" title={c.value===null?"No calculated value":String(c.value)}><strong>{extendedCriterionValue(c)}</strong><small>{criterionLimit(c)}</small></span>
          <span role="cell" className={`drug-check ${c.status}`}>{c.status==="within-limit"?"Within limit":c.status==="violation"?"Violation":"Not evaluable"}</span>
        </div>)}
      </div>
      <div className="drug-rule-footer"><strong>{rule.violations===null?"Screening unavailable":`${rule.violations} criterion violation${rule.violations===1?"":"s"}`}</strong><span>{rule.id==="lipinski"?"Guideline limit: at most 1":"Guideline limit: 0"}</span></div>
      <details><summary>Method, source and interpretation</summary><p>{method.implementation}</p><p>{rule.id==="lipinski"?"One violation still falls within this screening guideline. It does not mean every property passes.":rule.id==="veber"?"The source study examined oral bioavailability in rats; these thresholds do not establish human bioavailability.":"Property-range heuristics depend on descriptor definitions. An outcome does not establish safety, activity or oral absorption."}</p><a href={method.url} target="_blank" rel="noreferrer">{method.source} ↗</a></details>
    </section>;
  })}</div>;
}
