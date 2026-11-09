import type { MainModule } from "@rdkit/rdkit";
import type { Molecule } from "../models/Molecule";
import { calculateToolkit, estimateLogD, toolkitMol } from "./toolkit";
import { connectedComponents } from "./chemistry";
export type ChemicalFormat = "smi" | "mol" | "sdf" | "csv";
export interface LogDInputs { pH: number; pKa: number; kind: "acid" | "base" }
export function buildChemicalFile(rdkit: MainModule, m: Molecule, format: ChemicalFormat, logD?: LogDInputs) {
  let text: string;
  if (format === "csv") {
    const d = calculateToolkit(rdkit, m);
    if (logD && (m.atoms.some(a => a.charge !== 0) || connectedComponents(m) !== 1)) throw new Error("LogD estimation requires one neutral molecule.");
    const fields = {name: m.metadata.name, canonicalSmiles: d.smiles, molecularWeight: d.weight, logP: d.logP, TPSA_A2: d.tpsa, HBD: d.donors, HBA: d.acceptors, rotatableBonds: d.rotatable, molarRefractivity: d.molarRefractivity, formalCharge: d.charge, ringCount: d.rings, heavyAtomCount: d.heavyAtoms, logD: logD ? estimateLogD(d.logP, logD.pH, logD.pKa, logD.kind) : "", pH: logD?.pH ?? "", pKa: logD?.pKa ?? "", ionization: logD?.kind ?? "", logDModel: logD ? "Monoprotic Henderson-Hasselbalch; neutral species partitions only" : "Not evaluated", engine: d.engine};
    // Prefix formula-leading strings to prevent spreadsheet formula execution.
    const cell = (v: string | number) => `"${String(typeof v === "string" && /^[=+\-@\t\r]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
    text = `${Object.keys(fields).map(cell).join(",")}\n${Object.values(fields).map(cell).join(",")}\n`;
  } else {
    const mol = toolkitMol(rdkit, m);
    try {
      if (format === "smi") text = `${mol.get_smiles()}\t${m.metadata.name.replace(/[\r\n\t]/g," ")}\n`;
      else {
        text = mol.get_v3Kmolblock();
        if (format === "sdf") text += `\n> <NAME>\n${m.metadata.name.replace(/[\r\n]/g," ")}\n\n> <CANONICAL_SMILES>\n${mol.get_smiles()}\n\n$$$$\n`;
      }
    } finally { mol.delete(); }
  }
  return { text, mime: format === "csv" ? "text/csv;charset=utf-8" : format === "smi" ? "chemical/x-daylight-smiles;charset=utf-8" : format === "sdf" ? "chemical/x-mdl-sdfile;charset=utf-8" : "chemical/x-mdl-molfile;charset=utf-8" };
}
