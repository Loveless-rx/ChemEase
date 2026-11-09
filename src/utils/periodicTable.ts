import { periodicSeed } from "./periodicSeed";

export interface PeriodicElement {
  number: number;
  symbol: string;
  name: string;
  family: string;
  period: number;
  column: number;
  row: number;
  standardWeight: number | null;
}

export const PERIODIC_ELEMENTS: PeriodicElement[] = periodicSeed.map(([number, symbol, name, family, mass]) => {
  const period = number <= 2 ? 1 : number <= 10 ? 2 : number <= 18 ? 3 : number <= 36 ? 4 : number <= 54 ? 5 : number <= 86 ? 6 : 7;
  let column: number, row = period;
  if (period === 1) column = number === 1 ? 1 : 18;
  else if (period === 2 || period === 3) {
    const offset = number - (period === 2 ? 2 : 10);
    column = offset <= 2 ? offset : offset + 10;
  } else if (period === 4 || period === 5) column = number - (period === 4 ? 18 : 36);
  else if (number >= 57 && number <= 71) { row = 9; column = number - 54; }
  else if (number >= 89 && number <= 103) { row = 10; column = number - 86; }
  else if (period === 6) column = number <= 56 ? number - 54 : number - 68;
  else column = number <= 88 ? number - 86 : number - 100;
  // These elements have no standard atomic weight; do not treat a representative isotope as an average.
  const noStandardWeight = number === 43 || number === 61 || (number >= 84 && number <= 89) || number >= 93;
  return { number, symbol, name, family, period, column, row, standardWeight: noStandardWeight ? null : Number(mass) };
});

export function findElements(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return PERIODIC_ELEMENTS;
  const alias = q.replace("aluminium", "aluminum").replace("caesium", "cesium");
  return PERIODIC_ELEMENTS.filter(e => /^\d+$/.test(q)
    ? e.number === Number(q)
    : e.symbol.toLowerCase().includes(q) || e.name.toLowerCase().includes(alias))
    .sort((a,b) => Number(b.symbol.toLowerCase() === q) - Number(a.symbol.toLowerCase() === q) || a.number - b.number);
}

export function periodicNeighbor(number: number, key: string) {
  const current = PERIODIC_ELEMENTS.find(e => e.number === number);
  if (!current) return number;
  const horizontal = PERIODIC_ELEMENTS.filter(e => e.row === current.row).sort((a,b) => a.column - b.column);
  if (key === "Home") return horizontal[0].number;
  if (key === "End") return horizontal.at(-1)!.number;
  if (key === "ArrowLeft") return horizontal.filter(e => e.column < current.column).at(-1)?.number ?? number;
  if (key === "ArrowRight") return horizontal.find(e => e.column > current.column)?.number ?? number;
  if (key === "ArrowUp" || key === "ArrowDown") {
    const direction = key === "ArrowDown" ? 1 : -1;
    return PERIODIC_ELEMENTS.filter(e => (e.row - current.row) * direction > 0)
      .sort((a,b) => Math.abs(a.row-current.row)-Math.abs(b.row-current.row) || Math.abs(a.column-current.column)-Math.abs(b.column-current.column) || a.column-b.column)[0]?.number ?? number;
  }
  return number;
}
