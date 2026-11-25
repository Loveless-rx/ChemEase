ChemEase browser-only hERG runtime

Model: ADMET-AI 1.4.0, source commit
9c8430862b2afd997ff1d314b30bda4418fa9b33, five classification checkpoints,
hERG output index 30. Converted tensors retain only that readout.
https://doi.org/10.1093/bioinformatics/btae416

Chemistry: RDKit Release_2023_03_3,
b598a27802d30d2f07913fe40ede0d9fb60e4239, Emscripten 3.1.45.
Build scripts: tools/herg/build-reference-wasm.sh and extend-rdkit.py.
Full descriptor precision and explicit Chi2 bindings correct two MinimalLib
differences from the native Python descriptor interface.

Normalization: Pyodide 0.26.4, SciPy 1.12.0, NumPy 1.26.4, OpenBLAS 0.3.26.
These execute inside the browser worker. There is no Python backend.
The original distribution parameters and descriptor order are in parameters.json.
Runtime packages retain their bundled license files; additional notices are
in licenses/. Model MIT, RDKit BSD, QED Novartis BSD notices are retained.

manifest.json and src/features/herg/assetIdentity.ts record SHA-256 identities.
Bootstrap scripts, chemistry WASM, tensors and parameters are checked before use.
Pyodide uses its pinned package lock for scientific package loading.

First-load assets total approximately 92 MB. This is a research model score,
not a clinical prediction, IC50, calibrated confidence or safety determination.
Published benchmark results are not assigned to these full-data checkpoint
predictions. See docs/HERG_BROWSER_VERIFICATION.md for the evidence and limits.
