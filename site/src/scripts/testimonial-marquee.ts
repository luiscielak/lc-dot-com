/* Testimonials marquee.
   One row of quote cards drifts left on its own. It is a real horizontal
   scroller, so a visitor can also wheel, swipe, or drag through it, and the
   prev/next arrows page it by a card. The track holds two identical groups,
   so the drift can wrap by one group width and stay seamless.

   Both the drift and the arrow glide write scrollLeft directly from the same
   loop (never the native smooth-scroll API, which the two would otherwise
   cancel for each other). Any visitor scroll cancels an in-flight glide and
   pauses the drift, which then resumes from wherever the row was left.
   Reduced motion drops the drift and eases; the arrows jump and native
   scrolling still works, since those only move on a visitor's action. */

const GROUP_TRAVEL_SECONDS = 90; // seconds for the drift to cross one group
const STEP_DURATION_MS = 450; // eased glide for one arrow press
const RESUME_AFTER_MS = 2500; // idle time before the drift picks back up

type Tween = { from: number; to: number; start: number };

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function mountTestimonialMarquee(): void {
  const section = document.querySelector<HTMLElement>(".plate-quotes--cards");
  const viewport = section?.querySelector<HTMLElement>(".plate-quote-marquee");
  const group = section?.querySelector<HTMLElement>(".plate-quote-group");
  const prev = section?.querySelector<HTMLElement>('[data-marquee="prev"]');
  const next = section?.querySelector<HTMLElement>('[data-marquee="next"]');
  if (!section || !viewport || !group) return;

  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

  let groupWidth = group.getBoundingClientRect().width;
  let cardStep = groupWidth;
  const measure = () => {
    groupWidth = group.getBoundingClientRect().width;
    const card = group.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(group).columnGap) || 0;
    cardStep = card ? card.getBoundingClientRect().width + gap : groupWidth;
  };
  measure();

  const wrap = (x: number): number => {
    if (groupWidth <= 0) return x;
    return ((x % groupWidth) + groupWidth) % groupWidth;
  };

  let userActiveUntil = 0;
  let hovering = false;
  let focused = false;
  let inView = true;
  let tween: Tween | null = null;
  let last = 0;
  let nowT = 0; // latest rAF timestamp, so event handlers share its clock
  let raf = 0;

  // Both the drift and the arrow glide write scrollLeft directly, so there is
  // no native smooth-scroll animation for one to cancel the other. All timing
  // uses the rAF timestamp: in this host it does not share an origin with
  // performance.now(), so the two must never be mixed.
  const frame = (t: number) => {
    const dt = last ? (t - last) / 1000 : 0;
    last = t;
    nowT = t;

    if (tween) {
      if (tween.start < 0) tween.start = t; // pin the glide to the rAF clock
      const k = Math.min(1, Math.max(0, (t - tween.start) / STEP_DURATION_MS));
      viewport.scrollLeft = tween.from + (tween.to - tween.from) * easeOutCubic(k);
      if (k >= 1) {
        viewport.scrollLeft = wrap(tween.to);
        tween = null;
      }
    } else {
      const drifting =
        inView &&
        !hovering &&
        !focused &&
        !document.hidden &&
        !rm.matches &&
        groupWidth > 0 &&
        t >= userActiveUntil;
      if (drifting) {
        // Nudge forward from wherever the row sits, so the drift cooperates
        // with a visitor's own scrolling instead of overriding it.
        let sl = viewport.scrollLeft + (groupWidth / GROUP_TRAVEL_SECONDS) * dt;
        if (sl >= groupWidth) sl -= groupWidth; // seamless: next group is a copy
        viewport.scrollLeft = sl;
      }
    }

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
  };

  const hold = () => {
    userActiveUntil = nowT + RESUME_AFTER_MS;
  };

  const nudge = (dir: number) => {
    hold();
    let from = viewport.scrollLeft;
    let to = from + dir * cardStep;
    // Scrolling before the first card? Jump to the identical copy one group
    // over so there is always room to glide left.
    if (to < 0 && groupWidth > 0) {
      from += groupWidth;
      to += groupWidth;
      viewport.scrollLeft = from;
    }
    if (rm.matches) {
      viewport.scrollLeft = wrap(to);
      return;
    }
    tween = { from, to, start: -1 }; // start pinned to the rAF clock on first frame
  };
  prev?.addEventListener("click", () => nudge(-1));
  next?.addEventListener("click", () => nudge(1));

  // Any manual scrolling yields the drift for a beat, then it resumes.
  const yieldToUser = () => {
    tween = null;
    hold();
  };
  viewport.addEventListener("wheel", yieldToUser, { passive: true });
  viewport.addEventListener("touchstart", yieldToUser, { passive: true });
  viewport.addEventListener("pointerdown", yieldToUser);

  viewport.addEventListener("pointerenter", () => (hovering = true));
  viewport.addEventListener("pointerleave", () => (hovering = false));
  section.addEventListener("focusin", () => (focused = true));
  section.addEventListener("focusout", () => (focused = false));

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
    rz = requestAnimationFrame(measure);
  }).observe(viewport);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }

  start();
}
