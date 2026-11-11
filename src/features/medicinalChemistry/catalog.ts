// Derived without SMARTS changes from RDKit Release_2026_09_2. BSD-3-Clause.
// See vendor/rdkit-filter-catalog/LICENSE.txt and manifest.json.
export const ALERT_CATALOG_VERSION = "rdkit-2026.09.2-pains-brenk-v1" as const;
export interface AlertPattern {id:string;set:"PAINS"|"BRENK";subset:string;name:string;smarts:string}
export const alertPatterns:readonly AlertPattern[] = [
  {
    "id": "PAINS_A-001",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "ene_six_het_A(483)",
    "smarts": "[#6]-1(-[#6](~[!#6&!#1]~[#6]-[!#6&!#1]-[#6]-1=[!#6&!#1])~[!#6&!#1])=[#6;!R]-[#1]"
  },
  {
    "id": "PAINS_A-002",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "hzone_phenol_A(479)",
    "smarts": "c:1:c:c(:c(:c:c:1)-[#6]=[#7]-[#7])-[#8]-[#1]"
  },
  {
    "id": "PAINS_A-003",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "anil_di_alk_A(478)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:1:c:c(:c(:[c;!H0,$(c-[#6](-[#1])-[#1]),$(c-[#8]-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])](:c:1))-[#7])-[#1]"
  },
  {
    "id": "PAINS_A-004",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "indol_3yl_alk(461)",
    "smarts": "[n;!H0,$(n-[#6;!H0;!H1])]:1(c(c(c:2:c:1:c:c:c:c:2-[#1])-[#6;X4]-[#1])-[$([#6](-[#1])-[#1]),$([#6]=,:[!#6&!#1]),$([#6](-[#1])-[#7]),$([#6](-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#7](-[#1])-[#6](-[#1])-[#1])])"
  },
  {
    "id": "PAINS_A-005",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "quinone_A(370)",
    "smarts": "[!#6&!#1]=[#6]1[#6]=,:[#6][#6](=[!#6&!#1])[#6]=,:[#6]1"
  },
  {
    "id": "PAINS_A-006",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "azo_A(324)",
    "smarts": "[#7;!R]=[#7]"
  },
  {
    "id": "PAINS_A-007",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "imine_one_A(321)",
    "smarts": "[#6]-[#6](=[!#6&!#1;!R])-[#6](=[!#6&!#1;!R])-[$([#6]),$([#16](=[#8])=[#8])]"
  },
  {
    "id": "PAINS_A-008",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "mannich_A(296)",
    "smarts": "[#7]-[#6;X4]-c:1:c:c:c:c:c:1-[#8]-[#1]"
  },
  {
    "id": "PAINS_A-009",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "anil_di_alk_B(251)",
    "smarts": "c:1:c:c(:c:c:c:1-[#7](-[#6;X4])-[#6;X4])-[#6]=[#6]"
  },
  {
    "id": "PAINS_A-010",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "anil_di_alk_C(246)",
    "smarts": "c:1:c:c(:c:c:c:1-[#8]-[#6;X4])-[#7;$([#7!H0]-[#6;X4]),$([#7](-[#6;X4])-[#6;X4])]"
  },
  {
    "id": "PAINS_A-011",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "ene_rhod_A(235)",
    "smarts": "[#7]-1-[#6](=[#16])-[#16]-[#6](=[#6])-[#6]-1=[#8]"
  },
  {
    "id": "PAINS_A-012",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "hzone_phenol_B(215)",
    "smarts": "c:1(:c:c:c(:c:c:1)-[#6]=[#7]-[#7])-[#8]-[#1]"
  },
  {
    "id": "PAINS_A-013",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "ene_five_het_A(201)",
    "smarts": "[#6]-1(=[#6])-[#6]=[#7]-[!#6&!#1]-[#6]-1=[#8]"
  },
  {
    "id": "PAINS_A-014",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "anil_di_alk_D(198)",
    "smarts": "c:1:c:c(:c:c:c:1-[#7](-[#6;X4])-[#6;X4])-[#6;X4]-[$([#8]-[#1]),$([#6]=[#6]-[#1]),$([#7](-[#6X4])-[#6;X4])]"
  },
  {
    "id": "PAINS_A-015",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "imine_one_isatin(189)",
    "smarts": "[#8]=[#6]-2-[#6](=!@[#7]-[#7])-c:1:c:c:c:c:c:1-[#7]-2"
  },
  {
    "id": "PAINS_A-016",
    "set": "PAINS",
    "subset": "PAINS_A",
    "name": "anil_di_alk_E(186)",
    "smarts": "[#6](-[#1])-[#7](-[#6](-[#1])-[#1])-c:1:c(:c(:c(:[c;!H0,$(c-[#6](-[#1])-[#1])](:c:1-[#1]))-[#6&!H0;!H1,$([#6]-[#6;!H0])])-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-001",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thiaz_ene_A(128)",
    "smarts": "[#6]-,:1(=,:[#6;!H0,$([#6]-[#6;!H0;!H1]),$([#6]-[#6]=[#8])]-,:[#16]-,:[#6](-,:[#7;!H0,$([#7]-[#6;!H0]),$([#7]-[#6]:[#6])]-,:1)=[#7;!R])-[$([#6](-[#1])-[#1]),$([#6]:[#6])]"
  },
  {
    "id": "PAINS_B-002",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "pyrrole_A(118)",
    "smarts": "n2(-[#6]:1:[!#1]:[#6]:[#6]:[#6]:[#6]:1)c(cc(c2-[#6;X4])-[#1])-[#6;X4]"
  },
  {
    "id": "PAINS_B-003",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "catechol_A(92)",
    "smarts": "c:1:c:c(:c(:c:c:1)-[#8]-[#1])-[#8]-[#1]"
  },
  {
    "id": "PAINS_B-004",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_het_B(90)",
    "smarts": "[#6]-1(=[#6])-[#6](-[#7]=[#6]-[#16]-1)=[#8]"
  },
  {
    "id": "PAINS_B-005",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "imine_one_fives(89)",
    "smarts": "[#6]-1=[!#1]-[!#6&!#1]-[#6](-[#6]-1=[!#6&!#1;!R])=[#8]"
  },
  {
    "id": "PAINS_B-006",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_het_C(85)",
    "smarts": "[#6]-1(-[#6](-[#6]=[#6]-[!#6&!#1]-1)=[#6])=[!#6&!#1]"
  },
  {
    "id": "PAINS_B-007",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "hzone_pipzn(79)",
    "smarts": "[#6]-[#7]-1-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])(-[#1])-[#6]-1(-[#1])-[#1])-[#7]=[#6](-[#1])-[#6]:[!#1]"
  },
  {
    "id": "PAINS_B-008",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "keto_keto_beta_A(68)",
    "smarts": "c:1-2:c(:c:c:c:c:1)-[#6](=[#8])-[#6;X4]-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_B-009",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "hzone_pyrrol(64)",
    "smarts": "n1(-[#6])c(c(-[#1])c(c1-[#6]=[#7]-[#7])-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-010",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_one_ene_A(57)",
    "smarts": "[#6]=!@[#6](-[!#1])-@[#6](=!@[!#6&!#1])-@[#6](=!@[#6])-[!#1]"
  },
  {
    "id": "PAINS_B-011",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_ene_amine_A(56)",
    "smarts": "[#6](-[#6]#[#7])(-[#6]#[#7])-[#6](-[#7](-[#1])-[#1])=[#6]-[#6]#[#7]"
  },
  {
    "id": "PAINS_B-012",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_one_A(55)",
    "smarts": "c:1-2:c(:c:c:c:c:1)-[#6](=[#8])-[#6](=[#6])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_B-013",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_pyridone_A(54)",
    "smarts": "[#6]-,:1(=,:[!#1]-,:[!#1]=,:[!#1]-,:[#7](-,:[#6]-,:1=[#16])-[#1])-[#6]#[#7]"
  },
  {
    "id": "PAINS_B-014",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "anil_alk_ene(51)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6]-3-[#6](-[#6]-[#7]-2)-[#6]-[#6]=[#6]-3"
  },
  {
    "id": "PAINS_B-015",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "amino_acridine_A(46)",
    "smarts": "c:1:c:2:c(:c:c:c:1):n:c:3:c(:c:2-[#7]):c:c:c:c:3"
  },
  {
    "id": "PAINS_B-016",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_het_D(46)",
    "smarts": "[#6]-1(=[#6])-[#6](=[#8])-[#7]-[#7]-[#6]-1=[#8]"
  },
  {
    "id": "PAINS_B-017",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thiophene_amino_Aa(45)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:s:1)-[!#1])-[!#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_B-018",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_het_E(44)",
    "smarts": "[#7]-[#6]=!@[#6]-2-[#6](=[#8])-c:1:c:c:c:c:c:1-[!#6&!#1]-2"
  },
  {
    "id": "PAINS_B-019",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "sulfonamide_A(43)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#8]-[#1])-[F,Cl,Br,I])-[#1])-[F,Cl,Br,I])-[#1])-[#16](=[#8])(=[#8])-[#7]"
  },
  {
    "id": "PAINS_B-020",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thio_ketone(43)",
    "smarts": "[#6]-[#6](=[#16])-[#6]"
  },
  {
    "id": "PAINS_B-021",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "sulfonamide_B(41)",
    "smarts": "c:1:c:c(:c:c:c:1-[#8]-[#1])-[#7](-[#1])-[#16](=[#8])=[#8]"
  },
  {
    "id": "PAINS_B-022",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "anil_no_alk(40)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[$([#8]),$([#7]),$([#6](-[#1])-[#1])])-[#1])-[#1])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-023",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thiophene_amino_Ab(40)",
    "smarts": "[c;!H0,$(c-[#6](-[#1])-[#1]),$(c-[#6]:[#6])]:1:c(:c(:c(:s:1)-[#7](-[#1])-[#6](=[#8])-[#6])-[#6](=[#8])-[#8])-[$([#6]:1:[#6]:[#6]:[#6]:[#6]:[#6]:1),$([#6]:1:[#16]:[#6]:[#6]:[#6]:1)]"
  },
  {
    "id": "PAINS_B-024",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "het_pyridiniums_A(39)",
    "smarts": "[#7+]:1(:[#6]:[#6]:[!#1]:c:2:c:1:c(:[c;!H0,$(c-[#7])]:c:c:2)-[#1])-[$([#6](-[#1])(-[#1])-[#1]),$([#8;X1]),$([#6](-[#1])(-[#1])-[#6](-[#1])=[#6](-[#1])-[#1]),$([#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#8]-[#1]),$([#6](-[#1])(-[#1])-[#6](=[#8])-[#6]),$([#6](-[#1])(-[#1])-[#6](=[#8])-[#7](-[#1])-[#6]:[#6]),$([#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#1])]"
  },
  {
    "id": "PAINS_B-025",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "anthranil_one_A(38)",
    "smarts": "c:1:c:c:c:c(:c:1-[#7&!H0;!H1,!$([#7]-[#6]=[#8])])-[#6](-[#6]:[#6])=[#8]"
  },
  {
    "id": "PAINS_B-026",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_imine_A(37)",
    "smarts": "[#7](-[#1])-[#7]=[#6](-[#6]#[#7])-[#6]=[!#6&!#1;!R]"
  },
  {
    "id": "PAINS_B-027",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "diazox_sulfon_A(36)",
    "smarts": "[#7](-c:1:c:c:c:c:c:1)-[#16](=[#8])(=[#8])-[#6]:2:[#6]:[#6]:[#6]:[#6]:3:[#7]:[$([#8]),$([#16])]:[#7]:[#6]:2:3"
  },
  {
    "id": "PAINS_B-028",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "hzone_anil_di_alk(35)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])=[#7]-[#7]-[$([#6](=[#8])-[#6](-[#1])(-[#1])-[#16]-[#6]:[#7]),$([#6](=[#8])-[#6](-[#1])(-[#1])-[!#1]:[!#1]:[#7]),$([#6](=[#8])-[#6]:[#6]-[#8]-[#1]),$([#6]:[#7]),$([#6](-[#1])(-[#1])-[#6](-[#1])-[#8]-[#1])])-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-029",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "rhod_sat_A(33)",
    "smarts": "[#7]-1-[#6](=[#16])-[#16]-[#6;X4]-[#6]-1=[#8]"
  },
  {
    "id": "PAINS_B-030",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "hzone_enamin(30)",
    "smarts": "[#7](-[#1])-[#7]=[#6]-[#6;!H0,$(*(-[#6])-[#6])]=[#6](-[#6])-!@[$([#7]),$([#8]-[#1])]"
  },
  {
    "id": "PAINS_B-031",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "pyrrole_B(29)",
    "smarts": "n2(-[#6]:1:[!#1]:[#6]:[#6]:[#6]:[#6]:1)c(cc(c2-[#6]:[#6])-[#1])-[#6;X4]"
  },
  {
    "id": "PAINS_B-032",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thiophene_hydroxy(28)",
    "smarts": "s1ccc(c1)-[#8]-[#1]"
  },
  {
    "id": "PAINS_B-033",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_pyridone_B(27)",
    "smarts": "[#6]-,:1(=,:[#6](-,:[#6](=[#8])-,:[#7]-,:[#6](=,:[#7]-,:1)-,:[!#6&!#1])-[#6]#[#7])-[#6]"
  },
  {
    "id": "PAINS_B-034",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "imine_one_sixes(27)",
    "smarts": "[#6]-1(-[#6](=[#8])-[#7]-[#6](=[#8])-[#7]-[#6]-1=[#8])=[#7]"
  },
  {
    "id": "PAINS_B-035",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "dyes5A(27)",
    "smarts": "[#6](-[#1])(-[#1])-[#7]([#6]:[#6])~[#6][#6]=,:[#6]-[#6]~[#6][#7]"
  },
  {
    "id": "PAINS_B-036",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "naphth_amino_A(25)",
    "smarts": "c:2:c:1:c:c:c:c-,:3:c:1:c(:c:c:2)-,:[#7]-,:[#6]=,:[#7]-,:3"
  },
  {
    "id": "PAINS_B-037",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "naphth_amino_B(25)",
    "smarts": "c:2:c:1:c:c:c:c-3:c:1:c(:c:c:2)-[#7](-[#6;X4]-[#7]-3-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-038",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_one_ester(24)",
    "smarts": "[#6]-[#6](=[#8])-[#6](-[#1])=[#6](-[#7](-[#1])-[#6])-[#6](=[#8])-[#8]-[#6]"
  },
  {
    "id": "PAINS_B-039",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thio_dibenzo(23)",
    "smarts": "[#16]=[#6]-1-[#6]=,:[#6]-[!#6&!#1]-[#6]=,:[#6]-1"
  },
  {
    "id": "PAINS_B-040",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_cyano_A(23)",
    "smarts": "[#6](-[#6]#[#7])(-[#6]#[#7])-[#6](-[$([#6]#[#7]),$([#6]=[#7])])-[#6]#[#7]"
  },
  {
    "id": "PAINS_B-041",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "hzone_acyl_naphthol(22)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1:c(:c(:c(:c:2-[#1])-[#8]-[#1])-[#6](=[#8])-[#7](-[#1])-[#7]=[#6])-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-042",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "het_65_A(21)",
    "smarts": "[#8]=[#6]-c2c1nc(-[#6](-[#1])-[#1])cc(-[#8]-[#1])n1nc2"
  },
  {
    "id": "PAINS_B-043",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "imidazole_A(19)",
    "smarts": "n:1:c(:n(:c(:c:1-c:2:c:c:c:c:c:2)-c:3:c:c:c:c:c:3)-[#1])-[#6]:[!#1]"
  },
  {
    "id": "PAINS_B-044",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_cyano_A(19)",
    "smarts": "[#6](-[#6]#[#7])(-[#6]#[#7])=[#6]-c:1:c:c:c:c:c:1"
  },
  {
    "id": "PAINS_B-045",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "anthranil_acid_A(19)",
    "smarts": "c:1(:c:c:c:c:c:1-[#7](-[#1])-[#7]=[#6])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_B-046",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "dyes3A(19)",
    "smarts": "[#7+]([#6]:[#6])=,:[#6]-[#6](-[#1])=[#6]-[#7](-[#6;X4])-[#6]"
  },
  {
    "id": "PAINS_B-047",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "dhp_bis_amino_CN(19)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-1=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#6](=[#6](-[#7](-[#1])-[#1])-[#16]-1)-[#6]#[#7]"
  },
  {
    "id": "PAINS_B-048",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "het_6_tetrazine(18)",
    "smarts": "[#7]~[#6]:1:[#7]:[#7]:[#6](:[$([#7]),$([#6]-[#1]),$([#6]-[#7]-[#1])]:[$([#7]),$([#6]-[#7])]:1)-[$([#7]-[#1]),$([#8]-[#6](-[#1])-[#1])]"
  },
  {
    "id": "PAINS_B-049",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_one_hal(17)",
    "smarts": "[#6]-[#6]=[#6](-[F,Cl,Br,I])-[#6](=[#8])-[#6]"
  },
  {
    "id": "PAINS_B-050",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "cyano_imine_B(17)",
    "smarts": "[#6](-[#6]#[#7])(-[#6]#[#7])=[#7]-[#7](-[#1])-c:1:c:c:c:c:c:1"
  },
  {
    "id": "PAINS_B-051",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thiaz_ene_B(17)",
    "smarts": "[#6]-,:1(=,:[#6](-!@[#6](=[#8])-[#7]-[#6](-[#1])-[#1])-,:[#16]-,:[#6](-,:[#7]-,:1-,:[$([#6](-[#1])(-[#1])-[#6](-[#1])=[#6](-[#1])-[#1]),$([#6]:[#6])])=[#16])-,:[$([#7]-[#6](=[#8])-[#6]:[#6]),$([#7](-[#1])-[#1])]"
  },
  {
    "id": "PAINS_B-052",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_rhod_B(16)",
    "smarts": "[#16]-1-[#6](=[#8])-[#7]-[#6](=[#8])-[#6]-1=[#6](-[#1])-[$([#6]-[#35]),$([#6]:[#6](-[#1]):[#6](-[F,Cl,Br,I]):[#6]:[#6]-[F,Cl,Br,I]),$([#6]:[#6](-[#1]):[#6](-[#1]):[#6]-[#16]-[#6](-[#1])-[#1]),$([#6]:[#6]:[#6]:[#6]:[#6]:[#6]:[#6]:[#6]:[#6]:[#6]-[#8]-[#6](-[#1])-[#1]),$([#6]:1:[#6](-[#6](-[#1])-[#1]):[#7](-[#6](-[#1])-[#1]):[#6](-[#6](-[#1])-[#1]):[#6]:1)]"
  },
  {
    "id": "PAINS_B-053",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "thio_carbonate_A(15)",
    "smarts": "[#8]-,:1-,:[#6](-,:[#16]-,:c:2:c-,:1:c:c:c(:c:2)-,:[$([#7]),$([#8])])=[$([#8]),$([#16])]"
  },
  {
    "id": "PAINS_B-054",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "anil_di_alk_furan_A(15)",
    "smarts": "[#7](-[#6](-[#1])-[#1])(-[#6](-[#1])-[#1])-c:1:c(:c(:c(:o:1)-[#6]=[#7]-[#7](-[#1])-[#6]=[!#6&!#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_B-055",
    "set": "PAINS",
    "subset": "PAINS_B",
    "name": "ene_five_het_F(15)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#6](-[#1])=!@[#6]-3-[#6](=[#8])-c:2:c:c:c:c:c:2-[#16]-3"
  },
  {
    "id": "PAINS_C-001",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_F(14)",
    "smarts": "c:1:c:c(:c:c:c:1-[#6;X4]-c:2:c:c:c(:c:c:2)-[#7&H2,$([#7;!H0]-[#6;X4]),$([#7](-[#6X4])-[#6X4])])-[#7&H2,$([#7;!H0]-[#6;X4]),$([#7](-[#6X4])-[#6X4])]"
  },
  {
    "id": "PAINS_C-002",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_anil(14)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[#7](-[#1])-[#1])-[#1])-[#1])-[#6]=[#7]-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-003",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_pyrazole_OH(14)",
    "smarts": "c1(nn(c([c;!H0,$(c-[#6;!H0])]1)-[#8]-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#1])-[#1])-[#1])-[#6;X4]"
  },
  {
    "id": "PAINS_C-004",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_666_A(13)",
    "smarts": "c:2(:c:1-[#16]-c:3:c(-[#7;!H0,$([#7]-[CH3]),$([#7]-[#6;!H0;!H1]-[#6;!H0])](-c:1:c(:c(:c:2-[#1])-[#1])-[#1])):[c;!H0,$(c~[#7](-[#1])-[#6;X4]),$(c(cc)(cc)~[#6]:[#6])](:[c;!H0,$(c(cc)(cc)~[#6]:[#6])]:[c;!H0,$(c-[#7](-[#1])-[#1]),$(c-[#8]-[#6;X4])]:c:3-[#1]))-[#1]"
  },
  {
    "id": "PAINS_C-005",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "styrene_A(13)",
    "smarts": "[#6]-2-[#6]-c:1:c(:c:c:c:c:1)-[#6](-c:3:c:c:c:c:c-2:3)=[#6]-[#6]"
  },
  {
    "id": "PAINS_C-006",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_C(13)",
    "smarts": "[#16]-1-[#6](=[#7]-[#6]:[#6])-[#7;!H0,$([#7]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#8]),$([#7]-[#6]:[#6])]-[#6](=[#8])-[#6]-1=[#6](-[#1])-[$([#6]:[#6]:[#6]-[#17]),$([#6]:[!#6&!#1])]"
  },
  {
    "id": "PAINS_C-007",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_A(13)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-1=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#6](=[#6](-[#6]=[#6])-[#8]-1)-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-008",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_imine_C(12)",
    "smarts": "[#8]=[#16](=[#8])-[#6](-[#6]#[#7])=[#7]-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-009",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_A(12)",
    "smarts": "c:1:c:c:c:c:c:1-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:2:c:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-010",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_B(12)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7](-[#1])-c:2:c(:c(:c(:s:2)-[$([#6]=[#8]),$([#6]#[#7]),$([#6](-[#8]-[#1])=[#6])])-[#7])-[$([#6]#[#7]),$([#6](:[#7]):[#7])]"
  },
  {
    "id": "PAINS_C-011",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_B(12)",
    "smarts": "[#6;X4]-1-[#6](=[#8])-[#7]-[#7]-[#6]-1=[#8]"
  },
  {
    "id": "PAINS_C-012",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_phenone_A(11)",
    "smarts": "c:1:c-3:c(:c:c:c:1)-[#6]:2:[#7]:[!#1]:[#6]:[#6]:[#6]:2-[#6]-3=[#8]"
  },
  {
    "id": "PAINS_C-013",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_pyridone_C(11)",
    "smarts": "[#6]-1(-[#6](=[#6](-[#6]#[#7])-[#6](~[#8])~[#7]~[#6]-1~[#8])-[#6](-[#1])-[#1])=[#6](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-014",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiaz_ene_C(11)",
    "smarts": "[#6]-,:1(=,:[#6](-!@[#6]=[#7])-,:[#16]-,:[#6](-,:[#7]-,:1)=[#8])-[$([F,Cl,Br,I]),$([#7+](:[#6]):[#6])]"
  },
  {
    "id": "PAINS_C-015",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_thiophene_A(11)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1]):[!#6&!#1]:[#6;!H0,$([#6]-[OH]),$([#6]-[#6;H2,H3])](:[#6]:2-[#6](-[#1])=[#7]-[#7](-[#1])-[$([#6]:1:[#7]:[#6]:[#6](-[#1]):[#16]:1),$([#6]:[#6](-[#1]):[#6]-[#1]),$([#6]:[#7]:[#6]:[#7]:[#6]:[#7]),$([#6]:[#7]:[#7]:[#7]:[#7])])"
  },
  {
    "id": "PAINS_C-016",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_quin_methide(10)",
    "smarts": "[!#1]:[!#1]-[#6;!H0,$([#6]-[#6]#[#7])]=[#6]-1-[#6]=,:[#6]-[#6](=[$([#8]),$([#7;!R])])-[#6]=,:[#6]-1"
  },
  {
    "id": "PAINS_C-017",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_676_A(10)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6]-[#6](-c:3:c(-[#16]-2):c(:c(-[#1]):[c;!H0,$(c-[#8]),$(c-[#16;X2]),$(c-[#6;X4]),$(c-[#7;H2,H3,$([#7!H0]-[#6;X4]),$([#7](-[#6;X4])-[#6;X4])])](:c:3-[#1]))-[#1])-[#7;H2,H3,$([#7;!H0](-[#6])-[#6;X4]),$([#7](-[#6])(-[#6;X4])-[#6;X4])]"
  },
  {
    "id": "PAINS_C-018",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_G(10)",
    "smarts": "[#6]-1(=[#8])-[#6](=[#6](-[#1])-[$([#6]:1:[#6]:[#6]:[#6]:[#6]:[#6]:1),$([#6]:1:[#6]:[#6]:[#6]:[!#6&!#1]:1)])-[#7]=[#6](-[!#1]:[!#1]:[!#1])-[$([#16]),$([#7]-[!#1]:[!#1])]-1"
  },
  {
    "id": "PAINS_C-019",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "acyl_het_A(9)",
    "smarts": "[#7+](:[!#1]:[!#1]:[!#1])-[!#1]=[#8]"
  },
  {
    "id": "PAINS_C-020",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_G(9)",
    "smarts": "[#6;X4]-[#7](-[#6;X4])-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6]2=,:[#7][#6]:[#6]:[!#1]2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-021",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_keto_A(9)",
    "smarts": "[#7;!H0,$([#7]-[#6;X4])]-1-[#6]=,:[#6](-[#6](=[#8])-[#6]:[#6]:[#6])-[#6](-[#6])-[#6](=[#6]-1-[#6](-[#1])(-[#1])-[#1])-[$([#6]=[#8]),$([#6]#[#7])]"
  },
  {
    "id": "PAINS_C-022",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_B(9)",
    "smarts": "c:1:c:c:c:c:c:1-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:2:c:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-023",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_bim(9)",
    "smarts": "c:1:3:c(:c(:c(:c(:c:1-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:c:c:c:c:c:2)-[#1]):n:c(-[#1]):n:3-[#6]"
  },
  {
    "id": "PAINS_C-024",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_imine_A(9)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#7]=[#6]-[#6]-2=[#7;!R]"
  },
  {
    "id": "PAINS_C-025",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_C(9)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#7](-[#1])-[#6](=[#16])-[#7]-[#7](-[#1])-[#6](=[#8])-[#6]-,:2:[!#1]:[!#6&!#1]:[#6]:[#6]-,:2"
  },
  {
    "id": "PAINS_C-026",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_one_fives_B(9)",
    "smarts": "[#7;!R]=[#6]-2-[#6](=[#8])-c:1:c:c:c:c:c:1-[#16]-2"
  },
  {
    "id": "PAINS_C-027",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_B(9)",
    "smarts": "[$([#7](-[#1])-[#1]),$([#8]-[#1])]-[#6]-2=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-c:1:c(:n(-[#6]):n:c:1)-[#8]-2"
  },
  {
    "id": "PAINS_C-028",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_no_alk_A(8)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:n:c:1-[#1])-[#8]-c:2:c:c:c:c:c:2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-029",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_66_one(8)",
    "smarts": "[#6](=[#8])-[#6]-1=[#6]-[#7]-c:2:c(-[#16]-1):c:c:c:c:2"
  },
  {
    "id": "PAINS_C-030",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "styrene_B(8)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6](-c:3:c(-[$([#16;X2]),$([#6;X4])]-2):c:c:[c;!H0,$(c-[#17]),$(c-[#6;X4])](:c:3))=[#6]-[#6]"
  },
  {
    "id": "PAINS_C-031",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_A(8)",
    "smarts": "[#6](-[#1])(-[#1])-[#16;X2]-c:1:n:c(:c(:n:1-!@[#6](-[#1])-[#1])-c:2:c:c:c:c:c:2)-[#1]"
  },
  {
    "id": "PAINS_C-032",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_ene_A(8)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6]-2=[#6](-[#1])-c:1:c(:c:c:c:c:1)-[#16;X2]-c:3:c-2:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-033",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_D(8)",
    "smarts": "[#16]-1-[#6](=!@[#7;!H0,$([#7]-[#7](-[#1])-[#6]:[#6])])-[#7;!H0,$([#7]-[#6]:[#7]:[#6]:[#6]:[#16])]-[#6](=[#8])-[#6]-1=[#6](-[#1])-[#6]:[#6]-[$([#17]),$([#8]-[#6]-[#1])]"
  },
  {
    "id": "PAINS_C-034",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_E(8)",
    "smarts": "[#16]-1-[#6](=[#8])-[#7]-[#6](=[#16])-[#6]-1=[#6](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-035",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OH_alk_A(8)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#6](-[#1])(-[#1])-[#7](-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-036",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_C(8)",
    "smarts": "n1(-[#6;X4])c(c(-[#1])c(c1-[#6]:[#6])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-037",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_D(8)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#7](-[#1])-[#6](=[#16])-[#7]-[#7](-[#1])-c:2:c:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-038",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiaz_ene_D(8)",
    "smarts": "[#7](-c:1:c:c:c:c:c:1)-c2[n+]c(cs2)-c:3:c:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-039",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_F(8)",
    "smarts": "n:1:c:c:c(:c:1-[#6](-[#1])-[#1])-[#6](-[#1])=[#6]-2-[#6](=[#8])-[#7]-[#6](=[!#6&!#1])-[#7]-2"
  },
  {
    "id": "PAINS_C-040",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiaz_ene_E(8)",
    "smarts": "[#6]-,:1(=,:[#6](-[#6](-[#1])(-[#6])-[#6])-,:[#16]-,:[#6](-,:[#7;!H0,$([#7]-[#6;!H0;!H1])]-,:1)=[#8])-[#16]-[#6;R]"
  },
  {
    "id": "PAINS_C-041",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_B(7)",
    "smarts": "[!#1]:,-1:[!#1]-,:2:[!#1](:[!#1]:[!#1]:[!#1]:,-1)-,:[#7](-[#1])-,:[#7](-,:[#6]-,:2=[#8])-[#6]"
  },
  {
    "id": "PAINS_C-042",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_C(7)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6](=[#6](-[#6]-2=[#8])-[#6])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-043",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_A(7)",
    "smarts": "c:2:c:c:1:n:n:c(:n:c:1:c:c:2)-[#6](-[#1])(-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-044",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_E(7)",
    "smarts": "c:1:c:c:c:c:c:1-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:n:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-045",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_C(7)",
    "smarts": "[#6](-[#1])-[#6](-[#1])(-[#1])-c:1:c(:c(:c(:s:1)-[#7](-[#1])-[#6](=[#8])-[#6]-[#6]-[#6]=[#8])-[$([#6](=[#8])-[#8]),$([#6]#[#7])])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-046",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_phenone(7)",
    "smarts": "[#6](-c:1:c(:c(:[c;!H0,$(c-[#6;X4])]:c:c:1-[#1])-[#1])-[#1])(-c:2:c(:c(:[c;!H0,$(c-[#17])](:c(:c:2-[#1])-[#1]))-[#1])-[#1])=[$([#7]-[#8]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]),$([#7]-[#8]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]),$([#7]-[#7](-[#1])-[#6](=[#7]-[#1])-[#7](-[#1])-[#1]),$([#6](-[#1])-[#7])]"
  },
  {
    "id": "PAINS_C-047",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_G(7)",
    "smarts": "[#8](-[#1])-[#6](=[#8])-c:1:c:c(:c:c:c:1)-[#6]:[!#1]:[#6]-[#6](-[#1])=[#6]-2-[#6](=[!#6&!#1])-[#7]-[#6](=[!#6&!#1])-[!#6&!#1]-2"
  },
  {
    "id": "PAINS_C-048",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_B(7)",
    "smarts": "[#6]-1(=[#6]-[#6](-c:2:c:c(:c(:n:c-1:2)-[#7](-[#1])-[#1])-[#6]#[#7])=[#6])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-049",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_C(7)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-1=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#6](=[#6](-[#6]:[#6])-[#8]-1)-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-050",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_A(7)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#7]=[#6](-[#6]=[#8])-[#6;X4]-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-051",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_H(6)",
    "smarts": "[#7]-1=[#6]-[#6](-[#6](-[#7]-1)=[#16])=[#6]"
  },
  {
    "id": "PAINS_C-052",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_A(6)",
    "smarts": "c1(coc(c1-[#1])-[#6](=[#16])-[#7]-2-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[!#1]-[#6](-[#1])(-[#1])-[#6]-2(-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-053",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_C(6)",
    "smarts": "[#6]=[#6](-[#6]#[#7])-[#6](=[#7]-[#1])-[#7]-[#7]"
  },
  {
    "id": "PAINS_C-054",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_furan_A(6)",
    "smarts": "c:1(:c(:c(:[c;!H0,$(c-[#6;!H0;!H1])](:o:1))-[#1])-[#1])-[#6;!H0,$([#6]-[#6;!H0;!H1])]=[#7]-[#7](-[#1])-c:2:n:c:c:s:2"
  },
  {
    "id": "PAINS_C-055",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_H(6)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#7](-[#1])-[#16](=[#8])(=[#8])-[#6]:2:[#6]:[!#1]:[#6]:[#6]:[#6]:2)-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-056",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_C(6)",
    "smarts": "n2c1ccccn1c(c2-[$([#6](-[!#1])=[#6](-[#1])-[#6]:[#6]),$([#6]:[#8]:[#6])])-[#7]-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-057",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_F(6)",
    "smarts": "[#6]-1-[#7](-[#1])-[#7](-[#1])-[#6](=[#16])-[#7]-[#7]-1-[#1]"
  },
  {
    "id": "PAINS_C-058",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_I(6)",
    "smarts": "c:1(:c:c:c:o:1)-[#6](-[#1])=!@[#6]-3-[#6](=[#8])-c:2:c:c:c:c:c:2-[!#6&!#1]-3"
  },
  {
    "id": "PAINS_C-059",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_gamma(5)",
    "smarts": "[#8]=[#6]-1-[#6;X4]-[#6]-[#6](=[#8])-c:2:c:c:c:c:c-1:2"
  },
  {
    "id": "PAINS_C-060",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "quinone_B(5)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6](-c3cccc4noc-2c34)=[#8]"
  },
  {
    "id": "PAINS_C-061",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6_pyridone_OH(5)",
    "smarts": "[#8](-[#1])-c:1:n:c(:c:c:c:1)-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-062",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_naphth_A(5)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1:c(:c(:c(:c:2-[#1])-[#1])-[#6]=[#7]-[#7](-[#1])-[$([#6]:[#6]),$([#6]=[#16])])-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-063",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_ester_A(5)",
    "smarts": "[#6]-,:1=,:[#6](-,:[#16]-,:[#6](-,:[#6]=,:[#6]-,:1)=[#16])-,:[#7]"
  },
  {
    "id": "PAINS_C-064",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_misc_A(5)",
    "smarts": "[#6]-1=[#6]-[#6](-[#8]-[#6]-1-[#8])(-[#8])-[#6]"
  },
  {
    "id": "PAINS_C-065",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_pyridone_D(5)",
    "smarts": "[#8]=[#6]-,:1-,:[#6](=,:[#6]-,:[#6](=,:[#7]-,:[#7]-,:1)-,:[#6]=[#8])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-066",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_Db(5)",
    "smarts": "c3cn1c(nc(c1-[#7]-[#6])-c:2:c:c:c:c:n:2)cc3"
  },
  {
    "id": "PAINS_C-067",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_666_A(5)",
    "smarts": "[#7]-2-c:1:c:c:c:c:c:1-[#6](=[#7])-c:3:c-2:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-068",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_sulfon_B(5)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7]-2-[#6](-[#1])-[#6](-[#1])-[#7](-[#6](-[#1])-[#6]-2-[#1])-[#16](=[#8])(=[#8])-c:3:c:c:c:c:4:n:s:n:c:3:4"
  },
  {
    "id": "PAINS_C-069",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_alk_A(5)",
    "smarts": "c:1(:c(:c-,:2:c(:c(:c:1-[#1])-[#1])-,:[#7](-,:[#6](-,:[#7]-,:2-[#1])=[#8])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-070",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_C(5)",
    "smarts": "c:1(:c(:c-3:c(:c(:c:1-[#7](-[#1])-[#16](=[#8])(=[#8])-c:2:c:c:c(:c:c:2)-[!#6&!#1])-[#1])-[#8]-[#6](-[#8]-3)(-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-071",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_55(5)",
    "smarts": "[#6](-[#1])-[#6]:2:[#7]:[#7](-c:1:c:c:c:c:c:1):[#16]:3:[!#6&!#1]:[!#1]:[#6]:[#6]:2:3"
  },
  {
    "id": "PAINS_C-072",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_D(5)",
    "smarts": "[#8]=[#6]-[#6]=[#6](-[#1])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-073",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_H(5)",
    "smarts": "[#7]-,:1-,:2-,:[#6](=,:[#7]-,:[#6](=[#8])-,:[#6](=,:[#7]-,:1)-[#6](-[#1])-[#1])-,:[#16]-,:[#6](=[#6](-[#1])-[#6]:[#6])-,:[#6]-,:2=[#8]"
  },
  {
    "id": "PAINS_C-074",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_ene_A(5)",
    "smarts": "[#6]:[#6]-[#6](-[#1])=[#6](-[#1])-[#6](-[#1])=[#7]-[#7](-[#6;X4])-[#6;X4]"
  },
  {
    "id": "PAINS_C-075",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_656a(5)",
    "smarts": "c:1:3:c(:c:c:c:c:1):c:2:n:n:c(-[#16]-[#6](-[#1])(-[#1])-[#6]=[#8]):n:c:2:n:3-[#6](-[#1])(-[#1])-[#6](-[#1])=[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-076",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_D(5)",
    "smarts": "n1(-[#6])c(c(-[#1])c(c1-[#6](-[#1])(-[#1])-[#7](-[#1])-[#6](=[#16])-[#7]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-077",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_E(5)",
    "smarts": "n2(-[#6]:1:[!#1]:[!#6&!#1]:[!#1]:[#6]:1-[#1])c(c(-[#1])c(c2-[#6;X4])-[#1])-[#6;X4]"
  },
  {
    "id": "PAINS_C-078",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_G(5)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#7](-[#1])-[#6](=[#16])-[#7]-[#7](-[#1])-[#6]([#7;R])[#7;R]"
  },
  {
    "id": "PAINS_C-079",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anisol_A(5)",
    "smarts": "c:1(:c(:c(:c(:c(:[c;!H0,$(c-[#6](-[#1])-[#1])]:1)-[#1])-[#8]-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[$([#7](-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1]),$([#6](-[#1])(-[#6](-[#1])-[#1])-[#7](-[#1])-[#6](=[#16])-[#7]-[#1])])-[#1])-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-080",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_F(5)",
    "smarts": "n2(-[#6]:1:[#6](-[#6]#[#7]):[#6]:[#6]:[!#6&!#1]:1)c(c(-[#1])c(c2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-081",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_D(5)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-2=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-c:1:c(:c:c:s:1)-[#8]-2"
  },
  {
    "id": "PAINS_C-082",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_A(4)",
    "smarts": "[#7](-[#1])-c:1:n:c(:c:s:1)-c:2:c:n:c(-[#7](-[#1])-[#1]):s:2"
  },
  {
    "id": "PAINS_C-083",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6_imidate_A(4)",
    "smarts": "[#7]=[#6]-,:1-,:[#7](-[#1])-,:[#6](=,:[#6](-[#7]-[#1])-,:[#7]=,:[#7]-,:1)-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-084",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_no_alk_B(4)",
    "smarts": "c:1:c(:c:2:c(:c:c:1):c:c:c:c:2)-[#8]-c:3:c(:c(:c(:c(:c:3-[#1])-[#1])-[#7]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-085",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "styrene_C(4)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6]-[#16]-c3c(-[#6]-2=[#6])ccs3"
  },
  {
    "id": "PAINS_C-086",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "azulene(4)",
    "smarts": "c:2:c:c:c:1:c(:c:c:c:1):c:c:2"
  },
  {
    "id": "PAINS_C-087",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "furan_acid_A(4)",
    "smarts": "c:1(:c(:c(:c(:o:1)-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#8]-[#6]:[#6])-[#1])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-088",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_pyridone_E(4)",
    "smarts": "[!#1]:[#6]-[#6]-,:1=,:[#6](-[#1])-,:[#6](=,:[#6](-[#6]#[#7])-,:[#6](=[#8])-,:[#7]-,:1-[#1])-[#6]:[#8]"
  },
  {
    "id": "PAINS_C-089",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_thio(4)",
    "smarts": "[#6]-1-3=[#6](-[#6](-[#7]-c:2:c:c:c:c:c-1:2)(-[#6])-[#6])-[#16]-[#16]-[#6]-3=[!#1]"
  },
  {
    "id": "PAINS_C-090",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_I(4)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#7](-[#1])-[#6](=[#8])-c:2:c:c:c:c:c:2)-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-091",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_6_furan(4)",
    "smarts": "[#6](-[#1])(-[#1])-[#16;X2]-c:1:n:n:c(:c(:n:1)-c:2:c(:c(:c(:o:2)-[#1])-[#1])-[#1])-c:3:c(:c(:c(:o:3)-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-092",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_ene_B(4)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6]-2=[#6]-c:1:c(:c:c:c:c:1)-[#6]-2(-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-093",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_one_B(4)",
    "smarts": "[#7](-[#1])(-c:1:c:c:c:c:c:1)-[#7]=[#6](-[#6](=[#8])-[#6](-[#1])-[#1])-[#7](-[#1])-[$([#7]-[#1]),$([#6]:[#6])]"
  },
  {
    "id": "PAINS_C-094",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_A(4)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1]):o:c:3:c(-[#1]):c(:c(-[#8]-[#6](-[#1])-[#1]):c(:c:2:3)-[#1])-[#7](-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-095",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_J(4)",
    "smarts": "[#16]=[#6]-,:1-,:[#7](-[#1])-,:[#6]=,:[#6]-,:[#6]-2=,:[#6]-,:1-[#6](=[#8])-[#8]-[#6]-2=[#6]-[#1]"
  },
  {
    "id": "PAINS_C-096",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_G(4)",
    "smarts": "n2(-c:1:c(:c:c(:c(:c:1)-[#1])-[$([#7](-[#1])-[#1]),$([#6]:[#7])])-[#1])c(c(-[#1])c(c2-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-097",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_K(4)",
    "smarts": "n1(-[#6])c(c(-[#1])c(c1-[#6](-[#1])=[#6]-2-[#6](=[#8])-[!#6&!#1]-[#6]=,:[!#1]-2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-098",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_ene_amine_B(4)",
    "smarts": "[#6]=[#6]-[#6](-[#6]#[#7])(-[#6]#[#7])-[#6](-[#6]#[#7])=[#6]-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-099",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_ester_B(4)",
    "smarts": "[#6]:[#6]-[#6](=[#16;X1])-[#16;X2]-[#6](-[#1])-[$([#6](-[#1])-[#1]),$([#6]:[#6])]"
  },
  {
    "id": "PAINS_C-100",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_L(4)",
    "smarts": "[#8]=[#6]-3-[#6](=!@[#6](-[#1])-c:1:c:n:c:c:1)-c:2:c:c:c:c:c:2-[#7]-3"
  },
  {
    "id": "PAINS_C-101",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_thiophene_B(4)",
    "smarts": "c:1(:[c;!H0,$(c-[#6;!H0;!H1])](:c(:c(:s:1)-[#1])-[#1]))-[#6](-[#1])=[#7]-[#7](-[#1])-c:2:c:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-102",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_E(4)",
    "smarts": "[#6](-[#1])(-[#1])-[#16;X2]-[#6]-1=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#6](-[#6]#[#7])-[#6](=[#8])-[#7]-1"
  },
  {
    "id": "PAINS_C-103",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_B(4)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#7]=[#6](-[#7](-[#1])-[#6]=[#8])-[#6](-[#1])(-[#1])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-104",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_imine_B(3)",
    "smarts": "[#6]:[#6]-[#6](-[#1])=[#6](-[#1])-[#6](-[#1])=[#7]-[#7]=[#6]"
  },
  {
    "id": "PAINS_C-105",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_B(3)",
    "smarts": "c:1(:c:c:c(:c:c:1)-[#6](-[#1])-[#1])-c:2:c(:s:c(:n:2)-[#7](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-106",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_ene_one_A(3)",
    "smarts": "[#6]-2(-[#6]=[#7]-c:1:c:c:c:c:c:1-[#7]-2)=[#6](-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-107",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_A(3)",
    "smarts": "[#8](-c:1:c:c:c:c:c:1)-c:3:c:c:2:n:o:n:c:2:c:c:3"
  },
  {
    "id": "PAINS_C-108",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_A(3)",
    "smarts": "[!#1]:1:[!#1]:[!#1]:[!#1](:[!#1]:[!#1]:1)-[#6](-[#1])=[#6](-[#1])-[#6](-[#7]-c:2:c:c:c:3:c(:c:2):c:c:c(:n:3)-[#7](-[#6])-[#6])=[#8]"
  },
  {
    "id": "PAINS_C-109",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_no_alk_C(3)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c:c:c:n:1)-[#8]-[#6](-[#1])(-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-110",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazol_SC_A(3)",
    "smarts": "[#6]-[#16;X2]-c:1:n:c(:c:s:1)-[#1]"
  },
  {
    "id": "PAINS_C-111",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_666_B(3)",
    "smarts": "c:1:c-3:c(:c:c:c:1)-[#7](-c:2:c:c:c:c:c:2-[#8]-3)-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-112",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "furan_A(3)",
    "smarts": "c:1(:c(:c(:c(:o:1)-[#6](-[#1])-[#1])-[#1])-[#1])-[#6](-[#1])(-[#8]-[#1])-[#6]#[#6]-[#6;X4]"
  },
  {
    "id": "PAINS_C-113",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "colchicine_A(3)",
    "smarts": "[#6]-1(-[#6](=[#6]-[#6]=[#6]-[#6]=[#6]-1)-[#7]-[#1])=[#7]-[#6]"
  },
  {
    "id": "PAINS_C-114",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_C(3)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])=[#6]-[#6](=[#8])-c:1:c(-[#16;X2]):s:c(:c:1)-[$([#6]#[#7]),$([#6]=[#8])]"
  },
  {
    "id": "PAINS_C-115",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_B(3)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7]-2-[#6](=[#8])-[#6](=[#6](-[F,Cl,Br,I])-[#6]-2=[#8])-[#7](-[#1])-[#6]:3:[#6]:[#6]:[#6](-[#8]-[#6](-[#1])-[#1]):[#6]:[#6]:3"
  },
  {
    "id": "PAINS_C-116",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_66_A(3)",
    "smarts": "c:1-2:c(:c:c:c:c:1)-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7]=[#6]-2-[#16;X2]-[#6](-[#1])(-[#1])-[#6](=[#8])-c:3:c:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-117",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_B(3)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1-[#6](-[#1])-[#1])-[#6](=[#16])-[#7](-[#6](-[#1])(-[#1])-[!#1]:[!#1]:[!#1]:[!#1]:[!#1])-[#6](-[#1])(-[#1])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-118",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_I(3)",
    "smarts": "[#7]-2(-[#6](-[#1])-[#1])-[#6](=[#16])-[#7](-[#1])-[#6](=[#6](-[#1])-c:1:c:c:c:c(:c:1)-[Br])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-119",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_thiophene(3)",
    "smarts": "c:1(:c(:c:2:c(:s:1):c:c:c:c:2)-[#6](-[#1])-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-120",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_imine_C(3)",
    "smarts": "[#7](-[#6](-[#1])-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])=[#7]-[#6](-[#6](-[#1])-[#1])=[#7]-[#7](-[#6](-[#1])-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-121",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_pyridone_A(3)",
    "smarts": "[#6]:2(:[#6](-[#6](-[#1])-[#1]):[#6]-,:1:[#6](-,:[#7]=,:[#6;!H0,$([#6]-[#16]-[#6](-[#1])-[#1])](-,:[#7](-,:[#6]-,:1=[!#6&!#1;X1])-[#6](-[#1])-[$([#6](=[#8])-[#8]),$([#6]:[#6])])):[!#6&!#1;X2]:2)-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-122",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_C(3)",
    "smarts": "c:1(:n:c(:c(-[#1]):s:1)-[!#1]:[!#1]:[!#1](-[$([#8]-[#6](-[#1])-[#1]),$([#6](-[#1])-[#1])]):[!#1]:[!#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:c(-[#1]):c(:c(-[#1]):o:2)-[#1]"
  },
  {
    "id": "PAINS_C-123",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_pyr_A(3)",
    "smarts": "n:1:c(:c(:c(:c(:c:1-[#16]-[#6]-[#1])-[#6]#[#7])-c:2:c:c:c(:c:c:2)-[#8]-[#6](-[#1])-[#1])-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-124",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "melamine_A(3)",
    "smarts": "c:1:4:c(:n:c(:n:c:1-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:c(:c(:c(:o:2)-[#1])-[#1])-[#1])-[#7](-[#1])-c:3:c:[c;!H0,$(c-[#6](-[#1])-[#1]),$(c-[#16;X2]),$(c-[#8]-[#6]-[#1]),$(c-[#7;X3])](:[c;!H0,$(c-[#6](-[#1])-[#1]),$(c-[#16;X2]),$(c-[#8]-[#6]-[#1]),$(c-[#7;X3])](:c:[c;!H0,$(c-[#6](-[#1])-[#1]),$(c-[#16;X2]),$(c-[#8]-[#6]-[#1]),$(c-[#7;X3])]:3))):c:c:c:c:4"
  },
  {
    "id": "PAINS_C-125",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_alk_B(3)",
    "smarts": "[#7](-[#1])(-[#6]:1:[#6]:[#6]:[!#1]:[#6]:[#6]:1)-c:2:c:c:c(:c:c:2)-[#7](-[#1])-[#6]-[#1]"
  },
  {
    "id": "PAINS_C-126",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_C(3)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#6](=[#7]-[#6]=[#8])-[#16]-[#6](-[#1])(-[#1])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-127",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_D(3)",
    "smarts": "[#6]=[#6]-[#6](=[#8])-[#7]-c:1:c(:c(:c(:s:1)-[#6](=[#8])-[#8])-[#6]-[#1])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-128",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_C(3)",
    "smarts": "[#8;!H0,$([#8]-[#6](-[#1])-[#1])]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:n:c:c:n:2"
  },
  {
    "id": "PAINS_C-129",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_65_A(3)",
    "smarts": "[#6](-[#1])(-[#1])-[#16;X2]-c3nc1c(n(nc1-[#6](-[#1])-[#1])-c:2:c:c:c:c:c:2)nn3"
  },
  {
    "id": "PAINS_C-130",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_656b(3)",
    "smarts": "[#6]-[#6](=[#8])-[#6](-[#1])(-[#1])-[#16;X2]-c:3:n:n:c:2:c:1:c(:c(:c(:c(:c:1:n(:c:2:n:3)-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-131",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_D(3)",
    "smarts": "s:1:c(:[n+](-[#6](-[#1])-[#1]):c(:c:1-[#1])-[#6])-[#7](-[#1])-c:2:c:c:c:c:c:2[$([#6](-[#1])-[#1]),$([#6]:[#6])]"
  },
  {
    "id": "PAINS_C-132",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_H(3)",
    "smarts": "[#6]-,:2(=[#16])-,:[#7](-[#6](-[#1])(-[#1])-c:1:c:c:c:o:1)-,:[#6](=,:[#7]-,:[#7]-,:2-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-133",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_pyridone_F(3)",
    "smarts": "[#7]-,:2(-c:1:c:c:c:c:c:1)-,:[#6](=[#8])-,:[#6](=,:[#6]-,:[#6](=,:[#7]-,:2)-[#6]#[#7])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-134",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_D(3)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#6](=[#8])-[#16]-[#6](-[#1])(-[#6](-[#1])(-[#1])-[#6](=[#8])-[#7](-[#1])-[#6]:[#6])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-135",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_rhod_J(3)",
    "smarts": "[#6](-[#1])(-[#1])-[#7]-2-[#6](=[$([#16]),$([#7])])-[!#6&!#1]-[#6](=[#6]-1-[#6](=[#6](-[#1])-[#6]:[#6]-[#7]-1-[#6](-[#1])-[#1])-[#1])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-136",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_phenol_A(3)",
    "smarts": "[#6]=[#7;!R]-c:1:c:c:c:c:c:1-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-137",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_carbonate_B(3)",
    "smarts": "[#8]=[#6]-,:2-,:[#16]-,:c:1:c(:c(:c:c:c:1)-[#8]-[#6](-[#1])-[#1])-,:[#8]-,:2"
  },
  {
    "id": "PAINS_C-138",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_5A(3)",
    "smarts": "[#7]=,:[#6]-,:1-,:[#7]=,:[#6]-,:[#7]-,:[#16]-,:1"
  },
  {
    "id": "PAINS_C-139",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_65A(3)",
    "smarts": "[#7]-,:2-,:[#16]-,:[#6]-1=,:[#6](-[#6]:[#6]-[#7]-[#6]-1)-,:[#6]-,:2=[#16]"
  },
  {
    "id": "PAINS_C-140",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_J(3)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])=[#7]-[#7]=[#6](-[#6])-[#6]:[#6])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-141",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_H(3)",
    "smarts": "n1-2cccc1-[#6]=[#7](-[#6])-[#6]-[#6]-2"
  },
  {
    "id": "PAINS_C-142",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_D(3)",
    "smarts": "[#6](-[#6]#[#7])(-[#6]#[#7])=[#6](-[#16])-[#16]"
  },
  {
    "id": "PAINS_C-143",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_cyano_B(3)",
    "smarts": "[#6]-1(-[#6]#[#7])(-[#6]#[#7])-[#6](-[#1])(-[#6](=[#8])-[#6])-[#6]-1-[#1]"
  },
  {
    "id": "PAINS_C-144",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_M(3)",
    "smarts": "[#6]-1=,:[#6]-[#6](-[#6](-[$([#8]),$([#16])]-1)=[#6]-[#6]=[#8])=[#8]"
  },
  {
    "id": "PAINS_C-145",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_ene_amine_C(3)",
    "smarts": "[#6]:[#6]-[#6](=[#8])-[#7](-[#1])-[#6](=[#8])-[#6](-[#6]#[#7])=[#6](-[#1])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-146",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_I(3)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#7]=[#6]-c:2:c:n:c:c:2"
  },
  {
    "id": "PAINS_C-147",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_F(3)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-2=[#6](-[#6]#[#7])-[#6](-[#1])(-c:1:c:c:c:s:1)-[#6](=[#6](-[#6](-[#1])-[#1])-[#8]-2)-[#6](=[#8])-[#8]-[#6]"
  },
  {
    "id": "PAINS_C-148",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_B(3)",
    "smarts": "c:1:c-3:c(:c:c(:c:1)-[#6](=[#8])-[#7](-[#1])-c:2:c(:c:c:c:c:2)-[#6](=[#8])-[#8]-[#1])-[#6](-[#7](-[#6]-3=[#8])-[#6](-[#1])-[#1])=[#8]"
  },
  {
    "id": "PAINS_C-149",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_B(3)",
    "smarts": "[Cl]-c:2:c:c:1:n:o:n:c:1:c:c:2"
  },
  {
    "id": "PAINS_C-150",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_aldehyd_A(3)",
    "smarts": "[#6]-[#6](=[#16])-[#1]"
  },
  {
    "id": "PAINS_C-151",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_B(2)",
    "smarts": "[#6;X4]-[#7](-[#1])-[#6](-[#6]:[#6])=[#6](-[#1])-[#6](=[#16])-[#7](-[#1])-c:1:c:c:c:c:c:1"
  },
  {
    "id": "PAINS_C-152",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imidazole_B(2)",
    "smarts": "[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#16]-[#6](-[#1])(-[#1])-c1cn(cn1)-[#1]"
  },
  {
    "id": "PAINS_C-153",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_E(2)",
    "smarts": "[#8]=[#6]-[#7](-[#1])-c:1:c(-[#6]:[#6]):n:c(-[#6](-[#1])(-[#1])-[#6]#[#7]):s:1"
  },
  {
    "id": "PAINS_C-154",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_F(2)",
    "smarts": "[#6](-[#1])-[#7](-[#1])-c:1:n:c(:c:s:1)-c2cnc3n2ccs3"
  },
  {
    "id": "PAINS_C-155",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_ester_C(2)",
    "smarts": "[#7]-,:1-,:[#6](=[#8])-,:[#6](=,:[#6](-[#6])-,:[#16]-,:[#6]-,:1=[#16])-[#1]"
  },
  {
    "id": "PAINS_C-156",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_B(2)",
    "smarts": "[#6](-[#16])(-[#7])=[#6](-[#1])-[#6]=[#6](-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-157",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "quinone_C(2)",
    "smarts": "[#8]=[#6]-3-c:1:c(:c:c:c:c:1)-[#6]-,:2=,:[#6](-[#8]-[#1])-,:[#6](=[#8])-,:[#7]-,:c:4:c-,:2:c-3:c:c:c:4"
  },
  {
    "id": "PAINS_C-158",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_naphthol_A(2)",
    "smarts": "c:1:2:c:c:c:c(:c:1:c(:c:c:c:2)-[$([#8]-[#1]),$([#7](-[#1])-[#1])])-[#6](-[#6])=[#8]"
  },
  {
    "id": "PAINS_C-159",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_C(2)",
    "smarts": "[#6](-[#1])(-c:1:c:c:c:c:c:1)(-c:2:c:c:c:c:c:2)-[#6](=[#16])-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-160",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "phthalimide_misc(2)",
    "smarts": "[#7]-2(-[#6](=[#8])-c:1:c(:c(:c(:c(:c:1-[#1])-[#6](=[#8])-[#8]-[#1])-[#1])-[#1])-[#6]-2=[#8])-c:3:c(:c:c(:c(:c:3)-[#1])-[#8])-[#1]"
  },
  {
    "id": "PAINS_C-161",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_D(2)",
    "smarts": "c:1:c:c(:c:c:c:1-[#7](-[#1])-[#16](=[#8])=[#8])-[#7](-[#1])-[#16](=[#8])=[#8]"
  },
  {
    "id": "PAINS_C-162",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_alk_C(2)",
    "smarts": "[#6](-[#1])-[#7](-[#1])-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#6]-[#1]"
  },
  {
    "id": "PAINS_C-163",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_E(2)",
    "smarts": "s1c(c(c-,:2c1-,:[#7](-[#1])-,:[#6](-,:[#6](=,:[#6]-,:2-[#1])-[#6](=[#8])-[#8]-[#1])=[#8])-[#7](-[#1])-[#1])-[#6](=[#8])-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-164",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzide_naphth(2)",
    "smarts": "c:2(:c:1:c(:c(:c(:c(:c:1:c(:c(:c:2-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#7](-[#1])-[#6]=[#8])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-165",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anisol_B(2)",
    "smarts": "[#6](-[#1])(-[#1])-c:1:c(:c(:c(:c(:c:1-[#8]-[#6](-[#1])-[#1])-[#1])-[#1])-[#6](-[#1])(-[#1])-[#7](-[#1])-[#6;X4])-[#1]"
  },
  {
    "id": "PAINS_C-166",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_carbam_ene(2)",
    "smarts": "[#6]-1=[#6]-[#7]-[#6](-[#16]-[#6;X4]-1)=[#16]"
  },
  {
    "id": "PAINS_C-167",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_D(2)",
    "smarts": "[#6](-[#7](-[#6]-[#1])-[#6]-[#1]):[#6]-[#7](-[#1])-[#6](=[#16])-[#6]-[#1]"
  },
  {
    "id": "PAINS_C-168",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_Da(2)",
    "smarts": "n2nc(c1cccc1c2-[#6])-[#6]"
  },
  {
    "id": "PAINS_C-169",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_D(2)",
    "smarts": "s:1:c(:c(-[#1]):c(:c:1-[#6](=[#8])-[#7](-[#1])-[#7]-[#1])-[#8]-[#6](-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-170",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_6_ene(2)",
    "smarts": "[#6]-1:[#6]-[#7]=[#6]-[#6](=[#6]-[#7]-[#6])-[#16]-1"
  },
  {
    "id": "PAINS_C-171",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_keto_A(2)",
    "smarts": "[#6](-[#1])(-[#1])-[#6](-[#1])(-[#6]#[#7])-[#6](=[#8])-[#6]"
  },
  {
    "id": "PAINS_C-172",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_C(2)",
    "smarts": "c2(c(-[#7](-[#1])-[#1])n(-c:1:c:c:c:c:c:1-[#6](=[#8])-[#8]-[#1])nc2-[#6]=[#8])-[$([#6]#[#7]),$([#6]=[#16])]"
  },
  {
    "id": "PAINS_C-173",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "naphth_amino_C(2)",
    "smarts": "c:2:c:1:c:c:c:c-,:3:c:1:c(:c:c:2)-,:[#7](-,:[#7]=,:[#6]-,:3)-[#1]"
  },
  {
    "id": "PAINS_C-174",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "naphth_amino_D(2)",
    "smarts": "c:2:c:1:c:c:c:c-,:3:c:1:c(:c:c:2)-,:[#7]-,:[#7]=,:[#7]-,:3"
  },
  {
    "id": "PAINS_C-175",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_G(2)",
    "smarts": "c1csc(n1)-[#7]-[#7]-[#16](=[#8])=[#8]"
  },
  {
    "id": "PAINS_C-176",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_B(2)",
    "smarts": "c:1:c:c:c:2:c(:c:1):n:c(:n:c:2)-[#7](-[#1])-[#6]-3=[#7]-[#6](-[#6]=[#6]-[#7]-3-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-177",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_A(2)",
    "smarts": "c:1-,:3:c(:c(:c(:c(:c:1)-[#8]-[#6]-[#1])-[#1])-[#1])-,:c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-,:[#6](=[#8])-,:[#8]-,:3"
  },
  {
    "id": "PAINS_C-178",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_D(2)",
    "smarts": "c:12:c(:c:c:c:n:1)c(c(-[#6](=[#8])~[#8;X1])s2)-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-179",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_C(2)",
    "smarts": "c:1:2:n:c(:c(:n:c:1:[#6]:[#6]:[#6]:[!#1]:2)-[#6](-[#1])=[#6](-[#8]-[#1])-[#6])-[#6](-[#1])=[#6](-[#8]-[#1])-[#6]"
  },
  {
    "id": "PAINS_C-180",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_E(2)",
    "smarts": "c1csc(c1-[#7](-[#1])-[#1])-[#6](-[#1])=[#6](-[#1])-c2cccs2"
  },
  {
    "id": "PAINS_C-181",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6666_A(2)",
    "smarts": "c:2:c:c:1:n:c:3:c(:n:c:1:c:c:2):c:c:c:4:c:3:c:c:c:c:4"
  },
  {
    "id": "PAINS_C-182",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_E(2)",
    "smarts": "[#6]:[#6]-[#7](-[#1])-[#16](=[#8])(=[#8])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-183",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_K(2)",
    "smarts": "c:1:c:c(:c:c:c:1-[#7](-[#1])-[#1])-[#7](-[#6;X3])-[#6;X3]"
  },
  {
    "id": "PAINS_C-184",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_C(2)",
    "smarts": "[#7]-2=[#6](-c:1:c:c:c:c:c:1)-[#6](-[#1])(-[#1])-[#6](-[#8]-[#1])(-[#6](-[#9])(-[#9])-[#9])-[#7]-2-[$([#6]:[#6]:[#6]:[#6]:[#6]:[#6]),$([#6](=[#16])-[#6]:[#6]:[#6]:[#6]:[#6]:[#6])]"
  },
  {
    "id": "PAINS_C-185",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_six_het_B(2)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#6](=[#8])-[#6](-[#1])=[#6]-,:3-,:[#6](=[#8])-,:[#7](-[#1])-,:[#6](=[#8])-,:[#6](=[#6](-[#1])-c:2:c:c:c:c:c:2)-,:[#7]-,:3-[#1]"
  },
  {
    "id": "PAINS_C-186",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "steroid_A(2)",
    "smarts": "[#8]=[#6]-4-[#6]-[#6]-[#6]-3-[#6]-2-[#6](=[#8])-[#6]-[#6]-1-[#6]-[#6]-[#6]-[#6]-1-[#6]-2-[#6]-[#6]-[#6]-3=[#6]-4"
  },
  {
    "id": "PAINS_C-187",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_565_A(2)",
    "smarts": "c:1:2:c:3:c(:c(-[#8]-[#1]):c(:c:1:c(:c:n:2-[#6])-[#6]=[#8])-[#1]):n:c:n:3"
  },
  {
    "id": "PAINS_C-188",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_imine_ium(2)",
    "smarts": "[#6;X4]-[#7+](-[#6;X4]-[#8]-[#1])=[#6]-[#16]-[#6]-[#1]"
  },
  {
    "id": "PAINS_C-189",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_E(2)",
    "smarts": "[#6]-3(=[#8])-[#6](=[#6](-[#1])-[#7](-[#1])-c:1:c:c:c:c:c:1-[#6](=[#8])-[#8]-[#1])-[#7]=[#6](-c:2:c:c:c:c:c:2)-[#8]-3"
  },
  {
    "id": "PAINS_C-190",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_furan_B(2)",
    "smarts": "c:1(:c(:c(:[c;!H0,$(c-[#6;!H0;!H1])](:o:1))-[#1])-[#1])-[#6;!H0,$([#6]-[#6;!H0;!H1])]=[#7]-[#7](-[#1])-c:2:c:c:n:c:c:2"
  },
  {
    "id": "PAINS_C-191",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_E(2)",
    "smarts": "c:1(:c(:c(:[c;!H0,$(c-[#6;!H0;!H1])](:s:1))-[#1])-[#1])-[#6;!H0,$([#6]-[#6;!H0;!H1])]-[#6](=[#8])-[#7](-[#1])-c:2:n:c:c:s:2"
  },
  {
    "id": "PAINS_C-192",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_misc_B(2)",
    "smarts": "[#6]:[#6]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#6]=[#8])-[#7]-2-[#6](=[#8])-[#6]-1(-[#1])-[#6](-[#1])(-[#1])-[#6]=[#6]-[#6](-[#1])(-[#1])-[#6]-1(-[#1])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-193",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_B(2)",
    "smarts": "[#6]-1(-[#6]=[#8])(-[#6]:[#6])-[#16;X2]-[#6]=[#7]-[#7]-1-[#1]"
  },
  {
    "id": "PAINS_C-194",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_F(2)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:s:1)-[#7](-[#1])-[#6](=[#8])-c:2:c:c:c:c:c:2)-[#6]#[#7])-[#6]:3:[!#1]:[!#1]:[!#1]:[!#1]:[!#1]:3"
  },
  {
    "id": "PAINS_C-195",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_D(2)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-c:2:c:c:c:c:c:2-[$([#6](-[#1])-[#1]),$([#8]-[#6](-[#1])-[#1])]"
  },
  {
    "id": "PAINS_C-196",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "tert_butyl_A(2)",
    "smarts": "[#6](-[#1])(-[#1])(-[#1])-[#6](-[#6](-[#1])(-[#1])-[#1])(-[#6](-[#1])(-[#1])-[#1])-c:1:c(:c:c(:c(:c:1-[#1])-[#6](-[#6](-[#1])(-[#1])-[#1])(-[#6](-[#1])(-[#1])-[#1])-[#6](-[#1])(-[#1])-[#1])-[#8]-[#6](-[#1])-[#7])-[#1]"
  },
  {
    "id": "PAINS_C-197",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_J(2)",
    "smarts": "c:1(:c(:o:c:c:1)-[#6]-[#1])-[#6]=[#7]-[#7](-[#1])-[#6](=[#16])-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-198",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_65_B(2)",
    "smarts": "[#7](-[#1])-c1nc(nc2nnc(n12)-[#16]-[#6])-[#7](-[#1])-[#6]"
  },
  {
    "id": "PAINS_C-199",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_B(2)",
    "smarts": "c:1-,:2:c(:c:c:c:c:1-[#6](-[#1])(-[#1])-[#6](-[#1])=[#6](-[#1])-[#1])-,:[#6](=,:[#6](-[#6](=[#8])-[#7](-[#1])-[#6]:[#6])-,:[#6](=[#8])-,:[#8]-,:2)-[#1]"
  },
  {
    "id": "PAINS_C-200",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_K(2)",
    "smarts": "[#6]-,:2(=[#16])-,:[#7]-,:1-,:[#6]=,:[#6]-,:[#7]=,:[#7]-,:[#6]-,:1=,:[#7]-,:[#7]-,:2-[#1]"
  },
  {
    "id": "PAINS_C-201",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_G(2)",
    "smarts": "[#6]:[#6]:[#6]:[#6]:[#6]:[#6]-c:1:c:c(:c(:s:1)-[#7](-[#1])-[#6](=[#8])-[#6])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-202",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_alk_D(2)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:c:c:1-[#7](-[#1])-[#6](-[#1])(-[#6])-[#6](-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-203",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_C(2)",
    "smarts": "[#16]=[#6]-,:2-,:[#7](-[#1])-,:[#7]=,:[#6](-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1])-,:[#8]-,:2"
  },
  {
    "id": "PAINS_C-204",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_keto_het(2)",
    "smarts": "[#16]=[#6]-c:1:c:c:c:2:c:c:c:c:n:1:2"
  },
  {
    "id": "PAINS_C-205",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_5B(2)",
    "smarts": "[#6]~1~[#6](~[#7]~[#7]~[#6](~[#6](-[#1])-[#1])~[#6](-[#1])-[#1])~[#7]~[#16]~[#6]~1"
  },
  {
    "id": "PAINS_C-206",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "quinone_D(2)",
    "smarts": "[#6]-1(-[#6]=,:[#6]-[#6]=,:[#6]-[#6]-1=[!#6&!#1])=[!#6&!#1]"
  },
  {
    "id": "PAINS_C-207",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_furan_B(2)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:1:c(-[#1]):c(:c(:o:1)-[#6](-[#1])=[#6]-[#6]#[#7])-[#1]"
  },
  {
    "id": "PAINS_C-208",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_six_het_C(2)",
    "smarts": "[#8]=[#6]-1-[#6]:[#6]-[#6](-[#1])(-[#1])-[#7]-[#6]-1=[#6]-[#1]"
  },
  {
    "id": "PAINS_C-209",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_55_A(2)",
    "smarts": "[#6]:[#6]-[#7]:2:[#7]:[#6]:1-[#6](-[#1])(-[#1])-[#16;X2]-[#6](-[#1])(-[#1])-[#6]:1:[#6]:2-[#7](-[#1])-[#6](=[#8])-[#6](-[#1])=[#6]-[#1]"
  },
  {
    "id": "PAINS_C-210",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_65_C(2)",
    "smarts": "n:1:c(:n(:c:2:c:1:c:c:c:c:2)-[#6](-[#1])-[#1])-[#16]-[#6](-[#1])(-[#1])-[#6](=[#8])-[#7](-[#1])-[#7]=[#6](-[#1])-[#6](-[#1])=[#6]-[#1]"
  },
  {
    "id": "PAINS_C-211",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hydroquin_A(2)",
    "smarts": "c:1(:c:c(:c(:c:c:1)-[#8]-[#1])-[#6](=!@[#6]-[#7])-[#6]=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-212",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_F(2)",
    "smarts": "c:1(:c:c(:c(:c:c:1)-[#7](-[#1])-[#6](=[#8])-[#6]:[#6])-[#6](=[#8])-[#8]-[#1])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-213",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_I(2)",
    "smarts": "n2(-[#6](-[#1])-[#1])c-1c(-[#6]:[#6]-[#6]-1=[#8])cc2-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-214",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_amino_H(2)",
    "smarts": "[#6](-[#1])-[#7](-[#1])-c:1:c(:c(:c(:s:1)-[#6]-[#1])-[#6]-[#1])-[#6](=[#8])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-215",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_one_fives_C(2)",
    "smarts": "[#6]:[#6]-[#7;!R]=[#6]-2-[#6](=[!#6&!#1])-c:1:c:c:c:c:c:1-[#7]-2"
  },
  {
    "id": "PAINS_C-216",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_phenone_zone_A(2)",
    "smarts": "c:1:c:c:c:c:c:1-[#6](=[#8])-[#7](-[#1])-[#7]=[#6]-3-c:2:c:c:c:c:c:2-c:4:c:c:c:c:c-3:4"
  },
  {
    "id": "PAINS_C-217",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dyes7A(2)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])=[#6](-[#1])-[#6]=!@[#6](-[#1])-[#6](-[#1])=[#6]-[#6]=@[#7]-c:2:c:c:c:c:c:2"
  },
  {
    "id": "PAINS_C-218",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_pyridiniums_B(2)",
    "smarts": "[#6]:1:2:[!#1]:[#7+](:[!#1]:[#6;!H0,$([#6]-[*])](:[!#1]:1:[#6]:[#6]:[#6]:[#6]:2))~[#6]:[#6]"
  },
  {
    "id": "PAINS_C-219",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_D(2)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#7]=[#6](-[#6](-[#1])-[#1])-[#6](-[#1])(-[#16]-[#6])-[#6]-2=[#8]"
  },
  {
    "id": "PAINS_C-220",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_H(1)",
    "smarts": "c:1:c:c:c(:c:c:1-[#7](-[#1])-c2nc(c(-[#1])s2)-c:3:c:c:c(:c:c:3)-[#6](-[#1])(-[#6]-[#1])-[#6]-[#1])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-221",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_I(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#1])-[#6]=[#7]-[#7](-[#1])-c1nc(c(-[#1])s1)-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-222",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_5C(1)",
    "smarts": "[#6]:[#6]-[#7](-[#1])-[#6](=[#8])-c1c(snn1)-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-223",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_F(1)",
    "smarts": "[#8]=[#16](=[#8])(-[#6]:[#6])-[#7](-[#1])-c1nc(cs1)-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-224",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_J(1)",
    "smarts": "[#8]=[#16](=[#8])(-[#6]:[#6])-[#7](-[#1])-[#7](-[#1])-c1nc(cs1)-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-225",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_F(1)",
    "smarts": "s2c:1:n:c:n:c(:c:1c(c2-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#7]-[#7]=[#6]-c3ccco3"
  },
  {
    "id": "PAINS_C-226",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_E(1)",
    "smarts": "[#6](=[#8])-[#6](-[#1])=[#6](-[#8]-[#1])-[#6](-[#8]-[#1])=[#6](-[#1])-[#6](=[#8])-[#6]"
  },
  {
    "id": "PAINS_C-227",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_one_B(1)",
    "smarts": "c:2(:c:1-[#6](-[#6](-[#6](-c:1:c(:c(:c:2-[#1])-[#1])-[#1])(-[#1])-[#1])=[#8])=[#6](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-228",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_zone(1)",
    "smarts": "[#6]:[#6]-[#7](-[#1])-[#7]=[#6](-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#6](-[#1])-[#1])=[#7]-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-229",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_L(1)",
    "smarts": "[#6;X4]-[#16;X2]-[#6](=[#7]-[!#1]:[!#1]:[!#1]:[!#1])-[#7](-[#1])-[#7]=[#6]"
  },
  {
    "id": "PAINS_C-230",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_urea_ene(1)",
    "smarts": "[#6]-1(=[#7]-[#7](-[#6](-[#16]-1)=[#6](-[#1])-[#6]:[#6])-[#6]:[#6])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-231",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_amino_het_A(1)",
    "smarts": "c:1(:c(:c:2:c(:n:c:1-[#7](-[#1])-[#1]):c:c:c(:c:2-[#7](-[#1])-[#1])-[#6]#[#7])-[#6]#[#7])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-232",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "tetrazole_hzide(1)",
    "smarts": "[!#1]:1:[!#1]:[!#1]:[!#1](:[!#1]:[!#1]:1)-[#6](-[#1])=[#6](-[#1])-[#6](-[#7](-[#1])-[#7](-[#1])-c2nnnn2-[#6])=[#8]"
  },
  {
    "id": "PAINS_C-233",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_naphthol_A(1)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1:c(:c(:c(:c:2-[#1])-[#1])-[#6](=[#7]-[#6]:[#6])-[#6](-[#1])-[#1])-[#8]-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-234",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_anisole_A(1)",
    "smarts": "c:1(:c(:c:2:c(:c(:c:1-[#8]-[#6](-[#1])-[#1])-[#1]):c(:c(:c(:c:2-[#7](-[#1])-[#6](-[#1])(-[#1])-[#1])-[#1])-c:3:c(:c(:c(:c(:c:3-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1])-[#1])-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-235",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_665(1)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#16]-c3c(-[#7]-2)cc(s3)-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-236",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_L(1)",
    "smarts": "c:1:c:c:c-2:c(:c:1)-[#6](-[#6](-[#7]-2-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7]-4-[#6](-c:3:c:c:c:c:c:3-[#6]-4=[#8])=[#8])(-[#1])-[#1])(-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-237",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "colchicine_B(1)",
    "smarts": "c:1(:c:c:c(:c:c:1)-[#6]-,:3=,:[#6]-,:[#6](-,:c2cocc2-,:[#6](=,:[#6]-,:3)-[#8]-[#1])=[#8])-[#16]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-238",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_aminoacid_A(1)",
    "smarts": "[#6;X4]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#6](-[#1])(-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#16]-[#6](-[#1])(-[#1])-[#1])-[#6](=[#8])-[#8]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-239",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imidazole_amino_A(1)",
    "smarts": "n:1:c(:n(:c(:c:1-c:2:c:c:c:c:c:2)-c:3:c:c:c:c:c:3)-[#7]=!@[#6])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-240",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "phenol_sulfite_A(1)",
    "smarts": "[#6](-c:1:c:c:c(:c:c:1)-[#8]-[#1])(-c:2:c:c:c(:c:c:2)-[#8]-[#1])-[#8]-[#16](=[#8])=[#8]"
  },
  {
    "id": "PAINS_C-241",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_D(1)",
    "smarts": "c:2:c:c:1:n:c(:c(:n:c:1:c:c:2)-[#6](-[#1])(-[#1])-[#6](=[#8])-[#6]:[#6])-[#6](-[#1])(-[#1])-[#6](=[#8])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-242",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_anisole_B(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:2:c:c:c(-[#6](-[#1])-[#1])c:c:2"
  },
  {
    "id": "PAINS_C-243",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "tetrazole_A(1)",
    "smarts": "[#6](-[#1])(-[#1])-c1nnnn1-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#6](-[#1])(-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-244",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_G(1)",
    "smarts": "[#6]-2(=[#7]-c1c(c(nn1-[#6](-[#6]-2(-[#1])-[#1])=[#8])-[#7](-[#1])-[#1])-[#7](-[#1])-[#1])-[#6]"
  },
  {
    "id": "PAINS_C-245",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_trityl_A(1)",
    "smarts": "[#6](-[#6]:[#6])(-[#6]:[#6])(-[#6]:[#6])-[#16]-[#6]:[#6]-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-246",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_pyridine_OC(1)",
    "smarts": "[#8]=[#6](-c:1:c(:c(:n:c(:c:1-[#1])-[#8]-[#6](-[#1])(-[#1])-[#1])-[#8]-[#6](-[#1])(-[#1])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-247",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6_hydropyridone(1)",
    "smarts": "[#7]-1=[#6](-[#7](-[#6](-[#6](-[#6]-1(-[#1])-[#6]:[#6])(-[#1])-[#1])=[#8])-[#1])-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-248",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_stilbene(1)",
    "smarts": "[#6]-1(=[#6](-[#6](-[#6](-[#6](-[#6]-1(-[#1])-[#1])(-[#1])-[#6](=[#8])-[#6])(-[#1])-[#6](=[#8])-[#8]-[#1])(-[#1])-[#1])-[#6]:[#6])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-249",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_imidazole(1)",
    "smarts": "[#6](-[#1])(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[Cl])-[#1])-[#1])(-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[Cl])-[#1])-[#1])-[#8]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-c3nc(c(n3-[#6](-[#1])(-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-250",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_no_alk_A(1)",
    "smarts": "n:1:c(:c(:c(:c(:c:1-[#1])-[#7](-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-251",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6_imidate_B(1)",
    "smarts": "[#7](-[#1])(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#8]-[#1])-[#6]-,:2=,:[#6](-,:[#8]-,:[#6](-,:[#7]=,:[#7]-,:2)=[#7])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-252",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_B(1)",
    "smarts": "[#7](-[#1])(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-253",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "styrene_anil_A(1)",
    "smarts": "c:1:c:c-3:c(:c:c:1)-c:2:c:c:c(:c:c:2-[#6]-3=[#6](-[#1])-[#6])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-254",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_aminal_acid(1)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#7](-[#6](-[#8]-[#6]-2)(-[#6](=[#8])-[#8]-[#1])-[#6](-[#1])-[#1])-[#6](=[#8])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-255",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_no_alk_D(1)",
    "smarts": "n:1:c(:c(:c(:c(:c:1-[#7](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#6](-[#1])-[#1])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-256",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_C(1)",
    "smarts": "[#7](-[#1])(-c:1:c:c:c:c:c:1)-[#6](-[#6])(-[#6])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-257",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_anisole_C(1)",
    "smarts": "[#7](-[#1])(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#8]-[#6](-[#1])(-[#1])-[#1])-[#8]-[#6]-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])(-[#1])-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-258",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_465_misc(1)",
    "smarts": "c:1-2:c:c-3:c(:c:c:1-[#8]-[#6]-[#8]-2)-[#6]-[#6]-3"
  },
  {
    "id": "PAINS_C-259",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_G(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#6](=[#8])-[#8]-[#1])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-260",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_M(1)",
    "smarts": "c:1(:c:4:c(:n:c(:c:1-[#6](-[#1])(-[#1])-[#7]-3-c:2:c(:c(:c(:c(:c:2-[#6](-[#1])(-[#1])-[#6]-3(-[#1])-[#1])-[#1])-[#1])-[#1])-[#1])-[#1]):c(:c(:c(:c:4-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-261",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_H(1)",
    "smarts": "c:1:c(:c2:c(:c:c:1)c(c(n2-[#1])-[#6]:[#6])-[#6]:[#6])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-262",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_M(1)",
    "smarts": "[#6]:[#6]-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-c:1:c(:c(:c(:c(:c:1-[F,Cl,Br,I])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-263",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_K(1)",
    "smarts": "n:1:c3:c(:c:c2:c:1nc(s2)-[#7])sc(n3)-[#7]"
  },
  {
    "id": "PAINS_C-264",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_imine_A(1)",
    "smarts": "[#7]=[#6]-1-[#16]-[#6](=[#7])-[#7]=[#6]-1"
  },
  {
    "id": "PAINS_C-265",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_E(1)",
    "smarts": "c:1:c(:n:c:c:c:1)-[#6](=[#16])-[#7](-[#1])-c:2:c(:c:c:c:c:2)-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-266",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_676_B(1)",
    "smarts": "c:1-2:c(:c(:c(:c(:c:1-[#6](-c:3:c(-[#16]-[#6]-2(-[#1])-[#1]):c(:c(-[#1]):c(:c:3-[#1])-[#1])-[#1])-[#8]-[#6]:[#6])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-267",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_G(1)",
    "smarts": "[#6](-[#1])(-[#1])(-[#1])-c:1:c(:c(:c(:c(:n:1)-[#7](-[#1])-[#16](-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#8]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])(=[#8])=[#8])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-268",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_thiomorph_Z(1)",
    "smarts": "[#6](=[#8])(-[#7]-1-[#6]-[#6]-[#16]-[#6]-[#6]-1)-c:2:c(:c(:c(:c(:c:2-[#16]-[#6](-[#1])-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-269",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "naphth_ene_one_A(1)",
    "smarts": "c:1:c:c:3:c:2:c(:c:1)-[#6](-[#6]=[#6](-c:2:c:c:c:3)-[#8]-[#6](-[#1])-[#1])=[#8]"
  },
  {
    "id": "PAINS_C-270",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "naphth_ene_one_B(1)",
    "smarts": "c:1-3:c:2:c(:c(:c:c:1)-[#7]):c:c:c:c:2-[#6](-[#6]=[#6]-3-[#6](-[F])(-[F])-[F])=[#8]"
  },
  {
    "id": "PAINS_C-271",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "amino_acridine_A(1)",
    "smarts": "c:1:c:c:c:c:2:c:1:c:c:3:c(:n:2):n:c:4:c(:c:3-[#7]):c:c:c:c:4"
  },
  {
    "id": "PAINS_C-272",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_phenone_B(1)",
    "smarts": "c:1:c-3:c(:c:c:c:1)-[#6]-2=[#7]-[!#1]=[#6]-[#6]-[#6]-2-[#6]-3=[#8]"
  },
  {
    "id": "PAINS_C-273",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_acid_A(1)",
    "smarts": "c:1-3:c(:c(:c(:c(:c:1-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#6](=[#7]-[#7](-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#6](=[#8])-[#8]-[#1])-[#1])-[#1])-c:4:c-3:c(:c(:c(:c:4-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-274",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_H(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[#7](-[#1])-[#1])-[#1])-[#1])-[#16](=[#8])(=[#8])-[#7](-[#1])-c:2:n:n:c(:c(:c:2-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-275",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_565_indole(1)",
    "smarts": "c2(c(-[#1])n(-[#6](-[#1])-[#1])c:3:c(:c(:c:1n(c(c(c:1:c2:3)-[#1])-[#1])-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-276",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_J(1)",
    "smarts": "c1(c-2c(c(n1-[#6](-[#8])=[#8])-[#6](-[#1])-[#1])-[#16]-[#6](-[#1])(-[#1])-[#16]-2)-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-277",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrazole_amino_B(1)",
    "smarts": "s1ccnc1-c2c(n(nc2-[#1])-[#1])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-278",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_K(1)",
    "smarts": "c1(c(c(c(n1-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[#1])-[#1])-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-279",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_I(1)",
    "smarts": "c:1(:c(:c(:c(:o:1)-[#6])-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#6]:2:[#6](-[#1]):[#6](-[#1]):[#6](-[#1]):[#6](-[#1]):[#6]:2-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-280",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_amide_F(1)",
    "smarts": "[!#1]:[#6]-[#6](=[#16])-[#7](-[#1])-[#7](-[#1])-[#6]:[!#1]"
  },
  {
    "id": "PAINS_C-281",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_C(1)",
    "smarts": "[#6]-1(=[#8])-[#6](-[#6](-[#6]#[#7])=[#6](-[#1])-[#7])-[#6](-[#7])-[#6]=[#6]-1"
  },
  {
    "id": "PAINS_C-282",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_H(1)",
    "smarts": "c2(c-,:1n(-,:[#6](-,:[#6]=,:[#6]-,:[#7]-,:1)=[#8])nc2-c3cccn3)-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-283",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_imine_D(1)",
    "smarts": "[#8]=[#6]-1-[#6](=[#7]-[#7]-[#6]-[#6]-1)-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-284",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_misc_A(1)",
    "smarts": "c:2(:c:1:c:c:c:c:c:1:n:n:c:2)-[#6](-[#6]:[#6])-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-285",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_misc_C(1)",
    "smarts": "c:1:c:c-2:c(:c:c:1)-[#6]=[#6]-[#6](-[#7]-2-[#6](=[#8])-[#7](-[#1])-c:3:c:c(:c(:c:c:3)-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-286",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_E(1)",
    "smarts": "c:2:c:c:1:n:c(:c(:n:c:1:c:c:2)-c:3:c:c:c:c:c:3)-c:4:c:c:c:c:c:4-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-287",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_keto_beta_F(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#6](-[#8]-[#1])=[#6](-[#6](=[#8])-[#6](-[#1])-[#1])-[#6](-[#1])-[#6]#[#6]"
  },
  {
    "id": "PAINS_C-288",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_naphthimidazole(1)",
    "smarts": "c:1:c:4:c(:c:c2:c:1nc(n2-[#1])-[#6]-[#8]-[#6](=[#8])-c:3:c:c(:c:c(:c:3)-[#7](-[#1])-[#1])-[#7](-[#1])-[#1]):c:c:c:c:4"
  },
  {
    "id": "PAINS_C-289",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "naphth_ene_one_C(1)",
    "smarts": "c:2(:c:1:c:c:c:c-3:c:1:c(:c:c:2)-[#6]=[#6]-[#6]-3=[#7])-[#7]"
  },
  {
    "id": "PAINS_C-290",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "keto_phenone_C(1)",
    "smarts": "c:2(:c:1:c:c:c:c:c:1:c-3:c(:c:2)-[#6](-c:4:c:c:c:c:c-3:4)=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-291",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_C(1)",
    "smarts": "[#6]-,:2(-,:[#6]=,:[#7]-,:c:1:c:c(:c:c:c:1-,:[#8]-,:2)-[Cl])=[#8]"
  },
  {
    "id": "PAINS_C-292",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_est_cyano_A(1)",
    "smarts": "[#6]-1=[#6]-[#7](-[#6](-c:2:c-1:c:c:c:c:2)(-[#6]#[#7])-[#6](=[#16])-[#16])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-293",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_imidazole(1)",
    "smarts": "c2(nc:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])n2-[#6])-[#7](-[#1])-[#6](-[#7](-[#1])-c:3:c(:c:c:c:c:3-[#1])-[#1])=[#8]"
  },
  {
    "id": "PAINS_C-294",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_acid_J(1)",
    "smarts": "[#7](-[#1])(-[#6]:[#6])-c:1:c(-[#6](=[#8])-[#8]-[#1]):c:c:c(:n:1)-,:[#6]:[#6]"
  },
  {
    "id": "PAINS_C-295",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "colchicine_het(1)",
    "smarts": "c:1-,:3:c(:c:c:c:c:1)-,:[#16]-,:[#6](=[#7]-[#7]=[#6]-,:2-,:[#6]=,:[#6]-,:[#6]=,:[#6]-,:[#6]=,:[#6]-,:2)-,:[#7]-,:3-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-296",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_misc_D(1)",
    "smarts": "c:1-2:c(:c(:c(:c(:c:1-[#1])-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#6](=[#6](-[#6])-[#16]-[#6]-2(-[#1])-[#1])-[#6]"
  },
  {
    "id": "PAINS_C-297",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "indole_3yl_alk_B(1)",
    "smarts": "c:12:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])c(c(-[#6]:[#6])n2-!@[#6]:[#6])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-298",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OH_no_alk_A(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c:c:c(:c:c:1-[#8]-[#1])-[#16](=[#8])(=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-299",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_L(1)",
    "smarts": "s:1:c:c:c(:c:1-[#1])-c:2:c:s:c(:n:2)-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-300",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrazole_amino_A(1)",
    "smarts": "c1c(-[#7](-[#1])-[#1])nnc1-c2c(-[#6](-[#1])-[#1])oc(c2-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-301",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_N_5D(1)",
    "smarts": "n1nscc1-c2nc(no2)-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-302",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_indane(1)",
    "smarts": "c:1(:c:c-3:c(:c:c:1)-[#7]-[#6]-4-c:2:c:c:c:c:c:2-[#6]-[#6]-3-4)-[#6;X4]"
  },
  {
    "id": "PAINS_C-303",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_N(1)",
    "smarts": "c:1-2:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#6](=[#6](-[#1])-[#6]-3-[#6](-[#6]#[#7])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#7]-2-3)-[#1]"
  },
  {
    "id": "PAINS_C-304",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_666_C(1)",
    "smarts": "c:2-,:3:c(:c:c:1:c:c:c:c:c:1:c:2)-,:[#7](-[#6](-[#1])-[#1])-,:[#6](=[#8])-,:[#6](=,:[#7]-,:3)-[#6]:[#6]-[#7](-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-305",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_D(1)",
    "smarts": "[#6](-[#8]-[#1]):[#6]-[#6](=[#8])-[#6](-[#1])=[#6](-[#6])-[#6]"
  },
  {
    "id": "PAINS_C-306",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_indol(1)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1-[#1])-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1]):c(:c(-[#1]):n:2-[#1])-[#16](=[#8])=[#8]"
  },
  {
    "id": "PAINS_C-307",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_no_alk_indol_A(1)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1-[#1])-[#1])-[#7](-[#1])-[#1])-[#1]):c(:c(-[#1]):n:2-[#6](-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-308",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_G(1)",
    "smarts": "[#16;X2]-1-[#6]=[#6](-[#6]#[#7])-[#6](-[#6])(-[#6]=[#8])-[#6](=[#6]-1-[#7](-[#1])-[#1])-[$([#6]=[#8]),$([#6]#[#7])]"
  },
  {
    "id": "PAINS_C-309",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_dhp(1)",
    "smarts": "[#7]-2-[#6]=[#6](-[#6]=[#8])-[#6](-c:1:c:c:c(:c:c:1)-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#6]~3=,:[#6]-2~[#7]~[#6](~[#16])~[#7]~[#6]~3~[#7]"
  },
  {
    "id": "PAINS_C-310",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anthranil_amide_A(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#6](=[#8])-[#7](-[#1])-c:2:c(:c:c:c:c:2)-[#6](=[#8])-[#7](-[#1])-[#7](-[#1])-c:3:n:c:c:s:3"
  },
  {
    "id": "PAINS_C-311",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_anthran_Z(1)",
    "smarts": "c:1:c:2:c(:c:c:c:1):c(:c:3:c(:c:2):c:c:c:c:3)-[#6]=[#7]-[#7](-[#1])-c:4:c:c:c:c:c:4"
  },
  {
    "id": "PAINS_C-312",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_amide_A(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#6](-[#1])-[#7]-[#6](=[#8])-[#6](-[#7](-[#1])-[#6](-[#1])-[#1])=[#6](-[#1])-[#6](=[#8])-c:2:c:c:c(:c:c:2)-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-313",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_76_A(1)",
    "smarts": "s:1:c(:c(-[#1]):c(:c:1-[#6]-3=[#7]-c:2:c:c:c:c:c:2-[#6](=[#7]-[#7]-3-[#1])-c:4:c:c:n:c:c:4)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-314",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_N(1)",
    "smarts": "o:1:c(:c(-[#1]):c(:c:1-[#6](-[#1])(-[#1])-[#7](-[#1])-[#6](=[#16])-[#7](-[#6]-[#1])-[#6](-[#1])(-[#1])-c:2:c:c:c:c:c:2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-315",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_coum(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7](-[#6]-[#1])-[#6](-[#1])-[#6](-[#1])-[#6](-[#1])-[#7](-[#1])-[#6](=[#8])-[#6]-,:2=,:[#6](-,:[#8]-,:[#6](-,:[#6](=,:[#6]-,:2-[#6](-[#1])-[#1])-[#1])=[#8])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-316",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_amide_B(1)",
    "smarts": "c2-3:c:c:c:1:c:c:c:c:c:1:c2-[#6](-[#1])-[#6;X4]-[#7]-[#6]-3=[#6](-[#1])-[#6](=[#8])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-317",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_656c(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#6]-4=[#7]-[#7]:2:[#6](:[#7+]:c:3:c:2:c:c:c:c:3)-[#16]-[#6;X4]-4"
  },
  {
    "id": "PAINS_C-318",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_ene(1)",
    "smarts": "[#6]-2(=[#8])-[#6](=[#6](-[#6](-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])-[#7]=[#6](-c:1:c:c:c:c:c:1)-[#8]-2"
  },
  {
    "id": "PAINS_C-319",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_imide_A(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7]-2-[#6](=[#8])-[#6](=[#6](-[#1])-[#6]-2=[#8])-[#16]-c:3:c:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-320",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amidine_A(1)",
    "smarts": "[#7]-,:1(-[#1])-,:[#7]=,:[#6](-[#7]-[#1])-,:[#16]-,:[#6](=,:[#6]-,:1-,:[#6]:[#6])-,:[#6]:[#6]"
  },
  {
    "id": "PAINS_C-321",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_O(1)",
    "smarts": "c:1(:c(:c-3:c(:c(:c:1-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#6](-[#1])-c:2:c(:c(:c(:o:2)-[#6]-[#1])-[#1])-[#1])-[#1])-[#8]-[#6](-[#8]-3)(-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-322",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_O(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-c:2:c:c:c:c:c:2)-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-323",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_P(1)",
    "smarts": "[#8]=[#6]-!@n:1:c:c:c-,:2:c:1-,:[#7](-[#1])-,:[#6](=[#16])-,:[#7]-,:2-[#1]"
  },
  {
    "id": "PAINS_C-324",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_pyraz_misc(1)",
    "smarts": "[#6](-[F])(-[F])-[#6](=[#8])-[#7](-[#1])-c:1:c(-[#1]):n(-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#8]-[#6](-[#1])(-[#1])-[#6]:[#6]):n:c:1-[#1]"
  },
  {
    "id": "PAINS_C-325",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_C(1)",
    "smarts": "[#7]-2=[#7]-[#6]:1:[#7]:[!#6&!#1]:[#7]:[#6]:1-[#7]=[#7]-[#6]:[#6]-2"
  },
  {
    "id": "PAINS_C-326",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_D(1)",
    "smarts": "[#6]-2(-[#1])(-[#8]-[#1])-[#6]:1:[#7]:[!#6&!#1]:[#7]:[#6]:1-[#6](-[#1])(-[#8]-[#1])-[#6]=[#6]-2"
  },
  {
    "id": "PAINS_C-327",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_cyclopropane(1)",
    "smarts": "[#6]-1(-[#6](-[#1])(-[#1])-[#6]-1(-[#1])-[#1])(-[#6](=[#8])-[#7](-[#1])-c:2:c:c:c(:c:c:2)-[#8]-[#6](-[#1])(-[#1])-[#8])-[#16](=[#8])(=[#8])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-328",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_ene_one_B(1)",
    "smarts": "[#6]-1:[#6]-[#6](=[#8])-[#6]=[#6]-1-[#7]=[#6](-[#1])-[#7](-[#6;X4])-[#6;X4]"
  },
  {
    "id": "PAINS_C-329",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_D(1)",
    "smarts": "c:1:c:c(:c:c-,:2:c:1-,:[#6](=,:[#6](-[#1])-,:[#6](=[#8])-,:[#8]-,:2)-c:3:c:c:c:c:c:3)-[#8]-[#6](-[#1])(-[#1])-[#6]:[#8]:[#6]"
  },
  {
    "id": "PAINS_C-330",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_furan_A(1)",
    "smarts": "c:1:c(:o:c(:c:1-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#7]-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#8]-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#8]-c:2:c:c-3:c(:c:c:2)-[#8]-[#6](-[#8]-3)(-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-331",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_E(1)",
    "smarts": "[#7]-4(-c:1:c:c:c:c:c:1)-[#6](=[#8])-[#16]-[#6](-[#1])(-[#7](-[#1])-c:2:c:c:c:c:3:c:c:c:c:c:2:3)-[#6]-4=[#8]"
  },
  {
    "id": "PAINS_C-332",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_imine_A(1)",
    "smarts": "[#7]-3(-[#6](=[#8])-c:1:c:c:c:c:c:1)-[#6](=[#7]-c:2:c:c:c:c:c:2)-[#16]-[#6](-[#1])(-[#1])-[#6]-3=[#8]"
  },
  {
    "id": "PAINS_C-333",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "rhod_sat_F(1)",
    "smarts": "[#7]-2(-c:1:c:c:c:c:c:1)-[#6](=[#8])-[#16]-[#6](-[#1])(-[#1])-[#6]-2=[#16]"
  },
  {
    "id": "PAINS_C-334",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_imine_B(1)",
    "smarts": "[#7]-1(-[#6](-[#1])-[#1])-[#6](=[#16])-[#7](-[#6]:[#6])-[#6](=[#7]-[#6]:[#6])-[#6]-1=[#7]-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-335",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_5_imine_C(1)",
    "smarts": "[#16]-1-[#6](=[#7]-[#7]-[#1])-[#16]-[#6](=[#7]-[#6]:[#6])-[#6]-1=[#7]-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-336",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_five_het_N(1)",
    "smarts": "[#6]-2(=[#8])-[#6](=[#6](-[#1])-c:1:c(:c:c:c(:c:1)-[F,Cl,Br,I])-[#8]-[#6](-[#1])-[#1])-[#7]=[#6](-[#16]-[#6](-[#1])-[#1])-[#16]-2"
  },
  {
    "id": "PAINS_C-337",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_carbam_A(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#16]-[#6](=[#16])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-338",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_anilide_A(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])-[#1])-[#7](-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6]:[#6])-[#1])-[#7](-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-339",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_anilide_B(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#6](-[#1])-[#1])-[#1])-[Br])-[#1])-[#6](-[#1])-[#1])-[#7](-[#1])-[#6](=[#8])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-340",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "mannich_B(1)",
    "smarts": "c:1-2:c(:c:c:c(:c:1-[#8]-[#6](-[#1])(-[#1])-[#7](-[#6]:[#6]-[#8]-[#6](-[#1])-[#1])-[#6]-2(-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-341",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "mannich_catechol_A(1)",
    "smarts": "c:1-2:c(:c(:c(:c(:c:1-[#8]-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6]-2(-[#1])-[#1])-[#1])-[#8])-[#8])-[#1]"
  },
  {
    "id": "PAINS_C-342",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_D(1)",
    "smarts": "[#7](-[#1])(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#6](-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-343",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_I(1)",
    "smarts": "n:1:2:c:c:c(:c:c:1:c:c(:c:2-[#6](=[#8])-[#6]:[#6])-[#6]:[#6])-[#6](~[#8])~[#8]"
  },
  {
    "id": "PAINS_C-344",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_urea_A(1)",
    "smarts": "c:1(:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#6](=[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1])-[#6](-[#6;X4])(-[#6;X4])-[#7](-[#1])-[#6](=[#8])-[#7](-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#6](-[#1])(-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-345",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imidazole_C(1)",
    "smarts": "[#6]-3(-[#1])(-n:1:c(:n:c(:c:1-[#1])-[#1])-[#1])-c:2:c(:c(:c(:c(:c:2-[#1])-[Br])-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-c:4:c-3:c(:c(:c(:c:4-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-346",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "styrene_imidazole_A(1)",
    "smarts": "[#6](=[#6](-[#1])-[#6](-[#1])(-[#1])-n:1:c(:n:c(:c:1-[#1])-[#1])-[#1])(-[#6]:[#6])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-347",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_M(1)",
    "smarts": "c:1(:n:c(:c(-[#1]):s:1)-c:2:c:c:n:c:c:2)-[#7](-[#1])-[#6]:[#6]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-348",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_pyrrole_thiaz(1)",
    "smarts": "c:1(:n:c(:c(-[#1]):s:1)-c:2:c:c:c:c:c:2)-[#6](-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7]-[#6](-[#1])(-[#1])-c:3:c:c:c:n:3-[#1]"
  },
  {
    "id": "PAINS_C-349",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_L(1)",
    "smarts": "n:1(-[#1]):c(:c(-[#6](-[#1])-[#1]):c(:c:1-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])-[#1])-[#6](=[#8])-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-350",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_65_D(1)",
    "smarts": "c:2(:n:c:1:c(:c(:c:c(:c:1-[#1])-[F,Cl,Br,I])-[#1]):n:2-[#1])-[#16]-[#6](-[#1])(-[#1])-[#6](=[#8])-[#7](-[#1])-[#6]:[#6]"
  },
  {
    "id": "PAINS_C-351",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_misc_E(1)",
    "smarts": "c:1(:c(:c-2:c(:c(:c:1-[#8]-[#6](-[#1])-[#1])-[#1])-[#6]=[#6]-[#6](-[#1])-[#16]-2)-[#1])-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-352",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_cyano_A(1)",
    "smarts": "[#7]-1(-[#1])-[#6](=[#16])-[#6](-[#1])(-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#6](=[#6]-1-[#6]:[#6])-[#1]"
  },
  {
    "id": "PAINS_C-353",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_amino_het_B(1)",
    "smarts": "n:1:c(:c(:c(:c(:c:1-[#16;X2]-c:2:c:c:c:c:c:2-[#7](-[#1])-[#1])-[#6]#[#7])-c:3:c:c:c:c:c:3)-[#6]#[#7])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-354",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyano_pyridone_G(1)",
    "smarts": "[#7]-,:2(-c:1:c:c:c(:c:c:1)-[#8]-[#6](-[#1])-[#1])-,:[#6](=[#8])-,:[#6](=,:[#6]-,:[#6](=,:[#7]-,:2)-n:3:c:n:c:c:3)-[#6]#[#7]"
  },
  {
    "id": "PAINS_C-355",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_J(1)",
    "smarts": "o:1:c(:c:c:2:c:1:c(:c(:c(:c:2-[#1])-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#6](~[#8])~[#8]"
  },
  {
    "id": "PAINS_C-356",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_yne_A(1)",
    "smarts": "[#6]#[#6]-[#6](=[#8])-[#6]#[#6]"
  },
  {
    "id": "PAINS_C-357",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OH_no_alk_B(1)",
    "smarts": "c:2(:c:1:c(:c(:c(:c(:c:1:c(:c(:c:2-[#8]-[#1])-[#6]=[#8])-[#1])-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-358",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_acyl_misc_A(1)",
    "smarts": "c:1(:c(:c(:[c;!H0,$(c-[#6;!H0;!H1])](:o:1))-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#7]=[#6;!H0,$([#6]-[#6;!H0!H1])]-c:2:c:c:c:c(:c:2)-[*]-[*]-[*]-c:3:c:c:c:o:3"
  },
  {
    "id": "PAINS_C-359",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiophene_F(1)",
    "smarts": "[#16](=[#8])(=[#8])-[#7](-[#1])-c:1:c(:c(:c(:s:1)-[#6]-[#1])-[#6]-[#1])-[#6](=[#8])-[#7]-[#1]"
  },
  {
    "id": "PAINS_C-360",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_E(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#8]-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-361",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_OC_alk_F(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-[#6](-[#1])(-[#6]=[#8])-[#16]"
  },
  {
    "id": "PAINS_C-362",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_K(1)",
    "smarts": "n1nnnc2cccc12"
  },
  {
    "id": "PAINS_C-363",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_L(1)",
    "smarts": "c:1-,:2:c(-[#1]):s:c(:c:1-,:[#6](=[#8])-,:[#7]-,:[#7]=,:[#6]-,:2-[#7](-[#1])-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-364",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_E(1)",
    "smarts": "c:1-,:3:c(:c:2:c(:c:c:1-[Br]):o:c:c:2)-,:[#6](=,:[#6]-,:[#6](=[#8])-,:[#8]-,:3)-[#1]"
  },
  {
    "id": "PAINS_C-365",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_F(1)",
    "smarts": "c:1-,:3:c(:c:c:c:c:1)-,:[#6](=,:[#6](-[#6](=[#8])-[#7](-[#1])-c:2:n:o:c:c:2-[Br])-,:[#6](=[#8])-,:[#8]-,:3)-[#1]"
  },
  {
    "id": "PAINS_C-366",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_G(1)",
    "smarts": "c:1-,:2:c(:c:c(:c:c:1-[F,Cl,Br,I])-[F,Cl,Br,I])-,:[#6](=,:[#6](-[#6](=[#8])-[#7](-[#1])-[#1])-,:[#6](=[#7]-[#1])-,:[#8]-,:2)-[#1]"
  },
  {
    "id": "PAINS_C-367",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "coumarin_H(1)",
    "smarts": "c:1-,:3:c(:c:c:c:c:1)-,:[#6](=,:[#6](-[#6](=[#8])-[#7](-[#1])-c:2:n:c(:c:s:2)-[#6]:[#16]:[#6]-[#1])-,:[#6](=[#8])-,:[#8]-,:3)-[#1]"
  },
  {
    "id": "PAINS_C-368",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_thio_67_A(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#16;X2]-c:2:n:n:c:1-[#6]:[#6]-[#7]=[#6]-[#8]-c:1:n:2"
  },
  {
    "id": "PAINS_C-369",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_I(1)",
    "smarts": "[#16](=[#8])(=[#8])(-c:1:c:n(-[#6](-[#1])-[#1]):c:n:1)-[#7](-[#1])-c:2:c:n(:n:c:2)-[#6](-[#1])(-[#1])-[#6]:[#6]-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-370",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_65_mannich(1)",
    "smarts": "c:1-2:c(:c(:c(:c(:c:1-[#8]-[#6](-[#1])(-[#1])-[#8]-2)-[#6](-[#1])(-[#1])-[#7]-3-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#6]:[#6]-3)-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-371",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_alk_A(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-[#6]:[#6]-[#6](-[#1])(-[#1])-[#7](-[#1])-c:2:c(:c(:c:1:n(:c(:n:c:1:c:2-[#1])-[#1])-[#6]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-372",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_inium(1)",
    "smarts": "[#7]-,:4(-c:1:c:c:c:c:c:1)-,:[#6](=,:[#7+](-c:2:c:c:c:c:c:2)-,:[#6](=[#7]-c:3:c:c:c:c:c:3)-,:[#7]-,:4)-[#1]"
  },
  {
    "id": "PAINS_C-373",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_di_alk_P(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#7](-[#6](-[#1])-[#1])-c:2:c:c:c:1:s:c(:n:c:1:c:2)-[#16]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-374",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_Q(1)",
    "smarts": "c:1:2:c(:c(:c(:c(:c:1:c(:c(-[#1]):c(:c:2-[#1])-[#1])-[#6](-[#6](-[#1])-[#1])=[#7]-[#7](-[#1])-[#6](=[#16])-[#7](-[#1])-[#6]:[#6]:[#6])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-375",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_pyridine_A(1)",
    "smarts": "[#6]:1(:[#7]:[#6](:[#7]:[!#1]:[#7]:1)-c:2:c(:c(:c(:o:2)-[#1])-[#1])-[#1])-[#16]-[#6;X4]"
  },
  {
    "id": "PAINS_C-376",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "melamine_B(1)",
    "smarts": "n:1:c(:n:c(:n:c:1-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#7](-[#6]-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-377",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_phthal_thio_N(1)",
    "smarts": "c:1(:n:s:c(:n:1)-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](-[#1])(-[#1])-[#7]-[#6](=[#8])-c:2:c:c:c:c:c:2-[#6](=[#8])-[#8]-[#1])-c:3:c:c:c:c:c:3"
  },
  {
    "id": "PAINS_C-378",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_acyl_misc_B(1)",
    "smarts": "n:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#7]=[#6](-[#1])-c:2:c:c:c:c:c:2-[#8]-[#6](-[#1])(-[#1])-[#6](=[#8])-[#8]-[#1]"
  },
  {
    "id": "PAINS_C-379",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "tert_butyl_B(1)",
    "smarts": "[#6](-[#1])(-[#1])(-[#1])-[#6](-[#6](-[#1])(-[#1])-[#1])(-[#6](-[#1])(-[#1])-[#1])-c:1:c(:c(:c(:c(:c:1-[#8]-[#1])-[#6](-[#6](-[#1])(-[#1])-[#1])(-[#6](-[#1])(-[#1])-[#1])-[#6](-[#1])(-[#1])-[#1])-[#1])-[#6](-[#1])(-[#1])-c:2:c:c:c(:c(:c:2-[#1])-[#1])-[#8]-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-380",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "diazox_E(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(-[#7](-[#1])-[#1]):c(:c(-[#1]):c:2:n:o:n:c:1:2)-[#1]"
  },
  {
    "id": "PAINS_C-381",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_NH_no_alk_B(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:c(:c:1-[#7](-[#1])-[#16](=[#8])=[#8])-[#1])-[#7](-[#1])-[#6](-[#1])-[#1])-[F,Cl,Br,I])-[#1]"
  },
  {
    "id": "PAINS_C-382",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_no_alk_A(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:c(:c:1-[#7]=[#6]-2-[#6](=[#6]~[#6]~[#6]=[#6]-2)-[#1])-[#1])-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-383",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_no_alk_B(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:c(:c:1-n:2:c:c:c:c:2)-[#1])-[#6](-[#1])-[#1])-[#6](-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-384",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_ene_amine_A(1)",
    "smarts": "[#16]=[#6]-[#6](-[#6](-[#1])-[#1])=[#6](-[#6](-[#1])-[#1])-[#7](-[#6](-[#1])-[#1])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-385",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_55_B(1)",
    "smarts": "[#6]-1:[#6]-[#8]-[#6]-2-[#6](-[#1])(-[#1])-[#6](=[#8])-[#8]-[#6]-1-2"
  },
  {
    "id": "PAINS_C-386",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "cyanamide_A(1)",
    "smarts": "[#8]-[#6](=[#8])-[#6](-[#1])(-[#1])-[#16;X2]-[#6](=[#7]-[#6]#[#7])-[#7](-[#1])-c:1:c:c:c:c:c:1"
  },
  {
    "id": "PAINS_C-387",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_one_A(1)",
    "smarts": "[#8]=[#6]-[#6]-1=[#6](-[#16]-[#6](=[#6](-[#1])-[#6])-[#16]-1)-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-388",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_six_het_D(1)",
    "smarts": "[#8]=[#6]-1-[#7]-[#7]-[#6](=[#7]-[#6]-1=[#6]-[#1])-[!#1]:[!#1]"
  },
  {
    "id": "PAINS_C-389",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_E(1)",
    "smarts": "[#8]=[#6]-[#6](-[#1])=[#6](-[#6]#[#7])-[#6]"
  },
  {
    "id": "PAINS_C-390",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_F(1)",
    "smarts": "[#8](-[#1])-[#6](=[#8])-c:1:c(:c(:c(:c(:c:1-[#8]-[#1])-[#1])-c:2:c(-[#1]):c(:c(:o:2)-[#6](-[#1])=[#6](-[#6]#[#7])-c:3:n:c:c:n:3)-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-391",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_furan_C(1)",
    "smarts": "c:1:c(:c:c:c:c:1)-[#7](-c:2:c:c:c:c:c:2)-[#7]=[#6](-[#1])-[#6]:3:[#6](:[#6](:[#6](:[!#1]:3)-c:4:c:c:c:c(:c:4)-[#6](=[#8])-[#8]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-392",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "anil_no_alk_C(1)",
    "smarts": "[#7](-[#1])(-[#1])-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-c:2:c(-[#1]):c(:c(-[#6](-[#1])-[#1]):o:2)-[#6]=[#8])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-393",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_acid_D(1)",
    "smarts": "[#8](-[#1])-[#6](=[#8])-c:1:c:c:c(:c:c:1)-[#7]-[#7]=[#6](-[#1])-[#6]:2:[#6](:[#6](:[#6](:[!#1]:2)-c:3:c:c:c:c:c:3)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-394",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "hzone_furan_E(1)",
    "smarts": "[#8](-[#1])-[#6](=[#8])-c:1:c:c:c:c(:c:1)-[#6]:[!#1]:[#6]-[#6]=[#7]-[#7](-[#1])-[#6](=[#8])-[#6](-[#1])(-[#1])-[#8]"
  },
  {
    "id": "PAINS_C-395",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_6_pyridone_NH2(1)",
    "smarts": "[#8](-[#1])-[#6]:1:[#6](:[#6]:[!#1]:[#6](:[#7]:1)-[#7](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6](=[#8])-[#8]"
  },
  {
    "id": "PAINS_C-396",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "imine_one_fives_D(1)",
    "smarts": "[#6]-1(=[!#6&!#1])-[#6](-[#7]=[#6]-[#16]-1)=[#8]"
  },
  {
    "id": "PAINS_C-397",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_M(1)",
    "smarts": "n2(-c:1:c:c:c:c:c:1)c(c(-[#1])c(c2-[#6]=[#7]-[#8]-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-398",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_N(1)",
    "smarts": "n2(-[#6](-[#1])-c:1:c(:c(:c:c(:c:1-[#1])-[#1])-[#1])-[#1])c(c(-[#1])c(c2-[#6]-[#1])-[#1])-[#6]-[#1]"
  },
  {
    "id": "PAINS_C-399",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "pyrrole_O(1)",
    "smarts": "n1(-[#6](-[#1])-[#1])c(c(-[#6](=[#8])-[#6])c(c1-[#6]:[#6])-[#6])-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-400",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_cyano_G(1)",
    "smarts": "n1(-[#6])c(c(-[#1])c(c1-[#6](-[#1])=[#6](-[#6]#[#7])-c:2:n:c:c:s:2)-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-401",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "sulfonamide_J(1)",
    "smarts": "n3(-c:1:c:c:c:c:c:1-[#7](-[#1])-[#16](=[#8])(=[#8])-c:2:c:c:c:s:2)c(c(-[#1])c(c3-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-402",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "misc_pyrrole_benz(1)",
    "smarts": "n2(-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#6](=[#8])-[#7](-[#1])-[#6](-[#1])(-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#8]-[#6]:[#6])c(c(-[#1])c(c2-[#1])-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-403",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thio_urea_R(1)",
    "smarts": "c:1(:c:c:c:c:c:1)-[#7](-[#1])-[#6](=[#16])-[#7]-[#7](-[#1])-[#6](-[#1])=[#6](-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-404",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "ene_one_one_B(1)",
    "smarts": "[#6]-1(-[#6](=[#8])-[#6](-[#1])(-[#1])-[#6]-[#6](-[#1])(-[#1])-[#6]-1=[#8])=[#6](-[#7]-[#1])-[#6]=[#8]"
  },
  {
    "id": "PAINS_C-405",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "dhp_amino_CN_H(1)",
    "smarts": "[#7](-[#1])(-[#1])-[#6]-1=[#6](-[#6]#[#7])-[#6](-[#1])(-[#6]:[#6])-[#16]-[#6;X4]-[#16]-1"
  },
  {
    "id": "PAINS_C-406",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_66_anisole(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#1])-[#1])-[#7](-[#1])-c:2:c:c:n:c:3:c(:c:c:c(:c:2:3)-[#8]-[#6](-[#1])-[#1])-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-407",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "thiazole_amine_N(1)",
    "smarts": "[#6](-[#1])(-[#1])-[#8]-c:1:c(:c(:c(:c(:c:1-[#1])-[#1])-[#8]-[#6](-[#1])-[#1])-[#1])-[#7](-[#1])-c:2:n:c(:c:s:2)-c:3:c:c:c(:c:c:3)-[#8]-[#6](-[#1])-[#1]"
  },
  {
    "id": "PAINS_C-408",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_pyridiniums_C(1)",
    "smarts": "[#6]~1~3~[#7](-[#6]:[#6])~[#6]~[#6]~[#6]~[#6]~1~[#6]~2~[#7]~[#6]~[#6]~[#6]~[#7+]~2~[#7]~3"
  },
  {
    "id": "PAINS_C-409",
    "set": "PAINS",
    "subset": "PAINS_C",
    "name": "het_5_E(1)",
    "smarts": "[#7]-3(-c:2:c:1:c:c:c:c:c:1:c:c:c:2)-[#7]=[#6](-[#6](-[#1])-[#1])-[#6](-[#1])(-[#1])-[#6]-3=[#8]"
  },
  {
    "id": "BRENK-001",
    "set": "BRENK",
    "subset": "BRENK",
    "name": ">_2_ester_groups",
    "smarts": "C(=O)O[C,H1].C(=O)O[C,H1].C(=O)O[C,H1]"
  },
  {
    "id": "BRENK-002",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "2-halo_pyridine",
    "smarts": "n1c([F,Cl,Br,I])cccc1"
  },
  {
    "id": "BRENK-003",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "acid_halide",
    "smarts": "C(=O)[Cl,Br,I,F]"
  },
  {
    "id": "BRENK-004",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "acyclic_C=C-O",
    "smarts": "C=[C!r]O"
  },
  {
    "id": "BRENK-005",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "acyl_cyanide",
    "smarts": "N#CC(=O)"
  },
  {
    "id": "BRENK-006",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "acyl_hydrazine",
    "smarts": "C(=O)N[NH2]"
  },
  {
    "id": "BRENK-007",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "aldehyde",
    "smarts": "[CH1](=O)"
  },
  {
    "id": "BRENK-008",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Aliphatic_long_chain",
    "smarts": "[R0;D2][R0;D2][R0;D2][R0;D2]"
  },
  {
    "id": "BRENK-009",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "alkyl_halide",
    "smarts": "[CX4][Cl,Br,I]"
  },
  {
    "id": "BRENK-010",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "amidotetrazole",
    "smarts": "c1nnnn1C=O"
  },
  {
    "id": "BRENK-011",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "aniline",
    "smarts": "c1cc([NH2])ccc1"
  },
  {
    "id": "BRENK-012",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "azepane",
    "smarts": "[CH2R2]1N[CH2R2][CH2R2][CH2R2][CH2R2][CH2R2]1"
  },
  {
    "id": "BRENK-013",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Azido_group",
    "smarts": "N=[N+]=[N-]"
  },
  {
    "id": "BRENK-014",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Azo_group",
    "smarts": "N#N"
  },
  {
    "id": "BRENK-015",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "azocane",
    "smarts": "[CH2R2]1N[CH2R2][CH2R2][CH2R2][CH2R2][CH2R2][CH2R2]1"
  },
  {
    "id": "BRENK-016",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "benzidine",
    "smarts": "[cR2]1[cR2][cR2]([Nv3X3,Nv4X4])[cR2][cR2][cR2]1[cR2]2[cR2][cR2][cR2]([Nv3X3,Nv4X4])[cR2][cR2]2"
  },
  {
    "id": "BRENK-017",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "beta-keto/anhydride",
    "smarts": "[C,c](=O)[CX4,CR0X3,O][C,c](=O)"
  },
  {
    "id": "BRENK-018",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "biotin_analogue",
    "smarts": "C12C(NC(N1)=O)CSC2"
  },
  {
    "id": "BRENK-019",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Carbo_cation/anion",
    "smarts": "[C+,c+,C-,c-]"
  },
  {
    "id": "BRENK-020",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "catechol",
    "smarts": "c1c([OH])c([OH,NH2,NH])ccc1"
  },
  {
    "id": "BRENK-021",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "charged_oxygen_or_sulfur_atoms",
    "smarts": "[O+,o+,S+,s+]"
  },
  {
    "id": "BRENK-022",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "chinone_1",
    "smarts": "C1(=[O,N])C=CC(=[O,N])C=C1"
  },
  {
    "id": "BRENK-023",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "chinone_2",
    "smarts": "C1(=[O,N])C(=[O,N])C=CC=C1"
  },
  {
    "id": "BRENK-024",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "conjugated_nitrile_group",
    "smarts": "C=[C!r]C#N"
  },
  {
    "id": "BRENK-025",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "crown_ether",
    "smarts": "[OR2,NR2]@[CR2]@[CR2]@[OR2,NR2]@[CR2]@[CR2]@[OR2,NR2]"
  },
  {
    "id": "BRENK-026",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cumarine",
    "smarts": "c1ccc2c(c1)ccc(=O)o2"
  },
  {
    "id": "BRENK-027",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cyanamide",
    "smarts": "N[CH2]C#N"
  },
  {
    "id": "BRENK-028",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cyanate_/aminonitrile_/thiocyanate",
    "smarts": "[N,O,S]C#N"
  },
  {
    "id": "BRENK-029",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cyanohydrins",
    "smarts": "N#CC[OH]"
  },
  {
    "id": "BRENK-030",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cycloheptane_1",
    "smarts": "[CR2]1[CR2][CR2][CR2][CR2][CR2][CR2]1"
  },
  {
    "id": "BRENK-031",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cycloheptane_2",
    "smarts": "[CR2]1[CR2][CR2]cc[CR2][CR2]1"
  },
  {
    "id": "BRENK-032",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cyclooctane_1",
    "smarts": "[CR2]1[CR2][CR2][CR2][CR2][CR2][CR2][CR2]1"
  },
  {
    "id": "BRENK-033",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "cyclooctane_2",
    "smarts": "[CR2]1[CR2][CR2]cc[CR2][CR2][CR2]1"
  },
  {
    "id": "BRENK-034",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "diaminobenzene_1",
    "smarts": "[cR2]1[cR2]c([N+0X3R0,nX3R0])c([N+0X3R0,nX3R0])[cR2][cR2]1"
  },
  {
    "id": "BRENK-035",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "diaminobenzene_2",
    "smarts": "[cR2]1[cR2]c([N+0X3R0,nX3R0])[cR2]c([N+0X3R0,nX3R0])[cR2]1"
  },
  {
    "id": "BRENK-036",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "diaminobenzene_3",
    "smarts": "[cR2]1[cR2]c([N+0X3R0,nX3R0])[cR2][cR2]c1([N+0X3R0,nX3R0])"
  },
  {
    "id": "BRENK-037",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "diazo_group",
    "smarts": "[N!R]=[N!R]"
  },
  {
    "id": "BRENK-038",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "diketo_group",
    "smarts": "[C,c](=O)[C,c](=O)"
  },
  {
    "id": "BRENK-039",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "disulphide",
    "smarts": "SS"
  },
  {
    "id": "BRENK-040",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "enamine",
    "smarts": "[CX2R0][NX3R0]"
  },
  {
    "id": "BRENK-041",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "ester_of_HOBT",
    "smarts": "C(=O)Onnn"
  },
  {
    "id": "BRENK-042",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "four_member_lactones",
    "smarts": "C1(=O)OCC1"
  },
  {
    "id": "BRENK-043",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "halogenated_ring_1",
    "smarts": "c1cc([Cl,Br,I,F])cc([Cl,Br,I,F])c1[Cl,Br,I,F]"
  },
  {
    "id": "BRENK-044",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "halogenated_ring_2",
    "smarts": "c1ccc([Cl,Br,I,F])c([Cl,Br,I,F])c1[Cl,Br,I,F]"
  },
  {
    "id": "BRENK-045",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "heavy_metal",
    "smarts": "[Hg,Fe,As,Sb,Zn,Se,se,Te,B,Si]"
  },
  {
    "id": "BRENK-046",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "het-C-het_not_in_ring",
    "smarts": "[NX3R0,NX4R0,OR0,SX2R0][CX4][NX3R0,NX4R0,OR0,SX2R0]"
  },
  {
    "id": "BRENK-047",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "hydantoin",
    "smarts": "C1NC(=O)NC(=O)1"
  },
  {
    "id": "BRENK-048",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "hydrazine",
    "smarts": "N[NH2]"
  },
  {
    "id": "BRENK-049",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "hydroquinone",
    "smarts": "[OH]c1ccc([OH,NH2,NH])cc1"
  },
  {
    "id": "BRENK-050",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "hydroxamic_acid",
    "smarts": "C(=O)N[OH]"
  },
  {
    "id": "BRENK-051",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "imine_1",
    "smarts": "C=[N!R]"
  },
  {
    "id": "BRENK-052",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "imine_2",
    "smarts": "N=[CR0][N,n,O,S]"
  },
  {
    "id": "BRENK-053",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "iodine",
    "smarts": "I"
  },
  {
    "id": "BRENK-054",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "isocyanate",
    "smarts": "N=C=O"
  },
  {
    "id": "BRENK-055",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "isolated_alkene",
    "smarts": "[$([CH2]),$([CH][CX4]),$(C([CX4])[CX4])]=[$([CH2]),$([CH][CX4]),$(C([CX4])[CX4])]"
  },
  {
    "id": "BRENK-056",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "ketene",
    "smarts": "C=C=O"
  },
  {
    "id": "BRENK-057",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "methylidene-1,3-dithiole",
    "smarts": "S1C=CSC1=S"
  },
  {
    "id": "BRENK-058",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Michael_acceptor_1",
    "smarts": "C=!@CC=[O,S]"
  },
  {
    "id": "BRENK-059",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Michael_acceptor_2",
    "smarts": "[$([CH]),$(CC)]#CC(=O)[C,c]"
  },
  {
    "id": "BRENK-060",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Michael_acceptor_3",
    "smarts": "[$([CH]),$(CC)]#CS(=O)(=O)[C,c]"
  },
  {
    "id": "BRENK-061",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Michael_acceptor_4",
    "smarts": "C=C(C=O)C=O"
  },
  {
    "id": "BRENK-062",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Michael_acceptor_5",
    "smarts": "[$([CH]),$(CC)]#CC(=O)O[C,c]"
  },
  {
    "id": "BRENK-063",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N_oxide",
    "smarts": "[NX2,nX3][OX1]"
  },
  {
    "id": "BRENK-064",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N-acyl-2-amino-5-mercapto-1,3,4-_thiadiazole",
    "smarts": "s1c(S)nnc1NC=O"
  },
  {
    "id": "BRENK-065",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N-C-halo",
    "smarts": "NC[F,Cl,Br,I]"
  },
  {
    "id": "BRENK-066",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N-halo",
    "smarts": "[NX3,NX4][F,Cl,Br,I]"
  },
  {
    "id": "BRENK-067",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N-hydroxyl_pyridine",
    "smarts": "n[OH]"
  },
  {
    "id": "BRENK-068",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "nitro_group",
    "smarts": "[N+](=O)[O-]"
  },
  {
    "id": "BRENK-069",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "N-nitroso",
    "smarts": "[#7]-N=O"
  },
  {
    "id": "BRENK-070",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "oxime_1",
    "smarts": "[C,c]=N[OH]"
  },
  {
    "id": "BRENK-071",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "oxime_2",
    "smarts": "[C,c]=NOC=O"
  },
  {
    "id": "BRENK-072",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Oxygen-nitrogen_single_bond",
    "smarts": "[OR0,NR0][OR0,NR0]"
  },
  {
    "id": "BRENK-073",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Perfluorinated_chain",
    "smarts": "[CX4](F)(F)[CX4](F)F"
  },
  {
    "id": "BRENK-074",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "peroxide",
    "smarts": "OO"
  },
  {
    "id": "BRENK-075",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "phenol_ester",
    "smarts": "c1ccccc1OC(=O)[#6]"
  },
  {
    "id": "BRENK-076",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "phenyl_carbonate",
    "smarts": "c1ccccc1OC(=O)O"
  },
  {
    "id": "BRENK-077",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "phosphor",
    "smarts": "P"
  },
  {
    "id": "BRENK-078",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "phthalimide",
    "smarts": "[cR,CR]~C(=O)NC(=O)~[cR,CR]"
  },
  {
    "id": "BRENK-079",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Polycyclic_aromatic_hydrocarbon_1",
    "smarts": "a1aa2a3a(a1)A=AA=A3=AA=A2"
  },
  {
    "id": "BRENK-080",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Polycyclic_aromatic_hydrocarbon_2",
    "smarts": "a21aa3a(aa1aaaa2)aaaa3"
  },
  {
    "id": "BRENK-081",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Polycyclic_aromatic_hydrocarbon_3",
    "smarts": "a31a(a2a(aa1)aaaa2)aaaa3"
  },
  {
    "id": "BRENK-082",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "polyene",
    "smarts": "[CR0]=[CR0][CR0]=[CR0]"
  },
  {
    "id": "BRENK-083",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "quaternary_nitrogen_1",
    "smarts": "[s,S,c,C,n,N,o,O]~[nX3+,NX3+](~[s,S,c,C,n,N])~[s,S,c,C,n,N]"
  },
  {
    "id": "BRENK-084",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "quaternary_nitrogen_2",
    "smarts": "[s,S,c,C,n,N,o,O]~[n+,N+](~[s,S,c,C,n,N,o,O])(~[s,S,c,C,n,N,o,O])~[s,S,c,C,n,N,o,O]"
  },
  {
    "id": "BRENK-085",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "quaternary_nitrogen_3",
    "smarts": "[*]=[N+]=[*]"
  },
  {
    "id": "BRENK-086",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "saponine_derivative",
    "smarts": "O1CCCCC1OC2CCC3CCCCC3C2"
  },
  {
    "id": "BRENK-087",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "silicon_halogen",
    "smarts": "[Si][F,Cl,Br,I]"
  },
  {
    "id": "BRENK-088",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "stilbene",
    "smarts": "c1ccccc1C=Cc2ccccc2"
  },
  {
    "id": "BRENK-089",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "sulfinic_acid",
    "smarts": "[SX3](=O)[O-,OH]"
  },
  {
    "id": "BRENK-090",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Sulfonic_acid_1",
    "smarts": "[C,c]S(=O)(=O)O[C,c]"
  },
  {
    "id": "BRENK-091",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Sulfonic_acid_2",
    "smarts": "S(=O)(=O)[O-,OH]"
  },
  {
    "id": "BRENK-092",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "sulfonyl_cyanide",
    "smarts": "S(=O)(=O)C#N"
  },
  {
    "id": "BRENK-093",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "sulfur_oxygen_single_bond",
    "smarts": "[SX2]O"
  },
  {
    "id": "BRENK-094",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "sulphate",
    "smarts": "OS(=O)(=O)[O-]"
  },
  {
    "id": "BRENK-095",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "sulphur_nitrogen_single_bond",
    "smarts": "[SX2H0][N]"
  },
  {
    "id": "BRENK-096",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Thiobenzothiazole_1",
    "smarts": "c12ccccc1(SC(S)=N2)"
  },
  {
    "id": "BRENK-097",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "thiobenzothiazole_2",
    "smarts": "c12ccccc1(SC(=S)N2)"
  },
  {
    "id": "BRENK-098",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Thiocarbonyl_group",
    "smarts": "[C,c]=S"
  },
  {
    "id": "BRENK-099",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "thioester",
    "smarts": "SC=O"
  },
  {
    "id": "BRENK-100",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "thiol_1",
    "smarts": "[S-]"
  },
  {
    "id": "BRENK-101",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "thiol_2",
    "smarts": "[SH]"
  },
  {
    "id": "BRENK-102",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "Three-membered_heterocycle",
    "smarts": "*1[O,S,N]*1"
  },
  {
    "id": "BRENK-103",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "triflate",
    "smarts": "OS(=O)(=O)C(F)(F)F"
  },
  {
    "id": "BRENK-104",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "triphenyl_methyl-silyl",
    "smarts": "[SiR0,CR0](c1ccccc1)(c2ccccc2)(c3ccccc3)"
  },
  {
    "id": "BRENK-105",
    "set": "BRENK",
    "subset": "BRENK",
    "name": "triple_bond",
    "smarts": "C#C"
  }
];
