import { CheckCircle2, TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { CategoryChip } from '../components/visuals'
import { householdRules } from '../data/rules'
import { protoPath } from '../lib/proto'

export function Day7Fixes() {
  const nav = useNavigate()
  const held = householdRules.filter((rule) => rule.heldThisWeek > 0 && rule.neededRefix === 0)
  const refix = householdRules.filter((rule) => rule.neededRefix > 0)
  const ran = held.reduce((sum, rule) => sum + rule.heldThisWeek, 0)

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/week'))}>Back to the week</Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <p className="kicker">Day 7</p>
      <h1>Rules that ran this week</h1>
      <p className="hero-num">{ran}</p>
      <p className="muted">transactions stayed put</p>

      <div className="card" style={{ marginTop: 16 }}>
        {held.map((rule) => (
          <div className="check-row" key={rule.id}>
            <CheckCircle2 size={18} strokeWidth={1.75} color="#30A46C" />
            <span style={{ flex: 1 }}>
              “{rule.whenContains}”
              <CategoryChip category={rule.setCategory} />
            </span>
            <b>{rule.heldThisWeek}</b>
          </div>
        ))}
      </div>

      <div className="card">
        {refix.map((rule) => (
          <div className="check-row" key={rule.id}>
            <TriangleAlert size={18} strokeWidth={1.75} color="#AB6400" />
            <span style={{ flex: 1 }}>
              “{rule.whenContains}”
              <CategoryChip category={rule.setCategory} />
            </span>
            <b>{rule.neededRefix}</b>
          </div>
        ))}
      </div>
    </Screen>
  )
}
