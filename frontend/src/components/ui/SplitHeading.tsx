import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { type ReactNode, useCallback, useLayoutEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { prefersReducedMotion } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface SplitHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  children: ReactNode
  className?: string
  id?: string
  /** Seconds to wait once the text is in view. */
  delay?: number
  /** Hold the text back until this is true: for a heading that waits for the page to open. */
  ready?: boolean
}

/**
 * Text that arrives word by word, each line rising from behind its own edge.
 * SplitText re-splits when the webfont lands or the line breaks change, and
 * keeps the full sentence readable to assistive technology.
 */
export function SplitHeading({ as: Tag = 'h2', children, className, id, delay = 0, ready = true }: SplitHeadingProps) {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement | null>(null)
  const attach = useCallback((node: HTMLElement | null) => {
    ref.current = node
  }, [])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    // Held back: out of sight, and not split yet.
    if (!ready) {
      gsap.set(element, { autoAlpha: 0 })
      return () => {
        gsap.set(element, { clearProps: 'opacity,visibility' })
      }
    }

    const context = gsap.context(() => {
      SplitText.create(element, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (split) =>
          gsap.from(split.words, {
            yPercent: 130,
            duration: 1.15,
            ease: 'expo.out',
            stagger: 0.05,
            delay,
            // Plays on the way down; steps back when the text drops below the fold again.
            scrollTrigger: { trigger: element, start: 'top 92%', toggleActions: 'play none none reverse' },
          }),
      })
    }, element)

    return () => context.revert()
  }, [delay, ready, language])

  return (
    <Tag key={language} ref={attach} id={id} className={className}>
      {children}
    </Tag>
  )
}
