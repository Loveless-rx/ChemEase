export type WorkspaceTool =
  | "select"
  | "erase"
  | "lasso"
  | "draw"
  | "bond"
  | "ring"
  | "charge"
  | "lonePair"
  | "hydrogen"
  | "pan";
export type Dialog = "new" | "export" | "analysis" | "settings" | "help" | "3d" | null;
export interface Point {
  x: number;
  y: number;
}
