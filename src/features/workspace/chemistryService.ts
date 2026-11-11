import { loadRDKit } from "../../engine/rdkit";
import { calculateToolkit } from "../../engine/toolkit";
import { createDescriptorCache } from "./descriptorCache";
export const chemistryService=createDescriptorCache(async graph=>calculateToolkit(await loadRDKit(),graph));
