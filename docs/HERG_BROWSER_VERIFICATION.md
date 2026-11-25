# Browser-only hERG verification

Current status (25 November 2026): integrated locally under ADMET → hERG.
Earlier milestone notes below are historical and superseded by this status.

- Pinned RDKit WASM build 45443505149 passed; artifact SHA-256 verified.
- Historical MinimalLib truncation corrected to full descriptor precision.
- Historical property-registry Chi2n/Chi2v mismatch bypassed with direct calls.
- Upstream preprocessing preserved: canonical isomeric SMILES for descriptors,
  supplied SMILES atom order for the Chemprop graph.
- 78 structures: 15,600 raw descriptor comparisons passed (1e-6 relative/absolute
  floor); all native graph tensors matched exactly. All 15,600 normalized float32
  features matched exactly. Maximum ensemble score error 7.142190980302665e-8.
- Ten original structures include boundary inputs used only for conversion checks;
  the UI applies stricter input guards. The additional 68 structures are sampled
  deterministically from the existing Delaney verification data. These are not
  independent labelled hERG validation data and no accuracy metric is inferred.
- Actual product worker uses typed JS inference, self-hosted historical RDKit,
  Pyodide/SciPy normalization, and verified model/parameter bytes. No server-side
  Python and no external inference requests. Assets are approximately 92 MB,
  fetched only when the user starts a prediction, and run in a cancellable worker.
- Production build: desktop and Chromium phone emulation prediction, reload,
  guest download gate, same-origin model loading, no horizontal overflow and no
  page errors passed. Physical phones and low-memory devices are not certified.
- Workspace/account repository tests cover saved hERG records, reload, separate
  guest/account scopes, malformed provenance, exact version binding, immutable
  reports, null frozen references and backwards compatibility with report v4.
- 269 tests, lint and production build passed. PDF output rendered for visual QA.

Reproduce the committed ten-structure product-worker check with a Vite dev server
on port 5174 and `node tools/herg/verify-browser-parity.cjs`. Native reference
vectors and model tensor-layout fixtures are in vendor/herg. Source checkpoint
SHA-256 values are retained in source-manifest.json; static runtime identities
are in public/herg/manifest.json and src/features/herg/assetIdentity.ts.

Scientific scope: a published research-model conversion, not prospective clinical
validation. Full-data distributed checkpoints are distinct from benchmark split
models. No benchmark AUROC, sensitivity, specificity or calibrated confidence is
claimed for these production weights. Output is a blocker-class model score,
not a measured inhibition constant, an IC50, clinical risk or proof of safety.
The app does not silently alter protonation or strip salts. Input guards are
conservative product limits, not a validated chemical applicability domain.

Saved records preserve the model source commit, chemistry/preprocessing versions,
input and canonical descriptor SMILES, 200 raw/normalized inputs, member scores
and mean. Import validation checks provenance, shapes, finite values and mean
consistency; it does not independently rerun the scientific model on imported
records. Reports retain that limitation and freeze exact result IDs.

Native reference environment: Python 3.11.18, RDKit 2023.03.3, Chemprop 1.6.1,
chemfunc 1.0.4, Torch 2.5.0 CPU, descriptastorus 2.8.0, NumPy 1.25.2,
SciPy 1.16.3. Some transitive dependencies were not pinned by the original model
requirements; this is a documented reference environment, not a claim to recover
all historical training dependencies. Browser SciPy 1.12.0/NumPy 1.26.4 matched
all evaluated normalized float32 values.

## Historical development notes

# hERG browser verification — 2026-11-24

Status: NOT RELEASED. No browser predictions, accuracy claims or report entries.

## Verified assets

Pinned ADMET-AI v1.4.0 source: 9c8430862b2afd997ff1d314b30bda4418fa9b33.
All five classification checkpoints downloaded and SHA-256 hashed. These are
multitask models, not dedicated hERG-only networks. The checkpoint strings include
the hERG task and graph encoder tensors. Pickle was inspected with pickletools,
not executed. No molecular data were transmitted.

## Preprocessing blocker

The pinned requirements specify chemfunc 1.0.4, Chemprop 1.6.1 and RDKit 2023.3.3.
The actual chemfunc source calls descriptastorus RDKit2DNormalized.process on
isomeric canonical SMILES, drops the leading status element, replaces NaNs with
zero, and casts to float32. It is NOT a Morgan fingerprint or the small public
ChemEase ToolkitResult. The normalization distributions, descriptor ordering and
all descriptor implementations need reproduction before model parity tests.
ChemEase uses the minimal RDKit 2026.09.2 WASM build; equivalence is unverified.
Converting just the network while substituting/missing these inputs is invalid.

## Validation interpretation

Upstream admet.csv hERG row: size 648; human classification; listed AUPRC
0.925968621 and AUROC 0.858940863. These are upstream metadata, not a new ChemEase
benchmark, not guaranteed performance of the shipped full-data checkpoints, and
not a calibrated probability or molecule-specific confidence interval. Benchmark
split checkpoints and full-data production checkpoints must not be conflated.

## Remaining release gates

- Reproduce full native inference and locate exact validation split/checkpoints.
- Verify normalization dependency/version and preprocessing parity.
- Convert graph encoder and all five ensemble members, preserving task ordering,
  aggregation, activations and floating-point tolerances.
- Compare browser/native values on a fixed diverse chemical cohort, including
  atom/bond/charge/stereo boundary cases; check memory and latency on phone.
- Only then integrate versioned prediction records and a new frozen report schema.

Primary sources:
https://github.com/swansonk14/admet_ai/tree/9c8430862b2afd997ff1d314b30bda4418fa9b33
https://pypi.org/project/chemfunc/1.0.4/
https://doi.org/10.1093/bioinformatics/btae416

## Asset hashes

- `admet_ai/admet_model.py`: `d4a3397ae069a1bc831019d51313763bfaa4050a03931a0a7b2945e0492c95cd` (13201 bytes)
- `admet_ai/resources/data/admet.csv`: `9108b20d7164a9ba7c4d9c2d4f343cbaac68d63369f1af560e218ca703bc22a5` (8921 bytes)
- `scripts/compute_rdkit_features.py`: `088fe56a2a6951ffb1cda6e7e8de93a4350a18f23fadc2281ce5d51af57479e5` (1134 bytes)
- `requirements.txt`: `81dd4c2871263a36103e318a6bb407d96690c8a702e47bc4bf8f608607678ce4` (206 bytes)
- `LICENSE.txt`: `47aa1773668b111d8ca2d44d3707a5f7cb82092236193c922614c4d5868e3057` (1069 bytes)
- `admet_ai/resources/models/admet_classification/model_0.pt`: `48ed42c3ec284b027dbc054ceae76b0520eb9aff8bf0b3e37b26a446ee537137` (1705141 bytes)
- `admet_ai/resources/models/admet_classification/model_1.pt`: `52a6bdac71c851ea8325c4860e913d3ed79017dd03b3d40116481dd6e1a48433` (1705141 bytes)
- `admet_ai/resources/models/admet_classification/model_2.pt`: `28be5980c28b2618da25fa6dbabc7f92ede130c675c66b75b259d4beb2d449cb` (1705141 bytes)
- `admet_ai/resources/models/admet_classification/model_3.pt`: `6a34383cd726e51aa8f87ba3d65debba448a43ffee9b1f8dfdaf42d034b7b187` (1705141 bytes)
- `admet_ai/resources/models/admet_classification/model_4.pt`: `766dffd5317e575752758444eccca96181d50a9cd47eb5faf0b46b5081b23c0c` (1705141 bytes)
## Native reference milestone

Pinned RDKit 2023.03.3 and torch 2.5.0 CPU inference completed for ten structures,
including neutral examples, ions, fragments and a stereochemical input. All five
ensemble members were evaluated through Chemprop 1.6.1 and the actual chemfunc
RDKit2DNormalized pipeline. Output is 200 float32 features and hERG task index 30.
`qa/herg/native-reference.json` retains feature vectors and per-member outputs;
`qa/herg/native-reference.py` is the local reference script. These are parity
fixtures, not an external accuracy benchmark. Unsupported clinical/chemical
inputs appearing in a reference fixture do not imply supported product scope.

Measured browser feature audit: minimal RDKit 2026.09.2 exposes 43 descriptors.
169 of the required 200 feature names lack direct candidates even after explicit name mappings. Name matches still require numerical checks.

Browser conversion remains blocked on implementing or compiling the full feature
pipeline, including normalization distributions and missing descriptor families.
No zero-filled fallback, proxy fingerprint or surrogate model was introduced.
Native reference verification is complete for the initial cohort; browser feature
parity, graph conversion, mobile checks and product/report integration remain open.

## Normalization inventory

Native distribution parameters and package versions were frozen in ignored local
`qa/herg/normalization-reference.json`. The pipeline uses 47 distinct scipy
distribution families, including nct, ncf and ncx2. A generic sigmoid or linear
scaler is not equivalent. Installed descriptastorus is 2.8.0 and scipy is 1.16.3;
these transitive versions are recorded, not assumed to match the paper
environment (which did not pin them in requirements.txt). Before release,
reference fixtures must be regenerated after resolving historical dependency
provenance, or clearly documented as this exact reproducibility environment.

## Raw descriptor numerical parity increment

Captured native raw vectors with Descriptastorus RDKit2D in
`qa/herg/raw-feature-reference.json`, alongside the normalized reference vectors.
`qa/herg/compare-raw.cjs` evaluates actual minimal RDKit WASM descriptors for the
same ten SMILES, using explicit aliases and case-normalized names. All 310
comparisons (31 features x 10 inputs) passed tolerance
`abs(browser-native) <= 1e-6 * max(1,abs(native))`.

This verifies the shared raw features only, on this small conversion cohort.
It does not validate clinical predictions, all chemistry or the missing 169
features. Normalization and full browser ensemble inference remain unverified.
No lookup table of known molecule outputs, zero-filled missing feature vectors,
or silent native-server fallback has been introduced.

## Fragment port milestone

86 fragment features ported through exact pinned SMARTS and actual browser RDKit matching. All 860 native count comparisons passed. Research-only module and fixture tests added; 117 of 200 raw features now have initial numerical checks. Remaining: 83 raw descriptors, normalization and ensemble runtime. No predictor is enabled.

Correction: native fragment registry contains 86 entries but 85 unique feature names. Last-wins deduplication matches native lookup. Release test covers 850 unique feature counts; total initial raw coverage is 116/200, leaving 84.

## Additional mapping checks and discovered incompatibility

ExactMolWt -> exactmw, NumHDonors -> NumHBD and RingCount -> NumRings
passed the ten-reference cohort. Shared raw coverage now comprises 34 candidate
features (340 numerical checks) plus 85 unique fragment features: 119/200.
81 raw descriptors remain unsupported, and the full normalization and inference
pipeline is not released.

A proposed NumHAcceptors -> NumHBA mapping FAILED: the native RDKit 2023.03.3
reference returned 6 for caffeine, while minimal RDKit 2026.09.2 returned 3.
The mapping was removed. A name match or modern chemistry interpretation cannot
replace the historical model input definition. This discrepancy must be resolved
against original preprocessing before accepting any model parity result.

A complete browser deployment therefore requires a version-matched chemistry
runtime or audited ports of remaining feature definitions, followed by native
parity and model-level checks. Current product data/report schemas have not been
extended to accept unverified hERG predictions.

## Acceptor mismatch resolved

The historical RDKit 2023.03.3 Lipinski.HAcceptorSmarts matches six atoms in
caffeine (indices 1,3,6,8,10,13), consistent with its CalcNumHBA output. The exact
historical SMARTS also matches those six atoms in minimal RDKit 2026.09.2.
The mismatch was a descriptor-definition change, not failed SMARTS support.
A dedicated historicalAcceptorCount port and ten native regression fixtures
now preserve historical semantics without altering ChemEase's normal descriptors.
Initial raw coverage is now 120/200; 80 raw features remain before normalization
and graph ensemble inference. No model is enabled.

## Historical WebAssembly build preparation

Resolved Release_2023_03_3 to b598a27802d30d2f07913fe40ede0d9fb60e4239.
Prepared a manually dispatched, research-only GitHub Actions job and build script,
using Emscripten 3.1.45 and the historical MinimalLib target. Local Docker/WSL,
CMake and Emscripten are unavailable, so this job has NOT been executed or verified.
It builds only a baseline runtime: full descriptor bindings, Python-defined
feature ports, normalization, model conversion and release tests are still needed.
No workflow result or compile success is claimed. Artifacts are research-only and
are not copied into public/ or included in the deployed app.

## JavaScript network parity milestone

Converted all five classification ensemble members to float32 research tensor
files and retained only the hERG readout row (task index 30). Implemented the
historical directed bond-message updates, reverse-bond subtraction, depth-three
ReLU encoder, mean atom pooling, 200-feature concatenation, readout and sigmoid.
`tools/herg/verify-network.cjs` compares that arithmetic against native outputs.
Native graph and normalized descriptor fixtures are used: this is NOT an
end-to-end molecular prediction test.

Node and actual Chrome JavaScript both passed all ten fixture ensemble outputs
with maximum absolute mean error 2.697336576318321e-8 (tolerance 1e-5).
Research outputs: qa/herg/network-parity.json and browser-network-parity.json.
Full browser graph generation, missing descriptors and normalization remain open.
No runtime model is enabled or exposed to product reports.

## Historical WASM artifact verified

GitHub Actions run 45422410439 completed successfully after compiler/link and
CommonJS artifact-loader repairs. Downloaded artifact SHA256SUMS verified locally.
Actual Chrome loading from the local static site returned RDKit 2023.03.3,
43 baseline descriptors, and ethanol average mass 46.069. Record:
qa/herg/historical-browser-smoke.json. No Python server participated.

This historical MinimalLib baseline still exposes only 43 descriptors. Version
matching alone does not add the Python-defined/extra descriptors. Full bindings,
normalization and graph-feature generation remain required before end-to-end
prediction parity or release. Research artifacts stay outside public/.

## Graph encoding and normalization fixture checks

Pure JavaScript graph encoding now matches all native graph tensors for the ten
reference structures (test herg-graph). EState extrema, EState/VSA hybrids,
NumValenceElectrons and HeavyAtomMolWt ports matched 270 native fixture values;
these tests supply native atom properties and atom areas, so full structure-to-
features parity is not established by them.

Pinned Pyodide 0.26.4 / SciPy 1.12.0 running in Chrome matched all 2,000 native
normalized float32 fixture values exactly. This is a browser WebAssembly runtime,
not a Python backend. No runtime dependency has yet been added to the product;
self-hosting, load size and mobile memory checks remain open.

Extended WASM build 45438107039 failed on MolSurf.h requiring a preceding string
header. The patch now includes string first and also exposes atomic Labute areas
needed for EState/VSA. That corrected extended build has not yet passed compilation.
