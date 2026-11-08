export const formatNumber = (n: number, digits = 2) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
export const chargeLabel = (q: number) =>
  q === 0 ? "" : `${Math.abs(q) > 1 ? Math.abs(q) : ""}${q > 0 ? "+" : "−"}`;
