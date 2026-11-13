# ChemEase — four-phase implementation

Phases 1 and 2 are implemented locally for review. Phase 3 is implemented with Molecule Comparison, bounded Batch Analysis and saved Research Reports. Phase 4 has begun with externally benchmarked ESOL solubility. No placeholder calculations are exposed as working tools.

| Phase | Scope | Status |
| --- | --- | --- |
| 1. Foundation | Home, navigation, projects, molecule library, active drawing, immutable saved structures, version-bound descriptor results, portable backup | Implemented |
| 2. Analysis Modules | Five documented property screens; PAINS/Brenk structural alerts, matched fragments and editor selection; visualizations of stored results; versioned history and exports | Implemented |
| 3. Research Tools | Saved-version comparison, bounded batch analysis, immutable report sources and CSV/SVG/PDF exports | Implemented |
| 4. Predictions | ESOL solubility with pinned model, external benchmark, supported-input policy and versioned results; ADMET next | In progress |

## Using the foundation

The introduction still appears on every fresh visit. Entering opens Home, or the recognized workspace URL already present in the hash. Desktop has a navigation rail. Phone and tablet use the Workspace page selector. The editor, periodic table, label preferences, image/chemical exports, undo, and existing analysis tools remain available.

1. Create a project on Home or Projects.
2. Draw a structure in Editor, or use Import SMILES on Home.
3. Save version, choose the project and molecule name, and save. Save in the editor and Ctrl/Cmd+S use this same flow.
4. Open Properties. It uses the same active drawing and shared RDKit calculations as the editor. Save analysis to store a completed descriptor calculation for the saved structure.
5. Edit the drawing. Properties marks it as a draft. Old results remain attached to the original version and are explicitly marked as historical. Save another version to record the new structure.
6. Open any version from Library. It restores that version's graph, resets selection and cross-molecule undo history, and leaves other versions intact. Switching between modules preserves editor undo history because the graph/history stores stay alive.
7. Export backup from Library. Restore accepts a ChemEase workspace JSON backup and asks before replacing the browser workspace. Keep the export before clearing browser data or changing devices.

Creating a project does not move the active molecule into it. Choose that project when saving a new molecule. Saving as a separate molecule creates a new library record; otherwise a version is added to the active record in its existing project.

## Data ownership and module boundaries

`src/features/workspace/types.ts` defines Project, MoleculeRecord, MoleculeVersion, SavedAnalysis, WorkspaceData, and WorkspaceRepository. Modules do not write directly to IndexedDB. The repository is injected into `createWorkspaceStore`; its `ownerId` scopes storage.

- `domain.ts`: pure versioning, cloning, provenance checks, and schema validation. Saved graph snapshots are independent of mutable drafts. Drawing coordinates and names belong to the snapshot; a chemistry key excludes drawing coordinates and names.
- `repository.ts`: IndexedDB adapter; one atomic owner-scoped record, schema version 1, expected-revision checks to prevent another tab's writes from being silently overwritten. In-memory state changes only after a successful storage transaction.
- `store.ts`: serialized mutations and async persistence. Storage failures remain visible. Failed mutations do not replace the committed workspace state.
- `editorBridge.ts`: initializes the editor from the persisted draft, connects graph changes to a debounced draft save, handles version switching, and guards pending/failed saves on close. Replaying the intro retains in-memory work.
- `descriptorCache.ts` and `chemistryService.ts`: shared chemistry calculation service, deduplicated by graph, with bounded cache, isolated result objects, and retries after failure. The editor and Properties use the same analysis hook and RDKit functions.
- `WorkspaceShell.tsx`, `pages/`, `components/`, `WorkspaceDialogs.tsx`: presentation and navigation. Each main page is a separate module; `pageActions.ts` defines shared navigation/action callbacks. Hash routes work with GitHub Pages without server rewrites.
- `resultExport.ts`: exports the recorded historical values and engine/method identifiers, without silently recalculating old results using a new engine.

The active selection relates project → molecule record → saved version. The editable draft may differ from that version. A saved result relates to exactly one saved version and its chemistry key. Rendering a different module does not create a second editable molecule or a second source of chemistry formulas.

## Adding accounts later

The current owner is `local-device`. This is a local storage namespace, not authentication or access control. Student and researcher accounts are not implemented in this phase.

Add an authentication/session provider, instantiate the workspace store with a session-scoped server repository, and provide that store to module consumers. The server must enforce ownership and permissions from the authenticated session, never from a client-supplied owner string. Keep login/roles outside chemistry calculations and the molecule schema. Sign-out and account changes must flush or explicitly retain local drafts and clear session-specific caches/state. Do not automatically upload anonymous local projects: use an explicit import/migration flow. A repository contract test can be reused for the server adapter.

## Scientific integrity and limitations

The established RDKit 2026.09.2 descriptor definitions and existing reference/round-trip tests remain in use. This phase adds organization and reproducibility, rather than new chemical prediction formulas. Unsupported chemistry continues to produce an error rather than invented descriptors.

Stored analyses record the graph/version, timestamp, `rdkit-descriptors-v1` method, RDKit version, canonical SMILES, descriptor values, and locally derived composition. Saving a result requires an unchanged saved structure. Input edits invalidate the live calculation in the UI; asynchronous results for a previous graph are ignored.

The result contract now distinguishes descriptor snapshots from `drug-likeness-v1` screenings. A screening references its exact `descriptorResultId`; saving both records is atomic. Descriptor deduplication compares all recorded values, so a newly calculated result cannot silently reuse altered imported values. The Properties history shows descriptor records; the Drug-likeness history shows screening records. Library/Home counts include both. Existing descriptor-only backups remain valid. See [Analysis Modules](ANALYSIS_MODULES.md) for methods, applicability and the next increments.

Phase 2 adds `drug-likeness-v2` for the five-filter screen and `structural-alerts-v1` for the pinned PAINS/Brenk catalog. The original `drug-likeness-v1` evaluator remains unchanged for validating and displaying historical two-filter results. Alert snapshots identify the exact catalog, engine, structure key and mapped editor IDs. Visualizations consume saved records only; selecting a plot source does not overwrite the active draft. No account/prediction service is coupled to these modules.

LogP and molar refractivity are model estimates. LogD remains the explicitly labelled single-site estimate using entered pH/pKa and acid/base type. Its interactive inputs reset with the analysis view/chemistry; use the live Properties CSV to export those inputs. LogD is not included in saved descriptor snapshots. A future analysis module can add a separately versioned LogD result type that includes its input parameters.

Backup validation checks schema, identifiers, ownership scope, references, graph validity, structure keys, finite descriptor values, and integer counts. Local display counts are rebuilt from validated graphs. Restored RDKit values retain their original provenance; a backup is not a signed or independently verified scientific record. A third party can edit its values. Recalculate the active version when verification is required; do not claim tamper-proof results.

Browser storage is device/origin-specific and can be cleared by the browser. Draft saves are debounced by 400 ms and are best effort; closing during a pending save prompts a warning. Explicit Save version and Save analysis confirm only after persistence completes. Backup export includes the current in-memory drawing even if its latest storage write failed. There is no automatic cloud sync.

Limits: 100 projects, 500 molecule records, 2,000 versions, 5,000 saved analyses, 20 MB serialized local workspace, and 25 MB backup input. The existing per-structure bounds remain 1,500 atoms and 6,000 bonds. File-URL IndexedDB behavior varies by browser; localhost or HTTPS is recommended. Physical iOS/Android testing and live external-service testing remain release checks.

## Validation

`npm test` includes real RDKit reference molecules and new tests for immutable snapshots, stale-result rejection, saved-result CSV provenance, backup corruption, repository serialization/failure/conflict behavior, shared-calculation deduplication and retries, version restoration, and route parsing. `npm run lint` and `npm run build` cover source and production/standalone packaging. Browser checks exercise the same workflows through visible controls, with desktop and phone viewports.

Phase 3 includes [Molecule Comparison, Batch Analysis and Reports](RESEARCH_TOOLS.md). It consumes the existing immutable versions and recorded result contracts without changing the workspace schema, calculations or owner-scoped repository.

Reports use an optional `reports` field in schema version 1, with frozen version/result references validated on restore. Older backups without reports remain valid. Batch row writes preserve the active drawing and use the same atomic repository as single-molecule saves. See [Research Tools](RESEARCH_TOOLS.md).

The first Phase 4 result type is `esol-rdkit-v1`, linked to an exact descriptor result. Reports v2 freeze optional prediction references while v1 reports remain unchanged. See [Predictions](PREDICTIONS.md) for validation evidence, limits and reproducibility.


ADMET skin permeability adds a separate typed `skin-pg-cdc-v1` result referencing
an exact descriptor snapshot. Settings and output save atomically and validate on
restore. Research report v3 freezes a skin result ID or explicit null; legacy report
schemas retain their original meaning. Endpoint implementation and evidence are
in ADMET_SKIN.md. Owner boundaries and repository schema version remain unchanged.


`SavedHepatic` (`hepatic-well-stirred-v1`) uses an exact version/key and entered
parameter set. Its engine is the mathematical model version, and it has no RDKit
descriptor dependency. The save action captures caller data before queuing the
transaction. Report v4 freezes the result ID or null independently of descriptor
selection; older schemas cannot acquire hepatic references. See ADMET_HEPATIC.md.

Docking adds optional `dockingRuns` to schema 1, independently of compound analysis
and report v4. Each completed run freezes preparation/tool versions, artifact
hashes, grid/search configuration, ranked poses, contacts and source version/key.
Restore checks those links and finite values; imported provenance is not scientific
certification. Backend coordinates remain in separately downloaded archives.
Saved docking PDF/CSV reports work offline. The backend scope dependency is the
future account-authorization boundary. See [Docking](DOCKING.md).
