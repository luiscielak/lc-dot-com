import { billing, money, pricing } from '../config/pricing'
import { cancelByLabel, chargeDateLabel } from '../lib/dates'
import { useAppState } from '../state/AppState'

type BillingPlainProps = {
  compact?: boolean
}

export function BillingPlain({ compact = false }: BillingPlainProps) {
  const { remindBeforeCharge, setRemindBeforeCharge, signupChannel, setSignupChannel, plan } =
    useAppState()
  const amount =
    plan === 'core-monthly' ? money(pricing.core.monthly.amount) : money(pricing.core.annual.amount)
  const planLabel = plan === 'core-monthly' ? 'Core monthly' : 'Core annual'
  const active = signupChannel === 'web' ? billing.web : billing.appStore

  return (
    <div className="card billing-card">
      <p className="kicker">Your first week is on us</p>
      {compact ? null : <p className="hero-num">7 days</p>}
      <div className="billing-facts">
        <div>
          <span className="muted">Charge</span>
          <b>{chargeDateLabel()}</b>
        </div>
        <div>
          <span className="muted">{planLabel}</span>
          <b className="money">{amount}</b>
        </div>
        <div>
          <span className="muted">Cancel by</span>
          <b>{cancelByLabel()}</b>
          <span className="muted">24 hours before the charge</span>
        </div>
      </div>
      <div className="btn-row" style={{ margin: '12px 0 10px' }}>
        <button
          type="button"
          className="chip"
          data-on={signupChannel === 'web'}
          onClick={() => setSignupChannel('web')}
        >
          Web
        </button>
        <button
          type="button"
          className="chip"
          data-on={signupChannel === 'app-store'}
          onClick={() => setSignupChannel('app-store')}
        >
          App Store
        </button>
      </div>
      <p className="billing-cancel">
        <b>{active.who}</b>
        <span className="muted">{active.cancelWhere}</span>
        {signupChannel === 'app-store' ? (
          <span className="muted">{billing.appStore.priceNote}</span>
        ) : null}
      </p>
      <p className="muted" style={{ margin: '8px 0 10px' }}>
        {billing.partnerJoinsFree}
      </p>
      <div className="toggle">
        <span>
          <b>Remind me 2 days before</b>
        </span>
        <button
          type="button"
          className="switch"
          data-on={remindBeforeCharge}
          aria-pressed={remindBeforeCharge}
          onClick={() => setRemindBeforeCharge(!remindBeforeCharge)}
        />
      </div>
    </div>
  )
}
