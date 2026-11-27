#!/usr/bin/env node
/**
 * Prints a two-page résumé PDF from the same copy as the /resume page.
 */
import { mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  certifications,
  communityBody,
  communitySince,
  communityTitle,
  competencies,
  education,
  impact,
  languages,
  resumeContacts,
  resumeFoot,
  resumeKicker,
  resumeLede,
  resumeName,
  resumeSubtitle,
  resumeTitle,
  roles,
  toolGroups,
} from "../src/lib/resume.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/luis-cielak-resume.pdf");
const HTML = resolve(ROOT, "scripts/.resume-print.html");
const inter = resolve(ROOT, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2");
const interMed = resolve(ROOT, "node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2");
const mono = resolve(ROOT, "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2");
const display = resolve(ROOT, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2");

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const contact = resumeContacts
  .map((item) =>
    "href" in item
      ? `<a href="${esc(item.href)}">${esc(item.label)}</a>`
      : esc(item.label),
  )
  .join(" · ");

const impactHtml = impact
  .map(
    (item, i) =>
      `<li><span>${String(i + 1).padStart(2, "0")}</span><p>${esc(item)}</p></li>`,
  )
  .join("");

const rolesHtml = roles
  .map((role) => {
    const when = role.dates.map((line) => esc(line)).join(" · ");
    return `<li>
      <div class="role-head">
        <h3>${esc(role.title)}</h3>
        <p class="when">${when}</p>
      </div>
      <p class="org">${esc(role.org)} · ${esc(role.place)}</p>
      <p>${esc(role.summary)}</p>
    </li>`;
  })
  .join("");

const toolsHtml = toolGroups
  .map((group) => {
    const note = group.note ? `<br />${esc(group.note)}` : "";
    return `<p class="tool-line"><span class="${group.accent ? "accent" : ""}">${esc(group.title)}</span><br />${esc(group.body)}${note}</p>`;
  })
  .join("");

const eduHtml = education
  .map((item) => `<p class="degree">${esc(item.degree)}</p><p class="school">${esc(item.school)}</p>`)
  .join("");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Résumé — Luis Cielak</title>
    <style>
      @font-face { font-family: "Inter"; font-weight: 400; src: url("file://${inter}") format("woff2"); }
      @font-face { font-family: "Inter"; font-weight: 500; src: url("file://${interMed}") format("woff2"); }
      @font-face { font-family: "IBM Plex Mono"; font-weight: 400; src: url("file://${mono}") format("woff2"); }
      @font-face { font-family: "Space Grotesk"; font-weight: 500; src: url("file://${display}") format("woff2"); }
      @page { size: letter; margin: 0.65in; }
      html, body {
        margin: 0;
        background: #fff;
        color: #17150f;
        font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 9.7pt;
        line-height: 1.26;
      }
      h1, h2, h3 { margin: 0; font-weight: 600; }
      p { margin: 0; }
      a { color: inherit; text-decoration: none; }
      .kicker {
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #067f8a;
      }
      h1 {
        margin: 6pt 0 1pt;
        font-family: "Space Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 20pt;
        font-weight: 500;
        letter-spacing: -0.03em;
        line-height: 1.05;
      }
      .headline {
        margin: 0 0 5pt;
        font-family: "Space Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12pt;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1.18;
      }
      .headline span { display: block; color: #726c5e; font-weight: 500; }
      .lede { margin: 0 0 5pt; }
      .contact {
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8.5pt;
        letter-spacing: 0.02em;
        color: #17150f;
        padding-bottom: 7pt;
        border-bottom: 1.5pt solid #17150f;
      }
      h2 {
        margin: 10pt 0 4pt;
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #067f8a;
      }
      ol { margin: 0; padding: 0; list-style: none; }
      .impact li {
        display: grid;
        grid-template-columns: 16pt 1fr;
        gap: 8pt;
        margin: 0 0 2pt;
      }
      .impact span {
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        color: #067f8a;
      }
      .roles li {
        break-inside: avoid;
        margin: 0;
        padding: 9pt 0 4pt;
        border-bottom: 0.4pt solid #ded9cc;
      }
      .roles li:first-child { padding-top: 4pt; }
      .roles li:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
      .role-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12pt;
      }
      .when {
        flex: 0 0 auto;
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        letter-spacing: 0.04em;
        color: #726c5e;
        text-align: right;
      }
      .roles h3 { font-size: 11pt; font-weight: 600; line-height: 1.2; }
      .org {
        margin: 0.5pt 0 1.5pt;
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        letter-spacing: 0.02em;
        color: #726c5e;
      }
      .facts {
        margin-top: 3pt;
        padding-top: 6pt;
        border-top: 1.5pt solid #17150f;
      }
      .facts-top { margin-bottom: 4pt; }
      .facts-grid {
        display: grid;
        grid-template-columns: 0.85fr 1.45fr 1.3fr;
        gap: 10pt;
      }
      .tool-line { margin: 0 0 2pt; }
      .tool-line span {
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 7.5pt;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .tool-line span.accent { color: #067f8a; }
      .facts h3, .facts h2 {
        margin: 0 0 3pt;
        font-size: 7.5pt;
      }
      .facts h3.accent, .facts h2.accent { color: #067f8a; }
      .facts-grid > div > * + h2,
      .facts-grid > div > * + h3 { margin-top: 7pt; }
      .facts p { line-height: 1.28; }
      .degree {
        font-family: "Space Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 10pt;
        font-weight: 500;
      }
      .school, .community {
        color: #726c5e;
        font-size: 9pt;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        margin-top: 2pt;
        padding-top: 2pt;
        border-top: 1.5pt solid #17150f;
        font-family: "IBM Plex Mono", ui-monospace, "Courier New", monospace;
        font-size: 8pt;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <p class="kicker">${esc(resumeKicker)}</p>
    <h1>${esc(resumeName)}</h1>
    <p class="headline">${esc(resumeTitle)}<span>${esc(resumeSubtitle)}</span></p>
    <p class="lede">${esc(resumeLede)}</p>
    <p class="contact">${contact}</p>

    <h2>Selected impact</h2>
    <ol class="impact">${impactHtml}</ol>

    <h2>Professional experience</h2>
    <ol class="roles">${rolesHtml}</ol>

    <section class="facts">
      <div class="facts-top">
        <h2>Core competencies</h2>
        <p>${esc(competencies)}</p>
      </div>
      <div class="facts-grid">
        <div>
          <h2>Languages</h2>
          <p>${esc(languages)}</p>
          <h2 class="accent">Community</h2>
          <p>${esc(communityTitle)} (${esc(communitySince)}).</p>
          <p>${esc(communityBody)}</p>
        </div>
        <div>
          ${toolsHtml}
        </div>
        <div>
          <h2>Education</h2>
          ${eduHtml}
          <h2>Certifications</h2>
          <p>${certifications.map(esc).join("<br />")}</p>
        </div>
      </div>
    </section>
    <p class="foot"><span>${esc(resumeFoot)}</span><span>luis@luiscielak.com</span></p>
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
  throw new Error("Chrome is required to render the résumé PDF");
}

const userData = resolve(ROOT, "scripts/.chrome-pdf");
mkdirSync(userData, { recursive: true });

const result = spawnSync(
  chrome,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    `--user-data-dir=${userData}`,
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUT}`,
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
  /* keep the print source if cleanup fails */
}

console.log(`wrote ${OUT}`);
