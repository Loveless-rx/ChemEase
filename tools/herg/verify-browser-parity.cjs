// Run against a local Vite development server. No native Python runtime needed.
// npm run dev -- --port 5174
// node tools/herg/verify-browser-parity.cjs
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const reference = JSON.parse(fs.readFileSync('vendor/herg/browser-reference.json', 'utf8'));
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(process.env.HERG_TEST_URL || 'http://localhost:5174/', { waitUntil: 'domcontentloaded' });
    const results = await page.evaluate(async rows => {
      const { startHerg } = await import('/src/features/herg/client.ts');
      const results = [];
      for (const row of rows) {
        const result = await startHerg(row.smiles, 'parity-only', () => {}).promise;
        results.push({ smiles: row.smiles, featureError: Math.max(...result.normalized.map((x, i) => Math.abs(x - row.normalized[i]))), memberError: Math.max(...result.members.map((x, i) => Math.abs(x - row.members[i]))), scoreError: Math.abs(result.score - row.expected) });
      }
      return results;
    }, reference.rows);
    for (const row of results) {
      assert.ok(row.featureError <= 1e-6, JSON.stringify(row));
      assert.ok(row.memberError <= 1e-5 && row.scoreError <= 1e-5, JSON.stringify(row));
    }
    console.log(JSON.stringify({ passed: true, results }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
