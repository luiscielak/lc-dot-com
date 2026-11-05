import type { ReactNode } from 'react'

type ScreenProps = {
  children: ReactNode
  footer?: ReactNode
}

export function Screen({ children, footer }: ScreenProps) {
  return (
    <div className="screen">
      <div className="screen-scroll">{children}</div>
      {footer ? <div className="screen-footer">{footer}</div> : null}
    </div>
  )
}
