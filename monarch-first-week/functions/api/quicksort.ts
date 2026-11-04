/**
 * Cloudflare Pages Function for Quick Sort.
 * Sends only the fields shown in "What the AI looked at".
 * Local mock AI does not use this file — Vite serves /api/quicksort from fallback.json.
 */
import fallback from '../../data/fixtures/fallback.json'

type SentFields = {
  description: string
  amount: number
  date: string
  weekday: string
  application: string
  accountKind: string
}

type FallbackFile = {
  source: 'live' | 'cached' | 'pre-written'
  model: string
  groups: Array<{
    id: string
    merchantLabel: string
    suggestedCategory: string
    confidence: string
    why: string
    ruleDraft: { whenContains: string; setCategory: string }
    kind: 'merchant' | 'transfer'
    transactionIds: string[]
  }>
}

type Env = {
  AI?: {
    run: (model: string, input: unknown) => Promise<{ response?: string }>
  }
  QUICKSORT_CACHE?: {
    get: (key: string) => Promise<string | null>
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>
  }
  DAILY_AI_CAP?: string
  PER_IP_HOURLY_CAP?: string
}

const ALLOWED_SENT_KEYS = [
  'description',
  'amount',
  'date',
  'weekday',
  'application',
  'accountKind',
] as const

const TIMEOUT_MS = 8000
const fallbackFile = fallback as FallbackFile

function pickGroup(groupId: string | undefined) {
  return fallbackFile.groups.find((group) => group.id === groupId) ?? fallbackFile.groups[1]
}

function sanitizeSent(input: unknown): SentFields {
  const raw = (input ?? {}) as Record<string, unknown>
  return {
    description: String(raw.description ?? ''),
    amount: Number(raw.amount ?? 0),
    date: String(raw.date ?? ''),
    weekday: String(raw.weekday ?? ''),
    application: String(raw.application ?? 'First Week · Quick Sort'),
    accountKind: String(raw.accountKind ?? ''),
  }
}

function assertOnlyAllowed(body: Record<string, unknown>) {
  const sent = (body.sent ?? {}) as Record<string, unknown>
  for (const key of Object.keys(sent)) {
    if (!ALLOWED_SENT_KEYS.includes(key as (typeof ALLOWED_SENT_KEYS)[number])) {
      delete sent[key]
    }
  }
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? 'unknown'
}

async function limited(env: Env, ip: string): Promise<string | null> {
  if (!env.QUICKSORT_CACHE) return null
  const now = new Date()
  const day = now.toISOString().slice(0, 10)
  const hour = now.toISOString().slice(0, 13)
  const dailyCap = Number(env.DAILY_AI_CAP ?? 200)
  const ipCap = Number(env.PER_IP_HOURLY_CAP ?? 20)
  const dayKey = `cap:day:${day}`
  const ipKey = `rl:ip:${ip}:${hour}`
  const dayCount = Number((await env.QUICKSORT_CACHE.get(dayKey)) ?? '0')
  const ipCount = Number((await env.QUICKSORT_CACHE.get(ipKey)) ?? '0')
  if (dayCount >= dailyCap) return 'daily-cap'
  if (ipCount >= ipCap) return 'ip-rate-limit'
  await env.QUICKSORT_CACHE.put(dayKey, String(dayCount + 1), { expirationTtl: 60 * 60 * 48 })
  await env.QUICKSORT_CACHE.put(ipKey, String(ipCount + 1), { expirationTtl: 60 * 60 * 2 })
  return null
}

function fallbackResponse(groupId: string | undefined) {
  return {
    source: 'pre-written' as const,
    model: fallbackFile.model,
    group: pickGroup(groupId),
  }
}

async function runModel(env: Env, sent: SentFields): Promise<string | null> {
  if (!env.AI) return null
  const run = env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      {
        role: 'system',
        content:
          'You categorize one household transaction group. Reply with a short category name only. No extra text.',
      },
      {
        role: 'user',
        content: JSON.stringify(sent),
      },
    ],
  })
  const raced = await Promise.race([
    run,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), TIMEOUT_MS)),
  ])
  if (!raced || typeof raced !== 'object') return null
  return raced.response ?? null
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context
  let body: Record<string, unknown> = {}
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    body = {}
  }
  assertOnlyAllowed(body)
  const sent = sanitizeSent(body.sent)
  const groupId = typeof body.groupId === 'string' ? body.groupId : undefined
  const limitReason = await limited(env, clientIp(request))
  if (limitReason) {
    return Response.json({ ...fallbackResponse(groupId), limited: limitReason })
  }

  const hash = await sha256Hex(JSON.stringify({ groupId, sent }))
  const cached = env.QUICKSORT_CACHE ? await env.QUICKSORT_CACHE.get(`qs:${hash}`) : null
  if (cached) {
    return Response.json({ ...JSON.parse(cached), source: 'cached' })
  }

  try {
    const modelText = await runModel(env, sent)
    if (!modelText) {
      return Response.json(fallbackResponse(groupId))
    }
    const group = {
      ...pickGroup(groupId),
      suggestedCategory: modelText.trim().slice(0, 40) || pickGroup(groupId).suggestedCategory,
    }
    const payload = {
      source: 'live' as const,
      model: '@cf/meta/llama-3.1-8b-instruct',
      group,
    }
    if (env.QUICKSORT_CACHE) {
      await env.QUICKSORT_CACHE.put(`qs:${hash}`, JSON.stringify(payload), {
        expirationTtl: 60 * 60 * 24,
      })
    }
    return Response.json(payload)
  } catch {
    return Response.json(fallbackResponse(groupId))
  }
}

export const onRequestGet = async () =>
  Response.json({ ok: true, mode: 'pages-function', fallback: fallbackFile.model })
