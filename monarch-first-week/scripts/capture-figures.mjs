/**
 * Captures the static phone figures used on /case into public/figures/.
 * Each route is loaded with ?capture=1 so prototype-only chrome (jump nav,
 * banner) is hidden, then the .phone element is screenshotted.
 *
 * Requires: npm run dev (45261) and playwright chromium.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'figures')
const BASE = 'http://127.0.0.1:45261'
const VIEW = { width: 640, height: 960 }

mkdirSync(OUT, { recursive: true })

const figures = [
  { file: 'day0.png', path: '/prototype?capture=1' },
  {
    file: 'quicksort_review_card.png',
    path: '/prototype/day/1/sort?group=g-daily-grind&capture=1',
    settle: 1600,
  },
  {
    file: 'ai_panel.png',
    path: '/prototype/day/1/sort?group=g-daily-grind&sheet=ai&capture=1',
    settle: 1600,
  },
  { file: 'weekly_recap.png', path: '/prototype/day/4?capture=1' },
  { file: 'day6.png', path: '/prototype/day/6?capture=1' },
]

async function capture(page, fig) {
  await page.goto(`${BASE}${fig.path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(fig.settle ?? 700)
  const phone = page.locator('.phone')
  await phone.waitFor({ state: 'visible' })
  await phone.screenshot({ path: join(OUT, fig.file), type: 'png' })
  console.log('wrote', join('public/figures', fig.file))
}

async function main() {
  const res = await fetch(`${BASE}/prototype`).catch(() => null)
  if (!res?.ok) {
    console.error('Prototype not reachable at', BASE, '— run npm run dev first')
    process.exit(1)
  }

  const browser = await chromium.launch({ headless: true })
  try {
    const context = await browser.newContext({
      viewport: VIEW,
      deviceScaleFactor: 2,
    })
    const page = await context.newPage()
    for (const fig of figures) {
      await capture(page, fig)
    }
    await context.close()
  } finally {
    await browser.close()
  }
  console.log('All case figures captured.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
