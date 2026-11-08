export interface ElementData {
  symbol: string;
  name: string;
  number: number;
  weight: number;
  valences: number[];
  implicit: boolean;
  color: string;
}
const rows: [string, string, number, number, number[], boolean, string][] = [
  ["H", "Hydrogen", 1, 1.008, [1], false, "#73717b"],
  ["B", "Boron", 5, 10.81, [3], true, "#927649"],
  ["C", "Carbon", 6, 12.011, [4], true, "#41404a"],
  ["N", "Nitrogen", 7, 14.007, [3], true, "#5573b4"],
  ["O", "Oxygen", 8, 15.999, [2], true, "#bc595e"],
  ["F", "Fluorine", 9, 18.998403, [1], true, "#52866c"],
  ["P", "Phosphorus", 15, 30.973762, [3, 5], true, "#b67c40"],
  ["S", "Sulfur", 16, 32.06, [2, 4, 6], true, "#aa8a30"],
  ["Cl", "Chlorine", 17, 35.45, [1], true, "#52866c"],
  ["Br", "Bromine", 35, 79.904, [1], true, "#9f634d"],
  ["I", "Iodine", 53, 126.90447, [1], true, "#8665a6"],
  ["Li", "Lithium", 3, 6.94, [1], false, "#887399"],
  ["Na", "Sodium", 11, 22.98977, [1], false, "#887399"],
  ["K", "Potassium", 19, 39.0983, [1], false, "#887399"],
  ["Mg", "Magnesium", 12, 24.305, [2], false, "#739573"],
  ["Ca", "Calcium", 20, 40.078, [2], false, "#739573"],
  ["Si", "Silicon", 14, 28.085, [4], true, "#8a7564"],
  ["Al", "Aluminium", 13, 26.981538, [3], false, "#86868a"],
  ["Fe", "Iron", 26, 55.845, [2, 3], false, "#b67c40"],
  ["Cu", "Copper", 29, 63.546, [1, 2], false, "#b67c40"],
  ["Zn", "Zinc", 30, 65.38, [2], false, "#86868a"],
  ["Ag", "Silver", 47, 107.8682, [1], false, "#86868a"],
];
export const ELEMENTS: Record<string, ElementData> = Object.fromEntries(
  rows.map(([symbol, name, number, weight, valences, implicit, color]) => [
    symbol,
    { symbol, name, number, weight, valences, implicit, color },
  ]),
);
export const ISOTOPE_MASSES: Record<string, number> = {
  "H:1": 1.007825032,
  "H:2": 2.014101778,
  "H:3": 3.016049278,
  "C:12": 12,
  "C:13": 13.003354835,
  "C:14": 14.003241989,
  "N:15": 15.000108899,
  "O:18": 17.999159613,
};
