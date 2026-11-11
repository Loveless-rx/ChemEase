# ADMET increment: aqueous skin permeability

The first ADMET endpoint is **aqueous skin permeability**, not intestinal absorption,
BBB penetration, a percentage absorbed, dose or safety classification. No service
credentials or runtime network call is needed. The prediction logic, settings,
persistence, page, exports and report join are separate modules.

## Model and evidence

Method `skin-pg-cdc-v1`; frozen model `potts-guy-niosh-cmh-v1`:

`log10 Kp (cm/h) = -2.74 + 0.71 × neutral LogKow - 0.0061 × MW (g/mol)`

`Kp (cm/h) = 10^(log10 Kp)`; `Kp (cm/s) = Kp (cm/h) / 3600`.

The coefficient/intercept convention is pinned to the official CDC/NIOSH
SkinPerm calculator's `skinperm.PGMethod(double MW, double LogKow)` constructor.
Other published rounded intercepts or cm/s formulas must not be mixed with it.

- Potts & Guy (1992), *Pharmaceutical Research* 9:663–669:
  https://doi.org/10.1023/A:1015810312465 (PMID 1608900). Published fit: 93
  compounds, r² 0.67. This is fit performance, not an external accuracy estimate.
- CDC/NIOSH calculator:
  https://www.cdc.gov/niosh/skin-exposure/resources/skin-permeation-calculator.html
  and https://ftp.cdc.gov/pub/niosh/skin/SkinPerm.jar.
- Independent comparison (2008): https://doi.org/10.1002/jps.21074
  (PMID 17722002). Seven models, 124 compounds; Potts–Guy ranked second.
  No numeric external error or molecule-specific interval is asserted here.

This is a published, independently evaluated empirical model. That evidence
does not make a new molecule's prediction an experimentally validated value.
The app does not claim a new clinical or prospective validation.

## Inputs and applicability

MW comes from the shared, structure-bound RDKit 2026.09.2 descriptor snapshot.
The user supplies neutral-species LogKow, a source/conditions string, and whether
it is a reported or estimated value. Sources are recorded, not independently
certified. There is no automatic substitution of Crippen LogP or pH-specific LogD.
Estimated LogKow adds input uncertainty. Zero is allowed; a blank input is absent.

The app conservatively refuses charged/zwitterionic, disconnected, noncarbon,
metal-containing, isotope-labelled or unsupported stereo structures. No
normalization, protonation or tautomer selection is done. Numeric guards are MW
18–750 g/mol and LogKow -3 to 6 inclusive. These are conservative reference-range
guards, **not a validated chemical-similarity applicability domain**.

Model assumptions include an aqueous vehicle and intact skin. Formulation,
damaged skin, pH/ionization, exposure duration, transporters and clinical outcomes
are not modeled. Experimental confirmation remains necessary. No molecule-specific
confidence interval, absorption percentage or low/high safety label is supplied.

Example for arithmetic only: MW 78.11, entered LogKow 2.13 gives log10 Kp
`-1.7041710000000005`, Kp about `0.01976191 cm/h`, or `5.48942e-06 cm/s`. This is not a
measurement and the example input is not certified by the app.

## Reproducible implementation checks

`vendor/skin/cdc-reference.json` contains 20 numeric cases, plus the downloaded
JAR and PGMethod class SHA-256 hashes. The JAR itself is not shipped. Regenerate
or verify after downloading the official file to ignored `qa/skin/SkinPerm.jar`:

`python tools/verify-skin-reference.py`

The tool interprets only an allowlisted arithmetic subset of the constructor
bytecode. It does not execute the JAR or load Java classes. A changed upstream
artifact fails verification and needs explicit scientific/model-version review.
Tests always run the committed fixtures without a network download. Numeric
parity is implementation verification, not evidence of predictive accuracy.

## Foundation, history and reports

Saving requires the exact saved drawing snapshot. A single transaction retains
the exact descriptor result, settings, model, results, engine, version and time.
Identical payloads deduplicate; different sources/values/evidence remain separate
immutable history. Live inputs reset on chemistry changes; moving or renaming a
structure does not change its chemistry key. Backups validate predictions against
their recorded inputs and reject changed values or mismatched links. This validates
consistency, not authenticity of an imported user's chemical measurements.

Comparison uses the latest saved prediction joined to the selected exact
descriptor ID, engine, version and structure key. New `research-report-v3` records
freeze an explicit skin result ID or null. Missing results stay missing after new
predictions. V1/V2 reports cannot acquire skin fields and retain prior meanings.
PDF and CSV carry model, inputs, source, unit conversions and limitations. Report
section choices control inclusion. No chemistry is rerun to generate reports.

Batch intentionally does not apply one LogKow across unrelated compounds. Each
compound needs its own sourced input through the ADMET page. Future endpoints
should have separate versioned models and endpoint-specific validation, joining
the same foundation rather than expanding this equation's scientific scope.
