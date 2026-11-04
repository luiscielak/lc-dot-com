import { RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AccountLine } from '../components/visuals'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { protoPath } from '../lib/proto'
import { sample } from '../lib/fixtures'
import { useAppState } from '../state/AppState'

export function Day0Connect() {
  const nav = useNavigate()
  const { ridgeReauthed, setRidgeReauthed, showToast } = useAppState()
  const healthy = 2 + (ridgeReauthed ? 1 : 0)

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/week'))}>Continue with {healthy} accounts</Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath()} />
      <div className="head-row">
        <div>
          <p className="kicker">Connection status</p>
          <h1>Connect your accounts</h1>
        </div>
        <button
          className="sparkle-btn"
          type="button"
          aria-label="Refresh all"
          onClick={() => showToast('Refresh all is mocked. These three institutions tell the story.')}
        >
          <RefreshCw size={18} strokeWidth={1.75} />
        </button>
      </div>
      <p className="hero-num">{healthy} of 3</p>
      <p className="hero-delta">↑ Up to date</p>
      <div className="stack" style={{ marginTop: 16 }}>
        {sample.accounts.map((account) => {
          const status =
            account.id === 'acc-ridge' && ridgeReauthed ? 'reauthed' : account.status
          return (
            <div className="card" key={account.id}>
              <AccountLine
                institution={account.institution}
                subtitle={`${account.name} · ${account.mask}`}
                status={status}
              />
              {account.status === 'needs_reauth' && !ridgeReauthed ? (
                <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                  <Button onClick={() => setRidgeReauthed(true)}>Update</Button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => showToast('Other connections stay mocked in this prototype.')}
                  >
                    Try another institution
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <button
        className="btn btn-ghost"
        type="button"
        onClick={() => showToast('Adding more institutions is mocked. These three tell the story.')}
      >
        + Add another institution
      </button>
    </Screen>
  )
}
