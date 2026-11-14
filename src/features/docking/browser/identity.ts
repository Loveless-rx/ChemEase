import type { MainModule } from "@rdkit/rdkit";
/** Normalize ordinary explicit H before comparing identities across file formats. */
export function chemicalIdentity(kit: MainModule, text: string, checkStereo = false) { let m; try {
    m = kit.get_mol(text);
    if (!m?.is_valid())
        throw Error("Invalid ligand chemical structure.");
    m.remove_hs_in_place();
    if (checkStereo) {
        const method = (m as typeof m & {
            get_stereo_tags?: () => string;
        }).get_stereo_tags;
        if (method && method.call(m).includes("(?)"))
            throw Error("Input has unspecified stereocenters. Supply a defined isomeric SMILES/SDF before browser docking.");
    }
    const smiles = m.get_smiles(), d = JSON.parse(m.get_descriptors()) as Record<string, number>;
    if (smiles.includes(".") || d.NumHeavyAtoms < 1 || d.NumHeavyAtoms > 80)
        throw Error("Use one connected ligand with 1–80 heavy atoms; salts are not silently stripped.");
    const j = JSON.parse(m.get_json()) as {
        defaults: {
            atom: {
                chg?: number;
            };
        };
        molecules: {
            atoms: {
                chg?: number;
            }[];
        }[];
    };
    return { smiles, charge: j.molecules[0].atoms.reduce((n, a) => n + (a.chg ?? j.defaults.atom.chg ?? 0), 0), heavy: d.NumHeavyAtoms };
}
finally {
    m?.delete();
} }
