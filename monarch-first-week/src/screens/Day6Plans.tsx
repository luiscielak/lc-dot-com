import {
  CheckCircle2,
  Landmark,
  LayoutGrid,
  ListChecks,
  Sparkle,
  Target,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { BillingPlain } from '../components/BillingPlain'
import { protoPath } from '../lib/proto'
import { story } from '../data/story'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'

export function Day6Plans() {
  const nav = useNavigate()
  const { budgetStyle, ridgeReauthed } = useAppState()
  const connected = ridgeReauthed ? 3 : story.day6Connected
  const checks = [
    { icon: Landmark, label: 'Accounts connected', value: String(connected) },
    { icon: ListChecks, label: 'October sorted', value: String(story.transactionsIn) },
    { icon: Sparkle, label: 'Rules running', value: String(story.rulesRunning) },
    { icon: Target, label: 'Save up goal', value: String(story.sharedGoals) },
    {
      icon: LayoutGrid,
      label: budgetStyle === 'flex' ? 'Flex Budgeting' : 'Category Budgeting',
      value: 'On',
    },
  ]

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/day/7'))}>Continue</Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <p className="kicker">Day 6 of 7</p>
      <h1>Your first week is on us</h1>
      <p className="hero-num">{usd(story.weekSpend)}</p>
      <p className="muted">this week</p>

      <div className="card" style={{ marginTop: 16 }}>
        {checks.map((row) => (
          <div className="check-row" key={row.label}>
            <CheckCircle2 size={18} strokeWidth={1.75} color="#30A46C" />
            <row.icon size={16} strokeWidth={1.75} />
            <span style={{ flex: 1 }}>{row.label}</span>
            <b className="money">{row.value}</b>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <BillingPlain compact />
      </div>
      <div aria-hidden="true" style={{ height: 8 }} />
    </Screen>
  )
}
