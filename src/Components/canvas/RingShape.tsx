export function DemoMolecule() {
  const p = Array.from({ length: 6 }, (_, i) => ({
    x: 150 + 68 * Math.cos((i * Math.PI) / 3),
    y: 110 + 68 * Math.sin((i * Math.PI) / 3),
  }));
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-label="Benzene structure">
      <g strokeWidth="2" strokeLinecap="round">
        {p.map((a, i) => (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={p[(i + 1) % 6].x}
            y2={p[(i + 1) % 6].y}
          />
        ))}
        <circle
          cx="150"
          cy="110"
          r="45"
          strokeDasharray="5 5"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
