import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { Screen } from '../components/Screen'
import { SwipeReview } from '../components/SwipeReview'
import { AccountLine, AvatarRow, CategoryChip, SparkleButton } from '../components/visuals'
import { conflictFlag, householdRules } from '../data/rules'
import { requestQuickSort } from '../lib/ai'
import { protoPath } from '../lib/proto'
import { groupTotal, groups, sample } from '../lib/fixtures'
import { usd } from '../lib/money'
import { useAppState } from '../state/AppState'
import type { SuggestionGroup } from '../types'

export function Day1Sort() {
  const nav = useNavigate()
  const {
    groupIndex,
    setGroupIndex,
    decide,
    undo,
    rulesOn,
    setRuleOn,
    aiEnabled,
    setAiEnabled,
    setAiSource,
    setSheet,
    showToast,
    ridgeReauthed,
    setRidgeReauthed,
  } = useAppState()
  const [params] = useSearchParams()
  const group = groups[groupIndex] ?? groups[0]
  const [liveGroup, setLiveGroup] = useState<SuggestionGroup>(group)

  useEffect(() => {
    const wanted = params.get('group')
    const sheet = params.get('sheet')
    if (wanted) {
      const idx = groups.findIndex((item) => item.id === wanted)
      if (idx >= 0) setGroupIndex(idx)
    } else if (sheet === 'ai') {
      const grind = groups.findIndex((item) => item.id === 'g-daily-grind')
      if (grind >= 0) setGroupIndex(grind)
    }
    if (sheet === 'ai') setSheet('ai')
    if (sheet === 'taxonomy') setSheet('taxonomy')
  }, [params, setGroupIndex, setSheet])

  useEffect(() => {
    let cancelled = false
    setLiveGroup(group)
    if (!aiEnabled || group.kind === 'sync' || group.kind === 'rules') return
    void requestQuickSort(group).then((result) => {
      if (cancelled) return
      setAiSource(result.source)
      setLiveGroup(result.group)
    })
    return () => {
      cancelled = true
    }
  }, [aiEnabled, group, setAiSource])

  const count = liveGroup.transactionIds.length
  const isTransfer = liveGroup.kind === 'transfer'
  const isSync = liveGroup.kind === 'sync'
  const isRules = liveGroup.kind === 'rules'
  const lowConfidence = liveGroup.confidence !== 'likely' && !isSync && !isRules
  const reviewQueue = groups.filter((item) => item.kind === 'merchant' || item.kind === 'transfer')
  const queueIndex = reviewQueue.findIndex((item) => item.id === liveGroup.id)
  const nextPeek = queueIndex >= 0 ? reviewQueue[queueIndex + 1] : undefined
  const queueHint =
    queueIndex >= 0 ? `${queueIndex + 1} of ${reviewQueue.length} groups` : null

  function goNext() {
    if (groupIndex >= groups.length - 1) {
      showToast('You reviewed everything!')
      nav(protoPath('/day/2'))
      return
    }
    setGroupIndex(groupIndex + 1)
  }

  function onDecide(kind: 'accepted' | 'changed' | 'skipped' | 'split' | 'transfer') {
    decide(liveGroup.id, kind)
    showToast(
      kind === 'skipped'
        ? 'Skipped for now.'
        : kind === 'accepted' || kind === 'transfer'
          ? `${liveGroup.merchantLabel} marked as reviewed.`
          : `${liveGroup.merchantLabel} marked ${kind}.`,
    )
    goNext()
  }

  function sortMyself() {
    setAiEnabled(false)
    if (isSync || isRules) {
      showToast('Editing by hand. Suggestions stay off.')
      return
    }
    setSheet('change')
  }

  return (
    <Screen
      footer={
        <>
          {isSync ? (
            <Button onClick={() => onDecide('accepted')}>Continue to transfers</Button>
          ) : isRules ? (
            <Button onClick={() => onDecide('accepted')}>Create rule</Button>
          ) : isTransfer ? (
            <div className="btn-row">
              <Button onClick={() => onDecide('transfer')}>It&rsquo;s a transfer</Button>
              <button className="btn btn-secondary" type="button" onClick={() => onDecide('accepted')}>
                It&rsquo;s spending
              </button>
            </div>
          ) : (
            <div className="btn-row-3">
              <Button onClick={() => onDecide('accepted')}>Accept</Button>
              <button className="btn btn-secondary" type="button" onClick={sortMyself}>
                Change
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => onDecide('skipped')}>
                Skip
              </button>
            </div>
          )}
          {isTransfer || isSync || isRules ? (
            <nav className="footer-links" aria-label="Review extras">
              <button className="linkish" type="button" onClick={sortMyself}>
                Edit
              </button>
              <button className="linkish" type="button" onClick={() => undo()}>
                Undo
              </button>
            </nav>
          ) : null}
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/day/1')} />
      <div className="head-row">
        <p className="kicker">Needs review</p>
        {!isSync && !isRules ? (
          <SparkleButton onClick={() => setSheet('ai')} label="Insights" />
        ) : null}
      </div>
      {isSync || isRules || isTransfer ? (
        <h1>
          {isSync ? 'Connection status' : isRules ? 'Create rule' : 'Looks like a transfer'}
        </h1>
      ) : null}

      {isSync ? (
        <>
          <p className="hero-num">2</p>
          <p className="muted">institutions need an update</p>
          <div className="stack" style={{ marginTop: 16 }}>
            {sample.accounts
              .filter((account) => account.status !== 'healthy')
              .map((account) => {
                const status =
                  account.id === 'acc-ridge' && ridgeReauthed ? 'reauthed' : account.status
                return (
                  <div className="card" key={account.id}>
                    <AccountLine
                      institution={account.institution}
                      subtitle={account.name}
                      status={status}
                    />
                    {account.id === 'acc-ridge' && !ridgeReauthed ? (
                      <div style={{ marginTop: 12 }}>
                        <Button onClick={() => setRidgeReauthed(true)}>Update</Button>
                      </div>
                    ) : null}
                  </div>
                )
              })}
          </div>
        </>
      ) : null}

      {isRules ? (
        <div className="stack">
          {householdRules.map((rule) => {
            const on = Boolean(rulesOn[rule.id])
            const conflict = conflictFlag(rule.whenContains)
            return (
              <div className="card" key={rule.id}>
                <div className="toggle">
                  <span>
                    <b>
                      If “{rule.whenContains}” then {rule.setCategory}
                    </b>
                    {conflict ? (
                      <span className="muted">
                        Wins: “{conflict.winner.whenContains}”
                      </span>
                    ) : null}
                  </span>
                  <button
                    type="button"
                    className="switch"
                    data-on={on}
                    aria-pressed={on}
                    onClick={() => setRuleOn(rule.id, !on)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      ) : null}

      {!isSync && !isRules ? (
        <>
          <div className={nextPeek ? 'review-stack' : undefined}>
            <SwipeReview
              onReviewed={() => onDecide(isTransfer ? 'transfer' : 'accepted')}
              onSkip={() => onDecide('skipped')}
            >
              {isTransfer ? (
                <>
                  <div className="review-top">
                    <div>
                      <p className="review-merchant">{liveGroup.merchantLabel}</p>
                      <p className="muted">
                        {count} {count === 1 ? 'transaction' : 'transactions'}
                      </p>
                    </div>
                    <p className="review-amount">{usd(groupTotal(liveGroup))}</p>
                  </div>
                  <div className="review-foot">
                    <CategoryChip category={liveGroup.suggestedCategory} />
                  </div>
                </>
              ) : (
                <>
                  <p className="review-merchant">{liveGroup.merchantLabel}</p>
                  <p className="muted" style={{ margin: '10px 0 8px' }}>
                    Suggested
                  </p>
                  <CategoryChip category={liveGroup.suggestedCategory} />
                  <div className="review-top" style={{ marginTop: 18 }}>
                    <p className="muted">
                      {count} {count === 1 ? 'transaction' : 'transactions'}
                    </p>
                    <p className="review-amount">{usd(groupTotal(liveGroup))}</p>
                  </div>
                  {lowConfidence ? (
                    <div className="review-foot" style={{ marginTop: 12 }}>
                      <AvatarRow />
                    </div>
                  ) : null}
                </>
              )}
            </SwipeReview>
            {nextPeek ? (
              <div className="review-stack-back" aria-hidden="true">
                <p className="review-merchant">{nextPeek.merchantLabel}</p>
                <p className="muted" style={{ margin: '8px 0 0' }}>
                  Suggested
                </p>
              </div>
            ) : null}
          </div>
          {queueHint ? <p className="review-queue-hint">{queueHint}</p> : null}
        </>
      ) : null}
    </Screen>
  )
}
