/** Copy shared by the résumé page and the downloadable PDF. */

export const resumeKicker = "Résumé · Design and code";

export const resumeTitle = "Lead Product Designer";
export const resumeSubtitle = "AI & Enterprise Platforms";

export const resumeLede =
  "I design complex, high-stakes enterprise and platform products across financial services, risk, and data-dense research. The through-line: making system behavior legible enough to act on — designing the surface around intelligence and multi-source data so people can see what the system is doing, how confident it is, and what to do next. I work in Figma and in code, own design systems and handoff, and run an AI-assisted design practice.";

export const resumeContacts = [
  { label: "Philadelphia Metro Area" },
  { label: "luis@luiscielak.com", href: "mailto:luis@luiscielak.com" },
  { label: "linkedin.com/in/cielak", href: "https://www.linkedin.com/in/cielak" },
  { label: "luiscielak.com", href: "https://luiscielak.com" },
] as const;

export const impact = [
  "Complex decision-support interfaces. Designed FM Portal dashboards at FM Global that surface claims, supply-chain risk, and location data from multiple systems into a single decision view.",
  "Reusable patterns at platform scale. Owned and evolved design systems across FM Global and PMI; raised development velocity 20% at PromptWorks.",
  "Designing for trust, review, and failure. Shipped high-stakes workflows at Vanguard and PMI where state must be unambiguous before a person acts.",
  "Translating user goals into system requirements. Partnered with research and domain experts at Elsevier and PMI to turn workflows into product requirements, not just screens.",
  "Technical fluency in the medium. Front-end build (HTML/CSS/JS, React), browser-based design-to-code prototyping, and an AI-assisted practice taught through Cursor Philly.",
];

export type ResumeRole = {
  dates: string[];
  datesFaint?: boolean;
  title: string;
  place: string;
  org: string;
  scale?: "lead";
  rule?: "ink";
  last?: boolean;
  summary: string;
};

export const roles: ResumeRole[] = [
  {
    dates: ["2025 — Present"],
    title: "Lead UX Product Designer",
    place: "Malvern, PA",
    org: "Vanguard",
    scale: "lead",
    rule: "ink",
    summary:
      "Own end-to-end UX for Vanguard’s digital investor experience, from discovery through shipped, reusable design decisions. Defined IA, flows, and high-fidelity designs for investor education and account journeys; delivered annotated specs and design-system-aligned components; led critique and alignment that cut late-stage rework.",
  },
  {
    dates: ["2023 — 2025", "Contract"],
    title: "Lead UX Designer",
    place: "Johnston, RI",
    org: "FM Global",
    scale: "lead",
    summary:
      "Owned design for FM Portal, a browser-based self-service platform for commercial property risk serving thousands of risk managers globally. Designed complex dashboards for claims, supply-chain risk, and location transparency; drove data-visualization patterns that made risk legible to non-expert users; evolved the design system across product areas.",
  },
  {
    dates: ["2021 — 2025"],
    title: "Digital Experience Design Lead",
    place: "Philadelphia, PA",
    org: "Project Management Institute (PMI)",
    scale: "lead",
    summary:
      "Led UX for a program-level modernization of PMI’s B2B platform, replacing manual and legacy workflows with self-service web experiences — $3.1M in revenue in the first year and $650K saved annually from fraud. Owned the Partner Platform zero-to-one (coupon distribution, certification management) and legacy modernization; translated complex requirements into scalable IA and prototypes, increasing conversions 30%. Owned research and mentored designers.",
  },
  {
    dates: ["2013 — 2026"],
    title: "Design Consultant",
    place: "Remote",
    org: "Near-Miss Management",
    scale: "lead",
    summary:
      "Designed the company’s flagship product: an interactive decision-support system that visualizes process risk and alarm data in oil refineries, increasing information transparency for a more comprehensive operator experience. Partnered with stakeholders to continuously reassess needs and improve functionality.",
  },
  {
    dates: ["2020 — 2021"],
    title: "Senior User Experience Designer",
    place: "Philadelphia, PA",
    org: "Elsevier",
    summary:
      "Modernized clinical-trial and oncology software; new UI and data-visualization patterns raised user satisfaction 30%.",
  },
  {
    dates: ["2019 — 2020"],
    title: "Senior User Experience Designer",
    place: "Philadelphia, PA",
    org: "Vanguard",
    summary:
      "Designed web-based financial planning and retirement tools for thousands of internal advisors; simplified complex investment workflows.",
  },
  {
    dates: ["2017 — 2019"],
    title: "UX Designer & UI Engineer",
    place: "Philadelphia, PA",
    org: "PromptWorks",
    summary:
      "Owned experience strategy and front-end build (HTML/CSS/JS); improved design-to-dev handoff, raising development velocity 20%; mentored junior designers.",
  },
  {
    dates: ["2016 — 2017"],
    title: "Adjunct Professor",
    place: "Philadelphia, PA",
    org: "Thomas Jefferson University",
    summary:
      "Taught graduate Interactive Design and UX Thesis courses; mentored 20+ students through end-to-end design process.",
  },
  {
    dates: ["2014 — 2017"],
    title: "Design Consultant",
    place: "Philadelphia, PA",
    org: "Mega Supply Pro",
    summary:
      "Analytics-driven design across e-commerce platforms (Shopify, Amazon, eBay), driving $1.72M in new revenue.",
  },
  {
    dates: ["2013"],
    title: "Design Consultant",
    place: "Philadelphia, PA",
    org: "Electronic Ink",
    summary:
      "Designed an operational-modeling visualization for pharmaceutical regulatory reporting across the product line.",
  },
  {
    dates: ["2008 — 2013"],
    title: "Business Management Analyst / Associate",
    place: "Newark, DE",
    org: "JP Morgan Chase",
    last: true,
    summary:
      "Built financial dashboards and web-based reporting that streamlined executive reporting and reduced print usage 80%.",
  },
];

export const competencies =
  "AI product design and human-in-the-loop workflows · Agentic experience design · Design systems and component libraries · Design-to-code prototyping · Information architecture · Complex B2B and fintech workflows · Data visualization and decision support · Research, usability and accessibility · Cross-functional facilitation · Legacy modernization";

export const languages = "English and Spanish, both fluent.";

export type ToolGroup = {
  title: string;
  accent?: boolean;
  body: string;
  note?: string;
};

export const toolGroups: ToolGroup[] = [
  {
    title: "AI & agentic workflows",
    accent: true,
    body: "Cursor · Claude · Figma MCP",
    note: "Run a role-based agent team built on Nous Research's open-source Hermes Agent.",
  },
  {
    title: "Design & prototyping",
    body: "Figma (variables, Auto Layout, Dev Mode) · design tokens · prototyping in code · WCAG accessibility",
  },
  { title: "Front end", body: "HTML · CSS/Sass · JavaScript · React · Tailwind · Git" },
  {
    title: "Methods & analytics",
    body: "OOUX · Lean UX · Agile · usability testing · Power BI · Tableau · D3.js · Python",
  },
];

export const education = [
  { degree: "MS, Interactive Design & Media", school: "Thomas Jefferson University · 2014" },
  { degree: "BS, Management Information Systems", school: "Florida State University · 2008" },
] as const;

export const certifications = [
  "Certified OOUX Strategist — Rewired UX Studio, 2024",
  "UX Certificate — Nielsen Norman Group, 2024",
] as const;

export const communityTitle = "Founder and Cursor Ambassador, Cursor Philly";
export const communitySince = "since Aug 2025";
export const communityBody =
  "Grew a Philadelphia community of 1,000+ builders working with AI. Host monthly meetups and hands-on workshops.";

export const resumeFoot = "Luis Cielak — Résumé — 2026";
export const resumePdfHref = "/luis-cielak-resume.pdf";
