import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Logo } from '@/components/site/Logo'
import { useT } from '@/hooks/use-language'
import { useLenis } from '@/hooks/use-lenis'
import { prefersReducedMotion } from '@/lib/utils'

// Times in milliseconds.
/** The loader stays at least this long, even when the page is ready sooner. */
const SHORTEST = 2800
/** Once the film has started, it is given at least this long on screen. */
const FILM = 1600
/** Nobody is kept waiting longer than this, whatever is still loading. */
const LONGEST = 7000
const LIFT = { duration: 1.25, ease: [0.76, 0, 0.24, 1] } as const

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

/** The fonts have arrived, and so have the photographs the page shows at once. */
function pageReady(): Promise<unknown> {
  const first = [...document.querySelectorAll<HTMLImageElement>('main img:not([loading="lazy"])')]
  return Promise.all([document.fonts.ready, ...first.map((image) => image.decode().catch(() => {}))])
}

interface LoaderProps {
  /** Called once, at the moment the curtain starts to rise. */
  onLift: () => void
}

/**
 * The opening of the site: a short film of a hammam while the page loads, then
 * the whole screen rises like a curtain.
 * The film is written in index.html, so it plays from the first moment; the
 * logo and the line join it here. Visitors who asked for less motion never see it.
 */
export function Loader({ onLift }: LoaderProps) {
  const t = useT()
  const lenis = useLenis()
  const [screen] = useState(() => document.getElementById('loader'))
  const sheet = screen?.querySelector<HTMLElement>('.loader-sheet')
  const [phase, setPhase] = useState<'loading' | 'lifting' | 'gone'>(() => (screen && !prefersReducedMotion() ? 'loading' : 'gone'))
  const progress = useMotionValue(0)
  const drawn = useTransform(progress, [0, 100], [0, 1])
  const sounded = useRef(false)

  useEffect(() => {
    if (!screen || !screen.isConnected) return
    if (prefersReducedMotion()) {
      screen.remove()
      return
    }
    let live = true
    const curtain = screen.querySelector<HTMLElement>('.loader-sheet')
    const film = screen.querySelector<HTMLElement>('.loader-film')
    const video = screen.querySelector('video')
    // A browser may refuse to play; the loader works the same without the film.
    const mute = () => {
      if (video) video.muted = true
    }
    const hide = () => {
      if (document.hidden) mute()
    }
    const hush = (ms: number) =>
      new Promise<void>((resolve) => {
        if (!video || video.muted) return resolve()
        const from = video.volume
        const start = performance.now()
        const timer = window.setInterval(() => {
          const left = Math.max(0, 1 - (performance.now() - start) / ms)
          video.volume = from * left * left
          if (left > 0) return
          window.clearInterval(timer)
          mute()
          resolve()
        }, 40)
      })
    if (video && !sounded.current && !document.hidden) {
      sounded.current = true
      video.muted = false
      video.play().catch(() => {
        video.muted = true
        video.play().catch(() => {})
      })
    } else {
      video?.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', hide)
    window.setTimeout(mute, LONGEST + 3000)

    // The line draws itself while the page loads, and holds just short of the end.
    const climb = animate(progress, 92, { duration: (SHORTEST / 1000) * 1.6, ease: [0.2, 0.7, 0.2, 1] })
    Promise.race([Promise.all([pageReady(), wait(SHORTEST)]), wait(LONGEST)]).then(async () => {
      // A film that has only just appeared is not cut off at once. One that never started is not waited for.
      const seen = video?.played.length ? video.played.end(0) * 1000 : FILM
      if (seen < FILM) await wait(FILM - seen)
      if (!live) return
      climb.stop()
      await Promise.all([animate(progress, 100, { duration: 0.45, ease: 'easeOut' }), hush(1000)])
      mute()
      if (!live || !curtain || !film) return
      setPhase('lifting')
      onLift()
      // The film slides down inside the sheet as the sheet goes up, so it seems to stay where it is.
      animate(film, { y: '45%' }, LIFT)
      await animate(curtain, { y: '-100%' }, LIFT)
      video?.pause()
      video?.removeAttribute('src')
      video?.load()
      screen.remove()
      setPhase('gone')
    })

    return () => {
      live = false
      climb.stop()
      document.removeEventListener('visibilitychange', hide)
    }
  }, [screen, onLift, progress])

  useEffect(() => {
    screen?.setAttribute('aria-label', t.site.loading)
  }, [screen, t])

  // The page behind does not scroll, and shows no scrollbar, until the curtain is gone.
  useEffect(() => {
    const held = phase !== 'gone'
    document.documentElement.classList.toggle('is-loading', held)
    if (held) lenis?.stop()
    else lenis?.start()
    return () => document.documentElement.classList.remove('is-loading')
  }, [phase, lenis])

  if (phase === 'gone' || !sheet) return null
  const lifting = phase === 'lifting'

  return createPortal(
    <>
      <motion.div
        className="loader-face"
        initial={{ opacity: 0 }}
        animate={{ opacity: lifting ? 0 : 1 }}
        transition={{ duration: lifting ? 0.35 : 0.6 }}
      >
        <Logo className="loader-logo" />
        <p className="label loader-line">{t.site.tagline}</p>
      </motion.div>
      <motion.span className="loader-bar" style={{ scaleX: drawn }} />
    </>,
    sheet,
  )
}
