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
  const poster = block.match(/\n  poster:\\s*"([^"]+)"/);
  if (poster) {
    visuals.push({ src: poster[1], maxCssPx: 400, field: "video.poster" });
  }
  const phones = block.split(/\nphones:\n/)[1];
  if (phones) {
    const rest = phones.split(/\n[a-z]+:/)[0];
    const items = [...rest.matchAll(/\n  - [\s\S]*?src:\s*"([^"]+)"/g)];
    items.forEach((m, i) => {
      visuals.push({ src: m[1], maxCssPx: PHONE_MAX, field: `phones[${i}]` });
    });
  }
  const vis = block.split(/\nvisuals:\n/)[1];
  if (!vis) return visuals;
  const rest = vis.split(/\n(?:metrics|video|---)/)[0];
  const chunks = rest.split(/\n  [a-z]+:\n/).slice(1);
  const names = [...rest.matchAll(/\n  ([a-z]+):\n/g)].map((x) => x[1]);
  names.forEach((name, i) => {
    const chunk = chunks[i];
    if (!chunk) return;
    const src = chunk.match(/src:\s*"([^"]+)"/)?.[1];
    const maxCssPx = Number(chunk.match(/maxCssPx:\s*([0-9]+)/)?.[1]);
    if (src && maxCssPx) visuals.push({ src, maxCssPx, field: `visuals.${name}` });
  });
  return visuals;
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
