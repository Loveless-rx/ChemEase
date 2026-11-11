import type { CSSProperties } from "react";
const paths: Record<string, string> = {
  select: "M5 3l14 9-7 1-3 7-4-17z",
  erase: "M16 3l5 5-11 12H5l-3-3L16 3z M8 11l6 6 M10 20h11",
  lasso: "M4 4h16v16H4z",
  undo: "M9 5L4 10l5 5 M4 10h10a6 6 0 010 12",
  redo: "M15 5l5 5-5 5 M20 10H10a6 6 0 000 12",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  save: "M4 3h13l4 4v14H3V3z M7 3v6h10V3 M7 21v-8h10v8",
  export: "M12 15V3 M7 8l5-5 5 5 M4 14v7h16v-7",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1 M5 19l1-1 M18 6l1-1",
  moon: "M20 15A9 9 0 019 3a9 9 0 1011 12z",
  settings:
    "M12 8a4 4 0 100 8 4 4 0 000-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z",
  help: "M9 8a3 3 0 016 0c0 3-3 2-3 5 M12 17v.2 M12 2a10 10 0 100 20 10 10 0 000-20",
  close: "M6 6l12 12 M6 18L18 6",
  chevron: "M9 5l7 7-7 7",
  left: "M15 5l-7 7 7 7",
  copy: "M9 9h12v12H9z M15 9V3H3v12h6",
  check: "M4 12l5 5L20 6",
  flask: "M9 3h6 M10 3v6l-6 11h16L14 9V3 M7 15h10",
  fit: "M3 9V3h6 M15 3h6v6 M21 15v6h-6 M9 21H3v-6",
  grid: "M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h6v6h-6z",
  folder: "M3 6h7l2 3h9v12H3z",
  arrow: "M4 12h16 M14 6l6 6-6 6",
  ring: "M12 2l9 5v10l-9 5-9-5V7z",
  search: "M10 3a7 7 0 100 14 7 7 0 000-14 M15 15l6 6",
  chart: "M3 3v18h18 M7 15l4-5 4 3 5-8",
  atom: "M12 9a3 3 0 100 6 3 3 0 000-6 M4 4l16 16 M20 4L4 20 M2 12h20",
  info: "M12 11v6 M12 7v.2 M12 2a10 10 0 100 20 10 10 0 000-20",
  download: "M12 3v12 M7 10l5 5 5-5 M4 17v4h16v-4",
  pan: "M8 13V5a2 2 0 014 0v7 M12 5a2 2 0 014 0v8 M16 8a2 2 0 014 0v8l-4 5H9l-6-7a2 2 0 012-3l3 2",
  spark: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z",
  bond: "M4 19L20 5 M4 14L16 3",
  trash: "M3 6h18 M9 6V3h6v3 M6 6l1 15h10l1-15 M10 10v7 M14 10v7",
};
export function Icon({
  name,
  size = 18,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={paths[name] || paths.atom} />
    </svg>
  );
}
export function Logo() {
  return (
    <span className="logo">
      <span className="logo-mark">
        <Icon name="ring" size={25} />
      </span>
      ChemEase<span className="beta">Studio</span>
    </span>
  );
}
