export type BondType = "single" | "double" | "triple" | "aromatic";
export interface Bond {
  id: string;
  atomA: string;
  atomB: string;
  type: BondType;
  stereo?: "up" | "down";
}
