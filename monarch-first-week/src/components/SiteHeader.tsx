import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Hello', to: '/#hello', kind: 'hash' as const },
  { label: 'The case', to: '/case', kind: 'route' as const },
  { label: 'Prototype', to: '/prototype', kind: 'route' as const },
  { label: 'Contact', to: '/#contact', kind: 'hash' as const },
]

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const { pathname } = useLocation()

  return (
    <header className="site-bar">
      <div className="wrap site-bar-inner">
        <Link className="site-wordmark" to="/">
          {compact ? 'Luis Cielak' : 'Luis Cielak x Monarch'}
        </Link>
        <nav aria-label="Primary">
          {links.map((link) =>
            link.kind === 'route' ? (
              <Link key={link.to} to={link.to} aria-current={pathname === link.to ? 'page' : undefined}>
                {link.label}
              </Link>
            ) : (
              <a key={link.to} href={link.to}>
                {link.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
