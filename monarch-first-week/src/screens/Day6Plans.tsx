import {
  CheckCircle2,
  Landmark,
  LayoutGrid,
  ListChecks,
  Sparkle,
  Target,
} from 'lucide-react'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { pricing } from '../config/pricing'
import { protoPath } from '../lib/proto'
import { story } from '../data/story'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'

export function Day6Plans() {
  const { budgetStyle, ridgeReauthed, showToast } = useAppState()
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
          <p className="muted" style={{ textAlign: 'center', margin: '0 0 10px' }}>
            Your first week is on us. Then Core annual {pricing.core.annual.display}.
          </p>
          <Button onClick={() => showToast('Core annual kept. This prototype does not charge anyone.')}>
            Keep Core annual
          </Button>
          <div className="btn-stack" style={{ marginTop: 8 }}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => showToast('Reminder set. No charge in this prototype.')}
            >
              Remind me
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => showToast('Trial canceled. You will not be charged.')}
            >
              Cancel trial
            </button>
          </div>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <p className="kicker">Day 6 of 7</p>
      <h1>Your first week</h1>
      <p className="hero-num">{usd(story.weekSpend)}</p>
      <p className="muted">spent</p>

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

      <div aria-hidden="true" style={{ height: 8 }} />
    </Screen>
  )
}
