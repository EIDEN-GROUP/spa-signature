import { MotionConfig } from 'framer-motion'
import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router'
import { SiteFooter, SiteHeader } from '@/components/site/SiteChrome'
import { IconSprite } from '@/components/ui/Icon'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { useLenis } from '@/hooks/use-lenis'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const type = useNavigationType()
  const lenis = useLenis()
  const scroller = useRef(lenis)
  const last = useRef(pathname + hash)

  useEffect(() => {
    scroller.current = lenis
  }, [lenis])

  useEffect(() => {
    if (last.current === pathname + hash) return
    last.current = pathname + hash

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target && scroller.current) scroller.current.scrollTo(target)
      else target?.scrollIntoView()
      return
    }
    if (type === 'POP') return
    if (scroller.current) scroller.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash, type])

  return null
}

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <IconSprite />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Outlet />
          </Suspense>
        </main>
        <SiteFooter />
        <ScrollManager />
      </SmoothScroll>
    </MotionConfig>
  )
}
