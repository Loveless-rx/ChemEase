export function Formula({ value }: { value: string }) {
  return (
    <span
      className="formula"
      role="img"
      aria-label={value || "Empty structure"}
    >
      {value
        ? value
            .split(/(\d+)/)
            .map((s, i) => (/^\d+$/.test(s) ? <sub key={i}>{s}</sub> : s))
        : "—"}
    </span>
  );
}
