import { useNavigate } from 'react-router-dom'
import { BillingPlain } from '../components/BillingPlain'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { protoPath } from '../lib/proto'
import { useAppState } from '../state/AppState'
import type { GoalId } from '../types'

const goals: { id: GoalId; title: string; detail: string }[] = [
  { id: 'see-everything', title: 'See everything', detail: 'All accounts, one month.' },
  { id: 'stop-overspending', title: 'Stop overspending', detail: 'Know where it goes.' },
  { id: 'plan-with-partner', title: 'Plan with a household member', detail: 'Shared views, shared goals.' },
]

export function Day0Goal() {
  const nav = useNavigate()
  const { goal, setGoal } = useAppState()

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/connect'))}>Continue</Button>
          <button className="btn btn-ghost" type="button" onClick={() => nav(protoPath('/connect'))}>
            Skip for now
          </button>
          <PrototypeJump />
        </>
      }
    >
      <p className="kicker">Day 0 of 7</p>
      <h1>What do you want first?</h1>
      <div className="stack">
        {goals.map((item) => (
          <button
            key={item.id}
            type="button"
            className="radio-card"
            data-checked={goal === item.id}
            onClick={() => setGoal(item.id)}
          >
            <span className="radio-dot" />
            <span>
              <b>{item.title}</b>
              <span>{item.detail}</span>
            </span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <BillingPlain />
      </div>
    </Screen>
  )
}
