export function DraftCallout({ children }: { children: string }) {
  return (
    <p className="todo" role="note">
      <span className="todo-label">[Luis to write]</span>{' '}
      {children}
    </p>
  )
}
