import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { type ReactNode, useRef } from 'react'
import { cx } from '@/lib/utils'

interface SceneProps {
  children: ReactNode
  className?: string
  /**
   * For a panel or a band with its own ground: it starts a little small and
   * grows to full size on the way in, and draws back on the way out. Without
   * it the content keeps its size and fades as it leaves.
   */
  panel?: boolean
}

/**
 * A block of the page that answers the scroll as it leaves through the top of
 * the screen, and for a panel as it arrives too. The movement is tied to the
 * scroll position, not to a timer, so it runs backwards on the way back up.
 */
export function Scene({ children, className, panel = false }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress: arriving } = useScroll({ target: ref, offset: ['start end', 'start 45%'] })
  const { scrollYProgress: leaving } = useScroll({ target: ref, offset: ['end 36%', 'end start'] })

  const opacity = useTransform(leaving, [0, 1], [1, panel ? 1 : 0])
  const y = useTransform(leaving, [0, 1], [0, panel ? 0 : -72])
  const scale = useTransform([arriving, leaving], ([a, l]: number[]) =>
    panel ? 0.9 + 0.1 * a - 0.07 * l : 1 - 0.04 * l,
  )

  return (
    <div ref={ref} className={cx('scene', className)}>
      <motion.div className="scene-body" style={still ? undefined : { opacity, y, scale }}>
        {children}
      </motion.div>
    </div>
  )
}
