import type { ReactNode } from 'react'

type BottomSheetProps = {
  title: string
  children: ReactNode
  onClose: () => void
}

export function BottomSheet({ title, children, onClose }: BottomSheetProps) {
  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <h2 className="title" style={{ fontSize: 20, position: 'sticky', top: 0, background: 'var(--color-bg-raised)' }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
