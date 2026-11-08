export type Vec3 = [number, number, number];
export const clamp = (x: number, low = 0, high = 1) =>
  Math.min(high, Math.max(low, x));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};
export const mix3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  mix(a[0], b[0], t),
  mix(a[1], b[1], t),
  mix(a[2], b[2], t),
];
export const add = (a: Vec3, b: Vec3): Vec3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
export const sub = (a: Vec3, b: Vec3): Vec3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];
export const scale = (a: Vec3, n: number): Vec3 => [
  a[0] * n,
  a[1] * n,
  a[2] * n,
];
export const dot = (a: Vec3, b: Vec3) =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const normalize = (a: Vec3): Vec3 =>
  scale(a, 1 / (Math.hypot(...a) || 1));
export function rotate(p: Vec3, rotation: Vec3): Vec3 {
  const [rx, ry, rz] = rotation;
  const x = p[0],
    y = p[1] * Math.cos(rx) - p[2] * Math.sin(rx),
    z = p[1] * Math.sin(rx) + p[2] * Math.cos(rx);
  const xx = x * Math.cos(ry) + z * Math.sin(ry),
    zz = -x * Math.sin(ry) + z * Math.cos(ry);
  return [
    xx * Math.cos(rz) - y * Math.sin(rz),
    xx * Math.sin(rz) + y * Math.cos(rz),
    zz,
  ];
}
export function perspective(
  fov: number,
  aspect: number,
  near = 0.1,
  far = 100,
) {
  const f = 1 / Math.tan(fov / 2),
    nf = 1 / (near - far);
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) * nf,
    -1,
    0,
    0,
    2 * far * near * nf,
    0,
  ]);
}
export function lookAt(eye: Vec3, target: Vec3) {
  const z = normalize(sub(eye, target)),
    x = normalize(cross([0, 1, 0], z)),
    y = cross(z, x);
  return new Float32Array([
    x[0],
    y[0],
    z[0],
    0,
    x[1],
    y[1],
    z[1],
    0,
    x[2],
    y[2],
    z[2],
    0,
    -dot(x, eye),
    -dot(y, eye),
    -dot(z, eye),
    1,
  ]);
}
export interface SceneFrame {
  at: number;
  position: Vec3;
  rotation: Vec3;
  camera: Vec3;
  target: Vec3;
  spread: number;
  bonds: number;
  radius: number;
  zoom: number;
}
const frames: SceneFrame[] = [
  {
    at: 0,
    position: [2.15, -0.05, 0],
    rotation: [0.45, -0.65, 0.3],
    camera: [0, 0, 10.2],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 1,
  },
  {
    at: 0.16,
    position: [2.05, -0.05, 0],
    rotation: [0.75, 0.3, 0.5],
    camera: [0.45, 0.4, 9.1],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 1.05,
  },
  {
    at: 0.32,
    position: [1.65, -0.1, 0],
    rotation: [1.0, 1.6, -0.4],
    camera: [-0.3, 0.5, 7.5],
    target: [0, 0, 0],
    spread: 2.1,
    bonds: 0,
    radius: 1.15,
    zoom: 0.95,
  },
  {
    at: 0.45,
    position: [1.95, -0.1, 0],
    rotation: [0.25, 3.2, 0.2],
    camera: [0.3, -0.25, 9.2],
    target: [0, 0, 0],
    spread: 0.25,
    bonds: 0.9,
    radius: 1,
    zoom: 1,
  },
  {
    at: 0.62,
    position: [-2.05, -0.02, 0],
    rotation: [0.1, 5.9, -0.25],
    camera: [-0.35, 0.2, 10.5],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 1,
    zoom: 0.98,
  },
  {
    at: 0.78,
    position: [-1.8, 0.1, 0],
    rotation: [0.65, 6.5, 0.1],
    camera: [0.25, -0.2, 9.7],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 0.8,
    zoom: 1,
  },
  {
    at: 1,
    position: [0, 1.1, 0],
    rotation: [0, Math.PI * 2, 0],
    camera: [0, 0, 10.5],
    target: [0, 0, 0],
    spread: 0,
    bonds: 1,
    radius: 0.44,
    zoom: 0.6,
  },
];
export function sceneFrame(
  progress: number,
  mobile = false,
  reduced = false,
): SceneFrame {
  const p = clamp(progress);
  let i = 0;
  while (i < frames.length - 2 && p > frames[i + 1].at) i++;
  const a = frames[i],
    b = frames[i + 1],
    t = smooth((p - a.at) / (b.at - a.at));
  const out: SceneFrame = {
    at: p,
    position: mix3(a.position, b.position, t),
    rotation: mix3(a.rotation, b.rotation, t),
    camera: mix3(a.camera, b.camera, t),
    target: mix3(a.target, b.target, t),
    spread: mix(a.spread, b.spread, t),
    bonds: mix(a.bonds, b.bonds, t),
    radius: mix(a.radius, b.radius, t),
    zoom: mix(a.zoom, b.zoom, t),
  };
  if (mobile) {
    const analysis =
      smooth((p - 0.46) / 0.07) * (1 - smooth((p - 0.78) / 0.07));
    const final = smooth((p - 0.8) / 0.11);
    out.position = [
      out.position[0] * 0.09,
      mix(mix(-1.65, -2, analysis), 1.5, final),
      0,
    ];
    out.camera = [
      out.camera[0] * 0.35,
      out.camera[1] * 0.35,
      out.camera[2] + 3,
    ];
    out.zoom *= 0.72 * mix(1, 0.58, analysis);
    out.spread *= 0.35;
  }
  if (reduced) {
    out.camera = [0, 0, mobile ? 13 : 10.5];
    out.rotation = [0.12, 0.18, 0];
    out.spread = 0;
    out.bonds = 1;
    out.radius = 1;
    out.zoom = mobile
      ? p < 0.5
        ? 0.7
        : p < 0.82
          ? 0.42
          : 0.43
      : p < 0.82
        ? 0.98
        : 0.6;
    out.position = mobile
      ? [0, p < 0.5 ? -1.65 : p < 0.82 ? -2 : 1.5, 0]
      : p < 0.5
        ? [2.15, 0, 0]
        : p < 0.82
          ? [-2.05, 0, 0]
          : [0, 1.1, 0];
  }
  return out;
}
export function chapterOpacity(p: number, chapter: number) {
  const ranges = [
    [0, 0.225],
    [0.245, 0.485],
    [0.515, 0.805],
    [0.835, 1],
  ];
  const [start, end] = ranges[chapter];
  return (
    (chapter === 0 ? 1 : smooth((p - start) / 0.035)) *
    (chapter === 3 ? 1 : 1 - smooth((p - (end - 0.04)) / 0.04))
  );
}
