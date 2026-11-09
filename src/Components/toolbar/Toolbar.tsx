import { useState } from "react";
import { useUIStore } from "../../store/chemUIStore";
import { Icon } from "../common/Icon";
import { IconButton } from "../common/IconButton";
import type { BondType } from "../../types/chem";
import { ELEMENTS } from "../../utils/elementData";
import "./Toolbar.css";
export function Toolbar() {
  const tool = useUIStore((s) => s.tool),
    atom = useUIStore((s) => s.atom),
    bond = useUIStore((s) => s.bond),
    expanded = useUIStore((s) => s.expanded),
    ring = useUIStore((s) => s.ring),
    benzene = useUIStore((s) => s.benzene),
    delta = useUIStore((s) => s.chargeDelta);
  const [extended, setExtended] = useState(false);
  const set = useUIStore.getState().set;
  const chooseAtom = (a: string) =>
    set({ tool: "draw", atom: a, pendingAtom: null });
  const chooseBond = (b: BondType) =>
    set({ tool: "bond", bond: b, pendingAtom: null });
  const elements = (list: string[]) => (
    <div className="element-grid">
      {list.map((a) => (
        <button
          key={a}
          aria-label={`Draw ${ELEMENTS[a]?.name || a}`}
          aria-pressed={tool === "draw" && atom === a}
          title={`${ELEMENTS[a]?.name || a} (${a})`}
          className={`element-button ${tool === "draw" && atom === a ? "active" : ""}`}
          onClick={() => chooseAtom(a)}
        >
          <strong className={`element-${a}`}>{a}</strong>
          {expanded && <span>{ELEMENTS[a]?.number}</span>}
        </button>
      ))}
    </div>
  );
  return (
    <aside
      className={`chem-toolbar ${expanded ? "expanded" : "collapsed"}`}
      aria-label="Chemistry tools"
    >
      <header>
        {expanded && <span className="eyebrow">Toolkit</span>}
        <IconButton
          icon={expanded ? "left" : "chevron"}
          label={
            expanded ? "Collapse chemistry toolbar" : "Expand chemistry toolbar"
          }
          onClick={() => set({ expanded: !expanded })}
        />
      </header>
      <div className="toolbar-scroll">
        <section className="mobile-basic-tools">
          <h2>Edit</h2>
          <div>
            {(["select", "erase", "lasso", "pan"] as const).map((t) => (
              <button
                key={t}
                className={tool === t ? "active" : ""}
                aria-label={`${t} mobile tool`}
                title={t}
                onClick={() => set({ tool: t, pendingAtom: null })}
              >
                <Icon name={t} />
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2>Atoms</h2>
          {elements(["C", "H", "N", "O", "P", "S"])}
          {expanded && (
            <div className="tool-caption">Elements, at your fingertips.</div>
          )}
        </section>
        <section>
          <h2>Halogens</h2>
          {elements(["F", "Cl", "Br", "I"])}
        </section>
        {expanded && (
          <section className="extended-section">
            <button
              className="section-toggle"
              aria-expanded={extended}
              onClick={() => setExtended(!extended)}
            >
              <span>Extended elements</span>
              <Icon name={extended ? "minus" : "plus"} size={13} />
            </button>
            {extended &&
              elements([
                "Li",
                "Na",
                "K",
                "Mg",
                "Ca",
                "B",
                "Si",
                "Al",
                "Zn",
                "Fe",
                "Cu",
                "Ag",
              ])}
          </section>
        )}
        <section>
          <h2>Bonds</h2>
          <div className="bond-tools">
            {(["single", "double", "triple", "aromatic"] as const).map(
              (b, i) => (
                <button
                  key={b}
                  title={`${b[0].toUpperCase() + b.slice(1)} bond${i < 3 ? ` (${i + 1})` : ""}`}
                  aria-label={`${b[0].toUpperCase() + b.slice(1)} bond tool`}
                  aria-pressed={tool === "bond" && bond === b}
                  className={`tool-row ${tool === "bond" && bond === b ? "active" : ""}`}
                  onClick={() => chooseBond(b)}
                >
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.4"
                  >
                    {Array.from(
                      { length: b === "single" ? 1 : b === "triple" ? 3 : 2 },
                      (_, j) => (
                        <line
                          key={j}
                          x1="4"
                          y1={17 - j * 4}
                          x2="20"
                          y2={7 - j * 4}
                          strokeDasharray={
                            b === "aromatic" && j === 1 ? "3 2" : undefined
                          }
                        />
                      ),
                    )}
                  </svg>
                  {expanded && (
                    <>
                      <span>{b[0].toUpperCase() + b.slice(1)}</span>
                      {i < 3 && <kbd>{i + 1}</kbd>}
                    </>
                  )}
                </button>
              ),
            )}
          </div>
        </section>
        <section>
          <h2>Rings</h2>
          <div className="ring-tools">
            {(
              [
                [5, false, "Cyclopentane"],
                [6, false, "Cyclohexane"],
                [6, true, "Benzene"],
              ] as const
            ).map(([n, ar, label]) => (
              <button
                key={label}
                title={label}
                aria-label={`${label} ring tool`}
                aria-pressed={tool === "ring" && ring === n && benzene === ar}
                className={
                  tool === "ring" && ring === n && benzene === ar
                    ? "active"
                    : ""
                }
                onClick={() =>
                  set({ tool: "ring", ring: n, benzene: ar, pendingAtom: null })
                }
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                >
                  <polygon
                    points={Array.from(
                      { length: n },
                      (_, i) =>
                        `${15 + 11 * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / n)},${15 + 11 * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / n)}`,
                    ).join(" ")}
                  />
                  {ar && <circle cx="15" cy="15" r="6.5" />}
                </svg>
                {expanded && <small>{ar ? "Aromatic" : `${n}-ring`}</small>}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2>Chemistry</h2>
          <div className="chemistry-tools">
            {(
              [
                ["charge", "±", "Charge"],
                ["lonePair", "••", "Lone pair"],
                ["hydrogen", "H", "Hydrogen"],
                ["draw", "R", "R-group"],
              ] as const
            ).map(([t, symbol, label]) => (
              <button
                key={label}
                title={
                  label === "Hydrogen" ? "Attach explicit hydrogen" : label
                }
                aria-label={`${label} tool`}
                className={`tool-row ${(label === "R-group" ? tool === "draw" && atom === "R" : tool === t) ? "active" : ""}`}
                onClick={() =>
                  label === "R-group"
                    ? chooseAtom("R")
                    : set({ tool: t, pendingAtom: null })
                }
              >
                <b className="chem-symbol">{symbol}</b>
                {expanded && <span>{label}</span>}
              </button>
            ))}
          </div>
          {tool === "charge" && expanded && (
            <div className="charge-controls">
              <button
                className={delta === 1 ? "active" : ""}
                onClick={() => set({ chargeDelta: 1 })}
              >
                +1
              </button>
              <button
                className={delta === -1 ? "active" : ""}
                onClick={() => set({ chargeDelta: -1 })}
              >
                −1
              </button>
            </div>
          )}
        </section>
      </div>
      <footer>
        {expanded ? (
          <>
            <span className="local-dot" /> All chemistry, on your device
          </>
        ) : (
          <Icon name="flask" size={17} />
        )}
      </footer>
    </aside>
  );
}
