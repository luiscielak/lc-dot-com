/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_INCLUDE_DRAFTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
