import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { SparkleButton } from '../components/visuals'
import { protoPath } from '../lib/proto'
import { useAppState } from '../state/AppState'

const tags = [
  { id: 'Tax', tone: 'brown' },
  { id: 'Reimbursable', tone: 'teal' },
  { id: 'Trip', tone: 'purple' },
]

export function Day5Tags() {
  const nav = useNavigate()
  const { setSheet } = useAppState()
  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/week'))}>Add tags</Button>
          <button className="btn btn-ghost" type="button" onClick={() => nav(protoPath('/week'))}>
            Skip for now
          </button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <div className="head-row">
        <p className="kicker">Day 5 · optional</p>
        <SparkleButton onClick={() => setSheet('taxonomy')} label="Category, tag or transfer?" />
      </div>
      <h1>Tags</h1>
      <p className="hero-num">3</p>
      <p className="muted">across categories</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        {tags.map((tag) => (
          <span key={tag.id} className={`tag-chip tone-${tag.tone}`}>
            #{tag.id}
          </span>
        ))}
      </div>
    </Screen>
  )
}
