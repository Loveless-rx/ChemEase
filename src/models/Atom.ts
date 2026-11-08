export interface Atom {
  id: string;
  element: string;
  x: number;
  y: number;
  charge: number;
  isotope?: number;
  aromatic: boolean;
  lonePairs: number;
  hydrogenOverride?: number;
  stereo?: "@" | "@@";
}
