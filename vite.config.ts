import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const rdkitDir = dirname(createRequire(import.meta.url).resolve("@rdkit/rdkit"));
const rdkitFiles = ["RDKit_minimal.js", "RDKit_minimal.wasm"];
export default defineConfig({
  server:{headers:{"Cross-Origin-Opener-Policy":"same-origin","Cross-Origin-Embedder-Policy":"require-corp"}},
  preview:{headers:{"Cross-Origin-Opener-Policy":"same-origin","Cross-Origin-Embedder-Policy":"require-corp"}},
  plugins: [react(), {
    name: "local-rdkit",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = req.url?.split("?")[0]?.split("/").pop();
        if (!req.url?.startsWith("/rdkit/") || !file || !rdkitFiles.includes(file)) return next();
        res.setHeader("Content-Type", file.endsWith("wasm") ? "application/wasm" : "text/javascript");
        res.end(readFileSync(join(rdkitDir, file)));
      });
    },
    generateBundle() {
      for (const file of rdkitFiles) this.emitFile({ type: "asset", fileName: `rdkit/${file}`, source: readFileSync(join(rdkitDir, file)) });
      this.emitFile({type: "asset", fileName: "rdkit/LICENSE.txt", source: readFileSync(new URL("./docs/RDKIT_LICENSE.txt", import.meta.url))});
    },
  }],
  base: "./",
  build: { target: "es2022" },
});
