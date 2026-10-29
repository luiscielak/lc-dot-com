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
import { CategoryChip } from '../components/visuals'
import { plusAnnualOnlyLine, pricing } from '../config/pricing'
import { protoPath } from '../lib/proto'
import { story } from '../data/story'
import { cancelByLabel, chargeDateLabel } from '../lib/dates'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'

const sankey = [
  { name: 'Groceries', amount: 188 },
  { name: 'Auto & transport', amount: 74 },
  { name: 'Restaurants & coffee', amount: 31 },
]

export function Day6Plans() {
  const nav = useNavigate()
  const { plan, setPlan, budgetStyle, showToast, ridgeReauthed } = useAppState()
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
          <Button onClick={() => showToast('Core annual kept. This prototype does not charge anyone.')}>
            Keep Core annual
          </Button>
          <div className="btn-stack">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => showToast('Reminder set for tomorrow. No charge in this prototype.')}
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

      <div className="card">
        <p className="kicker">Where it went</p>
        {sankey.map((row) => (
          <div key={row.name} style={{ marginTop: 10 }}>
            <div className="step" style={{ border: 0, padding: 0 }}>
              <CategoryChip category={row.name} />
              <b className="money">{usd(row.amount)}</b>
            </div>
            <div className="budget-bar under">
              <i style={{ width: `${Math.round((row.amount / 188) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="radio-card"
        data-checked={plan === 'core-annual'}
        onClick={() => setPlan('core-annual')}
        style={{ marginBottom: 8 }}
      >
        <span className="radio-dot" />
        <span>
          <b>Core annual · {pricing.core.annual.display}</b>
          <span>{pricing.core.annual.short} · {chargeDateLabel()}</span>
        </span>
      </button>
      <button
        type="button"
        className="radio-card"
        data-checked={plan === 'core-monthly'}
        onClick={() => setPlan('core-monthly')}
      >
        <span className="radio-dot" />
        <span>
          <b>Core monthly · {pricing.core.monthly.display}</b>
          <span>First charge {chargeDateLabel()}</span>
        </span>
      </button>
      <p className="muted" style={{ margin: '10px 0' }}>
        {plusAnnualOnlyLine}. Cancel by {cancelByLabel()}.
      </p>
      <BillingPlain compact />
      <button className="linkish" type="button" onClick={() => nav(protoPath('/week'))}>
        Back to the week
      </button>
      <div aria-hidden="true" style={{ height: 8 }} />
    </Screen>
  )
}
