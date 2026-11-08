import test from "node:test";
import assert from "node:assert/strict";
import { emptyMolecule } from "../src/models/Molecule";
import { conformerQuery, fetchConformer } from "../src/engine/conformer";
function methane() {
  return { ...emptyMolecule(), atoms: [{ id: "a", element: "C", x: 0, y: 0, charge: 0, aromatic: false, lonePairs: 0 }] };
}
test("3D query supports methane and blocks empty, fragments, R-groups and stereo", () => {
  assert.equal(conformerQuery(methane()), "C");
  assert.throws(() => conformerQuery(emptyMolecule()), /Draw/);
  const fragments = methane();
  fragments.atoms.push({ ...fragments.atoms[0], id: "b" });
  assert.throws(() => conformerQuery(fragments), /connected/);
  const r = methane(); r.atoms[0].element = "R";
  assert.throws(() => conformerQuery(r), /R-groups/);
  assert.throws(() => conformerQuery({ ...methane(), atoms: [{ ...methane().atoms[0], stereo: "@" }] }), /stereochemistry/);
});
test("lookup posts encoded SMILES and propagates cancellation signal", async () => {
  const original = globalThis.fetch;
  const controller = new AbortController();
  globalThis.fetch = async (url, options) => {
    assert.match(String(url), /record_type=3d/);
    assert.equal(options?.method, "POST");
    assert.equal((options?.body as URLSearchParams).get("smiles"), "C#N");
    assert.equal(options?.signal, controller.signal);
    return new Response("example\nM  END\n$$$$");
  };
  try { assert.match(await fetchConformer("C#N", controller.signal), /M {2}END/); }
  finally { globalThis.fetch = original; }
});
test("lookup reports missing records, rate limits and malformed data", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("missing", { status: 404 });
    await assert.rejects(fetchConformer("C"), /no matching/);
    globalThis.fetch = async () => new Response("busy", { status: 503 });
    await assert.rejects(fetchConformer("C"), /busy/);
    globalThis.fetch = async () => new Response("<html>not SDF</html>");
    await assert.rejects(fetchConformer("C"), /unsupported/);
  } finally { globalThis.fetch = original; }
});
