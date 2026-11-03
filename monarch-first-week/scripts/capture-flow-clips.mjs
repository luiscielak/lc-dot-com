/**
 * Records short silent phone clips of the primary First Week flows.
 * Requires: npm run dev (45261) and playwright chromium.
 */
import { chromium } from 'playwright'
import { mkdirSync, existsSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = join(ROOT, '..', 'site')
const OUT_VIDEO = join(SITE, 'public', 'video', 'your-first-week')
const OUT_POSTER = join(SITE, 'src', 'assets', 'work', 'monarch')
const BASE = 'http://127.0.0.1:45261'
const VIEW = { width: 390, height: 844 }

mkdirSync(OUT_VIDEO, { recursive: true })
mkdirSync(OUT_POSTER, { recursive: true })

const flows = [
  {
    id: 'day0-charge',
    poster: 'flow-day0.png',
    path: '/prototype',
    async act(page) {
      await page.waitForTimeout(600)
      const goal = page.getByRole('button', { name: /Plan with a household/i })
      if (await goal.count()) await goal.click()
      await page.waitForTimeout(800)
      await page.evaluate(() => window.scrollTo(0, 220))
      await page.waitForTimeout(1200)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(700)
    },
  },
  {
    id: 'connect-status',
    poster: 'flow-connect.png',
    path: '/prototype/connect',
    async act(page) {
      await page.waitForTimeout(700)
      const update = page.getByRole('button', { name: /^Update$/i })
      if (await update.count()) {
        await update.first().click()
        await page.waitForTimeout(1000)
      }
      await page.waitForTimeout(900)
    },
  },
  {
    id: 'quick-sort',
    poster: 'flow-quicksort.png',
    path: '/prototype/day/1/sort?group=g-daily-grind',
    async ready(page) {
      await page.getByRole('button', { name: /^Accept$/i }).waitFor({ state: 'visible' })
    },
    async act(page) {
      await page.waitForTimeout(1400)
      const change = page.getByRole('button', { name: /^Change$/i })
      if (await change.count()) {
        await change.click()
        await page.waitForTimeout(900)
        const close = page.getByRole('button', { name: /Got it|Close/i })
        if (await close.count()) await close.click()
        else await page.keyboard.press('Escape')
        await page.waitForTimeout(700)
      }
    },
  },
  {
    id: 'insights',
    poster: 'flow-insights.png',
    path: '/prototype/day/1/sort?group=g-daily-grind&sheet=ai',
    async ready(page) {
      await page.getByRole('dialog', { name: /Insights/i }).waitFor({ state: 'visible' })
    },
    async act(page) {
      await page.waitForTimeout(1800)
    },
  },
  {
    id: 'day6-bill',
    poster: 'flow-day6.png',
    path: '/prototype/day/6',
    async act(page) {
      await page.waitForTimeout(900)
      await page.evaluate(() => {
        const scroller = document.querySelector('.screen-scroll')
        if (scroller) scroller.scrollTo(0, scroller.scrollHeight)
      })
      await page.waitForTimeout(1000)
      await page.evaluate(() => {
        const scroller = document.querySelector('.screen-scroll')
        if (scroller) scroller.scrollTo(0, 0)
      })
      await page.waitForTimeout(700)
    },
  },
]

function webmToMp4(webmPath, mp4Path) {
  const result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      webmPath,
      '-an',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-vf',
      'scale=390:844:force_original_aspect_ratio=decrease,pad=390:844:(ow-iw)/2:(oh-ih)/2',
      mp4Path,
    ],
    { encoding: 'utf8' },
  )
  if (result.status !== 0) {
    console.error(result.stderr)
    throw new Error(`ffmpeg failed for ${webmPath}`)
  }
}

async function recordFlow(browser, flow) {
  const tmpDir = join(OUT_VIDEO, `.tmp-${flow.id}`)
  rmSync(tmpDir, { recursive: true, force: true })
  mkdirSync(tmpDir, { recursive: true })

  const context = await browser.newContext({
    viewport: VIEW,
    deviceScaleFactor: 2,
    recordVideo: { dir: tmpDir, size: VIEW },
  })
  const page = await context.newPage()
  await page.goto(`${BASE}${flow.path}`, { waitUntil: 'networkidle' })
  if (flow.ready) await flow.ready(page)
  else await page.waitForTimeout(400)
  await page.waitForTimeout(200)
  await page.screenshot({ path: join(OUT_POSTER, flow.poster), type: 'png' })
  await flow.act(page)
  await page.waitForTimeout(400)
  await context.close()

  const files = readdirSync(tmpDir).filter((f) => f.endsWith('.webm'))
  if (!files.length) throw new Error(`No webm for ${flow.id}`)
  const webm = join(tmpDir, files[0])
  const mp4 = join(OUT_VIDEO, `${flow.id}.mp4`)
  webmToMp4(webm, mp4)
  rmSync(tmpDir, { recursive: true, force: true })
  console.log('wrote', mp4)
}

async function main() {
  // Health check
  const res = await fetch(`${BASE}/prototype`).catch(() => null)
  if (!res?.ok) {
    console.error('Prototype not reachable at', BASE, '— run npm run dev first')
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  try {
    for (const flow of flows) {
      await recordFlow(browser, flow)
    }
  } finally {
    await browser.close()
  }
  console.log('All flow clips captured.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
