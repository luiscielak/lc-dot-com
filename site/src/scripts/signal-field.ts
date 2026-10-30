/* Signal from noise.
   One dot field, one variable: order (0 = scattered, 1 = grid).
   Everything — ambient loop, cursor lens, load ripple, full stop —
   only ever pushes dots toward order. Nothing moves away from it
   in response to the visitor. Ported from the motion prototype. */

interface Dot {
  hx: number;
  hy: number;
  d: number;
  a: number;
  r: number;
  p: number;
  s: number;
  al: number;
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
  const STRENGTH = 1;
  const DOT = 2; // px — the period, scaled down
  const LOOP_S = 16; // ambient breathe (s)
  const RIPPLE_V = 900; // px/s
  const RIPPLE_DELAY = 450; // ms after load — text is already readable
  const SNAP_S = 0.35; // ripple snap ≈ --np-dur-3
  const DECAY_S = 1.8; // relax back to ambient
  const LENS_R = 170; // cursor lens radius (px)
  const ORDERED_ALPHA = 0.24 * STRENGTH;
  const NOISE_ALPHA = [0.1 * STRENGTH, 0.22 * STRENGTH]; // min, range
  const LENS_ALPHA = 0.3 * STRENGTH;

  let W = 0;
  let H = 0;
  let pts: Dot[] = [];
  const origin = { x: 0, y: 0 };
  let maxD = 0;
  let px = 0;
  let py = 0;
  let lx = 0;
  let ly = 0;
  let lens = 0;
  let hasPointer = false;
  let stop = 0;
  let stopTarget = 0;
  let rippleAt: number | null = null;
  let clock = 0;
  let last = 0;
  let raf = 0;
  let inView = true;

  const smooth = (x: number) => x * x * (3 - 2 * x);

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

    const pr = period!.getBoundingClientRect();
    origin.x = pr.left + pr.width / 2 - r.left;
    origin.y = pr.top + pr.height * 0.8 - r.top;

    const sp = W < 700 ? 34 : 28; // thinner field on small screens
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
          d: Math.hypot(hx - origin.x, hy - origin.y),
          a: Math.random() * Math.PI * 2,
          r: 10 + Math.random() * 16,
          p: Math.random() * Math.PI * 2,
          s: 0.5 + Math.random() * 0.7,
          al: NOISE_ALPHA[0] + Math.random() * NOISE_ALPHA[1],
        });
      }
    }
    maxD = Math.max(
      Math.hypot(origin.x, origin.y),
      Math.hypot(W - origin.x, origin.y),
      Math.hypot(origin.x, H - origin.y),
      Math.hypot(W - origin.x, H - origin.y),
    );
  }

  function draw(now: number, dt: number) {
    const k = (tau: number) => 1 - Math.exp(-dt / tau);
    stop += (stopTarget - stop) * k(90); // ~280ms settle
    lens += ((hasPointer ? 1 : 0) - lens) * k(160);
    lx += (px - lx) * k(110);
    ly += (py - ly) * k(110);
    clock += dt * (1 - stop); // full stop freezes time
    const t = clock / 1000;
    const amb = 0.55 + 0.3 * Math.sin((t * 2 * Math.PI) / LOOP_S);

    let rt: number | null = null;
    if (rippleAt !== null) {
      rt = (now - rippleAt) / 1000;
      if (rt > maxD / RIPPLE_V + DECAY_S * 5) {
        rippleAt = null;
        rt = null;
      }
    }

    ctx!.clearRect(0, 0, W, H);
    ctx!.fillStyle = DOT_COLOR;
    const R2 = LENS_R * LENS_R;

    for (let n = 0; n < pts.length; n++) {
      const q = pts[n];
      let o = amb;

      if (rt !== null) {
        const passed = rt - q.d / RIPPLE_V;
        if (passed < 0) o = 0; // still noise
        else if (passed < SNAP_S) o = smooth(passed / SNAP_S); // front snaps
        else o = Math.max(amb, Math.exp(-(passed - SNAP_S) / DECAY_S));
      }

      let f = 0;
      if (lens > 0.001) {
        const dx = q.hx - lx;
        const dy = q.hy - ly;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          f = smooth(1 - Math.sqrt(d2) / LENS_R) * lens;
          o += (1 - o) * f;
        }
      }
      o += (1 - o) * stop;

      const noise = 1 - o;
      let x = q.hx;
      let y = q.hy;
      if (noise > 0.001) {
        const ang = q.a + Math.sin(t * 0.35 * q.s + q.p) * 0.9;
        const rad = q.r * (0.75 + 0.25 * Math.sin(t * 0.22 * q.s + q.p * 1.7)) * noise;
        x += Math.cos(ang) * rad;
        y += Math.sin(ang) * rad;
      }
      ctx!.globalAlpha = Math.min(1, q.al * noise + ORDERED_ALPHA * o + LENS_ALPHA * f);
      ctx!.fillRect(x - DOT / 2, y - DOT / 2, DOT, DOT);
    }
    ctx!.globalAlpha = 1;
  }

  function renderStatic() {
    ctx!.clearRect(0, 0, W, H);
    ctx!.fillStyle = DOT_COLOR;
    ctx!.globalAlpha = ORDERED_ALPHA;
    for (const q of pts) ctx!.fillRect(q.hx - DOT / 2, q.hy - DOT / 2, DOT, DOT);
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

  build();
  if (rm.matches) {
    renderStatic();
  } else {
    rippleAt = performance.now() + RIPPLE_DELAY;
    start();
  }
}
