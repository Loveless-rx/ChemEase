import type { Point } from "../../types/editor";
export function screenToWorld(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  pan: Point,
  zoom: number,
): Point {
  return {
    x: (clientX - rect.left - rect.width / 2 - pan.x) / zoom,
    y: (clientY - rect.top - rect.height / 2 - pan.y) / zoom,
  };
}
export function targetId(target: EventTarget | null, kind: "atom" | "bond") {
  return target instanceof Element
    ? target.closest(`[data-${kind}]`)?.getAttribute(`data-${kind}`) || null
    : null;
}
