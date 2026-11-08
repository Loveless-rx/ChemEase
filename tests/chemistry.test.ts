import test from "node:test";
import assert from "node:assert/strict";
import type { Molecule, Atom, BondType } from "../src/types/chem";
import { emptyMolecule } from "../src/models/Molecule";
import { molecularFormula } from "../src/engine/formula";
import { molecularWeight } from "../src/engine/molecularWeight";
import { atomValence } from "../src/engine/valence";
import { bondOrder } from "../src/engine/chemistry";
import {
  cycleRank,
  aromaticCycleRank,
  makeRing,
  ringBondIds,
} from "../src/engine/rings";
import { validateMolecule } from "../src/engine/validation";
import { generateSmiles } from "../src/engine/smiles";
import { analyzeMolecule } from "../src/engine/analysis";
import { template } from "../src/engine/templates";
import { parseMolecule } from "../src/utils/storage";
import { moleculeSvg } from "../src/engine/export";
function graph(
  elements: string[],
  edges: [number, number, BondType][] = [],
  patches: Record<number, Partial<Atom>> = {},
): Molecule {
  return {
    ...emptyMolecule(),
    atoms: elements.map((element, i) => ({
      id: `a${i}`,
      element,
      x: i * 64,
      y: 0,
      charge: 0,
      aromatic: false,
      lonePairs: 0,
      ...patches[i],
    })),
    bonds: edges.map(([a, b, type], i) => ({
      id: `b${i}`,
      atomA: `a${a}`,
      atomB: `a${b}`,
      type,
    })),
  };
}
const fixtures: [string, Molecule, string, number, string][] = [
  ["methane", graph(["C"]), "CH4", 16.043, "C"],
  ["ethane", graph(["C", "C"], [[0, 1, "single"]]), "C2H6", 30.07, "CC"],
  ["ethene", graph(["C", "C"], [[0, 1, "double"]]), "C2H4", 28.054, "C=C"],
  ["ethyne", graph(["C", "C"], [[0, 1, "triple"]]), "C2H2", 26.038, "C#C"],
  ["water", graph(["O"]), "H2O", 18.015, "O"],
  ["methanol", graph(["C", "O"], [[0, 1, "single"]]), "CH4O", 32.042, "CO"],
  [
    "ethanol",
    graph(
      ["C", "C", "O"],
      [
        [0, 1, "single"],
        [1, 2, "single"],
      ],
    ),
    "C2H6O",
    46.069,
    "CCO",
  ],
  [
    "carbon dioxide",
    graph(
      ["O", "C", "O"],
      [
        [0, 1, "double"],
        [1, 2, "double"],
      ],
    ),
    "CO2",
    44.009,
    "O=C=O",
  ],
];
for (const [name, m, formula, weight, smiles] of fixtures)
  test(name, () => {
    assert.equal(molecularFormula(m), formula);
    assert.ok(Math.abs(molecularWeight(m)! - weight) < 0.002);
    assert.equal(generateSmiles(m).smiles, smiles);
    assert.equal(validateMolecule(m).length, 0);
  });
test("bond orders are chemistry values", () =>
  assert.deepEqual(
    ["single", "double", "triple", "aromatic"].map((b) =>
      bondOrder(b as BondType),
    ),
    [1, 2, 3, 1.5],
  ));
test("explicit H is not counted twice", () => {
  const m = graph(["C", "H"], [[0, 1, "single"]]);
  assert.equal(atomValence(m.atoms[0], m).implicitH, 3);
  assert.equal(molecularFormula(m), "CH4");
});
test("explicit water", () =>
  assert.equal(
    molecularFormula(
      graph(
        ["O", "H", "H"],
        [
          [0, 1, "single"],
          [0, 2, "single"],
        ],
      ),
    ),
    "H2O",
  ));
test("ammonium charge affects H and SMILES", () => {
  const m = graph(["N"], [], { 0: { charge: 1 } });
  assert.equal(molecularFormula(m), "H4N");
  assert.equal(generateSmiles(m).smiles, "[NH4+]");
});
test("hydroxide", () => {
  const m = graph(["O"], [], { 0: { charge: -1 } });
  assert.equal(molecularFormula(m), "HO");
  assert.equal(generateSmiles(m).smiles, "[OH-]");
});
test("pentavalent carbon is allowed but warned", () => {
  const m = graph(
    ["C", "C", "C", "C", "C", "C"],
    [1, 2, 3, 4, 5].map((i) => [0, i, "single"]),
  );
  assert.equal(atomValence(m.atoms[0], m).implicitH, 0);
  assert.ok(validateMolecule(m).some((w) => w.message.includes("exceeds")));
  assert.ok(generateSmiles(m).error);
});
test("branched isobutane SMILES", () => {
  const m = graph(
    ["C", "C", "C", "C"],
    [
      [0, 1, "single"],
      [1, 2, "single"],
      [1, 3, "single"],
    ],
  );
  assert.equal(generateSmiles(m).smiles, "CC(C)C");
  assert.equal(molecularFormula(m), "C4H10");
});
test("disconnected fragments use dot", () =>
  assert.equal(generateSmiles(graph(["C", "O"])).smiles, "C.O"));
test("benzene", () => {
  const m = template("benzene");
  assert.equal(molecularFormula(m), "C6H6");
  assert.equal(generateSmiles(m).smiles, "c1ccccc1");
  assert.equal(cycleRank(m), 1);
  assert.equal(aromaticCycleRank(m), 1);
  assert.equal(ringBondIds(m).size, 6);
});
test("cyclopentane and cyclohexane are actual graphs", () => {
  for (const n of [5, 6] as const) {
    const m = { ...emptyMolecule(), ...makeRing(0, 0, n) };
    assert.equal(molecularFormula(m), `C${n}H${n * 2}`);
    assert.equal(cycleRank(m), 1);
    assert.match(generateSmiles(m).smiles, /C1.*C1/);
  }
});
test("pyridine aromatic nitrogen does not receive an H", () => {
  const m = template("benzene");
  m.atoms[0].element = "N";
  assert.equal(molecularFormula(m), "C5H5N");
  assert.equal(generateSmiles(m).smiles, "n1ccccc1");
});
test("pyrrole supports explicit hydrogen override", () => {
  const m = { ...emptyMolecule(), ...makeRing(0, 0, 5, true) };
  m.atoms[0].element = "N";
  m.atoms[0].hydrogenOverride = 1;
  assert.equal(molecularFormula(m), "C4H5N");
  assert.equal(generateSmiles(m).smiles, "[nH]1cccc1");
  assert.ok(!validateMolecule(m).some((w) => w.message.includes("exceeds")));
});
test("broken aromatic ring warns and refuses ambiguous SMILES", () => {
  const m = template("benzene");
  m.bonds.pop();
  assert.equal(cycleRank(m), 0);
  assert.ok(generateSmiles(m).error);
});
test("two independent rings", () => {
  const a = template("benzene"),
    b = template("benzene");
  assert.equal(
    cycleRank({
      ...a,
      atoms: [...a.atoms, ...b.atoms],
      bonds: [...a.bonds, ...b.bonds],
    }),
    2,
  );
});
test("aspirin graph chemistry and descriptors", () => {
  const a = analyzeMolecule(template("aspirin"));
  assert.equal(a.formula, "C9H8O4");
  assert.ok(Math.abs(a.weight! - 180.159) < 0.002);
  assert.equal(a.rings, 1);
  assert.equal(a.acceptors, 3);
  assert.equal(a.donors, 1);
  assert.ok(a.smiles);
  assert.equal(a.warnings.length, 0);
});
test("ethanol graph descriptors", () => {
  const a = analyzeMolecule(template("ethanol"));
  assert.equal(a.acceptors, 1);
  assert.equal(a.donors, 1);
  assert.equal(a.rotatable, 0);
  assert.equal(a.totalAtoms, 9);
});
test("amide nitrogen is not an acceptor", () => {
  const m = graph(
    ["C", "O", "N"],
    [
      [0, 1, "double"],
      [0, 2, "single"],
    ],
  );
  assert.equal(analyzeMolecule(m).acceptors, 1);
});
test("unknown element has no mass rather than false zero", () => {
  const m = graph(["Xx"]);
  assert.equal(molecularWeight(m), null);
  assert.ok(validateMolecule(m).length);
  assert.ok(generateSmiles(m).error);
});
test("R group is wildcard and mass unspecified", () => {
  const m = graph(["R"]);
  assert.equal(molecularWeight(m), null);
  assert.equal(generateSmiles(m).smiles, "*");
  assert.equal(analyzeMolecule(m).donors, null);
});
test("metal ions have no inferred H and descriptors are not evaluated", () => {
  const m = graph(["Na"], [], { 0: { charge: 1 } });
  assert.equal(molecularFormula(m), "Na");
  assert.equal(generateSmiles(m).smiles, "[Na+]");
  assert.equal(analyzeMolecule(m).acceptors, null);
});
test("empty graph is safe", () => {
  const m = emptyMolecule();
  assert.equal(molecularFormula(m), "");
  assert.equal(molecularWeight(m), 0);
  assert.equal(cycleRank(m), 0);
  assert.equal(generateSmiles(m).smiles, "");
  assert.equal(analyzeMolecule(m).atoms, 0);
});
test("invalid bond references do not crash analysis", () => {
  const m = graph(["C"]);
  m.bonds.push({ id: "bad", atomA: "a0", atomB: "missing", type: "single" });
  assert.ok(analyzeMolecule(m).warnings.some((w) => w.severity === "error"));
  assert.ok(generateSmiles(m).error);
});
test("isotope mass and bracket SMILES", () => {
  const m = graph(["C"], [], { 0: { isotope: 13 } });
  assert.ok(Math.abs(molecularWeight(m)! - 17.035354835) < 1e-8);
  assert.equal(generateSmiles(m).smiles, "[13CH4]");
});
test("unsupported isotope mass is null", () =>
  assert.equal(
    molecularWeight(graph(["C"], [], { 0: { isotope: 99 } })),
    null,
  ));
test("round-trip ChemEase JSON", () => {
  const m = template("aspirin");
  const read = parseMolecule(JSON.stringify(m));
  assert.equal(molecularFormula(read), "C9H8O4");
  assert.equal(read.bonds.length, m.bonds.length);
});
test("malformed JSON rejected safely", () => {
  for (const raw of [
    "null",
    "{}",
    "broken",
    JSON.stringify({ ...emptyMolecule(), atoms: [null] }),
  ])
    assert.throws(() => parseMolecule(raw));
});
test("duplicate atoms and bonds rejected", () => {
  const m = graph(["C", "O"], [[0, 1, "single"]]);
  m.bonds.push({ ...m.bonds[0], id: "duplicate" });
  assert.throws(() => parseMolecule(JSON.stringify(m)));
  m.bonds.pop();
  m.atoms.push(m.atoms[0]);
  assert.throws(() => parseMolecule(JSON.stringify(m)));
});
test("SVG uses the actual graph, no editor decorations", () => {
  const m = template("ethanol"),
    svg = moleculeSvg(m);
  assert.ok(svg.includes("<title>Ethanol</title>"));
  assert.ok(svg.includes(">O</text>"));
  assert.equal((svg.match(/<line /g) || []).length, 2);
  assert.ok(!svg.includes("data-atom"));
});
test("SVG escapes user metadata", () => {
  const m = emptyMolecule();
  m.metadata.name = "<script>alert(1)</script>";
  assert.ok(!moleculeSvg(m).includes("<script>"));
});
