import raw from '../../tokens/tokens.json'

const SKIP = new Set(['$meta', 'derivedFrom', 'note', 'sources', 'status', 'name'])

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (SKIP.has(key) || key.startsWith('$')) continue
    const next = prefix ? `${prefix}-${key}` : key
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      if (value !== undefined && typeof value !== 'object') out[next] = String(value)
      continue
    }
    const leaf = value as Record<string, unknown>
    if (typeof leaf.value === 'string' || typeof leaf.value === 'number') {
      out[next] = String(leaf.value)
    }
    if (typeof leaf.bg === 'string') out[`${next}-bg`] = leaf.bg
    if (typeof leaf.bold === 'string') out[`${next}-bold`] = leaf.bold
    if (typeof leaf.active === 'string') out[`${next}-active`] = leaf.active
    if (typeof leaf.fg === 'string') out[`${next}-fg`] = leaf.fg
    if (typeof leaf.ref === 'string') out[`${next}__ref`] = leaf.ref
    Object.assign(out, flatten(leaf, next))
  }
  return out
}

function resolveRefs(entries: Record<string, string>): Record<string, string> {
  const resolved = { ...entries }
  for (const [key, ref] of Object.entries(entries)) {
    if (!key.endsWith('__ref')) continue
    const target = key.replace(/__ref$/, '')
    const dotted = ref.replaceAll('.', '-')
    const hit =
      resolved[`color-${dotted}`] ??
      resolved[dotted] ??
      Object.entries(resolved).find(([name]) => name.endsWith(`-${dotted}`))?.[1]
    if (hit) resolved[target] = hit
    delete resolved[key]
  }
  return resolved
}

export const tokenEntries = resolveRefs(flatten(raw as Record<string, unknown>))

export function applyTokens(root: HTMLElement = document.documentElement) {
  for (const [name, value] of Object.entries(tokenEntries)) {
    if (value.startsWith('http') || value.length > 180) continue
    root.style.setProperty(`--${name}`, value)
  }
}

export { raw as tokens }
