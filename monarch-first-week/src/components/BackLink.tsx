import { Link } from 'react-router-dom'

export function BackLink({ to, label = 'Back' }: { to: string; label?: string }) {
  return (
    <Link to={to} className="back">
      ← {label}
    </Link>
  )
}
