export const PROTO_BASE = '/prototype'

export function protoPath(path = ''): string {
  if (!path || path === '/') return PROTO_BASE
  return `${PROTO_BASE}${path.startsWith('/') ? path : `/${path}`}`
}
