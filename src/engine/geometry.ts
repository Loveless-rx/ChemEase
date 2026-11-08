import type { Point } from "../types/editor";
export const distance = (a: Point, b: Point) =>
  Math.hypot(a.x - b.x, a.y - b.y);
export const pointInRect = (p: Point, a: Point, b: Point) =>
  p.x >= Math.min(a.x, b.x) &&
  p.x <= Math.max(a.x, b.x) &&
  p.y >= Math.min(a.y, b.y) &&
  p.y <= Math.max(a.y, b.y);
export const bounds = (points: Point[]) => {
  if (!points.length) return { x: 0, y: 0, width: 1, height: 1 };
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX || 1,
    height: maxY - minY || 1,
  };
};
export function clippedLine(a: Point, b: Point, padA = 0, padB = 0) {
  const d = distance(a, b) || 1;
  const dx = (b.x - a.x) / d,
    dy = (b.y - a.y) / d;
  return {
    x1: a.x + dx * Math.min(padA, d * 0.38),
    y1: a.y + dy * Math.min(padA, d * 0.38),
    x2: b.x - dx * Math.min(padB, d * 0.38),
    y2: b.y - dy * Math.min(padB, d * 0.38),
    nx: -dy,
    ny: dx,
  };
}
