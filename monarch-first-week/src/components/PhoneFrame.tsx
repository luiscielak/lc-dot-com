import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [embedded, setEmbedded] = useState(
    () => typeof window !== 'undefined' && window.self !== window.top,
  )

  useEffect(() => {
    setEmbedded(window.self !== window.top)
  }, [])

  return (
    <div className={embedded ? 'stage stage-embed' : 'stage'}>
      <div className="phone" role="application" aria-label="Your First Week prototype">
        <div className="phone-notch" aria-hidden="true" />
        <div className="status-bar" aria-hidden="true">
          <span>9:41</span>
          <span>●●●●</span>
        </div>
        {children}
      </div>
      {embedded ? null : (
        <p className="desk-note">
          <Link to="/">Case study</Link>
          <br />
          Unofficial concept for Luis Cielak’s portfolio. Phone-sized 390×844. Mock household,
          mock institutions, mock prices as of Oct 29, 2026.
        </p>
      )}
    </div>
  )
}
