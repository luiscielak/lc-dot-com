import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { applyTokens } from './lib/tokens.ts'
import './index.css'

applyTokens()

// Figure-capture mode: `?capture=1` hides prototype-only chrome (jump nav, banner)
// so the static /case figures show just the product screen.
if (new URLSearchParams(window.location.search).has('capture')) {
  document.documentElement.classList.add('capture')
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename === '/' ? undefined : basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
