import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import { Logo } from './components/brand/Logo'
import { IconSprite } from './components/ui/Icon'

// Temporary shell. The design system, data model and search logic exist;
// the site header, routes and pages are not built yet.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IconSprite />
    <main className="container section">
      <Logo />
      <p className="lede" style={{ marginTop: '2rem' }}>
        Work in progress: the identity, tokens, data and logic are in place. Pages come next.
      </p>
    </main>
  </StrictMode>,
)
