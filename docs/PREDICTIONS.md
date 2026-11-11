# Phase 4 — Predictions

## First module: aqueous solubility

The first implemented prediction is `esol-rdkit-v1`, a fixed Walters RDKit refit of Delaney's ESOL model. Solubility is a model estimate, distinct from graph-derived descriptors and heuristic drug-likeness screens. ADMET endpoint predictors are not implemented or represented by placeholder values. Each later endpoint needs its own licensed model, provenance, independent evaluation and supported-input policy.

### Pinned model

Source: Patrick Walters, MIT-licensed implementation at commit `d1536c58afe5e0e7ac4c96e2ffef496d5b98664b`, retained with its license and source SHA-256 manifest under `vendor/esol`.

The fixed equation is:

`logS = 0.26121066137801696 - 0.7416739523408995 * LogP - 0.0066138847738667125 * MW + 0.003451545565957996 * RB - 0.42624840441316975 * AP`

Inputs: RDKit 2026.09.2 average molecular weight in g/mol; Wildman–Crippen LogP; strict rotatable-bond count; aromatic heavy-atom proportion. AP is aromatic non-hydrogen atoms divided by total non-hydrogen atoms. Drawn hydrogen atoms do not inflate the denominator. Model concentration is `10 ** logS` mol/L; mass concentration is mol/L multiplied by MW, in g/L. No rounded number is used in calculation, persistence or export.

This is not the original Daylight-parameter equation, an original ESOL accuracy claim, or a newly trained ChemEase model. The four coefficients are not fitted or tuned on the external test set. Contributions and exact inputs are available in the UI/CSV. The original paper describes a broader 2,874-measurement fit; this RDKit implementation's reference file contains 1,144 records. Those sets must not be conflated.

Primary sources:

- Delaney (2004), https://doi.org/10.1021/ci034243x
- Fixed implementation: https://github.com/PatWalters/solubility/blob/d1536c58afe5e0e7ac4c96e2ffef496d5b98664b/esol.py
- Author's separate validation subset and rounded outputs: files `dls_100_unique.csv` and `solubility_comparison.csv` in that same commit.
- DLS provenance: https://doi.org/10.17630/3a3a5abc-8458-4924-8e6c-b804347605e8 and Boobier et al. (2017), https://doi.org/10.1186/s13321-017-0250-y.

### Actual external evaluation

All 56 records in the author's DLS subset were scored using the pinned JS/WASM descriptor engine and fixed equation, without refitting or selecting coefficients on the test set. Canonical structure comparison with stereochemistry excluded found zero overlap with the 1,144-row reference file. Every row parsed; none was removed to improve the metrics.

| Check | Result |
| --- | --- |
| External molecules | 56 |
| RMSE | 1.0295186294607326 logS units |
| Mean absolute error | 0.8219761655050376 logS units |
| Mean signed error | -0.018255540594854545 logS units |
| Largest difference from author's two-decimal predictions | 0.004971432921154761 logS units |
| Canonical overlap with reference file | 0 |

This is a small external benchmark, not clinical validation or a guarantee of a new compound's accuracy. A one-log-unit error means a tenfold concentration difference. There is no molecule-specific confidence interval or calibrated uncertainty estimate, and none is invented. Existing ESOL paper performance must not be substituted for these measured implementation-specific results. The test set was not used to fit the model.

Raw stereochemical SMILES in the benchmark are evaluated directly for descriptors, which do not model stereochemistry. Production input retains the editor's existing restriction: unsupported stereo annotations are rejected, never silently removed. The external descriptor benchmark does not certify the editor's ability to import every source SMILES.

Verification files were downloaded for local checks only under ignored `qa/esol`; they are not bundled in the public application or source-vendored model folder. The St Andrews portal labels downloads CC BY-NC; the journal separately describes free reuse with citation. Keep dataset use/distribution distinct from the implementation's MIT code license. Only aggregate metrics, source links and hashes are distributed here. The app never queries that dataset during prediction.

To repeat the full check: obtain `delaney.csv`, `dls_100_unique.csv` and `solubility_comparison.csv` from the pinned source. Place them in `qa/esol`, run `npm test` to compile the pure model, then `node tools/validate-solubility.mjs`. The tool verifies raw hashes and pinned metrics/ranges and writes detailed local results. Normal CI without these verification datasets runs the offline chemistry/model/contract tests and explicitly skips the optional full benchmark. In this development run all 192 tests, including the full external benchmark, passed with zero skips.

### Applicability and unsupported inputs

The model supports one connected, neutral, carbon-containing structure with supported organic elements. Charged species and zwitterions, salts/mixtures, metals/unspecified atoms, isotope labels, unsupported stereo and descriptor engines other than RDKit 2026.09.2 receive Not evaluable. The drawing is not neutralized or normalized. Failed descriptor calculations cannot produce a result. Missing inputs are not converted to zero.

A conservative extrapolation guard uses observed descriptor minima/maxima from the full reference set: MW 16.043–780.9490000000001; LogP -7.571399999999989–10.388599999999993; strict RB 0–23; AP 0–1. Bounds are inclusive with a numerical tolerance of 1e-10. Outside any range yields Not evaluable, not an extrapolated number. This envelope is only a range check, not an established chemical-similarity applicability domain. Passing it does not prove the molecule is in-domain or its prediction is reliable.

ESOL does not use or adjust for pH, temperature, salt form, crystal/polymorph form, formulation or miscibility. It is not a pH-specific total-solubility, formulation, dissolution-rate, safety or efficacy predictor. Experimental confirmation is necessary for decisions.

## Foundation and Research Tools connections

- The live page consumes the same active graph and `useMoleculeAnalysis` descriptor cache as Properties. Stale graph results are ignored by the shared hook; a mismatched chemistry key is rejected.
- Save requires an unchanged saved structure. One transaction stores/reuses its exact descriptor snapshot and adds a typed `esol-rdkit-v1` result referencing it. Identical source/model saves deduplicate; failures publish neither partial record. Historical predictions stay attached to their immutable versions and are labelled separately from drafts.
- Predictions include model/validation version, engine, graph key, full inputs/contributions, status, exclusion reasons, raw logS/mol/L/g/L, source descriptor ID and timestamp. Restore reconstructs the expected output from the recorded source and frozen evaluator and rejects altered models, values or links. Imported descriptor snapshots retain recorded provenance, not independent scientific certification.
- Comparison joins only predictions referencing the selected exact descriptor result and engine. Missing results are Not calculated; unsupported results stay Not evaluable. Descriptor plots keep their existing axes, without pretending they are ADMET classification plots.
- Batch has an optional ESOL checkbox. It calls the same evaluator inside the normal atomic row transaction. Result cards and CSV identify the prediction separately from descriptors; no separate model implementation or input path exists.
- New reports use `research-report-v2` with an explicit frozen solubility reference (including null) and section flag. Old `research-report-v1` definitions remain valid and cannot acquire prediction fields. New results never silently fill a missing old report source. PDF/CSV use the stored prediction, its inputs, units, source and validation limitations. Older report reference/limitation text remains unchanged.
- Owner-scoped repository/session boundaries remain intact. No API keys, external prediction transmission, login or role checks are embedded in chemistry code.

## Verification and release limits

192 tests pass, including pinned source hashes/coefficients, author reference examples, external benchmark reproduction, concentration conversions, AP with drawn hydrogens, inclusive ranges/extrapolation, unsupported chemistry, stale keys, atomic/deduplicated saves, failed storage, altered backups, exact comparison/batch joins, legacy/new report references and safe CSV precision. Lint, production/type checking and standalone builds pass.

Browser checks cover batch predictions for aspirin, benzoic acid and a zwitterion; exact comparison values; saved history after reopening; report v2 sources; downloaded CSV/PDF; and 320/390/768px layouts. Exported values/units were independently checked against stored inputs. The twelve-page PDF was rendered and visually inspected with supported and unsupported outcomes. This is browser viewport QA, not certification on physical iOS/Android devices. Existing dependency advisories and bundle-size/3Dmol build warnings from earlier phases remain separate release follow-ups. Work is local; no GitHub push or deployment was performed.


## Next increment: ADMET skin permeability

Implemented separately in `src/features/skin`; see [ADMET skin model](ADMET_SKIN.md).
New reports now use v3 with explicit frozen solubility and skin IDs. V1 and V2
remain supported without adding fields or filling missing historical results.
Skin requires its own sourced neutral LogKow and is intentionally not applied to
an entire batch with one input. Rejected BBB candidates are documented in
[model review](ADMET_MODEL_REVIEW.md); no unvalidated BBB output is offered.
