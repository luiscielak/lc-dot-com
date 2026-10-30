#!/usr/bin/env node
/**
 * Rasterizes public/og-default.svg to public/og-default.png (1200×630).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(ROOT, "public/og-default.svg"));
const png = await sharp(svg).resize(1200, 630).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(join(ROOT, "public/og-default.png"), png);
console.log("Wrote public/og-default.png");
