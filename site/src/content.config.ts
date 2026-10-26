import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const metric = z.object({
  value: z.string(),
  label: z.string(),
  confirmed: z.boolean(),
});

const visual = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
  /** CSS max width in px this image is allowed to render at. */
  maxCssPx: z.number().positive(),
  phone: z.boolean().optional(),
});

const challenge = z.object({
  title: z.string(),
  body: z.string(),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    company: z.string().optional(),
    role: z.string().optional(),
    years: z.string().optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).default([]),
    platforms: z.string().optional(),
    tools: z.string().optional(),
    metrics: z.array(metric).default([]),
    cover: z.string(),
    coverAlt: z.string(),
    coverMaxCssPx: z.number().positive(),
    order: z.number(),
    draft: z.boolean().default(false),
    recreatedNote: z.string().optional(),
    researchHeading: z.enum(["Research & Insights", "Why it mattered"]).default("Research & Insights"),
    tldr: z.string().optional(),
    overview: z.string().optional(),
    challenges: z.array(challenge).default([]),
    solution: z.string().optional(),
    research: z.string().optional(),
    decisions: z.string().optional(),
    outcome: z.string().optional(),
    reflection: z.string().optional(),
    visuals: z
      .object({
        header: visual.optional(),
        tldr: visual.optional(),
        overview: visual.optional(),
        challenge: visual.optional(),
        solution: visual.optional(),
        research: visual.optional(),
        decisions: visual.optional(),
        outcome: visual.optional(),
        reflection: visual.optional(),
      })
      .default({}),
    video: z
      .object({
        src: z.string(),
        poster: z.string(),
        caption: z.string(),
        fallbackAlt: z.string(),
        section: z.enum(["header", "tldr", "overview", "challenge", "solution", "research", "decisions", "outcome"]),
      })
      .optional(),
  }),
});

export const collections = { work };
