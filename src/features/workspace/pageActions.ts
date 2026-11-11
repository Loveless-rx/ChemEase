import type { WorkspaceRoute } from "./routes";
import type { Project } from "./types";

export interface PageActions {
  navigate:(route:WorkspaceRoute)=>void;
  newDrawing:()=>void;
  smiles:()=>void;
  save:()=>void;
  project:(project?:Project)=>void;
  open:(id:string,destination?:WorkspaceRoute)=>void;
}
