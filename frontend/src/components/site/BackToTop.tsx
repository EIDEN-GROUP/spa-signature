import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/hooks/use-language'
import { useLenis } from '@/hooks/use-lenis'
import { cx } from '@/lib/utils'

export function BackToTop() {
  const t = useT()
  const lenis = useLenis()
  const { scrollY, scrollYProgress } = useScroll()
  const [shown, setShown] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.9))

  const rise = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button type="button" className={cx('back-to-top', shown && 'back-to-top-shown')} onClick={rise} aria-label={t.nav.top} inert={!shown}>
      <svg className="back-to-top-ring" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="23" />
        <motion.circle cx="24" cy="24" r="23" style={{ pathLength: scrollYProgress }} />
      </svg>
      <Icon name="arrow-up" />
    </button>
  )
}
