import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { SparkleButton } from '../components/visuals'
import { story } from '../data/story'
import { protoPath } from '../lib/proto'
import { useAppState } from '../state/AppState'

const steps = [
  { label: 'Connection status', time: '1 min' },
  { label: 'Transfers', time: '2 min' },
  { label: 'Merchants', time: '6 min' },
  { label: 'Rules', time: '1 min' },
]

export function Day1Intro() {
  const nav = useNavigate()
  const { sortRange, setSortRange, setSheet, setAiEnabled } = useAppState()

  function start(manual: boolean) {
    setAiEnabled(!manual)
    nav(protoPath('/day/1/sort'))
  }

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => start(false)}>Start review</Button>
          <button className="btn btn-secondary" type="button" onClick={() => start(true)}>
            Edit
          </button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <div className="head-row">
        <p className="kicker">Day 1 · Quick Sort</p>
        <SparkleButton onClick={() => setSheet('ai')} label="What the AI looks at" />
      </div>
      <h1>Needs review</h1>
      <p className="hero-num">{story.uncategorized}</p>
      <p className="muted">{story.groups} groups · about {story.reviewMinutes} min</p>
      <div style={{ display: 'flex', gap: 8, margin: '16px 0 12px' }}>
        <button className="chip" type="button" data-on={sortRange === 'month'} onClick={() => setSortRange('month')}>
          This month
        </button>
        <button className="chip" type="button" data-on={sortRange === '3months'} onClick={() => setSortRange('3months')}>
          Last 3 months
        </button>
      </div>
      {steps.map((step) => (
        <div className="step" key={step.label}>
          <span>{step.label}</span>
          <span className="muted">{step.time}</span>
        </div>
      ))}
    </Screen>
  )
}
