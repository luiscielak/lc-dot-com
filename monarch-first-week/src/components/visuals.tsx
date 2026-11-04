import { Sparkle } from 'lucide-react'
import { categoryEmoji, categoryTone, household, institutions } from '../data/visual'

export function InstitutionMark({ name }: { name: string }) {
  const mark = institutions[name] ?? { initials: name.slice(0, 2).toUpperCase(), tone: 'brown' }
  return <span className={`mark tone-${mark.tone}`}>{mark.initials}</span>
}

export function CategoryChip({ category }: { category: string }) {
  return (
    <span className={`cat-chip tone-${categoryTone(category)}`}>
      <i>{categoryEmoji(category)}</i>
      {category}
    </span>
  )
}

export function AvatarRow({ sharedId = 'maya' }: { sharedId?: string }) {
  return (
    <div className="avatar-row" aria-label="Household members">
      {household.members.map((member) => (
        <span
          key={member.id}
          className={`avatar tone-${member.tone}${member.id === sharedId ? ' avatar-shared' : ''}`}
          title={`${member.first} · ${member.shared ? 'Shared' : member.role}`}
        >
          {member.initials}
        </span>
      ))}
    </div>
  )
}

export function StatusPill({
  tone,
  children,
}: {
  tone: 'good' | 'warn' | 'danger' | 'info'
  children: string
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

export function AccountLine({
  institution,
  subtitle,
  status,
}: {
  institution: string
  subtitle: string
  status: 'healthy' | 'stale' | 'needs_reauth' | 'reauthed'
}) {
  const pill =
    status === 'healthy' || status === 'reauthed'
      ? { label: 'Up to date', tone: 'good' as const }
      : { label: 'Update', tone: status === 'stale' ? ('warn' as const) : ('danger' as const) }
  return (
    <div className="account-row">
      <InstitutionMark name={institution} />
      <div className="account-copy">
        <b>{institution}</b>
        <span className="muted">{subtitle}</span>
      </div>
      <StatusPill tone={pill.tone}>{pill.label}</StatusPill>
    </div>
  )
}

export function SparkleButton({ onClick, label = 'Insights' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className="sparkle-btn" onClick={onClick} aria-label={label}>
      <Sparkle size={18} strokeWidth={1.75} />
    </button>
  )
}

export function BudgetBar({
  spent,
  limit,
  monthPct = 58,
  state,
}: {
  spent: number
  limit: number
  monthPct?: number
  state: 'under' | 'onpace' | 'over'
}) {
  const width = Math.min(100, Math.round((spent / limit) * 100))
  return (
    <div className={`budget-bar ${state}`}>
      <i style={{ width: `${width}%` }} />
      <span className="budget-tick" style={{ left: `${monthPct}%` }} />
    </div>
  )
}
