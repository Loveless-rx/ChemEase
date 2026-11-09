# SMILES and molecular descriptors

## Workflow

1. Open **SMILES** above the canvas or **SMILES to structure** in the information panel.
2. Paste one SMILES string, choose an example, or open a single-entry `.smi`, `.smiles` or `.txt` file. An optional molecule name is retained.
3. **Validate SMILES** parses and sanitizes the input with RDKit and generates 2D coordinates. The canvas is unchanged until **Open in editor** is chosen. Replacing unsaved work requires confirmation, and import participates in Undo/Redo.
4. Atom, bond, charge and hydrogen edits update canonical SMILES, formula, mass and descriptors. Dragging atoms changes drawing coordinates without recalculating chemical properties.
5. **Analyze Structure** shows the descriptor cards. **Export** downloads PNG/SVG, JSON, canonical `.smi`, V3000 MOL, SDF or CSV. The `.smi` export can be opened through the SMILES dialog again. JSON remains the lossless editor project format.

## Models

- RDKit version is pinned in `package-lock.json` and displayed with results.
- LogP and molar refractivity use Wildman–Crippen estimates for the structure as drawn. Charged structures are not automatically neutralized.
- TPSA uses RDKit's topological polar surface area calculation.
- HBD/HBA use `NumHBD`/`NumHBA`, not the simplistic N/O atom counts named `lipinskiHBD`/`lipinskiHBA` in MinimalLib.
- Rotatable bonds use RDKit's strict count. Ring count uses RDKit perceived rings. Structural properties also shows independent graph cycles, which may differ for complex systems.
- Formal charge sums atom charges. Heavy atoms exclude hydrogen.
- LogD uses a manually entered pKa and pH, with either the monoprotic acid or base equation. It assumes only the neutral species partitions into octanol. It is disabled for charged structures, zwitterions and disconnected fragments. Multiple ionization sites require a more sophisticated model. Inputs reset after chemistry changes and are included with the estimate in the panel's CSV download.

## Safety of conversion and failure states

SMILES import rejects invalid valence, unsupported elements/bonds, radicals, wildcard atoms, stereochemical annotations and multiple entries. The importer compares canonical SMILES before and after graph conversion; a mismatch is rejected before the canvas changes. The current editor does not draw or edit stereochemical bonds faithfully, so stereo information is never silently discarded on import.

The editor limits remain 1,500 drawn atoms and 6,000 bonds; SMILES text is limited to 10,000 characters and imported SMILES files to 20 KB. Toolkit objects are freed after each operation. Loading failures have a retry action; stale asynchronous results are ignored after an edit or dialog closure. Descriptor cards show no values while pending or failed instead of substituting rough graph counts.

RDKit runs locally. Its JavaScript and WASM are packaged under `dist/rdkit/`; the standalone embeds both. No CDN, API key or chemistry server is required. The optional PubChem 3D lookup remains an explicit external action. Computed descriptors are model outputs, not measured properties or guarantees about stability.

## Verification

Automated tests cover ethanol/aspirin reference values; caffeine, fused rings, aromatic nitrogen, salts, ions, isotopes, nitriles, phosphorus and sulfur compounds; comparison to RDKit's direct SMILES descriptors; project JSON and MOL/SDF/SMILES round-trips; edit/undo/redo behavior; CSV fields and formula-safe names; invalid input and LogD equations. Browser checks cover the production build, embedded standalone engine, SMILES copying, CSV download and phone layouts.

References: https://rdkitjs.com/docs/interfaces/Mol.html and https://www.rdkit.org/docs/cppapi/namespaceRDKit_1_1Descriptors.html.
