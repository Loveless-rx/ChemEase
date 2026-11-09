import test from "node:test";
import assert from "node:assert/strict";
import initRDKit from "@rdkit/rdkit";
import { calculateToolkit, importSmiles, toolkitMol, chemistryKey, estimateLogD, parseSmilesFile } from "../src/engine/toolkit";
import { buildChemicalFile } from "../src/engine/chemicalFiles";
import { analyzeMolecule } from "../src/engine/analysis";
import { template } from "../src/engine/templates";
import { useMoleculeStore } from "../src/store/moleculeStore";
import { useHistoryStore } from "../src/store/historyStore";
import { parseMolecule } from "../src/utils/storage";
const engine = initRDKit();
const close = (actual: number, expected: number, tolerance = 0.0001) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
test("RDKit ethanol reference descriptors", async () => {
  const r = await engine, m = importSmiles(r, "CCO", "Ethanol"), d = calculateToolkit(r, m);
  assert.equal(d.smiles, "CCO");
  close(d.logP, -0.0014); close(d.tpsa, 20.23); close(d.molarRefractivity, 12.7598);
  assert.deepEqual([d.donors,d.acceptors,d.rotatable,d.rings,d.heavyAtoms,d.charge], [1,1,0,0,3,0]);
  assert.equal(analyzeMolecule(m).formula, "C2H6O");
});
test("RDKit aspirin reference descriptors and editor template agree", async () => {
  const r = await engine, m = importSmiles(r, "CC(=O)Oc1ccccc1C(=O)O");
  const d = calculateToolkit(r, m), drawn = calculateToolkit(r, template("aspirin"));
  close(d.logP, 1.3101); close(d.tpsa, 63.6); close(d.molarRefractivity, 44.7103);
  assert.deepEqual([d.donors,d.acceptors,d.rotatable,d.rings,d.heavyAtoms], [1,3,2,1,13]);
  assert.equal(d.smiles, drawn.smiles); close(d.weight, drawn.weight);
});
for (const [smiles, formula] of [
  ["Cn1c(=O)c2c(ncn2C)n(C)c1=O", "C8H10N4O2"],
  ["c1cc[nH]c1", "C4H5N"], ["c1ccc2ccccc2c1", "C10H8"],
  ["[NH4+]", "H4N"], ["[Na+].[Cl-]", "ClNa"],
  ["[13CH4]", "CH4"], ["CC#N", "C2H3N"], ["OP(=O)(O)O", "H3O4P"],
  ["CS(=O)(=O)C", "C2H6O2S"], ["O=C([O-])C[NH3+]", "C2H5NO2"],
] as const) {
  test(`SMILES graph, hydrogen and JSON round-trip: ${smiles}`, async () => {
    const r = await engine, m = importSmiles(r, smiles), mol = r.get_mol(smiles)!;
    try {
      assert.equal(calculateToolkit(r, m).smiles, mol.get_smiles());
      const d = JSON.parse(mol.get_descriptors());
      const computed = calculateToolkit(r, m);
      for (const [field, expected] of [[computed.logP,d.CrippenClogP],[computed.tpsa,d.tpsa],[computed.molarRefractivity,d.CrippenMR],[computed.donors,d.NumHBD],[computed.acceptors,d.NumHBA],[computed.rotatable,d.NumRotatableBonds],[computed.rings,d.NumRings],[computed.heavyAtoms,d.NumHeavyAtoms]] as [number,number][]) close(field,expected);
      assert.equal(analyzeMolecule(m).formula, formula);
      assert.equal(calculateToolkit(r, parseMolecule(JSON.stringify(m))).smiles, mol.get_smiles());
    } finally { mol.delete(); }
  });
}
test("SMILES rejects invalid, stereo, radical, wildcard and annotations safely", async () => {
  const r = await engine;
  for (const input of ["", "not a molecule", "C1CC", "C(C)(C)(C)(C)C", "N[C@@H](C)C(=O)O", "F/C=C/F", "[CH3]", "*CC", "CCO ethanol", "CCO |atomProp:0.foo.bar|", "C".repeat(10001)]) assert.throws(() => importSmiles(r, input), undefined, input);
});
test("drawn graph edits update descriptors and undo restores chemistry", async () => {
  const r = await engine, store = useMoleculeStore;
  store.getState().replace(importSmiles(r,"CCO")); useHistoryStore.getState().clear();
  const oxygen = store.getState().molecule.atoms.find(a => a.element === "O")!;
  const before = calculateToolkit(r, store.getState().molecule);
  store.getState().patchAtom(oxygen.id, {element: "N"});
  const edited = calculateToolkit(r, store.getState().molecule);
  assert.equal(edited.smiles,"CCN"); assert.notEqual(edited.tpsa,before.tpsa);
  store.getState().undo(); assert.equal(calculateToolkit(r,store.getState().molecule).smiles,before.smiles);
  store.getState().redo(); assert.equal(calculateToolkit(r,store.getState().molecule).smiles,edited.smiles);
});
test("coordinate moves and names do not change chemistry key", async () => {
  const m = importSmiles(await engine,"CCO"), clone = structuredClone(m);
  clone.atoms[0].x += 30; clone.metadata.name = "Moved";
  assert.equal(chemistryKey(m),chemistryKey(clone));
  clone.atoms[0].charge = 1; assert.notEqual(chemistryKey(m),chemistryKey(clone));
});
test("MOL and SDF downloads preserve connectivity, charges and isotopes", async () => {
  const r = await engine;
  for (const smiles of ["CCO", "c1ccccc1", "[13CH3]C(=O)[O-]", "[Na+].[Cl-]"]) {
    const m = importSmiles(r,smiles);
    for (const format of ["mol","sdf"] as const) {
      const f = buildChemicalFile(r,m,format); assert.match(f.text,/V3000/);
      const parsed = r.get_mol(f.text.split("> <NAME>")[0]); assert.ok(parsed, `${format}: ${smiles}`);
      try { assert.equal(parsed.get_smiles(),calculateToolkit(r,m).smiles); } finally { parsed.delete(); }
    }
    assert.equal(buildChemicalFile(r,m,"smi").text.split("\t")[0],calculateToolkit(r,m).smiles);
  }
});
test("properties CSV contains descriptors, LogD inputs and safe names", async () => {
  const r = await engine, m = importSmiles(r,"CC(=O)O", '=HYPERLINK("example")');
  const {text} = buildChemicalFile(r,m,"csv",{pH:7.4,pKa:4.76,kind:"acid"});
  assert.match(text,/TPSA_A2/); assert.match(text,/logDModel/); assert.match(text,/7.4/); assert.match(text,/"'=HYPERLINK/);
  assert.throws(() => buildChemicalFile(r,importSmiles(r,"[NH4+]"),"csv",{pH:7,pKa:9,kind:"base"}),/neutral/);
});
test("LogD acid/base equations, limits and validation", () => {
  close(estimateLogD(2,7,7,"acid"),2-Math.log10(2)); close(estimateLogD(2,7,7,"base"),2-Math.log10(2));
  close(estimateLogD(2,10,7,"acid"),2-Math.log10(1001)); close(estimateLogD(2,4,7,"base"),2-Math.log10(1001));
  assert.ok(Number.isFinite(estimateLogD(2,14,-20,"acid")));
  assert.throws(() => estimateLogD(2,15,7,"acid")); assert.throws(() => estimateLogD(2,7,NaN,"base"));
});
test("invalid editor graph does not produce toolkit output", async () => {
  const r = await engine, m = template("benzene");
  const broken = structuredClone(m); broken.bonds[0].atomA = "missing"; assert.throws(() => toolkitMol(r,broken),/Invalid/);
  const wildcard = structuredClone(m); wildcard.atoms[0].element = "R"; assert.throws(() => toolkitMol(r,wildcard),/unspecified/);
  const stereo = structuredClone(m); stereo.atoms[0].stereo = "@"; assert.throws(() => toolkitMol(r,stereo),/Stereo/);
  const aromatic = structuredClone(m); aromatic.bonds.pop(); assert.throws(() => toolkitMol(r,aromatic),/aromatic/);
});
test("downloaded SMILES files can be read back with their names", async () => {
  const r = await engine, m = importSmiles(r,"CCO","Named ethanol");
  const parsed = parseSmilesFile(buildChemicalFile(r,m,"smi").text);
  assert.deepEqual(parsed,{smiles:"CCO",name:"Named ethanol"});
  assert.equal(calculateToolkit(r,importSmiles(r,parsed.smiles,parsed.name)).smiles,"CCO");
  assert.deepEqual(parseSmilesFile("\uFEFF# comment\nCCO ethanol\n"),{smiles:"CCO",name:"ethanol"});
  assert.throws(() => parseSmilesFile("CCO ethanol\nCC methane"),/one molecule/);
});
