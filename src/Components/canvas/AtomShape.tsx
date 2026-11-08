import { memo } from "react";
import type { Atom } from "../../types/chem";
import type { ValenceInfo } from "../../engine/valence";
import { atomLabel } from "../../engine/rendering";
import { elementColor } from "../../utils/elementColor";
import { chargeLabel } from "../../utils/format";
interface Props {
  atom: Atom;
  degree: number;
  valence: ValenceInfo;
  selected: boolean;
  pending: boolean;
  showCarbons: boolean;
  showHydrogens: boolean;
  dark: boolean;
  warning: boolean;
  onKeyboardSelect: (id: string) => void;
}
export const AtomShape = memo(function AtomShape({
  atom: a,
  degree,
  valence,
  selected,
  pending,
  showCarbons,
  showHydrogens,
  dark,
  warning,
  onKeyboardSelect,
}: Props) {
  const visible = atomLabel(a, degree, showCarbons);
  return (
    <g
      className={`atom-shape ${selected ? "is-selected" : ""}`}
      transform={`translate(${a.x} ${a.y})`}
      data-atom={a.id}
      role="button"
      tabIndex={0}
      aria-label={`${a.element} atom, charge ${a.charge}, ${valence.implicitH} implicit hydrogens`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onKeyboardSelect(a.id);
        }
      }}
    >
      <circle className="atom-hit" r="17" />
      <circle className="atom-hover" r="15" />
      {(selected || pending) && (
        <circle
          className="atom-selection"
          r="17"
          strokeDasharray={pending ? "3 3" : undefined}
        />
      )}
      {warning && (
        <path
          d="M-9 23h18"
          stroke="var(--warning)"
          strokeWidth="2"
          strokeDasharray="2 3"
        />
      )}
      {visible && (
        <text
          className="atom-text"
          textAnchor="middle"
          dominantBaseline="central"
          fill={elementColor(a.element, dark)}
        >
          {a.element === "R" ? "R" : a.element}
        </text>
      )}
      {visible && showHydrogens && valence.implicitH > 0 && (
        <text
          className="atom-hydrogen"
          x={a.element.length > 1 ? 16 : 11}
          y="6"
          fill={elementColor(a.element, dark)}
        >
          H
          {valence.implicitH > 1 && (
            <tspan fontSize="10" dy="3">
              {valence.implicitH}
            </tspan>
          )}
        </text>
      )}
      {a.charge !== 0 && (
        <text className="atom-charge" x={-13} y={-12} fill="var(--text)">
          {chargeLabel(a.charge)}
        </text>
      )}
      {a.isotope && (
        <text x="-15" y="-11" fontSize="10" fill="var(--text)">
          {a.isotope}
        </text>
      )}
      {Array.from({ length: Math.min(a.lonePairs, 4) }, (_, i) => (
        <g key={i} transform={`rotate(${i * 90})`}>
          <circle cx="-3" cy="-23" r="1.4" fill="var(--text)" />
          <circle cx="3" cy="-23" r="1.4" fill="var(--text)" />
        </g>
      ))}
    </g>
  );
});
