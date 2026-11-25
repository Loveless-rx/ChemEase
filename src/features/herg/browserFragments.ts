import type {MainModule} from "@rdkit/rdkit";
import {hergFragmentPatterns} from "./fragmentPatterns";
/** Partial research feature port, not a hERG predictor. */
export function browserFragmentFeatures(rdkit:MainModule,smiles:string):Record<string,number>{
 const mol=rdkit.get_mol(smiles);if(!mol)throw new Error("Cannot parse the reference structure.");
 try{const result:Record<string,number>={};
 for(const pattern of hergFragmentPatterns){const query=rdkit.get_qmol(pattern.smarts);if(!query)throw new Error(`Unsupported query: ${pattern.name}`);
 try{const matches:unknown=JSON.parse(mol.get_substruct_matches(query));result[pattern.name]=Array.isArray(matches)?matches.length:0;}finally{query.delete();}}
 return result;}finally{mol.delete();}
}

/** Historical RDKit 2023 donor/acceptor semantics used by the reference model. */
export function historicalAcceptorCount(rdkit:MainModule,smiles:string):number{
 const mol=rdkit.get_mol(smiles);if(!mol)throw new Error("Cannot parse the reference structure.");
 const query=rdkit.get_qmol('[$([O,S;H1;v2]-[!$(*=[O,N,P,S])]),$([O,S;H0;v2]),$([O,S;-]),$([N;v3;!$(N-*=!@[O,N,P,S])]),$([nH0,o,s;+0])]');
 if(!query){mol.delete();throw new Error("Historical acceptor query unavailable.");}
 try{const matches:unknown=JSON.parse(mol.get_substruct_matches(query));return Array.isArray(matches)?matches.length:0;}finally{query.delete();mol.delete();}
}
