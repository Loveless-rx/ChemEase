# hERG conversion evidence

Pinned ADMET-AI 1.4.0 hERG classification ensemble converted for browser inference.
See docs/HERG_BROWSER_VERIFICATION.md for the current integration status and
scientific limits. These numerical fixtures verify implementation parity, not
independent predictive accuracy.

- browser-reference.json: ten native raw/normalized feature vectors and member scores.
- inference-reference.json: native graph tensors and checkpoint-layout fixtures.
- source-manifest.json: original model/source SHA-256 identities.
- verification-summary.json: 78-structure conversion and browser UI check summary.
- Fragment, EState, graph, QED and topology files: focused regression fixtures.
- ADMET_AI_LICENSE.txt: MIT model/source notice.
- QED_LICENSE.txt: Novartis BSD notice. RDKit BSD notice: docs/RDKIT_LICENSE.txt.

Runtime assets and additional notices live in public/herg. Browser-only product
parity: start Vite on port 5174, then run node tools/herg/verify-browser-parity.cjs.
