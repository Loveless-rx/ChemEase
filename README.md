# ChemEase — molecular 3D viewer edition
**A modern, intelligent, browser-based chemical structure editor and molecular analysis platform.**

This integrates your uploaded React/Vite project with the working ChemEase editor and replaces the earlier introduction with real scroll-driven WebGL. The molecular graph remains the editor's source of truth.

## 1. Try it without installing anything
Open **`dist/ChemEase.html`** in Chrome, Edge or another current browser. Scroll through the introduction, or choose **Start Creating / Skip intro**. The standalone bundles React, Zustand and 3Dmol.js. Core editing stays local; the optional 3D lookup sends SMILES to PubChem only after an explicit click.

For reliable clipboard and local-save behavior, run from localhost or HTTPS. File-URL storage permissions vary by browser. JSON export is the portable backup; Save is one browser-local document, not cloud storage.

## 2. Recommended migration: use this as your frontend foundation
1. Keep your existing project folder as a backup. Extract this ZIP into a **new folder**, not over the old one.
2. Open the new `chemease` folder in your editor.
3. Install **Node.js 24 LTS** (22.13+ is also suitable for the supplied toolchain), then run the commands below.
4. Test the editor and compare it with your old project. Once satisfied, commit this source into a new branch or replace the old frontend from that branch.
5. Bring back only custom functionality you still need, one feature at a time. Do **not** restore the old stores or root CSS alongside the new ones.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Stop the dev server with Ctrl+C. No Three.js, GSAP, R3F, backend, API key, CDN or `.env` file is required. The renderer is native WebGL; animation uses native scroll and requestAnimationFrame.

`3dmol` 2.5.3 has been added to the dependencies and lockfile. The new styles use plain CSS; Tailwind and lucide remain declared from your original project but are not required by this UI. You can remove those unused packages later as a separate dependency cleanup.

**Do not copy the uploaded `node_modules`.** Your archive contained Windows-specific packages. `npm ci` installs the correct platform-specific packages on your machine. A network connection to the npm registry is required for that install.

## 3. Verify and build
```bash
npm test              # 56 chemistry, history, 3D-math and lookup tests
npm run typecheck     # Strict application TypeScript check
npm run lint          # ESLint / React hooks checks
npm run build         # TypeScript + Vite, then a standalone HTML export
npm run preview       # Serve Vite's production output locally
```

A normal build writes `dist/index.html` and its assets, plus `dist/ChemEase.html`. Deploy the **whole Vite dist folder** to a static host. No server-side application is required for the current feature set.

The archive contains the Vite-built standalone. Rebuild with `npm run build` to regenerate the full hosting output.

### If installation/build fails
- Confirm `node -v` and `npm -v`; use a current Node 24 LTS release.
- Run commands in the folder containing `package.json`, not in `src` or `dist`.
- Start from a clean extraction without `node_modules`, then retry `npm ci` with network access.
- If npm reports a missing native rolldown binding even after a clean install, try `npm install --include=optional`. Keep a backup of the supplied lockfile; regenerate it only if your local npm installation still cannot resolve the platform packages, and review the changes before committing.
- Share the exact terminal error rather than mixing the old and new source folders.

### Honest build status
This update passed all 56 automated tests and the strict TypeScript/Vite production build. Browser preview was unavailable in this session, so the new WebGL viewer and live PubChem lookup still require browser verification. The older browser evidence in this archive applies to the supplied version only.

See **`docs/DEVELOPMENT_ROADMAP.md`** for the review, prioritized next steps, feature limits and manual release checklist. Vite reports advisory warnings about bundle size and an eval path inside 3Dmol.js.

See **`docs/MIGRATION.md`** for the exact replacement strategy and **`docs/FILE_MAP.md`** for every changed, retained, new and removed path.

## What's implemented

- Genuine native-WebGL introduction: procedural sphere/cylinder meshes, shader lighting, depth testing, a scroll-driven camera, reversible disassembly/reassembly, four pinned chapters, mobile framing, reduced-motion views and a GPU-loss fallback. This is illustrative geometry, not a computed molecular conformer.
- Warm cream/purple editor, charcoal theme, persisted theme preference and replay/skip-intro settings.
- Collapsible chemistry toolbar; C, H, N, O, P, S; halogens; twelve extended elements; R groups.
- SVG atom placement and replacement, atom/bond selection, single-atom and multi-atom dragging.
- Single, double, triple and aromatic bonds; click existing bonds to change their type.
- Click-to-connect bonds and angle-snapped chain extension from a pending atom.
- Five- and six-membered rings and benzene as editable atom/bond graphs.
- Atom/bond deletion, rectangle-lasso selection, pan, cursor-centered wheel zoom, fit and responsive auto-fit.
- Atom charge editing, explicit hydrogen attachment, implicit-H overrides and lone-pair annotations.
- Live formula, average molecular weight, explicit/implicit H accounting, graph counts and soft valence warnings.
- Graph-generated, non-canonical SMILES with branches, disconnected components, ring closures, charges and supported aromatic atoms.
- Contextual atom/bond inspector and analysis dialog with composition and clearly qualified simple descriptors.
- Bounded undo/redo history; continuous drag is a single history action; cancelled drag restores its starting state.
- One local save, startup recovery, JSON import/export, SVG export and actual PNG raster export.
- Keyboard shortcuts, labelled controls, visible focus, modal focus management and compact mobile drawers.
- Defensive import validation, unsupported-state warnings and an application error boundary.

There are no server calls, analytics, accounts, AI services, external images or fake data-backed editor controls.

## Drawing guide

1. Select **C** and click the canvas twice to place two carbons.
2. Select **O** and click again to place oxygen.
3. Choose the single-bond tool (`1`). Click the first carbon and the second carbon, then the second carbon and oxygen. The formula becomes **C2H6O**, the average mass approximately **46.07 g/mol**, and the generated SMILES is **CCO** for that insertion order.
4. Press **V** to select and drag atoms; Shift-click to extend a selection. Press **L** and drag to select a rectangle of atoms.
5. Press **2** or **3** and click a bond to change its order. The formula, H count and mass update immediately.
6. Choose a ring and click empty space. Every ring atom and bond remains editable. Ring placement does not infer fused/spiro-ring topology.
7. Choose **Charge**, select +1 or −1 and click an atom. Alt-click reverses the chosen sign. The inspector also has a numeric formal-charge field.
8. Use **Hydrogen** to add a real H atom/bond. To model `[nH]`, select aromatic N and set its implicit-H override to 1.
9. **Save** writes the current graph to this browser. **Export** downloads PNG, SVG or JSON. JSON can be re-imported using the folder control in the top bar.

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Shift + Z, Ctrl + Y | Redo |
| Ctrl/Cmd + S | Save locally |
| Ctrl/Cmd + N | Confirm new molecule |
| V / E / L | Select / Erase / Lasso |
| 1 / 2 / 3 | Single / Double / Triple bond |
| Delete / Backspace | Delete selection |
| Escape | Cancel pending bond/drag, clear selection, close dialog |
| Space + drag or middle-drag | Pan |
| Mouse wheel | Cursor-centered zoom |
| Enter on a focused atom/bond | Select it |

Some browsers reserve Ctrl/Cmd + N. The New button is always available.

## Chemistry boundaries—important

This is a functional drawing-and-basic-analysis release, **not a validated cheminformatics toolkit or a certified production release**.

- Formula uses Hill ordering: C, then H, then other elements alphabetically when C is present; otherwise all symbols alphabetically.
- Explicit H atoms consume bond valence, so they are not counted twice. Isotope-labelled elements share the base element's formula symbol; a small isotope mass table is supported. Unknown isotope mass returns unavailable, not an invented value.
- Common neutral main-group valences and selected charged C/N/O/B/halogen/H states are modeled. Metal atoms can be drawn but implicit H and metal-bonding chemistry are not inferred.
- **Aromaticity is user-assigned**, not automatically perceived. A benzene ring is fully modeled. Neutral aromatic N defaults to pyridine-like N; explicit `[nH]` uses the H override. Broken aromatic systems and unsupported aromatic charge states are warned and do not receive a misleading SMILES string.
- SMILES is deterministic for the stored graph order, **not canonical**. It is a limited serializer, not a SMILES parser or general-purpose sanitization toolkit. Invalid valence/aromaticity/stereo cases return an explicit error. Reordering atom IDs can change the string without changing the molecule.
- Ring counts are independent graph cycles (`E − V + components`). Aromatic cycle counts apply that definition to aromatic edges. They are not SSSR, aromaticity perception or a count of every possible cycle.
- H-bond donor/acceptor sites and rotatable bonds are **simple graph-rule estimates**, limited to common C/H/N/O/halogen structures. Amide N and acid hydroxyl O exclusions are included. Other atom families and warning-bearing unsupported chemistry yield “Not evaluated.” These values are not asserted to match every RDKit, PubChem or medicinal-chemistry convention.
- Lone pairs are visual annotations only. Electron counting, radicals, conjugation and chemical stability are not validated.
- Stereo metadata has extension points but is not interpreted or emitted. Reaction editing, general MOL/SDF interchange, local conformer generation, logP, TPSA, fingerprints and advanced descriptors remain future work. Optional PubChem 3D lookup and conformer SDF download are now available.
- A nonempty formula/mass for a warning-bearing graph is provisional, not evidence that the structure is meaningful or chemically stable.
- Limits: 1,500 drawn atoms, 6,000 bonds, 120 history snapshots, 99 SMILES ring closures and 2 MB JSON imports. PNG export is capped at 4,096 pixels per dimension.


## Project map
```text
src/Components/intro/  Scroll controller, WebGL scene, 3D math and responsive CSS
src/Components/        Editor, canvas, toolbar, inspector, dialogs and UI primitives
src/engine/            Pure chemistry, geometry, validation, SMILES and exports
src/models/            Atom, Bond, Molecule and History contracts
src/store/             Official Zustand molecule, UI and history stores
src/hooks/             Gestures, shortcuts and chemistry-only memoization
src/styles/            Global styles and theme tokens
src/utils/             Storage, validated legacy import and element constants
tests/                 Unit tests and optional browser QA scripts
tools/                 Node test compiler, standalone packer and source packager
docs/                  Migration, architecture, verification and test evidence
backup/                Original uploaded source/config only; no dependencies
dist/ChemEase.html     Tested no-install application
COMPLETE_SOURCE.md     Every text source/config file in full, labelled by path
FILES.json             File sizes and SHA-256 checksums
```

### What still belongs on your roadmap
- Verify the normal npm/Vite production build and repeat checks on that output.
- Add real-device Safari/Firefox/mobile testing and broader accessibility checks.
- Validate advanced chemistry against a trusted toolkit; RDKit/WASM can sit behind the existing engine interfaces.
- Add authentication, backend/cloud saves or database integration only if your product needs them. None is required to use this local editor.
- SMILES parsing, general MOL/SDF interchange, stereochemical interpretation, arbitrary conformer generation, reaction editing, logP and TPSA remain future work.

Authored project code is MIT; see `LICENSE` and `THIRD_PARTY_NOTICES.md`. Your original source backup and assets retain their original licensing.
