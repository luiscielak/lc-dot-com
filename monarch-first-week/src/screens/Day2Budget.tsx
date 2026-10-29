import { useNavigate } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { BudgetBar, CategoryChip, SparkleButton, StatusPill } from '../components/visuals'
import { story } from '../data/story'
import { protoPath } from '../lib/proto'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'

export function Day2Budget() {
  const nav = useNavigate()
  const { budgetStyle, setBudgetStyle, setSheet } = useAppState()
  const flexLeft = story.flex.flexibleLeft

  return (
    <Screen
      footer={
        <>
          <Button onClick={() => nav(protoPath('/week'))}>
            Use {budgetStyle === 'flex' ? 'Flex Budgeting' : 'Category Budgeting'}
          </Button>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/week')} />
      <div className="head-row">
        <p className="kicker">Day 2 of 7</p>
        <SparkleButton onClick={() => setSheet('taxonomy')} label="Budget help" />
      </div>
      <h1>Flex Budgeting</h1>
      <p className="hero-num">{usd(flexLeft)}</p>
      <p className="hero-delta">left to budget</p>

      <button
        type="button"
        className="radio-card"
        data-checked={budgetStyle === 'flex'}
        onClick={() => setBudgetStyle('flex')}
        style={{ margin: '16px 0 10px' }}
      >
        <span className="radio-dot" />
        <span style={{ flex: 1 }}>
          <span className="head-row">
            <b>Flex Budgeting</b>
            <StatusPill tone="good">On track</StatusPill>
          </span>
          <BudgetBar spent={story.flex.fixed} limit={story.flex.fixed + flexLeft} state="under" />
          <span className="muted">
            Fixed {usd(story.flex.fixed)} · Flex {usd(flexLeft)} left
          </span>
        </span>
      </button>

      <button
        type="button"
        className="radio-card"
        data-checked={budgetStyle === 'per-category'}
        onClick={() => setBudgetStyle('per-category')}
      >
        <span className="radio-dot" />
        <span style={{ flex: 1 }}>
          <span className="head-row">
            <b>Category Budgeting</b>
            <StatusPill tone="warn">At risk</StatusPill>
          </span>
          {story.perCategory.map((row) => (
            <span key={row.name} style={{ display: 'block', marginTop: 8 }}>
              <CategoryChip category={row.name.startsWith('Groceries') ? 'Groceries' : 'Restaurants & coffee'} />
              <BudgetBar
                spent={row.spent}
                limit={row.limit}
                state={row.spent > row.limit ? 'over' : 'under'}
              />
              <span className="muted">
                {usd(row.spent)} / {usd(row.limit)}
              </span>
            </span>
          ))}
        </span>
      </button>
    </Screen>
  )
}
