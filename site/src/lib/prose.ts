function inline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export function renderProse(text: string): string {
  const chunks = text.trim().split(/\n\n+/);
  return chunks
    .map((chunk) => {
      const lines = chunk.split("\n");
      if (lines.every((l) => l.startsWith("|"))) {
        const rows = lines.map((l) =>
          l
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim()),
        );
        const body = rows
          .filter((r) => !r.every((c) => /^[-:]+$/.test(c)))
          .map((r, i) => {
            const tag = i === 0 ? "th" : "td";
            return `<tr>${r.map((c) => `<${tag}>${inline(c)}</${tag}>`).join("")}</tr>`;
          })
          .join("");
        return `<table>${body}</table>`;
      }
      if (lines.every((l) => l.startsWith("- "))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
      }
      return `<p>${inline(chunk.replace(/\n/g, " "))}</p>`;
    })
    .join("");
}
