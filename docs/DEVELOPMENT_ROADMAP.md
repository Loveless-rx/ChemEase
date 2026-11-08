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
