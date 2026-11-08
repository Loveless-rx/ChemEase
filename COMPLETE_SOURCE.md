# ChemEase — complete integrated source files

Every text source/config file is included in full and labelled by its exact path and status relative to the uploaded project. Binary deliverables and the original-source backup are separate ZIP entries. FILES.json records checksums; this book and the manifest do not recursively include themselves.

## File index
- `.gitignore` — REPLACE FILE
- `LICENSE` — CREATE NEW FILE
- `README.md` — REPLACE FILE
- `THIRD_PARTY_NOTICES.md` — CREATE NEW FILE
- `docs/ARCHITECTURE.md` — CREATE NEW FILE
- `docs/DEVELOPMENT_ROADMAP.md` — CREATE NEW FILE
- `docs/FILE_MAP.md` — CREATE NEW FILE
- `docs/MIGRATION.md` — CREATE NEW FILE
- `docs/VERIFICATION.md` — CREATE NEW FILE
- `docs/test-results/build-status.txt` — CREATE NEW FILE
- `docs/test-results/editor-checks.json` — CREATE NEW FILE
- `docs/test-results/export-checks.txt` — CREATE NEW FILE
- `docs/test-results/intro-accessibility.json` — CREATE NEW FILE
- `docs/test-results/lint.txt` — CREATE NEW FILE
- `docs/test-results/story-checks.json` — CREATE NEW FILE
- `docs/test-results/typecheck.txt` — CREATE NEW FILE
- `docs/test-results/unit-tests.txt` — CREATE NEW FILE
- `eslint.config.js` — RETAIN FILE
- `examples/aspirin.chemease.json` — CREATE NEW FILE
- `index.html` — REPLACE FILE
- `package-lock.json` — REPLACE FILE
- `package.json` — REPLACE FILE
- `public/favicon.svg` — RETAIN FILE
- `public/icons.svg` — RETAIN FILE
- `src/App.css` — REPLACE FILE
- `src/App.tsx` — REPLACE FILE
- `src/Components/canvas/AtomShape.tsx` — CREATE NEW FILE
- `src/Components/canvas/BondShape.tsx` — CREATE NEW FILE
- `src/Components/canvas/Canvas.css` — CREATE NEW FILE
- `src/Components/canvas/Canvas.tsx` — REPLACE FILE
- `src/Components/canvas/RingShape.tsx` — CREATE NEW FILE
- `src/Components/canvas/canvasInteractions.ts` — CREATE NEW FILE
- `src/Components/common/Button.tsx` — CREATE NEW FILE
- `src/Components/common/Formula.tsx` — CREATE NEW FILE
- `src/Components/common/Icon.tsx` — CREATE NEW FILE
- `src/Components/common/IconButton.tsx` — CREATE NEW FILE
- `src/Components/common/Modal.tsx` — CREATE NEW FILE
- `src/Components/common/Tooltip.tsx` — CREATE NEW FILE
- `src/Components/dialogs/Dialog.css` — CREATE NEW FILE
- `src/Components/dialogs/ExportDialog.tsx` — CREATE NEW FILE
- `src/Components/dialogs/HelpDialog.tsx` — CREATE NEW FILE
- `src/Components/dialogs/NewMoleculeDialog.tsx` — CREATE NEW FILE
- `src/Components/dialogs/SettingsDialog.tsx` — CREATE NEW FILE
- `src/Components/editor/Editor.css` — CREATE NEW FILE
- `src/Components/editor/Editor.tsx` — CREATE NEW FILE
- `src/Components/intro/Intro.css` — CREATE NEW FILE
- `src/Components/intro/Intro.tsx` — CREATE NEW FILE
- `src/Components/intro/MoleculeScene.ts` — CREATE NEW FILE
- `src/Components/intro/sceneMath.ts` — CREATE NEW FILE
- `src/Components/navbar/Navbar.css` — CREATE NEW FILE
- `src/Components/navbar/Navbar.tsx` — REPLACE FILE
- `src/Components/sidebar/AnalysisPanel.css` — CREATE NEW FILE
- `src/Components/sidebar/AnalysisPanel.tsx` — CREATE NEW FILE
- `src/Components/sidebar/InfoPanel.css` — CREATE NEW FILE
- `src/Components/sidebar/InfoPanel.tsx` — REPLACE FILE
- `src/Components/statusbar/StatusBar.css` — CREATE NEW FILE
- `src/Components/statusbar/StatusBar.tsx` — REPLACE FILE
- `src/Components/toolbar/Toolbar.css` — CREATE NEW FILE
- `src/Components/toolbar/Toolbar.tsx` — REPLACE FILE
- `src/Components/viewer/Molecule3D.css` — CREATE NEW FILE
- `src/Components/viewer/Molecule3DDialog.tsx` — CREATE NEW FILE
- `src/engine/analysis.ts` — CREATE NEW FILE
- `src/engine/chemistry.ts` — REPLACE FILE
- `src/engine/conformer.ts` — CREATE NEW FILE
- `src/engine/export.ts` — CREATE NEW FILE
- `src/engine/formula.ts` — CREATE NEW FILE
- `src/engine/geometry.ts` — CREATE NEW FILE
- `src/engine/molecularWeight.ts` — CREATE NEW FILE
- `src/engine/rendering.ts` — CREATE NEW FILE
- `src/engine/rings.ts` — CREATE NEW FILE
- `src/engine/smiles.ts` — CREATE NEW FILE
- `src/engine/templates.ts` — CREATE NEW FILE
- `src/engine/valence.ts` — REPLACE FILE
- `src/engine/validation.ts` — CREATE NEW FILE
- `src/hooks/useCanvasInteraction.ts` — CREATE NEW FILE
- `src/hooks/useKeyboardShortcuts.ts` — CREATE NEW FILE
- `src/hooks/useMoleculeAnalysis.ts` — CREATE NEW FILE
- `src/main.tsx` — REPLACE FILE
- `src/models/Atom.ts` — CREATE NEW FILE
- `src/models/Bond.ts` — CREATE NEW FILE
- `src/models/History.ts` — CREATE NEW FILE
- `src/models/Molecule.ts` — CREATE NEW FILE
- `src/pages/EditorPage.tsx` — CREATE NEW FILE
- `src/pages/LandingPage.tsx` — CREATE NEW FILE
- `src/store/chemUIStore.ts` — REPLACE FILE
- `src/store/historyStore.ts` — CREATE NEW FILE
- `src/store/moleculeStore.ts` — CREATE NEW FILE
- `src/styles/animations.css` — CREATE NEW FILE
- `src/styles/globals.css` — CREATE NEW FILE
- `src/styles/tokens.css` — REPLACE FILE
- `src/types/analysis.ts` — CREATE NEW FILE
- `src/types/chem.ts` — REPLACE FILE
- `src/types/editor.ts` — CREATE NEW FILE
- `src/utils/canvasConfig.ts` — REPLACE FILE
- `src/utils/elementColor.ts` — REPLACE FILE
- `src/utils/elementData.ts` — CREATE NEW FILE
- `src/utils/format.ts` — CREATE NEW FILE
- `src/utils/geometry.ts` — CREATE NEW FILE
- `src/utils/legacyImport.ts` — CREATE NEW FILE
- `src/utils/storage.ts` — CREATE NEW FILE
- `tests/browser-smoke.py` — CREATE NEW FILE
- `tests/chemistry.test.ts` — CREATE NEW FILE
- `tests/conformer.test.ts` — CREATE NEW FILE
- `tests/export-browser.py` — CREATE NEW FILE
- `tests/intro.test.ts` — CREATE NEW FILE
- `tests/store.test.ts` — CREATE NEW FILE
- `tests/story-browser.py` — CREATE NEW FILE
- `tools/make-standalone.mjs` — CREATE NEW FILE
- `tools/package.py` — CREATE NEW FILE
- `tools/test.mjs` — CREATE NEW FILE
- `tsconfig.app.json` — REPLACE FILE
- `tsconfig.json` — RETAIN FILE
- `tsconfig.node.json` — REPLACE FILE
- `vite.config.ts` — REPLACE FILE

## REPLACE FILE

FILE: `.gitignore`

````text
node_modules
dist
.cache
.test-build
qa
*.log
.env
.env.*
!.env.example
.DS_Store
````

## CREATE NEW FILE

FILE: `LICENSE`

````text
MIT License

Copyright (c) 2026 ChemEase contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## REPLACE FILE

FILE: `README.md`

````markdown
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
````

## CREATE NEW FILE

FILE: `THIRD_PARTY_NOTICES.md`

````markdown
# Third-party notices

The bundled standalone includes official React, React DOM, Scheduler and Zustand from the uploaded dependencies. The normal toolchain includes Vite, TypeScript and ESLint; Vite produces the current bundle. No third-party 3D models or animation libraries are embedded. Original assets retain their original licensing.

## react

```text
MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## react-dom

```text
MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## scheduler

```text
MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## zustand

```text
MIT License

Copyright (c) 2019 Paul Henschel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## 3Dmol.js 2.5.3

Bundled for the editor molecular viewer. BSD-3-Clause license:

```text
3Dmol.js incorporates code from GLmol, Three.js, and jQuery and
is licensed under a BSD-3-Clause license.

* 3Dmol.js
	Copyright (c) 2014, University of Pittsburgh and contributors
	All rights reserved.

	Redistribution and use in source and binary forms, with or without 
	modification, are permitted provided that the following conditions are met:

	1. Redistributions of source code must retain the above copyright 
	notice, this list of conditions and the following disclaimer.

	2. Redistributions in binary form must reproduce the above copyright 
	notice, this list of conditions and the following disclaimer in the 
	documentation and/or other materials provided with the distribution.

	3. Neither the name of the copyright holder nor the names of its 
	contributors may be used to endorse or promote products derived from 
	this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
	"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
	LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
	SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
	TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
	PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
	LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

* GLmol
 GLmol - Molecular Viewer on WebGL/Javascript (0.47)
  (C) Copyright 2011-2012, biochem_fan
      License: dual license of MIT or LGPL3

  Contributors:
    Robert Hanson for parseXYZ, deferred instantiation



* Three.js 
     https://github.com/mrdoob/three.js

     Copyright (c) 2010-2012 three.js Authors. All rights reserved.

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.

* jQuery
     http://jquery.org/

     Copyright (c) 2011 John Resig

     Permission is hereby granted, free of charge, to any person obtaining
     a copy of this software and associated documentation files (the
     "Software"), to deal in the Software without restriction, including
     without limitation the rights to use, copy, modify, merge, publish,
     distribute, sublicense, and/or sell copies of the Software, and to
     permit persons to whom the Software is furnished to do so, subject to
     the following conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
     LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
     OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


```
````

## CREATE NEW FILE

FILE: `docs/ARCHITECTURE.md`

````markdown
# Architecture and engineering decisions

## Integration basis

This edition combines the uploaded React/Vite project configuration and assets with the working graph editor. The original prototype is retained in a source-only backup; the active app uses one coordinated state/engine/UI architecture and a new native-WebGL scroll introduction.

## State and data flow

1. Canvas and toolbar events call typed molecule-store operations.
2. Each committed mutation clones the prior graph, applies an operation, normalizes aromatic flags from aromatic bonds and records a history snapshot.
3. Zustand publishes the new immutable molecule. The SVG renderer displays it.
4. Pure chemistry functions consume that graph. Analysis is cached by chemistry fields and connectivity, excluding atom coordinates and molecule name; geometry-only drags do not regenerate descriptors or SMILES.
5. Sidebar and analysis dialog display the same computed analysis. Export functions consume the graph, never a screenshot of UI controls.

Selection, active tools, viewport, theme, dialog state and chemistry data are deliberately separate concerns. Selection is not stored on Atom. Implicit hydrogens are derived, with an optional explicit override, rather than storing stale duplicate values on the graph.

## History transactions

Ordinary mutations are discrete snapshots with descriptive labels. A drag captures one starting snapshot, updates coordinates transiently, then records one history entry on pointer-up. Cancellation restores the starting snapshot without adding a history entry. Undo/redo clears pending bonds and selection. A new edit clears the redo branch. History is bounded to 120 snapshots.

Save markers are fingerprints of atoms, bonds and name, not merely counters. Undoing back to saved contents returns to a clean state. New, import, restore and example loading are themselves undoable; they do not silently discard the current graph.

## Geometry and interaction

World coordinates are independent of viewport size. SVG transformation is viewport center + pan + zoom. Pointer coordinates are inverted through that transform. Native wheel handling prevents page scroll while zooming and anchors the world point under the pointer. Resizing refits the current graph; the explicit Fit command is always available.

Pointer capture preserves dragging and rectangular lasso across the canvas boundary. Shift selection supports groups. The bond tool resolves existing endpoints and existing atom pairs, so applying a different order edits the existing edge rather than introducing duplicate edges. Empty-space chain extension snaps to 30-degree angles and the standard bond length.

Rings are generated as atoms and bonds, then handled by the same renderer and editor as any other graph. Automatic ring fusion is intentionally not inferred.

## Chemistry design

- Element constants and isotope masses are centralized.
- Adjacency maps support valence and connectivity operations.
- Mass includes each explicit atom plus only its derived implicit hydrogens.
- The valence engine handles a bounded set of common main-group states. Drawing is not prohibited when a state is unusual.
- Ring count is graph cycle rank; Tarjan-style bridge detection identifies bonds belonging to cycles.
- The SMILES writer builds a DFS spanning forest, records non-tree ring closures, serializes branches and handles disconnected fragments with dots. Bracket atoms include supported isotope, hydrogen and charge information.
- Validation runs before SMILES output. Unsupported aromaticity, impossible typical valence and uninterpreted stereo produce an explicit unavailable result rather than a plausible but misleading string.
- Donor, acceptor and rotatable counts are intentionally qualified organic graph-rule estimates.

The full accepted chemistry scope and its limitations are documented in README.md and displayed in the analysis/help interface.

## Renderer and exports

`engine/rendering.ts` supplies shared label and bond-segment geometry to the interactive renderer and pure SVG exporter. The exporter escapes user-controlled text, crops to graph bounds and excludes interaction targets, grid, selection and interface chrome. PNG export rasterizes the actual generated SVG and releases temporary object URLs.

## Storage and error handling

One versioned molecule can be saved to localStorage. JSON export is the portable multi-file persistence mechanism. Import validates shape, unique IDs, finite bounded coordinates, charges, bond types, endpoints, duplicate atom pairs, isotope/H overrides and size limits. Unknown element symbols can remain drawable but receive warnings and unavailable mass/SMILES where appropriate.

Browser storage failures are surfaced and do not delete the molecule. Malformed saves are not loaded. Missing bond endpoints do not crash pure analysis or rendering. The React error boundary offers recovery without clearing saved data.

## Extending ChemEase

The next chemistry milestone should be a trusted-toolkit adapter, preferably RDKit/WASM. Add a result contract that carries descriptor provenance, confidence/scope and sanitization warnings. Preserve the lightweight drawing graph, then adapt it into toolkit structures. Do not write toolkit-specific values into SVG nodes.

Other natural extension points:

- New graph entities for reaction arrows, text and reaction schemes, separate from molecular atoms/bonds.
- Stereo and isotope property controls with tested serialization.
- A graph-command layer if history needs more efficient deltas for very large structures.
- A spatial index for hit-testing or layout when the current 1,500-atom cap is raised.
- IndexedDB document collections when one local save is insufficient.
- A renderer-neutral export contract for MOL/SDF once a trustworthy writer is integrated.

## Production-readiness boundary

This is an implemented and tested integration release, not a claim of comprehensive production or scientific validation. The supplied standalone uses official dependencies and was bundled with esbuild. The preserved npm/Vite build path must still be verified on a machine that can install the appropriate native dependencies. Validate across browsers and external chemistry fixtures before deployment.


## Integrated scroll-WebGL introduction
`sceneMath.ts` is a pure, testable timeline of camera, rotation, position, scale, separation and bond visibility. Smooth interpolation makes forward and backward scrolling reversible. Mobile framing interpolates separately; reduced motion uses stationary camera views.

`MoleculeScene.ts` owns WebGL buffers, sphere/cylinder meshes, shaders, view/projection matrices and GPU cleanup. Lighting uses key/fill diffuse, specular and violet rim terms. The 12-atom benzene illustration includes explicit hydrogen balls; the independent editor benzene template contains six drawn aromatic C atoms with implicit H. The intro panel correctly labels its count as **drawn atoms**. Neither geometry nor animation is a conformer calculation.

`Intro.tsx` owns native scroll, ResizeObserver, a bounded-progress RAF loop, chapter accessibility, pointer parallax and the no-reload transition. It does not intercept wheel scrolling. GPU draws stop when the document is hidden or the scene is unchanged; RAF scheduling itself remains active while the intro is mounted. WebGL buffers/programs and listeners are cleaned up on unmount. Context loss shows a fallback; restoration rebuilds the scene.

No external 3D models, fonts, CDN scripts, Three.js or animation packages are required. The new chemistry memo uses a local, chemistry-only serialized signature so coordinate dragging does not rerun graph analysis and does not mutate a shared cache during React rendering.
````

## CREATE NEW FILE

FILE: `docs/DEVELOPMENT_ROADMAP.md`

````markdown
# ChemEase: review and completion roadmap

Review date: 2026-11-08. This review uses the supplied source, not a live deployed site.

## Current foundation

The source already separates the molecular graph, chemistry functions, Zustand state, SVG canvas and UI. It implements atom/bond editing, templates, selection and movement, undo/redo, browser-local saving, validated JSON import, SVG/PNG export, basic valence warnings, formula/mass and a limited SMILES serializer. Keep these boundaries rather than rewriting the app.

The landing-page WebGL molecule is illustrative. It is independent of the drawn graph and is not a conformer generator.

## Added in this update

Open the editor, draw a supported connected molecule, and choose **View molecule in 3D** in the information panel. Choose **Load from PubChem** to request an available database conformer. Try the existing ethanol or benzene template first.

- Bundled 3Dmol.js viewer: rotation, zoom, ball and stick, sticks, space filling, hydrogen visibility and fit-to-view.
- Explicit disclosure before a network request. Opening the dialog alone sends no structure.
- PubChem SMILES-to-3D-SDF lookup, 25-second timeout and cancellation on close.
- Download the returned conformer as SDF. No coordinates are written into the 2D graph and no drawing history is changed.
- Reject empty graphs, multiple fragments, R-groups, chemistry warnings, stereo annotations and structures over 200 drawn atoms.
- Actionable errors for unavailable conformers, service failures, network failures and unavailable WebGL.

This is **database lookup**, not arbitrary molecule-to-3D generation. A valid novel structure may have no PubChem 3D record. PubChem can standardize a submitted structure. Unspecified stereochemistry may resolve to a database conformer; do not interpret the result as proof of identity or a chosen stereoisomer. The current feature does not map database atom IDs back to drawing IDs. Do not submit confidential structures to a public lookup service.

## Recommended implementation order

| Priority | Work | Why it matters | Completion criteria |
| --- | --- | --- | --- |
| 1 | Toolkit-backed chemical validation and serialization | Current valence/aromaticity rules and SMILES cover a limited subset | Reference fixtures for aromatic heterocycles, charges, isotopes, salts and invalid graphs; unsupported cases explicitly rejected |
| 2 | MOL/SDF import/export and SMILES import | Users need to exchange structures with other chemistry tools | Round trips preserve graph, formal charges, isotope labels and supported stereo; malformed inputs fail safely |
| 3 | Wedge/hash and double-bond stereochemistry | Stereo fields currently exist but are not interpreted or exported | Wedge orientation is stable when atom order changes; known R/S and E/Z fixtures preserve their meaning through save/export |
| 4 | Conformer generation service | PubChem lookup does not cover novel structures | Validated input, reproducible conformer generation, force-field optimization with convergence status, explicit failure states and stereo checks |
| 5 | Drawing cleanup and editing ergonomics | Faster drawing makes the editor useful every day | 2D coordinate cleanup, bond-angle snapping, copy/paste, duplicate, rotate/flip selections and fused-ring placement each work with undo |
| 6 | Reaction documents | A molecule-only graph cannot describe complete schemes | Multiple structures, reaction arrows, plus signs, conditions and text stored as document objects; per-molecule analysis |
| 7 | Robustness and accessibility | A chemistry editor must tolerate long work sessions | Autosave recovery, multiple local documents, keyboard editing, touch testing, screen-reader labels and clear import errors |
| 8 | Advanced descriptors and publication output | Useful once the chemistry core is reliable | Toolkit-backed descriptors with provenance; vector export with predictable fonts, bond lengths and page sizing |

## Proposed next architecture

Keep `Molecule` as the 2D editor model. Add a chemistry adapter for validation, parsing and canonical serialization instead of making components depend directly on a toolkit. Keep conformers separate: coordinates in angstroms, bonds, source, generation parameters, warnings and stable atom mapping where available. Pixel coordinates must not be treated as physical coordinates.

For arbitrary 3D, add a server endpoint accepting a validated structure. A practical implementation candidate is RDKit with hydrogen addition, ETKDG embedding and MMFF/UFF optimization when parameterized. Check supported elements, preserve stereo, cap atoms and execution time, return convergence/energy metadata and never silently fall back to a flat drawing. Deploy this Python service separately from the static frontend. A browser toolkit adapter can handle the supported 2D tasks; confirm the actual WebAssembly API before depending on 3D support.

Return several conformers only after the single-conformer pipeline is reliable. Add distances/angles and synchronized 2D/3D atom selection after atom mapping is tested. Do not label a generated conformer as experimental or its force-field energy as a thermodynamic prediction.

Avoid adding authentication or cloud infrastructure until there is a concrete multi-device or collaboration requirement. Chemistry correctness and file compatibility are higher priorities for this project.

## Validation of this update

- Fresh dependency installation succeeded.
- `npm test`: 56 tests passed, including new query eligibility and mocked network/error tests.
- `npm run build`: strict TypeScript and Vite production build succeeded; the standalone was regenerated from that build.
- Build warnings: 3Dmol's bundled code contains an eval path; the combined JS exceeds Vite's 500 kB advisory. This version uses one bundle to keep the existing standalone HTML self-contained. Review CSP compatibility and split the hosted build later if needed.
- Browser preview infrastructure was unavailable. WebGL rendering, browser CORS and a live PubChem success path have not been verified in this session. Before release, run the manual checklist below.
- Older test artifacts under `docs/test-results` describe the supplied version and are historical, not evidence for the new viewer.

## Manual release checklist

1. Run `npm ci`, `npm run dev`; open the Vite URL in Chrome and Firefox.
2. Load ethanol, open 3D, confirm no request before clicking, then load and inspect the network request and visible structure.
3. Rotate, zoom, switch every style, hide/show H, fit and resize; repeat in dark theme and a narrow viewport.
4. Download SDF and open it in another molecular viewer.
5. Test benzene and aspirin; test empty/invalid/stereo/fragment inputs and a molecule without a 3D record.
6. Test offline mode, server errors and closing the dialog during lookup; reopening must not show an earlier request's result.
7. Disable WebGL and confirm an error; repeat open/close cycles while checking GPU/memory use.
8. Open `dist/ChemEase.html` directly. Core editing should work without a server; 3D lookup requires connectivity and browser permission for the cross-origin request. Use localhost/HTTPS if file-origin restrictions apply.

## Reference documentation

- 3Dmol.js viewer API: https://3dmol.org/doc/GLViewer.html
- PubChem PUG REST: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest
- RDKit getting started: https://www.rdkit.org/docs/GettingStartedInPython.html
````

## CREATE NEW FILE

FILE: `docs/FILE_MAP.md`

````markdown
# Exact file map

Paths are relative to the project root. Use the integrated folder as a unit rather than combining duplicate stores or conflicting CSS. All removed original files remain in the source-only backup.

## REPLACE
- `.gitignore`
- `README.md`
- `index.html`
- `package.json`
- `src/App.css`
- `src/App.tsx`
- `src/Components/canvas/Canvas.tsx`
- `src/Components/navbar/Navbar.tsx`
- `src/Components/sidebar/InfoPanel.tsx`
- `src/Components/statusbar/StatusBar.tsx`
- `src/Components/toolbar/Toolbar.tsx`
- `src/engine/chemistry.ts`
- `src/engine/valence.ts`
- `src/main.tsx`
- `src/store/chemUIStore.ts`
- `src/styles/tokens.css`
- `src/types/chem.ts`
- `src/utils/canvasConfig.ts`
- `src/utils/elementColor.ts`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`

## RETAIN
- `eslint.config.js`
- `package-lock.json`
- `public/favicon.svg`
- `public/icons.svg`
- `tsconfig.json`

## CREATE NEW
- `LICENSE`
- `THIRD_PARTY_NOTICES.md`
- `docs/ARCHITECTURE.md`
- `docs/FILE_MAP.md`
- `docs/MIGRATION.md`
- `docs/VERIFICATION.md`
- `docs/test-results/build-status.txt`
- `docs/test-results/editor-checks.json`
- `docs/test-results/export-checks.txt`
- `docs/test-results/intro-accessibility.json`
- `docs/test-results/lint.txt`
- `docs/test-results/story-checks.json`
- `docs/test-results/typecheck.txt`
- `docs/test-results/unit-tests.txt`
- `examples/aspirin.chemease.json`
- `src/Components/canvas/AtomShape.tsx`
- `src/Components/canvas/BondShape.tsx`
- `src/Components/canvas/Canvas.css`
- `src/Components/canvas/RingShape.tsx`
- `src/Components/canvas/canvasInteractions.ts`
- `src/Components/common/Button.tsx`
- `src/Components/common/Formula.tsx`
- `src/Components/common/Icon.tsx`
- `src/Components/common/IconButton.tsx`
- `src/Components/common/Modal.tsx`
- `src/Components/common/Tooltip.tsx`
- `src/Components/dialogs/Dialog.css`
- `src/Components/dialogs/ExportDialog.tsx`
- `src/Components/dialogs/HelpDialog.tsx`
- `src/Components/dialogs/NewMoleculeDialog.tsx`
- `src/Components/dialogs/SettingsDialog.tsx`
- `src/Components/editor/Editor.css`
- `src/Components/editor/Editor.tsx`
- `src/Components/intro/Intro.css`
- `src/Components/intro/Intro.tsx`
- `src/Components/intro/MoleculeScene.ts`
- `src/Components/intro/sceneMath.ts`
- `src/Components/navbar/Navbar.css`
- `src/Components/sidebar/AnalysisPanel.css`
- `src/Components/sidebar/AnalysisPanel.tsx`
- `src/Components/sidebar/InfoPanel.css`
- `src/Components/statusbar/StatusBar.css`
- `src/Components/toolbar/Toolbar.css`
- `src/engine/analysis.ts`
- `src/engine/export.ts`
- `src/engine/formula.ts`
- `src/engine/geometry.ts`
- `src/engine/molecularWeight.ts`
- `src/engine/rendering.ts`
- `src/engine/rings.ts`
- `src/engine/smiles.ts`
- `src/engine/templates.ts`
- `src/engine/validation.ts`
- `src/hooks/useCanvasInteraction.ts`
- `src/hooks/useKeyboardShortcuts.ts`
- `src/hooks/useMoleculeAnalysis.ts`
- `src/models/Atom.ts`
- `src/models/Bond.ts`
- `src/models/History.ts`
- `src/models/Molecule.ts`
- `src/pages/EditorPage.tsx`
- `src/pages/LandingPage.tsx`
- `src/store/historyStore.ts`
- `src/store/moleculeStore.ts`
- `src/styles/animations.css`
- `src/styles/globals.css`
- `src/types/analysis.ts`
- `src/types/editor.ts`
- `src/utils/elementData.ts`
- `src/utils/format.ts`
- `src/utils/geometry.ts`
- `src/utils/legacyImport.ts`
- `src/utils/storage.ts`
- `tests/browser-smoke.py`
- `tests/chemistry.test.ts`
- `tests/export-browser.py`
- `tests/intro.test.ts`
- `tests/store.test.ts`
- `tests/story-browser.py`
- `tools/make-standalone.mjs`
- `tools/package.py`
- `tools/test.mjs`

## REMOVE FROM ACTIVE APP
- `src/Components/canvas/Canvas.module.css`
- `src/Components/navbar/Navbar.module.css`
- `src/Components/sidebar/InfoPanel.module.css`
- `src/Components/statusbar/StatusBar.module.css`
- `src/Components/toolbar/Toolbar.module.css`
- `src/assets/hero.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `src/index.css`
- `src/pages/Editor.tsx`
- `src/store/toolStore.ts`
````

## CREATE NEW FILE

FILE: `docs/MIGRATION.md`

````markdown
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
````

## CREATE NEW FILE

FILE: `docs/VERIFICATION.md`

````markdown
# Verification — integrated edition

## Completed on this edition
- Strict TypeScript check of the full application and Vite configuration: passed.
- ESLint / React-hook checks of application source: passed without errors or warnings.
- **53 unit tests**: chemistry, validation, formulas, masses, SMILES, state/history, scroll math and numeric-ID legacy import.
- **33 editor browser checks**: actual pointer/keyboard drawing, bond edits, drag/history, rings, charges, H, save/reload, dialogs, themes and responsive drawers.
- **21 intro browser checks**: actual WebGL context and nontransparent rendered pixels, moving camera, disassembly/reassembly, pinned native scroll, reversal, chapter navigation, inert inactive panels, reduced motion, mobile overflow, GPU loss/restoration, no-reload entry and GPU buffer disposal.
- **7 additional export/responsive checks**: actual PNG/SVG/JSON files, dialog keyboard behavior, 1920×1080, 2560×1440 and graph-aware auto-fit.
- Manual screenshot review: desktop hero, separated atoms, analysis, front-facing final scene; mobile hero/analysis/final; fallback and editor layouts.
- Representative intro accessibility audit: zero automatically detected violations. Canvas-backed contrast needs manual review; this is not a claim of complete WCAG conformance.

Tests use official React/React DOM 19.2.7 and Zustand 5.0.14. No offline Zustand adapter or fake engine is involved. Chromium WebGL checks used its software renderer where necessary; real-device GPU/performance coverage remains to be done.

## Native build limitation
The full source type-check succeeds with the uploaded toolchain. Vite's native bundler cannot execute here because the uploaded dependencies contain a Windows rolldown binding, while the sandbox is Linux and cannot reach the npm registry. The included standalone was built with available esbuild against the official uploaded dependencies and then exercised directly. **A normal `npm ci` / `npm run build` remains a local verification step.** The standalone postprocessor was separately tested against an external-JS/CSS build fixture.

## Reproduce
```bash
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

Optional browser scripts require Python 3 and the `agent-browser` CLI in a development/QA environment; they are not application runtime dependencies:
```bash
CHEMEASE_URL=http://localhost:4173 CHEMEASE_QA_DIR=./qa python3 tests/browser-smoke.py
CHEMEASE_URL=http://localhost:4173 CHEMEASE_QA_DIR=./qa python3 tests/story-browser.py
CHEMEASE_URL=http://localhost:4173 python3 tests/export-browser.py
```
The scripts use named browser sessions and reset their test-origin localStorage. Run them against a disposable local test origin, not a browser session with important unsaved work. Windows users can run these optional scripts in a suitable shell/WSL, or use the manual checklist instead.

## Release checklist still required
- [ ] Clean npm install and native Vite build on your machine.
- [ ] Repeat browser checks on that Vite build.
- [ ] Safari, Firefox and physical touch-device testing.
- [ ] Broader manual keyboard, screen-reader and contrast review.
- [ ] Toolkit-backed chemistry validation for your intended molecule classes.
- [ ] Deployment/privacy/backend decisions if extending beyond local-first use.

See `test-results/` for the actual test output. Automated checks do not establish universal chemical correctness or guarantee bug-free production use.
````

## CREATE NEW FILE

FILE: `docs/test-results/build-status.txt`

````text
Standalone postprocessor: PASS against a real external-JS/CSS fixture.
Native Vite build: NOT COMPLETED — Windows-only uploaded native dependency on a Linux sandbox; npm registry unavailable.
Bundled standalone: esbuild, official React 19.2.7 / React DOM 19.2.7 / Zustand 5.0.14.
Original package-lock.json: unchanged.
````

## CREATE NEW FILE

FILE: `docs/test-results/editor-checks.json`

````json
{
  "passed": 33,
  "checks": [
    "Intro transitions to editor",
    "Carbon placement produces methane",
    "Disconnected atoms analyzed independently",
    "Connecting atoms produces ethanol",
    "SMILES derives from drawn graph",
    "Bond-order edit updates hydrogens",
    "Keyboard undo restores chemistry",
    "Keyboard redo restores bond order",
    "Erase removes atom and attached bond",
    "Lasso selects multiple atoms",
    "Selection drag moves the group",
    "One undo restores entire drag",
    "Ring placement creates six real atoms",
    "Ring insertion is one undo operation",
    "Charge affects implicit hydrogens",
    "Charge can be undone",
    "Zoom control changes viewport",
    "Pan updates atom screen positions",
    "Save writes graph locally",
    "Returning visit skips intro and restores saved molecule",
    "New clears graph after confirmation",
    "New is undoable",
    "Aspirin example is a connected real graph",
    "Analysis modal opens",
    "Analysis displays real mass",
    "Escape closes modal",
    "Theme persists",
    "1280px editor has no horizontal overflow",
    "Mobile uses compact editor",
    "Mobile has no horizontal overflow",
    "Mobile chemistry tools can be opened",
    "Mobile information panel opens",
    "Mobile landing has no horizontal overflow"
  ]
}
````

## CREATE NEW FILE

FILE: `docs/test-results/export-checks.txt`

````text
PASS actual PNG download: aspirin.png 79368 bytes
PASS actual SVG download: aspirin.svg 4700 bytes
PASS actual JSON download: aspirin.json 5460 bytes
PASS dialog focus trap and Escape
PASS 1920×1080 layout
PASS 2560×1440 layout
PASS responsive auto-fit keeps every atom in viewport
Export and responsive checks complete.
````

## CREATE NEW FILE

FILE: `docs/test-results/intro-accessibility.json`

````json
{"success":true,"data":{"axeVersion":"4.12.1","counts":{"inapplicable":42,"incomplete":1,"passes":17,"violations":0},"incomplete":[{"help":"Elements must meet minimum color contrast ratio thresholds","helpUrl":"https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=axeAPI","id":"color-contrast","impact":"serious","nodeCount":40,"nodes":[{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span class=\"logo\">","target":[".logo"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span class=\"beta\">Studio</span>","target":[".beta"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span class=\"intro-build-label\">THE MOLECULAR WORKSPACE</span>","target":[".intro-build-label"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<button class=\"story-skip\">Skip intro <svg aria-hidden=\"true\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 12h16 M14 6l6 6-6 6\"></path></svg></button>","target":[".story-skip"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span><i></i> A closer look at possibility.</span>","target":[".scene-topline > span:nth-child(1)"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span>AN INTERACTIVE MOLECULAR STORY</span>","target":[".scene-topline > span:nth-child(2)"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<span class=\"story-eyebrow\">03 — See beneath the structure</span>","target":[".chapter-analyze > .story-eyebrow"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<h2>More than<br><em>meets the eye.</em></h2>","target":[".chapter-analyze > h2"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<em>meets the eye.</em>","target":[".chapter-analyze > h2 > em"]},{"failureSummary":"Fix any of the following:\n  Element's background color could not be determined because element contains an image node","html":"<p>Every connection tells a story.<br>Understand yours, as you draw.</p>","target":[".chapter-analyze > p"]}],"tags":["cat.color","wcag2aa","wcag143","TTv5","TT13.c","EN-301-549","EN-9.1.4.3","ACT","RGAAv4","RGAA-3.2.1"]}],"lifecycle":{"effectiveLaunch":{"browserLaunched":true,"engine":"chrome","launchHash":9648185087254154493},"launched":false,"relaunchedBrowser":false,"restartedBackground":false,"restoreStatus":"not_configured","reused":true,"saveStatus":"not_attempted"},"url":"file:///data/chemease-integrated/dist/ChemEase.html","violations":[]},"error":null}
````

## CREATE NEW FILE

FILE: `docs/test-results/lint.txt`

````text

````

## CREATE NEW FILE

FILE: `docs/test-results/story-checks.json`

````json
{
  "passed": 21,
  "checks": [
    "Real WebGL context and shader-rendered scene active",
    "Scene contains rendered nontransparent pixels",
    "Scrolling dollies and orbits the camera",
    "Atoms separate and bonds dissolve with scroll",
    "Full-screen stage stays pinned while document scrolls",
    "Only the active chapter can receive keyboard focus",
    "Analysis stage reassembles the molecule",
    "Intro analysis is graph-derived benzene",
    "Reverse scrolling restores the same 3D camera",
    "Final chapter exposes the editor CTA",
    "Chapter navigation rewinds the scroll story",
    "Native mouse-wheel scrolling drives the scene",
    "Reduced motion disables disassembly",
    "Reduced motion keeps the camera stationary",
    "Mobile intro has no horizontal overflow",
    "1280\u00d7720 story fits horizontally",
    "GPU context loss has an accessible fallback",
    "WebGL context restoration recovers the scene",
    "Intro-to-editor transition does not reload the page",
    "WebGL buffers are disposed on entering editor",
    "Editor replaces rather than hides the 3D scene"
  ]
}
````

## CREATE NEW FILE

FILE: `docs/test-results/typecheck.txt`

````text
Strict TypeScript: PASS
````

## CREATE NEW FILE

FILE: `docs/test-results/unit-tests.txt`

````text

> chemease@0.0.0 test
> node tools/test.mjs

✔ methane (2.228075ms)
✔ ethane (0.454863ms)
✔ ethene (0.244346ms)
✔ ethyne (1.142273ms)
✔ water (0.162108ms)
✔ methanol (0.210493ms)
✔ ethanol (0.18746ms)
✔ carbon dioxide (0.169454ms)
✔ bond orders are chemistry values (0.83266ms)
✔ explicit H is not counted twice (0.277731ms)
✔ explicit water (0.200637ms)
✔ ammonium charge affects H and SMILES (0.180236ms)
✔ hydroxide (0.121584ms)
✔ pentavalent carbon is allowed but warned (0.372821ms)
✔ branched isobutane SMILES (0.154796ms)
✔ disconnected fragments use dot (0.097919ms)
✔ benzene (2.97588ms)
✔ cyclopentane and cyclohexane are actual graphs (0.747642ms)
✔ pyridine aromatic nitrogen does not receive an H (0.356896ms)
✔ pyrrole supports explicit hydrogen override (0.366318ms)
✔ broken aromatic ring warns and refuses ambiguous SMILES (0.295449ms)
✔ two independent rings (0.219658ms)
✔ aspirin graph chemistry and descriptors (1.525341ms)
✔ ethanol graph descriptors (0.955652ms)
✔ amide nitrogen is not an acceptor (1.163608ms)
✔ unknown element has no mass rather than false zero (0.143118ms)
✔ R group is wildcard and mass unspecified (0.255957ms)
✔ metal ions have no inferred H and descriptors are not evaluated (0.204732ms)
✔ empty graph is safe (0.109296ms)
✔ invalid bond references do not crash analysis (0.171129ms)
✔ isotope mass and bracket SMILES (0.118908ms)
✔ unsupported isotope mass is null (0.073881ms)
✔ round-trip ChemEase JSON (1.360498ms)
✔ malformed JSON rejected safely (0.45493ms)
✔ duplicate atoms and bonds rejected (0.245401ms)
✔ SVG uses the actual graph, no editor decorations (0.833719ms)
✔ SVG escapes user metadata (0.151801ms)
✔ scroll progress drives real camera motion and molecular disassembly (1.637041ms)
✔ scroll animation is deterministic and reversible (0.265244ms)
✔ progress is clamped safely (0.245774ms)
✔ reduced motion disables camera orbit and disassembly (0.168832ms)
✔ chapter transitions do not show two interactive text panels (3.194093ms)
✔ 3D matrices contain finite values (0.372916ms)
✔ legacy numeric-ID molecule imports without changing chemistry (2.622599ms)
✔ legacy dangling edges are rejected by normal validation (0.408724ms)
✔ atom and bond edits, undo and redo (4.269902ms)
✔ deleting atom removes connected bonds, undo restores both (1.977304ms)
✔ continuous drag creates exactly one history entry (1.341426ms)
✔ canceling a drag does not modify history (0.267387ms)
✔ new edit invalidates redo branch (0.2811ms)
✔ ring insertion and removal are atomic (0.62952ms)
✔ repeated bond tool edits rather than duplicate bonds (0.699647ms)
✔ charge changes are undoable (0.475527ms)
ℹ tests 53
ℹ suites 0
ℹ pass 53
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 246.357699
````

## RETAIN FILE

FILE: `eslint.config.js`

````text
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
````

## CREATE NEW FILE

FILE: `examples/aspirin.chemease.json`

````json
{
  "version": 1,
  "atoms": [
    {
      "id": "ccea20f1-a33e-4156-aab3-b321155ebcee",
      "element": "C",
      "x": 3.918869757271531e-15,
      "y": -64.00000000000001,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "b57b0c34-aafc-4f60-832a-2bba06ad3af2",
      "element": "C",
      "x": 55.425625842204084,
      "y": -32.00000000000001,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "88538b96-75b1-4324-84ee-be7358641bd1",
      "element": "C",
      "x": 55.42562584220409,
      "y": 31.999999999999996,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "d570e76a-43dd-4cff-970a-2ffeab000f83",
      "element": "C",
      "x": 3.918869757271531e-15,
      "y": 64.00000000000001,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "8a0abf41-95c9-4054-89fb-adba14b055fc",
      "element": "C",
      "x": -55.42562584220408,
      "y": 32.00000000000003,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "d5bc3e9b-2421-4737-bda1-869a4ded5954",
      "element": "C",
      "x": -55.425625842204084,
      "y": -32.000000000000014,
      "charge": 0,
      "aromatic": true,
      "lonePairs": 0
    },
    {
      "id": "44da3b42-1dc6-4adf-a3d1-63645bdd7647",
      "element": "C",
      "x": 119.42562584220408,
      "y": -64,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "c8fa43fb-3c9b-45da-a88f-429d6bce1a38",
      "element": "O",
      "x": 119.42562584220408,
      "y": -128,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "11b8c36a-abe7-47de-8186-df337d773b8d",
      "element": "O",
      "x": 175.42562584220408,
      "y": -32.00000000000001,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "a11a2e4d-b664-4bc7-95f7-48fb3f985aa0",
      "element": "O",
      "x": 111.42562584220408,
      "y": 64,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "f5be3d81-f4ae-48f2-9f3b-14e35df0c7c0",
      "element": "C",
      "x": 167.42562584220408,
      "y": 96,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "1d88357a-301d-4ce1-b21d-287fcfefe5c5",
      "element": "O",
      "x": 167.42562584220408,
      "y": 160,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    },
    {
      "id": "935de75a-3669-4a26-82dc-6ea1aee252fd",
      "element": "C",
      "x": 223.42562584220408,
      "y": 64,
      "charge": 0,
      "aromatic": false,
      "lonePairs": 0
    }
  ],
  "bonds": [
    {
      "id": "a7fb0084-49d0-47bc-8bf3-f1aeeaa6018e",
      "atomA": "ccea20f1-a33e-4156-aab3-b321155ebcee",
      "atomB": "b57b0c34-aafc-4f60-832a-2bba06ad3af2",
      "type": "aromatic"
    },
    {
      "id": "c850c923-871a-4a35-b9d3-808ce70c5529",
      "atomA": "b57b0c34-aafc-4f60-832a-2bba06ad3af2",
      "atomB": "88538b96-75b1-4324-84ee-be7358641bd1",
      "type": "aromatic"
    },
    {
      "id": "e5b8f1dc-d33f-40c0-adb2-b1bc8d714573",
      "atomA": "88538b96-75b1-4324-84ee-be7358641bd1",
      "atomB": "d570e76a-43dd-4cff-970a-2ffeab000f83",
      "type": "aromatic"
    },
    {
      "id": "653b6631-9f99-49f1-8c99-3de45be5c445",
      "atomA": "d570e76a-43dd-4cff-970a-2ffeab000f83",
      "atomB": "8a0abf41-95c9-4054-89fb-adba14b055fc",
      "type": "aromatic"
    },
    {
      "id": "a06107e3-a1fa-41b0-8818-bccf535362b6",
      "atomA": "8a0abf41-95c9-4054-89fb-adba14b055fc",
      "atomB": "d5bc3e9b-2421-4737-bda1-869a4ded5954",
      "type": "aromatic"
    },
    {
      "id": "4e8a56ef-4ef1-4057-a26f-b2879f0727b5",
      "atomA": "d5bc3e9b-2421-4737-bda1-869a4ded5954",
      "atomB": "ccea20f1-a33e-4156-aab3-b321155ebcee",
      "type": "aromatic"
    },
    {
      "id": "13686976-ea88-4d62-9fcb-1387c9a0497d",
      "atomA": "b57b0c34-aafc-4f60-832a-2bba06ad3af2",
      "atomB": "44da3b42-1dc6-4adf-a3d1-63645bdd7647",
      "type": "single"
    },
    {
      "id": "090e927e-5d21-4fe7-98aa-856b608ee5de",
      "atomA": "44da3b42-1dc6-4adf-a3d1-63645bdd7647",
      "atomB": "c8fa43fb-3c9b-45da-a88f-429d6bce1a38",
      "type": "double"
    },
    {
      "id": "c1da6a77-196d-4719-b81f-cc313b3427ef",
      "atomA": "44da3b42-1dc6-4adf-a3d1-63645bdd7647",
      "atomB": "11b8c36a-abe7-47de-8186-df337d773b8d",
      "type": "single"
    },
    {
      "id": "9615dde9-96ff-4b59-98a6-52ec7a98d7e3",
      "atomA": "88538b96-75b1-4324-84ee-be7358641bd1",
      "atomB": "a11a2e4d-b664-4bc7-95f7-48fb3f985aa0",
      "type": "single"
    },
    {
      "id": "5c89f16d-fb65-41dd-89e3-16dd3d4ce70b",
      "atomA": "a11a2e4d-b664-4bc7-95f7-48fb3f985aa0",
      "atomB": "f5be3d81-f4ae-48f2-9f3b-14e35df0c7c0",
      "type": "single"
    },
    {
      "id": "6d1d4ced-ed25-4e14-98bd-110248d4ca96",
      "atomA": "f5be3d81-f4ae-48f2-9f3b-14e35df0c7c0",
      "atomB": "1d88357a-301d-4ce1-b21d-287fcfefe5c5",
      "type": "double"
    },
    {
      "id": "ef0b2e87-2d92-4e17-9126-eca6ef3d49e9",
      "atomA": "f5be3d81-f4ae-48f2-9f3b-14e35df0c7c0",
      "atomB": "935de75a-3669-4a26-82dc-6ea1aee252fd",
      "type": "single"
    }
  ],
  "metadata": {
    "name": "Aspirin",
    "createdAt": "2026-09-08T15:56:00.543Z",
    "updatedAt": "2026-09-08T15:56:00.544Z"
  }
}
````

## REPLACE FILE

FILE: `index.html`

````html
<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#f6f4ef"/><meta name="description" content="ChemEase: a scroll-driven molecular introduction and a real chemical structure editor."/><title>ChemEase — Chemistry, Reimagined.</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M20 4L34 12V28L20 36L6 28V12Z' fill='none' stroke='%237655ad' stroke-width='3'/%3E%3C/svg%3E"/></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
````

## REPLACE FILE

FILE: `package-lock.json`

````json
{
  "name": "chemease",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "chemease",
      "version": "0.0.0",
      "dependencies": {
        "@tailwindcss/vite": "^4.3.0",
        "3dmol": "^2.5.3",
        "lucide-react": "^1.17.0",
        "react": "^19.2.6",
        "react-dom": "^19.2.6",
        "tailwindcss": "^4.3.0",
        "zustand": "^5.0.14"
      },
      "devDependencies": {
        "@eslint/js": "^10.0.1",
        "@types/node": "^24.12.3",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.1",
        "eslint": "^10.3.0",
        "eslint-plugin-react-hooks": "^7.1.1",
        "eslint-plugin-react-refresh": "^0.5.2",
        "globals": "^17.6.0",
        "typescript": "~6.0.2",
        "typescript-eslint": "^8.59.2",
        "vite": "^8.0.12"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.7.tgz",
      "integrity": "sha512-RgHBCvtjbOK2gXSNBNIkNoEc9qoVEtau3hj8gEqKQuL3HZAibKarWFEI3Lfm6EYKkLalOh8eSrj9b+ch9H/VBA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-compilation-targets": "^7.29.7",
        "@babel/helper-module-transforms": "^7.29.7",
        "@babel/helpers": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.7.tgz",
      "integrity": "sha512-DkXD5OJQaAQIdZ1bt3UZdEnHAn9Imd3IVBdX03UFe+ony9Ojw5pzr9YVKGDY1jt+Gcn/FnGkNf8r+Vj5NOJWtQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.7.tgz",
      "integrity": "sha512-wem6WaBj4NaVYVdNhLPPVacES6ZJ+KBBfSkTMD3YZxbP3rm3Di85tJU5ljaUNhaOynt+Aj0xruhYuzQBt8n71g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.7.tgz",
      "integrity": "sha512-UPUVSyXbOh627KiCIGQSgwWzGeBKLkaJ9PJEdrngIwMSzxLR4jS4+f1f1jb7VzBbg8nFLaYotvVPFCTqdrmTAg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.7.tgz",
      "integrity": "sha512-Pb5ijPrZ89GDH8223L4UP8i6QApWxs04RbPQJTeWDV0/keR2E36MeKnyr6LYmUUvqRRI+Iv87SuF1W6ErINzYw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.7.tgz",
      "integrity": "sha512-1k2lAGRMfHTcwuNYcCNUmaUffmQv8KWMfh2iJUUeRlwlwH4FdNG7mfPI10NPfLHJFThE4Tyr4mv7kTNZOiPuBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.7.tgz",
      "integrity": "sha512-hnORnjP/1P/zFEndoeX+n+t1RwWRJiJpM/jO7FW32Kn9r5+sJB2JWOdYo4L6k78j15eCwY3Gm/7364B1EMwtNg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.7"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.7.tgz",
      "integrity": "sha512-EhlfNQtZ+NK22w5BM61ciuiq1m58ed33Wr1Xan//ZRTy6hgjnwyCffRYwzsGXdASJSUJ1guZILsErh1eQcl+zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.7",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.7",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.7.tgz",
      "integrity": "sha512-4zBIxpPzowiZpusoFkyGVwakdRJUyuH5PxQ/PrqghfdFWWasvnCdPfQXHrenDai+gyLARulZjZowCOj6fjT4pA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.23.5",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.23.5.tgz",
      "integrity": "sha512-Y3kKLvC1dvTOT+oGlqNQ1XLqK6D1HU2YXPc52NmAlJZbMMWDzGYXMiPRJ8TYD39muD/OTjlZmNJ4ib7dvSrMBA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^3.0.5",
        "debug": "^4.3.1",
        "minimatch": "^10.2.4"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.6.0.tgz",
      "integrity": "sha512-ii6Bw9jJ2zi2cWA2Z+9/QZ/+3DX6kwaV5Q986D/CdP3Lap3w/pgQZ373FV7byY/i7L4IRH/G43I5dz1ClsCbpA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/core": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-1.2.1.tgz",
      "integrity": "sha512-MwcE1P+AZ4C6DWlpin/OmOA54mmIZ/+xZuJiQd4SyB29oAJjN30UW9wkKNptW2ctp4cEsvhlLY/CsQ1uoHDloQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/js": {
      "version": "10.0.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-10.0.1.tgz",
      "integrity": "sha512-zeR9k5pd4gxjZ0abRoIaxdc7I3nDktoXZk2qOv9gCNWx3mVwEn32VRhyLaRsDiJjTs0xq/T8mfPtyuXu7GWBcA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "eslint": "^10.0.0"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-3.0.5.tgz",
      "integrity": "sha512-vqTaUEgxzm+YDSdElad6PiRoX4t8VGDjCtt05zn4nU810UIx/uNEV7/lZJ6KwFThKZOzOxzXy48da+No7HZaMw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.7.2.tgz",
      "integrity": "sha512-+CNAzxglkrpNf/kKywqQfk74QjtceuOE7Qm+AF8miRvPF/wmmK5+OJOgVh3AVTT3RP2mH3+FOaxlE5v72owk0A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^1.2.1",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.2.tgz",
      "integrity": "sha512-UhXNm+CFMWcbChXywFwkmhqjs3PRCmcSa/hfBgLIb7oQ5HNb1wS0icWsGtSAUNgefHeI+eBrA8I1fxmbHsGdvA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/types": "^0.15.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.8",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.8.tgz",
      "integrity": "sha512-gE1eQNZ3R++kTzFUpdGlpmy8kDZD/MLyHqDwqjkVQI0JMdI1D51sy1H958PNXYkM2rAac7e5/CnIKZrHtPh3BQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.2",
        "@humanfs/types": "^0.15.0",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/types": {
      "version": "0.15.0",
      "resolved": "https://registry.npmjs.org/@humanfs/types/-/types-0.15.0.tgz",
      "integrity": "sha512-ZZ1w0aoQkwuUuC7Yf+7sdeaNfqQiiLcSRbfI08oAxqLtpXQr9AIVX7Ay7HLDuiLYAaFPu8oBYNq/QIi9URHJ3Q==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.4.tgz",
      "integrity": "sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.133.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.133.0.tgz",
      "integrity": "sha512-KzkdCd6Uxqnf6l3HOw1xfatAlUURA0g14cvBYFyJ5SaNOQbOUvBr9PKArcPcrNIeRsBdgcUzOGrhKveVpvOIGA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.0.3.tgz",
      "integrity": "sha512-454rs7jHngixp/NMxd5srYD57OnzSlZ/eFTETjORQHLwJG1lRtmNOJcBerZlfu4GjKqeq8aCCIQrMdHyhI51Hw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.0.3.tgz",
      "integrity": "sha512-PcAhP+ynjURNyy8SKGl5DQP94aGuB/7JrXJb/t7P+hanXvQVMWzUvRRhBAcg/lNRadBhoUPqSoP4xw5tR/KBEA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.0.3.tgz",
      "integrity": "sha512-9YpfeUvSE2RS7wysJ81uOZkXJz7f7Q55H2Gvp3VEw/EsahqDtrphrZ0EwDLK5vvKOzaCrBsjF8JmnMLcUt78Gg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.0.3.tgz",
      "integrity": "sha512-yB1IlAsSNHncV6SCTL27/MVGR5htvQsoGxIv5KMGXALp+Ll1wYsn+x98M9MW7qa+NdSbvrrY7ANI4wLJ0n1e6g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.0.3.tgz",
      "integrity": "sha512-Yi30IVAAfLUCy2MseFjbB1jAMDl1VMCAas5StnYp8da9+CKvMd2H2cbEjWcw5NPaPqzvYkVIaF1nNUG+b7u/sw==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.0.3.tgz",
      "integrity": "sha512-jsO7R8To+AdlYgUmN5sHSCZbfhtMBkO0WUx8iORQnPcMMdgr7qM2DQmMwgabs3GhNztdmoKkMKQFHD6DTMCIQw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.0.3.tgz",
      "integrity": "sha512-VWkUHwWriDciit80wleYwKILoR/KMvxh/IdwS/paX+ZgpuRpCrKLUdadJbc0NpBEiyhpYawsJ73j9aCvOH+f7Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.0.3.tgz",
      "integrity": "sha512-5f1laC0SlIR0yDbFCd8acUhvJIag6N3zC5P7oUPN6wX0aOma+uKJ0wBDH5aq7I1PVI2ttTlhJwzwRIBnLiSGEg==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.0.3.tgz",
      "integrity": "sha512-Iq4ko0r4XsgbrF/LunNgHtAGLRRVE2kXonAXQ/MV0mC6jQpMOhW1SvtZja2EhC/kd05++bP78dsqBeIQyYJ6Yg==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.0.3.tgz",
      "integrity": "sha512-B8m6tD5+/N5FeNQFbKlLA/2yVq9ycQP1SeedyEYYKWBNR3ZQbkvIUcNnDNM03lO1l5F2roiiFJGgvoLLyZXtSg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.0.3.tgz",
      "integrity": "sha512-pSdpdUJHkuCxun9LE7jvgUB9qsRgaiyNNCX7m/AvHTcq67AiT/Yhoxvw5zPfhrM8k/BfP8ce/hMOpthKDpEUow==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.0.3.tgz",
      "integrity": "sha512-OXXS3RKJgX2uLwM+gYyuH5omcH8fL1LJs96pZGgtetVCahON57+d4SJHzTgZiOjxgGkSnpXpOsWuPDGAKAigEg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.0.3.tgz",
      "integrity": "sha512-JTtb8BWFynicNSoPrehsCzBtOKjZ6jhMiPFEmOiuXg1Fl8dn2KHQob+GuPSGR0dryQa1PQJbzjF3dqO/whhjLg==",
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.10.0",
        "@emnapi/runtime": "1.10.0",
        "@napi-rs/wasm-runtime": "^1.1.4"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.0.3.tgz",
      "integrity": "sha512-gEdFFEN70A/jxb2svrWsN3aDL7OUtmvlOy+6fa2jxG8K0wQ1ZbdeLGnidov6Yu5/733dI5ySfzFlQ/cb0bSz1g==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.0.3.tgz",
      "integrity": "sha512-eXB7CHuaQdqmJcc3koCNtNPmT/bj2gc999kUFgBxG8Ac0NdgXc4rkCHhqrgrhN3zddvvvrgzj1e90SuSfmyIXA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz",
      "integrity": "sha512-2j9bGt5Jh8hj+vPtgzPtl72j0yRxHAyumoo6TNfAjsLB04UtpSvPbPcDcBMxz7n+9CYB0c1GxQFxYRg2jimqGw==",
      "license": "MIT"
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.3.0.tgz",
      "integrity": "sha512-aFb4gUhFOgdh9AXo4IzBEOzBkkAxm9VigwDJnMIYv3lcfXCJVesNfbEaBl4BNgVRyid92AmdviqwBUBRKSeY3g==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.21.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.3.0"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.3.0.tgz",
      "integrity": "sha512-F7HZGBeN9I0/AuuJS5PwcD8xayx5ri5GhjYUDBEVYUkexyA/giwbDNjRVrxSezE3T250OU2K/wp/ltWx3UOefg==",
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.3.0",
        "@tailwindcss/oxide-darwin-arm64": "4.3.0",
        "@tailwindcss/oxide-darwin-x64": "4.3.0",
        "@tailwindcss/oxide-freebsd-x64": "4.3.0",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.3.0",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.3.0",
        "@tailwindcss/oxide-linux-arm64-musl": "4.3.0",
        "@tailwindcss/oxide-linux-x64-gnu": "4.3.0",
        "@tailwindcss/oxide-linux-x64-musl": "4.3.0",
        "@tailwindcss/oxide-wasm32-wasi": "4.3.0",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.3.0",
        "@tailwindcss/oxide-win32-x64-msvc": "4.3.0"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.3.0.tgz",
      "integrity": "sha512-TJPiq67tKlLuObP6RkwvVGDoxCMBVtDgKkLfa/uyj7/FyxvQwHS+UOnVrXXgbEsfUaMgiVvC4KbJnRr26ho4Ng==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.3.0.tgz",
      "integrity": "sha512-oMN/WZRb+SO37BmUElEgeEWuU8E/HXRkiODxJxLe1UTHVXLrdVSgfaJV7pSlhRGMSOiXLuxTIjfsF3wYvz8cgQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.3.0.tgz",
      "integrity": "sha512-N6CUmu4a6bKVADfw77p+iw6Yd9Q3OBhe0veaDX+QazfuVYlQsHfDgxBrsjQ/IW+zywL8mTrNd0SdJT/zgtvMdA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.3.0.tgz",
      "integrity": "sha512-zDL5hBkQdH5C6MpqbK3gQAgP80tsMwSI26vjOzjJtNCMUo0lFgOItzHKBIupOZNQxt3ouPH7RPhvNhiTfCe5CQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.3.0.tgz",
      "integrity": "sha512-R06HdNi7A7OEoMsf6d4tjZ71RCWnZQPHj2mnotSFURjNLdBC+cIgXQ7l81CqeoiQftjf6OOblxXMInMgN2VzMA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.3.0.tgz",
      "integrity": "sha512-qTJHELX8jetjhRQHCLilkVLmybpzNQAtaI/gaoVoidn/ufbNDbAo8KlK2J+yPoc8wQxvDxCmh/5lr8nC1+lTbg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.3.0.tgz",
      "integrity": "sha512-Z6sukiQsngnWO+l39X4pPbiWT81IC+PLKF+PHxIlyZbGNb9MODfYlXEVlFvej5BOZInWX01kVyzeLvHsXhfczQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.3.0.tgz",
      "integrity": "sha512-DRNdQRpSGzRGfARVuVkxvM8Q12nh19l4BF/G7zGA1oe+9wcC6saFBHTISrpIcKzhiXtSrlSrluCfvMuledoCTQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.3.0.tgz",
      "integrity": "sha512-Z0IADbDo8bh6I7h2IQMx601AdXBLfFpEdUotft86evd/8ZPflZe9COPO8Q1vw+pfLWIUo9zN/JGZvwuAJqduqg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.3.0.tgz",
      "integrity": "sha512-HNZGOUxEmElksYR7S6sC5jTeNGpobAsy9u7Gu0AskJ8/20FR9GqebUyB+HBcU/ax6BHuiuJi+Oda4B+YX6H1yA==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.10.0",
        "@emnapi/runtime": "^1.10.0",
        "@emnapi/wasi-threads": "^1.2.1",
        "@napi-rs/wasm-runtime": "^1.1.4",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.3.0.tgz",
      "integrity": "sha512-Pe+RPVTi1T+qymuuRpcdvwSVZjnll/f7n8gBxMMh3xLTctMDKqpdfGimbMyioqtLhUYZxdJ9wGNhV7MKHvgZsQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.3.0.tgz",
      "integrity": "sha512-Mvrf2kXW/yeW/OTezZlCGOirXRcUuLIBx/5Y12BaPM7wJoryG6dfS/NJL8aBPqtTEx/Vm4T4vKzFUcKDT+TKUA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/vite": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.3.0.tgz",
      "integrity": "sha512-t6J3OrB5Fc0ExuhohouH0fWUGMYL6PTLhW+E7zIk/pdbnJARZDCwjBznFnkh5ynRnIRSI4YjtTH0t6USjJISrw==",
      "license": "MIT",
      "dependencies": {
        "@tailwindcss/node": "4.3.0",
        "@tailwindcss/oxide": "4.3.0",
        "tailwindcss": "4.3.0"
      },
      "peerDependencies": {
        "vite": "^5.2.0 || ^6 || ^7 || ^8"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.2",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.2.tgz",
      "integrity": "sha512-RoBvJ2X0wuKlWFIjrwffGw1IqZHKQqzIchKaadZZfnNpsAYp2mM0h36JtPCjNDAHGgYez/15uMBpfGwchhiMgg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/esrecurse": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/@types/esrecurse/-/esrecurse-4.3.1.tgz",
      "integrity": "sha512-xJBAbDifo5hpffDBuHl0Y8ywswbiAp/Wi7Y/GtAgSlZyIABppyurxVueOPE8LUQOxdlgi6Zqce7uoEpqNTeiUw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.9.tgz",
      "integrity": "sha512-GhdPgy1el4/ImP05X05Uw4cw2/M93BCUmnEvWZNStlCzEKME4Fkk+YpoA5OiHNQmoS7Cafb8Xa3Pya8m1Qrzeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.12.4",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.12.4.tgz",
      "integrity": "sha512-GUUEShf+PBCGW2KaXwcIt3Yk+e3pkKwWKb9GSyM9WQVE+ep2jzmHdGsHzu4wgcZy5fN9FBdVzjpBQsYlpfpgLA==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.16",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.16.tgz",
      "integrity": "sha512-esJiCAnl0kfpNdE69f3So4WJUXy95dLZydX0KwK46riIHDzHM7O9Vtf9xCHW0PXIqvgqNrswl522kA/5yx+F4w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.60.1.tgz",
      "integrity": "sha512-JQ4S5GB0tfjO8BuJ4fcX+HodkzJjYBV+7OJ+wLygaX7OGQ7FudyHL4NSCA6ob+w3Yn+5MkKIozOwQhXeM7opVg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.60.1",
        "@typescript-eslint/type-utils": "8.60.1",
        "@typescript-eslint/utils": "8.60.1",
        "@typescript-eslint/visitor-keys": "8.60.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.60.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.60.1.tgz",
      "integrity": "sha512-A0M6ua6H252bVjPvvtSgl2QA4+ET9S5Mtkb2GDyTxIhH/C4qDItT7RQNO5PhMC6NXGYXOR9dIalcDDgBKT7oFA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.60.1",
        "@typescript-eslint/types": "8.60.1",
        "@typescript-eslint/typescript-estree": "8.60.1",
        "@typescript-eslint/visitor-keys": "8.60.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.60.1.tgz",
      "integrity": "sha512-eXkTH2bxmXlqD1RnOPmLZ9ZM9D3VwSx04JOwBnP9RQ+yUA5a2Mu7SfW8uaV2Aon53NJzZlZYuX7tn91Izf+xaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.60.1",
        "@typescript-eslint/types": "^8.60.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.60.1.tgz",
      "integrity": "sha512-gvI5OQoptnxQnchOirukCuQ55svJSTuD/4k5+pC267xyBtYry748R9/c3tYUzb/iE6RZfllRz2lVulLCHkTm4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.60.1",
        "@typescript-eslint/visitor-keys": "8.60.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.60.1.tgz",
      "integrity": "sha512-nh8w4qAteiKuZu3pSSzG/yGKpw0OlkrKnzFmbVRenKaD4qc+7i1GrmZaLVkr8rk4uipiPGMOW4YsM6WmKZ5CvA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.60.1.tgz",
      "integrity": "sha512-sdwTrpjosW7ANQYJ39ZBF1ZyEMEGVB2UsikrserVM/30a/F1dTLnu9bGxEdosugyu5caigjLrR2qiD11asjI1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.60.1",
        "@typescript-eslint/typescript-estree": "8.60.1",
        "@typescript-eslint/utils": "8.60.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.60.1.tgz",
      "integrity": "sha512-4h0tY8ppCkdCzcrl2YM5M3my0xsE1Tf8om3owEu5oPWmXwkKRmk0j0LGDzYBGUcAlesEbxBhazqu/K4cu3Ug7w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.60.1.tgz",
      "integrity": "sha512-alpRkfG8hlVE5kdJW2GkfgDgXxold3e8e4l6EnmhRmRLbekgAPCCGDVD++sABy9FcgPFroq+uFcCSM1vR57Cew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.60.1",
        "@typescript-eslint/tsconfig-utils": "8.60.1",
        "@typescript-eslint/types": "8.60.1",
        "@typescript-eslint/visitor-keys": "8.60.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.5.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.8.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.1.tgz",
      "integrity": "sha512-rkVq3IXh+4FDGch+KwzX3aV9W3kO54GyEgpvBzSyctDA6Xtd7RJQV1xmXbeQp5v7+VzLOfVqiutSE6GICgPFvg==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.60.1.tgz",
      "integrity": "sha512-h2MPBLoNtjc3qZWfY3Tl51yPorQ2McHn8pJfcMNTcIvrrZrr90Ykffit0yjrPFWQcRcUxzH20+6OcVdW4yHtUg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.60.1",
        "@typescript-eslint/types": "8.60.1",
        "@typescript-eslint/typescript-estree": "8.60.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.60.1.tgz",
      "integrity": "sha512-EbGRQg4FhrmwLodl+t3JNAnXHWVr9Vp+Zl1QBZVPY4ByfkzIT8cX3K6QWODHtkIZqqJVEWvhHSx3v5PDHsaQag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.60.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.0.2.tgz",
      "integrity": "sha512-DlSMqo4WhThw4vB8Mpn0Woe9J+Jfq1geJ61AKW0QEgLzGMNwtIMdxbDUzLxcun8W7NbJO0e2Jg/Nxm3cCSVzzg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "^1.0.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/3dmol": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/3dmol/-/3dmol-2.5.3.tgz",
      "integrity": "sha512-/rVirGSwU4HmqAm7GqDz6AUnrKB6Gv95QsjR/q6ig4VCs45mqGOaM7njageLgDjHnyJZBEd0GBEY1HeI/4MW2g==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "iobuffer": "^5.0.0",
        "netcdfjs": "^3.0.0",
        "pako": "^2.1.0",
        "upng-js": "^2.1.0"
      },
      "engines": {
        "node": ">=16.16.0",
        "npm": ">=8.11"
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.33",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.33.tgz",
      "integrity": "sha512-bA6+tcSLpz2tIEdDXZPpPTIuxBcC4+w6SieaYyfigIa4h8GlFxbA17v22Vx3JUtuZQj9SgOsnbK+aTBzyDyEuw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "5.0.6",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.6.tgz",
      "integrity": "sha512-kLpxurY4Z4r9sgMsyG0Z9uzsBlgiU/EFKhj/h91/8yHu0edo7XuixOIH3VcJ8kkxs6/jPzoI6U9Vj3WqbMQ94g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001793",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001793.tgz",
      "integrity": "sha512-iwSsYWaCOoh26cV8NwNRViHlrfUvYsHDfRVcbtmw0Kg6PJIZZXwMkj1442FYLBGkeUf1juAsU3DTfxW579mrPA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.365",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.365.tgz",
      "integrity": "sha512-xfip4u1QF1s+URFqpA6N+OeFpDGpN7VJz1f3MO3bVL0QYBjpGiZ5/Of7kugvM+o8TTqmanUlviHN3c8M9vYWCw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/enhanced-resolve": {
      "version": "5.22.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.22.1.tgz",
      "integrity": "sha512-6QEuw3zoX1SJQc7b87aBXke/no+mG2bTBgw29gWMQonLmpEkWoCAVkl+M49e48AZlWzxiDzDZzYdp6kobcyLww==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "10.4.1",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-10.4.1.tgz",
      "integrity": "sha512-AyIKhnOBuOAdueD7RB3xB+YeAWScb9jHsJBgH2Hcde8InP5JYhqrRR6iTMHyTEwgENK54Cp44e4v8BwNhsuHuw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.2",
        "@eslint/config-array": "^0.23.5",
        "@eslint/config-helpers": "^0.6.0",
        "@eslint/core": "^1.2.1",
        "@eslint/plugin-kit": "^0.7.2",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^9.1.2",
        "eslint-visitor-keys": "^5.0.1",
        "espree": "^11.2.0",
        "esquery": "^1.7.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "minimatch": "^10.2.4",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.1.1.tgz",
      "integrity": "sha512-f2I7Gw6JbvCexzIInuSbZpfdQ44D7iqdWX01FKLvrPgqxoE7oMj8clOfto8U6vYiz4yd5oKu39rRSVOe1zRu0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0 || ^10.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.5.2.tgz",
      "integrity": "sha512-hmgTH57GfzoTFjVN0yBwTggnsVUF2tcqi7RJZHqi9lIezSs4eFyAMktA68YD4r5kNw1mxyY4dmkyoFDb3FIqrA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": "^9 || ^10"
      }
    },
    "node_modules/eslint-scope": {
      "version": "9.1.2",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-9.1.2.tgz",
      "integrity": "sha512-xS90H51cKw0jltxmvmHy2Iai1LIqrfbw57b79w/J7MfvDfkIkFZ+kj6zC3BjtUwh150HsSSdxXZcsuv72miDFQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@types/esrecurse": "^4.3.1",
        "@types/estree": "^1.0.8",
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "11.2.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-11.2.0.tgz",
      "integrity": "sha512-7p3DrVEIopW1B1avAGLuCSh1jubc01H2JHc8B4qqGblmg5gI9yumBgACjWo4JlIc04ufug4xJ3SQI8HkS/Rgzw==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.16.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^5.0.1"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "17.6.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-17.6.0.tgz",
      "integrity": "sha512-sepffkT8stwnIYbsMBpoCHJuJM5l98FUF2AnE07hfvE0m/qp3R586hw4jF4uadbhvg1ooIdzuu7CsfD2jzCaNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/iobuffer": {
      "version": "5.4.0",
      "resolved": "https://registry.npmjs.org/iobuffer/-/iobuffer-5.4.0.tgz",
      "integrity": "sha512-DRebOWuqDvxunfkNJAlc3IzWIPD5xVxwUNbHr7xKB8E6aLJxIPfNX3CoMJghcFjpv6RWQsrcJbghtEwSPoJqMA==",
      "license": "MIT"
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jiti": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.7.0.tgz",
      "integrity": "sha512-AC/7JofJvZGrrneWNaEnJeOLUx+JlGt7tNa0wZiRPT4MY1wmfKjt2+6O2p2uz2+skll8OZZmJMNqeke7kKbNgQ==",
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.17.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.17.0.tgz",
      "integrity": "sha512-9FA9evdox/JQL5PT57fdA1x/yg8T7knJ98+zjTL3UfKza6pflQUUh3XtaQIHKvnsJw1lmsEyHVlt5jchYxOQ5w==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/minimatch": {
      "version": "10.2.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.5.tgz",
      "integrity": "sha512-MULkVLfKGYDFYejP07QOurDLLQpcjk7Fw+7jXS2R2czRQzR56yHRveU5NDJEOviH+hETZKSkIk5c+T23GjFUMg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.5"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.12",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.12.tgz",
      "integrity": "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/netcdfjs": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/netcdfjs/-/netcdfjs-3.0.0.tgz",
      "integrity": "sha512-LOvT8KkC308qtpUkcBPiCMBtii7ZQCN6LxcVheWgyUeZ6DQWcpSRFV9dcVXLj/2eHZ/bre9tV5HTH4Sf93vrFw==",
      "license": "MIT",
      "dependencies": {
        "iobuffer": "^5.3.2"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.47",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.47.tgz",
      "integrity": "sha512-Uzmd6LXpouKo8EUK68IjH4+E01w/hXyV3R3g/geCJo+rXLNfh1xucB+LOzYEOQPSiUK3h/xZf0cQGcSsmyL2Og==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/pako": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pako/-/pako-2.2.0.tgz",
      "integrity": "sha512-zJq6RP/5q+TO2OpFV3FHzlPnFjmkb7Nc99a5SNjJE+uu/PkpChs+NIZSSzbBoD+6kjiISXjfYdwj1ZRQ81dz/w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],
      "license": "(MIT AND Zlib)"
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.15",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.15.tgz",
      "integrity": "sha512-FfR8sjd4em2T6fb3I2MwAJU7HWVMr9zba+enmQeeWFfCbm+UOC/0X4DS8XtpUTMwWMGbjKYP7xjfNekzyGmB3A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.12",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/react": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.7.tgz",
      "integrity": "sha512-HNe9WslTbXmFK8o8cmwgAeJFSBvt1bPdHCVKtaaV+WlAN36mpT4hcRpwbf3fY56ar2oIXzsBpOAiIRHAdY0OlQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.7",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.7.tgz",
      "integrity": "sha512-t0BRVXvbiE/o20Hfw669rLbMCDWtYZLvmJigy2f0MxsXF+71pxhR3xOkspmsO8h3ZlNzyibAmtCa3l4lYKk6gQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.7"
      }
    },
    "node_modules/rolldown": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.0.3.tgz",
      "integrity": "sha512-i00lAJ2ks1BYr7rjNjKC7BcqAS7nVfiT3QX1SI5aY+AFHblCmaUf9OE9dbdzDvW6dJxbi2ZCZiy9v3CcwOiX3g==",
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.133.0",
        "@rolldown/pluginutils": "^1.0.0"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.0.3",
        "@rolldown/binding-darwin-arm64": "1.0.3",
        "@rolldown/binding-darwin-x64": "1.0.3",
        "@rolldown/binding-freebsd-x64": "1.0.3",
        "@rolldown/binding-linux-arm-gnueabihf": "1.0.3",
        "@rolldown/binding-linux-arm64-gnu": "1.0.3",
        "@rolldown/binding-linux-arm64-musl": "1.0.3",
        "@rolldown/binding-linux-ppc64-gnu": "1.0.3",
        "@rolldown/binding-linux-s390x-gnu": "1.0.3",
        "@rolldown/binding-linux-x64-gnu": "1.0.3",
        "@rolldown/binding-linux-x64-musl": "1.0.3",
        "@rolldown/binding-openharmony-arm64": "1.0.3",
        "@rolldown/binding-wasm32-wasi": "1.0.3",
        "@rolldown/binding-win32-arm64-msvc": "1.0.3",
        "@rolldown/binding-win32-x64-msvc": "1.0.3"
      }
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.0.tgz",
      "integrity": "sha512-y6nxMGB1nMW9R6k96e5gdIFzcfL/gTJRNaqGes1YvkLnPVXzWgbqFF2yLC0T8G774n24cx3Pe8XrKoniCOAH+Q==",
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.3.tgz",
      "integrity": "sha512-uxc/zpqFg6x7C8vOE7lh6Lbda8eEL9zmVm/PLeTPBRhh1xCgdWaQ+J1CUieGpIfm2HdtsUpRv+HshiasBMcc6A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD",
      "optional": true
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-6.0.3.tgz",
      "integrity": "sha512-y2TvuxSZPDyQakkFRPZHKFm+KKVqIisdg9/CZwm9ftvKXLP8NRWj38/ODjNbr43SsoXqNuAisEf1GdCxqWcdBw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.60.1",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.60.1.tgz",
      "integrity": "sha512-6m5hkkRAp8lKvhVpcprAIn5KkehQEh+47oHH2VGnExEh7dhNxXlg6GPAOIu6TxbVQxhebrJDvjl3020ooiWCMA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.60.1",
        "@typescript-eslint/parser": "8.60.1",
        "@typescript-eslint/typescript-estree": "8.60.1",
        "@typescript-eslint/utils": "8.60.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.1.0"
      }
    },
    "node_modules/undici-types": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.16.0.tgz",
      "integrity": "sha512-Zz+aZWSj8LE6zoxD+xrjh4VfkIG8Ya6LvYkZqtUQGJPZjYl53ypCaUwWqo7eI0x66KBGeRo+mlBEkMSeSZ38Nw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/upng-js": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/upng-js/-/upng-js-2.1.0.tgz",
      "integrity": "sha512-d3xzZzpMP64YkjP5pr8gNyvBt7dLk/uGI67EctzDuVp4lCZyVMo0aJO6l/VDlgbInJYDY6cnClLoBp29eKWI6g==",
      "license": "MIT",
      "dependencies": {
        "pako": "^1.0.5"
      }
    },
    "node_modules/upng-js/node_modules/pako": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/pako/-/pako-1.0.11.tgz",
      "integrity": "sha512-4hLB8Py4zZce5s4yd9XzopqwVv/yGNhV1Bl8NTmCq1763HeK2+EwVTv+leGeL13Dnh2wfbqowVPXCIO0z4taYw==",
      "license": "(MIT AND Zlib)"
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/vite": {
      "version": "8.0.16",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.0.16.tgz",
      "integrity": "sha512-h9bXPmJichP5fLmVQo3PyaGSDE2n3aPuomeAlVRm0JLmt4rY6zmPKd59HYI4LNW8oTK7tlTsuC7l/m7awx9Jcw==",
      "license": "MIT",
      "dependencies": {
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.4",
        "postcss": "^8.5.15",
        "rolldown": "1.0.3",
        "tinyglobby": "^0.2.17"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.1.18",
        "esbuild": "^0.27.0 || ^0.28.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.4.3.tgz",
      "integrity": "sha512-ytENFjIJFl2UwYglde2jchW2Hwm4GJFLDiSXWdTrJQBIN9Fcyp7n4DhxJEiWNAJMV1/BqWfW/kkg71UDcHJyTQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.14",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.14.tgz",
      "integrity": "sha512-/8tAspM5LMPr28b3fwLYrtdj77ECpfZviaP75CMTnwO8ISyaE4GDIG/9rDDYq/cH9D2Xw2A2RXglLInmVBQB/g==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}
````

## REPLACE FILE

FILE: `package.json`

````json
{
  "name": "chemease",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build && node tools/make-standalone.mjs",
    "lint": "eslint .",
    "preview": "vite preview --host 0.0.0.0",
    "typecheck": "tsc -b",
    "test": "node tools/test.mjs"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "3dmol": "^2.5.3",
    "lucide-react": "^1.17.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "tailwindcss": "^4.3.0",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}
````

## RETAIN FILE

FILE: `public/favicon.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## RETAIN FILE

FILE: `public/icons.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## REPLACE FILE

FILE: `src/App.css`

````css
.app {
  min-height: 100vh;
}
.toast {
  position: fixed;
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 20px;
  background: var(--text);
  color: var(--surface);
  border-radius: 8px;
  box-shadow: var(--shadow);
  max-width: 90vw;
  font-size: 13px;
  text-align: center;
  animation: appear 0.18s ease-out;
}
.logo {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.9px;
  white-space: nowrap;
}
.logo-mark {
  color: var(--accent);
  display: flex;
}
.beta {
  margin-left: 3px;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  font-weight: 500;
}
.formula {
  font-family: var(--font);
  font-weight: 600;
  letter-spacing: -0.6px;
}
.formula sub {
  font-size: 0.62em;
  vertical-align: -0.2em;
}
````

## REPLACE FILE

FILE: `src/App.tsx`

````tsx
import {
  useEffect,
  useState,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { LandingPage } from "./pages/LandingPage";
import { EditorPage } from "./pages/EditorPage";
import { useUIStore } from "./store/chemUIStore";
import { useMoleculeStore, fingerprint } from "./store/moleculeStore";
import { useHistoryStore } from "./store/historyStore";
import { readPreference, writePreference, loadMolecule } from "./utils/storage";
import "./App.css";
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      "ChemEase rendering error",
      error.message,
      info.componentStack,
    );
  }
  render() {
    if (this.state.error)
      return (
        <div style={{ padding: 48, maxWidth: 620, margin: "auto" }}>
          <h1>The workspace needs a reset.</h1>
          <p style={{ margin: "20px 0" }}>
            Your saved molecule has not been deleted. Reload to recover the last
            local save.
          </p>
          <button className="primary" onClick={() => location.reload()}>
            Reload ChemEase
          </button>
        </div>
      );
    return this.props.children;
  }
}
export default function App() {
  const [editor, setEditor] = useState(
    () =>
      readPreference("chemease.visited", "false") === "true" &&
      readPreference("chemease.skipIntro", "true") === "true",
  );
  const theme = useUIStore((s) => s.theme),
    toast = useUIStore((s) => s.toast);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    try {
      const m = loadMolecule();
      if (m) {
        useMoleculeStore.getState().replace(m);
        useMoleculeStore.setState({ savedFingerprint: fingerprint(m) });
        useHistoryStore.getState().clear();
      }
    } catch (e) {
      useUIStore
        .getState()
        .notify(`Saved file not loaded: ${(e as Error).message}`);
    }
  }, []);
  const enter = () => {
    writePreference("chemease.visited", "true");
    setEditor(true);
    window.scrollTo(0, 0);
  };
  return (
    <ErrorBoundary>
      <div className="app">
        {editor ? (
          <EditorPage
            onIntro={() => {
              setEditor(false);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <LandingPage onEnter={enter} />
        )}{" "}
        {toast && (
          <div className="toast" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/canvas/AtomShape.tsx`

````tsx
import { memo } from "react";
import type { Atom } from "../../types/chem";
import type { ValenceInfo } from "../../engine/valence";
import { atomLabel } from "../../engine/rendering";
import { elementColor } from "../../utils/elementColor";
import { chargeLabel } from "../../utils/format";
interface Props {
  atom: Atom;
  degree: number;
  valence: ValenceInfo;
  selected: boolean;
  pending: boolean;
  showCarbons: boolean;
  showHydrogens: boolean;
  dark: boolean;
  warning: boolean;
  onKeyboardSelect: (id: string) => void;
}
export const AtomShape = memo(function AtomShape({
  atom: a,
  degree,
  valence,
  selected,
  pending,
  showCarbons,
  showHydrogens,
  dark,
  warning,
  onKeyboardSelect,
}: Props) {
  const visible = atomLabel(a, degree, showCarbons);
  return (
    <g
      className={`atom-shape ${selected ? "is-selected" : ""}`}
      transform={`translate(${a.x} ${a.y})`}
      data-atom={a.id}
      role="button"
      tabIndex={0}
      aria-label={`${a.element} atom, charge ${a.charge}, ${valence.implicitH} implicit hydrogens`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onKeyboardSelect(a.id);
        }
      }}
    >
      <circle className="atom-hit" r="17" />
      <circle className="atom-hover" r="15" />
      {(selected || pending) && (
        <circle
          className="atom-selection"
          r="17"
          strokeDasharray={pending ? "3 3" : undefined}
        />
      )}
      {warning && (
        <path
          d="M-9 23h18"
          stroke="var(--warning)"
          strokeWidth="2"
          strokeDasharray="2 3"
        />
      )}
      {visible && (
        <text
          className="atom-text"
          textAnchor="middle"
          dominantBaseline="central"
          fill={elementColor(a.element, dark)}
        >
          {a.element === "R" ? "R" : a.element}
        </text>
      )}
      {visible && showHydrogens && valence.implicitH > 0 && (
        <text
          className="atom-hydrogen"
          x={a.element.length > 1 ? 16 : 11}
          y="6"
          fill={elementColor(a.element, dark)}
        >
          H
          {valence.implicitH > 1 && (
            <tspan fontSize="10" dy="3">
              {valence.implicitH}
            </tspan>
          )}
        </text>
      )}
      {a.charge !== 0 && (
        <text className="atom-charge" x={-13} y={-12} fill="var(--text)">
          {chargeLabel(a.charge)}
        </text>
      )}
      {a.isotope && (
        <text x="-15" y="-11" fontSize="10" fill="var(--text)">
          {a.isotope}
        </text>
      )}
      {Array.from({ length: Math.min(a.lonePairs, 4) }, (_, i) => (
        <g key={i} transform={`rotate(${i * 90})`}>
          <circle cx="-3" cy="-23" r="1.4" fill="var(--text)" />
          <circle cx="3" cy="-23" r="1.4" fill="var(--text)" />
        </g>
      ))}
    </g>
  );
});
````

## CREATE NEW FILE

FILE: `src/Components/canvas/BondShape.tsx`

````tsx
import { memo } from "react";
import type { Atom, Bond } from "../../types/chem";
import { bondSegments } from "../../engine/rendering";
export const BondShape = memo(function BondShape({
  bond: b,
  a,
  d,
  labelA,
  labelB,
  selected,
  onKeyboardSelect,
}: {
  bond: Bond;
  a: Atom;
  d: Atom;
  labelA: boolean;
  labelB: boolean;
  selected: boolean;
  onKeyboardSelect: (id: string) => void;
}) {
  const segments = bondSegments(b, a, d, labelA, labelB);
  return (
    <g
      data-bond={b.id}
      className={`bond-shape ${selected ? "is-selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${b.type} bond`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onKeyboardSelect(b.id);
        }
      }}
    >
      <line className="bond-hit" x1={a.x} y1={a.y} x2={d.x} y2={d.y} />
      <line className="bond-hover" x1={a.x} y1={a.y} x2={d.x} y2={d.y} />
      {segments.map((p, i) => (
        <line
          key={i}
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke={selected ? "var(--accent)" : "var(--text)"}
          strokeWidth={p.dashed ? 1.35 : 1.85}
          strokeDasharray={p.dashed ? "4 4" : undefined}
          strokeLinecap="round"
          pointerEvents="none"
        />
      ))}
    </g>
  );
});
````

## CREATE NEW FILE

FILE: `src/Components/canvas/Canvas.css`

````css
.canvas-workspace {
  position: relative;
  min-width: 0;
  min-height: 0;
  background: var(--canvas);
  overflow: hidden;
}
.molecular-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  touch-action: none;
  user-select: none;
  outline-offset: -4px;
}
.tool-draw .molecular-canvas,
.tool-ring .molecular-canvas,
.tool-bond .molecular-canvas {
  cursor: crosshair;
}
.tool-pan .molecular-canvas {
  cursor: grab;
}
.tool-erase .molecular-canvas {
  cursor: cell;
}
.canvas-top {
  position: absolute;
  z-index: 2;
  top: 28px;
  left: 32px;
  right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  pointer-events: none;
  gap: 16px;
}
.document-heading h1 {
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.55px;
  margin: 10px 0 8px;
  max-width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.document-heading .eyebrow {
  font-size: 8px;
  letter-spacing: 1.8px;
}
.document-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text-muted);
}
.document-meta i {
  width: 3px;
  height: 3px;
  background: var(--text-muted);
  border-radius: 50%;
}
.template-select {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 0 9px;
  border-radius: 6px;
  box-shadow: var(--shadow);
  color: var(--text-muted);
}
.template-select select {
  border: 0;
  background: none;
  font-size: 10px;
  padding: 9px 0;
  max-width: 105px;
  cursor: pointer;
}
.empty-canvas {
  position: absolute;
  left: 50%;
  top: 49%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  width: 280px;
}
.empty-hex {
  position: relative;
  margin: 0 auto 22px;
  color: var(--accent);
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  opacity: 0.65;
}
.empty-hex > span {
  position: absolute;
  right: 2px;
  top: 0;
  font-size: 20px;
  background: var(--canvas);
}
.empty-canvas h2 {
  font-size: 21px;
  font-weight: 450;
  letter-spacing: -0.6px;
  margin-bottom: 13px;
}
.empty-canvas p {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.9;
}
.empty-canvas > div:last-child {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 24px;
}
.empty-canvas button {
  pointer-events: auto;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  padding: 5px;
}
.canvas-bottom {
  pointer-events: none;
  position: absolute;
  bottom: 20px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.canvas-hint {
  font-size: 9px;
  display: flex;
  gap: 7px;
  align-items: center;
  color: var(--text-muted);
  line-height: 1.5;
  background: color-mix(in srgb, var(--canvas) 85%, transparent);
  padding: 5px;
  border-radius: 4px;
}
.canvas-watermark {
  font-size: 8px;
  letter-spacing: 2px;
  color: var(--text-muted);
  opacity: 0.55;
  white-space: nowrap;
}
.atom-hit {
  fill: transparent;
}
.atom-hover {
  fill: var(--accent);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}
.atom-shape:hover .atom-hover {
  opacity: 0.075;
}
.atom-selection {
  fill: var(--accent-soft);
  fill-opacity: 0.55;
  stroke: var(--accent);
  stroke-width: 1;
  pointer-events: none;
}
.atom-text {
  font-size: 20px;
  font-family: var(--font);
  font-weight: 500;
  pointer-events: none;
  paint-order: stroke;
  stroke: var(--canvas);
  stroke-width: 3px;
  stroke-linejoin: round;
}
.atom-hydrogen {
  font-size: 16px;
  font-family: var(--font);
  pointer-events: none;
  paint-order: stroke;
  stroke: var(--canvas);
  stroke-width: 3px;
  stroke-linejoin: round;
}
.atom-charge {
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
}
.bond-hit {
  stroke: transparent;
  stroke-width: 13;
  pointer-events: stroke;
}
.bond-hover {
  stroke: var(--accent);
  stroke-width: 8;
  stroke-linecap: round;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}
.bond-shape:hover .bond-hover,
.bond-shape.is-selected .bond-hover {
  opacity: 0.13;
}
.atom-shape:focus-visible {
  outline: none;
}
.atom-shape:focus-visible .atom-hover {
  opacity: 0.25;
}
.bond-shape:focus-visible {
  outline: none;
}
.bond-shape:focus-visible .bond-hover {
  opacity: 0.3;
}
.lasso-box {
  fill: var(--accent-soft);
  fill-opacity: 0.4;
  stroke: var(--accent);
  stroke-width: 1;
  stroke-dasharray: 4 3;
  pointer-events: none;
}
@media (max-width: 1150px) {
  .canvas-watermark {
    display: none;
  }
  .canvas-top {
    left: 24px;
  }
  .document-heading h1 {
    max-width: 230px;
  }
}
@media (max-width: 700px) {
  .canvas-top {
    top: 20px;
    left: 18px;
    right: 14px;
  }
  .document-heading h1 {
    max-width: 180px;
    font-size: 18px;
  }
  .document-meta {
    font-size: 9px;
  }
  .canvas-bottom {
    left: 12px;
    right: 12px;
    bottom: 8px;
  }
  .canvas-hint {
    font-size: 10px;
    max-width: 300px;
  }
  .template-select {
    max-width: 110px;
  }
  .document-heading .eyebrow {
    font-size: 7px;
  }
}
````

## REPLACE FILE

FILE: `src/Components/canvas/Canvas.tsx`

````tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useCanvasInteraction } from "../../hooks/useCanvasInteraction";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { renderContext, atomLabel } from "../../engine/rendering";
import { bounds } from "../../engine/geometry";
import { AtomShape } from "./AtomShape";
import { BondShape } from "./BondShape";
import { Icon } from "../common/Icon";
import { template } from "../../engine/templates";
import "./Canvas.css";
const hints: Record<string, string> = {
  draw: "Click to place an atom · click an existing atom to replace it",
  select: "Drag to move · Shift-click to extend selection",
  bond: "Click two atoms to connect · click a bond to change its order",
  erase: "Click an atom or bond to erase",
  lasso: "Drag a rectangle to select atoms · Shift to add",
  ring: "Click the canvas to place an editable ring",
  charge: "Click an atom to apply charge · Alt-click reverses the sign",
  lonePair: "Click an atom to cycle lone-pair annotations",
  hydrogen: "Click an atom to attach an explicit hydrogen",
  pan: "Drag to pan your workspace",
};
export function Canvas() {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const m = useMoleculeStore((s) => s.molecule),
    selectedAtoms = useMoleculeStore((s) => s.selectedAtoms),
    selectedBonds = useMoleculeStore((s) => s.selectedBonds);
  const tool = useUIStore((s) => s.tool),
    pan = useUIStore((s) => s.pan),
    zoom = useUIStore((s) => s.zoom),
    theme = useUIStore((s) => s.theme),
    showCarbons = useUIStore((s) => s.showCarbons),
    showHydrogens = useUIStore((s) => s.showHydrogens),
    grid = useUIStore((s) => s.showGrid),
    pending = useUIStore((s) => s.pendingAtom),
    fitVersion = useUIStore((s) => s.fitVersion);
  const { lasso, ...handlers } = useCanvasInteraction(ref);
  const context = useMemo(() => renderContext(m), [m]);
  const analysis = useMoleculeAnalysis();
  const warningIds = new Set(analysis.warnings.map((w) => w.atomId));
  useEffect(() => {
    const node = ref.current!;
    const ro = new ResizeObserver(() => {
      const r = node.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const state = useMoleculeStore.getState();
    if (!state.molecule.atoms.length) {
      useUIStore.getState().set({ zoom: 1, pan: { x: 0, y: 0 } });
      return;
    }
    const box = bounds(state.molecule.atoms),
      rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const z = Math.max(
      0.2,
      Math.min(
        2,
        (rect.width - 140) / (box.width + 50),
        (rect.height - 170) / (box.height + 50),
      ),
    );
    useUIStore.getState().set({
      zoom: z,
      pan: {
        x: -(box.x + box.width / 2) * z,
        y: -(box.y + box.height / 2) * z,
      },
    });
  }, [fitVersion, size.w, size.h]);
  const selectAtom = (id: string) => {
      useMoleculeStore.getState().setSelection([id]);
      useUIStore.getState().set({ tool: "select" });
    },
    selectBond = (id: string) => {
      useMoleculeStore.getState().setSelection([], [id]);
      useUIStore.getState().set({ tool: "select" });
    };
  const loadExample = (name: "benzene" | "ethanol" | "aspirin") => {
    const s = useMoleculeStore.getState();
    if (
      s.molecule.atoms.length &&
      fingerprint(s.molecule) !== s.savedFingerprint &&
      !window.confirm(
        "Replace the current structure? You can undo this change.",
      )
    )
      return;
    s.replace(template(name));
  };
  return (
    <section
      className={`canvas-workspace tool-${tool}`}
      aria-label="Molecular drawing workspace"
    >
      <div className="canvas-top">
        <div className="document-heading">
          <span className="eyebrow muted">Your molecular workspace</span>
          <h1>{m.metadata.name}</h1>
          <span className="document-meta">
            2D structure <i />{" "}
            {m.atoms.length
              ? `${m.atoms.length} atoms · ${m.bonds.length} bonds`
              : "A blank canvas for your next idea"}
          </span>
        </div>
        <label className="template-select">
          <Icon name="folder" size={15} />
          <select
            aria-label="Load example structure"
            value=""
            onChange={(e) => {
              if (e.target.value)
                loadExample(
                  e.target.value as "benzene" | "ethanol" | "aspirin",
                );
            }}
          >
            <option value="">Examples</option>
            <option value="benzene">Benzene</option>
            <option value="ethanol">Ethanol</option>
            <option value="aspirin">Aspirin</option>
          </select>
        </label>
      </div>
      <svg
        ref={ref}
        id="molecular-canvas"
        role="group"
        className="molecular-canvas"
        aria-label="Molecule canvas"
        tabIndex={0}
        {...handlers}
        onContextMenu={(e) => e.preventDefault()}
      >
        <defs>
          <pattern
            id="dots"
            width={20 * zoom}
            height={20 * zoom}
            x={size.w / 2 + pan.x}
            y={size.h / 2 + pan.y}
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".65" fill="var(--grid)" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={grid ? "url(#dots)" : "var(--canvas)"}
        />
        <g
          transform={`translate(${size.w / 2 + pan.x} ${size.h / 2 + pan.y}) scale(${zoom})`}
        >
          {m.bonds.map((b) => {
            const a = context.atomMap.get(b.atomA),
              d = context.atomMap.get(b.atomB);
            return a && d ? (
              <BondShape
                key={b.id}
                bond={b}
                a={a}
                d={d}
                labelA={atomLabel(
                  a,
                  context.adj.get(a.id)?.length || 0,
                  showCarbons,
                )}
                labelB={atomLabel(
                  d,
                  context.adj.get(d.id)?.length || 0,
                  showCarbons,
                )}
                selected={selectedBonds.includes(b.id)}
                onKeyboardSelect={selectBond}
              />
            ) : null;
          })}
          {m.atoms.map((a) => (
            <AtomShape
              key={a.id}
              atom={a}
              degree={context.adj.get(a.id)?.length || 0}
              valence={context.valences.get(a.id)!}
              selected={selectedAtoms.includes(a.id)}
              pending={pending === a.id}
              showCarbons={showCarbons}
              showHydrogens={showHydrogens}
              dark={theme === "dark"}
              warning={warningIds.has(a.id)}
              onKeyboardSelect={selectAtom}
            />
          ))}
          {lasso && (
            <rect
              x={Math.min(lasso.a.x, lasso.b.x)}
              y={Math.min(lasso.a.y, lasso.b.y)}
              width={Math.abs(lasso.a.x - lasso.b.x)}
              height={Math.abs(lasso.a.y - lasso.b.y)}
              className="lasso-box"
            />
          )}
        </g>
      </svg>
      {!m.atoms.length && (
        <div className="empty-canvas">
          <div className="empty-hex">
            <Icon name="ring" size={38} />
            <span>+</span>
          </div>
          <h2>Start drawing</h2>
          <p>
            Select an element from the toolbar
            <br />
            and click anywhere on the canvas.
          </p>
          <div>
            or begin with{" "}
            <button onClick={() => loadExample("benzene")}>
              benzene <Icon name="arrow" size={12} />
            </button>
          </div>
        </div>
      )}
      <div className="canvas-bottom">
        <span className="canvas-hint">
          <Icon name={pending ? "bond" : "info"} size={13} />
          {pending
            ? "Select another atom to connect · Esc to cancel"
            : hints[tool]}
        </span>
        <span className="canvas-watermark">CHEMEASE / STUDIO</span>
      </div>
    </section>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/canvas/RingShape.tsx`

````tsx
export function DemoMolecule() {
  const p = Array.from({ length: 6 }, (_, i) => ({
    x: 150 + 68 * Math.cos((i * Math.PI) / 3),
    y: 110 + 68 * Math.sin((i * Math.PI) / 3),
  }));
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-label="Benzene structure">
      <g strokeWidth="2" strokeLinecap="round">
        {p.map((a, i) => (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={p[(i + 1) % 6].x}
            y2={p[(i + 1) % 6].y}
          />
        ))}
        <circle
          cx="150"
          cy="110"
          r="45"
          strokeDasharray="5 5"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/canvas/canvasInteractions.ts`

````typescript
import type { Point } from "../../types/editor";
export function screenToWorld(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  pan: Point,
  zoom: number,
): Point {
  return {
    x: (clientX - rect.left - rect.width / 2 - pan.x) / zoom,
    y: (clientY - rect.top - rect.height / 2 - pan.y) / zoom,
  };
}
export function targetId(target: EventTarget | null, kind: "atom" | "bond") {
  return target instanceof Element
    ? target.closest(`[data-${kind}]`)?.getAttribute(`data-${kind}`) || null
    : null;
}
````

## CREATE NEW FILE

FILE: `src/Components/common/Button.tsx`

````tsx
import type { ButtonHTMLAttributes } from "react";
export function Button({
  className = "",
  variant = "secondary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return <button className={`${variant} ${className}`} {...props} />;
}
````

## CREATE NEW FILE

FILE: `src/Components/common/Formula.tsx`

````tsx
export function Formula({ value }: { value: string }) {
  return (
    <span
      className="formula"
      role="img"
      aria-label={value || "Empty structure"}
    >
      {value
        ? value
            .split(/(\d+)/)
            .map((s, i) => (/^\d+$/.test(s) ? <sub key={i}>{s}</sub> : s))
        : "—"}
    </span>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/common/Icon.tsx`

````tsx
import type { CSSProperties } from "react";
const paths: Record<string, string> = {
  select: "M5 3l14 9-7 1-3 7-4-17z",
  erase: "M16 3l5 5-11 12H5l-3-3L16 3z M8 11l6 6 M10 20h11",
  lasso: "M4 4h16v16H4z",
  undo: "M9 5L4 10l5 5 M4 10h10a6 6 0 010 12",
  redo: "M15 5l5 5-5 5 M20 10H10a6 6 0 000 12",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  save: "M4 3h13l4 4v14H3V3z M7 3v6h10V3 M7 21v-8h10v8",
  export: "M12 15V3 M7 8l5-5 5 5 M4 14v7h16v-7",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1 M5 19l1-1 M18 6l1-1",
  moon: "M20 15A9 9 0 019 3a9 9 0 1011 12z",
  settings:
    "M12 8a4 4 0 100 8 4 4 0 000-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z",
  help: "M9 8a3 3 0 016 0c0 3-3 2-3 5 M12 17v.2 M12 2a10 10 0 100 20 10 10 0 000-20",
  close: "M6 6l12 12 M6 18L18 6",
  chevron: "M9 5l7 7-7 7",
  left: "M15 5l-7 7 7 7",
  copy: "M9 9h12v12H9z M15 9V3H3v12h6",
  check: "M4 12l5 5L20 6",
  flask: "M9 3h6 M10 3v6l-6 11h16L14 9V3 M7 15h10",
  fit: "M3 9V3h6 M15 3h6v6 M21 15v6h-6 M9 21H3v-6",
  grid: "M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h6v6h-6z",
  folder: "M3 6h7l2 3h9v12H3z",
  arrow: "M4 12h16 M14 6l6 6-6 6",
  ring: "M12 2l9 5v10l-9 5-9-5V7z",
  atom: "M12 9a3 3 0 100 6 3 3 0 000-6 M4 4l16 16 M20 4L4 20 M2 12h20",
  info: "M12 11v6 M12 7v.2 M12 2a10 10 0 100 20 10 10 0 000-20",
  download: "M12 3v12 M7 10l5 5 5-5 M4 17v4h16v-4",
  pan: "M8 13V5a2 2 0 014 0v7 M12 5a2 2 0 014 0v8 M16 8a2 2 0 014 0v8l-4 5H9l-6-7a2 2 0 012-3l3 2",
  spark: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z",
  bond: "M4 19L20 5 M4 14L16 3",
  trash: "M3 6h18 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7",
};
export function Icon({
  name,
  size = 18,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={paths[name] || paths.atom} />
    </svg>
  );
}
export function Logo() {
  return (
    <span className="logo">
      <span className="logo-mark">
        <Icon name="ring" size={25} />
      </span>
      ChemEase<span className="beta">Studio</span>
    </span>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/common/IconButton.tsx`

````tsx
import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
export function IconButton({
  icon,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; label: string }) {
  return (
    <button
      {...props}
      className={`icon-button ${props.className || ""}`}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} />
    </button>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/common/Modal.tsx`

````tsx
import { useEffect, useRef, useId, type ReactNode } from "react";
import { IconButton } from "./IconButton";
import "../dialogs/Dialog.css";
export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const node = ref.current;
    node?.focus();
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab" && node) {
        const items = [
          ...node.querySelectorAll<HTMLElement>(
            'button:not(:disabled),input,select,textarea,[tabindex="0"]',
          ),
        ];
        const first = items[0],
          last = items.at(-1);
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === node)
        ) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", fn, true);
    return () => {
      document.removeEventListener("keydown", fn, true);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        className={`modal ${wide ? "wide" : ""}`}
        tabIndex={-1}
        ref={ref}
      >
        <header className="modal-header">
          <div>
            <span className="eyebrow muted">ChemEase / workspace</span>
            <h2 id={id}>{title}</h2>
          </div>
          <IconButton label="Close dialog" icon="close" onClick={onClose} />
        </header>
        {children}
      </div>
    </div>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/common/Tooltip.tsx`

````tsx
import type { ReactNode } from "react";
export function Tooltip({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) {
  return <span title={text}>{children}</span>;
}
````

## CREATE NEW FILE

FILE: `src/Components/dialogs/Dialog.css`

````css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #17121e60;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  width: 500px;
  max-width: 100%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 24px 90px #0003;
  animation: appear 0.2s ease-out;
}
.modal.wide {
  width: 740px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--border);
}
.modal-header h2 {
  font-size: 21px;
  letter-spacing: -0.6px;
  margin-top: 6px;
}
.dialog-body {
  padding: 24px 28px;
  line-height: 1.7;
}
.dialog-actions {
  padding: 20px 28px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid var(--border);
}
.export-options {
  display: grid;
  gap: 10px;
}
.export-option {
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  text-align: left;
  border-radius: 8px;
  min-height: 68px;
}
.export-option:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.export-option strong {
  display: block;
}
.export-option small {
  color: var(--text-muted);
}
.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 0;
}
.setting-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}
.shortcut-list {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
}
.notice {
  font-size: 12px;
  background: var(--accent-soft);
  padding: 12px;
  border-radius: 6px;
  line-height: 1.6;
  margin-top: 16px;
}
.danger-button {
  background: var(--danger);
  color: white;
  border-radius: 6px;
  padding: 12px 16px;
}
@media (max-width: 600px) {
  .modal-backdrop {
    padding: 12px;
  }
  .modal-header,
  .dialog-body {
    padding: 20px;
  }
  .modal {
    max-height: 94dvh;
  }
}
````

## CREATE NEW FILE

FILE: `src/Components/dialogs/ExportDialog.tsx`

````tsx
import { useState } from "react";
import { Modal } from "../common/Modal";
import { Icon } from "../common/Icon";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { exportMolecule } from "../../engine/export";
export function ExportDialog({ onClose }: { onClose: () => void }) {
  const [busy, setBusy] = useState(false),
    [dark, setDark] = useState(false);
  const m = useMoleculeStore((s) => s.molecule);
  return (
    <Modal title="Take your chemistry with you" onClose={onClose}>
      <div className="dialog-body">
        <div className="export-options">
          {(
            [
              ["png", "PNG image", "High-resolution image · up to 3× scale"],
              ["svg", "SVG vector", "Resolution-independent · editable vector"],
              ["json", "Molecule JSON", "Complete graph · re-open in ChemEase"],
            ] as const
          ).map(([format, title, description]) => (
            <button
              className="export-option"
              disabled={busy || (!m.atoms.length && format !== "json")}
              key={format}
              onClick={async () => {
                setBusy(true);
                try {
                  const u = useUIStore.getState();
                  await exportMolecule(m, format, {
                    dark,
                    showCarbons: u.showCarbons,
                    showHydrogens: u.showHydrogens,
                  });
                  u.notify(`${format.toUpperCase()} exported.`);
                } catch (e) {
                  useUIStore.getState().notify((e as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              <Icon name="download" size={22} />
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </button>
          ))}
        </div>
        <label className="setting-row" style={{ marginTop: 12 }}>
          Dark background for images
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
        </label>
        <p className="muted" style={{ fontSize: 11 }}>
          Only your actual molecular structure is exported. Grid, selection and
          interface controls are excluded.
        </p>
      </div>
    </Modal>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/dialogs/HelpDialog.tsx`

````tsx
import { Modal } from "../common/Modal";
export function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Make yourself at home" onClose={onClose}>
      <div className="dialog-body">
        <div className="shortcut-list">
          {[
            ["Undo", "Ctrl / ⌘ Z"],
            ["Redo", "Ctrl / ⌘ Shift Z"],
            ["Save locally", "Ctrl / ⌘ S"],
            ["New molecule", "Ctrl / ⌘ N"],
            ["Select / Erase / Lasso", "V / E / L"],
            ["Single / Double / Triple bond", "1 / 2 / 3"],
            ["Delete selection", "Delete / Backspace"],
            ["Cancel operation", "Escape"],
            ["Pan canvas", "Space + drag"],
            ["Zoom canvas", "Mouse wheel"],
            ["Select a focused atom / bond", "Enter"],
          ].map(([label, key]) => (
            <div style={{ display: "contents" }} key={label}>
              <span>{label}</span>
              <kbd>{key}</kbd>
            </div>
          ))}
        </div>
        <div className="notice">
          Place atoms, then choose a bond tool and click two atoms. Click a bond
          to change its order. With a bond started, click empty space to extend
          a 64-unit, 30°-snapped chain. Use the Hydrogen tool for explicit H, or
          atom properties to set implicit H (for example, aromatic [nH]).
        </div>
        <p style={{ fontSize: 12, marginTop: 16 }}>
          ChemEase uses a local graph engine for common valence states. SMILES
          is non-canonical. Aromaticity is user-assigned, not perceived; lone
          pairs are annotations. Structures are not evaluated for chemical
          stability, hazards or synthetic feasibility.
        </p>
      </div>
    </Modal>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/dialogs/NewMoleculeDialog.tsx`

````tsx
import { Modal } from "../common/Modal";
import { useMoleculeStore } from "../../store/moleculeStore";
export function NewMoleculeDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="A fresh canvas" onClose={onClose}>
      <div className="dialog-body">
        <p>
          Start a new molecule? Save or export the current structure first if
          you want to keep a permanent copy.
        </p>
        <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
          You can undo this action during the current session.
        </p>
      </div>
      <div className="dialog-actions">
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="primary"
          onClick={() => {
            useMoleculeStore.getState().newMolecule();
            onClose();
          }}
        >
          New molecule
        </button>
      </div>
    </Modal>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/dialogs/SettingsDialog.tsx`

````tsx
import { useState } from "react";
import { Modal } from "../common/Modal";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { readPreference, writePreference } from "../../utils/storage";
export function SettingsDialog({
  onClose,
  onIntro,
}: {
  onClose: () => void;
  onIntro: () => void;
}) {
  const m = useMoleculeStore((s) => s.molecule),
    carbons = useUIStore((s) => s.showCarbons),
    hydrogens = useUIStore((s) => s.showHydrogens),
    grid = useUIStore((s) => s.showGrid);
  const [name, setName] = useState(m.metadata.name),
    [skip, setSkip] = useState(
      readPreference("chemease.skipIntro", "true") === "true",
    );
  return (
    <Modal title="Workspace settings" onClose={onClose}>
      <div className="dialog-body">
        <label className="setting-row">
          Molecule name
          <input
            aria-label="Molecule name"
            value={name}
            maxLength={120}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => useMoleculeStore.getState().rename(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter") useMoleculeStore.getState().rename(name);
            }}
          />
        </label>
        {(
          [
            ["Show carbon labels", carbons, "showCarbons"],
            ["Show implicit hydrogen labels", hydrogens, "showHydrogens"],
            ["Show dotted grid", grid, "showGrid"],
          ] as const
        ).map(([label, checked, key]) => (
          <label className="setting-row" key={key}>
            {label}
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) =>
                useUIStore.getState().set({ [key]: e.target.checked })
              }
            />
          </label>
        ))}
        <label className="setting-row">
          Skip intro on future visits
          <input
            type="checkbox"
            checked={skip}
            onChange={(e) => {
              setSkip(e.target.checked);
              writePreference("chemease.skipIntro", String(e.target.checked));
            }}
          />
        </label>
        <hr />
        <div className="setting-row">
          <span>Saved structure</span>
          <button
            className="secondary"
            onClick={() => {
              const s = useMoleculeStore.getState();
              if (
                fingerprint(s.molecule) !== s.savedFingerprint &&
                !window.confirm(
                  "Restore the last saved structure? You can undo this.",
                )
              )
                return;
              s.restore();
              onClose();
            }}
          >
            Restore local save
          </button>
        </div>
        <button className="secondary" onClick={onIntro}>
          Replay introduction
        </button>
        <p className="notice">
          Save stores one molecule on this browser. Export JSON for a portable
          backup. Private-browsing or blocked storage may not persist across
          visits.
        </p>
      </div>
    </Modal>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/editor/Editor.css`

````css
.editor {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: appear 0.3s ease-out;
}
.editor-body {
  flex: 1;
  display: flex;
  min-height: 0;
  position: relative;
}
.editor-body > .canvas-workspace {
  flex: 1;
}
.toolbar-container,
.info-container {
  display: flex;
  min-height: 0;
}
.mobile-notice {
  display: none;
}
@media (max-width: 700px) {
  .mobile-notice {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 12px;
    border-bottom: 1px solid var(--border);
    font-size: 8px;
    color: var(--text-muted);
    background: var(--surface);
    flex-shrink: 0;
  }
  .mobile-notice button {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    padding: 8px 0;
    color: var(--accent);
  }
  .toolbar-container,
  .info-container {
    display: none;
  }
  .mobile-tools-open .toolbar-container {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    box-shadow: 15px 0 30px #0001;
  }
  .mobile-info-open .info-container {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    box-shadow: -15px 0 30px #0001;
  }
  .info-panel {
    width: min(284px, 85vw);
  }
  .chem-toolbar.expanded {
    width: 210px;
  }
}
````

## CREATE NEW FILE

FILE: `src/Components/editor/Editor.tsx`

````tsx
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { Toolbar } from "../toolbar/Toolbar";
import { Canvas } from "../canvas/Canvas";
import { InfoPanel } from "../sidebar/InfoPanel";
import { StatusBar } from "../statusbar/StatusBar";
import { AnalysisPanel } from "../sidebar/AnalysisPanel";
import { NewMoleculeDialog } from "../dialogs/NewMoleculeDialog";
import { ExportDialog } from "../dialogs/ExportDialog";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { HelpDialog } from "../dialogs/HelpDialog";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { Icon } from "../common/Icon";
import "./Editor.css";
import { Molecule3DDialog } from "../viewer/Molecule3DDialog";
export function Editor({ onIntro }: { onIntro: () => void }) {
  const dialog = useUIStore((s) => s.dialog);
  const [mobilePanel, setMobilePanel] = useState(false),
    [mobileTools, setMobileTools] = useState(false);
  useKeyboardShortcuts();
  const close = useCallback(
    () => useUIStore.getState().set({ dialog: null }),
    [],
  );
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      const s = useMoleculeStore.getState();
      if (fingerprint(s.molecule) !== s.savedFingerprint) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  return (
    <main className="editor">
      <Navbar />
      <div className="mobile-notice">
        <span>Desktop recommended · compact editing mode</span>
        <button onClick={() => setMobileTools(!mobileTools)}>
          <Icon name="atom" size={14} />
          Tools
        </button>
        <button onClick={() => setMobilePanel(!mobilePanel)}>
          <Icon name="info" size={14} />
          Info
        </button>
      </div>
      <div
        className={`editor-body ${mobilePanel ? "mobile-info-open" : ""} ${mobileTools ? "mobile-tools-open" : ""}`}
      >
        <div className="toolbar-container">
          <Toolbar />
        </div>
        <Canvas />
        <div className="info-container">
          <InfoPanel />
        </div>
      </div>
      <StatusBar />
      {dialog === "new" && <NewMoleculeDialog onClose={close} />}{" "}
      {dialog === "export" && <ExportDialog onClose={close} />}{" "}
      {dialog === "analysis" && <AnalysisPanel onClose={close} />}{" "}
      {dialog === "settings" && (
        <SettingsDialog
          onClose={close}
          onIntro={() => {
            close();
            onIntro();
          }}
        />
      )}{" "}
      {dialog === "3d" && <Molecule3DDialog onClose={close} />}
      {dialog === "help" && <HelpDialog onClose={close} />}
    </main>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/intro/Intro.css`

````css
.scroll-intro {
  height: 560svh;
  position: relative;
  background: var(--bg);
  isolation: isolate;
  --intro-faint: color-mix(in srgb, var(--accent) 14%, transparent);
}
.story-stage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 540px;
  overflow: hidden;
  isolation: isolate;
  background: var(--bg);
  transition:
    opacity 0.42s,
    transform 0.42s;
  --story-progress: 0;
  --scene-x: 15%;
  --scene-scale: 1;
  --halo-rotation: 0deg;
}
.is-entering .story-stage {
  opacity: 0;
  transform: scale(1.065);
}
.scene-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 73% 43%,
      color-mix(in srgb, var(--accent) 10%, transparent),
      transparent 55%
    ),
    linear-gradient(135deg, var(--bg), var(--surface));
  z-index: 0;
}
.webgl-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}
.scene-halo {
  position: absolute;
  left: 49%;
  top: 22%;
  width: 44vw;
  height: 42vw;
  max-height: 70vh;
  border: 1px solid var(--intro-faint);
  border-radius: 50%;
  transform: translateX(calc(var(--scene-x) - 12%)) rotate(var(--halo-rotation))
    scaleY(0.52);
  z-index: 1;
  pointer-events: none;
}
.halo-b {
  transform: translateX(calc(var(--scene-x) - 12%))
    rotate(calc(var(--halo-rotation) + 72deg)) scaleY(0.58);
  border-style: dashed;
  opacity: 0.7;
}
.scene-floor {
  position: absolute;
  left: 53%;
  top: 75%;
  width: 35%;
  height: 9%;
  background: radial-gradient(
    ellipse,
    color-mix(in srgb, var(--accent) 15%, transparent),
    transparent 70%
  );
  filter: blur(14px);
  transform: translateX(calc(var(--scene-x) - 10%));
  z-index: 1;
  opacity: calc(1 - var(--story-progress) * 0.8);
}
.story-readability {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--bg) 95%, transparent),
    transparent 47%
  );
  opacity: clamp(0, calc(1 - (var(--story-progress) - 0.44) * 20), 1);
}
.story-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  margin: 0 5vw;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 12;
}
.story-nav .logo {
  font-size: 22px;
}
.story-nav .beta {
  font-size: 8px;
}
.story-nav-right {
  display: flex;
  align-items: center;
  gap: 32px;
}
.intro-build-label {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--text-muted);
}
.story-skip {
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 12px;
  border-left: 1px solid var(--border);
  padding: 14px 0 14px 25px;
}
.scene-topline {
  position: absolute;
  left: 7vw;
  right: 7vw;
  top: 122px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 9px;
  letter-spacing: 1.5px;
}
.scene-topline > span:first-child {
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.4px;
}
.scene-topline i {
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
}
.story-chapter {
  position: absolute;
  z-index: 6;
  top: 29%;
  left: 7vw;
  width: 43%;
  max-width: 660px;
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
}
.chapter-discover {
  opacity: 1;
  pointer-events: auto;
}
.story-eyebrow {
  font-size: 10px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  font-weight: 550;
  color: var(--accent);
  display: block;
  margin-bottom: 27px;
}
.story-chapter h1,
.story-chapter h2 {
  font-size: clamp(52px, 6.3vw, 102px);
  letter-spacing: -0.062em;
  line-height: 1.025;
  font-weight: 450;
}
.story-chapter h2 {
  font-size: clamp(48px, 5.35vw, 85px);
}
.story-chapter em {
  font-style: normal;
  color: var(--accent);
}
.story-chapter > p {
  font-size: 16px;
  line-height: 1.85;
  color: var(--text-muted);
  margin-top: 27px;
}
.story-actions {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-top: 31px;
}
.story-actions .primary {
  min-height: 48px;
  padding: 13px 19px;
  font-size: 12px;
}
.story-text-button {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 12px;
  padding: 15px 0;
}
.story-text-button:hover {
  color: var(--accent);
}
.story-footnote {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 27px;
}
.chapter-draw {
  top: 30%;
  width: 46%;
  max-width: 700px;
}
.chapter-draw h2 {
  font-size: clamp(46px, 5.1vw, 85px);
}
.draw-sequence {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
.draw-sequence > span {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 11px;
}
.draw-sequence b {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 7px;
  color: var(--accent);
  font-weight: 500;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  font-size: 20px;
}
.draw-sequence svg {
  color: var(--accent);
}
.draw-sequence > i {
  height: 1px;
  width: 27px;
  background: var(--border);
}
.scene-microcopy {
  font-size: 8px;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  display: block;
  margin-top: 27px;
}
.chapter-analyze {
  left: auto;
  right: 7vw;
  top: 24%;
  width: 38%;
  max-width: 520px;
}
.chapter-analyze h2 {
  font-size: clamp(46px, 4.65vw, 76px);
}
.chapter-analyze .story-eyebrow {
  margin-bottom: 22px;
}
.chapter-analyze > p {
  margin-top: 19px;
  font-size: 14px;
  line-height: 1.75;
}
.intro-analysis {
  margin-top: 23px;
  border: 1px solid color-mix(in srgb, var(--accent) 19%, var(--border));
  border-radius: 10px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  backdrop-filter: blur(15px);
  box-shadow: 0 16px 55px #3c225908;
  padding: 19px 22px;
  max-width: 420px;
}
.intro-analysis-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
}
.intro-analysis-header > span {
  font-size: 8px;
  letter-spacing: 1.25px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.intro-analysis-header i {
  width: 4px;
  height: 4px;
  background: var(--success);
  border-radius: 50%;
}
.intro-analysis-header svg {
  color: var(--accent);
}
.intro-analysis-primary {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-top: 20px;
  gap: 16px;
}
.intro-analysis-primary > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.intro-analysis-primary small {
  font-size: 10px;
  color: var(--text-muted);
}
.intro-analysis-primary .formula {
  font-size: 33px;
  font-weight: 500;
  color: var(--accent);
}
.intro-analysis-primary strong {
  font-size: 25px;
  font-family: var(--mono);
  letter-spacing: -1px;
  font-weight: 400;
  white-space: nowrap;
}
.intro-analysis-primary strong small {
  font-family: var(--font);
  letter-spacing: 0;
  font-size: 9px;
}
.intro-analysis-stats {
  display: flex;
  gap: 25px;
  border-top: 1px solid var(--border);
  padding-top: 17px;
  margin-top: 18px;
}
.intro-analysis-stats > span {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 9px;
  color: var(--text-muted);
}
.intro-analysis-stats b {
  font-family: var(--mono);
  font-size: 16px;
  font-weight: 400;
  color: var(--text);
}
.intro-analysis-smiles {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 9px;
  padding-top: 16px;
  color: var(--text-muted);
}
.intro-analysis-smiles > span {
  font-size: 8px;
  letter-spacing: 1px;
}
.intro-analysis-smiles code {
  color: var(--text);
  font-size: 11px;
}
.intro-analysis-smiles svg {
  margin-left: auto;
  color: var(--success);
}
.chapter-create {
  left: 50%;
  top: auto;
  bottom: 15%;
  transform: translateX(-50%);
  width: 90%;
  max-width: none;
  text-align: center;
  margin-left: -45%;
}
.chapter-create .story-eyebrow {
  margin-bottom: 18px;
}
.chapter-create h2 {
  font-size: clamp(42px, 4.1vw, 67px);
}
.chapter-create > .primary {
  margin-top: 24px;
  padding: 14px 24px;
  font-size: 12px;
  min-width: 205px;
}
.chapter-create > p {
  margin-top: 14px;
  font-size: 10px;
}
.molecule-identification {
  position: absolute;
  bottom: 19%;
  right: 8%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 5;
  border-left: 1px solid var(--border);
  padding-left: 16px;
  opacity: clamp(0, calc(1 - var(--story-progress) * 4), 1);
  pointer-events: none;
}
.molecule-identification span:first-child {
  font-size: 8px;
  letter-spacing: 1.5px;
  color: var(--text-muted);
}
.molecule-identification strong {
  font-size: 15px;
  font-weight: 450;
}
.molecule-identification span:last-child {
  font-size: 9px;
  color: var(--text-muted);
}
.story-side-index {
  position: absolute;
  right: 2.5vw;
  top: 42%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  font-family: var(--mono);
  font-size: 9px;
  color: var(--text-muted);
  z-index: 5;
}
.story-side-index > span:first-child {
  color: var(--accent);
}
.story-side-index i {
  height: 75px;
  width: 1px;
  background: var(--border);
}
.story-footer {
  position: absolute;
  bottom: 20px;
  left: 5vw;
  right: 5vw;
  height: 73px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid var(--border);
  z-index: 10;
  background: linear-gradient(
    0deg,
    var(--bg),
    color-mix(in srgb, var(--bg) 10%, transparent)
  );
}
.scroll-direction {
  display: flex;
  align-items: center;
  gap: 12px;
}
.scroll-mouse {
  width: 17px;
  height: 26px;
  border: 1px solid var(--text-muted);
  border-radius: 9px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
.scroll-mouse > i {
  width: 2px;
  height: 6px;
  background: var(--accent);
  border-radius: 2px;
  animation: scroll-wheel 1.8s ease-in-out infinite;
}
.scroll-direction > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.scroll-direction strong {
  font-size: 10px;
  font-weight: 500;
}
.scroll-direction > div > span {
  font-size: 8px;
  color: var(--text-muted);
}
.chapter-navigation {
  display: flex;
  align-items: center;
  gap: 28px;
}
.chapter-navigation button {
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
  padding: 20px 0;
  font-size: 10px;
  color: var(--text-muted);
}
.chapter-navigation button > span {
  font-family: var(--mono);
  font-size: 8px;
  opacity: 0.6;
}
.chapter-navigation button > i {
  position: absolute;
  left: 0;
  bottom: 8px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s;
}
.chapter-navigation button[aria-current="step"] {
  color: var(--accent);
}
.chapter-navigation button[aria-current="step"] > i {
  transform: scaleX(1);
}
.chapter-navigation button:hover {
  color: var(--accent);
}
.story-coordinate {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: right;
  color: var(--text-muted);
}
.story-coordinate > span {
  font-size: 7px;
  letter-spacing: 1.5px;
}
.story-coordinate b {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 400;
}
.story-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--border);
  z-index: 20;
}
.story-progress-fill {
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--accent);
}
.scene-fallback {
  position: absolute;
  top: 22%;
  left: 52%;
  width: 40%;
  height: 50%;
  color: var(--accent);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.scene-fallback svg {
  width: 100%;
  height: 100%;
}
.scene-fallback > span {
  font-size: 10px;
  color: var(--text-muted);
}
.no-webgl .webgl-scene {
  display: none;
}
.no-webgl .story-chapter.chapter-analyze {
  background: var(--bg);
  padding: 15px;
  border-radius: 10px;
}
@keyframes scroll-wheel {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}
@media (min-width: 1800px) {
  .story-chapter {
    top: 31%;
    left: 9vw;
  }
  .chapter-analyze {
    left: auto;
    right: 11vw;
    top: 27%;
  }
  .chapter-create {
    left: 50%;
    top: auto;
    bottom: 16%;
  }
  .scene-topline {
    left: 9vw;
    right: 9vw;
  }
  .story-footer {
    bottom: 28px;
    height: 83px;
  }
  .story-chapter > p {
    font-size: 19px;
  }
  .chapter-analyze > p {
    font-size: 16px;
  }
  .intro-analysis {
    max-width: 460px;
    padding: 24px;
  }
  .chapter-create > p {
    font-size: 12px;
  }
}
@media (max-height: 780px) and (min-width: 701px) {
  .story-nav {
    height: 70px;
  }
  .scene-topline {
    top: 94px;
  }
  .story-chapter {
    top: 26%;
  }
  .story-eyebrow {
    margin-bottom: 18px;
  }
  .story-chapter h1 {
    font-size: clamp(54px, 6vw, 84px);
  }
  .story-chapter h2 {
    font-size: clamp(46px, 4.8vw, 70px);
  }
  .story-chapter > p {
    margin-top: 20px;
    font-size: 14px;
  }
  .story-actions {
    margin-top: 23px;
  }
  .story-footnote {
    margin-top: 20px;
  }
  .chapter-analyze {
    top: 21%;
  }
  .chapter-analyze h2 {
    font-size: 52px;
  }
  .chapter-analyze > p {
    font-size: 12px;
    margin-top: 15px;
  }
  .intro-analysis {
    margin-top: 18px;
    padding: 14px 18px;
  }
  .intro-analysis-primary {
    margin-top: 15px;
  }
  .intro-analysis-primary .formula {
    font-size: 28px;
  }
  .intro-analysis-stats {
    padding-top: 12px;
    margin-top: 12px;
  }
  .intro-analysis-smiles {
    padding-top: 12px;
  }
  .chapter-create {
    top: auto;
    bottom: 15%;
  }
  .chapter-create h2 {
    font-size: 44px;
  }
  .chapter-create > p {
    font-size: 10px;
    margin-top: 12px;
  }
  .story-footer {
    bottom: 12px;
    height: 64px;
  }
}
@media (max-width: 1000px) and (min-width: 701px) {
  .intro-build-label {
    display: none;
  }
  .story-chapter {
    width: 49%;
    left: 6vw;
  }
  .story-chapter h1 {
    font-size: 66px;
  }
  .story-chapter h2 {
    font-size: 54px;
  }
  .story-actions {
    gap: 15px;
  }
  .story-text-button {
    font-size: 10px;
  }
  .chapter-analyze {
    left: auto;
    right: 6vw;
    width: 42%;
  }
  .chapter-analyze h2 {
    font-size: 49px;
  }
  .intro-analysis {
    padding: 15px;
  }
  .chapter-create {
    left: 50%;
    width: 90%;
  }
  .chapter-navigation {
    gap: 16px;
  }
  .scroll-direction > div > span {
    display: none;
  }
  .story-coordinate {
    display: none;
  }
}
@media (max-width: 700px) {
  .scroll-intro {
    height: 510svh;
  }
  .story-stage {
    min-height: 600px;
  }
  .story-nav {
    height: 72px;
    margin: 0 24px;
  }
  .story-nav .logo {
    font-size: 19px;
  }
  .story-nav .beta {
    font-size: 7px;
  }
  .story-nav-right {
    gap: 0;
  }
  .intro-build-label {
    display: none;
  }
  .story-skip {
    border: 0;
    padding: 12px 0;
    font-size: 11px;
    gap: 10px;
  }
  .scene-topline {
    top: 95px;
    left: 24px;
    right: 24px;
    font-size: 8px;
    letter-spacing: 0.5px;
  }
  .scene-topline > span:last-child {
    display: none;
  }
  .story-chapter {
    left: 24px;
    top: 18%;
    width: calc(100% - 48px);
    max-width: none;
  }
  .story-eyebrow {
    font-size: 8px;
    letter-spacing: 1.25px;
    margin-bottom: 18px;
  }
  .story-chapter h1 {
    font-size: clamp(45px, 12.4vw, 77px);
    letter-spacing: -0.055em;
  }
  .story-chapter h2 {
    font-size: clamp(41px, 10.6vw, 64px);
  }
  .story-chapter > p {
    font-size: 13px;
    line-height: 1.65;
    margin-top: 16px;
  }
  .story-actions {
    gap: 22px;
    margin-top: 23px;
  }
  .story-actions .primary {
    font-size: 11px;
    min-height: 43px;
    padding: 11px 14px;
    gap: 10px;
  }
  .story-text-button {
    font-size: 10px;
    gap: 8px;
  }
  .story-footnote {
    display: none;
  }
  .chapter-draw {
    top: 20%;
    width: calc(100% - 48px);
  }
  .chapter-draw h2 {
    font-size: 44px;
  }
  .draw-sequence {
    margin-top: 20px;
    gap: 12px;
  }
  .draw-sequence > span {
    font-size: 10px;
    gap: 6px;
  }
  .draw-sequence > i {
    width: 17px;
  }
  .draw-sequence b {
    width: 30px;
    height: 32px;
    font-size: 17px;
  }
  .scene-microcopy {
    font-size: 7px;
    margin-top: 18px;
  }
  .chapter-analyze {
    left: 24px;
    right: auto;
    top: 17%;
    width: calc(100% - 48px);
  }
  .chapter-analyze h2 {
    font-size: 42px;
  }
  .chapter-analyze > p {
    font-size: 12px;
    margin-top: 12px;
  }
  .intro-analysis {
    padding: 12px 16px;
    margin-top: 18px;
    max-width: 370px;
    background: color-mix(in srgb, var(--surface) 94%, transparent);
  }
  .intro-analysis-header > span {
    font-size: 7px;
  }
  .intro-analysis-primary {
    margin-top: 12px;
  }
  .intro-analysis-primary .formula {
    font-size: 28px;
  }
  .intro-analysis-primary strong {
    font-size: 23px;
  }
  .intro-analysis-stats {
    gap: 24px;
    padding-top: 12px;
    margin-top: 12px;
  }
  .intro-analysis-stats > span {
    font-size: 8px;
  }
  .intro-analysis-smiles {
    padding-top: 12px;
  }
  .chapter-create {
    left: 24px;
    margin-left: 0;
    width: calc(100% - 48px);
    top: auto;
    bottom: 17%;
    text-align: center;
  }
  .chapter-create h2 {
    font-size: 37px;
  }
  .chapter-create .story-eyebrow {
    font-size: 7px;
    letter-spacing: 1px;
  }
  .chapter-create > .primary {
    margin-top: 24px;
    min-height: 46px;
  }
  .chapter-create > p {
    font-size: 10px;
  }
  .scene-halo {
    left: 11%;
    top: 46%;
    width: 77vw;
    height: 66vw;
    transform: rotate(var(--halo-rotation)) scaleY(0.58);
  }
  .halo-b {
    transform: rotate(calc(var(--halo-rotation) + 70deg)) scaleY(0.64);
  }
  .scene-floor {
    left: 20%;
    top: 78%;
    width: 65%;
    height: 7%;
  }
  .story-readability {
    background: linear-gradient(180deg, var(--bg) 15%, transparent 60%);
    opacity: 1;
  }
  .molecule-identification {
    display: none;
  }
  .story-side-index {
    right: 14px;
    top: 57%;
    font-size: 7px;
    gap: 10px;
  }
  .story-side-index i {
    height: 44px;
  }
  .story-footer {
    left: 24px;
    right: 24px;
    bottom: 15px;
    height: 75px;
    display: block;
    padding-top: 8px;
    background: color-mix(in srgb, var(--bg) 92%, transparent);
  }
  .scroll-direction {
    justify-content: center;
    margin-bottom: 1px;
    gap: 8px;
  }
  .scroll-mouse {
    display: none;
  }
  .scroll-direction strong {
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
  .scroll-direction > div > span {
    display: none;
  }
  .chapter-navigation {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
  .chapter-navigation button {
    font-size: 9px;
    gap: 6px;
    padding: 14px 0 12px;
    min-height: 44px;
  }
  .chapter-navigation button > span {
    font-size: 7px;
  }
  .chapter-navigation button > i {
    bottom: 4px;
  }
  .story-coordinate {
    display: none;
  }
  .scene-fallback {
    top: 43%;
    left: 10%;
    width: 80%;
    height: 38%;
  }
  .scene-fallback > span {
    font-size: 9px;
  }
  .no-webgl .chapter-analyze {
    padding: 0;
    background: transparent;
  }
  .scene-wash {
    background:
      radial-gradient(
        ellipse at 50% 64%,
        color-mix(in srgb, var(--accent) 10%, transparent),
        transparent 52%
      ),
      var(--bg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-intro {
    height: 460svh;
  }
  .story-chapter {
    will-change: auto;
  }
  .scroll-mouse > i {
    animation: none;
  }
  .story-stage {
    transition: none;
  }
  .story-readability {
    opacity: 0.85;
  }
  .scene-halo {
    transform: scaleY(0.6);
  }
}

.story-nav,
.story-footer {
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  backdrop-filter: blur(12px);
}

.scroll-intro[data-active-chapter="2"] .scene-fallback {
  left: 6%;
  top: 24%;
  width: 40%;
  height: 48%;
}
.scroll-intro[data-active-chapter="3"] .scene-fallback {
  left: 35%;
  top: 17%;
  width: 30%;
  height: 34%;
}
@media (max-width: 700px) {
  .story-readability {
    opacity: clamp(0, calc(1 - (var(--story-progress) - 0.8) * 8), 1);
  }
  .scroll-intro[data-active-chapter="2"] .scene-fallback {
    left: 10%;
    top: 61%;
    width: 80%;
    height: 23%;
  }
  .scroll-intro[data-active-chapter="3"] .scene-fallback {
    left: 10%;
    top: 20%;
    width: 80%;
    height: 29%;
  }
}
````

## CREATE NEW FILE

FILE: `src/Components/intro/Intro.tsx`

````tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo, Icon } from "../common/Icon";
import { Formula } from "../common/Formula";
import { MoleculeScene } from "./MoleculeScene";
import { chapterOpacity, clamp, sceneFrame } from "./sceneMath";
import { template } from "../../engine/templates";
import { analyzeMolecule } from "../../engine/analysis";
import { useUIStore } from "../../store/chemUIStore";
import "./Intro.css";

const chapters = ["Discover", "Draw", "Analyze", "Create"];
const stops = [0, 0.36, 0.65, 1];
export function Intro({ onEnter }: { onEnter: () => void }) {
  const root = useRef<HTMLElement>(null),
    canvas = useRef<HTMLCanvasElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0),
    [fallback, setFallback] = useState(false),
    [leaving, setLeaving] = useState(false),
    [contextEpoch, setContextEpoch] = useState(0);
  const theme = useUIStore((s) => s.theme);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysis = useMemo(() => analyzeMolecule(template("benzene")), []);
  useEffect(
    () => () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
    },
    [],
  );

  useEffect(() => {
    const el = root.current!,
      surface = canvas.current!,
      stageEl = stage.current!;
    let renderer: MoleculeScene | null = null,
      alive = true,
      frameId = 0,
      dirty = true,
      previousTime = 0,
      current = 0,
      target = 0;
    let initializationReported = false;
    let lost = false,
      lastChapter = -1,
      pointer = { x: 0, y: 0 },
      pointerTarget = { x: 0, y: 0 };
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    try {
      renderer = new MoleculeScene(surface);
    } catch {
      surface.dataset.renderer = "fallback";
    }
    const cards = [...stageEl.querySelectorAll<HTMLElement>("[data-chapter]")];
    const progressLine = stageEl.querySelector<HTMLElement>(
      ".story-progress-fill",
    );
    const coordinate = stageEl.querySelector<HTMLElement>(".scene-coordinate");
    const setTarget = () => {
      const rect = el.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      dirty = true;
    };
    const resize = () => {
      renderer?.resize();
      setTarget();
      dirty = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stageEl);
    resize();
    const motionChange = () => {
      reduced = motionQuery.matches;
      el.dataset.reducedMotion = String(reduced);
      dirty = true;
    };
    motionChange();
    motionQuery.addEventListener("change", motionChange);
    const pointerMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      pointerTarget = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      dirty = true;
    };
    const pointerLeave = () => {
      pointerTarget = { x: 0, y: 0 };
      dirty = true;
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      surface.dataset.renderer = "fallback";
      setFallback(true);
    };
    const onRestored = () => setContextEpoch((value) => value + 1);
    const visibility = () => {
      dirty = true;
      previousTime = 0;
    };
    window.addEventListener("scroll", setTarget, { passive: true });
    window.addEventListener("resize", resize);
    stageEl.addEventListener("pointermove", pointerMove, { passive: true });
    stageEl.addEventListener("pointerleave", pointerLeave);
    surface.addEventListener("webglcontextlost", onLost);
    surface.addEventListener("webglcontextrestored", onRestored);
    document.addEventListener("visibilitychange", visibility);

    const render = (time: number) => {
      if (!alive) return;
      frameId = requestAnimationFrame(render);
      if (document.hidden) return;
      const dt = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      const damping = 1 - Math.exp(-dt / 70);
      if (
        !dirty &&
        Math.abs(target - current) < 0.00002 &&
        Math.abs(pointerTarget.x - pointer.x) < 0.001 &&
        Math.abs(pointerTarget.y - pointer.y) < 0.001
      )
        return;
      current = reduced ? target : current + (target - current) * damping;
      if (Math.abs(target - current) < 0.00002) current = target;
      pointer = reduced
        ? { x: 0, y: 0 }
        : {
            x: pointer.x + (pointerTarget.x - pointer.x) * damping,
            y: pointer.y + (pointerTarget.y - pointer.y) * damping,
          };
      if (!initializationReported) {
        setFallback(!renderer);
        initializationReported = true;
      }
      const scene = sceneFrame(current, window.innerWidth < 700, reduced);
      if (!lost) renderer?.render(scene, pointer, theme === "dark");
      stageEl.dataset.progress = current.toFixed(4);
      stageEl.style.setProperty("--story-progress", String(current));
      stageEl.style.setProperty("--scene-x", `${scene.position[0] * 7}%`);
      stageEl.style.setProperty("--scene-scale", String(scene.zoom));
      stageEl.style.setProperty("--halo-rotation", `${current * 140}deg`);
      const index =
        current < 0.235 ? 0 : current < 0.5 ? 1 : current < 0.82 ? 2 : 3;
      if (index !== lastChapter) {
        lastChapter = index;
        setChapter(index);
      }
      cards.forEach((card, i) => {
        const opacity = chapterOpacity(current, i);
        card.style.opacity = String(opacity);
        card.style.transform = reduced
          ? "none"
          : `translate3d(0,${(1 - opacity) * 22}px,0)`;
        card.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
        card.inert = opacity < 0.7;
        card.setAttribute("aria-hidden", String(opacity < 0.7));
      });
      if (progressLine) progressLine.style.transform = `scaleX(${current})`;
      if (coordinate)
        coordinate.textContent = `${String(Math.round(current * 100)).padStart(3, "0")} / 100`;
      dirty = false;
    };
    frameId = requestAnimationFrame(render);
    return () => {
      alive = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer?.dispose();
      window.removeEventListener("scroll", setTarget);
      window.removeEventListener("resize", resize);
      stageEl.removeEventListener("pointermove", pointerMove);
      stageEl.removeEventListener("pointerleave", pointerLeave);
      surface.removeEventListener("webglcontextlost", onLost);
      surface.removeEventListener("webglcontextrestored", onRestored);
      document.removeEventListener("visibilitychange", visibility);
      motionQuery.removeEventListener("change", motionChange);
    };
  }, [theme, contextEpoch]);

  const go = (index: number) => {
    const el = root.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: start + stops[index] * (el.offsetHeight - window.innerHeight),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    enterTimer.current = setTimeout(
      onEnter,
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420,
    );
  };

  return (
    <main
      className={`scroll-intro ${leaving ? "is-entering" : ""} ${fallback ? "no-webgl" : ""}`}
      ref={root}
      data-active-chapter={chapter}
      aria-label="ChemEase interactive introduction"
    >
      <div className="story-stage" ref={stage}>
        <div className="scene-wash" />
        <div className="scene-halo halo-a" />
        <div className="scene-halo halo-b" />
        <div className="scene-floor" />
        <canvas
          className="webgl-scene"
          ref={canvas}
          role="img"
          aria-label="Scroll-controlled three-dimensional benzene molecule. Carbon and hydrogen spheres connected by bonds."
        />
        {fallback && (
          <div className="scene-fallback">
            <svg
              viewBox="0 0 400 400"
              role="img"
              aria-label="Benzene structure"
            >
              <g stroke="currentColor" fill="none" strokeWidth="3">
                <polygon points="300,200 250,286 150,286 100,200 150,114 250,114" />
                <circle cx="200" cy="200" r="65" strokeDasharray="7 6" />
              </g>
            </svg>
            <span>Reduced graphics · editor fully available</span>
          </div>
        )}
        <div className="story-readability" />
        <header className="story-nav">
          <Logo />
          <div className="story-nav-right">
            <span className="intro-build-label">THE MOLECULAR WORKSPACE</span>
            <button className="story-skip" onClick={enter}>
              Skip intro <Icon name="arrow" size={15} />
            </button>
          </div>
        </header>
        <div className="scene-topline">
          <span>
            <i /> A closer look at possibility.
          </span>
          <span>AN INTERACTIVE MOLECULAR STORY</span>
        </div>

        <section className="story-chapter chapter-discover" data-chapter="0">
          <span className="story-eyebrow">01 — A new perspective</span>
          <h1>
            Chemistry,
            <br />
            <em>Reimagined.</em>
          </h1>
          <p>
            Big discoveries begin
            <br />
            with the smallest connections.
          </p>
          <div className="story-actions">
            <button className="primary" onClick={enter}>
              Start Creating <Icon name="arrow" size={17} />
            </button>
            <button className="story-text-button" onClick={() => go(1)}>
              Explore the story <span>↘</span>
            </button>
          </div>
          <div className="story-footnote">
            Your browser. Your ideas. Your next discovery.
          </div>
        </section>

        <section
          className="story-chapter chapter-draw"
          data-chapter="1"
          aria-hidden="true"
        >
          <span className="story-eyebrow">02 — Find your building blocks</span>
          <h2>
            Start small.
            <br />
            <em>Connect anything.</em>
          </h2>
          <p>
            An atom becomes a bond.
            <br />A bond becomes a new possibility.
          </p>
          <div className="draw-sequence">
            <span>
              <b>C</b> Place
            </span>
            <i />
            <span>
              <Icon name="bond" size={20} />
              Connect
            </span>
            <i />
            <span>
              <Icon name="ring" size={21} />
              Build
            </span>
          </div>
          <span className="scene-microcopy">
            KEEP SCROLLING TO BRING IT TOGETHER
          </span>
        </section>

        <section
          className="story-chapter chapter-analyze"
          data-chapter="2"
          aria-hidden="true"
        >
          <span className="story-eyebrow">03 — See beneath the structure</span>
          <h2>
            More than
            <br />
            <em>meets the eye.</em>
          </h2>
          <p>
            Every connection tells a story.
            <br />
            Understand yours, as you draw.
          </p>
          <div className="intro-analysis">
            <div className="intro-analysis-header">
              <span>
                <i /> GRAPH-DERIVED ANALYSIS
              </span>
              <Icon name="flask" size={17} />
            </div>
            <div className="intro-analysis-primary">
              <div>
                <small>Molecular formula</small>
                <Formula value={analysis.formula} />
              </div>
              <div>
                <small>Molecular weight</small>
                <strong>
                  {analysis.weight?.toFixed(2)} <small>g/mol</small>
                </strong>
              </div>
            </div>
            <div className="intro-analysis-stats">
              <span>
                <b>{analysis.atoms}</b>drawn atoms
              </span>
              <span>
                <b>{analysis.bonds}</b>bonds
              </span>
              <span>
                <b>{analysis.rings}</b>ring
              </span>
            </div>
            <div className="intro-analysis-smiles">
              <span>SMILES</span>
              <code>{analysis.smiles}</code>
              <Icon name="check" size={14} />
            </div>
          </div>
        </section>

        <section
          className="story-chapter chapter-create"
          data-chapter="3"
          aria-hidden="true"
        >
          <span className="story-eyebrow">
            04 — From possibility to your canvas
          </span>
          <h2>
            Your next discovery.
            <br />
            <em>One bond away.</em>
          </h2>
          <button className="primary" onClick={enter}>
            Open ChemEase <Icon name="arrow" size={18} />
          </button>
          <p>No account. No installation. Just chemistry.</p>
        </section>

        <div className="molecule-identification">
          <span>01 / SPECIMEN</span>
          <strong>Benzene</strong>
          <span>C₆H₆ · illustrative geometry</span>
        </div>
        <div className="story-side-index" aria-hidden="true">
          <span>{String(chapter + 1).padStart(2, "0")}</span>
          <i />
          <span>04</span>
        </div>
        <footer className="story-footer">
          <div className="scroll-direction">
            <span className="scroll-mouse">
              <i />
            </span>
            <div>
              <strong>
                {chapter === 3 ? "Your canvas is ready" : "Scroll to discover"}
              </strong>
              <span>
                {chapter === 3
                  ? "Keep your curiosity moving."
                  : "You control the perspective."}
              </span>
            </div>
          </div>
          <nav
            className="chapter-navigation"
            aria-label="Introduction chapters"
          >
            {chapters.map((name, index) => (
              <button
                key={name}
                aria-label={`Go to ${name} chapter`}
                aria-current={chapter === index ? "step" : undefined}
                onClick={() => go(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {name}
                <i />
              </button>
            ))}
          </nav>
          <div className="story-coordinate">
            <span>SCROLL PROGRESS</span>
            <b className="scene-coordinate">000 / 100</b>
          </div>
        </footer>
        <div className="story-progress-track">
          <div className="story-progress-fill" />
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          Chapter {chapter + 1}: {chapters[chapter]}
        </span>
      </div>
    </main>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/intro/MoleculeScene.ts`

````typescript
import {
  add,
  cross,
  lookAt,
  mix,
  normalize,
  perspective,
  rotate,
  scale,
  sub,
  type SceneFrame,
  type Vec3,
} from "./sceneMath";

type Mesh = { buffer: WebGLBuffer; vertices: number };
type IntroAtom = { point: Vec3; scatter: Vec3; element: "C" | "H" };
const vertexShader = `
attribute vec3 a_position;
attribute vec3 a_normal;
uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
uniform mat3 u_normal;
varying vec3 v_normal;
varying vec3 v_position;
void main(){
 vec4 world = u_model * vec4(a_position, 1.0);
 v_position = world.xyz;
 v_normal = normalize(u_normal * a_normal);
 gl_Position = u_projection * u_view * world;
}`;
const fragmentShader = `
precision highp float;
varying vec3 v_normal;
varying vec3 v_position;
uniform vec3 u_color;
uniform vec3 u_camera;
uniform float u_alpha;
uniform float u_shine;
void main(){
 vec3 N = normalize(v_normal);
 vec3 V = normalize(u_camera - v_position);
 vec3 key = normalize(vec3(-3.0, 5.0, 6.0));
 vec3 fill = normalize(vec3(4.0, 1.0, -3.0));
 float diffuse = max(dot(N, key), 0.0);
 float bounce = max(dot(N, fill), 0.0);
 float specular = pow(max(dot(N, normalize(key + V)), 0.0), u_shine);
 float rim = pow(1.0 - max(dot(N,V),0.0), 3.0);
 vec3 color = u_color * (0.43 + 0.53 * diffuse + 0.19 * bounce);
 color += vec3(1.0, 0.98, 0.95) * specular * 0.56;
 color += vec3(0.45, 0.31, 0.62) * rim * 0.12;
 gl_FragColor = vec4(color, u_alpha);
}`;

function sphereGeometry(columns = 36, rows = 24) {
  const vertices: number[] = [];
  const point = (u: number, v: number) => [
    Math.sin(v * Math.PI) * Math.cos(u * Math.PI * 2),
    Math.cos(v * Math.PI),
    Math.sin(v * Math.PI) * Math.sin(u * Math.PI * 2),
  ];
  const emit = (p: number[]) => vertices.push(...p, ...p);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < columns; x++) {
      const a = point(x / columns, y / rows),
        b = point((x + 1) / columns, y / rows),
        c = point(x / columns, (y + 1) / rows),
        d = point((x + 1) / columns, (y + 1) / rows);
      [a, c, b, b, c, d].forEach(emit);
    }
  return new Float32Array(vertices);
}
function cylinderGeometry(segments = 24) {
  const vertices: number[] = [];
  const emit = (t: number, y: number) => {
    const x = Math.cos(t),
      z = Math.sin(t);
    vertices.push(x, y, z, x, 0, z);
  };
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2,
      b = ((i + 1) / segments) * Math.PI * 2;
    emit(a, -0.5);
    emit(b, -0.5);
    emit(a, 0.5);
    emit(b, -0.5);
    emit(b, 0.5);
    emit(a, 0.5);
  }
  return new Float32Array(vertices);
}
function makeAtoms(): IntroAtom[] {
  const atoms: IntroAtom[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    atoms.push({
      point: [1.42 * Math.cos(angle), 1.42 * Math.sin(angle), 0],
      scatter: [
        Math.cos(angle + 0.4) * 1.25,
        Math.sin(angle + 0.2) * 1.1,
        Math.sin(i * 2.1) * 1.7,
      ],
      element: "C",
    });
  }
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    atoms.push({
      point: [2.46 * Math.cos(angle), 2.46 * Math.sin(angle), 0],
      scatter: [
        Math.cos(angle - 0.2) * 1.5,
        Math.sin(angle - 0.5) * 1.6,
        Math.cos(i * 1.7) * 2.1,
      ],
      element: "H",
    });
  }
  return atoms;
}

/** Real, depth-tested WebGL meshes. The illustrative geometry is not a conformer. */
export class MoleculeScene {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private sphere: Mesh;
  private cylinder: Mesh;
  private positionLocation: number;
  private normalLocation: number;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private atoms = makeAtoms();
  private edges = [
    ...Array.from({ length: 6 }, (_, i) => [i, (i + 1) % 6]),
    ...Array.from({ length: 6 }, (_, i) => [i, i + 6]),
  ];
  private width = 1;
  private height = 1;

  private canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
    if (!gl) throw new Error("WebGL is unavailable.");
    this.gl = gl;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to allocate shader.");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(error || "Shader compilation failed.");
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexShader),
      fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!program) throw new Error("Unable to allocate WebGL program.");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      throw new Error("WebGL program linking failed.");
    }
    this.program = program;
    this.positionLocation = gl.getAttribLocation(program, "a_position");
    this.normalLocation = gl.getAttribLocation(program, "a_normal");
    for (const name of [
      "model",
      "normal",
      "view",
      "projection",
      "color",
      "camera",
      "alpha",
      "shine",
    ])
      this.uniforms[name] = gl.getUniformLocation(program, `u_${name}`);
    this.sphere = this.mesh(sphereGeometry());
    this.cylinder = this.mesh(cylinderGeometry());
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  }
  private mesh(data: Float32Array): Mesh {
    const buffer = this.gl.createBuffer();
    if (!buffer) throw new Error("Unable to allocate mesh.");
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    return { buffer, vertices: data.length / 6 };
  }
  resize() {
    const { width, height } = this.canvas.getBoundingClientRect();
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      width < 700 ? 1.5 : 1.75,
    );
    this.width = Math.max(width, 1);
    this.height = Math.max(height, 1);
    const w = Math.round(this.width * ratio),
      h = Math.round(this.height * ratio);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }
  private drawMesh(
    mesh: Mesh,
    p: Vec3,
    x: Vec3,
    y: Vec3,
    z: Vec3,
    color: Vec3,
    alpha = 1,
    shine = 52,
  ) {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(this.normalLocation);
    gl.vertexAttribPointer(this.normalLocation, 3, gl.FLOAT, false, 24, 12);
    gl.uniformMatrix4fv(
      this.uniforms.model,
      false,
      new Float32Array([
        x[0],
        x[1],
        x[2],
        0,
        y[0],
        y[1],
        y[2],
        0,
        z[0],
        z[1],
        z[2],
        0,
        p[0],
        p[1],
        p[2],
        1,
      ]),
    );
    gl.uniformMatrix3fv(
      this.uniforms.normal,
      false,
      new Float32Array([...normalize(x), ...normalize(y), ...normalize(z)]),
    );
    gl.uniform3fv(this.uniforms.color, color);
    gl.uniform1f(this.uniforms.alpha, alpha);
    gl.uniform1f(this.uniforms.shine, shine);
    gl.drawArrays(gl.TRIANGLES, 0, mesh.vertices);
  }
  private bond(a: Vec3, b: Vec3, radius: number, color: Vec3, opacity = 1) {
    const direction = sub(b, a),
      length = Math.hypot(...direction);
    if (length < 0.01) return;
    const y = normalize(direction),
      x = normalize(cross(Math.abs(y[1]) > 0.95 ? [1, 0, 0] : [0, 1, 0], y)),
      z = cross(x, y);
    this.drawMesh(
      this.cylinder,
      scale(add(a, b), 0.5),
      scale(x, radius),
      scale(y, length),
      scale(z, radius),
      color,
      opacity,
      70,
    );
  }
  render(frame: SceneFrame, pointer: { x: number; y: number }, dark: boolean) {
    const gl = this.gl;
    if (gl.isContextLost()) return;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);
    const camera: Vec3 = [
      frame.camera[0] + pointer.x * 0.12,
      frame.camera[1] + pointer.y * 0.08,
      frame.camera[2],
    ];
    gl.uniformMatrix4fv(
      this.uniforms.projection,
      false,
      perspective((38 * Math.PI) / 180, this.width / this.height),
    );
    gl.uniformMatrix4fv(
      this.uniforms.view,
      false,
      lookAt(camera, frame.target),
    );
    gl.uniform3fv(this.uniforms.camera, camera);
    const rotation: Vec3 = [
      frame.rotation[0] + pointer.y * 0.07,
      frame.rotation[1] + pointer.x * 0.1,
      frame.rotation[2],
    ];
    const positions = this.atoms.map((a) =>
      add(
        frame.position,
        scale(
          rotate(add(a.point, scale(a.scatter, frame.spread)), rotation),
          frame.zoom,
        ),
      ),
    );
    const radii = this.atoms.map(
      (a) => (a.element === "C" ? 0.38 : 0.21) * frame.radius * frame.zoom,
    );
    // A few distant spheres give perspective during the disassembly chapter, not chemical atoms.
    if (frame.spread > 0.15) {
      gl.depthMask(false);
      for (let i = 0; i < 12; i++) {
        const p: Vec3 = [
          Math.sin(i * 2.399) * 7,
          Math.cos(i * 2.1) * 4,
          -5 - (i % 3),
        ];
        const r = 0.017 + (i % 3) * 0.005;
        this.drawMesh(
          this.sphere,
          p,
          [r, 0, 0],
          [0, r, 0],
          [0, 0, r],
          dark ? [0.65, 0.52, 0.78] : [0.6, 0.49, 0.7],
          Math.min(0.5, frame.spread * 0.3),
        );
      }
      gl.depthMask(true);
    }
    for (const [a, b] of this.edges) {
      const direction = normalize(sub(positions[b], positions[a]));
      const start = add(positions[a], scale(direction, radii[a] * 0.8)),
        end = add(positions[b], scale(direction, -radii[b] * 0.8));
      if (frame.bonds > 0.01)
        this.bond(
          start,
          end,
          0.075 * frame.zoom * Math.max(0.18, frame.bonds),
          dark ? [0.68, 0.63, 0.76] : [0.76, 0.72, 0.81],
          frame.bonds,
        );
    }
    // Real sphere meshes and depth testing, rather than CSS circles or 2D shaded discs.
    for (let i = 0; i < positions.length; i++) {
      const atom = this.atoms[i],
        r = radii[i];
      const c: Vec3 =
        atom.element === "C"
          ? dark
            ? [0.77, 0.62, 0.92]
            : [0.69, 0.52, 0.83]
          : dark
            ? [0.91, 0.91, 0.95]
            : [0.99, 0.98, 0.95];
      this.drawMesh(
        this.sphere,
        positions[i],
        [r, 0, 0],
        [0, r, 0],
        [0, 0, r],
        c,
        1,
        atom.element === "C" ? 50 : 72,
      );
    }
    // An aromatic inner circle emerges as the molecular structure rotates toward 2D.
    const guide = Math.max(0, (frame.at - 0.88) / 0.12);
    if (guide > 0.01) {
      for (let i = 0; i < 32; i++) {
        const a = add(
          frame.position,
          scale(
            rotate(
              [Math.cos((i * Math.PI) / 16), Math.sin((i * Math.PI) / 16), 0],
              rotation,
            ),
            frame.zoom * 0.92,
          ),
        );
        const b = add(
          frame.position,
          scale(
            rotate(
              [
                Math.cos(((i + 1) * Math.PI) / 16),
                Math.sin(((i + 1) * Math.PI) / 16),
                0,
              ],
              rotation,
            ),
            frame.zoom * 0.92,
          ),
        );
        this.bond(
          a,
          b,
          mix(0.002, 0.016, guide),
          dark ? [0.65, 0.53, 0.8] : [0.5, 0.37, 0.68],
          guide,
        );
      }
    }
    this.canvas.dataset.renderer = "webgl";
    this.canvas.dataset.progress = frame.at.toFixed(4);
    this.canvas.dataset.camera = camera.map((n) => n.toFixed(3)).join(",");
    this.canvas.dataset.spread = frame.spread.toFixed(3);
  }
  dispose() {
    this.gl.deleteBuffer(this.sphere.buffer);
    this.gl.deleteBuffer(this.cylinder.buffer);
    this.gl.deleteProgram(this.program);
  }
}
````

## CREATE NEW FILE

FILE: `src/Components/intro/sceneMath.ts`

````typescript
export type Vec3 = [number, number, number];
export const clamp = (x: number, low = 0, high = 1) =>
  Math.min(high, Math.max(low, x));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};
export const mix3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  mix(a[0], b[0], t),
  mix(a[1], b[1], t),
  mix(a[2], b[2], t),
];
export const add = (a: Vec3, b: Vec3): Vec3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
export const sub = (a: Vec3, b: Vec3): Vec3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
export const scale = (a: Vec3, n: number): Vec3 => [
  a[0] * n,
  a[1] * n,
  a[2] * n,
];
export const dot = (a: Vec3, b: Vec3) =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const normalize = (a: Vec3): Vec3 =>
  scale(a, 1 / (Math.hypot(...a) || 1));
export function rotate(p: Vec3, rotation: Vec3): Vec3 {
  const [rx, ry, rz] = rotation;
  const x = p[0],
    y = p[1] * Math.cos(rx) - p[2] * Math.sin(rx),
    z = p[1] * Math.sin(rx) + p[2] * Math.cos(rx);
  const xx = x * Math.cos(ry) + z * Math.sin(ry),
    zz = -x * Math.sin(ry) + z * Math.cos(ry);
  return [
    xx * Math.cos(rz) - y * Math.sin(rz),
    xx * Math.sin(rz) + y * Math.cos(rz),
    zz,
  ];
}
export function perspective(
  fov: number,
  aspect: number,
  near = 0.1,
  far = 100,
) {
  const f = 1 / Math.tan(fov / 2),
    nf = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}
export function lookAt(eye: Vec3, target: Vec3) {
  const z = normalize(sub(eye, target)),
    x = normalize(cross([0, 1, 0], z)),
    y = cross(z, x);
  return new Float32Array([
    x[0],
    y[0],
    z[0],
    0,
    x[1],
    y[1],
    z[1],
    0,
    x[2],
    y[2],
    z[2],
    0,
    -dot(x, eye),
    -dot(y, eye),
    -dot(z, eye),
    1,
  ]);
}
export interface SceneFrame {
  at: number;
  position: Vec3;
  rotation: Vec3;
  camera: Vec3;
  target: Vec3;
  spread: number;
  bonds: number;
  radius: number;
  zoom: number;
}
const frames: SceneFrame[] = [
  {
    at: 0,
    position: [2.15, -0.05, 0],
    rotation: [0.45, -0.65, 0.3],
    camera: [0, 0, 10.2],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 1,
  },
  {
    at: 0.16,
    position: [2.05, -0.05, 0],
    rotation: [0.75, 0.3, 0.5],
    camera: [0.45, 0.4, 9.1],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 1.05,
  },
  {
    at: 0.32,
    position: [1.65, -0.1, 0],
    rotation: [1.0, 1.6, -0.4],
    camera: [-0.3, 0.5, 7.5],
    target: [0, 0, 0],
    spread: 2.1,
    bonds: 0,
    radius: 1.15,
    zoom: 0.95,
  },
  {
    at: 0.45,
    position: [1.95, -0.1, 0],
    rotation: [0.25, 3.2, 0.2],
    camera: [0.3, -0.25, 9.2],
    target: [0, 0, 0],
    spread: 0.25,
    bonds: 0.9,
    radius: 1,
    zoom: 1,
  },
  {
    at: 0.62,
    position: [-2.05, -0.02, 0],
    rotation: [0.1, 5.9, -0.25],
    camera: [-0.35, 0.2, 10.5],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 0.98,
  },
  {
    at: 0.78,
    position: [-1.8, 0.1, 0],
    rotation: [0.65, 6.5, 0.1],
    camera: [0.25, -0.2, 9.7],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 0.8,
    zoom: 1,
  },
  {
    at: 1,
    position: [0, 1.1, 0],
    rotation: [0, Math.PI * 2, 0],
    camera: [0, 0, 10.5],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 0.44,
    zoom: 0.6,
  },
];
export function sceneFrame(
  progress: number,
  mobile = false,
  reduced = false,
): SceneFrame {
  const p = clamp(progress);
  let i = 0;
  while (i < frames.length - 2 && p > frames[i + 1].at) i++;
  const a = frames[i],
    b = frames[i + 1],
    t = smooth((p - a.at) / (b.at - a.at));
  const out: SceneFrame = {
    at: p,
    position: mix3(a.position, b.position, t),
    rotation: mix3(a.rotation, b.rotation, t),
    camera: mix3(a.camera, b.camera, t),
    target: mix3(a.target, b.target, t),
    spread: mix(a.spread, b.spread, t),
    bonds: mix(a.bonds, b.bonds, t),
    radius: mix(a.radius, b.radius, t),
    zoom: mix(a.zoom, b.zoom, t),
  };
  if (mobile) {
    const analysis =
      smooth((p - 0.46) / 0.07) * (1 - smooth((p - 0.78) / 0.07));
    const final = smooth((p - 0.8) / 0.11);
    out.position = [
      out.position[0] * 0.09,
      mix(mix(-1.65, -2, analysis), 1.5, final),
      0,
    ];
    out.camera = [
      out.camera[0] * 0.35,
      out.camera[1] * 0.35,
      out.camera[2] + 3,
    ];
    out.zoom *= 0.72 * mix(1, 0.58, analysis);
    out.spread *= 0.35;
  }
  if (reduced) {
    out.camera = [0, 0, mobile ? 13 : 10.5];
    out.rotation = [0.12, 0.18, 0];
    out.spread = 0;
    out.bonds = 1;
    out.radius = 1;
    out.zoom = mobile
      ? p < 0.5
        ? 0.7
        : p < 0.82
          ? 0.42
          : 0.43
      : p < 0.82
        ? 0.98
        : 0.6;
    out.position = mobile
      ? [0, p < 0.5 ? -1.65 : p < 0.82 ? -2 : 1.5, 0]
      : p < 0.5
        ? [2.15, 0, 0]
        : p < 0.82
          ? [-2.05, 0, 0]
          : [0, 1.1, 0];
  }
  return out;
}
export function chapterOpacity(p: number, chapter: number) {
  const ranges = [
    [0, 0.225],
    [0.245, 0.485],
    [0.515, 0.805],
    [0.835, 1],
  ];
  const [start, end] = ranges[chapter];
  return (
    (chapter === 0 ? 1 : smooth((p - start) / 0.035)) *
    (chapter === 3 ? 1 : 1 - smooth((p - (end - 0.04)) / 0.04))
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/navbar/Navbar.css`

````css
.navbar {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0 18px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.brand-button {
  padding: 6px 12px 6px 0;
  margin-right: 10px;
}
.navbar .logo {
  font-size: 19px;
}
.navbar .beta {
  font-size: 7px;
}
.nav-divider {
  height: 22px;
  width: 1px;
  background: var(--border);
  margin: 0 9px;
  flex-shrink: 0;
}
.nav-tools,
.nav-files {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-tool {
  height: 34px;
  border-radius: 5px;
  padding: 0 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  white-space: nowrap;
}
.nav-tool:hover {
  background: var(--bg);
}
.nav-spacer {
  flex: 1;
  min-width: 5px;
}
.export-button {
  border: 1px solid var(--border);
  margin-left: 4px;
  padding: 0 11px;
}
.local-status {
  font-size: 9px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}
.local-status i {
  width: 4px;
  height: 4px;
  background: var(--success);
  border-radius: 50%;
}
.unsaved-dot {
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}
@media (max-width: 1280px) {
  .navbar {
    padding: 0 12px;
  }
  .nav-divider {
    margin: 0 6px;
  }
  .nav-tool {
    padding: 0 7px;
  }
  .local-status {
    display: none;
  }
  .brand-button {
    margin-right: 0;
  }
}
@media (max-width: 1080px) {
  .nav-tools .nav-tool span {
    display: none;
  }
  .navbar .beta {
    display: none;
  }
  .nav-divider {
    margin: 0 5px;
  }
  .nav-tool {
    padding: 0 7px;
  }
}
@media (max-width: 700px) {
  .navbar {
    height: 56px;
    padding: 0 10px;
    gap: 2px;
  }
  .navbar .logo {
    font-size: 15px;
  }
  .navbar .logo svg {
    width: 20px;
  }
  .navbar .brand-button {
    margin-right: auto;
    padding-right: 5px;
  }
  .nav-tools,
  .nav-divider,
  .nav-files .nav-tool span,
  .navbar .local-status {
    display: none;
  }
  .nav-files {
    gap: 0;
  }
  .nav-tool,
  .navbar .icon-button {
    width: 29px;
    height: 36px;
    padding: 0;
  }
  .navbar .icon-button[aria-label="Help and keyboard shortcuts"] {
    display: none;
  }
  .navbar .export-button {
    border: 0;
    margin: 0;
  }
  .nav-spacer {
    display: none;
  }
  .navbar .icon-button[aria-label="Redo (Ctrl/⌘ Shift Z)"] {
    display: none;
  }
}
````

## REPLACE FILE

FILE: `src/Components/navbar/Navbar.tsx`

````tsx
import { useRef } from "react";
import { Logo, Icon } from "../common/Icon";
import { IconButton } from "../common/IconButton";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore, fingerprint } from "../../store/moleculeStore";
import { useHistoryStore } from "../../store/historyStore";
import { parseMolecule } from "../../utils/storage";
import "./Navbar.css";
export function Navbar() {
  const tool = useUIStore((s) => s.tool),
    theme = useUIStore((s) => s.theme);
  const undo = useHistoryStore((s) => s.past.length),
    redo = useHistoryStore((s) => s.future.length);
  const m = useMoleculeStore((s) => s.molecule),
    saved = useMoleculeStore((s) => s.savedFingerprint);
  const input = useRef<HTMLInputElement>(null);
  const dirty = fingerprint(m) !== saved;
  const set = useUIStore.getState().set;
  return (
    <nav className="navbar" aria-label="Editor controls">
      <button
        className="brand-button"
        title="About ChemEase"
        onClick={() => set({ dialog: "help" })}
      >
        <Logo />
      </button>
      <div className="nav-divider" />
      <div className="nav-tools">
        {(
          [
            ["select", "V"],
            ["erase", "E"],
            ["lasso", "L"],
            ["pan", "Space"],
          ] as const
        ).map(([t, key]) => (
          <button
            key={t}
            className={`nav-tool ${tool === t ? "active" : ""}`}
            aria-label={`${t[0].toUpperCase() + t.slice(1)} tool`}
            aria-pressed={tool === t}
            title={`${t[0].toUpperCase() + t.slice(1)} (${key})`}
            onClick={() => set({ tool: t, pendingAtom: null })}
          >
            <Icon name={t} size={16} />
            <span>{t[0].toUpperCase() + t.slice(1)}</span>
          </button>
        ))}
      </div>
      <div className="nav-divider" />
      <IconButton
        label="Undo (Ctrl/⌘ Z)"
        icon="undo"
        disabled={!undo}
        onClick={() => useMoleculeStore.getState().undo()}
      />
      <IconButton
        label="Redo (Ctrl/⌘ Shift Z)"
        icon="redo"
        disabled={!redo}
        onClick={() => useMoleculeStore.getState().redo()}
      />
      <div className="nav-divider" />
      <div className="nav-files">
        <button
          className="nav-tool"
          onClick={() => set({ dialog: "new" })}
          title="New molecule (Ctrl/⌘ N)"
        >
          <Icon name="plus" size={16} />
          <span>New</span>
        </button>
        <button
          className="nav-tool"
          onClick={() => input.current?.click()}
          title="Import ChemEase JSON"
          aria-label="Import JSON"
        >
          <Icon name="folder" size={16} />
        </button>
        <button
          className="nav-tool"
          onClick={() => useMoleculeStore.getState().save()}
          title="Save locally (Ctrl/⌘ S)"
        >
          <Icon name="save" size={16} />
          <span>Save</span>
          {dirty && <i className="unsaved-dot" />}
        </button>
        <button
          className="nav-tool export-button"
          onClick={() => set({ dialog: "export" })}
        >
          <Icon name="export" size={16} />
          <span>Export</span>
        </button>
      </div>
      <div className="nav-spacer" />
      <span className="local-status">
        <i />
        {dirty ? "Unsaved changes" : "On your device"}
      </span>
      <div className="nav-divider" />
      <IconButton
        label={
          theme === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
        icon={theme === "light" ? "moon" : "sun"}
        onClick={() =>
          useUIStore.getState().setTheme(theme === "light" ? "dark" : "light")
        }
      />
      <IconButton
        label="Settings"
        icon="settings"
        onClick={() => set({ dialog: "settings" })}
      />
      <IconButton
        label="Help and keyboard shortcuts"
        icon="help"
        onClick={() => set({ dialog: "help" })}
      />
      <input
        ref={input}
        type="file"
        accept=".json,application/json"
        className="sr-only"
        aria-label="Import molecule JSON file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          try {
            if (file.size > 2_000_000)
              throw new Error("File exceeds the 2 MB import limit.");
            const next = parseMolecule(await file.text());
            if (
              dirty &&
              !window.confirm(
                "Replace unsaved structure? This change can be undone.",
              )
            )
              return;
            useMoleculeStore.getState().replace(next);
            useUIStore.getState().notify("Molecule imported.");
          } catch (err) {
            useUIStore.getState().notify((err as Error).message);
          }
        }}
      />
    </nav>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/sidebar/AnalysisPanel.css`

````css
.analysis-content {
  padding: 26px 28px;
}
.analysis-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 22px 24px;
  background: var(--accent-soft);
  border-radius: 9px;
}
.analysis-hero .eyebrow {
  font-size: 9px;
}
.analysis-formula {
  font-size: 43px;
  margin-top: 8px;
  color: var(--accent);
  overflow-wrap: anywhere;
}
.analysis-formula .formula {
  font-weight: 500;
}
.analysis-mass {
  display: flex;
  flex-direction: column;
  gap: 7px;
  text-align: right;
  flex-shrink: 0;
}
.analysis-mass > span {
  font-size: 10px;
  color: var(--text-muted);
}
.analysis-mass strong {
  font-family: var(--mono);
  font-weight: 400;
  font-size: 29px;
  letter-spacing: -1px;
}
.analysis-mass > span:last-child {
  font-size: 8px;
}
.analysis-content h3 {
  font-size: 12px;
  font-weight: 550;
  letter-spacing: -0.1px;
}
.analysis-composition {
  padding: 26px 0;
  border-bottom: 1px solid var(--border);
}
.analysis-composition .info-section-title > span {
  font-size: 9px;
  color: var(--text-muted);
}
.composition-elements {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 17px;
}
.composition-elements > div {
  border: 1px solid var(--border);
  border-radius: 7px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  min-width: 96px;
  flex: 1;
}
.composition-symbol {
  font-size: 22px;
  color: var(--accent);
}
.composition-elements > div > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.composition-elements strong {
  font-size: 14px;
  font-family: var(--mono);
  font-weight: 400;
}
.composition-elements > div > div > span {
  font-size: 8px;
  color: var(--text-muted);
}
.analysis-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}
.analysis-columns h3 {
  margin-bottom: 18px;
}
.analysis-stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 13px 0;
  font-size: 11px;
}
.analysis-stat > span {
  color: var(--text-muted);
}
.analysis-stat > strong {
  font-weight: 450;
  font-family: var(--mono);
  text-align: right;
}
.descriptor-note {
  font-size: 9px;
  color: var(--text-muted);
  line-height: 1.8;
  padding: 12px;
  background: var(--bg);
  border-radius: 6px;
  margin-top: 18px;
}
.analysis-validation {
  padding: 22px 0;
  border-bottom: 1px solid var(--border);
}
.analysis-validation h3 {
  display: flex;
  align-items: center;
  gap: 12px;
}
.valid-tag,
.warn-tag {
  font-size: 8px;
  padding: 5px 8px;
  background: color-mix(in srgb, var(--success) 8%, transparent);
  color: var(--success);
  border-radius: 4px;
}
.warn-tag {
  color: var(--warning);
  background: color-mix(in srgb, var(--warning) 8%, transparent);
}
.analysis-validation p {
  font-size: 10px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.7;
  margin-top: 14px;
}
.analysis-validation p svg {
  color: var(--success);
  flex-shrink: 0;
}
.analysis-validation ul {
  padding: 0;
  list-style: none;
  margin-bottom: 0;
}
.analysis-validation li {
  margin: 5px 0;
}
.analysis-validation li button {
  font-size: 11px;
  color: var(--warning);
  text-align: left;
  padding: 6px 0;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 9px;
}
.analysis-validation li button:disabled {
  opacity: 1;
  cursor: default;
}
.analysis-smiles {
  padding-top: 22px;
}
.analysis-smiles .secondary {
  font-size: 9px;
  padding: 7px 10px;
}
.analysis-smiles small {
  font-size: 9px;
  font-weight: 400;
  color: var(--text-muted);
  margin-left: 8px;
}
.analysis-smiles code {
  display: block;
  padding: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow-wrap: anywhere;
  line-height: 1.65;
  font-size: 12px;
  user-select: all;
}
.analysis-disclaimer {
  font-size: 9px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-top: 17px;
}
@media (max-width: 600px) {
  .analysis-content {
    padding: 18px;
  }
  .analysis-hero {
    padding: 16px;
    gap: 12px;
  }
  .analysis-formula {
    font-size: 34px;
  }
  .analysis-mass strong {
    font-size: 24px;
  }
  .analysis-columns {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .analysis-composition .info-section-title {
    align-items: start;
    gap: 12px;
  }
  .analysis-composition .info-section-title > span {
    max-width: 100px;
    text-align: right;
  }
}
````

## CREATE NEW FILE

FILE: `src/Components/sidebar/AnalysisPanel.tsx`

````tsx
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { Modal } from "../common/Modal";
import { Formula } from "../common/Formula";
import { Icon } from "../common/Icon";
import { copyText } from "../../engine/export";
import { ELEMENTS } from "../../utils/elementData";
import { formatNumber } from "../../utils/format";
import "./AnalysisPanel.css";
export function AnalysisPanel({ onClose }: { onClose: () => void }) {
  const a = useMoleculeAnalysis();
  const name = useMoleculeStore((s) => s.molecule.metadata.name);
  const stat = (label: string, value: number | null) => (
    <div className="analysis-stat" key={label}>
      <span>{label}</span>
      <strong>{value ?? "Not evaluated"}</strong>
    </div>
  );
  return (
    <Modal title="Molecular analysis" onClose={onClose} wide>
      <div className="analysis-content">
        <div className="analysis-hero">
          <div>
            <span className="eyebrow muted">{name}</span>
            <div className="analysis-formula">
              <Formula value={a.formula} />
            </div>
          </div>
          <div className="analysis-mass">
            <span>Molecular weight</span>
            <strong>
              {a.weight === null ? "Unavailable" : formatNumber(a.weight)}
            </strong>
            <span>g/mol · average atomic weights</span>
          </div>
        </div>
        <div className="analysis-composition">
          <div className="info-section-title">
            <h3>Elemental composition</h3>
            <span>{a.totalAtoms} atoms, including hydrogens</span>
          </div>
          <div className="composition-elements">
            {Object.entries(a.composition).map(([e, n]) => (
              <div key={e}>
                <span className="composition-symbol">{e}</span>
                <div>
                  <strong>{n}</strong>
                  <span>{ELEMENTS[e]?.name || "Unspecified"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="analysis-columns">
          <section>
            <h3>Structural properties</h3>
            {[
              ["Drawn atoms", a.atoms],
              ["Heavy atoms", a.heavyAtoms],
              ["Implicit hydrogens", a.implicitH],
              ["Bonds", a.bonds],
              ["Independent rings", a.rings],
              ["Aromatic cycles", a.aromaticRings],
              ["Connected fragments", a.components],
            ].map(([label, value]) => stat(label as string, value as number))}
          </section>
          <section>
            <h3>Chemical properties</h3>
            {stat("Formal charge", a.charge)}
            {stat("H-bond donor sites", a.donors)}
            {stat("H-bond acceptor sites", a.acceptors)}
            {stat("Rotatable bonds", a.rotatable)}
            <p className="descriptor-note">
              Donor / acceptor and rotatable-bond counts use simple organic
              graph rules, not a validated descriptor toolkit. Unsupported
              chemistry is not evaluated.
            </p>
          </section>
        </div>
        <section className="analysis-validation">
          <h3>
            Validation{" "}
            <span className={a.warnings.length ? "warn-tag" : "valid-tag"}>
              {a.warnings.length
                ? `${a.warnings.length} warnings`
                : "No basic warnings"}
            </span>
          </h3>
          {a.warnings.length ? (
            <ul>
              {a.warnings.map((w, i) => (
                <li key={i}>
                  <button
                    disabled={!w.atomId}
                    onClick={() => {
                      if (w.atomId) {
                        useMoleculeStore.getState().setSelection([w.atomId]);
                        useUIStore.getState().set({ tool: "select" });
                        onClose();
                      }
                    }}
                  >
                    {w.message}
                    {w.atomId && <Icon name="arrow" size={12} />}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <Icon name="check" size={14} />
              Within the supported valence rules. This does not establish
              chemical stability or safety.
            </p>
          )}
        </section>
        <section className="analysis-smiles">
          <div className="info-section-title">
            <h3>
              SMILES <small>Non-canonical</small>
            </h3>
            <button
              className="secondary"
              disabled={!a.smiles}
              onClick={async () => {
                try {
                  await copyText(a.smiles);
                  useUIStore.getState().notify("SMILES copied.");
                } catch (e) {
                  useUIStore.getState().notify((e as Error).message);
                }
              }}
            >
              <Icon name="copy" size={13} />
              Copy
            </button>
          </div>
          <code>{a.smiles || a.smilesError || "Empty structure"}</code>
        </section>
        <p className="analysis-disclaimer">
          Formula and mass use the displayed implicit-hydrogen model. Ring
          counts are graph cycle rank (E − V + components), not perceived
          chemical ring sets. No logP, TPSA, conformer or stability prediction
          is performed.
        </p>
      </div>
    </Modal>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/sidebar/InfoPanel.css`

````css
.info-panel {
  width: 284px;
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.info-panel > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  border-bottom: 1px solid var(--border);
  padding: 0 22px;
  color: var(--text-muted);
  flex-shrink: 0;
}
.info-panel > header .eyebrow {
  font-size: 9px;
  letter-spacing: 1.25px;
}
.info-scroll {
  overflow: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.structure-context {
  padding: 23px 21px;
  display: flex;
  gap: 11px;
  align-items: center;
}
.context-icon {
  width: 35px;
  height: 35px;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 7px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.structure-context h2 {
  font-size: 12px;
  font-weight: 550;
  letter-spacing: -0.2px;
}
.structure-context p {
  font-size: 9px;
  color: var(--text-muted);
  margin-top: 5px;
  line-height: 1.5;
}
.info-label,
.weight-label {
  font-size: 10px;
  color: var(--text-muted);
}
.formula-section {
  padding: 0 23px 22px;
  border-bottom: 1px solid var(--border);
}
.formula-large {
  font-size: 38px;
  line-height: 1.3;
  margin: 8px 0 20px;
  color: var(--accent);
  word-break: break-word;
}
.formula-large .formula {
  font-weight: 500;
}
.weight-number {
  font-size: 23px;
  font-family: var(--mono);
  letter-spacing: -1.2px;
  margin-top: 9px;
}
.weight-number span {
  font-family: var(--font);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0;
}
.provisional {
  display: block;
  font-size: 8px;
  margin-top: 13px;
  color: var(--warning);
  line-height: 1.6;
}
.structure-numbers {
  padding: 23px;
  border-bottom: 1px solid var(--border);
}
.structure-numbers .eyebrow,
.smiles-section .eyebrow {
  font-size: 8px;
  letter-spacing: 1.4px;
}
.number-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 20px;
}
.number-grid > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: 1px solid var(--border);
  padding-left: 13px;
}
.number-grid > div:first-child {
  padding-left: 0;
}
.number-grid > div:last-child {
  border: 0;
}
.number-grid strong {
  font-family: var(--mono);
  font-size: 19px;
  font-weight: 400;
}
.number-grid span {
  font-size: 8px;
  color: var(--text-muted);
}
.smiles-section {
  padding: 20px 23px 16px;
}
.info-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.info-section-title button {
  padding: 3px;
  color: var(--text-muted);
}
.smiles-value {
  font-family: var(--mono);
  font-size: 11px;
  padding: 12px 10px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  min-height: 41px;
  line-height: 1.65;
  overflow-wrap: anywhere;
  user-select: all;
  max-height: 130px;
  overflow: auto;
}
.smiles-value > span {
  font-family: var(--font);
  font-size: 9px;
}
.smiles-section > p {
  color: var(--text-muted);
  font-size: 8px;
  margin-top: 9px;
}
.validation-summary {
  margin: 0 22px 20px;
  display: flex;
  align-items: start;
  gap: 8px;
  color: var(--success);
  padding: 12px 0;
}
.validation-summary > svg {
  flex-shrink: 0;
  margin-top: 1px;
}
.validation-summary strong {
  font-size: 9px;
  font-weight: 500;
}
.validation-summary p {
  font-size: 8px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-top: 5px;
}
.validation-summary.has-warnings {
  color: var(--warning);
}
.info-actions {
  padding: 17px 20px 12px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}
.info-actions > .primary {
  width: 100%;
  font-size: 11px;
  padding: 11px 10px;
  gap: 8px;
  border-radius: 6px;
}
.info-actions > .primary > svg:last-child {
  margin-left: auto;
}
.info-actions > div {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.info-actions .secondary {
  font-size: 9px;
  padding: 9px 10px;
  flex: 1;
  border-radius: 5px;
  gap: 6px;
}
.info-actions > span {
  display: block;
  font-size: 7px;
  color: var(--text-muted);
  text-align: center;
  margin-top: 13px;
}
.selection-details {
  padding: 0 23px 18px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 22px;
}
.selection-details .eyebrow {
  font-size: 8px;
}
.selection-details dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
  font-size: 10px;
  margin: 16px 0;
}
.selection-details dt {
  color: var(--text-muted);
}
.selection-details dd {
  margin: 0;
  text-align: right;
}
.selection-details small {
  color: var(--text-muted);
  font-size: 9px;
}
.atom-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 10px;
}
.atom-control input,
.atom-control select {
  width: 65px;
  padding: 5px;
  font-size: 10px;
}
.clear-selection {
  font-size: 9px;
  color: var(--accent);
  padding: 12px 0 0;
}
.selection-details > select {
  width: 100%;
  font-size: 10px;
  padding: 8px;
}
@media (max-height: 780px) {
  .structure-context {
    padding: 18px 21px;
  }
  .formula-large {
    font-size: 34px;
    margin: 6px 0 16px;
  }
  .formula-section {
    padding-bottom: 18px;
  }
  .structure-numbers {
    padding-top: 18px;
    padding-bottom: 18px;
  }
  .number-grid {
    margin-top: 16px;
  }
  .smiles-section {
    padding-top: 16px;
  }
  .info-actions {
    padding-top: 12px;
  }
}
@media (max-width: 1100px) {
  .info-panel {
    width: 258px;
  }
  .info-actions {
    padding-left: 16px;
    padding-right: 16px;
  }
  .info-panel > header {
    padding: 0 18px;
  }
}
````

## REPLACE FILE

FILE: `src/Components/sidebar/InfoPanel.tsx`

````tsx
import { useMoleculeStore } from "../../store/moleculeStore";
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeAnalysis } from "../../hooks/useMoleculeAnalysis";
import { ELEMENTS } from "../../utils/elementData";
import { atomValence } from "../../engine/valence";
import { bondOrder } from "../../engine/chemistry";
import { exportMolecule, copyText } from "../../engine/export";
import { Icon } from "../common/Icon";
import { Formula } from "../common/Formula";
import { formatNumber } from "../../utils/format";
import type { BondType } from "../../types/chem";
import "./InfoPanel.css";
export function InfoPanel() {
  const m = useMoleculeStore((s) => s.molecule),
    ids = useMoleculeStore((s) => s.selectedAtoms),
    bondIds = useMoleculeStore((s) => s.selectedBonds);
  const analysis = useMoleculeAnalysis();
  const a = ids.length === 1 ? m.atoms.find((a) => a.id === ids[0]) : undefined,
    b =
      bondIds.length === 1
        ? m.bonds.find((b) => b.id === bondIds[0])
        : undefined;
  const u = useUIStore.getState();
  const v = a ? atomValence(a, m) : null;
  const doCopy = async () => {
    try {
      await copyText(analysis.smiles);
      u.notify("SMILES copied.");
    } catch (e) {
      u.notify((e as Error).message);
    }
  };
  const png = async () => {
    try {
      await exportMolecule(m, "png", {
        showCarbons: useUIStore.getState().showCarbons,
        showHydrogens: useUIStore.getState().showHydrogens,
      });
      u.notify("PNG exported.");
    } catch (e) {
      u.notify((e as Error).message);
    }
  };
  return (
    <aside className="info-panel" aria-label="Structure information">
      <header>
        <span className="eyebrow">Structure information</span>
        <Icon name="info" size={15} />
      </header>
      <div className="info-scroll">
        <div className="structure-context">
          <div className="context-icon">
            <Icon name={a ? "atom" : b ? "bond" : "ring"} size={20} />
          </div>
          <div>
            <h2>
              {a
                ? ELEMENTS[a.element]?.name || a.element
                : b
                  ? `${b.type} bond`
                  : ids.length > 1
                    ? `${ids.length} atoms selected`
                    : "Molecule overview"}
            </h2>
            <p>
              {a
                ? "Atom properties"
                : b
                  ? "Bond properties"
                  : ids.length > 1
                    ? "Drag together · Delete to remove"
                    : "Every connection, accounted for."}
            </p>
          </div>
        </div>
        {(a || b || ids.length > 1) && (
          <section className="selection-details">
            <span className="eyebrow muted">Selection</span>
            {a && v && (
              <>
                <dl>
                  <dt>Element</dt>
                  <dd>
                    {a.element}{" "}
                    <small>#{ELEMENTS[a.element]?.number || "—"}</small>
                  </dd>
                  <dt>Bond order sum</dt>
                  <dd>{v.used}</dd>
                  <dt>Implicit H</dt>
                  <dd>{v.implicitH}</dd>
                  <dt>Typical valence</dt>
                  <dd>{v.allowed.join(", ") || "Unknown"}</dd>
                  <dt>Coordinates</dt>
                  <dd>
                    {a.x.toFixed(0)}, {a.y.toFixed(0)}
                  </dd>
                </dl>
                <label className="atom-control">
                  Formal charge
                  <input
                    aria-label="Selected atom charge"
                    type="number"
                    min="-8"
                    max="8"
                    value={a.charge}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (Number.isInteger(n) && Math.abs(n) <= 8)
                        useMoleculeStore
                          .getState()
                          .patchAtom(a.id, { charge: n });
                    }}
                  />
                </label>
                <label className="atom-control">
                  Hydrogens
                  <select
                    aria-label="Implicit hydrogen override"
                    value={
                      a.hydrogenOverride === undefined
                        ? "auto"
                        : a.hydrogenOverride
                    }
                    onChange={(e) =>
                      useMoleculeStore.getState().patchAtom(a.id, {
                        hydrogenOverride:
                          e.target.value === "auto"
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                  >
                    <option value="auto">Auto</option>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
            {b && (
              <>
                <dl>
                  <dt>Bond order</dt>
                  <dd>{bondOrder(b.type)}</dd>
                  <dt>Connected atoms</dt>
                  <dd>
                    {m.atoms.find((a) => a.id === b.atomA)?.element} –{" "}
                    {m.atoms.find((a) => a.id === b.atomB)?.element}
                  </dd>
                </dl>
                <select
                  aria-label="Selected bond type"
                  value={b.type}
                  onChange={(e) =>
                    useMoleculeStore
                      .getState()
                      .patchBond(b.id, e.target.value as BondType)
                  }
                >
                  {["single", "double", "triple", "aromatic"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </>
            )}
            <button
              className="clear-selection"
              onClick={() => useMoleculeStore.getState().setSelection([])}
            >
              Clear selection
            </button>
          </section>
        )}
        <section className="formula-section">
          <div className="info-label">Molecular formula</div>
          <div className="formula-large" data-testid="formula">
            <Formula value={analysis.formula} />
          </div>
          <div className="weight-label">Molecular weight</div>
          <div className="weight-number" data-testid="weight">
            {m.atoms.length && analysis.weight !== null
              ? formatNumber(analysis.weight)
              : "—"}{" "}
            <span>g/mol</span>
          </div>
          {analysis.warnings.length > 0 && (
            <small className="provisional">
              Check warnings · chemistry may be incomplete
            </small>
          )}
        </section>
        <section className="structure-numbers">
          <span className="eyebrow muted">Structure at a glance</span>
          <div className="number-grid">
            {[
              ["Atoms", analysis.atoms],
              ["Bonds", analysis.bonds],
              ["Rings", analysis.rings],
              ["Charge", analysis.charge],
            ].map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="smiles-section">
          <div className="info-section-title">
            <span className="eyebrow muted">SMILES</span>
            <button
              onClick={doCopy}
              disabled={!analysis.smiles}
              aria-label="Copy SMILES string"
              title="Copy SMILES"
            >
              <Icon name="copy" size={13} />
            </button>
          </div>
          <div className="smiles-value" tabIndex={0}>
            {analysis.smiles || (
              <span className="muted">
                {analysis.smilesError
                  ? "Unavailable · review warnings"
                  : "Draw a structure to generate SMILES"}
              </span>
            )}
          </div>
          <p>Graph-derived · non-canonical</p>
        </section>
        <section
          className={`validation-summary ${analysis.warnings.length ? "has-warnings" : ""}`}
        >
          <Icon name={analysis.warnings.length ? "info" : "check"} size={15} />
          <div>
            <strong>
              {!m.atoms.length
                ? "Ready when you are"
                : analysis.warnings.length
                  ? `${analysis.warnings.length} chemistry warning${analysis.warnings.length > 1 ? "s" : ""}`
                  : "No basic valence warnings"}
            </strong>
            <p>
              {!m.atoms.length
                ? "Your analysis updates as you draw."
                : analysis.warnings.length
                  ? analysis.warnings[0].message
                  : "Within the supported chemistry rules."}
            </p>
          </div>
        </section>
      </div>
      <footer className="info-actions">
        <button className="secondary" disabled={!m.atoms.length} onClick={() => u.set({ dialog: "3d" })}>View molecule in 3D</button>
        <button
          className="primary"
          disabled={!m.atoms.length}
          onClick={() => u.set({ dialog: "analysis" })}
        >
          <Icon name="flask" size={16} />
          Analyze Structure
          <Icon name="arrow" size={15} />
        </button>
        <div>
          <button
            className="secondary"
            disabled={!analysis.smiles}
            onClick={doCopy}
          >
            <Icon name="copy" size={13} />
            Copy SMILES
          </button>
          <button
            className="secondary"
            disabled={!m.atoms.length}
            onClick={png}
          >
            <Icon name="download" size={13} />
            PNG
          </button>
        </div>
        <span>Local editing · 3D lookup shares SMILES only when requested.</span>
      </footer>
    </aside>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/statusbar/StatusBar.css`

````css
.statusbar {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 9px;
  flex-shrink: 0;
}
.status-left {
  display: flex;
  align-items: center;
  gap: 24px;
}
.status-tool {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--accent);
  min-width: 79px;
}
.status-tool i {
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
}
.cursor-coordinates {
  font-family: var(--mono);
  display: flex;
  gap: 9px;
}
.cursor-coordinates b {
  font-weight: 400;
  min-width: 28px;
  color: var(--text);
}
.separator {
  display: inline-block;
  height: 7px;
  width: 1px;
  background: var(--border);
  margin: 0 8px;
}
.zoom-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}
.zoom-controls .icon-button {
  width: 26px;
  height: 25px;
}
.zoom-controls svg {
  width: 13px;
  height: 13px;
}
.zoom-percent {
  font-family: var(--mono);
  font-size: 9px;
  min-width: 42px;
}
.fit-button {
  border-left: 1px solid var(--border);
  margin-left: 5px;
  padding: 4px 10px;
  font-size: 9px;
}
.pan-help {
  margin-right: 14px;
  font-size: 8px;
}
@media (max-width: 800px) {
  .pan-help,
  .cursor-coordinates {
    display: none;
  }
  .status-left {
    gap: 12px;
  }
  .statusbar {
    font-size: 8px;
  }
}
````

## REPLACE FILE

FILE: `src/Components/statusbar/StatusBar.tsx`

````tsx
import { useUIStore } from "../../store/chemUIStore";
import { useMoleculeStore } from "../../store/moleculeStore";
import { IconButton } from "../common/IconButton";
import "./StatusBar.css";
export function StatusBar() {
  const tool = useUIStore((s) => s.tool),
    cursor = useUIStore((s) => s.cursor),
    zoom = useUIStore((s) => s.zoom);
  const atoms = useMoleculeStore((s) => s.molecule.atoms.length),
    bonds = useMoleculeStore((s) => s.molecule.bonds.length);
  const set = useUIStore.getState().set;
  return (
    <footer className="statusbar">
      <div className="status-left">
        <span className="status-tool">
          <i />
          {tool === "draw"
            ? "Atom"
            : tool === "lonePair"
              ? "Lone pair"
              : tool[0].toUpperCase() + tool.slice(1)}{" "}
          tool
        </span>
        <span className="cursor-coordinates">
          X <b>{cursor.x.toFixed(0)}</b> Y <b>{cursor.y.toFixed(0)}</b>
        </span>
        <span>
          {atoms} atoms <i className="separator" /> {bonds} bonds
        </span>
      </div>
      <div className="zoom-controls">
        <span className="pan-help">Space + drag to pan</span>
        <IconButton
          label="Zoom out"
          icon="minus"
          disabled={zoom <= 0.2}
          onClick={() => set({ zoom: Math.max(0.2, zoom / 1.2) })}
        />
        <button
          className="zoom-percent"
          title="Reset zoom to 100%"
          onClick={() => set({ zoom: 1 })}
        >
          {Math.round(zoom * 100)}%
        </button>
        <IconButton
          label="Zoom in"
          icon="plus"
          disabled={zoom >= 4}
          onClick={() => set({ zoom: Math.min(4, zoom * 1.2) })}
        />
        <button
          className="fit-button"
          onClick={() =>
            set({ fitVersion: useUIStore.getState().fitVersion + 1 })
          }
        >
          Fit
        </button>
      </div>
    </footer>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/toolbar/Toolbar.css`

````css
.chem-toolbar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}
.chem-toolbar.expanded {
  width: 218px;
}
.chem-toolbar.collapsed {
  width: 54px;
}
.chem-toolbar > header {
  height: 54px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}
.chem-toolbar > header .eyebrow {
  font-size: 9px;
  letter-spacing: 1.5px;
}
.chem-toolbar.collapsed > header {
  padding: 0 9px;
}
.toolbar-scroll {
  overflow: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.toolbar-scroll section {
  padding: 18px 16px 0;
}
.toolbar-scroll section h2 {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-weight: 550;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.element-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.element-button {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 6px;
  height: 41px;
  text-align: center;
  background: var(--surface);
}
.element-button:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.element-button strong {
  font-size: 15px;
  font-weight: 500;
}
.element-button > span {
  font-size: 7px;
  position: absolute;
  top: 5px;
  left: 6px;
  color: var(--text-muted);
}
.element-O {
  color: var(--danger);
}
.element-N {
  color: #5772a9;
}
[data-theme="dark"] .element-N {
  color: #9ab6ee;
}
.element-S {
  color: var(--warning);
}
.element-F,
.element-Cl {
  color: var(--success);
}
.tool-caption {
  font-size: 8px;
  color: var(--text-muted);
  padding-top: 9px;
}
.section-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  text-align: left;
  font-size: 10px;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.tool-row {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 9px;
  border-radius: 5px;
  text-align: left;
  font-size: 11px;
  margin-bottom: 3px;
  border: 1px solid transparent;
}
.tool-row:hover {
  background: var(--bg);
}
.tool-row kbd {
  margin-left: auto;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  font-size: 9px;
}
.ring-tools {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.ring-tools > button {
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 9px 2px;
}
.ring-tools small {
  font-size: 7px;
  color: var(--text-muted);
}
.ring-tools > button:hover {
  background: var(--accent-soft);
}
.chemistry-tools {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}
.chemistry-tools .tool-row {
  gap: 5px;
  padding: 0 3px;
  font-size: 9px;
}
.chem-symbol {
  font-size: 16px;
  width: 24px;
  text-align: center;
  font-weight: 450;
}
.chem-toolbar > footer {
  height: 41px;
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: var(--text-muted);
  font-size: 8px;
  margin-top: 16px;
}
.local-dot {
  width: 4px;
  height: 4px;
  background: var(--success);
  border-radius: 50%;
}
.collapsed .toolbar-scroll section {
  padding: 12px 7px 0;
}
.collapsed .toolbar-scroll section h2 {
  font-size: 6px;
  letter-spacing: 0.2px;
  text-align: center;
  margin-bottom: 8px;
}
.collapsed .element-grid {
  grid-template-columns: 1fr;
  gap: 3px;
}
.collapsed .element-button {
  height: 33px;
  border-color: transparent;
}
.collapsed .element-button strong {
  font-size: 13px;
}
.collapsed .tool-row {
  height: 33px;
  justify-content: center;
  padding: 0;
}
.collapsed .ring-tools,
.collapsed .chemistry-tools {
  grid-template-columns: 1fr;
}
.collapsed .ring-tools > button {
  border-color: transparent;
  padding: 6px 0;
}
.charge-controls {
  display: flex;
  gap: 5px;
  margin-top: 6px;
}
.charge-controls button {
  border: 1px solid var(--border);
  padding: 6px 20px;
  border-radius: 4px;
  flex: 1;
}
@media (max-height: 780px) {
  .toolbar-scroll section {
    padding-top: 14px;
  }
  .element-button {
    height: 36px;
  }
  .toolbar-scroll section h2 {
    margin-bottom: 8px;
  }
  .tool-caption {
    display: none;
  }
  .tool-row {
    height: 30px;
  }
  .ring-tools > button {
    padding: 6px 2px;
  }
  .chem-toolbar > footer {
    height: 33px;
  }
}
@media (max-width: 1000px) {
  .chem-toolbar.expanded {
    width: 184px;
  }
  .toolbar-scroll section {
    padding-left: 12px;
    padding-right: 12px;
  }
  .chemistry-tools .tool-row {
    font-size: 8px;
  }
}

.mobile-basic-tools {
  display: none;
}
@media (max-width: 700px) {
  .toolbar-scroll .mobile-basic-tools {
    display: block;
  }
  .mobile-basic-tools > div {
    display: flex;
    gap: 8px;
  }
  .mobile-basic-tools button {
    border: 1px solid var(--border);
    border-radius: 6px;
    flex: 1;
    height: 44px;
    display: grid;
    place-items: center;
  }
}
````

## REPLACE FILE

FILE: `src/Components/toolbar/Toolbar.tsx`

````tsx
import { useState } from "react";
import { useUIStore } from "../../store/chemUIStore";
import { Icon } from "../common/Icon";
import { IconButton } from "../common/IconButton";
import type { BondType } from "../../types/chem";
import { ELEMENTS } from "../../utils/elementData";
import "./Toolbar.css";
export function Toolbar() {
  const tool = useUIStore((s) => s.tool),
    atom = useUIStore((s) => s.atom),
    bond = useUIStore((s) => s.bond),
    expanded = useUIStore((s) => s.expanded),
    ring = useUIStore((s) => s.ring),
    benzene = useUIStore((s) => s.benzene),
    delta = useUIStore((s) => s.chargeDelta);
  const [extended, setExtended] = useState(false);
  const set = useUIStore.getState().set;
  const chooseAtom = (a: string) =>
    set({ tool: "draw", atom: a, pendingAtom: null });
  const chooseBond = (b: BondType) =>
    set({ tool: "bond", bond: b, pendingAtom: null });
  const elements = (list: string[]) => (
    <div className="element-grid">
      {list.map((a) => (
        <button
          key={a}
          aria-label={`Draw ${ELEMENTS[a]?.name || a}`}
          aria-pressed={tool === "draw" && atom === a}
          title={`${ELEMENTS[a]?.name || a} (${a})`}
          className={`element-button ${tool === "draw" && atom === a ? "active" : ""}`}
          onClick={() => chooseAtom(a)}
        >
          <strong className={`element-${a}`}>{a}</strong>
          {expanded && <span>{ELEMENTS[a]?.number}</span>}
        </button>
      ))}
    </div>
  );
  return (
    <aside
      className={`chem-toolbar ${expanded ? "expanded" : "collapsed"}`}
      aria-label="Chemistry tools"
    >
      <header>
        {expanded && <span className="eyebrow">Toolkit</span>}
        <IconButton
          icon={expanded ? "left" : "chevron"}
          label={
            expanded ? "Collapse chemistry toolbar" : "Expand chemistry toolbar"
          }
          onClick={() => set({ expanded: !expanded })}
        />
      </header>
      <div className="toolbar-scroll">
        <section className="mobile-basic-tools">
          <h2>Edit</h2>
          <div>
            {(["select", "erase", "lasso"] as const).map((t) => (
              <button
                key={t}
                className={tool === t ? "active" : ""}
                aria-label={`${t} mobile tool`}
                title={t}
                onClick={() => set({ tool: t, pendingAtom: null })}
              >
                <Icon name={t} />
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2>Atoms</h2>
          {elements(["C", "H", "N", "O", "P", "S"])}
          {expanded && (
            <div className="tool-caption">Elements, at your fingertips.</div>
          )}
        </section>
        <section>
          <h2>Halogens</h2>
          {elements(["F", "Cl", "Br", "I"])}
        </section>
        {expanded && (
          <section className="extended-section">
            <button
              className="section-toggle"
              aria-expanded={extended}
              onClick={() => setExtended(!extended)}
            >
              <span>Extended elements</span>
              <Icon name={extended ? "minus" : "plus"} size={13} />
            </button>
            {extended &&
              elements([
                "Li",
                "Na",
                "K",
                "Mg",
                "Ca",
                "B",
                "Si",
                "Al",
                "Zn",
                "Fe",
                "Cu",
                "Ag",
              ])}
          </section>
        )}
        <section>
          <h2>Bonds</h2>
          <div className="bond-tools">
            {(["single", "double", "triple", "aromatic"] as const).map(
              (b, i) => (
                <button
                  key={b}
                  title={`${b[0].toUpperCase() + b.slice(1)} bond${i < 3 ? ` (${i + 1})` : ""}`}
                  aria-label={`${b[0].toUpperCase() + b.slice(1)} bond tool`}
                  aria-pressed={tool === "bond" && bond === b}
                  className={`tool-row ${tool === "bond" && bond === b ? "active" : ""}`}
                  onClick={() => chooseBond(b)}
                >
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.4"
                  >
                    {Array.from(
                      { length: b === "single" ? 1 : b === "triple" ? 3 : 2 },
                      (_, j) => (
                        <line
                          key={j}
                          x1="4"
                          y1={17 - j * 4}
                          x2="20"
                          y2={7 - j * 4}
                          strokeDasharray={
                            b === "aromatic" && j === 1 ? "3 2" : undefined
                          }
                        />
                      ),
                    )}
                  </svg>
                  {expanded && (
                    <>
                      <span>{b[0].toUpperCase() + b.slice(1)}</span>
                      {i < 3 && <kbd>{i + 1}</kbd>}
                    </>
                  )}
                </button>
              ),
            )}
          </div>
        </section>
        <section>
          <h2>Rings</h2>
          <div className="ring-tools">
            {(
              [
                [5, false, "Cyclopentane"],
                [6, false, "Cyclohexane"],
                [6, true, "Benzene"],
              ] as const
            ).map(([n, ar, label]) => (
              <button
                key={label}
                title={label}
                aria-label={`${label} ring tool`}
                aria-pressed={tool === "ring" && ring === n && benzene === ar}
                className={
                  tool === "ring" && ring === n && benzene === ar
                    ? "active"
                    : ""
                }
                onClick={() =>
                  set({ tool: "ring", ring: n, benzene: ar, pendingAtom: null })
                }
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                >
                  <polygon
                    points={Array.from(
                      { length: n },
                      (_, i) =>
                        `${15 + 11 * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / n)},${15 + 11 * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / n)}`,
                    ).join(" ")}
                  />
                  {ar && <circle cx="15" cy="15" r="6.5" />}
                </svg>
                {expanded && <small>{ar ? "Aromatic" : `${n}-ring`}</small>}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2>Chemistry</h2>
          <div className="chemistry-tools">
            {(
              [
                ["charge", "±", "Charge"],
                ["lonePair", "••", "Lone pair"],
                ["hydrogen", "H", "Hydrogen"],
                ["draw", "R", "R-group"],
              ] as const
            ).map(([t, symbol, label]) => (
              <button
                key={label}
                title={
                  label === "Hydrogen" ? "Attach explicit hydrogen" : label
                }
                aria-label={`${label} tool`}
                className={`tool-row ${(label === "R-group" ? tool === "draw" && atom === "R" : tool === t) ? "active" : ""}`}
                onClick={() =>
                  label === "R-group"
                    ? chooseAtom("R")
                    : set({ tool: t, pendingAtom: null })
                }
              >
                <b className="chem-symbol">{symbol}</b>
                {expanded && <span>{label}</span>}
              </button>
            ))}
          </div>
          {tool === "charge" && expanded && (
            <div className="charge-controls">
              <button
                className={delta === 1 ? "active" : ""}
                onClick={() => set({ chargeDelta: 1 })}
              >
                +1
              </button>
              <button
                className={delta === -1 ? "active" : ""}
                onClick={() => set({ chargeDelta: -1 })}
              >
                −1
              </button>
            </div>
          )}
        </section>
      </div>
      <footer>
        {expanded ? (
          <>
            <span className="local-dot" /> All chemistry, on your device
          </>
        ) : (
          <Icon name="flask" size={17} />
        )}
      </footer>
    </aside>
  );
}
````

## CREATE NEW FILE

FILE: `src/Components/viewer/Molecule3D.css`

````css
.molecule-3d > p { margin-bottom: 12px; }
.molecule-viewport { position: relative; height: min(390px, 45vh); min-height: 230px; background: #111827; border-radius: 10px; overflow: hidden; }
.viewer-controls { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin: 16px 0; }
.viewer-controls label { display: flex; gap: 6px; align-items: center; font-size: 12px; }
.viewer-controls select { max-width: 150px; padding: 7px; border: 1px solid var(--border); border-radius: 5px; background: var(--surface); color: var(--text); }
.viewer-controls button { padding: 9px 12px; border: 1px solid var(--border); border-radius: 6px; }
.viewer-controls button:disabled { opacity: .5; cursor: not-allowed; }
.viewer-caption { font-size: 12px; color: var(--text-muted); margin-top: 10px; }
````

## CREATE NEW FILE

FILE: `src/Components/viewer/Molecule3DDialog.tsx`

````tsx
import { useEffect, useRef, useState } from "react";
import { createViewer, type GLViewer } from "3dmol";
import { Modal } from "../common/Modal";
import { useMoleculeStore } from "../../store/moleculeStore";
import { conformerQuery, fetchConformer } from "../../engine/conformer";
import { downloadBlob } from "../../engine/export";
import "./Molecule3D.css";

export function Molecule3DDialog({ onClose }: { onClose: () => void }) {
  const molecule = useMoleculeStore(s => s.molecule);
  const host = useRef<HTMLDivElement>(null);
  const viewer = useRef<GLViewer | null>(null);
  const request = useRef<AbortController | null>(null);
  const [sdf, setSdf] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [style, setStyle] = useState("ball-stick");
  const [hydrogens, setHydrogens] = useState(true);
  let smiles = "", blocked = "";
  try { smiles = conformerQuery(molecule); } catch (e) { blocked = (e as Error).message; }

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!sdf || !host.current) return;
    let instance: GLViewer | null = null;
    let observer: ResizeObserver | null = null;
    const container = host.current;
    try {
      instance = createViewer(container, { backgroundColor: "#111827" });
      viewer.current = instance;
      const model = instance.addModel(sdf, "sdf");
      if (!model.selectedAtoms({}).length) throw new Error("No atoms found in the returned conformer.");
      instance.zoomTo();
      observer = new ResizeObserver(() => { instance?.resize(); instance?.render(); });
      observer.observe(container);
      applyStyle(instance, style, hydrogens);
    } catch { setError("Unable to open the 3D viewer. Check that WebGL is enabled in your browser."); }
    return () => {
      observer?.disconnect();
      instance?.clear();
      viewer.current = null;
      container.replaceChildren();
    };
    // Style changes update the existing viewer below, preserving camera position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdf]);
  useEffect(() => { if (viewer.current) applyStyle(viewer.current, style, hydrogens); }, [style, hydrogens]);

  async function load() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 25000);
    setBusy(true); setError(""); setSdf("");
    try {
      const result = await fetchConformer(smiles, controller.signal);
      if (!controller.signal.aborted) setSdf(result);
    } catch (e) {
      if (request.current === controller) setError(controller.signal.aborted
        ? "3D lookup timed out or was cancelled. Please retry."
        : e instanceof TypeError ? "Cannot reach PubChem. Check your internet connection and retry." : (e as Error).message);
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }
  return <Modal title="3D molecular view" wide onClose={onClose}>
    <div className="dialog-body molecule-3d">
      <p>Explore an available PubChem conformer of your drawn structure.</p>
      <p className="notice">Clicking “Load from PubChem” sends this molecule’s SMILES to PubChem. The returned coordinates are a database conformer; they do not establish experimental geometry or a unique stereoisomer when stereo is unspecified.</p>
      {blocked && <p role="status">{blocked}</p>}
      <div className="viewer-controls">
        <button className="secondary" disabled={!!blocked || busy} onClick={() => void load()}>{busy ? "Looking up conformer…" : "Load from PubChem"}</button>
        <label>Style <select value={style} onChange={e => setStyle(e.target.value)}>
          <option value="ball-stick">Ball and stick</option><option value="stick">Sticks</option><option value="space-fill">Space filling</option>
        </select></label>
        <label><input type="checkbox" checked={hydrogens} onChange={e => setHydrogens(e.target.checked)} /> Hydrogens</label>
      </div>
      {error && <p role="alert">{error}</p>}
      <div className="molecule-viewport" ref={host} aria-label="Interactive 3D molecule" />
      {!sdf && <p className="viewer-caption">{busy ? "Retrieving 3D coordinates…" : "Load a conformer to begin. No structure is sent automatically."}</p>}
      {sdf && <>
        <p className="viewer-caption">Drag to rotate · scroll to zoom · Source: PubChem 3D</p>
        <div className="viewer-controls">
          <button className="secondary" onClick={() => { viewer.current?.zoomTo(); viewer.current?.render(); }}>Fit molecule</button>
          <button className="secondary" onClick={() => downloadBlob(new Blob([sdf], { type: "chemical/x-mdl-sdfile" }), "pubchem-conformer.sdf")}>Download 3D SDF</button>
        </div>
      </>}
    </div>
  </Modal>;
}
function applyStyle(viewer: GLViewer, style: string, hydrogens: boolean) {
  viewer.setStyle({}, {});
  viewer.setStyle(hydrogens ? {} : { not: { elem: "H" } }, style === "space-fill"
    ? { sphere: {} }
    : style === "stick" ? { stick: { radius: 0.18 } }
    : { stick: { radius: 0.13 }, sphere: { scale: 0.28 } });
  viewer.render();
}
````

## CREATE NEW FILE

FILE: `src/engine/analysis.ts`

````typescript
import type { Molecule } from "../types/chem";
import type { Analysis } from "../types/analysis";
import { composition, formulaFromComposition } from "./formula";
import { molecularWeight } from "./molecularWeight";
import { valenceMap } from "./valence";
import { validateMolecule } from "./validation";
import { generateSmiles } from "./smiles";
import { cycleRank, aromaticCycleRank, ringBondIds } from "./rings";
import { adjacency, connectedComponents } from "./chemistry";
export function analyzeMolecule(m: Molecule): Analysis {
  const c = composition(m),
    v = valenceMap(m),
    adj = adjacency(m),
    atoms = new Map(m.atoms.map((a) => [a.id, a])),
    rings = ringBondIds(m),
    warnings = validateMolecule(m),
    smiles = generateSmiles(m);
  const hydrogen = (id: string) =>
    (v.get(id)?.implicitH || 0) +
    (adj.get(id) || []).filter((n) => atoms.get(n.atomId)?.element === "H")
      .length;
  const carbonyl = (id: string) =>
    (adj.get(id) || []).some(
      (n) => n.bond.type === "double" && atoms.get(n.atomId)?.element === "O",
    );
  const amide = (id: string) =>
    (adj.get(id) || []).some(
      (n) => atoms.get(n.atomId)?.element === "C" && carbonyl(n.atomId),
    );
  const heavyDegree = (id: string) =>
    (adj.get(id) || []).filter((n) => atoms.get(n.atomId)?.element !== "H")
      .length;
  const descriptorSupported =
    !warnings.some(
      (w) =>
        w.severity === "error" ||
        /exceeds|unsupported|Unrecognized|Incomplete aromatic|Charged aromatic|R-group/.test(
          w.message,
        ),
    ) &&
    m.atoms.every((a) =>
      ["C", "H", "N", "O", "F", "Cl", "Br", "I"].includes(a.element),
    );
  const donors = descriptorSupported
    ? m.atoms.filter(
        (a) => ["N", "O"].includes(a.element) && hydrogen(a.id) > 0,
      ).length
    : null;
  const acceptors = descriptorSupported
    ? m.atoms.filter((a) => {
        if (a.charge > 0) return false;
        if (a.element === "O") {
          return !(hydrogen(a.id) > 0 && amide(a.id));
        }
        if (a.element === "N")
          return !(amide(a.id) || (a.aromatic && hydrogen(a.id) > 0));
        return false;
      }).length
    : null;
  const rotatable = descriptorSupported
    ? m.bonds.filter((b) => {
        const a = atoms.get(b.atomA),
          d = atoms.get(b.atomB);
        if (!a || !d) return false;
        return (
          b.type === "single" &&
          !rings.has(b.id) &&
          a.element !== "H" &&
          d.element !== "H" &&
          heavyDegree(a.id) > 1 &&
          heavyDegree(d.id) > 1 &&
          !(
            (a.element === "N" && carbonyl(d.id)) ||
            (d.element === "N" && carbonyl(a.id))
          )
        );
      }).length
    : null;
  return {
    formula: formulaFromComposition(c),
    composition: c,
    weight: molecularWeight(m),
    atoms: m.atoms.length,
    heavyAtoms: m.atoms.filter((a) => a.element !== "H" && a.element !== "R")
      .length,
    totalAtoms: Object.values(c).reduce((a, b) => a + b, 0),
    implicitH: [...v.values()].reduce((sum, a) => sum + a.implicitH, 0),
    bonds: m.bonds.length,
    rings: cycleRank(m),
    aromaticRings: aromaticCycleRank(m),
    charge: m.atoms.reduce((sum, a) => sum + a.charge, 0),
    donors,
    acceptors,
    rotatable,
    warnings,
    smiles: smiles.smiles,
    smilesError: smiles.error,
    components: connectedComponents(m),
  };
}
````

## REPLACE FILE

FILE: `src/engine/chemistry.ts`

````typescript
import type { Molecule, Bond, BondType } from "../types/chem";
export const bondOrder = (type: BondType): number =>
  ({ single: 1, double: 2, triple: 3, aromatic: 1.5 })[type] ?? 0;
export interface Neighbor {
  atomId: string;
  bond: Bond;
}
export function adjacency(m: Molecule) {
  const map = new Map<string, Neighbor[]>(m.atoms.map((a) => [a.id, []]));
  for (const b of m.bonds) {
    if (b.atomA !== b.atomB && map.has(b.atomA) && map.has(b.atomB)) {
      map.get(b.atomA)!.push({ atomId: b.atomB, bond: b });
      map.get(b.atomB)!.push({ atomId: b.atomA, bond: b });
    }
  }
  return map;
}
export function connectedComponents(m: Molecule) {
  const adj = adjacency(m),
    seen = new Set<string>();
  let n = 0;
  for (const a of m.atoms)
    if (!seen.has(a.id)) {
      n++;
      const stack = [a.id];
      seen.add(a.id);
      while (stack.length) {
        for (const next of adj.get(stack.pop()!) || [])
          if (!seen.has(next.atomId)) {
            seen.add(next.atomId);
            stack.push(next.atomId);
          }
      }
    }
  return n;
}
````

## CREATE NEW FILE

FILE: `src/engine/conformer.ts`

````typescript
import type { Molecule } from "../models/Molecule";
import { generateSmiles } from "./smiles";
import { validateMolecule } from "./validation";
import { connectedComponents } from "./chemistry";

/** Restrict lookup to structures our current serializer can represent faithfully. */
export function conformerQuery(m: Molecule): string {
  if (!m.atoms.length) throw new Error("Draw a molecule first.");
  if (m.atoms.length > 200) throw new Error("3D lookup is limited to 200 drawn atoms.");
  if (connectedComponents(m) !== 1) throw new Error("3D lookup supports one connected molecule at a time.");
  if (m.atoms.some(a => a.element === "R")) throw new Error("Replace unspecified R-groups before 3D lookup.");
  if (m.atoms.some(a => a.stereo) || m.bonds.some(b => b.stereo))
    throw new Error("The current SMILES exporter cannot preserve stereochemistry. 3D lookup is disabled for stereo annotations.");
  const warnings = validateMolecule(m);
  if (warnings.length) throw new Error("Resolve chemistry warnings before 3D lookup.");
  const result = generateSmiles(m);
  if (result.error || !result.smiles) throw new Error(result.error || "SMILES is unavailable.");
  return result.smiles;
}

export async function fetchConformer(smiles: string, signal?: AbortSignal): Promise<string> {
  // POST keeps special SMILES characters out of URL paths. Nothing is sent until requested.
  const response = await fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/SDF?record_type=3d", {
    method: "POST",
    body: new URLSearchParams({ smiles }),
    signal,
  });
  if (!response.ok) {
    if (response.status === 404 || response.status === 400)
      throw new Error("PubChem has no matching 3D conformer for this structure. This does not mean your drawing is invalid.");
    if (response.status === 429 || response.status === 503)
      throw new Error("PubChem is busy. Please retry in a moment.");
    throw new Error(`3D lookup failed (HTTP ${response.status}). Please retry.`);
  }
  const sdf = await response.text();
  if (sdf.length > 2_000_000 || !sdf.includes("M  END"))
    throw new Error("The service returned an unsupported structure file.");
  return sdf;
}
````

## CREATE NEW FILE

FILE: `src/engine/export.ts`

````typescript
import type { Molecule } from "../types/chem";
import { bounds } from "./geometry";
import {
  renderContext,
  atomLabel,
  bondSegments,
  type RenderOptions,
} from "./rendering";
import { elementColor } from "../utils/elementColor";
import { chargeLabel } from "../utils/format";
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export function moleculeSvg(m: Molecule, options: Partial<RenderOptions> = {}) {
  const box = bounds(m.atoms);
  const width = Math.max(180, box.width + 130),
    height = Math.max(160, box.height + 130);
  const dark = options.dark ?? false,
    bg = dark ? "#222127" : "#fffefa",
    ink = dark ? "#f1edf4" : "#2d2b32";
  const context = renderContext(m);
  const label = (a: Molecule["atoms"][number]) =>
    atomLabel(a, context.adj.get(a.id)?.length || 0, options.showCarbons);
  let body = "";
  for (const b of m.bonds) {
    const a = context.atomMap.get(b.atomA),
      d = context.atomMap.get(b.atomB);
    if (!a || !d) continue;
    for (const p of bondSegments(b, a, d, label(a), label(d)))
      body += `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${ink}" stroke-width="${p.dashed ? 1.35 : 1.85}" stroke-linecap="round" ${p.dashed ? 'stroke-dasharray="4 4"' : ""}/>`;
  }
  for (const a of m.atoms) {
    const color = elementColor(a.element, dark),
      h = context.valences.get(a.id)!.implicitH;
    const text = (
      x: number,
      y: number,
      value: string,
      size: number,
      anchor = "middle",
    ) =>
      `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Arial,sans-serif" font-size="${size}" paint-order="stroke" stroke="${bg}" stroke-width="3" stroke-linejoin="round">${value}</text>`;
    if (label(a)) {
      body += text(a.x, a.y + 7, escape(a.element), 20);
      if ((options.showHydrogens ?? true) && h > 0)
        body += text(
          a.x + (a.element.length > 1 ? 16 : 11),
          a.y + 6,
          `H${h > 1 ? `<tspan font-size="10" dy="3">${h}</tspan>` : ""}`,
          16,
          "start",
        );
    }
    if (a.charge)
      body += text(a.x - 13, a.y - 12, escape(chargeLabel(a.charge)), 12);
    if (a.isotope) body += text(a.x - 15, a.y - 11, String(a.isotope), 10);
    for (let i = 0; i < Math.min(a.lonePairs, 4); i++) {
      body += `<g transform="translate(${a.x} ${a.y}) rotate(${i * 90})"><circle cx="-3" cy="-23" r="1.4" fill="${ink}"/><circle cx="3" cy="-23" r="1.4" fill="${ink}"/></g>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${box.x - 65} ${box.y - 65} ${width} ${height}"><title>${escape(m.metadata.name)}</title><rect x="${box.x - 65}" y="${box.y - 65}" width="${width}" height="${height}" fill="${bg}"/>${body}</svg>`;
}
export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function exportMolecule(
  m: Molecule,
  format: "png" | "svg" | "json",
  options: Partial<RenderOptions> = {},
) {
  const name = (m.metadata.name || "molecule")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .toLowerCase();
  if (format === "json") {
    downloadBlob(
      new Blob([JSON.stringify(m, null, 2)], { type: "application/json" }),
      `${name}.json`,
    );
    return;
  }
  const svg = moleculeSvg(m, options);
  if (format === "svg") {
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("Unable to render structure image."));
      image.src = url;
    });
    const scale = Math.min(3, 4096 / image.width, 4096 / image.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(image.width * scale);
    canvas.height = Math.ceil(image.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Canvas export is not supported by this browser.");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encoding failed."))),
        "image/png",
      ),
    );
    downloadBlob(blob, `${name}.png`);
  } finally {
    URL.revokeObjectURL(url);
  }
}
export async function copyText(text: string) {
  if (!text) throw new Error("There is no SMILES string to copy.");
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    if (!ok)
      throw new Error(
        "Clipboard blocked. Select and copy the SMILES text manually.",
      );
  }
}
````

## CREATE NEW FILE

FILE: `src/engine/formula.ts`

````typescript
import type { Molecule } from "../types/chem";
import { valenceMap } from "./valence";
export function composition(m: Molecule) {
  const v = valenceMap(m);
  const c: Record<string, number> = {};
  for (const a of m.atoms) {
    c[a.element] = (c[a.element] || 0) + 1;
    const h = v.get(a.id)!.implicitH;
    if (h) c.H = (c.H || 0) + h;
  }
  return c;
}
export function formulaFromComposition(c: Record<string, number>) {
  const keys = Object.keys(c)
    .filter((k) => c[k] > 0)
    .sort();
  const ordered = c.C
    ? [
        "C",
        ...(c.H ? ["H"] : []),
        ...keys.filter((k) => k !== "C" && k !== "H"),
      ]
    : keys;
  return ordered.map((k) => k + (c[k] === 1 ? "" : c[k])).join("");
}
export const molecularFormula = (m: Molecule) =>
  formulaFromComposition(composition(m));
````

## CREATE NEW FILE

FILE: `src/engine/geometry.ts`

````typescript
import type { Point } from "../types/editor";
export const distance = (a: Point, b: Point) =>
  Math.hypot(a.x - b.x, a.y - b.y);
export const pointInRect = (p: Point, a: Point, b: Point) =>
  p.x >= Math.min(a.x, b.x) &&
  p.x <= Math.max(a.x, b.x) &&
  p.y >= Math.min(a.y, b.y) &&
  p.y <= Math.max(a.y, b.y);
export const bounds = (points: Point[]) => {
  if (!points.length) return { x: 0, y: 0, width: 1, height: 1 };
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX || 1,
    height: maxY - minY || 1,
  };
};
export function clippedLine(a: Point, b: Point, padA = 0, padB = 0) {
  const d = distance(a, b) || 1;
  const dx = (b.x - a.x) / d,
    dy = (b.y - a.y) / d;
  return {
    x1: a.x + dx * Math.min(padA, d * 0.38),
    y1: a.y + dy * Math.min(padA, d * 0.38),
    x2: b.x - dx * Math.min(padB, d * 0.38),
    y2: b.y - dy * Math.min(padB, d * 0.38),
    nx: -dy,
    ny: dx,
  };
}
````

## CREATE NEW FILE

FILE: `src/engine/molecularWeight.ts`

````typescript
import type { Molecule } from "../types/chem";
import { ELEMENTS, ISOTOPE_MASSES } from "../utils/elementData";
import { valenceMap } from "./valence";
export function molecularWeight(m: Molecule): number | null {
  const v = valenceMap(m);
  let total = 0;
  for (const a of m.atoms) {
    const weight = a.isotope
      ? ISOTOPE_MASSES[`${a.element}:${a.isotope}`]
      : ELEMENTS[a.element]?.weight;
    if (weight === undefined) return null;
    total += weight + v.get(a.id)!.implicitH * ELEMENTS.H.weight;
  }
  return total;
}
````

## CREATE NEW FILE

FILE: `src/engine/rendering.ts`

````typescript
import type { Atom, Molecule, Bond } from "../types/chem";
import { clippedLine } from "./geometry";
import { valenceMap } from "./valence";
import { adjacency } from "./chemistry";
export interface RenderOptions {
  showCarbons: boolean;
  showHydrogens: boolean;
  dark: boolean;
}
export function atomLabel(a: Atom, degree: number, showCarbons = false) {
  return (
    a.element !== "C" ||
    showCarbons ||
    degree === 0 ||
    a.charge !== 0 ||
    !!a.isotope
  );
}
export function bondSegments(
  b: Bond,
  a: Atom,
  d: Atom,
  labelA: boolean,
  labelB: boolean,
) {
  const p = clippedLine(a, d, labelA ? 18 : 0, labelB ? 18 : 0);
  const offsets =
    b.type === "double"
      ? [-2.7, 2.7]
      : b.type === "triple"
        ? [-4.5, 0, 4.5]
        : b.type === "aromatic"
          ? [0, 6]
          : [0];
  return offsets.map((offset, i) => ({
    x1: p.x1 + p.nx * offset,
    y1: p.y1 + p.ny * offset,
    x2: p.x2 + p.nx * offset,
    y2: p.y2 + p.ny * offset,
    dashed: b.type === "aromatic" && i === 1,
  }));
}
export function renderContext(m: Molecule) {
  return {
    valences: valenceMap(m),
    adj: adjacency(m),
    atomMap: new Map(m.atoms.map((a) => [a.id, a])),
  };
}
````

## CREATE NEW FILE

FILE: `src/engine/rings.ts`

````typescript
import type { Molecule, Atom, Bond } from "../types/chem";
import { adjacency, connectedComponents } from "./chemistry";
import { BOND_LENGTH } from "../utils/canvasConfig";
export function cycleRank(m: Molecule) {
  const ids = new Set(m.atoms.map((a) => a.id));
  return Math.max(
    0,
    m.bonds.filter(
      (b) => b.atomA !== b.atomB && ids.has(b.atomA) && ids.has(b.atomB),
    ).length -
      m.atoms.length +
      connectedComponents(m),
  );
}
export function aromaticCycleRank(m: Molecule) {
  const ids = new Set(m.atoms.filter((a) => a.aromatic).map((a) => a.id));
  return cycleRank({
    ...m,
    atoms: m.atoms.filter((a) => ids.has(a.id)),
    bonds: m.bonds.filter(
      (b) => b.type === "aromatic" && ids.has(b.atomA) && ids.has(b.atomB),
    ),
  });
}
export function ringBondIds(m: Molecule) {
  const adj = adjacency(m);
  const discovery = new Map<string, number>(),
    low = new Map<string, number>(),
    bridges = new Set<string>();
  let time = 0;
  function visit(id: string, parentBond?: string) {
    discovery.set(id, ++time);
    low.set(id, time);
    for (const n of adj.get(id) || []) {
      if (n.bond.id === parentBond) continue;
      if (!discovery.has(n.atomId)) {
        visit(n.atomId, n.bond.id);
        low.set(id, Math.min(low.get(id)!, low.get(n.atomId)!));
        if (low.get(n.atomId)! > discovery.get(id)!) bridges.add(n.bond.id);
      } else low.set(id, Math.min(low.get(id)!, discovery.get(n.atomId)!));
    }
  }
  for (const a of m.atoms) if (!discovery.has(a.id)) visit(a.id);
  return new Set(m.bonds.filter((b) => !bridges.has(b.id)).map((b) => b.id));
}
export function makeRing(x: number, y: number, size: 5 | 6, aromatic = false) {
  const radius = BOND_LENGTH / (2 * Math.sin(Math.PI / size));
  const atoms: Atom[] = Array.from({ length: size }, (_, i) => ({
    id: crypto.randomUUID(),
    element: "C",
    x: x + radius * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / size),
    y: y + radius * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / size),
    charge: 0,
    aromatic,
    lonePairs: 0,
  }));
  const bonds: Bond[] = atoms.map((a, i) => ({
    id: crypto.randomUUID(),
    atomA: a.id,
    atomB: atoms[(i + 1) % size].id,
    type: aromatic ? "aromatic" : "single",
  }));
  return { atoms, bonds };
}
````

## CREATE NEW FILE

FILE: `src/engine/smiles.ts`

````typescript
import type { Atom, Molecule, Bond } from "../types/chem";
import { adjacency } from "./chemistry";
import { valenceMap } from "./valence";
import { validateMolecule } from "./validation";
export interface SmilesResult {
  smiles: string;
  error: string | null;
}
export function generateSmiles(m: Molecule): SmilesResult {
  if (!m.atoms.length) return { smiles: "", error: null };
  if (m.atoms.length > 1500)
    return {
      smiles: "",
      error: "SMILES export is limited to 1,500 drawn atoms.",
    };
  const vals = valenceMap(m);
  const issues = validateMolecule(m);
  if (
    issues.some(
      (w) =>
        w.severity === "error" ||
        /exceeds|Incomplete aromatic|Unsupported aromatic|Charged aromatic|Stereochemistry|Bond stereochemistry/.test(
          w.message,
        ),
    )
  )
    return {
      smiles: "",
      error:
        "Resolve valence, aromaticity or stereochemistry warnings before SMILES export.",
    };
  if (m.atoms.some((a) => vals.get(a.id)!.unsupported && a.element !== "R"))
    return {
      smiles: "",
      error: "SMILES unavailable for an unsupported element or charge state.",
    };
  const adj = adjacency(m),
    atomMap = new Map(m.atoms.map((a) => [a.id, a]));
  const visited = new Set<string>(),
    treeEdges = new Set<string>(),
    children = new Map<string, { id: string; bond: Bond }[]>(),
    roots: string[] = [];
  function walk(id: string) {
    visited.add(id);
    children.set(id, []);
    for (const n of adj.get(id) || [])
      if (!visited.has(n.atomId)) {
        treeEdges.add(n.bond.id);
        children.get(id)!.push({ id: n.atomId, bond: n.bond });
        walk(n.atomId);
      }
  }
  try {
    for (const a of m.atoms)
      if (!visited.has(a.id)) {
        roots.push(a.id);
        walk(a.id);
      }
    const closures = new Map<
      string,
      { label: string; bond: Bond; first: boolean }[]
    >();
    let ring = 0;
    for (const b of m.bonds)
      if (!treeEdges.has(b.id)) {
        ring++;
        if (ring > 99)
          return {
            smiles: "",
            error: "SMILES supports at most 99 ring closures.",
          };
        const label = ring < 10 ? `${ring}` : `%${ring}`;
        for (const [id, first] of [
          [b.atomA, true],
          [b.atomB, false],
        ] as const) {
          closures.set(id, [
            ...(closures.get(id) || []),
            { label, bond: b, first },
          ]);
        }
      }
    function bondSymbol(b: Bond) {
      if (b.type === "double") return "=";
      if (b.type === "triple") return "#";
      if (b.type === "aromatic") return "";
      return atomMap.get(b.atomA)?.aromatic && atomMap.get(b.atomB)?.aromatic
        ? "-"
        : "";
    }
    function token(a: Atom) {
      if (a.element === "R") return "*";
      const h = vals.get(a.id)!.implicitH;
      const symbol = a.aromatic ? a.element.toLowerCase() : a.element;
      const organic = [
        "B",
        "C",
        "N",
        "O",
        "P",
        "S",
        "F",
        "Cl",
        "Br",
        "I",
      ].includes(a.element);
      const needsBracket =
        !!a.isotope ||
        a.charge !== 0 ||
        !organic ||
        a.hydrogenOverride !== undefined ||
        (a.aromatic && a.element !== "C" && h > 0);
      if (!needsBracket) return symbol;
      const charge =
        a.charge === 0
          ? ""
          : `${a.charge > 0 ? "+" : "-"}${Math.abs(a.charge) > 1 ? Math.abs(a.charge) : ""}`;
      return `[${a.isotope || ""}${symbol}${h ? "H" + (h > 1 ? h : "") : ""}${charge}]`;
    }
    function render(id: string): string {
      let text = token(atomMap.get(id)!);
      for (const c of closures.get(id) || [])
        text += (c.first ? bondSymbol(c.bond) : "") + c.label;
      const next = children.get(id) || [];
      next.forEach((n, i) => {
        const part = bondSymbol(n.bond) + render(n.id);
        text += i < next.length - 1 ? `(${part})` : part;
      });
      return text;
    }
    return { smiles: roots.map(render).join("."), error: null };
  } catch {
    return { smiles: "", error: "This graph could not be serialized safely." };
  }
}
````

## CREATE NEW FILE

FILE: `src/engine/templates.ts`

````typescript
import { emptyMolecule } from "../models/Molecule";
import { makeRing } from "./rings";
import type { Molecule } from "../types/chem";
export function template(name: "benzene" | "ethanol" | "aspirin"): Molecule {
  const m = emptyMolecule();
  m.metadata.name =
    name === "benzene" ? "Benzene" : name === "ethanol" ? "Ethanol" : "Aspirin";
  const add = (element: string, x: number, y: number) => {
    const a = {
      id: crypto.randomUUID(),
      element,
      x,
      y,
      charge: 0,
      aromatic: false,
      lonePairs: 0,
    };
    m.atoms.push(a);
    return a.id;
  };
  const bond = (a: string, b: string, type: "single" | "double" = "single") =>
    m.bonds.push({ id: crypto.randomUUID(), atomA: a, atomB: b, type });
  if (name === "ethanol") {
    const a = add("C", -65, 20),
      b = add("C", 0, -16),
      c = add("O", 65, 20);
    bond(a, b);
    bond(b, c);
    return m;
  }
  const r = makeRing(0, 0, 6, true);
  m.atoms.push(...r.atoms);
  m.bonds.push(...r.bonds);
  if (name === "aspirin") {
    const a = r.atoms[1],
      b = r.atoms[2];
    const carbon = add("C", a.x + 64, a.y - 32),
      o = add("O", a.x + 64, a.y - 96),
      oh = add("O", a.x + 120, a.y);
    bond(a.id, carbon);
    bond(carbon, o, "double");
    bond(carbon, oh);
    const ester = add("O", b.x + 56, b.y + 32),
      cc = add("C", b.x + 112, b.y + 64),
      oo = add("O", b.x + 112, b.y + 128),
      methyl = add("C", b.x + 168, b.y + 32);
    bond(b.id, ester);
    bond(ester, cc);
    bond(cc, oo, "double");
    bond(cc, methyl);
  }
  return m;
}
````

## REPLACE FILE

FILE: `src/engine/valence.ts`

````typescript
import type { Atom, Molecule } from "../types/chem";
import { ELEMENTS } from "../utils/elementData";
import { adjacency, bondOrder, type Neighbor } from "./chemistry";
export interface ValenceInfo {
  used: number;
  target: number | null;
  implicitH: number;
  over: boolean;
  unsupported: boolean;
  allowed: number[];
}
export function atomValence(
  a: Atom,
  m: Molecule,
  neighbors?: Neighbor[],
): ValenceInfo {
  const es = neighbors || adjacency(m).get(a.id) || [];
  const used = es.reduce((n, e) => n + bondOrder(e.bond.type), 0);
  const data = ELEMENTS[a.element];
  let allowed = data?.valences || [];
  let unsupported = !data;
  if (a.charge !== 0) {
    if (a.element === "C" && Math.abs(a.charge) === 1) allowed = [3];
    else if (a.element === "N" && a.charge === 1) allowed = [4];
    else if (a.element === "N" && a.charge === -1) allowed = [2];
    else if (a.element === "O" && a.charge === 1) allowed = [3];
    else if (a.element === "O" && a.charge === -1) allowed = [1];
    else if (a.element === "B" && a.charge === -1) allowed = [4];
    else if (["F", "Cl", "Br", "I", "H"].includes(a.element) && a.charge === -1)
      allowed = [0];
    else if (a.element === "H" && a.charge === 1) allowed = [0];
    else if (!data?.implicit) allowed = data?.valences || [];
    else unsupported = true;
  }
  const arom = es.filter((e) => e.bond.type === "aromatic").length;
  // Aromatic heteroatom hydrogens require an explicit override; pyridine-like n is default.
  let implicitH = 0;
  const target = allowed.find((v) => v >= used) ?? allowed.at(-1) ?? null;
  if (data?.implicit && !unsupported) {
    if (a.aromatic && arom) {
      if (a.element === "C") implicitH = Math.max(0, Math.floor(3 - es.length));
      else implicitH = 0;
    } else implicitH = Math.max(0, Math.floor((target ?? used) - used));
  }
  if (a.hydrogenOverride !== undefined) implicitH = a.hydrogenOverride;
  const specialAromatic =
    a.aromatic && arom >= 2 && ["N", "O", "S", "P"].includes(a.element);
  const effective = specialAromatic
    ? es.reduce(
        (n, e) => n + (e.bond.type === "aromatic" ? 1 : bondOrder(e.bond.type)),
        0,
      )
    : used;
  const over =
    target !== null && effective + implicitH > Math.max(...allowed) + 0.01;
  return { used, target, implicitH, over, unsupported, allowed };
}
export function valenceMap(m: Molecule) {
  const adj = adjacency(m);
  return new Map(m.atoms.map((a) => [a.id, atomValence(a, m, adj.get(a.id))]));
}
````

## CREATE NEW FILE

FILE: `src/engine/validation.ts`

````typescript
import type { Molecule } from "../types/chem";
import type { Warning } from "../types/analysis";
import { valenceMap } from "./valence";
import { ELEMENTS, ISOTOPE_MASSES } from "../utils/elementData";
import { adjacency } from "./chemistry";
import { ringBondIds } from "./rings";
export function validateMolecule(m: Molecule): Warning[] {
  const warnings: Warning[] = [];
  const vals = valenceMap(m),
    adj = adjacency(m),
    ids = new Set(m.atoms.map((a) => a.id));
  const pairs = new Set<string>();
  for (const b of m.bonds) {
    if (!ids.has(b.atomA) || !ids.has(b.atomB) || b.atomA === b.atomB)
      warnings.push({ severity: "error", message: "Invalid bond reference." });
    const key = [b.atomA, b.atomB].sort().join("|");
    if (pairs.has(key))
      warnings.push({
        severity: "error",
        message: "Duplicate bond between atoms.",
      });
    pairs.add(key);
  }
  const ringEdges = ringBondIds(m);
  for (const a of m.atoms) {
    const v = vals.get(a.id)!,
      label = ELEMENTS[a.element]?.name || a.element;
    const add = (message: string, severity: "warning" | "error" = "warning") =>
      warnings.push({ atomId: a.id, message, severity });
    if (!ELEMENTS[a.element])
      add(
        a.element === "R"
          ? "R-group is unspecified; formula and mass are incomplete."
          : "Unrecognized element; chemistry is incomplete.",
      );
    else if (v.unsupported)
      add(`${label}: unsupported charge / valence state.`);
    if (v.over)
      add(
        `${label} exceeds typical valence (${v.used} bond order; ${v.implicitH} implicit H).`,
      );
    if (a.hydrogenOverride !== undefined && a.hydrogenOverride > 8)
      add("Unusual explicit hydrogen override.");
    if (
      ELEMENTS[a.element] &&
      !ELEMENTS[a.element].implicit &&
      a.element !== "H"
    )
      add(`${label}: metal bonding is not modeled; implicit H is disabled.`);
    const es = adj.get(a.id) || [];
    if (a.aromatic) {
      const aromatic = es.filter((e) => e.bond.type === "aromatic");
      if (
        aromatic.length < 2 ||
        aromatic.some((e) => !ringEdges.has(e.bond.id))
      )
        add("Incomplete aromatic system; use a closed aromatic ring.");
      if (!["C", "N", "O", "P", "S", "B"].includes(a.element))
        add("Unsupported aromatic element.");
      if (a.charge !== 0)
        add("Charged aromatic states require toolkit verification.");
    }
    if (es.some((e) => e.bond.type === "aromatic") && !a.aromatic)
      add("Aromatic bond endpoint is not marked aromatic.", "error");
    if (a.isotope && !ISOTOPE_MASSES[`${a.element}:${a.isotope}`])
      add("Isotope mass unavailable; molecular weight is not reported.");
    if (a.stereo) add("Stereochemistry is stored but not interpreted.");
    if (a.lonePairs > 0)
      add(
        "Lone pairs are visual annotations; electron counting is not validated.",
      );
  }
  if (m.bonds.some((b) => b.stereo))
    warnings.push({
      severity: "warning",
      message: "Bond stereochemistry is stored but not interpreted.",
    });
  return warnings;
}
````

## CREATE NEW FILE

FILE: `src/hooks/useCanvasInteraction.ts`

````typescript
import {
  useEffect,
  useCallback,
  useRef,
  useState,
  type RefObject,
  type PointerEvent as RPointerEvent,
} from "react";
import { useUIStore } from "../store/chemUIStore";
import { useMoleculeStore } from "../store/moleculeStore";
import {
  screenToWorld,
  targetId,
} from "../Components/canvas/canvasInteractions";
import { pointInRect } from "../engine/geometry";
import type { Point } from "../types/editor";
interface Gesture {
  kind: "move" | "pan" | "lasso";
  start: Point;
  screen: Point;
  pan: Point;
  positions: Map<string, Point>;
  additive: boolean;
  selection: string[];
  pointerId: number;
}
export function useCanvasInteraction(ref: RefObject<SVGSVGElement | null>) {
  const gesture = useRef<Gesture | null>(null),
    space = useRef(false);
  const [lasso, setLasso] = useState<{ a: Point; b: Point } | null>(null);
  const point = (e: { clientX: number; clientY: number }) => {
    const u = useUIStore.getState();
    return screenToWorld(
      e.clientX,
      e.clientY,
      ref.current!.getBoundingClientRect(),
      u.pan,
      u.zoom,
    );
  };
  const cancel = useCallback(() => {
    const g = gesture.current;
    if (g?.kind === "move") useMoleculeStore.getState().endDrag(true);
    if (g?.kind === "pan") useUIStore.getState().set({ pan: g.pan });
    if (g && ref.current?.hasPointerCapture(g.pointerId))
      ref.current.releasePointerCapture(g.pointerId);
    gesture.current = null;
    setLasso(null);
  }, [ref]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        useUIStore.getState().dialog ||
        (e.target as HTMLElement)?.matches("input,textarea,select")
      )
        return;
      if (e.code === "Space") {
        space.current = true;
        e.preventDefault();
      }
      if (
        e.key === "Escape" ||
        ((e.ctrlKey || e.metaKey) && ["z", "y"].includes(e.key.toLowerCase()))
      )
        cancel();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") space.current = false;
    };
    const blur = () => {
      space.current = false;
      cancel();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    const el = ref.current;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const u = useUIStore.getState(),
        r = el!.getBoundingClientRect();
      const w = screenToWorld(e.clientX, e.clientY, r, u.pan, u.zoom);
      const zoom = Math.max(
        0.2,
        Math.min(4, u.zoom * Math.exp(-e.deltaY * 0.0012)),
      );
      useUIStore.getState().set({
        zoom,
        pan: {
          x: e.clientX - r.left - r.width / 2 - w.x * zoom,
          y: e.clientY - r.top - r.height / 2 - w.y * zoom,
        },
      });
    };
    el?.addEventListener("wheel", wheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      el?.removeEventListener("wheel", wheel);
    };
  }, [cancel, ref]);
  function onPointerDown(e: RPointerEvent<SVGSVGElement>) {
    if (e.button !== 0 && e.button !== 1) return;
    e.preventDefault();
    const u = useUIStore.getState(),
      s = useMoleculeStore.getState(),
      p = point(e),
      atomId = targetId(e.target, "atom"),
      bondId = targetId(e.target, "bond");
    ref.current?.focus();
    if (e.button === 1 || space.current || u.tool === "pan") {
      gesture.current = {
        kind: "pan",
        start: p,
        screen: { x: e.clientX, y: e.clientY },
        pan: { ...u.pan },
        positions: new Map(),
        selection: [],
        additive: false,
        pointerId: e.pointerId,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    if (u.tool === "erase") {
      if (atomId || bondId)
        s.remove(atomId ? [atomId] : [], bondId ? [bondId] : []);
      return;
    }
    if (atomId) {
      const a = s.molecule.atoms.find((v) => v.id === atomId)!;
      if (u.tool === "draw") {
        s.patchAtom(atomId, { element: u.atom, hydrogenOverride: undefined });
        return;
      }
      if (u.tool === "charge") {
        s.patchAtom(atomId, {
          charge: Math.max(
            -8,
            Math.min(8, a.charge + (e.altKey ? -u.chargeDelta : u.chargeDelta)),
          ),
        });
        return;
      }
      if (u.tool === "lonePair") {
        s.patchAtom(atomId, { lonePairs: (a.lonePairs + 1) % 5 });
        return;
      }
      if (u.tool === "hydrogen") {
        s.mutate("Add explicit hydrogen", (m) => {
          const count = m.bonds.filter(
              (b) => b.atomA === a.id || b.atomB === a.id,
            ).length,
            angle = (count * Math.PI) / 3;
          const id = crypto.randomUUID();
          m.atoms.push({
            id,
            element: "H",
            x: a.x + 48 * Math.cos(angle),
            y: a.y + 48 * Math.sin(angle),
            charge: 0,
            aromatic: false,
            lonePairs: 0,
          });
          m.bonds.push({
            id: crypto.randomUUID(),
            atomA: a.id,
            atomB: id,
            type: "single",
          });
        });
        return;
      }
      if (u.tool === "bond") {
        if (u.pendingAtom && u.pendingAtom !== atomId) {
          s.addBond(u.pendingAtom, atomId, u.bond);
          u.set({ pendingAtom: null });
        } else u.set({ pendingAtom: atomId });
        return;
      }
      if (u.tool === "select") {
        const ids = e.shiftKey
          ? s.selectedAtoms.includes(atomId)
            ? s.selectedAtoms.filter((id) => id !== atomId)
            : [...s.selectedAtoms, atomId]
          : s.selectedAtoms.includes(atomId)
            ? s.selectedAtoms
            : [atomId];
        s.setSelection(ids);
        if (!ids.includes(atomId)) return;
        s.beginDrag();
        gesture.current = {
          kind: "move",
          start: p,
          screen: { x: e.clientX, y: e.clientY },
          pan: u.pan,
          positions: new Map(
            s.molecule.atoms
              .filter((a) => ids.includes(a.id))
              .map((a) => [a.id, { x: a.x, y: a.y }]),
          ),
          selection: ids,
          additive: e.shiftKey,
          pointerId: e.pointerId,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
        return;
      }
    }
    if (bondId) {
      if (u.tool === "bond") {
        s.patchBond(bondId, u.bond);
        u.set({ pendingAtom: null });
        return;
      }
      if (u.tool === "select") {
        s.setSelection(
          [],
          e.shiftKey ? [...new Set([...s.selectedBonds, bondId])] : [bondId],
        );
        return;
      }
    }
    if (u.tool === "lasso") {
      gesture.current = {
        kind: "lasso",
        start: p,
        screen: { x: e.clientX, y: e.clientY },
        pan: u.pan,
        positions: new Map(),
        additive: e.shiftKey,
        selection: s.selectedAtoms,
        pointerId: e.pointerId,
      };
      setLasso({ a: p, b: p });
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    if (atomId || bondId) return;
    if (u.tool === "draw") s.addAtom(p.x, p.y, u.atom);
    else if (u.tool === "ring") s.addRing(p.x, p.y, u.ring, u.benzene);
    else if (u.tool === "bond") {
      if (u.pendingAtom) {
        const from = u.pendingAtom;
        let id = "";
        s.mutate("Extend bond", (m) => {
          const start = m.atoms.find((a) => a.id === from);
          if (!start) return;
          const angle =
            (Math.round(
              Math.atan2(p.y - start.y, p.x - start.x) / (Math.PI / 6),
            ) *
              Math.PI) /
            6;
          id = crypto.randomUUID();
          m.atoms.push({
            id,
            element: u.atom,
            x: start.x + 64 * Math.cos(angle),
            y: start.y + 64 * Math.sin(angle),
            charge: 0,
            aromatic: false,
            lonePairs: 0,
          });
          m.bonds.push({
            id: crypto.randomUUID(),
            atomA: from,
            atomB: id,
            type: u.bond,
          });
        });
        u.set({ pendingAtom: id || null });
      } else {
        s.addAtom(p.x, p.y, u.atom);
        u.set({
          pendingAtom:
            useMoleculeStore.getState().molecule.atoms.at(-1)?.id || null,
        });
      }
    } else if (u.tool === "select") s.setSelection([]);
  }
  function onPointerMove(e: RPointerEvent<SVGSVGElement>) {
    const p = point(e),
      g = gesture.current;
    useUIStore.getState().set({ cursor: p });
    if (!g) return;
    if (g.kind === "pan") {
      useUIStore.getState().set({
        pan: {
          x: g.pan.x + e.clientX - g.screen.x,
          y: g.pan.y + e.clientY - g.screen.y,
        },
      });
    } else if (g.kind === "move") {
      const positions = new Map(
        [...g.positions].map(([id, v]) => [
          id,
          { x: v.x + p.x - g.start.x, y: v.y + p.y - g.start.y },
        ]),
      );
      useMoleculeStore.getState().moveAtoms(positions);
    } else setLasso({ a: g.start, b: p });
  }
  function onPointerUp(e: RPointerEvent<SVGSVGElement>) {
    const g = gesture.current;
    if (!g) return;
    if (g.kind === "move") useMoleculeStore.getState().endDrag();
    if (g.kind === "lasso") {
      const s = useMoleculeStore.getState(),
        p = point(e);
      const ids = s.molecule.atoms
        .filter((a) => pointInRect(a, g.start, p))
        .map((a) => a.id);
      s.setSelection([
        ...new Set([...(g.additive ? g.selection : []), ...ids]),
      ]);
    }
    gesture.current = null;
    setLasso(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  }
  return {
    lasso,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: cancel,
  };
}
````

## CREATE NEW FILE

FILE: `src/hooks/useKeyboardShortcuts.ts`

````typescript
import { useEffect } from "react";
import { useMoleculeStore } from "../store/moleculeStore";
import { useUIStore } from "../store/chemUIStore";
export function useKeyboardShortcuts() {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement)?.matches(
          "input,textarea,select,[contenteditable=true]",
        )
      )
        return;
      const u = useUIStore.getState(),
        m = useMoleculeStore.getState();
      if (u.dialog) return;
      const k = e.key.toLowerCase(),
        mod = e.ctrlKey || e.metaKey;
      if (mod) {
        if (["z", "y", "s", "n"].includes(k)) e.preventDefault();
        if (k === "z") {
          if (e.shiftKey) m.redo();
          else m.undo();
        } else if (k === "y") m.redo();
        else if (k === "s") m.save();
        else if (k === "n") u.set({ dialog: "new" });
        return;
      }
      if (e.altKey) return;
      if (k === "delete" || k === "backspace") {
        e.preventDefault();
        m.remove(m.selectedAtoms, m.selectedBonds);
      } else if (k === "escape") {
        u.set({ pendingAtom: null, tool: "select" });
        m.setSelection([]);
      } else if (["v", "e", "l"].includes(k)) {
        u.set({
          tool: ({ v: "select", e: "erase", l: "lasso" } as const)[
            k as "v" | "e" | "l"
          ],
          pendingAtom: null,
        });
      } else if (["1", "2", "3"].includes(k)) {
        u.set({
          tool: "bond",
          bond: ({ "1": "single", "2": "double", "3": "triple" } as const)[
            k as "1" | "2" | "3"
          ],
          pendingAtom: null,
        });
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
}
````

## CREATE NEW FILE

FILE: `src/hooks/useMoleculeAnalysis.ts`

````typescript
import { useMemo } from "react";
import { useMoleculeStore } from "../store/moleculeStore";
import { analyzeMolecule } from "../engine/analysis";
import type { Molecule } from "../models/Molecule";

/** Chemistry-only signature: dragging coordinates does not rerun analysis.
 * This memo is local to the hook, with no shared render-time mutation.
 */
export function useMoleculeAnalysis() {
  const m = useMoleculeStore((s) => s.molecule);
  const signature = useMemo(
    () =>
      JSON.stringify({
        version: 1,
        atoms: m.atoms.map((a) => ({ ...a, x: 0, y: 0 })),
        bonds: m.bonds,
        metadata: { name: "", createdAt: "", updatedAt: "" },
      }),
    [m],
  );
  return useMemo(
    () => analyzeMolecule(JSON.parse(signature) as Molecule),
    [signature],
  );
}
````

## REPLACE FILE

FILE: `src/main.tsx`

````tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/animations.css";
createRoot(document.getElementById("root")!).render(<App />);
````

## CREATE NEW FILE

FILE: `src/models/Atom.ts`

````typescript
export interface Atom {
  id: string;
  element: string;
  x: number;
  y: number;
  charge: number;
  isotope?: number;
  aromatic: boolean;
  lonePairs: number;
  hydrogenOverride?: number;
  stereo?: "@" | "@@";
}
````

## CREATE NEW FILE

FILE: `src/models/Bond.ts`

````typescript
export type BondType = "single" | "double" | "triple" | "aromatic";
export interface Bond {
  id: string;
  atomA: string;
  atomB: string;
  type: BondType;
  stereo?: "up" | "down";
}
````

## CREATE NEW FILE

FILE: `src/models/History.ts`

````typescript
import type { Molecule } from "./Molecule";
export interface HistoryEntry {
  molecule: Molecule;
  label: string;
}
````

## CREATE NEW FILE

FILE: `src/models/Molecule.ts`

````typescript
import type { Atom } from "./Atom";
import type { Bond } from "./Bond";
export interface Molecule {
  version: 1;
  atoms: Atom[];
  bonds: Bond[];
  metadata: { name: string; createdAt: string; updatedAt: string };
}
export const emptyMolecule = (): Molecule => ({
  version: 1,
  atoms: [],
  bonds: [],
  metadata: {
    name: "Untitled molecule",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});
````

## CREATE NEW FILE

FILE: `src/pages/EditorPage.tsx`

````tsx
export { Editor as EditorPage } from "../Components/editor/Editor";
````

## CREATE NEW FILE

FILE: `src/pages/LandingPage.tsx`

````tsx
export { Intro as LandingPage } from "../Components/intro/Intro";
````

## REPLACE FILE

FILE: `src/store/chemUIStore.ts`

````typescript
import { create } from "zustand";
import type { WorkspaceTool, Point, Dialog } from "../types/editor";
import type { BondType } from "../types/chem";
import { readPreference, writePreference } from "../utils/storage";
interface UIState {
  tool: WorkspaceTool;
  atom: string;
  bond: BondType;
  ring: 5 | 6;
  benzene: boolean;
  chargeDelta: number;
  zoom: number;
  pan: Point;
  cursor: Point;
  theme: "light" | "dark";
  expanded: boolean;
  showCarbons: boolean;
  showHydrogens: boolean;
  showGrid: boolean;
  dialog: Dialog;
  pendingAtom: string | null;
  fitVersion: number;
  toast: string;
  set: (patch: Partial<Omit<UIState, "set" | "notify" | "setTheme">>) => void;
  notify: (message: string) => void;
  setTheme: (theme: "light" | "dark") => void;
}
let timer: ReturnType<typeof setTimeout>;
export const useUIStore = create<UIState>((set) => ({
  tool: "draw",
  atom: "C",
  bond: "single",
  ring: 6,
  benzene: true,
  chargeDelta: 1,
  zoom: 1,
  pan: { x: 0, y: 0 },
  cursor: { x: 0, y: 0 },
  theme:
    readPreference(
      "chemease.theme",
      typeof matchMedia !== "undefined" &&
        matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    ) === "dark"
      ? "dark"
      : "light",
  expanded: true,
  showCarbons: false,
  showHydrogens: true,
  showGrid: true,
  dialog: null,
  pendingAtom: null,
  fitVersion: 0,
  toast: "",
  set: (patch) => set(patch),
  notify: (message) => {
    clearTimeout(timer);
    set({ toast: message });
    timer = setTimeout(() => set({ toast: "" }), 4500);
  },
  setTheme: (theme) => {
    writePreference("chemease.theme", theme);
    set({ theme });
  },
}));
````

## CREATE NEW FILE

FILE: `src/store/historyStore.ts`

````typescript
import { create } from "zustand";
import type { Molecule } from "../types/chem";
import type { HistoryEntry } from "../models/History";
import { HISTORY_LIMIT } from "../utils/canvasConfig";
interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  record: (m: Molecule, label: string) => void;
  undo: (current: Molecule) => Molecule | null;
  redo: (current: Molecule) => Molecule | null;
  clear: () => void;
}
export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  record: (m, label) =>
    set((s) => ({
      past: [...s.past, { molecule: structuredClone(m), label }].slice(
        -HISTORY_LIMIT,
      ),
      future: [],
    })),
  undo: (current) => {
    const { past, future } = get();
    const entry = past.at(-1);
    if (!entry) return null;
    set({
      past: past.slice(0, -1),
      future: [
        ...future,
        { molecule: structuredClone(current), label: entry.label },
      ],
    });
    return structuredClone(entry.molecule);
  },
  redo: (current) => {
    const { past, future } = get();
    const entry = future.at(-1);
    if (!entry) return null;
    set({
      future: future.slice(0, -1),
      past: [
        ...past,
        { molecule: structuredClone(current), label: entry.label },
      ],
    });
    return structuredClone(entry.molecule);
  },
  clear: () => set({ past: [], future: [] }),
}));
````

## CREATE NEW FILE

FILE: `src/store/moleculeStore.ts`

````typescript
import { create } from "zustand";
import type { Atom, BondType, Molecule } from "../types/chem";
import { emptyMolecule } from "../models/Molecule";
import { useHistoryStore } from "./historyStore";
import { useUIStore } from "./chemUIStore";
import { makeRing } from "../engine/rings";
import { saveMolecule, loadMolecule } from "../utils/storage";
interface MoleculeState {
  molecule: Molecule;
  selectedAtoms: string[];
  selectedBonds: string[];
  savedFingerprint: string;
  dragStart: Molecule | null;
  setSelection: (atoms: string[], bonds?: string[]) => void;
  mutate: (label: string, fn: (m: Molecule) => void) => void;
  addAtom: (x: number, y: number, element: string) => void;
  patchAtom: (id: string, patch: Partial<Atom>) => void;
  addBond: (a: string, b: string, type: BondType) => void;
  patchBond: (id: string, type: BondType) => void;
  remove: (atoms: string[], bonds: string[]) => void;
  addRing: (x: number, y: number, size: 5 | 6, aromatic: boolean) => void;
  beginDrag: () => void;
  moveAtoms: (positions: Map<string, { x: number; y: number }>) => void;
  endDrag: (cancel?: boolean) => void;
  undo: () => void;
  redo: () => void;
  newMolecule: () => void;
  save: () => void;
  restore: () => void;
  replace: (m: Molecule) => void;
  rename: (name: string) => void;
}
export function fingerprint(m: Molecule) {
  return JSON.stringify({
    atoms: m.atoms,
    bonds: m.bonds,
    name: m.metadata.name,
  });
}
const initial = emptyMolecule();
function normalize(m: Molecule) {
  const aromaticIds = new Set(
    m.bonds
      .filter((b) => b.type === "aromatic")
      .flatMap((b) => [b.atomA, b.atomB]),
  );
  for (const a of m.atoms) a.aromatic = aromaticIds.has(a.id);
  m.metadata.updatedAt = new Date().toISOString();
}
export const useMoleculeStore = create<MoleculeState>((set, get) => ({
  molecule: initial,
  selectedAtoms: [],
  selectedBonds: [],
  savedFingerprint: fingerprint(initial),
  dragStart: null,
  setSelection: (selectedAtoms, selectedBonds = []) =>
    set({ selectedAtoms, selectedBonds }),
  mutate: (label, fn) => {
    const before = get().molecule,
      next = structuredClone(before);
    fn(next);
    if (next.atoms.length > 1500 || next.bonds.length > 6000) {
      useUIStore
        .getState()
        .notify("Structure limit: 1,500 atoms / 6,000 bonds.");
      return;
    }
    normalize(next);
    if (fingerprint(before) === fingerprint(next)) return;
    useHistoryStore.getState().record(before, label);
    set({ molecule: next });
  },
  addAtom: (x, y, element) =>
    get().mutate("Add atom", (m) =>
      m.atoms.push({
        id: crypto.randomUUID(),
        element,
        x,
        y,
        charge: 0,
        aromatic: false,
        lonePairs: 0,
      }),
    ),
  patchAtom: (id, patch) =>
    get().mutate("Edit atom", (m) => {
      const a = m.atoms.find((a) => a.id === id);
      if (a) Object.assign(a, { ...patch, id: a.id });
    }),
  addBond: (a, b, type) => {
    if (a === b) return;
    get().mutate("Add bond", (m) => {
      if (!m.atoms.some((v) => v.id === a) || !m.atoms.some((v) => v.id === b))
        return;
      const existing = m.bonds.find(
        (v) =>
          (v.atomA === a && v.atomB === b) || (v.atomA === b && v.atomB === a),
      );
      if (existing) existing.type = type;
      else m.bonds.push({ id: crypto.randomUUID(), atomA: a, atomB: b, type });
    });
  },
  patchBond: (id, type) =>
    get().mutate("Change bond", (m) => {
      const b = m.bonds.find((b) => b.id === id);
      if (b) b.type = type;
    }),
  remove: (atoms, bonds) => {
    const a = new Set(atoms),
      b = new Set(bonds);
    get().mutate("Delete selection", (m) => {
      m.atoms = m.atoms.filter((v) => !a.has(v.id));
      m.bonds = m.bonds.filter(
        (v) => !b.has(v.id) && !a.has(v.atomA) && !a.has(v.atomB),
      );
    });
    set({ selectedAtoms: [], selectedBonds: [] });
    if (a.has(useUIStore.getState().pendingAtom || ""))
      useUIStore.getState().set({ pendingAtom: null });
  },
  addRing: (x, y, size, aromatic) =>
    get().mutate(aromatic ? "Add benzene" : "Add ring", (m) => {
      const r = makeRing(x, y, size, aromatic);
      m.atoms.push(...r.atoms);
      m.bonds.push(...r.bonds);
    }),
  beginDrag: () => set({ dragStart: structuredClone(get().molecule) }),
  moveAtoms: (positions) =>
    set((s) => ({
      molecule: {
        ...s.molecule,
        atoms: s.molecule.atoms.map((a) =>
          positions.has(a.id) ? { ...a, ...positions.get(a.id) } : a,
        ),
      },
    })),
  endDrag: (cancel) => {
    const before = get().dragStart;
    if (!before) return;
    if (cancel) set({ molecule: before });
    else if (fingerprint(before) !== fingerprint(get().molecule))
      useHistoryStore.getState().record(before, "Move atoms");
    set({ dragStart: null });
  },
  undo: () => {
    get().endDrag(true);
    const m = useHistoryStore.getState().undo(get().molecule);
    if (m) set({ molecule: m, selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({ pendingAtom: null });
  },
  redo: () => {
    get().endDrag(true);
    const m = useHistoryStore.getState().redo(get().molecule);
    if (m) set({ molecule: m, selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({ pendingAtom: null });
  },
  newMolecule: () => {
    get().mutate("New molecule", (m) => Object.assign(m, emptyMolecule()));
    set({ selectedAtoms: [], selectedBonds: [] });
    useUIStore.getState().set({
      pendingAtom: null,
      pan: { x: 0, y: 0 },
      zoom: 1,
      tool: "draw",
      atom: "C",
    });
  },
  save: () => {
    try {
      saveMolecule(get().molecule);
      set({ savedFingerprint: fingerprint(get().molecule) });
      useUIStore.getState().notify("Saved on this device.");
    } catch (e) {
      useUIStore.getState().notify((e as Error).message);
    }
  },
  restore: () => {
    try {
      const m = loadMolecule();
      if (m) {
        get().replace(m);
        set({ savedFingerprint: fingerprint(m) });
        useUIStore.getState().notify("Saved structure restored.");
      } else useUIStore.getState().notify("No saved structure on this device.");
    } catch (e) {
      useUIStore.getState().notify((e as Error).message);
    }
  },
  replace: (m) => {
    get().mutate("Load molecule", (next) =>
      Object.assign(next, structuredClone(m)),
    );
    set({ selectedAtoms: [], selectedBonds: [] });
    const ui = useUIStore.getState();
    ui.set({
      pendingAtom: null,
      fitVersion: ui.fitVersion + 1,
      tool: "select",
    });
  },
  rename: (name) =>
    get().mutate("Rename molecule", (m) => {
      m.metadata.name = name.trim() || "Untitled molecule";
    }),
}));
````

## CREATE NEW FILE

FILE: `src/styles/animations.css`

````css
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes pulse {
  50% {
    opacity: 0.45;
  }
}
@keyframes lineDraw {
  from {
    stroke-dashoffset: 300;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes float {
  50% {
    transform: translateY(-10px);
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
````

## CREATE NEW FILE

FILE: `src/styles/globals.css`

````css
* {
  box-sizing: border-box;
}
html,
body,
#root {
  margin: 0;
  min-height: 100%;
  width: 100%;
}
body {
  font-family: var(--font);
  font-size: 14px;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}
button,
input,
select {
  font: inherit;
}
button {
  color: inherit;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}
button,
a,
input,
select {
  -webkit-tap-highlight-color: transparent;
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
button {
  transition:
    background 0.15s,
    border-color 0.15s,
    transform 0.15s;
}
button:active:not(:disabled) {
  transform: translateY(1px);
}
a {
  color: inherit;
}
h1,
h2,
h3,
p {
  margin: 0;
}
button svg {
  flex-shrink: 0;
}
button {
  border: 0;
  background: none;
}
input,
select {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px;
  min-width: 0;
}
hr {
  border: 0;
  border-top: 1px solid var(--border);
}
::selection {
  background: var(--accent-soft);
}
.muted {
  color: var(--text-muted);
}
.eyebrow {
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}
.mono {
  font-family: var(--mono);
}
.primary {
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
  border-radius: 7px;
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 550;
}
.primary:hover {
  filter: brightness(1.08);
}
[data-theme="dark"] .primary {
  color: #201728;
}
.secondary {
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 11px 16px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.secondary:hover {
  background: var(--accent-soft);
}
.icon-button {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-button:hover {
  background: var(--accent-soft);
}
.active {
  background: var(--accent-soft) !important;
  color: var(--accent) !important;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 38%, transparent);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
kbd {
  font-family: var(--mono);
  font-size: 11px;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 5px;
  background: var(--bg);
}
.tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.8px;
  border: 1px solid var(--border);
  padding: 5px 7px;
  border-radius: 4px;
  color: var(--text-muted);
}
````

## REPLACE FILE

FILE: `src/styles/tokens.css`

````css
:root {
  color-scheme: light;
  --bg: #f6f4ef;
  --canvas: #faf8f3;
  --surface: #fffefa;
  --surface-elevated: #fff;
  --border: #e2dfd8;
  --text: #2d2b32;
  --text-muted: #77727d;
  --accent: #7655ad;
  --accent-soft: #ede6f5;
  --danger: #b8484f;
  --warning: #9c641c;
  --success: #397c62;
  --grid: #d8d2c7;
  --shadow: 0 6px 30px #32273d0a;
  --font: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}
[data-theme="dark"] {
  color-scheme: dark;
  --bg: #1c1b20;
  --canvas: #222127;
  --surface: #27262d;
  --surface-elevated: #2e2c34;
  --border: #3e3b46;
  --text: #f1edf4;
  --text-muted: #aaa3b4;
  --accent: #baa0e5;
  --accent-soft: #3c324e;
  --danger: #f28e92;
  --warning: #e7b775;
  --success: #8bc9ab;
  --grid: #403c47;
  --shadow: 0 6px 30px #0002;
}
````

## CREATE NEW FILE

FILE: `src/types/analysis.ts`

````typescript
export interface Warning {
  atomId?: string;
  message: string;
  severity: "warning" | "error";
}
export interface Analysis {
  formula: string;
  weight: number | null;
  composition: Record<string, number>;
  atoms: number;
  heavyAtoms: number;
  totalAtoms: number;
  bonds: number;
  rings: number;
  aromaticRings: number;
  charge: number;
  donors: number | null;
  acceptors: number | null;
  rotatable: number | null;
  warnings: Warning[];
  smiles: string;
  smilesError: string | null;
  components: number;
  implicitH: number;
}
````

## REPLACE FILE

FILE: `src/types/chem.ts`

````typescript
export type { Atom } from "../models/Atom";
export type { Bond, BondType } from "../models/Bond";
export type { Molecule } from "../models/Molecule";
````

## CREATE NEW FILE

FILE: `src/types/editor.ts`

````typescript
export type WorkspaceTool =
  | "select"
  | "erase"
  | "lasso"
  | "draw"
  | "bond"
  | "ring"
  | "charge"
  | "lonePair"
  | "hydrogen"
  | "pan";
export type Dialog = "new" | "export" | "analysis" | "settings" | "help" | "3d" | null;
export interface Point {
  x: number;
  y: number;
}
````

## REPLACE FILE

FILE: `src/utils/canvasConfig.ts`

````typescript
export const BOND_LENGTH = 64;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 4;
export const HISTORY_LIMIT = 120;
````

## REPLACE FILE

FILE: `src/utils/elementColor.ts`

````typescript
import { ELEMENTS } from "./elementData";
export const elementColor = (e: string, dark = false) =>
  e === "C"
    ? dark
      ? "#eee8f3"
      : "#35313d"
    : dark
      ? (
          {
            O: "#ef9397",
            N: "#95b3f0",
            F: "#88c2a2",
            Cl: "#88c2a2",
            Br: "#e9a486",
            S: "#dbbf65",
            P: "#e6b275",
          } as Record<string, string>
        )[e] || "#c8aedb"
      : ELEMENTS[e]?.color || "#8b769e";
````

## CREATE NEW FILE

FILE: `src/utils/elementData.ts`

````typescript
export interface ElementData {
  symbol: string;
  name: string;
  number: number;
  weight: number;
  valences: number[];
  implicit: boolean;
  color: string;
}
const rows: [string, string, number, number, number[], boolean, string][] = [
  ["H", "Hydrogen", 1, 1.008, [1], false, "#73717b"],
  ["B", "Boron", 5, 10.81, [3], true, "#927649"],
  ["C", "Carbon", 6, 12.011, [4], true, "#41404a"],
  ["N", "Nitrogen", 7, 14.007, [3], true, "#5573b4"],
  ["O", "Oxygen", 8, 15.999, [2], true, "#bc595e"],
  ["F", "Fluorine", 9, 18.998403, [1], true, "#52866c"],
  ["P", "Phosphorus", 15, 30.973762, [3, 5], true, "#b67c40"],
  ["S", "Sulfur", 16, 32.06, [2, 4, 6], true, "#aa8a30"],
  ["Cl", "Chlorine", 17, 35.45, [1], true, "#52866c"],
  ["Br", "Bromine", 35, 79.904, [1], true, "#9f634d"],
  ["I", "Iodine", 53, 126.90447, [1], true, "#8665a6"],
  ["Li", "Lithium", 3, 6.94, [1], false, "#887399"],
  ["Na", "Sodium", 11, 22.98977, [1], false, "#887399"],
  ["K", "Potassium", 19, 39.0983, [1], false, "#887399"],
  ["Mg", "Magnesium", 12, 24.305, [2], false, "#739573"],
  ["Ca", "Calcium", 20, 40.078, [2], false, "#739573"],
  ["Si", "Silicon", 14, 28.085, [4], true, "#8a7564"],
  ["Al", "Aluminium", 13, 26.981538, [3], false, "#86868a"],
  ["Fe", "Iron", 26, 55.845, [2, 3], false, "#b67c40"],
  ["Cu", "Copper", 29, 63.546, [1, 2], false, "#b67c40"],
  ["Zn", "Zinc", 30, 65.38, [2], false, "#86868a"],
  ["Ag", "Silver", 47, 107.8682, [1], false, "#86868a"],
];
export const ELEMENTS: Record<string, ElementData> = Object.fromEntries(
  rows.map(([symbol, name, number, weight, valences, implicit, color]) => [
    symbol,
    { symbol, name, number, weight, valences, implicit, color },
  ]),
);
export const ISOTOPE_MASSES: Record<string, number> = {
  "H:1": 1.007825032,
  "H:2": 2.014101778,
  "H:3": 3.016049278,
  "C:12": 12,
  "C:13": 13.003354835,
  "C:14": 14.003241989,
  "N:15": 15.000108899,
  "O:18": 17.999159613,
};
````

## CREATE NEW FILE

FILE: `src/utils/format.ts`

````typescript
export const formatNumber = (n: number, digits = 2) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
export const chargeLabel = (q: number) =>
  q === 0 ? "" : `${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "−"}`;
````

## CREATE NEW FILE

FILE: `src/utils/geometry.ts`

````typescript
export { distance, pointInRect, bounds } from "../engine/geometry";
````

## CREATE NEW FILE

FILE: `src/utils/legacyImport.ts`

````typescript
import { emptyMolecule } from "../models/Molecule";
// Bridge for the uploaded editor's numeric-ID {atoms,bonds} snapshots.
// All output passes through the regular schema validator before it is used.
export function convertLegacySnapshot(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const input = value as Record<string, unknown>;
  if (
    input.version !== undefined ||
    !Array.isArray(input.atoms) ||
    !Array.isArray(input.bonds)
  )
    return value;
  const atoms = input.atoms as Record<string, unknown>[];
  const bonds = input.bonds as Record<string, unknown>[];
  if (
    !atoms.every(
      (a) => a && typeof a.id === "number" && Number.isSafeInteger(a.id),
    ) ||
    !bonds.every(
      (b) => b && typeof b.id === "number" && Number.isSafeInteger(b.id),
    )
  )
    throw new Error("Unrecognized legacy molecule format.");
  const aromatic = new Set<number>();
  for (const b of bonds)
    if (b.type === "aromatic") {
      aromatic.add(b.atomA as number);
      aromatic.add(b.atomB as number);
    }
  return {
    ...emptyMolecule(),
    atoms: atoms.map((a) => ({
      ...a,
      id: `legacy-atom-${a.id}`,
      charge: a.charge ?? 0,
      aromatic: aromatic.has(a.id as number),
      lonePairs: 0,
    })),
    bonds: bonds.map((b) => ({
      ...b,
      id: `legacy-bond-${b.id}`,
      atomA: `legacy-atom-${b.atomA}`,
      atomB: `legacy-atom-${b.atomB}`,
    })),
    metadata: { ...emptyMolecule().metadata, name: "Imported legacy molecule" },
  };
}
````

## CREATE NEW FILE

FILE: `src/utils/storage.ts`

````typescript
import { convertLegacySnapshot } from "./legacyImport";
import type { Molecule } from "../types/chem";
export const STORAGE_KEY = "chemease.molecule.v1";
export function readPreference(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
export function parseMolecule(raw: string): Molecule {
  const m = convertLegacySnapshot(JSON.parse(raw)) as ReturnType<
    typeof JSON.parse
  >;
  if (
    !m ||
    m.version !== 1 ||
    !Array.isArray(m.atoms) ||
    !Array.isArray(m.bonds) ||
    m.atoms.length > 1500 ||
    m.bonds.length > 6000
  )
    throw new Error(
      "Invalid ChemEase JSON or structure exceeds 1,500 atoms / 6,000 bonds.",
    );
  const ids = new Set<string>();
  for (const a of m.atoms) {
    if (
      !a ||
      typeof a.id !== "string" ||
      ids.has(a.id) ||
      typeof a.element !== "string" ||
      !/^[A-Z][a-z]?$/.test(a.element) ||
      !Number.isFinite(a.x) ||
      !Number.isFinite(a.y) ||
      Math.abs(a.x) > 1e6 ||
      Math.abs(a.y) > 1e6 ||
      !Number.isInteger(a.charge) ||
      Math.abs(a.charge) > 8 ||
      typeof a.aromatic !== "boolean"
    )
      throw new Error("Invalid atom data.");
    ids.add(a.id);
    if (
      a.isotope !== undefined &&
      (!Number.isInteger(a.isotope) || a.isotope < 1 || a.isotope > 300)
    )
      throw new Error("Invalid isotope.");
    if (
      a.hydrogenOverride !== undefined &&
      (!Number.isInteger(a.hydrogenOverride) ||
        a.hydrogenOverride < 0 ||
        a.hydrogenOverride > 8)
    )
      throw new Error("Invalid hydrogen count.");
    if (a.stereo !== undefined && !["@", "@@"].includes(a.stereo))
      throw new Error("Invalid atom stereochemistry.");
    a.lonePairs = a.lonePairs ?? 0;
    if (!Number.isInteger(a.lonePairs) || a.lonePairs < 0 || a.lonePairs > 8)
      throw new Error("Invalid lone-pair count.");
  }
  const bondIds = new Set<string>(),
    pairs = new Set<string>();
  for (const b of m.bonds) {
    if (!b) throw new Error("Invalid bond data.");
    const pair = [b.atomA, b.atomB].sort().join("|");
    if (
      !b ||
      typeof b.id !== "string" ||
      bondIds.has(b.id) ||
      pairs.has(pair) ||
      !ids.has(b.atomA) ||
      !ids.has(b.atomB) ||
      b.atomA === b.atomB ||
      !["single", "double", "triple", "aromatic"].includes(b.type) ||
      (b.stereo !== undefined && !["up", "down"].includes(b.stereo))
    )
      throw new Error("Invalid or duplicate bond.");
    bondIds.add(b.id);
    pairs.add(pair);
  }
  return {
    version: 1,
    atoms: m.atoms.map((a: Molecule["atoms"][number]) => ({
      id: a.id,
      element: a.element,
      x: a.x,
      y: a.y,
      charge: a.charge,
      aromatic: a.aromatic,
      lonePairs: a.lonePairs,
      isotope: a.isotope,
      hydrogenOverride: a.hydrogenOverride,
      stereo: a.stereo,
    })),
    bonds: m.bonds.map((b: Molecule["bonds"][number]) => ({
      id: b.id,
      atomA: b.atomA,
      atomB: b.atomB,
      type: b.type,
      stereo: b.stereo,
    })),
    metadata: {
      name:
        typeof m.metadata?.name === "string"
          ? m.metadata.name.slice(0, 120)
          : "Imported molecule",
      createdAt:
        typeof m.metadata?.createdAt === "string"
          ? m.metadata.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}
export function saveMolecule(m: Molecule) {
  if (!writePreference(STORAGE_KEY, JSON.stringify(m)))
    throw new Error(
      "Browser storage unavailable or full. Export JSON to keep your work.",
    );
}
export function loadMolecule() {
  const raw = readPreference(STORAGE_KEY, "");
  return raw ? parseMolecule(raw) : null;
}
````

## CREATE NEW FILE

FILE: `tests/browser-smoke.py`

````python
"""Browser smoke tests. Requires agent-browser CLI and a served ChemEase build.
Run: CHEMEASE_URL=http://127.0.0.1:4173/ChemEase.html python3 tests/browser-smoke.py
Uses a dedicated test browser session; clears only this application's test-origin storage.
"""
import subprocess, json, os, time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-smoke')
URL=os.environ.get('CHEMEASE_URL','http://127.0.0.1:4173/ChemEase.html')
OUT=Path(os.environ.get('CHEMEASE_QA_DIR','/data'));OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=30)
 if p.returncode:raise RuntimeError(f'{args}: {p.stderr or p.stdout}')
 return p.stdout.strip()
def js(expr):
 data=json.loads(run('eval',f'JSON.stringify({expr})','--json'))
 if not data.get('success'):raise RuntimeError(data)
 return json.loads(data['data']['result'])
def click(sel):run('click',sel)
def press(key):run('press',key)
def mouse(x,y):run('mouse','move',round(x),round(y))
def tap(x,y):mouse(x,y);run('mouse','down','left');run('mouse','up','left')
def formula():return run('get','text','[data-testid="formula"]')
def check(name,condition):
 assert condition,name
 checks.append(name);print('PASS',name,flush=True)
def atoms():return js("[...document.querySelectorAll('[data-atom]')].map(el=>{const p=new DOMPoint(0,0).matrixTransform(el.getScreenCTM());return{id:el.dataset.atom,x:p.x,y:p.y}})")
def bondpoint(i=0):return js(f"(()=>{{const r=document.querySelectorAll('[data-bond]')[{i}].getBoundingClientRect();return{{x:r.x+r.width/2,y:r.y+r.height/2}}}})()")
def tool(label):click(f'button[aria-label="{label}"]')
def screenshot(name):run('screenshot',str(OUT/name))
run('open',URL);run('set','viewport','1440','900');run('eval','localStorage.clear(); location.reload();');run('wait','--text','Start Creating')
click('.story-actions .primary');run('wait','--text','Start drawing')
check('Intro transitions to editor',js('!!document.querySelector("#molecular-canvas")'))
screenshot('chemease-empty.png')
r=js('document.querySelector("#molecular-canvas").getBoundingClientRect().toJSON()');cx=r['x']+r['width']/2;cy=r['y']+r['height']/2
# Actual pointer events, not direct calls to the state store.
tap(cx-100,cy);check('Carbon placement produces methane',formula()=='CH4')
tap(cx,cy-55);tool('Draw Oxygen');tap(cx+100,cy);check('Disconnected atoms analyzed independently',formula()=='C2H10O')
points=atoms();tool('Single bond tool');tap(points[0]['x'],points[0]['y']);tap(points[1]['x'],points[1]['y']);tap(points[1]['x'],points[1]['y']);tap(points[2]['x'],points[2]['y'])
check('Connecting atoms produces ethanol',formula()=='C2H6O')
check('SMILES derives from drawn graph',run('get','text','.smiles-value')=='CCO')
press('2');bp=bondpoint();tap(bp['x'],bp['y']);check('Bond-order edit updates hydrogens',formula()=='C2H4O')
press('Control+z');check('Keyboard undo restores chemistry',formula()=='C2H6O')
press('Control+Shift+z');check('Keyboard redo restores bond order',formula()=='C2H4O');press('Control+z')
press('e');tap(points[2]['x'],points[2]['y']);check('Erase removes atom and attached bond',formula()=='C2H6');press('Control+z')
press('l');mouse(cx-130,cy-90);run('mouse','down','left');mouse(cx+145,cy+40);run('mouse','up','left')
check('Lasso selects multiple atoms',js("document.querySelectorAll('.atom-shape.is-selected').length")==3)
press('v');mouse(points[0]['x'],points[0]['y']);run('mouse','down','left');mouse(points[0]['x']+35,points[0]['y']+24);run('mouse','up','left');after=atoms()
check('Selection drag moves the group',all(abs(after[i]['x']-points[i]['x']-35)<1 for i in range(3)))
press('Control+z');check('One undo restores entire drag',abs(atoms()[0]['x']-points[0]['x'])<1)
press('Escape');tool('Benzene ring tool');tap(cx-50,cy+170);check('Ring placement creates six real atoms',len(atoms())==9);press('Control+z');check('Ring insertion is one undo operation',len(atoms())==3)
press('v');points=atoms();tap(points[2]['x'],points[2]['y']);run('fill','input[aria-label="Selected atom charge"]','-1');check('Charge affects implicit hydrogens',formula()=='C2H5O');press('Tab');press('Escape');press('Control+z');check('Charge can be undone',formula()=='C2H6O')
# Zoom and pan.
z0=run('get','text','.zoom-percent');tool('Zoom in');check('Zoom control changes viewport',run('get','text','.zoom-percent')!=z0);click('.zoom-percent')
press('Escape');points=atoms();mouse(cx,cy+110);run('press','Space')
# Explicit pan tool avoids holding keyboard state across CLI commands.
tool('Pan tool');run('mouse','down','left');mouse(cx+30,cy+145);run('mouse','up','left');check('Pan updates atom screen positions',abs(atoms()[0]['x']-points[0]['x']-30)<1)
# Save and reload actual localStorage.
press('Control+s');check('Save writes graph locally',len(js('JSON.parse(localStorage.getItem("chemease.molecule.v1")).atoms'))==3)
run('eval','location.reload()');run('wait','--text','Molecule overview');check('Returning visit skips intro and restores saved molecule',formula()=='C2H6O')
click('button[title="New molecule (Ctrl/⌘ N)"]');run('find','role','button','click','--name','New molecule','--exact');check('New clears graph after confirmation',len(atoms())==0);press('Control+z');check('New is undoable',formula()=='C2H6O')
run('select','select[aria-label="Load example structure"]','aspirin');run('wait','--text','Aspirin');check('Aspirin example is a connected real graph',formula()=='C9H8O4')
screenshot('chemease-editor.png')
run('find','role','button','click','--name','Analyze Structure','--exact');check('Analysis modal opens',js('!!document.querySelector("[role=dialog]")'));check('Analysis displays real mass','180.16' in run('get','text','.analysis-content'));screenshot('chemease-analysis.png');press('Escape');check('Escape closes modal',not js('!!document.querySelector("[role=dialog]")'))
tool('Switch to dark theme');check('Theme persists',js('localStorage.getItem("chemease.theme")')=='dark');screenshot('chemease-dark.png')
run('set','viewport','1280','720');check('1280px editor has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'));screenshot('chemease-1280.png')
run('set','viewport','390','844');check('Mobile uses compact editor',js('getComputedStyle(document.querySelector(".mobile-notice")).display')!='none');check('Mobile has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'));screenshot('chemease-mobile-editor.png')
run('find','role','button','click','--name','Tools','--exact');check('Mobile chemistry tools can be opened',js('getComputedStyle(document.querySelector(".toolbar-container")).display')!='none');run('find','role','button','click','--name','Tools','--exact');run('find','role','button','click','--name','Info','--exact');check('Mobile information panel opens',js('getComputedStyle(document.querySelector(".info-container")).display')!='none')
run('set','viewport','1440','900');tool('Switch to light theme');press('Control+s');tool('Settings');run('find','role','button','click','--name','Replay introduction','--exact');run('wait','--text','Start Creating');run('set','viewport','390','844');screenshot('chemease-mobile-landing.png');check('Mobile landing has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'))
run('set','viewport','1440','900')
print(json.dumps({'passed':len(checks),'checks':checks},indent=2),flush=True)
(OUT/'chemease-browser-results.json').write_text(json.dumps({'passed':len(checks),'checks':checks},indent=2))
````

## CREATE NEW FILE

FILE: `tests/chemistry.test.ts`

````typescript
import test from "node:test";
import assert from "node:assert/strict";
import type { Molecule, Atom, BondType } from "../src/types/chem";
import { emptyMolecule } from "../src/models/Molecule";
import { molecularFormula } from "../src/engine/formula";
import { molecularWeight } from "../src/engine/molecularWeight";
import { atomValence } from "../src/engine/valence";
import { bondOrder } from "../src/engine/chemistry";
import {
  cycleRank,
  aromaticCycleRank,
  makeRing,
  ringBondIds,
} from "../src/engine/rings";
import { validateMolecule } from "../src/engine/validation";
import { generateSmiles } from "../src/engine/smiles";
import { analyzeMolecule } from "../src/engine/analysis";
import { template } from "../src/engine/templates";
import { parseMolecule } from "../src/utils/storage";
import { moleculeSvg } from "../src/engine/export";
function graph(
  elements: string[],
  edges: [number, number, BondType][] = [],
  patches: Record<number, Partial<Atom>> = {},
): Molecule {
  return {
    ...emptyMolecule(),
    atoms: elements.map((element, i) => ({
      id: `a${i}`,
      element,
      x: i * 64,
      y: 0,
      charge: 0,
      aromatic: false,
      lonePairs: 0,
      ...patches[i],
    })),
    bonds: edges.map(([a, b, type], i) => ({
      id: `b${i}`,
      atomA: `a${a}`,
      atomB: `a${b}`,
      type,
    })),
  };
}
const fixtures: [string, Molecule, string, number, string][] = [
  ["methane", graph(["C"]), "CH4", 16.043, "C"],
  ["ethane", graph(["C", "C"], [[0, 1, "single"]]), "C2H6", 30.07, "CC"],
  ["ethene", graph(["C", "C"], [[0, 1, "double"]]), "C2H4", 28.054, "C=C"],
  ["ethyne", graph(["C", "C"], [[0, 1, "triple"]]), "C2H2", 26.038, "C#C"],
  ["water", graph(["O"]), "H2O", 18.015, "O"],
  ["methanol", graph(["C", "O"], [[0, 1, "single"]]), "CH4O", 32.042, "CO"],
  [
    "ethanol",
    graph(
      ["C", "C", "O"],
      [
        [0, 1, "single"],
        [1, 2, "single"],
      ],
    ),
    "C2H6O",
    46.069,
    "CCO",
  ],
  [
    "carbon dioxide",
    graph(
      ["O", "C", "O"],
      [
        [0, 1, "double"],
        [1, 2, "double"],
      ],
    ),
    "CO2",
    44.009,
    "O=C=O",
  ],
];
for (const [name, m, formula, weight, smiles] of fixtures)
  test(name, () => {
    assert.equal(molecularFormula(m), formula);
    assert.ok(Math.abs(molecularWeight(m)! - weight) < 0.002);
    assert.equal(generateSmiles(m).smiles, smiles);
    assert.equal(validateMolecule(m).length, 0);
  });
test("bond orders are chemistry values", () =>
  assert.deepEqual(
    ["single", "double", "triple", "aromatic"].map((b) =>
      bondOrder(b as BondType),
    ),
    [1, 2, 3, 1.5],
  ));
test("explicit H is not counted twice", () => {
  const m = graph(["C", "H"], [[0, 1, "single"]]);
  assert.equal(atomValence(m.atoms[0], m).implicitH, 3);
  assert.equal(molecularFormula(m), "CH4");
});
test("explicit water", () =>
  assert.equal(
    molecularFormula(
      graph(
        ["O", "H", "H"],
        [
          [0, 1, "single"],
          [0, 2, "single"],
        ],
      ),
    ),
    "H2O",
  ));
test("ammonium charge affects H and SMILES", () => {
  const m = graph(["N"], [], { 0: { charge: 1 } });
  assert.equal(molecularFormula(m), "H4N");
  assert.equal(generateSmiles(m).smiles, "[NH4+]");
});
test("hydroxide", () => {
  const m = graph(["O"], [], { 0: { charge: -1 } });
  assert.equal(molecularFormula(m), "HO");
  assert.equal(generateSmiles(m).smiles, "[OH-]");
});
test("pentavalent carbon is allowed but warned", () => {
  const m = graph(
    ["C", "C", "C", "C", "C", "C"],
    [1, 2, 3, 4, 5].map((i) => [0, i, "single"]),
  );
  assert.equal(atomValence(m.atoms[0], m).implicitH, 0);
  assert.ok(validateMolecule(m).some((w) => w.message.includes("exceeds")));
  assert.ok(generateSmiles(m).error);
});
test("branched isobutane SMILES", () => {
  const m = graph(
    ["C", "C", "C", "C"],
    [
      [0, 1, "single"],
      [1, 2, "single"],
      [1, 3, "single"],
    ],
  );
  assert.equal(generateSmiles(m).smiles, "CC(C)C");
  assert.equal(molecularFormula(m), "C4H10");
});
test("disconnected fragments use dot", () =>
  assert.equal(generateSmiles(graph(["C", "O"])).smiles, "C.O"));
test("benzene", () => {
  const m = template("benzene");
  assert.equal(molecularFormula(m), "C6H6");
  assert.equal(generateSmiles(m).smiles, "c1ccccc1");
  assert.equal(cycleRank(m), 1);
  assert.equal(aromaticCycleRank(m), 1);
  assert.equal(ringBondIds(m).size, 6);
});
test("cyclopentane and cyclohexane are actual graphs", () => {
  for (const n of [5, 6] as const) {
    const m = { ...emptyMolecule(), ...makeRing(0, 0, n) };
    assert.equal(molecularFormula(m), `C${n}H${n * 2}`);
    assert.equal(cycleRank(m), 1);
    assert.match(generateSmiles(m).smiles, /C1.*C1/);
  }
});
test("pyridine aromatic nitrogen does not receive an H", () => {
  const m = template("benzene");
  m.atoms[0].element = "N";
  assert.equal(molecularFormula(m), "C5H5N");
  assert.equal(generateSmiles(m).smiles, "n1ccccc1");
});
test("pyrrole supports explicit hydrogen override", () => {
  const m = { ...emptyMolecule(), ...makeRing(0, 0, 5, true) };
  m.atoms[0].element = "N";
  m.atoms[0].hydrogenOverride = 1;
  assert.equal(molecularFormula(m), "C4H5N");
  assert.equal(generateSmiles(m).smiles, "[nH]1cccc1");
  assert.ok(!validateMolecule(m).some((w) => w.message.includes("exceeds")));
});
test("broken aromatic ring warns and refuses ambiguous SMILES", () => {
  const m = template("benzene");
  m.bonds.pop();
  assert.equal(cycleRank(m), 0);
  assert.ok(generateSmiles(m).error);
});
test("two independent rings", () => {
  const a = template("benzene"),
    b = template("benzene");
  assert.equal(
    cycleRank({
      ...a,
      atoms: [...a.atoms, ...b.atoms],
      bonds: [...a.bonds, ...b.bonds],
    }),
    2,
  );
});
test("aspirin graph chemistry and descriptors", () => {
  const a = analyzeMolecule(template("aspirin"));
  assert.equal(a.formula, "C9H8O4");
  assert.ok(Math.abs(a.weight! - 180.159) < 0.002);
  assert.equal(a.rings, 1);
  assert.equal(a.acceptors, 3);
  assert.equal(a.donors, 1);
  assert.ok(a.smiles);
  assert.equal(a.warnings.length, 0);
});
test("ethanol graph descriptors", () => {
  const a = analyzeMolecule(template("ethanol"));
  assert.equal(a.acceptors, 1);
  assert.equal(a.donors, 1);
  assert.equal(a.rotatable, 0);
  assert.equal(a.totalAtoms, 9);
});
test("amide nitrogen is not an acceptor", () => {
  const m = graph(
    ["C", "O", "N"],
    [
      [0, 1, "double"],
      [0, 2, "single"],
    ],
  );
  assert.equal(analyzeMolecule(m).acceptors, 1);
});
test("unknown element has no mass rather than false zero", () => {
  const m = graph(["Xx"]);
  assert.equal(molecularWeight(m), null);
  assert.ok(validateMolecule(m).length);
  assert.ok(generateSmiles(m).error);
});
test("R group is wildcard and mass unspecified", () => {
  const m = graph(["R"]);
  assert.equal(molecularWeight(m), null);
  assert.equal(generateSmiles(m).smiles, "*");
  assert.equal(analyzeMolecule(m).donors, null);
});
test("metal ions have no inferred H and descriptors are not evaluated", () => {
  const m = graph(["Na"], [], { 0: { charge: 1 } });
  assert.equal(molecularFormula(m), "Na");
  assert.equal(generateSmiles(m).smiles, "[Na+]");
  assert.equal(analyzeMolecule(m).acceptors, null);
});
test("empty graph is safe", () => {
  const m = emptyMolecule();
  assert.equal(molecularFormula(m), "");
  assert.equal(molecularWeight(m), 0);
  assert.equal(cycleRank(m), 0);
  assert.equal(generateSmiles(m).smiles, "");
  assert.equal(analyzeMolecule(m).atoms, 0);
});
test("invalid bond references do not crash analysis", () => {
  const m = graph(["C"]);
  m.bonds.push({ id: "bad", atomA: "a0", atomB: "missing", type: "single" });
  assert.ok(analyzeMolecule(m).warnings.some((w) => w.severity === "error"));
  assert.ok(generateSmiles(m).error);
});
test("isotope mass and bracket SMILES", () => {
  const m = graph(["C"], [], { 0: { isotope: 13 } });
  assert.ok(Math.abs(molecularWeight(m)! - 17.035354835) < 1e-8);
  assert.equal(generateSmiles(m).smiles, "[13CH4]");
});
test("unsupported isotope mass is null", () =>
  assert.equal(
    molecularWeight(graph(["C"], [], { 0: { isotope: 99 } })),
    null,
  ));
test("round-trip ChemEase JSON", () => {
  const m = template("aspirin");
  const read = parseMolecule(JSON.stringify(m));
  assert.equal(molecularFormula(read), "C9H8O4");
  assert.equal(read.bonds.length, m.bonds.length);
});
test("malformed JSON rejected safely", () => {
  for (const raw of [
    "null",
    "{}",
    "broken",
    JSON.stringify({ ...emptyMolecule(), atoms: [null] }),
  ])
    assert.throws(() => parseMolecule(raw));
});
test("duplicate atoms and bonds rejected", () => {
  const m = graph(["C", "O"], [[0, 1, "single"]]);
  m.bonds.push({ ...m.bonds[0], id: "duplicate" });
  assert.throws(() => parseMolecule(JSON.stringify(m)));
  m.bonds.pop();
  m.atoms.push(m.atoms[0]);
  assert.throws(() => parseMolecule(JSON.stringify(m)));
});
test("SVG uses the actual graph, no editor decorations", () => {
  const m = template("ethanol"),
    svg = moleculeSvg(m);
  assert.ok(svg.includes("<title>Ethanol</title>"));
  assert.ok(svg.includes(">O</text>"));
  assert.equal((svg.match(/<line /g) || []).length, 2);
  assert.ok(!svg.includes("data-atom"));
});
test("SVG escapes user metadata", () => {
  const m = emptyMolecule();
  m.metadata.name = "<script>alert(1)</script>";
  assert.ok(!moleculeSvg(m).includes("<script>"));
});
````

## CREATE NEW FILE

FILE: `tests/conformer.test.ts`

````typescript
import test from "node:test";
import assert from "node:assert/strict";
import { emptyMolecule } from "../src/models/Molecule";
import { conformerQuery, fetchConformer } from "../src/engine/conformer";
function methane() {
  return { ...emptyMolecule(), atoms: [{ id: "a", element: "C", x: 0, y: 0, charge: 0, aromatic: false, lonePairs: 0 }] };
}
test("3D query supports methane and blocks empty, fragments, R-groups and stereo", () => {
  assert.equal(conformerQuery(methane()), "C");
  assert.throws(() => conformerQuery(emptyMolecule()), /Draw/);
  const fragments = methane();
  fragments.atoms.push({ ...fragments.atoms[0], id: "b" });
  assert.throws(() => conformerQuery(fragments), /connected/);
  const r = methane(); r.atoms[0].element = "R";
  assert.throws(() => conformerQuery(r), /R-groups/);
  assert.throws(() => conformerQuery({ ...methane(), atoms: [{ ...methane().atoms[0], stereo: "@" }] }), /stereochemistry/);
});
test("lookup posts encoded SMILES and propagates cancellation signal", async () => {
  const original = globalThis.fetch;
  const controller = new AbortController();
  globalThis.fetch = async (url, options) => {
    assert.match(String(url), /record_type=3d/);
    assert.equal(options?.method, "POST");
    assert.equal((options?.body as URLSearchParams).get("smiles"), "C#N");
    assert.equal(options?.signal, controller.signal);
    return new Response("example\nM  END\n$$$$");
  };
  try { assert.match(await fetchConformer("C#N", controller.signal), /M  END/); }
  finally { globalThis.fetch = original; }
});
test("lookup reports missing records, rate limits and malformed data", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("missing", { status: 404 });
    await assert.rejects(fetchConformer("C"), /no matching/);
    globalThis.fetch = async () => new Response("busy", { status: 503 });
    await assert.rejects(fetchConformer("C"), /busy/);
    globalThis.fetch = async () => new Response("<html>not SDF</html>");
    await assert.rejects(fetchConformer("C"), /unsupported/);
  } finally { globalThis.fetch = original; }
});
````

## CREATE NEW FILE

FILE: `tests/export-browser.py`

````python
"""Exercise actual downloads, dialog keyboard behavior, and large-screen layouts."""
import os,subprocess,json,base64,time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-export')
URL=os.environ.get('CHEMEASE_URL','file:///data/chemease-integrated/dist/ChemEase.html')
OUT=Path('/data')
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=30)
 if p.returncode:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout.strip()
def js(expr):
 x=json.loads(run('eval',f'JSON.stringify({expr})','--json'));return json.loads(x['data']['result'])
def click(sel):run('click',sel)
run('open',URL);run('set','viewport','1440','900');run('eval','localStorage.clear(); location.reload();');run('wait','--text','Start Creating');click('.story-actions .primary');run('wait','--text','Start drawing');run('select','select[aria-label="Load example structure"]','aspirin');run('wait','--text','Aspirin')
# Capture the real Blob used by each download while preserving normal download behavior.
run('eval',"window.__downloads=[]; window.__blobs=new Map(); const originalURL=URL.createObjectURL; URL.createObjectURL=function(blob){const u=originalURL.call(URL,blob);window.__blobs.set(u,blob);return u}; const originalClick=HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click=function(){const blob=window.__blobs.get(this.href);if(blob){const row={name:this.download,type:blob.type,base64:null};window.__downloads.push(row);const reader=new FileReader();reader.onload=()=>row.base64=reader.result.split(',')[1];reader.readAsDataURL(blob)}return originalClick.call(this)}")
click('button.export-button');run('wait','--text','Take your chemistry with you')
for index,fmt in enumerate(['png','svg','json']):
 click(f'.export-option:nth-child({index+1})')
 run('wait','--fn',f'window.__downloads.length>{index} && window.__downloads[{index}].base64!==null')
 row=js(f'window.__downloads[{index}]');raw=base64.b64decode(row['base64']);(OUT/f'chemease-export-test.{fmt}').write_bytes(raw)
 assert len(raw)>100,fmt
 if fmt=='png':assert raw[:8]==b'\x89PNG\r\n\x1a\n'
 if fmt=='svg':assert b'<svg' in raw and b'<line' in raw
 if fmt=='json':assert len(json.loads(raw)['atoms'])==13
 print('PASS actual',fmt.upper(),'download:',row['name'],len(raw),'bytes',flush=True)
run('press','Escape');click('button[aria-label="Settings"]');run('screenshot','/data/chemease-settings.png');run('press','Tab');assert js('document.querySelector("[role=dialog]").contains(document.activeElement)');run('press','Shift+Tab');assert js('document.querySelector("[role=dialog]").contains(document.activeElement)');run('press','Escape');print('PASS dialog focus trap and Escape',flush=True)
for width,height in [(1920,1080),(2560,1440)]:
 run('set','viewport',width,height);assert js('document.documentElement.scrollWidth<=innerWidth && document.documentElement.scrollHeight<=innerHeight');print(f'PASS {width}×{height} layout',flush=True)
run('set','viewport','390','844');run('screenshot','/data/chemease-mobile-editor.png');r=js("(()=>{const svg=document.querySelector('#molecular-canvas').getBoundingClientRect();const atoms=[...document.querySelectorAll('[data-atom]')].map(el=>new DOMPoint(0,0).matrixTransform(el.getScreenCTM()));return atoms.every(p=>p.x>=svg.x&&p.x<=svg.right&&p.y>=svg.y&&p.y<=svg.bottom)})()");assert r;print('PASS responsive auto-fit keeps every atom in viewport',flush=True)
run('set','viewport','1440','900');run('a11y','--tags','wcag2a,wcag2aa','--json')
(OUT/'chemease-a11y.json').write_text(run('a11y','--tags','wcag2a,wcag2aa','--json'))
print('Export and responsive checks complete.',flush=True)
````

## CREATE NEW FILE

FILE: `tests/intro.test.ts`

````typescript
import test from "node:test";
import assert from "node:assert/strict";
import {
  sceneFrame,
  chapterOpacity,
  perspective,
  lookAt,
  rotate,
} from "../src/Components/intro/sceneMath";
import { parseMolecule } from "../src/utils/storage";
import { molecularFormula } from "../src/engine/formula";
test("scroll progress drives real camera motion and molecular disassembly", () => {
  const a = sceneFrame(0),
    b = sceneFrame(0.32),
    c = sceneFrame(0.65);
  assert.notDeepEqual(a.camera, b.camera);
  assert.ok(b.spread > 2);
  assert.ok(c.spread < 0.1);
  assert.ok(c.position[0] < 0);
});
test("scroll animation is deterministic and reversible", () => {
  const a = sceneFrame(0.35);
  sceneFrame(0.9);
  assert.deepEqual(sceneFrame(0.35), a);
});
test("progress is clamped safely", () => {
  assert.equal(sceneFrame(-1).at, 0);
  assert.equal(sceneFrame(2).at, 1);
});
test("reduced motion disables camera orbit and disassembly", () => {
  const f = sceneFrame(0.35, false, true);
  assert.deepEqual(f.camera, [0, 0, 10.5]);
  assert.equal(f.spread, 0);
  assert.equal(f.bonds, 1);
});
test("chapter transitions do not show two interactive text panels", () => {
  for (let i = 0; i <= 1000; i++) {
    const count = [0, 1, 2, 3].filter(
      (n) => chapterOpacity(i / 1000, n) > 0.7,
    ).length;
    assert.ok(count <= 1);
  }
});
test("3D matrices contain finite values", () => {
  for (const matrix of [perspective(0.65, 1.6), lookAt([0, 0, 10], [0, 0, 0])])
    assert.ok([...matrix].every(Number.isFinite));
  assert.ok(Math.abs(rotate([1, 0, 0], [0, Math.PI / 2, 0])[2] + 1) < 1e-10);
});
test("legacy numeric-ID molecule imports without changing chemistry", () => {
  const raw = {
    atoms: [
      { id: 1, element: "C", x: 10, y: 20 },
      { id: 2, element: "C", x: 40, y: 20 },
      { id: 3, element: "O", x: 70, y: 20 },
    ],
    bonds: [
      { id: 1, atomA: 1, atomB: 2, type: "single" },
      { id: 2, atomA: 2, atomB: 3, type: "single" },
    ],
  };
  const m = parseMolecule(JSON.stringify(raw));
  assert.equal(molecularFormula(m), "C2H6O");
  assert.equal(m.atoms[0].id, "legacy-atom-1");
  assert.equal(m.atoms[0].x, 10);
});
test("legacy dangling edges are rejected by normal validation", () => {
  assert.throws(() =>
    parseMolecule(
      JSON.stringify({
        atoms: [{ id: 1, element: "C", x: 0, y: 0 }],
        bonds: [{ id: 1, atomA: 1, atomB: 2, type: "single" }],
      }),
    ),
  );
});
````

## CREATE NEW FILE

FILE: `tests/store.test.ts`

````typescript
import test from "node:test";
import assert from "node:assert/strict";
import {
  useMoleculeStore as store,
  fingerprint,
} from "../src/store/moleculeStore";
import { useHistoryStore as history } from "../src/store/historyStore";
import { emptyMolecule } from "../src/models/Molecule";
import { molecularFormula } from "../src/engine/formula";
function reset() {
  store.setState({
    molecule: emptyMolecule(),
    selectedAtoms: [],
    selectedBonds: [],
    dragStart: null,
  });
  history.getState().clear();
}
test("atom and bond edits, undo and redo", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().addAtom(64, 0, "O");
  const [a, b] = store.getState().molecule.atoms;
  store.getState().addBond(a.id, b.id, "single");
  assert.equal(molecularFormula(store.getState().molecule), "CH4O");
  store.getState().undo();
  assert.equal(store.getState().molecule.bonds.length, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.bonds.length, 1);
});
test("deleting atom removes connected bonds, undo restores both", () => {
  reset();
  const s = store.getState();
  s.addAtom(0, 0, "C");
  s.addAtom(64, 0, "O");
  const [a, b] = store.getState().molecule.atoms;
  s.addBond(a.id, b.id, "single");
  s.remove([a.id], []);
  assert.equal(store.getState().molecule.bonds.length, 0);
  s.undo();
  assert.equal(store.getState().molecule.atoms.length, 2);
  assert.equal(store.getState().molecule.bonds.length, 1);
});
test("continuous drag creates exactly one history entry", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  const id = store.getState().molecule.atoms[0].id;
  history.getState().clear();
  store.getState().beginDrag();
  for (let i = 1; i <= 100; i++)
    store.getState().moveAtoms(new Map([[id, { x: i, y: i }]]));
  store.getState().endDrag();
  assert.equal(history.getState().past.length, 1);
  store.getState().undo();
  assert.equal(store.getState().molecule.atoms[0].x, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.atoms[0].x, 100);
});
test("canceling a drag does not modify history", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  const id = store.getState().molecule.atoms[0].id;
  const before = fingerprint(store.getState().molecule),
    count = history.getState().past.length;
  store.getState().beginDrag();
  store.getState().moveAtoms(new Map([[id, { x: 500, y: 500 }]]));
  store.getState().endDrag(true);
  assert.equal(fingerprint(store.getState().molecule), before);
  assert.equal(history.getState().past.length, count);
});
test("new edit invalidates redo branch", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().undo();
  store.getState().addAtom(0, 0, "O");
  assert.equal(history.getState().future.length, 0);
});
test("ring insertion and removal are atomic", () => {
  reset();
  store.getState().addRing(0, 0, 6, true);
  assert.equal(history.getState().past.length, 1);
  assert.equal(molecularFormula(store.getState().molecule), "C6H6");
  store.getState().undo();
  assert.equal(store.getState().molecule.atoms.length, 0);
  store.getState().redo();
  assert.equal(store.getState().molecule.bonds.length, 6);
});
test("repeated bond tool edits rather than duplicate bonds", () => {
  reset();
  store.getState().addAtom(0, 0, "C");
  store.getState().addAtom(64, 0, "C");
  const [a, b] = store.getState().molecule.atoms;
  store.getState().addBond(a.id, b.id, "single");
  store.getState().addBond(b.id, a.id, "double");
  assert.equal(store.getState().molecule.bonds.length, 1);
  assert.equal(molecularFormula(store.getState().molecule), "C2H4");
});
test("charge changes are undoable", () => {
  reset();
  store.getState().addAtom(0, 0, "N");
  const id = store.getState().molecule.atoms[0].id;
  store.getState().patchAtom(id, { charge: 1 });
  assert.equal(molecularFormula(store.getState().molecule), "H4N");
  store.getState().undo();
  assert.equal(molecularFormula(store.getState().molecule), "H3N");
});
````

## CREATE NEW FILE

FILE: `tests/story-browser.py`

````python
"""Browser QA for the scroll-driven WebGL introduction. Requires agent-browser."""
import subprocess,os,json,time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-story-test',AGENT_BROWSER_ARGS='--enable-unsafe-swiftshader,--use-gl=angle,--use-angle=swiftshader')
URL=os.environ.get('CHEMEASE_URL','file:///data/chemease-integrated/dist/ChemEase.html')
OUT=Path(os.environ.get('CHEMEASE_QA_DIR','/data/chemease-v2-qa'));OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=35)
 if p.returncode:raise RuntimeError(f'{args}: {p.stderr or p.stdout}')
 return p.stdout.strip()
def js(expr):
 d=json.loads(run('eval',f'JSON.stringify({expr})','--json'));return json.loads(d['data']['result'])
def check(name,condition):
 assert condition,name
 checks.append(name);print('PASS',name,flush=True)
def scroll(progress):
 run('eval',f'window.scrollTo(0,(document.querySelector(".scroll-intro").offsetHeight-innerHeight)*{progress})')
 run('wait','--fn',f'Math.abs(Number(document.querySelector(".story-stage").dataset.progress)-{progress})<.0005')
def shot(name):run('screenshot',str(OUT/name))
run('open',URL);run('set','media','light','no-preference');run('set','viewport','1440','900');run('eval','localStorage.clear();location.reload()');run('wait','--text','Start Creating');run('wait','--fn','document.querySelector(".webgl-scene")?.dataset.renderer==="webgl"')
check('Real WebGL context and shader-rendered scene active',js('document.querySelector(".webgl-scene").dataset.renderer')=='webgl')
check('Scene contains rendered nontransparent pixels',js('(()=>{const c=document.querySelector(".webgl-scene"),g=c.getContext("webgl"),b=new Uint8Array(c.width*c.height*4);g.readPixels(0,0,c.width,c.height,g.RGBA,g.UNSIGNED_BYTE,b);return b.some((n,i)=>i%4===3&&n>20)})()'))
shot('hero.png');initial=js('document.querySelector(".webgl-scene").dataset.camera')
scroll(.32);shot('draw.png');spread=js('Number(document.querySelector(".webgl-scene").dataset.spread)');camera=js('document.querySelector(".webgl-scene").dataset.camera');check('Scrolling dollies and orbits the camera',camera!=initial);check('Atoms separate and bonds dissolve with scroll',spread>2)
check('Full-screen stage stays pinned while document scrolls',js('Math.abs(document.querySelector(".story-stage").getBoundingClientRect().top)<1 && scrollY>500'))
check('Only the active chapter can receive keyboard focus',js('[...document.querySelectorAll("[data-chapter]")].filter(x=>!x.inert).length')==1)
scroll(.65);shot('analyze.png');check('Analysis stage reassembles the molecule',js('Number(document.querySelector(".webgl-scene").dataset.spread)')<.05)
check('Intro analysis is graph-derived benzene',js('document.querySelector(".intro-analysis .formula").textContent')=='C6H6')
scroll(.32);reverse=js('document.querySelector(".webgl-scene").dataset.camera');check('Reverse scrolling restores the same 3D camera',max(abs(float(a)-float(b)) for a,b in zip(camera.split(','),reverse.split(',')))<.01)
scroll(1);shot('create.png');check('Final chapter exposes the editor CTA',js('!document.querySelector(".chapter-create").inert'))
# Chapter links move the native document scroll; no wheel interception.
run('click','button[aria-label="Go to Discover chapter"]');run('wait','--fn','Number(document.querySelector(".story-stage").dataset.progress)<.0001');check('Chapter navigation rewinds the scroll story',js('scrollY')<1)
run('mouse','move','700','700');run('mouse','wheel','400');run('wait','--fn','Number(document.querySelector(".story-stage").dataset.progress)>.05');check('Native mouse-wheel scrolling drives the scene',js('scrollY')>0)
# Reduced motion is live, not just a CSS override of the renderer.
run('set','media','light','reduced-motion');scroll(.32);check('Reduced motion disables disassembly',js('Number(document.querySelector(".webgl-scene").dataset.spread)')==0);reducedCamera=js('document.querySelector(".webgl-scene").dataset.camera');scroll(.65);check('Reduced motion keeps the camera stationary',js('document.querySelector(".webgl-scene").dataset.camera')==reducedCamera);shot('reduced-motion.png')
# Restore animation preference, then check touch-size layouts.
run('set','media','light','no-preference');run('set','viewport','390','844');scroll(0);shot('mobile-hero.png');check('Mobile intro has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'))
scroll(.65);shot('mobile-analyze.png');scroll(1);shot('mobile-create.png')
run('set','viewport','1280','720');scroll(.65);shot('analyze-1280.png');check('1280×720 story fits horizontally',js('document.documentElement.scrollWidth<=innerWidth'))
# Simulate genuine GPU context loss: controls and fallback must remain usable.
run('eval','window.__lostContext=document.querySelector(".webgl-scene").getContext("webgl").getExtension("WEBGL_lose_context");window.__lostContext.loseContext()');run('wait','--fn','!!document.querySelector(".scene-fallback")');check('GPU context loss has an accessible fallback',js('!!document.querySelector(".scene-fallback")'));shot('fallback.png')
run('eval','window.__lostContext.restoreContext()');run('wait','--fn','!document.querySelector(".scene-fallback") && document.querySelector(".webgl-scene").dataset.renderer==="webgl"');check('WebGL context restoration recovers the scene',js('!document.querySelector(".scene-fallback")'))
run('set','viewport','1440','900');scroll(.65);run('a11y','--tags','wcag2a,wcag2aa','--json');(OUT/'intro-accessibility.json').write_text(run('a11y','--tags','wcag2a,wcag2aa','--json'))
run('eval','window.__sameDocument=true;window.__disposed=0;const gl=document.querySelector(".webgl-scene").getContext("webgl");const original=gl.deleteBuffer.bind(gl);gl.deleteBuffer=function(b){window.__disposed++;return original(b)}');run('click','.story-skip');run('wait','--text','Start drawing');check('Intro-to-editor transition does not reload the page',js('window.__sameDocument') is True);check('WebGL buffers are disposed on entering editor',js('window.__disposed')>=2);check('Editor replaces rather than hides the 3D scene',js('!document.querySelector(".webgl-scene") && !!document.querySelector("#molecular-canvas")'))
result={'passed':len(checks),'checks':checks};(OUT/'story-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2),flush=True)
````

## CREATE NEW FILE

FILE: `tools/make-standalone.mjs`

````javascript
import { readFile, writeFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
const root = resolve("dist");
function assetPath(url) {
  const path = resolve(root, url.replace(/^\.?\//, ""));
  if (relative(root, path).startsWith(".."))
    throw new Error("Invalid build asset path");
  return path;
}
let html = await readFile(resolve(root, "index.html"), "utf8");
for (const match of [
  ...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g),
]) {
  const code = await readFile(assetPath(match[1]), "utf8");
  html = html.replace(
    match[0],
    () =>
      `<script type="module">${code.replace(/<\/script/gi, "<\\/script")}</script>`,
  );
}
for (const match of [
  ...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g),
]) {
  const css = await readFile(assetPath(match[1]), "utf8");
  html = html.replace(match[0], () => `<style>${css}</style>`);
}
await writeFile(resolve(root, "ChemEase.html"), html);
console.log("Standalone app written to dist/ChemEase.html");
````

## CREATE NEW FILE

FILE: `tools/package.py`

`````python
"""Generate full source book, checksums and the integrated source archive.
Run from the project root: python3 tools/package.py
"""
from pathlib import Path
import hashlib,json,zipfile
root=Path.cwd()
excluded={'node_modules','.test-build','.cache','.git','dist','backup','qa','__pycache__'}
generated={'COMPLETE_SOURCE.md','FILES.json'}
text_files=sorted(p for p in root.rglob('*') if p.is_file() and not p.is_symlink() and not any(x in excluded for x in p.relative_to(root).parts) and p.name not in generated and p.suffix not in {'.log','.zip','.pyc'})
baseline={}
backup=root/'backup/original-source.zip'
if backup.exists():
 with zipfile.ZipFile(backup) as z:
  baseline={n.removeprefix('chemease-original/'):z.read(n) for n in z.namelist() if not n.endswith('/')}
def state(p):
 key=p.relative_to(root).as_posix()
 if key not in baseline:return 'CREATE NEW FILE'
 return 'RETAIN FILE' if baseline[key]==p.read_bytes() else 'REPLACE FILE'
book=['# ChemEase — complete integrated source files\n\nEvery text source/config file is included in full and labelled by its exact path and status relative to the uploaded project. Binary deliverables and the original-source backup are separate ZIP entries. FILES.json records checksums; this book and the manifest do not recursively include themselves.\n\n## File index\n']
for p in text_files:book.append(f'- `{p.relative_to(root).as_posix()}` — {state(p)}\n')
for p in text_files:
 name=p.relative_to(root).as_posix();content=p.read_text();language={'.tsx':'tsx','.ts':'typescript','.mjs':'javascript','.py':'python','.css':'css','.json':'json','.html':'html','.svg':'xml','.md':'markdown'}.get(p.suffix,'text')
 fence='````'
 while fence in content:fence+='`'
 book.extend([f'\n## {state(p)}\n\nFILE: `{name}`\n\n',f'{fence}{language}\n{content.rstrip()}\n{fence}\n'])
(root/'COMPLETE_SOURCE.md').write_text(''.join(book))
files=text_files+[root/'COMPLETE_SOURCE.md',root/'dist/ChemEase.html']
if backup.exists():files.append(backup)
manifest={'project':'ChemEase integrated scroll-WebGL edition','textSourceFileCount':len(text_files),'files':[{'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
(root/'FILES.json').write_text(json.dumps(manifest,indent=2)+'\n')
archive=root.parent/'ChemEase-integrated-source.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in files+[root/'FILES.json']:z.write(p,'chemease/'+p.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
 assert z.testzip() is None
 assert not any('/node_modules/' in n or '/.env' in n for n in z.namelist())
 assert 'chemease/src/Components/intro/MoleculeScene.ts' in z.namelist()
 assert 'chemease/package-lock.json' in z.namelist()
print(json.dumps({'archive':str(archive),'textSourceFiles':len(text_files),'zipBytes':archive.stat().st_size,'sourceBookBytes':(root/'COMPLETE_SOURCE.md').stat().st_size},indent=2))
`````

## CREATE NEW FILE

FILE: `tools/test.mjs`

````javascript
import ts from "typescript";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
async function compile(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await compile(path);
    else if (/\.tsx?$/.test(path) && !path.endsWith(".d.ts")) {
      const source = await readFile(path, "utf8");
      const compiled = ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
        fileName: path,
      });
      const dest = join(".test-build", relative(".", path)).replace(
        /\.tsx?$/,
        ".js",
      );
      await mkdir(join(dest, ".."), { recursive: true });
      await writeFile(dest, compiled.outputText);
    }
  }
}
await mkdir(".test-build", { recursive: true });
await writeFile(".test-build/package.json", '{"type":"commonjs"}');
await compile("src");
await compile("tests");
const tests = (await readdir(".test-build/tests"))
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => join(".test-build/tests", f));
const result = spawnSync(
  process.execPath,
  ["--preserve-symlinks", "--test", ...tests],
  {
    stdio: "inherit",
  },
);
process.exitCode = result.status ?? 1;
````

## REPLACE FILE

FILE: `tsconfig.app.json`

````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./.cache/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
````

## RETAIN FILE

FILE: `tsconfig.json`

````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## REPLACE FILE

FILE: `tsconfig.node.json`

````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./.cache/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## REPLACE FILE

FILE: `vite.config.ts`

````typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { target: "es2022" },
});
````
