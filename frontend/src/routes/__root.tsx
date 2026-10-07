import { MotionConfig } from 'framer-motion'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router'
import { Loader } from '@/components/site/Loader'
import { SiteFooter, SiteHeader } from '@/components/site/SiteChrome'
import { IconSprite } from '@/components/ui/Icon'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { type Language, LanguageContext, storedLanguage, storeLanguage, useT } from '@/hooks/use-language'
import { useLenis } from '@/hooks/use-lenis'
import { RevealedContext } from '@/hooks/use-revealed'
import { prefersReducedMotion } from '@/lib/utils'

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

function SkipLink() {
  const t = useT()
  return (
    <a className="skip-link" href="#main">
      {t.site.skip}
    </a>
  )
}

export function Layout() {
  const [language, setLanguage] = useState<Language>(storedLanguage)
  const speech = useMemo(
    () => ({
      language,
      setLanguage: (next: Language) => {
        storeLanguage(next)
        setLanguage(next)
      },
    }),
    [language],
  )

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  // The loader covers the first arrival. Visitors who asked for less motion get the page at once.
  const [revealed, setRevealed] = useState(() => prefersReducedMotion())
  const reveal = useCallback(() => setRevealed(true), [])

  // index.html paints the loader's walnut before anything has arrived, so the
  // screen does not flash light first. It stays until the curtain rises, which
  // also keeps the strip where the scrollbar will be dark beside the loader.
  useEffect(() => {
    if (revealed) document.documentElement.style.backgroundColor = ''
  }, [revealed])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <LanguageContext value={speech}>
          <RevealedContext value={revealed}>
            <IconSprite />
            {/* Nothing behind the loader can be reached until it lifts. */}
            <div inert={!revealed}>
              <SkipLink />
              <SiteHeader />
              <main id="main" tabIndex={-1}>
                <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                  <Outlet />
                </Suspense>
              </main>
              <SiteFooter />
            </div>
            <ScrollManager />
            <Loader onLift={reveal} />
          </RevealedContext>
        </LanguageContext>
      </SmoothScroll>
    </MotionConfig>
  )
}
