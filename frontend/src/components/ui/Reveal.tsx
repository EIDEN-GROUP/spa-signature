import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { rise, stagger, VIEWPORT } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to wait after entering the viewport. */
  delay?: number
}

/** Fades its content up the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div className={className} variants={rise} custom={delay} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Reveals its motion children one after another. Children bring their own variants. */
export function Stagger({ children, className, gap, delay, as = 'div' }: StaggerProps) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
      {children}
    </Tag>
  )
}
