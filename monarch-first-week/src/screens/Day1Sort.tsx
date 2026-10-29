import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BackLink } from '../components/BackLink'
import { Button } from '../components/ui/button'
import { PrototypeJump } from '../components/PrototypeJump'
import { RulePreview } from '../components/RulePreview'
import { Screen } from '../components/Screen'
import { SwipeReview } from '../components/SwipeReview'
import { AccountLine, AvatarRow, CategoryChip, SparkleButton } from '../components/visuals'
import { household } from '../data/visual'
import { conflictFlag, householdRules } from '../data/rules'
import { requestQuickSort } from '../lib/ai'
import { protoPath } from '../lib/proto'
import { groupDateSpan, groupTotal, groups, sample } from '../lib/fixtures'
import { shortDate } from '../lib/dates'
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
    lastUndo,
    rulesOn,
    setRuleOn,
    aiEnabled,
    setAiEnabled,
    setAiSource,
    setSheet,
    showToast,
    ridgeReauthed,
    setRidgeReauthed,
    partnerQueue,
    askPartner,
  } = useAppState()
  const [params] = useSearchParams()
  const group = groups[groupIndex] ?? groups[0]
  const [liveGroup, setLiveGroup] = useState<SuggestionGroup>(group)

  useEffect(() => {
    const wanted = params.get('group')
    if (!wanted) return
    const idx = groups.findIndex((item) => item.id === wanted)
    if (idx >= 0) setGroupIndex(idx)
    if (params.get('sheet') === 'ai') setSheet('ai')
    if (params.get('sheet') === 'taxonomy') setSheet('taxonomy')
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
  const span = groupDateSpan(liveGroup)
  const next = groups[(groupIndex + 1) % groups.length]
  const isTransfer = liveGroup.kind === 'transfer'
  const isSync = liveGroup.kind === 'sync'
  const isRules = liveGroup.kind === 'rules'
  const lowConfidence = liveGroup.confidence !== 'likely' && !isSync && !isRules
  const asked = partnerQueue.includes(liveGroup.id)
  const partner = household.members.find((member) => member.shared)

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
          ) : (
            <div className="btn-row">
              <Button
                onClick={() => onDecide(isTransfer ? 'transfer' : 'accepted')}
              >
                Mark as reviewed
              </Button>
              <button className="btn btn-secondary" type="button" onClick={() => onDecide('skipped')}>
                Skip for now
              </button>
            </div>
          )}
          {lowConfidence ? (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => askPartner(liveGroup.id, liveGroup.merchantLabel)}
            >
              Needs review by {partner?.first}
              {asked ? ' · queued' : ''}
            </button>
          ) : null}
          <nav className="footer-links" aria-label="Review extras">
            <button className="linkish" type="button" onClick={sortMyself}>
              Edit
            </button>
            <button className="linkish" type="button" onClick={() => undo()}>
              Undo
            </button>
          </nav>
          <PrototypeJump />
        </>
      }
    >
      <BackLink to={protoPath('/day/1')} />
      <div className="head-row">
        <p className="kicker">
          Needs review · {groupIndex + 1} of {groups.length}
        </p>
        {!isSync && !isRules ? (
          <SparkleButton onClick={() => setSheet('ai')} label="Insights" />
        ) : null}
      </div>
      <h1>
        {isSync
          ? 'Connection status'
          : isRules
            ? 'Create rule'
            : isTransfer
              ? 'Looks like a transfer'
              : liveGroup.merchantLabel}
      </h1>

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
          <SwipeReview
            onReviewed={() => onDecide(isTransfer ? 'transfer' : 'accepted')}
            onSkip={() => onDecide('skipped')}
          >
            <div className="review-top">
              <div>
                <p className="review-merchant">{liveGroup.merchantLabel}</p>
                <p className="muted">
                  {count} {count === 1 ? 'transaction' : 'transactions'}
                  {span ? ` · ${shortDate(span.first)}–${shortDate(span.last)}` : ''}
                </p>
              </div>
              <p className="review-amount">{usd(groupTotal(liveGroup))}</p>
            </div>
            <div className="review-foot">
              <CategoryChip category={liveGroup.suggestedCategory} />
              {lowConfidence ? <AvatarRow /> : null}
            </div>
          </SwipeReview>
          <p className="swipe-hint">Swipe right to review · left to skip</p>

          <div className="card" style={{ marginTop: 12 }}>
            <div className="toggle">
              <span>
                <b>Create rule</b>
                <span className="muted">
                  If merchant contains “{liveGroup.ruleDraft.whenContains}”
                </span>
              </span>
              <button
                type="button"
                className="switch"
                data-on={Boolean(rulesOn[liveGroup.id])}
                aria-pressed={Boolean(rulesOn[liveGroup.id])}
                onClick={() => setRuleOn(liveGroup.id, !rulesOn[liveGroup.id])}
              />
            </div>
            <p className="muted" style={{ marginTop: 8 }}>
              Apply {count} changes to existing transactions
            </p>
          </div>
          <RulePreview
            whenContains={liveGroup.ruleDraft.whenContains}
            setCategory={liveGroup.ruleDraft.setCategory}
          />
          <button className="linkish" type="button" onClick={() => setSheet('split')}>
            Split transaction
          </button>
        </>
      ) : null}

      {lastUndo ? (
        <p className="muted">
          {lastUndo}.{' '}
          <button className="linkish" type="button" onClick={() => undo()}>
            Undo
          </button>
        </p>
      ) : null}

      <p className="muted">Next: {next.merchantLabel}</p>
    </Screen>
  )
}
