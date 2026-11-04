import { useRef, useState, type ReactNode } from 'react'

type SwipeReviewProps = {
  children: ReactNode
  onReviewed: () => void
  onSkip: () => void
}

export function SwipeReview({ children, onReviewed, onSkip }: SwipeReviewProps) {
  const startX = useRef<number | null>(null)
  const [dx, setDx] = useState(0)

  function end(x: number) {
    if (startX.current === null) return
    const delta = x - startX.current
    startX.current = null
    setDx(0)
    if (delta > 80) onReviewed()
    else if (delta < -80) onSkip()
  }

  return (
    <div
      className="review-card"
      style={{ transform: `translateX(${dx * 0.4}px)`, transition: startX.current ? 'none' : 'transform 160ms ease-out' }}
      onPointerDown={(event) => {
        startX.current = event.clientX
      }}
      onPointerMove={(event) => {
        if (startX.current === null) return
        setDx(event.clientX - startX.current)
      }}
      onPointerUp={(event) => end(event.clientX)}
      onPointerCancel={() => {
        startX.current = null
        setDx(0)
      }}
    >
      {children}
    </div>
  )
}
