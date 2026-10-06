import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { Khatam } from '@/components/ui/Khatam'
import { useLenis } from '@/hooks/use-lenis'
import { cx, prefersReducedMotion } from '@/lib/utils'

/** A slow line of words that gathers pace while the page is scrolling. Decorative. */
export function Marquee({ words, className }: { words: string[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween | null>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!track.current || prefersReducedMotion()) return
    tween.current = gsap.to(track.current, { xPercent: -50, duration: 48, ease: 'none', repeat: -1 })
    return () => {
      tween.current?.kill()
      tween.current = null
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    return lenis.on('scroll', ({ velocity }) => {
      if (!tween.current) return
      const pace = 1 + Math.min(Math.abs(velocity) * 0.35, 5)
      gsap.to(tween.current, { timeScale: pace, duration: 0.3, overwrite: true })
      gsap.to(tween.current, { timeScale: 1, duration: 1.2, delay: 0.3 })
    })
  }, [lenis])

  // The list runs twice so the loop has no seam.
  const run = (
    <ul className="marquee-run">
      {words.map((word) => (
        <li key={word}>
          <span>{word}</span>
          <Khatam className="marquee-star" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cx('marquee', className)} aria-hidden="true">
      <div ref={track} className="marquee-track">
        {run}
        {run}
      </div>
    </div>
  )
}
