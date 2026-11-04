import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { AvatarRow, BudgetBar, StatusPill } from '../components/visuals'
import { protoPath } from '../lib/proto'

export function Day3Goal() {
  const nav = useNavigate()
  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/week'))}>Add goal</Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <p className="kicker">Day 3 of 7</p>
      <h1>Save up goal</h1>
      <p className="hero-num">$6,450.00</p>
      <p className="hero-delta">↑ $0.00 this week</p>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="head-row">
          <b>Emergency fund</b>
          <StatusPill tone="good">On track</StatusPill>
        </div>
        <BudgetBar spent={0} limit={6450} state="under" monthPct={0} />
        <div className="head-row" style={{ marginTop: 12 }}>
          <span className="muted">Shared</span>
          <AvatarRow />
        </div>
      </div>
    </Screen>
  )
}
