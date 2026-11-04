export const PROTO_BASE = '/prototype'

export function protoPath(path = ''): string {
  if (!path || path === '/') return PROTO_BASE
  return `${PROTO_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

export function isDebugNav(search: string): boolean {
  return new URLSearchParams(search).has('debug')
}

export function withDebug(path: string): string {
  const [pathname, query = ''] = path.split('?')
  const params = new URLSearchParams(query)
  params.set('debug', '1')
  const qs = params.toString()
  return qs ? `${pathname}?${qs}` : pathname
}
