#!/usr/bin/env node
/**
 * Builds monarch-first-week for embedding on the portfolio case page.
 * Output: site/public/prototypes/your-first-week/
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = resolve(SITE, "..");
const PROTO = join(ROOT, "monarch-first-week");
const OUT = join(SITE, "public", "prototypes", "your-first-week");
const BASE = "/prototypes/your-first-week/";

if (!existsSync(join(PROTO, "package.json"))) {
  // CLI deploys from site/ don't upload the sibling app; keep a prebuilt embed if present.
  if (existsSync(join(OUT, "index.html"))) {
    console.warn("monarch-first-week not found next to site/; using existing public/prototypes/your-first-week/");
    process.exit(0);
  }
  console.warn("monarch-first-week not found next to site/; skipping prototype embed build");
  process.exit(0);
}

const install = spawnSync("npm", ["install"], {
  cwd: PROTO,
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (install.status !== 0) process.exit(install.status ?? 1);

const build = spawnSync("npm", ["run", "build"], {
  cwd: PROTO,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, VITE_BASE: BASE },
});
if (build.status !== 0) process.exit(build.status ?? 1);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(dirname(OUT), { recursive: true });
cpSync(join(PROTO, "dist"), OUT, { recursive: true });

// Static hosts without SPA rewrites still need the /prototype entry.
const indexHtml = join(OUT, "index.html");
const prototypeDir = join(OUT, "prototype");
mkdirSync(prototypeDir, { recursive: true });
cpSync(indexHtml, join(prototypeDir, "index.html"));

console.log(`Copied prototype → ${OUT}`);
