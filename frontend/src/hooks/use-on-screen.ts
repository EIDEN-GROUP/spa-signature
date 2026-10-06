import { useEffect, useRef, useState } from 'react'

/** Whether `ref` is on screen. Used to show the sticky contact bar once the in-page actions scroll away. */
export function useOnScreen<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin })
    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])
  return { ref, visible }
}
