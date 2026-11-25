// RDKit 2023.03.3; BSD-3-Clause: docs/RDKIT_LICENSE.txt. Duplicate registered names resolved last-wins, as native descriptor lookup.
export const hergFragmentPatterns=[
  {
    "name": "fr_C_O",
    "smarts": "[C&X3]=[O&X1]"
  },
  {
    "name": "fr_C_O_noCOO",
    "smarts": "[C&!$(C-[O&H1])]=O"
  },
  {
    "name": "fr_Al_OH",
    "smarts": "[C&!$(C=O)]-[O&H1]"
  },
  {
    "name": "fr_Ar_OH",
    "smarts": "c[O&H1]"
  },
  {
    "name": "fr_methoxy",
    "smarts": "[O&X2](-[#6])-[C&H3]"
  },
  {
    "name": "fr_oxime",
    "smarts": "[C&X3]=[N&X2]-[O&X2]"
  },
  {
    "name": "fr_ester",
    "smarts": "[#6][C&X3](=O)[O&X2&H0][#6]"
  },
  {
    "name": "fr_Al_COO",
    "smarts": "C-C(=O)[O;H1,-]"
  },
  {
    "name": "fr_Ar_COO",
    "smarts": "c-C(=O)[O;H1,-]"
  },
  {
    "name": "fr_COO",
    "smarts": "[#6]C(=O)[O;H1,-]"
  },
  {
    "name": "fr_COO2",
    "smarts": "[C&X3](=O)[O&X1&H0&-,O&X2&H1]"
  },
  {
    "name": "fr_ketone",
    "smarts": "[#6][C&X3](=O)[#6]"
  },
  {
    "name": "fr_ether",
    "smarts": "[O&D2]([#6])[#6]"
  },
  {
    "name": "fr_phenol",
    "smarts": "[O&X2&H1]-c1ccccc1"
  },
  {
    "name": "fr_aldehyde",
    "smarts": "[C&X3&H1](=O)[#6]"
  },
  {
    "name": "fr_quatN",
    "smarts": "[$([N&X4&+]),$([N&X4]=*)]"
  },
  {
    "name": "fr_NH2",
    "smarts": "[N&H2,n&H2]"
  },
  {
    "name": "fr_NH1",
    "smarts": "[N&H1,n&H1]"
  },
  {
    "name": "fr_NH0",
    "smarts": "[N&H0,n&H0]"
  },
  {
    "name": "fr_Ar_N",
    "smarts": "n"
  },
  {
    "name": "fr_Ar_NH",
    "smarts": "[n&H1]"
  },
  {
    "name": "fr_aniline",
    "smarts": "c-[N&X3&!$(N=*)]"
  },
  {
    "name": "fr_Imine",
    "smarts": "[N&v3](=C)-[#6]"
  },
  {
    "name": "fr_nitrile",
    "smarts": "[N&X1]#[C&X2]"
  },
  {
    "name": "fr_hdrzine",
    "smarts": "[N&X3]-[N&X3]"
  },
  {
    "name": "fr_hdrzone",
    "smarts": "C=N-[N&X3]"
  },
  {
    "name": "fr_nitroso",
    "smarts": "[N&!$(N-O)]=O"
  },
  {
    "name": "fr_N_O",
    "smarts": "[N&!$(N=O)](-O)-C"
  },
  {
    "name": "fr_nitro",
    "smarts": "[$([N&X3](=O)=O),$([N&X3&+](=O)[O&-])][!#8]"
  },
  {
    "name": "fr_azo",
    "smarts": "[#6]-N=N-[#6]"
  },
  {
    "name": "fr_diazo",
    "smarts": "[N&+]#N"
  },
  {
    "name": "fr_azide",
    "smarts": "[$(*-[N&X2&-]-[N&X2&+]#[N&X1]),$(*-[N&X2]=[N&X2&+]=[N&X1&-])]"
  },
  {
    "name": "fr_amide",
    "smarts": "C(=O)-N"
  },
  {
    "name": "fr_priamide",
    "smarts": "C(=O)-[N&H2]"
  },
  {
    "name": "fr_amidine",
    "smarts": "C(=N)(-N)-[!#7]"
  },
  {
    "name": "fr_guanido",
    "smarts": "C(=N)(N)N"
  },
  {
    "name": "fr_Nhpyrrole",
    "smarts": "[n&H1]"
  },
  {
    "name": "fr_imide",
    "smarts": "N(-C=O)-C=O"
  },
  {
    "name": "fr_isocyan",
    "smarts": "N=C=O"
  },
  {
    "name": "fr_isothiocyan",
    "smarts": "N=C=S"
  },
  {
    "name": "fr_thiocyan",
    "smarts": "S-C#N"
  },
  {
    "name": "fr_halogen",
    "smarts": "[#9,#17,#35,#53]"
  },
  {
    "name": "fr_alkyl_halide",
    "smarts": "[C&X4]-[Cl,Br,I,F]"
  },
  {
    "name": "fr_sulfide",
    "smarts": "[S&X2](-[#6])-C"
  },
  {
    "name": "fr_SH",
    "smarts": "[S&H1]"
  },
  {
    "name": "fr_C_S",
    "smarts": "C=[S&X1]"
  },
  {
    "name": "fr_sulfone",
    "smarts": "S(=,-[O&X1;+0,-])(=,-[O&X1;+0,-])(-[#6])-[#6]"
  },
  {
    "name": "fr_sulfonamd",
    "smarts": "N-S(=,-[O&X1;+0,-])(=,-[O&X1;+0,-])-[#6]"
  },
  {
    "name": "fr_prisulfonamd",
    "smarts": "[N&H2]-S(=,-[O&X1&+0&-])(=,-[O&X1&+0&-])-[#6]"
  },
  {
    "name": "fr_barbitur",
    "smarts": "C1C(=O)NC(=O)NC1=O"
  },
  {
    "name": "fr_urea",
    "smarts": "C(=O)(-N)-N"
  },
  {
    "name": "fr_term_acetylene",
    "smarts": "C#[C&H1]"
  },
  {
    "name": "fr_imidazole",
    "smarts": "n1cncc1"
  },
  {
    "name": "fr_furan",
    "smarts": "o1cccc1"
  },
  {
    "name": "fr_thiophene",
    "smarts": "s1cccc1"
  },
  {
    "name": "fr_thiazole",
    "smarts": "c1scnc1"
  },
  {
    "name": "fr_oxazole",
    "smarts": "c1ocnc1"
  },
  {
    "name": "fr_pyridine",
    "smarts": "n1ccccc1"
  },
  {
    "name": "fr_piperdine",
    "smarts": "N1CCCCC1"
  },
  {
    "name": "fr_piperzine",
    "smarts": "N1CCNCC1"
  },
  {
    "name": "fr_morpholine",
    "smarts": "O1CCNCC1"
  },
  {
    "name": "fr_lactam",
    "smarts": "N1C(=O)CC1"
  },
  {
    "name": "fr_lactone",
    "smarts": "[C&R1](=O)[O&R1][C&R1]"
  },
  {
    "name": "fr_tetrazole",
    "smarts": "c1nnnn1"
  },
  {
    "name": "fr_epoxide",
    "smarts": "O1CC1"
  },
  {
    "name": "fr_unbrch_alkane",
    "smarts": "[R0&D2][R0&D2][R0&D2][R0&D2]"
  },
  {
    "name": "fr_bicyclic",
    "smarts": "[R2][R2]"
  },
  {
    "name": "fr_benzene",
    "smarts": "c1ccccc1"
  },
  {
    "name": "fr_phos_acid",
    "smarts": "[$(P(=[O&X1])([$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)])([$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)])[$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)]),$([P&+]([O&X1&-])([$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)])([$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)])[$([O&X2&H1]),$([O&X1&-]),$([O&X2]P)])]"
  },
  {
    "name": "fr_phos_ester",
    "smarts": "[$(P(=[O&X1])([O&X2][#6])([$([O&X2&H1]),$([O&X1&-]),$([O&X2][#6])])[$([O&X2&H1]),$([O&X1&-]),$([O&X2][#6]),$([O&X2]P)]),$([P&+]([O&X1&-])([O&X2][#6])([$([O&X2&H1]),$([O&X1&-]),$([O&X2][#6])])[$([O&X2&H1]),$([O&X1&-]),$([O&X2][#6]),$([O&X2]P)])]"
  },
  {
    "name": "fr_nitro_arom",
    "smarts": "[$(c1(-[$([N&X3](=O)=O),$([N&X3&+](=O)[O&-])])ccccc1)]"
  },
  {
    "name": "fr_nitro_arom_nonortho",
    "smarts": "[$(c1(-[$([N&X3](=O)=O),$([N&X3&+](=O)[O&-])])ccccc1)&!$(cc-&!:*)]"
  },
  {
    "name": "fr_dihydropyridine",
    "smarts": "[$([N&X3&H1]1-C=C-C-C=C1),$([N&v3]1=C-C-C=C-C1),$([N&v3]1=C-C=C-C-C1),$([N&X3&H1]1-C-C=C-C=C1)]"
  },
  {
    "name": "fr_phenol_noOrthoHbond",
    "smarts": "[$(c1(-[O&X2&H1])ccccc1)&!$(cc-&!:[C&H2]-[O&X2&H1])&!$(cc-&!:C(=O)[O;H1,-])&!$(cc-&!:C(=O)-[N&H2])]"
  },
  {
    "name": "fr_Al_OH_noTert",
    "smarts": "[$(C-[O&X2&H1])&!$([C&X3](-[O&X2&H1])=[O&X1])&!$([C&D4]-[O&X2&H1])]"
  },
  {
    "name": "fr_benzodiazepine",
    "smarts": "[c&R2]12[c&R1][c&R1][c&R1][c&R1][c&R2]1[N&R1][C&R1][C&R1][N&R1]=[C&R1]2"
  },
  {
    "name": "fr_para_hydroxylation",
    "smarts": "[$([c&H1]1[c&H1]cc(c[c&H1]1)~[$([#8,$([#8]~[H1,c,C])])]),$([c&H1]1[c&H1]cc(c[c&H1]1)~[$([#7&X3,$([#7](~[H1,c,C])~[H1,c,C])])]),$([c&H1]1[c&H1]cc(c[c&H1]1)-&!:[$([N&X3&H1,$(NC(=O)[H1,c,C])])])]"
  },
  {
    "name": "fr_allylic_oxid",
    "smarts": "[$(C=C-C)&!$(C=C-C-[N,O,S])&!$(C=C-C-C-[N,O])&!$(C12=CC(=O)CCC1C1C(C3C(CCC3)CC1)CC2)]"
  },
  {
    "name": "fr_aryl_methyl",
    "smarts": "[$(a-[C&H3]),$(a-[C&H2]-[C&H3]),$(a-[C&H2]-[C&H2]~[!N&!O]);!$(a(:a!:*):a!:*)]"
  },
  {
    "name": "fr_Ndealkylation1",
    "smarts": "[$(N(-[C&H3])-C-[$(C~O),$(C-a),$(C-N),$(C=C)]),$(N(-[C&H2][C&H3])-C-[$(C~O),$(C-a),$(C-N),$(C=C)])]"
  },
  {
    "name": "fr_Ndealkylation2",
    "smarts": "[$([N&R1]1(-C)CCC1),$([N&R1]1(-C)CCCC1),$([N&R1]1(-C)CCCCC1),$([N&R1]1(-C)CCCCCC1),$([N&R1]1(-C)CCCCCCC1)]"
  },
  {
    "name": "fr_alkyl_carbamate",
    "smarts": "C[N&H1]C(=O)OC"
  },
  {
    "name": "fr_ketone_Topliss",
    "smarts": "[$([C&X3](=[O&X1])(C)[c,C])&!$([C&X3](=[O&X1])([C&H1]=C)[c,C])]"
  },
  {
    "name": "fr_ArN",
    "smarts": "[$(a-[N&X3&H2]),$(a-[N&H1][N&H2]),$(a-C(=[O&X1])[N&H1][N&H2]),$(a-C(=[N&H1])[N&H2])]"
  },
  {
    "name": "fr_HOCCN",
    "smarts": "[$([O&X2&H1][C&X4][C&X4&H2][N&X3&R1]),$([O&H1][C&X4][C&X4&H2][N&X3][C&X4](C)(C)C)]"
  }
] as const;
