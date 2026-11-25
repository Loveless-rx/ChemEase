# Models reviewed but not shipped

BBB candidates were held out of the product after independent discrimination
checks. Their weights, raw datasets and temporary training dependencies remain
only in ignored local `qa/admet`; none are runtime assets or app dependencies.

The public TDC BBB_Martins–Morgan MLP (Hugging Face revision
`43c57a0613816f90419a34245421c0459ba9c011`) had no numeric performance for the
specific published weights in its model card. It must not be assigned the TDC
leaderboard score of a different model/split. On a conservative B3DB A/B subset
excluding all reference parent topologies and unsupported/duplicate structures
(936 molecules; 691 positive, 245 negative), the weights produced AUROC
0.6738946809 and specificity about 0.3061 at threshold 0.5.

A separately fitted RF baseline selected only on a grouped reference validation
split yielded internal-test AUROC 0.861686, but external AUROC 0.68598 and
specificity about 0.2571. It failed its external release gate and generated no
runtime model. External data were not used to tune the baseline or its threshold.
Neither candidate is offered as a BBB prediction in ChemEase.

Research sources: https://huggingface.co/tdc/BBB_Martins-Morgan,
https://github.com/theochem/B3DB (revision
`75dab1cc607bb7a03f3de5c576cffd223e767844`), and
https://pmc.ncbi.nlm.nih.gov/articles/PMC8556334/.

The released increment is instead the separately sourced published Potts–Guy
skin-permeability model documented in ADMET_SKIN.md. Its literature evidence and
numeric implementation checks must not be confused with the rejected BBB results.

## Next endpoint candidate review — 2026-11-24

Candidate family: ADMET-AI, with hERG inhibition as the proposed next endpoint.
Status: research candidate only; no released prediction, threshold or accuracy claim.

The upstream main README explicitly distinguishes v2 (Chemprop v2, retrained
without RDKit fingerprints) from the v1 paper and hosted web server. Therefore
v1 validation must not be assigned to v2 weights. The upstream README points to
v1.4.0 commit `9c8430862b2afd997ff1d314b30bda4418fa9b33` for paper reproduction.
The repository advertises an MIT license; dataset and bundled-weight terms still
need endpoint-specific verification before redistribution.

Primary sources:
- https://github.com/swansonk14/admet_ai
- https://github.com/swansonk14/admet_ai/tree/9c8430862b2afd997ff1d314b30bda4418fa9b33
- https://doi.org/10.1093/bioinformatics/btae416

Release requirements:
1. Pin model files and preprocessing code by commit and SHA-256.
2. Verify the exact hERG task definition, assay threshold, probability meaning,
   splitting protocol and model-specific validation numbers from primary assets.
3. Reproduce native reference inference before any browser conversion.
4. Compare browser and native outputs across ordinary and boundary chemistry;
   block unsupported inputs rather than predicting on changed molecular states.
5. Confirm runtime/memory on phone and PC. A Python reference implementation is
   not a browser runtime, and a hosted demonstration is not an authorized API.
6. Freeze method/version/structure/input/output records, retain missing values,
   and extend report schema without changing older report meaning.

Open execution decision: browser conversion of the pinned model versus a hosted
inference service. Existing browser-only docking remains unchanged. No remote
molecular submission should be introduced silently.


## hERG local integration status - 25 November 2026

The v1.4.0 research model is integrated locally after full structure-to-score
browser/native parity checks on 78 conversion structures. See
HERG_BROWSER_VERIFICATION.md for the exact scope, source files and limitations.
The product uses self-hosted WebAssembly and JavaScript in a worker and remains
compatible with static GitHub Pages hosting. There is no external inference API.
Full-data checkpoints are not represented as benchmark-split models; no
unsupported accuracy or per-molecule confidence claim is shown.
