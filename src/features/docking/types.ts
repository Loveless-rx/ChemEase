export interface Vec {x:number;y:number;z:number}
export interface Grid {center:Vec;size:Vec}
export interface Site {id:string;label:string;chain:string;center:Vec;size:Vec}
export interface FileEntry {name:string;sha256:string;bytes:number}
export interface LigandSource {kind:"editor"|"smiles"|"sdf";name:string;versionId:string|null;structureKey:string|null}
export interface Asset {
  id:string;kind:string;name:string;createdAt:string;ready:boolean;files:Record<string,FileEntry>;
  metadata?:{atoms?:number;chains:{id:string;atoms:number}[];sites:Site[];warnings:string[];bounds:{min:Vec;max:Vec;center:Vec};nonProtein:{chain:string;resid:string;name:string;atoms:number}[];nonProteinCount:number};
  settings?:{chains:string[];ph:number;rebuildSidechains:boolean};bindingSites?:Site[];warnings?:string[];source?:LigandSource;smiles?:string;inputSmiles?:string;charge?:number;ph?:number;protonation?:"rules"|"supplied";conformerEnergy?:number;repairedAtoms?:number;sourceHash?:string;tools?:Record<string,string>;
}
export interface Contact {type:string;residue:string;receptorAtom:string;ligandAtom:number;distance:number;angle:number|null;ligandDonor:boolean|null;ligandPosition?:number[];receptorPosition?:number[]}
export interface Pose {rank:number;affinity:number;rmsdLower:number;rmsdUpper:number;contacts:Contact[];truncated:boolean;method:string}
export interface DockingResult {
  schema:1;jobId:string;createdAt:string;completedAt:string;engine:"vina";engineVersion:string;engineBinarySha256?:string;tools:Record<string,string>;receptor:Asset;ligand:Asset;
  settings:{receptorId:string;ligandId:string;engine:"vina";grid:Grid;exhaustiveness:number;poses:number;seed:number};
  poses:Pose[];mappedHeavyAtomRmsd:number[][];rmsdMethod:string;limitations:string;
}
export interface Job {id:string;createdAt:string;startedAt?:string;task:"receptor"|"ligand"|"dock";status:"queued"|"running"|"cancelling"|"cancelled"|"failed"|"completed";stage:string;message:string;result?:{receptor:Asset;sites:Site[]}|{ligands:Asset[]}|DockingResult}
export interface Health {service:string;apiVersion:number;engines:{id:string;label:string;available:boolean;version?:string;reason?:string}[];tools:Record<string,string>}
export interface SavedDockingRun {id:string;savedAt:string;result:DockingResult}
