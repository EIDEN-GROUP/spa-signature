import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { type ReactNode, useEffect, useState } from 'react'
import { LenisContext } from '@/hooks/use-lenis'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/** Lenis eases the page scroll; GSAP's ticker drives it so scroll-linked text stays in step. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, anchors: true, autoRaf: false })
    const tick = (time: number) => instance.raf(time * 1000)
    const off = instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      off()
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext value={lenis}>{children}</LenisContext>
}
