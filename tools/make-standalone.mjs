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
await writeFile(resolve(root, "ChemEase.html"), html);
console.log("Standalone app written to dist/ChemEase.html");
