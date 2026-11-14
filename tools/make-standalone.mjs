import { readFile, writeFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
const root = resolve("dist");
function assetPath(url) {
  const path = resolve(root, url.replace(/^\.?\//, ""));
  if (relative(root, path).startsWith(".."))
    throw new Error("Invalid build asset path");
  return path;
}
let html = await readFile(resolve(root, "index.html"), "utf8");
for (const match of [
  ...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g),
]) {
  if(match[1].endsWith("coi-serviceworker.js")||match[1].endsWith("docking-isolation.js"))continue;
  const code = await readFile(assetPath(match[1]), "utf8");
  html = html.replace(
    match[0],
    () =>
      `<script type="module">${code.replace(/<\/script/gi, "<\\/script")}</script>`,
  );
}
for (const match of [
  ...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g),
]) {
  const css = await readFile(assetPath(match[1]), "utf8");
  html = html.replace(match[0], () => `<style>${css}</style>`);
}
const rdkitJs = await readFile(resolve(root, "rdkit/RDKit_minimal.js"), "utf8");
const rdkitWasm = await readFile(resolve(root, "rdkit/RDKit_minimal.wasm"));
const rdkitLicense = await readFile(resolve(root, "rdkit/LICENSE.txt"), "utf8");
const esolLicense = await readFile(resolve("public/licenses/esol.txt"), "utf8");
html = html.replace("<head>", () => `<head><!-- ESOL / Patrick Walters license\n${esolLicense.replace(/--/g, "- -")}\n-->`);
const pdfLicense = await readFile(resolve("public/licenses/jspdf.txt"), "utf8");
html = html.replace("<head>", () => `<head><!-- jsPDF license\n${pdfLicense.replace(/--/g, "- -")}\n-->`);
const catalogLicense = await readFile(resolve("vendor/rdkit-filter-catalog/LICENSE.txt"), "utf8");
html = html.replace("<head>", () => `<head><!-- Structural alert catalog: RDKit Release_2026_09_2, PAINS and Brenk.\n${catalogLicense.replace(/--/g, "- -")}\n-->`);
html = html.replace("<head>", () => `<head><!-- RDKit license\n${rdkitLicense.replace(/--/g, "- -")}\n--><script>${rdkitJs.replace(/<\/script/gi, "<\\/script")}</script><script id="rdkit-wasm" type="application/octet-stream">${rdkitWasm.toString("base64")}</script>`);
await writeFile(resolve(root, "ChemEase.html"), html);
console.log("Standalone app written to dist/ChemEase.html");
