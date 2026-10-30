#!/usr/bin/env node
/**
 * Fails the build if any case-study image is under 1.5× its declared CSS max width.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "src/assets/work");
const CONTENT = join(ROOT, "src/content/work");
const RATIO = 1.5;

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error("missing frontmatter");
  return m[1];
}

function yamlString(block, key) {
  const re = new RegExp(`(?:^|\\n)${key}:\\s*"([^"]+)"`);
  const m = block.match(re);
  return m?.[1];
}

function yamlNumber(block, key) {
  const re = new RegExp(`(?:^|\\n)${key}:\\s*([0-9]+)`);
  const m = block.match(re);
  return m ? Number(m[1]) : undefined;
}

/** Max CSS px the centered phone renders at in PhoneStage. Keep in sync with the component. */
const PHONE_MAX = 320;

function visualBlocks(block) {
  const visuals = [];
  const cover = yamlString(block, "cover");
  const coverMax = yamlNumber(block, "coverMaxCssPx");
  if (cover && coverMax) visuals.push({ src: cover, maxCssPx: coverMax, field: "cover" });
  const videoSection = topSection(block, "video");
  const poster = videoSection.match(/poster:\s*"([^"]+)"/)?.[1];
  if (poster) {
    visuals.push({ src: poster, maxCssPx: 400, field: "video.poster" });
  }
  const phones = block.split(/\nphones:\n/)[1];
  if (phones) {
    const rest = phones.split(/\n[a-z]+:/)[0];
    const items = [...rest.matchAll(/\n  - [\s\S]*?src:\s*"([^"]+)"/g)];
    items.forEach((m, i) => {
      visuals.push({ src: m[1], maxCssPx: PHONE_MAX, field: `phones[${i}]` });
    });
  }
  const stage = block.split(/\nfeatureStage:\n/)[1];
  if (stage) {
    const rest = stage.split(/\n[a-zA-Z][a-zA-Z0-9]*:/)[0];
    const items = rest.split(/\n    - /).slice(1);
    items.forEach((chunk, i) => {
      const src = chunk.match(/src:\s*"([^"]+)"/)?.[1];
      const maxCssPx = Number(chunk.match(/maxCssPx:\s*([0-9]+)/)?.[1]);
      if (src && maxCssPx) visuals.push({ src, maxCssPx, field: `featureStage.items[${i}]` });
    });
  }
  const vis = topSection(block, "visuals");
  if (vis) {
    const names = [...vis.matchAll(/(?:^|\n)  ([a-z]+):\n/g)].map((x) => x[1]);
    const chunks = vis.split(/(?:^|\n)  [a-z]+:\n/).slice(1);
    names.forEach((name, i) => {
      const chunk = chunks[i];
      if (!chunk) return;
      const src = chunk.match(/src:\s*"([^"]+)"/)?.[1];
      const maxCssPx = Number(chunk.match(/maxCssPx:\s*([0-9]+)/)?.[1]);
      if (src && maxCssPx) visuals.push({ src, maxCssPx, field: `visuals.${name}` });
    });
  }
  for (const key of ["gallery", "clips"]) {
    const section = topSection(block, key);
    if (!section) continue;
    const items = [...section.matchAll(/src:\s*"([^"]+)"|poster:\s*"([^"]+)"|maxCssPx:\s*([0-9]+)/g)];
    let src;
    let poster;
    let maxCssPx;
    let i = 0;
    const flush = () => {
      if (src && maxCssPx && !src.startsWith("/video/") && !src.endsWith(".mp4")) {
        visuals.push({ src, maxCssPx, field: `${key}[${i}]` });
      }
      if (poster && maxCssPx) visuals.push({ src: poster, maxCssPx, field: `${key}[${i}].poster` });
      i += 1;
      src = poster = maxCssPx = undefined;
    };
    for (const m of items) {
      if (m[1]) {
        if (src || poster || maxCssPx) flush();
        src = m[1];
      } else if (m[2]) {
        poster = m[2];
      } else if (m[3]) {
        maxCssPx = Number(m[3]);
        flush();
      }
    }
  }
  return visuals;
}

function topSection(block, key) {
  const re = new RegExp(`(?:^|\\n)${key}:\\n`);
  const m = re.exec(block);
  if (!m) return "";
  const rest = block.slice(m.index + m[0].length);
  const end = rest.search(/\n(?![ \\t])[a-zA-Z]/);
  return end === -1 ? rest : rest.slice(0, end);
}

const failures = [];
for (const file of readdirSync(CONTENT).filter((f) => f.endsWith(".mdx"))) {
  const fm = parseFrontmatter(readFileSync(join(CONTENT, file), "utf8"));
  for (const slot of visualBlocks(fm)) {
    const abs = join(ASSETS, slot.src);
    const meta = await sharp(abs).metadata();
    const w = meta.width ?? 0;
    const need = slot.maxCssPx * RATIO;
    if (w < need) {
      failures.push(
        `${file} ${slot.field}: ${slot.src} is ${w}px wide, need ≥ ${need}px (1.5× ${slot.maxCssPx}px render)`,
      );
    }
  }
}

if (failures.length) {
  console.error("Image resolution check failed:\n" + failures.map((f) => ` - ${f}`).join("\n"));
  process.exit(1);
}
console.log("Image resolution check passed.");
