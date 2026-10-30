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
  /** False when the image is a bare screenshot and the figure should draw the bezel. */
  framed: z.boolean().optional(),
});

const clip = z.object({
  src: z.string(),
  poster: z.string(),
  caption: z.string(),
  fallbackAlt: z.string(),
  section: z.enum(["header", "tldr", "overview", "challenge", "solution", "research", "decisions", "outcome"]),
  maxCssPx: z.number().positive(),
  phone: z.boolean().optional(),
});

const challenge = z.object({
  title: z.string(),
  body: z.string(),
});

const phone = z.object({
  label: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
});

const featureStageItem = z.object({
  label: z.string(),
  title: z.string(),
  body: z.string(),
  src: z.string(),
  alt: z.string(),
  /** CSS max width in px this phone is allowed to render at. */
  maxCssPx: z.number().positive(),
  /** False when the image is a bare screenshot and the stage should draw the bezel. */
  framed: z.boolean().optional(),
});

/**
 * Editorial presentation (Paper "Case 03 — Dispatch" layout). Short sections:
 * a problem block with a side note, two pull quotes, a horizontal step diagram,
 * and three closing cells. Only read when `presentation === "editorial"`.
 */
const editorialQuote = z.object({
  text: z.string(),
  cite: z.string(),
});

const editorialStep = z.object({
  label: z.string(),
  title: z.string(),
});

const editorialCell = z.object({
  value: z.string(),
  label: z.string(),
});

const editorial = z.object({
  kicker: z.string(),
  problem: z.object({
    heading: z.string(),
    headline: z.string(),
    body: z.string(),
    note: z.string(),
  }),
  field: z.object({
    heading: z.string(),
    quotes: z.array(editorialQuote).min(1),
    note: z.string(),
  }),
  figure: z.object({
    title: z.string(),
    caption: z.string(),
    steps: z.array(editorialStep).min(2),
  }),
  close: z.object({
    heading: z.string(),
    cells: z.array(editorialCell).length(3),
  }),
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
    presentation: z.enum(["product", "editorial"]).optional(),
    editorial: editorial.optional(),
    phones: z.array(phone).optional(),
    recreatedNote: z.string().optional(),
    researchHeading: z.enum(["Research & Insights", "Why it mattered"]).default("Research & Insights"),
    tldr: z.string(),
    overview: z.string(),
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
    /** Extra figures for a section, after the single visual already in `visuals`. */
    gallery: z
      .object({
        header: z.array(visual).optional(),
        tldr: z.array(visual).optional(),
        overview: z.array(visual).optional(),
        challenge: z.array(visual).optional(),
        solution: z.array(visual).optional(),
        research: z.array(visual).optional(),
        decisions: z.array(visual).optional(),
        outcome: z.array(visual).optional(),
      })
      .optional(),
    clips: z.array(clip).optional(),
    video: z
      .object({
        src: z.string(),
        poster: z.string(),
        caption: z.string(),
        fallbackAlt: z.string(),
        section: z.enum(["header", "tldr", "overview", "challenge", "solution", "research", "decisions", "outcome"]),
      })
      .optional(),
    featureStage: z
      .object({
        heading: z.string(),
        items: z.array(featureStageItem).min(1),
      })
      .optional(),
  }),
});

export const collections = { work };
