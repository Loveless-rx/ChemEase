import { ELEMENTS } from "./elementData";
export const elementColor = (e: string, dark = false) =>
  e === "C"
    ? dark
      ? "#eee8f3"
      : "#35313d"
    : dark
      ? (
          {
            O: "#ef9397",
            N: "#95b3f0",
            F: "#88c2a2",
            Cl: "#88c2a2",
            Br: "#e9a486",
            S: "#dbbf65",
            P: "#e6b275",
          } as Record<string, string>
        )[e] || "#c8aedb"
      : ELEMENTS[e]?.color || "#8b769e";
