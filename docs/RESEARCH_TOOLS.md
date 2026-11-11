# Phase 3 — Research Tools

Phase 3 is implemented locally: Molecule Comparison, bounded Batch Analysis and saved Research Reports. Predictions remain Phase 4. No prediction placeholder is exposed as a working service.

## Molecule Comparison

Open Comparison from the workspace navigation, Home or Molecular Visualizations. Filter the existing library by project/name, select a saved structure version and add it. Up to six distinct versions can be inspected together, including different versions of the same molecule. No separate molecule parser or editable graph is introduced.

Each column starts with the latest saved descriptor result for that exact version. Adding a column pins that result ID; its selector explicitly chooses any other recorded descriptor snapshot. Recorded identity, project, immutable structure thumbnail, version number, source IDs, timestamps and engines remain visible. Viewing columns does not change the active drawing. Open in Properties/Alerts explicitly activates the saved version using the Foundation's existing draft-switch guard. Selection is temporary while the comparison page is open; CSV/SVG exports keep a portable record. Navigating away or reloading clears the selection, but never removes library records or analyses.

The table compares formula, MW, Wildman–Crippen LogP, TPSA, HBD/HBA, strict rotatable bonds, molar refractivity, formal charge, RDKit ring count and heavy atom count. Numbers are displayed to three decimals with exact values in accessible labels/tooltips and CSV. Missing/nonfinite descriptor values say Not calculated, not zero. Rules are selected only when their descriptorResultId, version, chemistry key and engine match the selected source. Original two-filter results do not acquire invented Ghose/Egan/Muegge outcomes. Not evaluable remains distinct from missing. Alerts use the latest stored screen for the exact version/key, with their own catalog, engine and date. Counts remain matched pattern definitions, not toxicity scores.

The shared scatter plot uses the same stored values as the table, with selectable axes from the existing property-plot definitions. All points use one scale, expanded for negative/outlying values. Missing/nonfinite pairs are omitted rather than placed at zero. Numbered columns identify points without depending on color. Coincident points retain their exact coordinates and overlap; they are not jittered into fictional values. The standalone SVG embeds raw values, source result IDs, version IDs, engine and calculation timestamp in its description and a numbered legend. CSV includes every property, recorded screening/alert methods and provenance. User-controlled cells are quoted and guarded against spreadsheet formulas; SVG text/metadata is escaped.

Results from different descriptor engines are flagged as potentially incomparable. There is no normalization, recalculation, implied ranking of drugs, efficacy/safety verdict or clinical prediction. LogD needs settings absent from these descriptor snapshots; solubility and ADMET remain outside this increment.

## Boundaries

- `src/features/comparison/model.ts`: pure saved-result selection, exact-source joins, table helpers and CSV/SVG generation. No storage, session, network, chemistry execution or editor dependencies.
- `ComparisonPage.tsx`: existing owner-scoped workspace data and PageActions only; activation uses the established Foundation bridge.
- `Comparison.css`: existing colors, typography, controls and cards; stacked structure cards and a labelled, keyboard-focusable horizontal table region on phones.

The saved result schema and repository are unchanged. Future login/student/researcher permissions remain session/repository concerns. Batch Analysis can reuse the shared chemistry services and version persistence; Reports can consume these same recorded comparison inputs rather than rerunning historical chemistry.

## Validation

Eight added tests cover immutable inspection, distinct versions of the same molecule, missing versus zero/non-evaluable, exact descriptor-source selection, legacy two-filter history, mismatched/stale sources, duplicates and the six-version bound, raw precision and spreadsheet quoting, plot shared ranges/negative/outlier inputs, nonfinite omission, XML escaping and source provenance. Together with the existing chemistry/Foundation/Phase 2 regressions, all 159 tests pass. Lint and production/standalone builds are checked.

Browser checks cover three recorded structures (aspirin, catechol and a zwitterion), rule/alert missing states, CSV/SVG downloads, unchanged active identity during inspection, explicit saved-version activation into Properties, project/name filters, removal/clear, reopening and desktop/320px/390px/768px layouts. These are browser viewport checks, not physical iOS/Android device certification.


## Batch Analysis

`src/features/batch/model.ts` owns CSV/SMILES record parsing, bounded preview, cancellation-aware sequential orchestration and atomic row persistence. `BatchPage.tsx` adapts the shared RDKit loader/importer, chemistryService descriptor cache, existing five-filter evaluator and PAINS/Brenk service. There is no second chemistry implementation.

Choose an existing destination project, paste SMILES text or select a .smi/.txt/.csv file, and preview before saving. CSV requires a unique smiles header; name is optional, other identifier columns are accepted but not persisted. Quoted commas, doubled quotes, BOM and CRLF are handled. Broken CSV structure rejects the file; invalid molecule rows receive individual errors. Limits are 50 records, 250 KB and 250 drawn atoms per structure. General SDF import is explicitly unsupported, as are the editor's existing unsupported stereo/radical/wildcard inputs. Unsupported chemistry is rejected rather than simplified.

Preview shows structures, canonical SMILES, invalid entries and duplicates. Duplicate detection uses RDKit canonical SMILES within the input and known descriptor-backed versions in the destination project; saved versions without descriptor records are not claimed as checked duplicates. A second guard checks duplicates at commit time. Salts, charge states and tautomers are not normalized into one identity. The batch does not silently skip invalid rows and report them as successes.

Run saves descriptors and the selected filters/alerts for each valid nonduplicate row. Each row creates a normal library molecule/version and its results in one Foundation transaction, preserving the active editor selection and draft. Failed calculation or persistence creates no partial row record; other rows may succeed. Existing repository failures/revision conflicts remain visible. Cancel stops pending rows and discards results computed after cancellation; a transaction already committing may finish. Failed/cancelled rows can be reset and retried without re-running saved rows. Progress, per-row status, name/input-order sorting and status filters are available.

Saved rows show property summaries and link to their exact version in Properties. Results CSV preserves full descriptor precision, rule/alert outcomes and their source provenance, plus invalid/duplicate/failed rows with explicit missing states. A separate row-status CSV preserves input identity and failure reasons. Row descriptor IDs are pinned at successful commit. Batch preview/job state is temporary: leaving cancels remaining work, reload does not resume a queue, and completed structures/results remain in the normal Library. Export status before leaving. This bounded browser implementation does not claim a background server job service.

## Research Reports

`src/features/reports/model.ts` defines immutable `research-report-v1` references and pure report content. A report includes 1–6 distinct saved versions, title/notes, section choices and chart axes. Preview captures exact descriptor/screening/alert IDs; saving retains them, including explicit null references for results not calculated. Later calculations never fill those nulls or replace an old source. Screening links must match the selected descriptor and engine; alerts must match their exact version/key. Reports do not recalculate chemistry.

Identity, structures, formula/SMILES, selected properties, recorded filter outcomes, applicability reasons, alert pattern summaries, comparison chart, methods, references and limitations are supported. All values in the preview/CSV come from the same report sections. Chart points use the same stored inputs, shared axes and missing-value rules as Comparison. Methods retain the Phase 2 operational variants and their limits. Clinical safety/efficacy is never inferred.

Report definitions are stored in the optional workspace `reports` array (up to 100), within the same owner-scoped repository and 20 MB workspace size limit. Schema version 1 remains compatible with older backups lacking this field. Restore checks report IDs, settings, source/version references and exact screening joins. Projects are linked through each report's saved versions, and reports can include multiple projects. No session/login logic is embedded in reports. Imported result provenance is retained, not independently certified.

PDF export uses pinned jsPDF 4.2.1 with high-resolution browser-rendered A4 pages, Unicode font fallback, paginated wrapping, structure images, chart, header/footer, source details and interpretation. The image-based PDF preserves visual content and is not a searchable/tagged PDF; CSV provides text and exact numeric precision. Unicode glyph availability follows installed browser fonts. Rendering failures are reported, and output is bounded at 200 pages. The jsPDF MIT notice is published and embedded in the standalone HTML. The app does not call its HTML conversion API.

## Final checks for completed Phase 3

The suite contains 176 passing tests. Research coverage includes real RDKit validation and canonical duplicates, robust CSV parsing/bounds, preview cancellation, atomic row writes, retained partial success, cancellation before commit, storage failure, source-linked results CSV, frozen reports/missing references, tampered report rejection, old/new backup validation, section choices and Unicode/long-text PDF layout bounds. Lint, type checking, production build and standalone packaging pass.

Browser checks use an isolated local preview origin: mixed valid/invalid/duplicate inputs, file upload, selected analyses, sorting/filtering, active-draft preservation, cancellation after one completed row, retry, report saving/reopening after reload, and downloaded row/report CSV/PDF. The nine-page sample PDF was rendered and visually inspected, including its Unicode title, structures and comparison chart. CSV values were checked against exact stored data. Phone widths 320/390 and tablet width 768 were checked without page overflow. Physical iOS/Android testing remains a release task.

A dependency audit identified existing advisories in Vite/PostCSS/nanoid/source-map-js in the current dependency tree. The added jsPDF package was not listed in that production audit. Broad toolchain upgrades were not mixed into this feature change; these advisories and existing bundle-size/3Dmol eval build warnings remain release follow-up work. Changes are local and have not been pushed or deployed.
