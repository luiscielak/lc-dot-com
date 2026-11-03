# luiscielak.com

The portfolio of **Luis Cielak** — a lead product designer in Philadelphia, originally from Mexico City.

> I help product teams bring clarity to tools people rely on under pressure.
> Rooted in research. Guided by systems. Delivered with care.

For fifteen years I've designed high-stakes products — risk, finance, certification, logistics — so people can see what a system is doing and decide what to do next.

## The practice

- **User Experience** — the path through a complicated product, so the next step is obvious when it matters.
- **User Research** — time with the people doing the job, used to change the plan, not to decorate it.
- **Interface Design** — structure, rhythm, and a system so a dense product stays calm as it grows.
- **Data Visualization** — the few signals someone needs in order to decide, not every number the system can show.

## Selected work

Case studies live on the site; the writing favors honest outcomes over inflated metrics (disputed figures are kept out of the numbers).

- **Field Dispatch** (MSS Specialty Services) — a mobile-first dispatch system that replaced paper schedules, Excel, and PDFs with real-time tools for technicians and dispatchers.
- **PMI Disciplined Agile** — a global certification experience reworked into a guided, mobile-first journey.
- **PMI Partner Platform** — an enterprise authentication and admin redesign that turned promo-code fraud into Fortune 500 revenue.
- **StraatClaw** *(draft)* — a personal operating layer of AI agents, with a permission matrix and approval gates for when an agent should stop and ask.
- **Making "Compare" Actually Compare** *(draft)* — one native iOS/Android design for comparing advice tiers in an investing app.

## Contact

- Email: [luis@luiscielak.com](mailto:luis@luiscielak.com)
- LinkedIn: [cielak](https://www.linkedin.com/in/cielak)
- GitHub: [luiscielak](https://github.com/luiscielak)

---

## About this repo

The live site is a static [Astro](https://astro.build) app in [`site/`](site/) (Astro 5, MDX, TypeScript, Sharp, and [Konstrukt](https://github.com/the-hooman-loop/konstrukt)). Case studies are MDX in [`site/src/content/work/`](site/src/content/work/); `draft: true` entries are omitted from production builds.

```bash
cd site
npm install
npm run dev      # local dev server
npm run build    # production build (runs an image-resolution check)
npm run preview  # serve the built site locally
```

See [`site/README.md`](site/README.md) for more detail. The Jekyll tree at the repo root (`_config.yml`, `_pages/`, `_projects/`, `_posts/`) is the previous version of the site, kept for reference.
