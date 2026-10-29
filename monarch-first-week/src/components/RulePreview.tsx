import { conflictFlag } from '../data/rules'

export function RulePreview({
  whenContains,
  setCategory,
}: {
  whenContains: string
  setCategory: string
}) {
  if (!whenContains) return null
  const conflict = conflictFlag(whenContains)
  return (
    <div className="card">
      <p className="kicker">Preview changes</p>
      <p style={{ margin: '0 0 8px', fontSize: 14 }}>
        If “{whenContains}” then {setCategory}.
      </p>
      {conflict ? (
        <p className="muted" style={{ margin: 0 }}>
          Wins: “{conflict.winner.whenContains}”. Loses:{' '}
          {conflict.losers.map((item) => `“${item.whenContains}”`).join(', ')}.
        </p>
      ) : (
        <p className="muted" style={{ margin: 0 }}>
          No overlapping rule.
        </p>
      )}
    </div>
  )
}
