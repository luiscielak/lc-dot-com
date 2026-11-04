import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { protoPath } from '../lib/proto'
import { useAppState } from '../state/AppState'

const days = [
  { id: 0, to: protoPath('/connect'), title: 'Connection status', detail: '2 of 3 up to date', done: true },
  { id: 1, to: protoPath('/day/1'), title: 'Needs review', detail: 'Today', done: false },
  { id: 2, to: protoPath('/day/2'), title: 'Flex Budgeting', detail: 'Or Category Budgeting', done: false },
  { id: 3, to: protoPath('/day/3'), title: 'Save up goal', detail: 'Shared', done: false },
  { id: 4, to: protoPath('/day/4'), title: 'Weekly Recap', detail: 'Oct 21–27', done: false },
  { id: 5, to: protoPath('/day/5'), title: 'Tags', detail: 'Optional', done: false },
  { id: 6, to: protoPath('/day/6'), title: 'Your first week', detail: 'Before the charge', done: false },
  { id: 7, to: protoPath('/day/7'), title: 'Rules that ran this week', detail: 'After the week', done: false },
]

export function Hub() {
  const nav = useNavigate()
  const { ridgeReauthed } = useAppState()

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/day/1'))}>Continue</Button>
          <PrototypeJump />
        </>
      }
    >
      <p className="kicker">Day 1 of 7</p>
      <h1>Your first week</h1>
      <p className="hero-num">6</p>
      <p className="muted">days left on us</p>
      <div>
        {days.map((day) => (
          <Link key={day.id} to={day.to} className="day-row" data-done={day.done}>
            <span className="day-mark">{day.done ? '✓' : ''}</span>
            <span>
              <b>
                Day {day.id} · {day.title}
              </b>
              <span className="muted">
                {day.id === 0 && ridgeReauthed ? '3 of 3 up to date' : day.detail}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Screen>
  )
}
