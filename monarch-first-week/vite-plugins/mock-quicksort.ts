import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

type FallbackFile = {
  source: string
  model: string
  groups: Array<{ id: string }>
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export function mockQuicksortPlugin(): Plugin {
  const fallbackPath = resolve(process.cwd(), 'data/fixtures/fallback.json')

  const handle = async (req: IncomingMessage, res: ServerResponse) => {
    const fallback = JSON.parse(readFileSync(fallbackPath, 'utf8')) as FallbackFile
    if (req.method === 'GET') {
      json(res, 200, { ok: true, mode: 'mock-ai', model: fallback.model })
      return
    }
    if (req.method !== 'POST') {
      json(res, 405, { error: 'Method not allowed' })
      return
    }
    let groupId = ''
    try {
      const parsed = JSON.parse(await readBody(req)) as { groupId?: string }
      groupId = parsed.groupId ?? ''
    } catch {
      groupId = ''
    }
    const group = fallback.groups.find((item) => item.id === groupId) ?? fallback.groups[1]
    json(res, 200, {
      source: 'pre-written',
      model: fallback.model,
      group,
      mode: 'mock-ai',
    })
  }

  return {
    name: 'mock-quicksort',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/quicksort') {
          next()
          return
        }
        void handle(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/quicksort') {
          next()
          return
        }
        void handle(req, res)
      })
    },
  }
}
