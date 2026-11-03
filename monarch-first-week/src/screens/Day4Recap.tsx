import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { AvatarRow, SparkleButton } from '../components/visuals'
import { story } from '../data/story'
import { protoPath } from '../lib/proto'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'

export function Day4Recap() {
  const { showToast, setSheet } = useAppState()

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => showToast('Invite is mocked. Preview stays in this phone.')}>
            Share
          </Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <div className="head-row">
        <p className="kicker">Day 4 · {story.weekRange}</p>
        <SparkleButton onClick={() => setSheet('ai')} label="Insights" />
      </div>
      <h1>Weekly Recap</h1>
      <div className="stat-tiles" style={{ marginTop: 12 }}>
        <div className="stat-tile">
          <p className="hero-num">{usd(story.weekSpend)}</p>
          <span className="muted">Spent</span>
        </div>
        <div className="stat-tile">
          <p className="hero-num hero-delta" style={{ margin: 0 }}>
            ↑ ${story.weekUnderPace}
          </p>
          <span className="muted">Under pace</span>
        </div>
        <div className="stat-tile">
          <p className="hero-num">{usd(story.topMerchants[0].amount)}</p>
          <span className="muted">{story.topMerchants[0].name}</span>
        </div>
        <div className="stat-tile">
          <p className="hero-num">${story.weekendOverBy}</p>
          <span className="muted">Weekend over</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="head-row">
          <b>Share with a member</b>
          <AvatarRow />
        </div>
      </div>
    </Screen>
  )
}
