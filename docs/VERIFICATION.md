# Verification — integrated edition

## Completed on this edition
- Strict TypeScript check of the full application and Vite configuration: passed.
- ESLint / React-hook checks of application source: passed without errors or warnings.
- **53 unit tests**: chemistry, validation, formulas, masses, SMILES, state/history, scroll math and numeric-ID legacy import.
- **33 editor browser checks**: actual pointer/keyboard drawing, bond edits, drag/history, rings, charges, H, save/reload, dialogs, themes and responsive drawers.
- **21 intro browser checks**: actual WebGL context and nontransparent rendered pixels, moving camera, disassembly/reassembly, pinned native scroll, reversal, chapter navigation, inert inactive panels, reduced motion, mobile overflow, GPU loss/restoration, no-reload entry and GPU buffer disposal.
- **7 additional export/responsive checks**: actual PNG/SVG/JSON files, dialog keyboard behavior, 1920×1080, 2560×1440 and graph-aware auto-fit.
- Manual screenshot review: desktop hero, separated atoms, analysis, front-facing final scene; mobile hero/analysis/final; fallback and editor layouts.
- Representative intro accessibility audit: zero automatically detected violations. Canvas-backed contrast needs manual review; this is not a claim of complete WCAG conformance.

Tests use official React/React DOM 19.2.7 and Zustand 5.0.14. No offline Zustand adapter or fake engine is involved. Chromium WebGL checks used its software renderer where necessary; real-device GPU/performance coverage remains to be done.

## Native build limitation
The full source type-check succeeds with the uploaded toolchain. Vite's native bundler cannot execute here because the uploaded dependencies contain a Windows rolldown binding, while the sandbox is Linux and cannot reach the npm registry. The included standalone was built with available esbuild against the official uploaded dependencies and then exercised directly. **A normal `npm ci` / `npm run build` remains a local verification step.** The standalone postprocessor was separately tested against an external-JS/CSS build fixture.

## Reproduce
```bash
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

Optional browser scripts require Python 3 and the `agent-browser` CLI in a development/QA environment; they are not application runtime dependencies:
```bash
CHEMEASE_URL=http://localhost:4173 CHEMEASE_QA_DIR=./qa python3 tests/browser-smoke.py
CHEMEASE_URL=http://localhost:4173 CHEMEASE_QA_DIR=./qa python3 tests/story-browser.py
CHEMEASE_URL=http://localhost:4173 python3 tests/export-browser.py
```
The scripts use named browser sessions and reset their test-origin localStorage. Run them against a disposable local test origin, not a browser session with important unsaved work. Windows users can run these optional scripts in a suitable shell/WSL, or use the manual checklist instead.

## Release checklist still required
- [ ] Clean npm install and native Vite build on your machine.
- [ ] Repeat browser checks on that Vite build.
- [ ] Safari, Firefox and physical touch-device testing.
- [ ] Broader manual keyboard, screen-reader and contrast review.
- [ ] Toolkit-backed chemistry validation for your intended molecule classes.
- [ ] Deployment/privacy/backend decisions if extending beyond local-first use.

See `test-results/` for the actual test output. Automated checks do not establish universal chemical correctness or guarantee bug-free production use.
