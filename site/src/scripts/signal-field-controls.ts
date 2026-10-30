/* Hidden tuning panel for the signal field. Never shown to visitors — the
   field script lazy-loads this only on ?debug or Shift+D. Each slider mutates
   the shared params object in place and calls onChange(key) so the field can
   rebuild the grid or repaint the mask as needed. */
import type { FieldParams } from "./signal-field";

interface Spec {
  key: keyof FieldParams;
  label: string;
  min: number;
  max: number;
  step: number;
}

const SPECS: Spec[] = [
  { key: "sp", label: "Grid spacing", min: 12, max: 60, step: 1 },
  { key: "dot", label: "Dot size", min: 1, max: 6, step: 0.5 },
  { key: "buzz", label: "Resting buzz", min: 0, max: 4, step: 0.1 },
  { key: "buzzSpeed", label: "Buzz speed", min: 0, max: 1.5, step: 0.05 },
  { key: "lensR", label: "Lens radius", min: 40, max: 400, step: 5 },
  { key: "lensPush", label: "Lens push", min: 0, max: 60, step: 1 },
  { key: "lensScatter", label: "Lens scatter", min: 0, max: 30, step: 1 },
  { key: "lensAlpha", label: "Lens brighten", min: 0, max: 1, step: 0.02 },
  { key: "orderedAlpha", label: "Dot opacity", min: 0, max: 1, step: 0.02 },
  { key: "fadeTop", label: "Fade top %", min: 0, max: 50, step: 1 },
  { key: "fadeBottom", label: "Fade bottom %", min: 20, max: 100, step: 1 },
  { key: "burstR", label: "Burst radius", min: 40, max: 320, step: 5 },
  { key: "burstKick", label: "Burst kick", min: 0, max: 1400, step: 20 },
];

export function mountControls(
  params: FieldParams,
  onChange: (key: keyof FieldParams) => void,
): { toggle: () => void } {
  const panel = document.createElement("div");
  Object.assign(panel.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "9999",
    width: "248px",
    padding: "14px 16px 12px",
    background: "rgba(16,16,18,0.92)",
    color: "var(--np-paper, #f4f1ea)",
    border: "1px solid var(--np-rule, #ffffff33)",
    borderRadius: "8px",
    font: "12px/1.5 var(--font-mono, ui-monospace, monospace)",
    letterSpacing: "0.02em",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
    backdropFilter: "blur(6px)",
    userSelect: "none",
  } as CSSStyleDeclaration);

  const heading = document.createElement("div");
  heading.textContent = "Signal field";
  Object.assign(heading.style, {
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--np-teal, #4fd1c5)",
  } as CSSStyleDeclaration);
  panel.appendChild(heading);

  for (const spec of SPECS) {
    const row = document.createElement("label");
    Object.assign(row.style, {
      display: "block",
      marginBottom: "8px",
    } as CSSStyleDeclaration);

    const top = document.createElement("div");
    Object.assign(top.style, {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2px",
    } as CSSStyleDeclaration);
    const name = document.createElement("span");
    name.textContent = spec.label;
    const val = document.createElement("span");
    val.textContent = String(params[spec.key]);
    val.style.color = "var(--np-teal, #4fd1c5)";
    top.append(name, val);

    const input = document.createElement("input");
    input.type = "range";
    input.min = String(spec.min);
    input.max = String(spec.max);
    input.step = String(spec.step);
    input.value = String(params[spec.key]);
    input.style.width = "100%";
    input.addEventListener("input", () => {
      const next = Number(input.value);
      params[spec.key] = next;
      val.textContent = String(next);
      onChange(spec.key);
    });

    row.append(top, input);
    panel.appendChild(row);
  }

  const copy = document.createElement("button");
  copy.type = "button";
  copy.textContent = "Copy settings";
  Object.assign(copy.style, {
    width: "100%",
    marginTop: "4px",
    padding: "7px 10px",
    background: "var(--np-teal, #4fd1c5)",
    color: "var(--np-ink, #101012)",
    border: "0",
    borderRadius: "5px",
    font: "inherit",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    cursor: "pointer",
  } as CSSStyleDeclaration);
  copy.addEventListener("click", () => {
    const json = JSON.stringify(params, null, 2);
    void navigator.clipboard?.writeText(json);
    const prev = copy.textContent;
    copy.textContent = "Copied";
    window.setTimeout(() => (copy.textContent = prev), 1000);
  });
  panel.appendChild(copy);

  const hint = document.createElement("div");
  hint.textContent = "Shift+D to toggle";
  Object.assign(hint.style, {
    marginTop: "8px",
    textAlign: "center",
    opacity: "0.5",
  } as CSSStyleDeclaration);
  panel.appendChild(hint);

  document.body.appendChild(panel);

  return {
    toggle() {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    },
  };
}
