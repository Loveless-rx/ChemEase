import type { SavedDockingRun } from "../docking/types";
import type { Molecule } from "../../models/Molecule";
import type { Analysis } from "../../types/analysis";
import type { ToolkitResult } from "../../engine/toolkit";
import type { DrugLikenessResult } from "../drugLikeness/rules";
import type { ExtendedScreening } from "../drugLikeness/extendedRules";
import type { AlertResult } from "../medicinalChemistry/analysis";
import type { SavedReport } from "../reports/model";
import type { SolubilityResult } from "../solubility/model";
import type { HepaticResult } from "../hepatic/model";
import type { SkinResult } from "../skin/model";

// Authentication can supply a different owner scope and repository later.
// A local scope is a storage namespace, not an authentication/security boundary.
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface MoleculeRecord {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface MoleculeVersion {
  id: string;
  moleculeId: string;
  number: number;
  graph: Molecule;
  structureKey: string;
  createdAt: string;
}
export interface SavedDescriptorAnalysis {
  id: string;
  versionId: string;
  structureKey: string;
  method: "rdkit-descriptors-v1";
  engine: string;
  createdAt: string;
  local: Analysis;
  descriptors: ToolkitResult;
}
export interface SavedDrugLikenessAnalysis {
  id: string;
  versionId: string;
  structureKey: string;
  method: "drug-likeness-v1";
  engine: string;
  createdAt: string;
  descriptorResultId: string;
  screening: DrugLikenessResult;
}
export interface SavedExtendedScreening extends Omit<SavedDrugLikenessAnalysis,"method"|"screening"> {
  method:"drug-likeness-v2";screening:ExtendedScreening;
}
export interface SavedStructuralAlerts {
  id:string;versionId:string;structureKey:string;method:"structural-alerts-v1";engine:string;createdAt:string;alerts:AlertResult;
}
export interface SavedSolubility extends Omit<SavedDrugLikenessAnalysis,"method"|"screening"> {method:"esol-rdkit-v1";prediction:SolubilityResult}
export interface SavedSkin extends Omit<SavedDrugLikenessAnalysis,"method"|"screening"> {method:"skin-pg-cdc-v1";prediction:SkinResult}
export interface SavedHepatic {id:string;versionId:string;structureKey:string;method:"hepatic-well-stirred-v1";engine:string;createdAt:string;prediction:HepaticResult}
export type SavedAnalysis=SavedDescriptorAnalysis | SavedDrugLikenessAnalysis | SavedExtendedScreening | SavedStructuralAlerts | SavedSolubility | SavedSkin | SavedHepatic;
export interface ActiveSelection {
  projectId: string | null;
  moleculeId: string | null;
  versionId: string | null;
}
export interface WorkspaceData {
  schemaVersion: 1;
  ownerId: string;
  revision: number;
  projects: Project[];
  molecules: MoleculeRecord[];
  versions: MoleculeVersion[];
  results: SavedAnalysis[];
  active: ActiveSelection;
  draft: Molecule | null;
  reports?: SavedReport[];
  dockingRuns?: SavedDockingRun[];
}
export interface WorkspaceRepository {
  readonly ownerId: string;
  load(): Promise<WorkspaceData | null>;
  save(data: WorkspaceData, expectedRevision: number): Promise<void>;
}
