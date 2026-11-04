export type AccountStatus = 'healthy' | 'stale' | 'needs_reauth'
export type AccountType = 'depository' | 'credit'
export type TxnStatus = 'posted' | 'pending'
export type GoalId = 'see-everything' | 'stop-overspending' | 'plan-with-partner'
export type SortRange = 'month' | '3months'
export type GroupDecision = 'accepted' | 'changed' | 'skipped' | 'split' | 'transfer'
export type BudgetStyle = 'flex' | 'per-category'
export type PlanId = 'core-annual' | 'core-monthly'
export type AiSource = 'live' | 'cached' | 'pre-written'

export type Account = {
  id: string
  institution: string
  name: string
  mask: string
  type: AccountType
  status: AccountStatus
  lastSyncedAt: string
  historyDays?: number
  missingTransactions?: number
  note: string
}

export type Transaction = {
  id: string
  accountId: string
  date: string
  weekday: string
  amount: number
  rawDescription: string
  merchant: string
  category: string
  suggestedCategory: string
  status: TxnStatus
  isTransfer: boolean
  isRefund: boolean
  tags: string[]
  seedMess: string | null
  pendingTwinId: string | null
}

export type RuleDraft = {
  whenContains: string
  setCategory: string
}

export type SuggestionKind = 'merchant' | 'transfer' | 'sync' | 'rules'

export type SuggestionGroup = {
  id: string
  merchantLabel: string
  suggestedCategory: string
  confidence: string
  why: string
  ruleDraft: RuleDraft
  kind: SuggestionKind
  transactionIds: string[]
  pair?: {
    from: string
    to: string
    amount: number
    date: string
  }
  exampleSent?: SentFields
}

export type SentFields = {
  description: string
  amount: number
  date: string
  weekday: string
  application: string
  accountKind: string
}

export type QuickSortResponse = {
  source: AiSource
  model: string
  group: SuggestionGroup
}

export type SampleFixture = {
  meta: {
    unofficial: boolean
    designer: string
    affiliation: string
    householdName: null
    now: string
    trialStartedAt: string
    trialEndsAt: string
    timezone: string
    pricingSource: string
    pricingAsOf: string
    seedMesses: string[]
  }
  accounts: Account[]
  categories: string[]
  tags: { id: string; label: string }[]
  transactions: Transaction[]
}

export type FallbackFixture = {
  source: AiSource
  model: string
  generatedAt: string
  note: string
  groups: SuggestionGroup[]
}
