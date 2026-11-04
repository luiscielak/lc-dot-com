export function DraftMark({ label }: { label: 'draft' | 'Luis to write' }) {
  return <span className="draft-mark">[{label}]</span>
}
