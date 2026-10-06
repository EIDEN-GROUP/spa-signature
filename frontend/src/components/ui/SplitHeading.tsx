import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { type ReactNode, useCallback, useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface SplitHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  children: ReactNode
  className?: string
  id?: string
  /** Seconds to wait once the text is in view. */
  delay?: number
}

/**
 * Text that arrives word by word, each line rising from behind its own edge.
 * SplitText re-splits when the webfont lands or the line breaks change, and
 * keeps the full sentence readable to assistive technology.
 */
export function SplitHeading({ as: Tag = 'h2', children, className, id, delay = 0 }: SplitHeadingProps) {
  const ref = useRef<HTMLElement | null>(null)
  const attach = useCallback((node: HTMLElement | null) => {
    ref.current = node
  }, [])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    const context = gsap.context(() => {
      SplitText.create(element, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (split) =>
          gsap.from(split.words, {
            yPercent: 115,
            duration: 1.15,
            ease: 'expo.out',
            stagger: 0.05,
            delay,
            scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          }),
      })
    }, element)

    return () => context.revert()
  }, [delay])

  return (
    <Tag ref={attach} id={id} className={className}>
      {children}
    </Tag>
  )
}
