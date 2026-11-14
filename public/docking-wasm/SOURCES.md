# Runtime source references

Distributed binaries and glue code are unmodified copies from MolModa commit
`d458231d7ea235fa0e7c60ca8fe1526622e06b88`:
https://github.com/durrantlab/molmoda/tree/d458231d7ea235fa0e7c60ca8fe1526622e06b88

- Runtime files: `public/js/webina`, `public/js/obabel-wasm`, `public/js/reduce` in that source tree. ChemEase's `manifest.json` records the distributed bytes and SHA-256 values.
- Vina build recipe, wrapper changes and sources: `wasm-compile/vina` in that tree; upstream https://github.com/ccsb-scripps/AutoDock-Vina/tree/v1.2.3 .
- Reduce build recipe and changes: `wasm-compile/reduce` in that tree; upstream https://github.com/rlabduke/reduce .
- Open Babel 3.1.0 source: https://github.com/openbabel/openbabel/tree/openbabel-3-1-0 ; WASM wrapper: https://github.com/durrantlab/molmoda/tree/d458231d7ea235fa0e7c60ca8fe1526622e06b88/public/js/obabel-wasm .
- Full third-party notices copied from the pinned MolModa distribution are in `THIRD-PARTY-LICENSES.md`. Retain these with redistributed runtime files; Open Babel is GPL-2.0.
- Isolation bootstrap source (v0.1.7): https://github.com/gzuidhof/coi-serviceworker ; its MIT notice is retained in `coi-serviceworker.js` and `COI-LICENSE.txt`.

`run-tool.js` is ChemEase's runtime host, not an upstream engine. It verifies assets, supplies virtual input files, captures real outputs, and manages disposable workers. See `docs/BROWSER_DOCKING.md` for preparation arguments and limitations.
