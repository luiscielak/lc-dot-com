import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { groups } from '../lib/fixtures'
import type { SignupChannel } from '../config/pricing'
import type { AiSource, BudgetStyle, GoalId, GroupDecision, PlanId, SortRange } from '../types'

export type SheetName = 'ai' | 'taxonomy' | 'change' | 'split' | 'plan-note' | null

type AppState = {
  goal: GoalId
  setGoal: (goal: GoalId) => void
  remindBeforeCharge: boolean
  setRemindBeforeCharge: (value: boolean) => void
  signupChannel: SignupChannel
  setSignupChannel: (value: SignupChannel) => void
  partnerQueue: string[]
  askPartner: (groupId: string, label: string) => void
  ridgeReauthed: boolean
  setRidgeReauthed: (value: boolean) => void
  sortRange: SortRange
  setSortRange: (value: SortRange) => void
  groupIndex: number
  setGroupIndex: (value: number) => void
  decisions: Record<string, GroupDecision>
  decide: (groupId: string, decision: GroupDecision) => void
  undo: () => void
  lastUndo: string | null
  rulesOn: Record<string, boolean>
  setRuleOn: (groupId: string, value: boolean) => void
  aiEnabled: boolean
  setAiEnabled: (value: boolean) => void
  aiSource: AiSource
  setAiSource: (value: AiSource) => void
  budgetStyle: BudgetStyle
  setBudgetStyle: (value: BudgetStyle) => void
  plan: PlanId
  setPlan: (value: PlanId) => void
  sheet: SheetName
  setSheet: (sheet: SheetName) => void
  toast: string | null
  showToast: (message: string) => void
}

const AppStateContext = createContext<AppState | null>(null)

const initialDecisions: Record<string, GroupDecision> = {}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [goal, setGoal] = useState<GoalId>('see-everything')
  const [remindBeforeCharge, setRemindBeforeCharge] = useState(true)
  const [signupChannel, setSignupChannel] = useState<SignupChannel>('web')
  const [ridgeReauthed, setRidgeReauthed] = useState(false)
  const [sortRange, setSortRange] = useState<SortRange>('month')
  const [groupIndex, setGroupIndex] = useState(0)
  const [decisions, setDecisions] = useState<Record<string, GroupDecision>>(initialDecisions)
  const [lastUndo, setLastUndo] = useState<string | null>(null)
  const [rulesOn, setRulesOn] = useState<Record<string, boolean>>({})
  const [partnerQueue, setPartnerQueue] = useState<string[]>([])
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiSource, setAiSource] = useState<AiSource>('pre-written')
  const [budgetStyle, setBudgetStyle] = useState<BudgetStyle>('flex')
  const [plan, setPlan] = useState<PlanId>('core-annual')
  const [sheet, setSheet] = useState<SheetName>(null)
  const [toast, setToast] = useState<string | null>(null)

  const value = useMemo<AppState>(
    () => ({
      goal,
      setGoal,
      remindBeforeCharge,
      setRemindBeforeCharge,
      signupChannel,
      setSignupChannel,
      partnerQueue,
      askPartner: (groupId, label) => {
        setPartnerQueue((prev) => (prev.includes(groupId) ? prev : [...prev, groupId]))
        setToast(`Needs review by Maya. ${label} sits in a mock queue — nothing is sent.`)
        window.setTimeout(() => setToast(null), 2800)
      },
      ridgeReauthed,
      setRidgeReauthed,
      sortRange,
      setSortRange,
      groupIndex,
      setGroupIndex,
      decisions,
      decide: (groupId, decision) => {
        setDecisions((prev) => ({ ...prev, [groupId]: decision }))
        const group = groups.find((item) => item.id === groupId)
        if (group) {
          setLastUndo(`${group.merchantLabel} · ${group.suggestedCategory} (${group.transactionIds.length})`)
        }
      },
      undo: () => {
        const lastId = Object.keys(decisions).at(-1)
        if (!lastId) return
        setDecisions((prev) => {
          const next = { ...prev }
          delete next[lastId]
          return next
        })
        setLastUndo(null)
        const idx = groups.findIndex((group) => group.id === lastId)
        if (idx >= 0) setGroupIndex(idx)
      },
      lastUndo,
      rulesOn,
      setRuleOn: (groupId, next) => setRulesOn((prev) => ({ ...prev, [groupId]: next })),
      aiEnabled,
      setAiEnabled,
      aiSource,
      setAiSource,
      budgetStyle,
      setBudgetStyle,
      plan,
      setPlan,
      sheet,
      setSheet,
      toast,
      showToast: (message) => {
        setToast(message)
        window.setTimeout(() => setToast(null), 2800)
      },
    }),
    [
      goal,
      remindBeforeCharge,
      signupChannel,
      partnerQueue,
      ridgeReauthed,
      sortRange,
      groupIndex,
      decisions,
      lastUndo,
      rulesOn,
      aiEnabled,
      aiSource,
      budgetStyle,
      plan,
      sheet,
      toast,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider')
  return ctx
}
