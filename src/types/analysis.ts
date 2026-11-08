export interface Warning {
  atomId?: string;
  message: string;
  severity: "warning" | "error";
}
export interface Analysis {
  formula: string;
  weight: number | null;
  composition: Record<string, number>;
  atoms: number;
  heavyAtoms: number;
  totalAtoms: number;
  bonds: number;
  rings: number;
  aromaticRings: number;
  charge: number;
  donors: number | null;
  acceptors: number | null;
  rotatable: number | null;
  warnings: Warning[];
  smiles: string;
  smilesError: string | null;
  components: number;
  implicitH: number;
}
