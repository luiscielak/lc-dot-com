import type { ReactNode } from 'react'
import { Banner } from './Banner'

type ScreenProps = {
  children: ReactNode
  footer?: ReactNode
}

export function Screen({ children, footer }: ScreenProps) {
  return (
    <div className="screen">
      <Banner />
      <div className="screen-scroll">{children}</div>
      {footer ? <div className="screen-footer">{footer}</div> : null}
    </div>
  )
}
