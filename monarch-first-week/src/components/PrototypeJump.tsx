import { Link, useLocation } from 'react-router-dom'
import { isDebugNav, protoPath, withDebug } from '../lib/proto'

const jumps = [
  { to: '/', label: 'Case' },
  { to: protoPath(), label: '0' },
  { to: protoPath('/connect'), label: 'Sync' },
  { to: protoPath('/week'), label: 'Hub' },
  { to: protoPath('/day/1'), label: 'Sort' },
  { to: protoPath('/day/1/sort'), label: 'Card' },
  { to: protoPath('/day/1/sort?group=g-harbor-autopay'), label: 'Xfer' },
  { to: protoPath('/day/1/sort?group=g-oak-pine'), label: 'Low' },
  { to: protoPath('/day/1/sort?group=g-daily-grind&sheet=ai'), label: 'AI' },
  { to: protoPath('/day/2'), label: '2' },
  { to: protoPath('/day/4'), label: 'Recap' },
  { to: protoPath('/day/6'), label: '6' },
  { to: protoPath('/day/7'), label: '7' },
]

export function PrototypeJump() {
  const { search } = useLocation()
  if (!isDebugNav(search)) return null

  return (
    <nav className="proto" aria-label="Prototype jump">
      {jumps.map((jump) => (
        <Link key={jump.to} to={withDebug(jump.to)}>
          {jump.label}
        </Link>
      ))}
    </nav>
  )
}
