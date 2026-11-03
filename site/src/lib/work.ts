import { getCollection, type CollectionEntry } from "astro:content";

/** Drafts stay in `astro dev`. Production omits them unless this flag is set at build. */
export function includeDrafts(): boolean {
  return import.meta.env.DEV || import.meta.env.PUBLIC_INCLUDE_DRAFTS === "true";
}

export async function getPublishedWork(): Promise<CollectionEntry<"work">[]> {
  const studies = await getCollection("work", ({ data }) => includeDrafts() || !data.draft);
  return studies.sort((a, b) => a.data.order - b.data.order);
}
