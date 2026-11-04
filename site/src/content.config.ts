import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const metric = z.object({
  value: z.string(),
  label: z.string(),
  confirmed: z.boolean(),
});

/** User-research feedback. Initials avatars are derived from `name`. */
const researchQuote = z.object({
  name: z.string(),
  quote: z.string(),
  /** Participant context from the live study (not a client-testimonial title). */
  context: z.string().optional(),
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
  /** False when the image is a bare screenshot and the stage should draw the bezel. */
  framed: z.boolean().optional(),
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

const editorialStat = z.object({
  value: z.string(),
  label: z.string(),
});

const editorialCompetitor = z.object({
  app: z.string(),
  take: z.string(),
  state: z.enum(["confirmed", "not-confirmed"]).optional(),
});

const editorialJob = z.object({
  when: z.string(),
  want: z.string(),
  so: z.string(),
});

const editorialExperiment = z.object({
  name: z.string(),
  hypothesis: z.string(),
  control: z.string(),
  variant: z.string(),
  primary: z.string(),
  guardrail: z.string(),
});

const editorialPhone = z.object({
  label: z.string(),
  title: z.string().optional(),
  src: z.string(),
  alt: z.string(),
  maxCssPx: z.number().positive(),
  framed: z.boolean().optional(),
});

const editorialMethodItem = z.object({
  label: z.string(),
  body: z.string(),
});

const editorialFlow = z.object({
  label: z.string(),
  title: z.string(),
  body: z.string(),
  src: z.string(),
  poster: z.string(),
  fallbackAlt: z.string(),
  maxCssPx: z.number().positive(),
});

const editorial = z.object({
  kicker: z.string(),
  opener: z
    .object({
      heading: z.string(),
      headline: z.string(),
      body: z.string(),
      note: z.string(),
    })
    .optional(),
  method: z
    .object({
      heading: z.string(),
      headline: z.string(),
      items: z.array(editorialMethodItem).min(1),
      note: z.string(),
    })
    .optional(),
  problem: z.object({
    heading: z.string(),
    headline: z.string(),
    body: z.string(),
    note: z.string(),
  }),
  stats: z.array(editorialStat).optional(),
  field: z.object({
    heading: z.string(),
    quotes: z.array(editorialQuote).min(1),
    note: z.string(),
  }),
  competitors: z
    .object({
      heading: z.string(),
      fit: z.string(),
      axes: z.object({
        xLeft: z.string(),
        xRight: z.string(),
        yTop: z.string(),
        yBottom: z.string(),
      }),
      cells: z.object({
        longFree: z.array(editorialCompetitor).min(1),
        longCard: z.array(editorialCompetitor).min(1),
        shortFree: z.array(editorialCompetitor).min(1),
        shortCard: z.array(editorialCompetitor).min(1),
      }),
      unconfirmed: z.array(editorialCompetitor).optional(),
      aside: z.string(),
    })
    .optional(),
  weekStrip: z
    .object({
      heading: z.string(),
      caption: z.string(),
      items: z.array(editorialPhone).min(2),
    })
    .optional(),
  gallery: z
    .object({
      heading: z.string(),
      caption: z.string().optional(),
      items: z.array(editorialPhone).min(1),
    })
    .optional(),
  process: z
    .object({
      heading: z.string(),
      lofi: z.object({
        label: z.string(),
        title: z.string(),
        body: z.string(),
      }),
      midfi: editorialPhone,
      final: editorialPhone,
    })
    .optional(),
  built: z
    .object({
      heading: z.string(),
      items: z.array(z.object({ label: z.string(), body: z.string() })).min(1),
    })
    .optional(),
  bet: z
    .object({
      heading: z.string(),
      headline: z.string(),
      body: z.string(),
    })
    .optional(),
  jobs: z
    .object({
      heading: z.string(),
      items: z.array(editorialJob).min(1),
    })
    .optional(),
  experiments: z
    .object({
      heading: z.string(),
      note: z.string(),
      items: z.array(editorialExperiment).min(1),
    })
    .optional(),
  figure: z
    .object({
      title: z.string(),
      caption: z.string(),
      steps: z.array(editorialStep).min(2),
    })
    .optional(),
  flows: z
    .object({
      heading: z.string(),
      body: z.string(),
      items: z.array(editorialFlow).min(1),
    })
    .optional(),
  prototype: z
    .object({
      heading: z.string(),
      body: z.string(),
      src: z.string(),
      fullScreenHref: z.string(),
      fullScreenLabel: z.string(),
      note: z.string(),
    })
    .optional(),
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
    /** When false, the study is built but omitted from listings and “next” links. */
    listed: z.boolean().default(true),
    presentation: z.enum(["product", "editorial"]).optional(),
    editorial: editorial.optional(),
    phones: z.array(phone).optional(),
    /** Public-safe roster diagram when a team-map image is not available. */
    teamMap: z
      .object({
        caption: z.string().optional(),
      })
      .optional(),
    recreatedNote: z.string().optional(),
    researchHeading: z.enum(["Research & Insights", "Why it mattered"]).default("Research & Insights"),
    researchQuotes: z.array(researchQuote).optional(),
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
