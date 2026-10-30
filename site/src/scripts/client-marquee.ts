/* Client logo marquee.
   One row drifts left. The track holds two identical groups, so the drift
   can wrap by one group width and stay seamless. On a wide viewport a single
   set of marks is narrower than the screen, so the set is repeated inside
   each group until that group covers the viewport.

   The position is a float the loop owns while drifting. Reading scrollLeft
   back every frame would drop the fraction and slow the row down. A visitor
   can still wheel, swipe, or drag; that pauses the drift, which then resumes
   from wherever the row was left. Reduced motion skips the drift entirely
   and the stylesheet wraps the marks into a static grid. */

const PX_PER_SECOND = 32;
const RESUME_AFTER_MS = 2500;

export function mountClientMarquee(): void {
  const section = document.querySelector<HTMLElement>(".plate-clients");
  const viewport = section?.querySelector<HTMLElement>(".plate-client-marquee");
  const track = section?.querySelector<HTMLElement>(".plate-client-track");
  const first = track?.querySelector<HTMLElement>(".plate-client-group");
  if (!section || !viewport || !track || !first) return;

  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (rm.matches) return;

  const seed = [...first.children].map((el) => el.cloneNode(true) as HTMLElement);

  const decorate = (li: HTMLElement) => {
    li.setAttribute("aria-hidden", "true");
    li.querySelectorAll("img").forEach((img) => {
      img.alt = "";
    });
  };

  const placeSet = (group: HTMLElement, hidden: boolean) => {
    for (const node of seed) {
      const li = node.cloneNode(true) as HTMLElement;
      if (hidden) decorate(li);
      group.append(li);
    }
  };

  let groupWidth = 0;
  let builtFor = -1;
  let pos = 0;
  let wasDrifting = false;

  const rebuild = (force = false) => {
    const groups = [...track.querySelectorAll<HTMLElement>(".plate-client-group")];
    const primary = groups[0];
    if (!primary) return;
    const view = viewport.clientWidth;
    const current = primary.getBoundingClientRect().width;
    if (!force && view === builtFor && current >= view && current > 0) {
      groupWidth = current;
      return;
    }
    builtFor = view;
    for (const group of groups) {
      const hidden = group.getAttribute("aria-hidden") === "true";
      group.replaceChildren();
      placeSet(group, hidden);
    }
    let guard = 0;
    while (guard < 8) {
      const w = primary.getBoundingClientRect().width;
      if (w <= 0 || w >= view) break;
      for (const group of groups) placeSet(group, true);
      guard++;
    }
    groupWidth = primary.getBoundingClientRect().width;
    pos = 0;
    wasDrifting = false;
    viewport.scrollLeft = 0;
  };

  rebuild();

  let userActiveUntil = 0;
  let hovering = false;
  let inView = true;
  let last = 0;
  let nowT = 0;
  let raf = 0;

  const frame = (t: number) => {
    const dt = last ? (t - last) / 1000 : 0;
    last = t;
    nowT = t;

    const drifting =
      inView &&
      !hovering &&
      !document.hidden &&
      !rm.matches &&
      groupWidth > 0 &&
      t >= userActiveUntil;

    if (drifting) {
      if (!wasDrifting) pos = viewport.scrollLeft % groupWidth;
      pos += PX_PER_SECOND * dt;
      if (pos >= groupWidth) pos -= groupWidth;
      viewport.scrollLeft = pos;
    }
    wasDrifting = drifting;

    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (raf) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const halt = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    wasDrifting = false;
  };

  const yieldToUser = () => {
    userActiveUntil = nowT + RESUME_AFTER_MS;
    wasDrifting = false;
  };

  viewport.addEventListener("wheel", yieldToUser, { passive: true });
  viewport.addEventListener("touchstart", yieldToUser, { passive: true });
  viewport.addEventListener("pointerdown", yieldToUser);
  viewport.addEventListener("pointerenter", () => (hovering = true));
  viewport.addEventListener("pointerleave", () => (hovering = false));

  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      inView ? start() : halt();
    },
    { threshold: 0 },
  ).observe(section);

  document.addEventListener("visibilitychange", () => {
    document.hidden ? halt() : inView && start();
  });

  let rz = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(() => rebuild());
  }).observe(viewport);

  // load does not bubble; capture catches clones added on a later rebuild.
  track.addEventListener(
    "load",
    (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      const primary = track.querySelector(".plate-client-group");
      const w = primary?.getBoundingClientRect().width ?? 0;
      if (w < viewport.clientWidth) rebuild(true);
      else groupWidth = w;
    },
    true,
  );

  start();
}
