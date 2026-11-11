import type { Molecule } from "../types/chem";
import { bounds } from "./geometry";
import {
  renderContext,
  atomLabel,
  bondSegments,
  type RenderOptions,
} from "./rendering";
import { elementColor } from "../utils/elementColor";
import { chargeLabel } from "../utils/format";
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export function moleculeSvg(m: Molecule, options: Partial<RenderOptions> & {highlightAtoms?:string[];highlightBonds?:string[]} = {}) {
  const box = bounds(m.atoms);
  const width = Math.max(180, box.width + 130),
    height = Math.max(160, box.height + 130);
  const dark = options.dark ?? false,
    bg = dark ? "#222127" : "#fffefa",
    ink = dark ? "#f1edf4" : "#2d2b32";
  const context = renderContext(m);
  const label = (a: Molecule["atoms"][number]) =>
    atomLabel(a, context.adj.get(a.id)?.length || 0, options.showCarbons);
  const highlightedAtoms=new Set(options.highlightAtoms??[]),highlightedBonds=new Set(options.highlightBonds??[]);
  let body = m.atoms.filter(a=>highlightedAtoms.has(a.id)).map(a=>`<circle cx="${a.x}" cy="${a.y}" r="17" fill="#b797e6" fill-opacity="0.32" stroke="#7655ad" stroke-width="1"/>`).join("");
  for (const b of m.bonds) {
    const a = context.atomMap.get(b.atomA),
      d = context.atomMap.get(b.atomB);
    if (!a || !d) continue;
    if(highlightedBonds.has(b.id))body+=`<line x1="${a.x}" y1="${a.y}" x2="${d.x}" y2="${d.y}" stroke="#b797e6" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round"/>`;
    for (const p of bondSegments(b, a, d, label(a), label(d)))
      body += `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}" stroke="${ink}" stroke-width="${p.dashed ? 1.35 : 1.85}" stroke-linecap="round" ${p.dashed ? 'stroke-dasharray="4 4"' : ""}/>`;
  }
  for (const a of m.atoms) {
    const color = elementColor(a.element, dark),
      h = context.valences.get(a.id)!.implicitH;
    const text = (
      x: number,
      y: number,
      value: string,
      size: number,
      anchor = "middle",
    ) =>
      `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Arial,sans-serif" font-size="${size}" paint-order="stroke" stroke="${bg}" stroke-width="3" stroke-linejoin="round">${value}</text>`;
    if (label(a)) {
      body += text(a.x, a.y + 7, escape(a.element), 20);
      if ((options.showHydrogens ?? true) && h > 0)
        body += text(
          a.x + (a.element.length > 1 ? 16 : 11),
          a.y + 6,
          `H${h > 1 ? `<tspan font-size="10" dy="3">${h}</tspan>` : ""}`,
          16,
          "start",
        );
    }
    if (a.charge)
      body += text(a.x - 13, a.y - 12, escape(chargeLabel(a.charge)), 12);
    if (a.isotope) body += text(a.x - 15, a.y - 11, String(a.isotope), 10);
    for (let i = 0; i < Math.min(a.lonePairs, 4); i++) {
      body += `<g transform="translate(${a.x} ${a.y}) rotate(${i * 90})"><circle cx="-3" cy="-23" r="1.4" fill="${ink}"/><circle cx="3" cy="-23" r="1.4" fill="${ink}"/></g>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${box.x - 65} ${box.y - 65} ${width} ${height}"><title>${escape(m.metadata.name)}</title><rect x="${box.x - 65}" y="${box.y - 65}" width="${width}" height="${height}" fill="${bg}"/>${body}</svg>`;
}
export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function exportMolecule(
  m: Molecule,
  format: "png" | "svg" | "json",
  options: Partial<RenderOptions> = {},
) {
  const name = (m.metadata.name || "molecule")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .toLowerCase();
  if (format === "json") {
    downloadBlob(
      new Blob([JSON.stringify(m, null, 2)], { type: "application/json" }),
      `${name}.json`,
    );
    return;
  }
  const svg = moleculeSvg(m, options);
  if (format === "svg") {
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${name}.svg`);
    return;
  }
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("Unable to render structure image."));
      image.src = url;
    });
    const scale = Math.min(3, 4096 / image.width, 4096 / image.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(image.width * scale);
    canvas.height = Math.ceil(image.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Canvas export is not supported by this browser.");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encoding failed."))),
        "image/png",
      ),
    );
    downloadBlob(blob, `${name}.png`);
  } finally {
    URL.revokeObjectURL(url);
  }
}
export async function copyText(text: string) {
  if (!text) throw new Error("There is no SMILES string to copy.");
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    if (!ok)
      throw new Error(
        "Clipboard blocked. Select and copy the SMILES text manually.",
      );
  }
}
