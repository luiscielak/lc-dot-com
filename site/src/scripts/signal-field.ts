/* Signal from noise.
   One dot field at rest on its grid. The resting state is order itself:
   dots hold their cells and only buzz a little in place. The cursor lens
   brightens the dots beneath the pointer. A click or tap bursts the dots
   around that point; a spring pulls them home. Hovering the period (full
   stop) eases the buzz to zero so the grid goes perfectly still. Ported
   from the motion prototype. */

interface Dot {
  hx: number;
  hy: number;
  a: number;
  p: number;
  s: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  flash: number;
}

/* Burst spring. A tap shoves nearby dots outward; these pull them home
   with a short overshoot, settled in well under a second. */
const BURST_SPRING = 80;
const BURST_DAMP = 9;

/* Live-tunable knobs. Defaults are the baked-in look; the hidden panel
   (signal-field-controls.ts) mutates this object in place. */
export interface FieldParams {
  sp: number; // grid spacing (px)
  dot: number; // dot size (px)
  buzz: number; // resting in-place jitter (px)
  buzzSpeed: number; // buzz cycles, frozen by full stop
  lensR: number; // cursor lens radius (px)
  lensPush: number; // how far the cursor shoves dots off-grid (px)
  lensScatter: number; // extra local jitter under the cursor (px)
  lensAlpha: number; // hover brighten
  orderedAlpha: number; // dot opacity at rest
  fadeTop: number; // mask fade-in from top (%)
  fadeBottom: number; // mask fade-out start (%)
  burstR: number; // click burst radius (px)
  burstKick: number; // outward speed at the center of a tap (px/s)
}

export function defaultFieldParams(small: boolean): FieldParams {
  return {
    sp: small ? 34 : 28,
    dot: 2,
    buzz: 0.8,
    buzzSpeed: 0.35,
    lensR: 170,
    lensPush: 16,
    lensScatter: 6,
    lensAlpha: 0.3,
    orderedAlpha: 0.24,
    fadeTop: 12,
    fadeBottom: 62,
    burstR: small ? 120 : 150,
    burstKick: 640,
  };
}

export function mountSignalField(): void {
  const stage = document.querySelector<HTMLElement>(".plate-stage");
  const canvas = stage?.querySelector<HTMLCanvasElement>(".plate-field");
  const period = stage?.querySelector<HTMLElement>(".plate-period");
  if (!stage || !canvas || !period) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

  const rootCS = getComputedStyle(document.documentElement);
  const DOT_COLOR = rootCS.getPropertyValue("--np-paper").trim() || "#ffffff";

  const params = defaultFieldParams(window.innerWidth < 700);

  let W = 0;
  let H = 0;
  let pts: Dot[] = [];
  let px = 0;
  let py = 0;
  let lx = 0;
  let ly = 0;
  let lens = 0;
  let hasPointer = false;
  let stop = 0;
  let stopTarget = 0;
  let clock = 0;
  let last = 0;
  let raf = 0;
  let inView = true;

  const smooth = (x: number) => x * x * (3 - 2 * x);

  function applyFade() {
    canvas!.style.setProperty("--field-fade-top", params.fadeTop + "%");
    canvas!.style.setProperty("--field-fade-bottom", params.fadeBottom + "%");
  }

  function build() {
    const r = stage!.getBoundingClientRect();
    W = r.width;
    H = r.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = Math.round(W * dpr);
    canvas!.height = Math.round(H * dpr);
    canvas!.style.width = W + "px";
    canvas!.style.height = H + "px";
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sp = params.sp;
    const cols = Math.floor(W / sp) + 1;
    const rows = Math.floor(H / sp) + 1;
    const ox = (W - (cols - 1) * sp) / 2;
    const oy = (H - (rows - 1) * sp) / 2;
    pts = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const hx = ox + i * sp;
        const hy = oy + j * sp;
        pts.push({
          hx,
          hy,
          a: Math.random() * Math.PI * 2,
          p: Math.random() * Math.PI * 2,
          s: 0.5 + Math.random() * 0.7,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          flash: 0,
        });
      }
    }
  }

  function draw(_now: number, dt: number) {
    const k = (tau: number) => 1 - Math.exp(-dt / tau);
    stop += (stopTarget - stop) * k(90); // ~280ms settle
    lens += ((hasPointer ? 1 : 0) - lens) * k(160);
    lx += (px - lx) * k(110);
    ly += (py - ly) * k(110);
    clock += dt * (1 - stop); // full stop freezes time
    const t = clock / 1000;

    ctx!.clearRect(0, 0, W, H);
    ctx!.fillStyle = DOT_COLOR;
    const lensR = params.lensR;
    const R2 = lensR * lensR;
    const dot = params.dot;
    const dtS = dt / 1000;

    // Resting grid. Dots hold their cells; a small buzz keeps the field
    // alive, and the full stop eases that buzz to zero.
    const live = 1 - stop;
    const baseBuzz = params.buzz * live;

    for (let n = 0; n < pts.length; n++) {
      const q = pts[n];

      // Tap burst — spring the shove back onto the cell. The full stop
      // bleeds the impulse away so the grid can go still.
      if (q.ox !== 0 || q.oy !== 0 || q.vx !== 0 || q.vy !== 0 || q.flash !== 0) {
        q.vx += (-BURST_SPRING * q.ox - BURST_DAMP * q.vx) * dtS;
        q.vy += (-BURST_SPRING * q.oy - BURST_DAMP * q.vy) * dtS;
        q.ox += q.vx * dtS;
        q.oy += q.vy * dtS;
        if (stop > 0.02) {
          const calm = Math.exp((-dt * stop) / 70);
          q.ox *= calm;
          q.oy *= calm;
          q.vx *= calm;
          q.vy *= calm;
          q.flash *= calm;
        }
        q.flash *= Math.exp(-dt / 220);
        if (q.flash < 0.004) q.flash = 0;
        if (
          Math.abs(q.ox) < 0.15 &&
          Math.abs(q.oy) < 0.15 &&
          Math.abs(q.vx) < 8 &&
          Math.abs(q.vy) < 8
        ) {
          q.ox = q.oy = q.vx = q.vy = 0;
        }
      }

      // Cursor lens — proximity 0..1, suppressed by the full stop.
      let f = 0;
      let dx = 0;
      let dy = 0;
      if (lens > 0.001) {
        dx = q.hx - lx;
        dy = q.hy - ly;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          f = smooth(1 - Math.sqrt(d2) / lensR) * lens * live;
        }
      }

      let x = q.hx;
      let y = q.hy;

      // Disturb — the cursor shoves nearby dots off their cells so motion
      // follows the mouse, while the rest of the field stays aligned.
      if (f > 0.001) {
        const dist = Math.hypot(dx, dy);
        if (dist > 0.001) {
          const push = params.lensPush * f;
          x += (dx / dist) * push;
          y += (dy / dist) * push;
        }
      }

      x += q.ox;
      y += q.oy;

      const buzz = baseBuzz + params.lensScatter * f;
      if (buzz > 0.001) {
        const ang = q.a + Math.sin(t * params.buzzSpeed * q.s + q.p) * 0.9;
        const rad = buzz * (0.6 + 0.4 * Math.sin(t * 0.22 * q.s + q.p * 1.7));
        x += Math.cos(ang) * rad;
        y += Math.sin(ang) * rad;
      }
      const size = dot * (1 + q.flash * 0.85);
      ctx!.globalAlpha = Math.min(1, params.orderedAlpha + params.lensAlpha * f + q.flash * 0.55);
      ctx!.fillRect(x - size / 2, y - size / 2, size, size);
    }
    ctx!.globalAlpha = 1;
  }

  function renderStatic() {
    ctx!.clearRect(0, 0, W, H);
    ctx!.fillStyle = DOT_COLOR;
    ctx!.globalAlpha = params.orderedAlpha;
    const dot = params.dot;
    for (const q of pts) ctx!.fillRect(q.hx - dot / 2, q.hy - dot / 2, dot, dot);
    ctx!.globalAlpha = 1;
  }

  function loop(now: number) {
    const dt = last ? Math.min(64, now - last) : 16;
    last = now;
    draw(now, dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (raf || rm.matches || !inView || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(loop);
  }

  function halt() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  // Cursor lens — mouse only.
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = stage.getBoundingClientRect();
    px = e.clientX - r.left;
    py = e.clientY - r.top;
    if (!hasPointer && lens < 0.01) {
      lx = px;
      ly = py;
    }
    hasPointer = true;
  });
  stage.addEventListener("pointerleave", () => {
    hasPointer = false;
  });

  // Click / tap — a short radial shove. Released without a drag so a scroll
  // or a text selection does not fire it. Links and buttons keep their own
  // clicks. The full stop refuses the burst: that gesture means stillness.
  let tapX = 0;
  let tapY = 0;
  let tapId = -1;
  let tapArmed = false;
  stage.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const target = e.target;
    if (!(target instanceof Element) || target.closest("a, button, input, textarea, select")) return;
    tapId = e.pointerId;
    tapX = e.clientX;
    tapY = e.clientY;
    tapArmed = true;
  });
  function releaseTap(e: PointerEvent) {
    if (!tapArmed || e.pointerId !== tapId) return;
    tapArmed = false;
    if (rm.matches || stopTarget > 0) return;
    const dx = e.clientX - tapX;
    const dy = e.clientY - tapY;
    if (dx * dx + dy * dy > 36) return;
    const r = stage!.getBoundingClientRect();
    burst(e.clientX - r.left, e.clientY - r.top);
  }
  stage.addEventListener("pointerup", releaseTap);
  stage.addEventListener("pointercancel", () => {
    tapArmed = false;
  });

  function burst(x: number, y: number) {
    const R = params.burstR;
    const R2 = R * R;
    const kick = params.burstKick;
    const cap = kick * 1.6;
    for (let n = 0; n < pts.length; n++) {
      const q = pts[n];
      const dx = q.hx + q.ox - x;
      const dy = q.hy + q.oy - y;
      const d2 = dx * dx + dy * dy;
      if (d2 > R2) continue;
      const dist = Math.sqrt(d2);
      const f = smooth(1 - dist / R);
      let nx: number;
      let ny: number;
      if (dist < 0.5) {
        const ang = Math.random() * Math.PI * 2;
        nx = Math.cos(ang);
        ny = Math.sin(ang);
      } else {
        nx = dx / dist;
        ny = dy / dist;
      }
      const side = (Math.random() - 0.5) * 0.65;
      const pxn = nx - ny * side;
      const pyn = ny + nx * side;
      const mag = Math.hypot(pxn, pyn) || 1;
      const speed = kick * f * (0.82 + Math.random() * 0.36);
      q.vx += (pxn / mag) * speed;
      q.vy += (pyn / mag) * speed;
      const sp = Math.hypot(q.vx, q.vy);
      if (sp > cap) {
        q.vx *= cap / sp;
        q.vy *= cap / sp;
      }
      q.flash = Math.max(q.flash, f);
    }
  }

  // Full stop — hover the period.
  period.addEventListener("pointerenter", () => {
    stopTarget = 1;
    stage.classList.add("is-full-stop");
  });
  period.addEventListener("pointerleave", () => {
    stopTarget = 0;
    stage.classList.remove("is-full-stop");
  });

  // Only run when it can be seen.
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    inView ? start() : halt();
  }).observe(stage);
  document.addEventListener("visibilitychange", () => (document.hidden ? halt() : start()));

  let rz = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(() => {
      build();
      if (rm.matches) renderStatic();
    });
  }).observe(stage);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      build();
      if (rm.matches) renderStatic();
    });
  }

  rm.addEventListener("change", () => {
    if (rm.matches) {
      halt();
      renderStatic();
    } else {
      start();
    }
  });

  // Panel callback — grid keys rebuild, fade keys repaint the mask, and the
  // running loop picks up everything else on the next frame.
  function onChange(key: keyof FieldParams) {
    if (key === "sp") build();
    if (key === "fadeTop" || key === "fadeBottom") applyFade();
    if (rm.matches) renderStatic();
  }

  // Hidden tuning panel — never shown to visitors. Lazy-loaded on ?debug or
  // Shift+D so it never ships weight to the hero on a normal visit.
  let controls: { toggle: () => void } | null = null;
  let controlsLoading = false;
  async function ensureControls() {
    if (controls) {
      controls.toggle();
      return;
    }
    if (controlsLoading) return;
    controlsLoading = true;
    const mod = await import("./signal-field-controls");
    controls = mod.mountControls(params, onChange);
    controlsLoading = false;
  }
  if (new URLSearchParams(location.search).has("debug")) void ensureControls();
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && (e.key === "D" || e.key === "d")) {
      e.preventDefault();
      void ensureControls();
    }
  });

  applyFade();
  build();
  if (rm.matches) {
    renderStatic();
  } else {
    start();
  }
}
