import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/work/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export function workImage(src: string): ImageMetadata {
  const key = `../assets/work/${src.replace(/^\/+/, "")}`;
  const mod = modules[key];
  if (!mod) {
    throw new Error(`Missing work image: ${src} (looked up ${key})`);
  }
  return mod.default;
}
