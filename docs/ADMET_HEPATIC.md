# ADMET increment 2: hepatic clearance

This is a **parameter-based conditional prediction** using the classical
well-stirred (venous-equilibrium) liver model. Molecular structure identifies
the compound and saved version; no molecular descriptor, SMILES regression,
protein-binding predictor or intrinsic-clearance predictor supplies the inputs.

## Scientific model and evidence

- Experimental support: Pang & Rowland (1977), *J Pharmacokinet Biopharm*
  5:655–680, lidocaine in perfused rat liver:
  https://doi.org/10.1007/BF01059689 (PMID 599412).
- Clearance framework and assumptions:
  https://doi.org/10.1007/s10928-010-9187-8.
- An example of use in mechanistic PK documentation, hosted by EMA, is
  Annex 6, page 7, equations 10–11:
  https://www.ema.europa.eu/en/documents/other/annex-6-additional-supporting-documentation-system-parameters-compound-files_en.pdf.
  This document does not constitute regulatory approval of ChemEase.

The model has published experimental support. That is distinct from validating
a new compound/species, a particular entered input set or this product in humans.
No newly measured external RMSE, clinical accuracy or molecule-specific interval
is asserted. Arithmetic tests verify implementation, not predictive validity.

Frozen method `hepatic-well-stirred-v1`, evaluator/model
`well-stirred-blood-lh-v1`:

```
CLH = QH * fu,B * CLint,u / (QH + fu,B * CLint,u)
EH  = CLH / QH
FH  = QH / (QH + fu,B * CLint,u)
```

Inputs use whole-liver L/h for both blood flow QH and unbound intrinsic clearance
CLint,u. The unbound factor fu,B is referenced to **whole blood**, with a supported release
range of 0 to 1; plasma
fraction unbound is not directly interchangeable. Each parameter requires a
source, plus a common species/experimental context and explicit confirmation of
the basis/assumptions. Evidence is marked sourced or an exploratory scenario;
the software does not independently certify it. No physiologic defaults are
inserted. Each empty field remains absent, never zero.

1 mL/min = 0.06 L/h. Values in µL/min/mg microsomal protein or per million cells
must not be entered directly. The app performs no incubation-binding correction,
microsomal/hepatocyte scaling or plasma-to-blood conversion. Other blood-normalization
conventions or fu,B ratios outside this release range require separate review. Already-scaled
unbound whole-liver intrinsic clearance is required.

Example for arithmetic only, not an experimental compound prediction: QH=90
L/h, fu,B=0.1, CLint,u=100 L/h gives CLH=9 L/h, EH=0.1 and FH=0.9.

## Numerical behavior and applicability

The evaluator uses equivalent ratios rather than a potentially overflowing sum.
It computes FH directly rather than subtracting a nearly unit extraction ratio.
CLH is bounded by QH. Zero fu,B or CLint,u gives the mathematical limit CLH=0,
EH=0, FH=1. Such a limit does not prove absence of metabolism in vivo. Nonfinite,
negative, >1 fractions or zero flow are rejected. Positive inputs below numeric
precision produce an explained Not evaluable result, with null outputs.

Inputs must refer to one connected compound. Mixtures/salts are not assigned a
parent automatically. Charge alone does not disqualify an identity because this
is not a neutral-structure QSAR model. No neutralization is performed.

Assumptions: steady-state linear elimination, rapid mixing/venous equilibrium,
and no uptake/permeability limitation. Saturation, active transport, disease,
drug interactions and time dependence are not modeled. FH means escaping
hepatic first pass only; total oral bioavailability also depends on absorption
and gut first pass. CLH is not total clearance or half-life. No dosing, clinical,
safety or toxicity conclusion is supplied. Experimental validation for the
intended context remains necessary.

## Foundation and report contract

- `SavedHepatic` records identity, exact version/structure key, input set, model,
  values/status/reasons and time. It deliberately has no descriptor-result ID.
- Saving requires an unchanged saved drawing snapshot. Inputs/graph are captured
  before an asynchronous transaction. Exact duplicates deduplicate; changed
  settings, evidence, context or sources create separate immutable results.
- Restore verifies inputs, model and computed outputs against the recorded
  version. This is consistency checking, not authenticity certification.
- History identifies drafts versus saved versions, supports restoring saved
  input sets and exports complete-precision CSV with formula-safe user text.
- Comparison joins the latest result for the exact version/key, independent of
  unrelated descriptor selection. Context and input evidence accompany values.
  Comparisons across contexts are not automatically biologically comparable.
- `research-report-v4` freezes an explicit hepatic ID or null. Reports v1-v3
  retain their prior fields/meanings and cannot acquire hepatic references.
  Missing results stay missing after later predictions. Section choices control
  PDF/CSV inclusion. Reports use stored results, without recalculating chemistry.
- Owner-scoped storage, backup schema 1, editor behavior and earlier endpoints
  remain supported. There is no external prediction call or credential dependency.
- Batch does not apply one pharmacokinetic input set to unrelated compounds.

## Checks

Tests cover 180 independent integer-rational combinations; unit scaling,
monotonicity, flow bounds, zero limits, stable extreme inputs and numeric failure;
source/basis validation; atom/version binding, mutation isolation, transaction
failure, deduplication and restore; comparison, frozen/missing report sources,
legacy schemas, section exclusion, pagination and safe exports.

Physical iOS/Android and clinical/prospective validation are not claimed. Existing
3Dmol eval and bundle-size build warnings are separate release follow-ups.


Local verification: all 222 tests pass, together with lint, type checking and
production/standalone builds. Browser QA covered required inputs and basis,
invalid/blank values, exact save/history and CSV downloads, report v4 freezing
across new input sets, reload persistence, comparison/navigation and 320/390/768px
layouts without horizontal overflow. The actual four-page PDF was rendered and
visually inspected; downloaded CSV arithmetic and input provenance were checked.
No GitHub push or deployment was performed.
