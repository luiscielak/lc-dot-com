import { sample } from '../lib/fixtures'
import { neverSent, sentFieldsFor } from '../lib/ai'
import { groups } from '../lib/fixtures'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'
import { BottomSheet } from './BottomSheet'
import { CategoryChip } from './visuals'
import { Button } from './ui/button'

export function Sheets() {
  const {
    sheet,
    setSheet,
    groupIndex,
    decide,
    setGroupIndex,
    aiEnabled,
    setAiEnabled,
    showToast,
  } = useAppState()
  const group = groups[groupIndex] ?? groups[0]
  const sent = sentFieldsFor(group)

  if (sheet === 'ai') {
    return (
      <BottomSheet title="Insights" onClose={() => setSheet(null)}>
        <div className="card">
          <p className="review-merchant">{group.merchantLabel}</p>
          <p className="muted" style={{ margin: '8px 0' }}>
            Suggested
          </p>
          <CategoryChip category={group.suggestedCategory} />
          {group.why ? <p className="muted" style={{ marginTop: 12 }}>{group.why}</p> : null}
        </div>
        <div className="card">
          <p className="kicker">Looked at</p>
          <p className="review-merchant" style={{ fontSize: 16, marginTop: 8 }}>
            {sent.description}
          </p>
          <p className="muted" style={{ marginTop: 6 }}>
            {usd(sent.amount)}
          </p>
          <p className="muted" style={{ marginTop: 10 }}>
            Only the merchant string and amount are sent.
          </p>
        </div>
        <div className="card">
          <p className="kicker">Never sent</p>
          <p className="muted" style={{ marginTop: 8 }}>
            {neverSent.join(' · ')}
          </p>
          <div className="toggle" style={{ marginTop: 12 }}>
            <span>
              <b>AI suggestions</b>
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
