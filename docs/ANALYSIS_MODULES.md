# Phase 2 — Analysis Modules

## Completed Phase 2 scope

Phase 2 provides Physicochemical properties, five-filter Drug-likeness screening, Medicinal Chemistry structural alerts, and saved-result visualizations. Each destination uses the Foundation stores, projects, immutable versions, error handling and responsive navigation. Comparison, batch workflows and report building belong to Research Tools; trained solubility/ADMET models remain in Predictions.

The remaining three filters are implemented as explicitly named operational variants. Ghose uses MW 160–480, Crippen LogP -0.4–5.6, Crippen MR 40–130 and 20–70 total atoms including H. Egan uses WLOGP <= 5.88 and RDKit TPSA <= 131.6. Muegge uses the documented property ranges (MW 200–600, LogP -2–5, TPSA <= 150, rings <= 7, carbon >= 5, heteroatoms excluding C/H >= 2, rotatable bonds <= 15, HBA <= 10, HBD <= 5), with Crippen LogP clearly identified as a substitution for XLOGP-based variants. These implementations do not reproduce the original closed-source descriptor software, multivariate Egan ellipse, or Muegge pharmacophore-point classifier. Source and implementation differences are visible in each rule card.

References: [Ghose et al.](https://doi.org/10.1021/cc9800071), [Egan et al.](https://doi.org/10.1021/jm000292e), [Muegge et al.](https://doi.org/10.1021/jm015507e), and [SwissADME implementation notes](https://doi.org/10.1038/srep42717). The original two-filter method remains frozen as described below.

## First increment and retained history: Drug-likeness

The initial module implemented Lipinski Rule of Five and the Veber TPSA variant. Their existing results remain valid historical records. New saves use the five-filter `drug-likeness-v2` method without overwriting those earlier results.

### Exact implemented definitions

| Screen | Criteria (inclusive) | Guideline outcome |
| --- | --- | --- |
| Lipinski / RDKit operational implementation | MW <= 500 g/mol; Wildman-Crippen LogP <= 5; RDKit NumHBD <= 5; RDKit NumHBA <= 10 | Within guideline with at most one criterion violation; outside with two or more. Each violation is still shown individually. |
| Veber / TPSA variant | RDKit strict rotatable bonds <= 10; RDKit TPSA <= 140 square angstroms | Within guideline only when both criteria meet the limits. |

These outcomes use the complete, unrounded numbers from the shared RDKit calculation. Display values are rounded to three decimal places unless that would hide a threshold crossing. CSV contains the unrounded numbers. Missing/nonfinite descriptors and invalid count inputs produce Not evaluable; they are never replaced with zeros.

The initial applicability policy evaluates one connected, neutral, carbon-containing structure. Salts, disconnected mixtures, charged atoms (including net-neutral zwitterions), and carbon-free structures receive Not evaluable. No charge neutralization, fragment removal or protonation adjustment is performed. Graphs rejected by the existing chemistry engine cannot produce a screening.

### Methods and interpretation

- [Lipinski et al. (1997), Experimental and computational approaches to estimate solubility and permeability in drug discovery and development settings](https://doi.org/10.1016/S0169-409X(96)00423-1). The app uses its existing RDKit Wildman-Crippen estimate with the calculated LogP threshold of 5, not MLOGP with threshold 4.15. HBD/HBA are RDKit NumHBD/NumHBA; they are not the original simplified nitrogen/oxygen counting definitions. The card explicitly identifies this as an operational RDKit implementation and does not claim identical results to SwissADME or the original software.
- [Veber et al. (2002), Molecular properties that influence the oral bioavailability of drug candidates](https://doi.org/10.1021/jm020017n). The app implements the TPSA branch using RDKit's existing strict rotatable-bond count. It does not combine this with the alternative donor-plus-acceptor criterion from the paper, reproduce the original surface-area calculation, or predict a human absorption probability. The underlying study concerned oral bioavailability in rats.
- [RDKit descriptor definitions](https://www.rdkit.org/docs/cppapi/namespaceRDKit_1_1Descriptors.html) and [rotatable-bond options](https://www.rdkit.org/docs/source/rdkit.Chem.rdMolDescriptors.html). Wildman-Crippen LogP is an estimate; the strict rotatable-bond implementation excludes bonds such as amide and ester bonds. Counts and values can differ across descriptor implementations.

A guideline outcome is not a clinical prediction, toxicity assessment, evidence of activity, measured bioavailability, or a probability. A molecule meeting both screens can still fail in development; a useful drug can fall outside their ranges. The app does not fabricate a bioavailability score, ADMET endpoint, or structural alert.

## Foundation integration

The new page reads the existing molecule store and `useMoleculeAnalysis`. It does not accept a separate molecule input, recalculate descriptors independently, or modify the graph. Properties and Drug-likeness share an Active Molecule card with project, molecule name, formula, mass, saved/draft version state, View structure and Change molecule actions. Library can activate a saved version directly into screening.

Saving a screening requires an unchanged saved molecule version and a completed chemistry calculation bound to that graph. The workspace transaction stores/reuses the exact descriptor snapshot and then stores a screening referencing its ID. Either both commit or neither does. Repeated saves of identical inputs do not duplicate results. A different source descriptor snapshot produces an independent result; the old result remains intact.

If the drawing changes, its live screening updates. Saved results remain clearly labelled under their original version; the draft cannot overwrite them. Returning to a saved version restores its context, while Undo remains available across ordinary module navigation. Reload still starts with the intro, then recovers the saved draft and version context.

The result union is discriminated by method:

| Method | Payload | Provenance |
| --- | --- | --- |
| rdkit-descriptors-v1 | Local graph analysis and ToolkitResult | Structure version, chemistry key, RDKit engine version, timestamp |
| drug-likeness-v1 | DrugLikenessResult | Same structure version/key and engine, descriptorResultId, lipinski-veber-rdkit-v1 rules version, timestamp |
| drug-likeness-v2 | ExtendedScreening | Exact descriptorResultId, five-filters-crippen-v2 rules version, same graph/version, engine and timestamp |
| structural-alerts-v1 | AlertResult | Exact graph/version, rdkit-2026.09.2-pains-brenk-v1 catalog, engine, canonical SMILES, mapped atom/bond IDs and timestamp |

Workspace schema version 1 remains backward compatible with Foundation descriptor-only backups. Restore validates the descriptor reference and reconstructs the expected rule outcomes from the referenced saved inputs and graph; altered thresholds/statuses, missing sources and unknown method versions are rejected. Restored descriptor values are retained as recorded, not independently certified. The live calculation is separate and uses the installed RDKit engine.

Saved screening CSV exports the stored result and its source descriptor snapshot without recalculating historical chemistry. Live CSV identifies unsaved drafts explicitly and includes its export timestamp. User-controlled text is quoted and protected against spreadsheet formula injection.

## Code boundaries

- `src/features/drugLikeness/rules.ts`: pure, versioned thresholds, applicability, method references and display formatting; no storage or browser dependency.
- `RuleCards.tsx`: reusable live/historical criterion display, source and interpretation details.
- `exports.ts`: pure live/saved CSV builders, with version/source consistency checks.
- `DrugLikenessPage.tsx`: presentation and actions using the existing stores and chemistry hook.
- `DrugLikeness.css`: styles using the existing colors, fonts, borders, spacing and responsive layout.
- Workspace `types.ts`, `domain.ts`, `store.ts`: typed result variants, atomic persistence and backup validation; no account logic is embedded in the module.
- Workspace `components/ActiveMoleculeCard.tsx`: shared active-molecule identity and navigation.

Further result methods must add a typed payload, a documented immutable method version, source/input provenance, validation, tests, and a separate page or clearly scoped submodule. Authentication and owner-scoped repositories remain separate from these calculations.

## Medicinal Chemistry / structural alerts

The complete RDKit Release_2026_09_2 catalog is bundled: 480 PAINS patterns (A:16, B:55, C:409) and 105 Brenk patterns. Original source files, a SHA-256 manifest, the public RDKit test molecules and the BSD-3-Clause license are retained under `vendor/rdkit-filter-catalog`. `node tools/build-alert-catalog.mjs --check` verifies every generated name/SMARTS definition against the pinned files; the same check runs in the test suite. The generated table adds IDs and set labels without changing SMARTS. Raw file line endings are protected by the vendor `.gitattributes` so scientific hashes survive Windows checkouts. The license is retained in source, published under `licenses/`, and embedded in the standalone HTML.

The matcher uses the same core query-hydrogen merging operation as RDKit FilterCatalog. MinimalLib JS does not expose `mergeHs` on `get_qmol`; the compiled query is round-tripped through RDKit query JSON and `get_mol` with `sanitize:false`, `removeHs:false`, `mergeQueryHs:true`, `assignStereo:false`. This preserves recursive queries and avoids expanding target hydrogens, which would change atom-degree predicates such as `[D2]`. All query objects and molecular copies are deleted on success, failure and cancellation.

Tests check RDKit's three public PAINS reference examples, first-match names and original heavy-atom mappings. The reference's first example contains bond-direction stereo annotations; the test uses its connectivity-only form because the editor intentionally rejects unsupported stereo. Production imports never silently remove stereo. Degree-sensitive long-chain and hydrogen-sensitive examples are also checked.

Alert counts are matched catalog definitions, not toxicity scores or total molecule counts. Every pattern is screened before a Complete result is produced. Per-pattern mapped occurrences are capped at 128 and a capped value is labelled "at least". Highlights show the union of those mapped editor atoms and bonds. The local release supports one connected structure with at most 250 drawn atoms; other inputs receive Not evaluable, not a false zero. Invalid queries or execution failures produce no complete result. Changing the graph or leaving the page cancels an in-flight request. No fragment removal, tautomer normalization or charge adjustment is performed; explicit/implicit hydrogen representation follows the graph and RDKit's query semantics.

Selected matches can be highlighted in the structure preview, downloaded as SVG, and selected in the existing editor. CSV includes the original SMARTS/name, set, catalog/method/engine, structure/result IDs, mapped editor IDs, count caps and references. Saved snapshots keep their original mappings and cannot be attached to a different graph/version. Restore validates definitions, graph links and mapping IDs. Imported match claims are not independently rerun during synchronous backup validation; rerun the live screen for scientific verification.

References: [PAINS: Baell & Holloway (2010)](https://doi.org/10.1021/jm901137j), [Brenk et al. (2008)](https://doi.org/10.1002/cmdc.200700139), [pinned RDKit catalog](https://github.com/rdkit/rdkit/tree/Release_2026_09_2/Code/GraphMol/FilterCatalog). A structural alert is a review signal, not proof of interference, toxicity or inactivity. No catalog matches do not establish safety.

## Molecular visualizations

The visualization page reads only stored descriptor snapshots. Users select a recorded molecule/version and choose horizontal/vertical axes from MW, LogP, TPSA, HBD, HBA, strict rotatable bonds, ring count and molar refractivity. Optional dashed property limits identify Lipinski/Veber reference cutoffs; they do not classify absorption, BBB penetration, or safety. Axes expand to include negative and out-of-range inputs without silently clipping the point. Raw values and source identifiers are included in exported SVG/CSV; the screen rounds display text to three decimals.

Recorded rule outcomes are shown only when their `descriptorResultId` matches the selected source. Recorded alert counts identify their own catalog, engine and saved structure version. Missing analyses say Not calculated, never zero. Selecting a source is inspection only; Activate this saved version explicitly restores it through the existing draft-switch guard. The page does not duplicate chemistry calculations or create redundant analysis snapshots. BOILED-Egg prediction regions and probabilistic bioavailability scores are not presented as implemented models.

## Verification

The suite now contains 151 tests. New checks cover every upper/lower property boundary, original and expanded filter history, known RDKit descriptor examples, all 585 SMARTS definitions, pinned hashes and generated-source parity, public PAINS reference molecules and atom mappings, hydrogen/degree-sensitive queries, cancellation, supported-size limits, match caps, mapping corruption, immutable alert history, storage failure, plot negative/outlier values, source consistency, safe metadata and vector/CSV exports. The existing chemistry, import/export, editor history, label preference and responsive-navigation tests remain. Build/type checking and lint are also required.

Browser verification covers saved aspirin screening, Properties/source navigation, draft edits with historical result preservation, Undo across modules, live non-evaluable zwitterion behavior, saved CSV download, backup/restore, reload recovery, and desktop/phone/tablet layouts. Browser viewport checks do not replace physical iOS/Android release testing.

## Next phase

Research Tools can build comparison, bounded batch imports, and reports around these stored result contracts. Predictions require separately selected and validated model/services, with their own input settings and provenance. Student/researcher authentication remains a session/repository concern; none is embedded in rule, alert or plotting calculations.
