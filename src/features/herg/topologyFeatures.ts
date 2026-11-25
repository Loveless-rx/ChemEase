/** Historical RDKit GraphDescriptors equations, adapted from BSD-licensed RDKit.
 * Research implementation: callers must enforce a supported molecular domain.
 */
export function topologyFeatures(atoms: (number | boolean)[][], bonds: (number | boolean)[][]): Record<string, number> {
  const n = atoms.length;
  if (!n) throw new Error('Empty molecular graph.');
  const neighbors: number[][] = Array.from({ length: n }, () => []);
  const order = Array.from({ length: n }, () => Array<number>(n).fill(0));
  const distance: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 0 : 1e8));
  for (const b of bonds) {
    const a = Number(b[0]), c = Number(b[1]), value = Number(b[2]);
    neighbors[a].push(c); neighbors[c].push(a);
    order[a][c] = order[c][a] = value;
    distance[a][c] = distance[c][a] = 1 / value;
  }
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
  const degrees = neighbors.map(x => x.length), sums = distance.map(row => row.reduce((a, b) => a + b, 0));
  const Chi0 = degrees.reduce((sum, d) => sum + (d ? 1 / Math.sqrt(d) : 0), 0);
  const Chi1 = bonds.reduce((sum, b) => sum + 1 / Math.sqrt(degrees[Number(b[0])] * degrees[Number(b[1])]), 0);
  const q = bonds.length, denominator = q - n + 2;
  const BalabanJ = denominator ? q / denominator * bonds.reduce((sum, b) => sum + 1 / Math.sqrt(sums[Number(b[0])] * sums[Number(b[1])]), 0) : 0;
  const entropy = (counts: number[]) => {
    const total = counts.reduce((a, b) => a + b, 0);
    return total ? -counts.reduce((sum, x) => sum + (x ? x / total * Math.log2(x / total) : 0), 0) : 0;
  };
  // Le Verrier–Faddeev–Frame characteristic polynomial, as in RDKit Graphs.py.
  const adjacency: number[][] = order.map(row => row.map(x => x ? 1 : 0));
  let power = adjacency.map(row => [...row]);
  const coefficients = [1];
  for (let k = 1; k <= n; k++) {
    const coefficient = power.reduce((s, row, i) => s + row[i], 0) / k;
    coefficients.push(Math.abs(coefficient));
    const corrected = power.map((row, i) => row.map((x, j) => x - (i === j ? coefficient : 0)));
    power = adjacency.map(row => Array.from({ length: n }, (_, j) => row.reduce((s, x, i) => s + x * corrected[i][j], 0)));
  }
  const Ipc = coefficients.reduce((a, b) => a + b, 0) * entropy(coefficients);
  const symmetryKeys: string[] = [];
  const classes = distance.map(row => {
    const key = [...row].sort((a, b) => a - b).slice(0, 100).map(x => x.toFixed(4)).join(',');
    let index = symmetryKeys.indexOf(key);
    if (index < 0) { index = symmetryKeys.length; symmetryKeys.push(key); }
    return index + 1;
  });
  const connections = new Map<string, number>(), types = new Map<number, number>();
  const add = (key: number[], value: number) => { const k = key.join(','); connections.set(k, (connections.get(k) ?? 0) + value); };
  for (let a = 0; a < n; a++) {
    const z = Number(atoms[a][0]); types.set(z, (types.get(z) ?? 0) + 1);
    const sorted = neighbors[a].sort((x, y) => x - y);
    for (let i = 0; i < sorted.length; i++) {
      const b = sorted[i], bo = order[a][b], ac = classes[a], bc = classes[b];
      if (bo > 1 && b > a) add([Math.min(ac, bc), Math.max(ac, bc)], bo * (bo - 1) / 2);
      for (let j = i + 1; j < sorted.length; j++) {
        const c = sorted[j], cc = classes[c];
        add([Math.min(bc, cc), ac, Math.max(bc, cc)], bo * order[a][c]);
      }
    }
  }
  const counts = connections.size ? [...connections.values()] : [1], total = counts.reduce((a, b) => a + b, 0);
  const BertzCT = n < 2 ? 0 : n * entropy([...types.values()]) + total * (entropy(counts) + Math.log2(total));
  return { Chi0, Chi1, BalabanJ, Ipc, BertzCT };
}
