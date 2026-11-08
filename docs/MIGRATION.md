# Migration from your uploaded project

## Recommendation
Use this integrated frontend in a new folder/branch. It is a coordinated replacement of your prototype's UI, graph state and chemistry implementation—not a set of independent snippets to paste over selected components. Your original ZIP remains untouched; `backup/original-source.zip` contains the original source/config without `node_modules`.

## What was preserved
- React 19 + TypeScript + Vite + official Zustand.
- Your package dependency declarations and exact package-lock resolution.
- Public assets and the basic concepts of atom placement, click-to-connect bonds, rings, dragging, zoom and a light/dark editor.
- No backend, authentication or external services were present in the uploaded source, so there were no server integrations to rewrite.

## What was replaced or fixed
| Original area | Integrated replacement / reason |
|---|---|
| `src/App.tsx`, root CSS | App switches between the scroll intro and editor. Old `body {overflow:hidden}` would prevent intro scrolling; it is not retained. |
| `src/pages/Editor.tsx` | `EditorPage.tsx` and `Components/editor/Editor.tsx` compose the new editor shell. |
| `src/store/chemUIStore.ts` | Now UI state only. Molecular graph and history live in `moleculeStore.ts` and `historyStore.ts`. |
| `src/store/toolStore.ts` | Removed from the active application. It duplicated tool state. Do not bring it back alongside the new UI store. |
| Canvas and module CSS | SVG renderer and pointer interactions were replaced together. Drag history, rectangle lasso, multi-selection, graph-aware fit and bond editing now work. |
| Info panel calculation calls | The old panel omitted bonds when calculating formula and mass. The new graph-derived analysis includes connectivity, charges and H accounting. |
| Save | Changed from a message-only placeholder to validated browser-local persistence and startup recovery. |
| Export, analysis, SMILES | Replaced placeholders with actual downloads, live analysis and limited deterministic SMILES serialization. |
| Other tool placeholders | Charges, H attachment, lone-pair annotations and R-group drawing now have real behavior. Reaction chemistry is explicitly out of scope rather than a fake action. |
| Legacy numeric atom/bond IDs | Current model uses strings. The validated JSON import accepts the uploaded prototype's numeric-ID `{atoms,bonds}` snapshots and maps endpoints consistently. |

## Reusing parts in another app
If you decide not to replace the entire frontend:
1. Copy the complete `src` feature folders together, including models, types, engine, stores, hooks, utils and styles. Do not copy just the visual components.
2. Import global styles once and render `Intro` or `EditorPage` inside your app's own routing. The default `App.tsx` already demonstrates this transition.
3. Adapt your old functions to the new `Molecule` contract. Use `useMoleculeStore` for graph changes and `useUIStore` for view/tool settings; do not mutate their arrays directly.
4. Remove conflicting old global CSS and duplicate store instances. Scope any unrelated styles you keep.
5. Keep your app's dependency versions compatible with this project and run the tests/type check. Do not overwrite a larger application's package file blindly.

### If you add your own feature later
- **UI:** `src/Components`.
- **Chemical rules:** pure functions in `src/engine`; add tests before exposing results.
- **Document mutations:** `src/store/moleculeStore.ts`, so undo/redo and persistence remain consistent.
- **Intro pacing:** keyframes in `sceneMath.ts`; mesh/material changes in `MoleculeScene.ts`; chapter text/navigation in `Intro.tsx`; layout in `Intro.css`.
- **Backend saves:** call your backend with validated `Molecule` JSON at a new persistence boundary; retain JSON export as a backup.

## Saved data
The original uploaded Save button did not write storage. There was therefore no existing saved-data migration to perform. If you separately saved numeric-ID graph JSON, import it with the new folder/import control. Both current version-1 ChemEase files and supported legacy snapshots are validated. Unsupported or dangling edges fail with a visible error; alternating single/double aromatic-looking rings stay Kekulé rather than receiving guessed aromaticity.

The current local-save key is `chemease.molecule.v1`. Theme and intro preferences are also local. Moving between a file URL, localhost, another port or a deployed domain changes the browser origin; export/import JSON to transfer work. Do not assume localStorage is cloud-synchronized.

## Rollback
Keep your existing project folder or extract `backup/original-source.zip` into a separate folder, then install its dependencies afresh. The backup intentionally omits `node_modules`, build output, `.git` and secrets.
