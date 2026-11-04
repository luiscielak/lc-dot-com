#!/usr/bin/env node
/**
 * Renders the default 1200×630 Open Graph image in the site’s nameplate style.
 */
import { mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/og-default.png");
const HTML = resolve(ROOT, "scripts/.og-default.html");
const mono = resolve(ROOT, "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2");
const display = resolve(ROOT, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: "IBM Plex Mono";
        font-weight: 500;
        src: url("file://${mono}") format("woff2");
      }
      @font-face {
        font-family: "Space Grotesk";
        font-weight: 500;
        src: url("file://${display}") format("woff2");
      }
      html, body {
        margin: 0;
        width: 1200px;
        height: 630px;
        background: #17150f;
        color: #ffffff;
        overflow: hidden;
      }
      .card {
        box-sizing: border-box;
        width: 1200px;
        height: 630px;
        padding: 72px 80px 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #17150f;
      }
      .kicker {
        margin: 0;
        font-family: "IBM Plex Mono", ui-monospace, monospace;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #8fd4db;
      }
      h1 {
        margin: 28px 0 0;
        font-family: "Space Grotesk", system-ui, sans-serif;
        font-size: 92px;
        font-weight: 500;
        letter-spacing: -0.04em;
        line-height: 0.92;
      }
      h1 span { color: #8fd4db; }
      .rule {
        width: 72px;
        height: 2px;
        margin: 28px 0 0;
        background: #8fd4db;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: end;
        font-family: "IBM Plex Mono", ui-monospace, monospace;
        font-size: 18px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #ffffffb8;
      }
      .mark {
        width: 36px;
        height: 40px;
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div>
        <p class="kicker">Luis Cielak</p>
        <h1>Clarity<br />above all<span>.</span></h1>
        <div class="rule"></div>
      </div>
      <div class="foot">
        <span>Lead Product Designer · Philadelphia</span>
        <svg class="mark" viewBox="6 -2 20 28" aria-hidden="true">
          <path d="M6 -2L10 -2L10 22L24 22L24 26L9 26A3 3 0 0 1 6 23ZM26 4L26 8L18 8L18 14L24 14L24 18L17 18A3 3 0 0 1 14 15L14 7A3 3 0 0 1 17 4Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(HTML, html);

const chrome =
  process.env.CHROME_PATH ||
  ["google-chrome", "google-chrome-stable", "chromium", "chrome"].find((bin) => {
    const r = spawnSync(bin, ["--version"], { encoding: "utf8" });
    return r.status === 0;
  });

if (!chrome) {
  throw new Error("Chrome is required to render og-default.png");
}

const userData = resolve(ROOT, "scripts/.chrome-og");
mkdirSync(userData, { recursive: true });

const result = spawnSync(
  chrome,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    `--user-data-dir=${userData}`,
    "--default-background-color=17150F",
    `--screenshot=${OUT}`,
    "--window-size=1200,630",
    "--virtual-time-budget=5000",
    `file://${HTML}`,
  ],
  { stdio: "inherit", timeout: 30_000 },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

try {
  unlinkSync(HTML);
} catch {
  /* keep the template if cleanup fails */
}

console.log(`wrote ${OUT}`);
