import ts from "typescript";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
async function compile(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await compile(path);
    else if (/\.tsx?$/.test(path) && !path.endsWith(".d.ts")) {
      const source = await readFile(path, "utf8");
      const compiled = ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
        fileName: path,
      });
      const dest = join(".test-build", relative(".", path)).replace(
        /\.tsx?$/,
        ".js",
      );
      await mkdir(join(dest, ".."), { recursive: true });
      await writeFile(dest, compiled.outputText);
    }
  }
}
await mkdir(".test-build", { recursive: true });
await writeFile(".test-build/package.json", '{"type":"commonjs"}');
await compile("src");
await compile("tests");
const tests = (await readdir(".test-build/tests"))
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => join(".test-build/tests", f));
const result = spawnSync(
  process.execPath,
  ["--preserve-symlinks", "--test", ...tests],
  {
    stdio: "inherit",
  },
);
process.exitCode = result.status ?? 1;
