import {
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Hash,
  KeyRound,
  Smartphone,
  User,
  Wallet,
} from 'lucide-react'
import { sample } from '../lib/fixtures'
import { neverSent, sentFieldsFor, sourceLabel } from '../lib/ai'
import { groups } from '../lib/fixtures'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'
import { BottomSheet } from './BottomSheet'
import { CategoryChip } from './visuals'
import { Button } from './ui/button'

const neverIcons = [User, Hash, Wallet, KeyRound]

export function Sheets() {
  const {
    sheet,
    setSheet,
    groupIndex,
    decide,
    setGroupIndex,
    aiEnabled,
    setAiEnabled,
    aiSource,
    showToast,
  } = useAppState()
  const group = groups[groupIndex] ?? groups[0]
  const sent = sentFieldsFor(group)
  const sentRows = [
    { icon: FileText, label: 'Description', value: sent.description },
    { icon: DollarSign, label: 'Amount', value: usd(sent.amount) },
    { icon: Calendar, label: 'Date', value: `${sent.date} · ${sent.weekday}` },
    { icon: Smartphone, label: 'Application', value: sent.application },
    { icon: CreditCard, label: 'Account', value: sent.accountKind },
  ]

  if (sheet === 'ai') {
    return (
      <BottomSheet title="Insights" onClose={() => setSheet(null)}>
        <div className="card">
          <p className="kicker">Sent</p>
          <div className="ai-list">
            {sentRows.map((row) => (
              <div className="icon-row" key={row.label}>
                <span>
                  <row.icon size={16} strokeWidth={1.75} />
                  {row.label}
                </span>
                <b>{row.value}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <p className="kicker">Never sent</p>
          <div className="ai-list">
            {neverSent.map((item, index) => {
              const Icon = neverIcons[index] ?? User
              return (
                <div className="icon-row" key={item}>
                  <span>
                    <Icon size={16} strokeWidth={1.75} />
                    {item}
                  </span>
                  <b>—</b>
                </div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {(['live', 'cached', 'pre-written'] as const).map((item) => (
              <span key={item} className={`pill ${aiEnabled && aiSource === item ? 'pill-info' : ''}`}>
                {sourceLabel(item)}
              </span>
            ))}
          </div>
          <div className="toggle">
            <span>
              <b>AI suggestions</b>
              <span className="muted">Off keeps accepted work.</span>
            </span>
            <button
              type="button"
              className="switch"
              data-on={aiEnabled}
              aria-pressed={aiEnabled}
              onClick={() => setAiEnabled(!aiEnabled)}
            />
          </div>
        </div>
        <Button onClick={() => setSheet(null)}>Got it</Button>
      </BottomSheet>
    )
  }

  if (sheet === 'taxonomy') {
    return (
      <BottomSheet title="Category, tag or transfer?" onClose={() => setSheet(null)}>
        <div className="card">
          <b>Transfer</b>
          <p className="muted">Between your own accounts. Not spend.</p>
        </div>
        <div className="card">
          <b>Category</b>
          <p className="muted">What the money was for. One per transaction.</p>
        </div>
        <div className="card">
          <b>Tags</b>
          <p className="muted">An extra label, like Tax or Trip.</p>
        </div>
        <Button onClick={() => setSheet(null)}>Got it</Button>
      </BottomSheet>
    )
  }

  if (sheet === 'change') {
    return (
      <BottomSheet title="Edit" onClose={() => setSheet(null)}>
        {sample.categories.map((category) => (
          <button
            key={category}
            type="button"
            className="day-row"
            onClick={() => {
              decide(group.id, 'changed')
              showToast(`${group.merchantLabel} set to ${category}.`)
              setSheet(null)
              setGroupIndex(Math.min(groupIndex + 1, groups.length - 1))
            }}
          >
            <CategoryChip category={category} />
          </button>
        ))}
      </BottomSheet>
    )
  }

  if (sheet === 'split') {
    return (
      <BottomSheet title="Split transaction" onClose={() => setSheet(null)}>
        <div className="card">
          <b>Keep together</b>
          <p className="muted">Same merchant, one group.</p>
        </div>
        <div className="card">
          <b>Add a split</b>
          <p className="muted">Peel off a raw description that does not belong.</p>
        </div>
        <Button
          onClick={() => {
            decide(group.id, 'split')
            showToast('Group split. Leftover rows still need review.')
            setSheet(null)
            setGroupIndex(Math.min(groupIndex + 1, groups.length - 1))
          }}
        >
          Split transaction
        </Button>
        <button className="btn btn-ghost" type="button" onClick={() => setSheet(null)}>
          Keep together
        </button>
      </BottomSheet>
    )
  }

  return null
}
