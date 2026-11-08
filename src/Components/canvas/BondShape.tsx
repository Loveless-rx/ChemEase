import { memo } from "react";
import type { Atom, Bond } from "../../types/chem";
import { bondSegments } from "../../engine/rendering";
export const BondShape = memo(function BondShape({
  bond: b,
  a,
  d,
  labelA,
  labelB,
  selected,
  onKeyboardSelect,
}: {
  bond: Bond;
  a: Atom;
  d: Atom;
  labelA: boolean;
  labelB: boolean;
  selected: boolean;
  onKeyboardSelect: (id: string) => void;
}) {
  const segments = bondSegments(b, a, d, labelA, labelB);
  return (
    <g
      data-bond={b.id}
      className={`bond-shape ${selected ? "is-selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${b.type} bond`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onKeyboardSelect(b.id);
        }
      }}
    >
      <line className="bond-hit" x1={a.x} y1={a.y} x2={d.x} y2={d.y} />
      <line className="bond-hover" x1={a.x} y1={a.y} x2={d.x} y2={d.y} />
      {segments.map((p, i) => (
        <line
          key={i}
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke={selected ? "var(--accent)" : "var(--text)"}
          strokeWidth={p.dashed ? 1.35 : 1.85}
          strokeDasharray={p.dashed ? "4 4" : undefined}
          strokeLinecap="round"
          pointerEvents="none"
        />
      ))}
    </g>
  );
});
