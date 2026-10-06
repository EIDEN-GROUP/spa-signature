import { useEffect, useState } from 'react'
import { type MoroccoTime, moroccoTime } from '@/lib/hours'

/** Morocco's wall-clock time, refreshed each minute. Null until mounted, so server and client agree. */
export function useMoroccoTime(): MoroccoTime | null {
  const [now, setNow] = useState<MoroccoTime | null>(null)
  useEffect(() => {
    setNow(moroccoTime())
    const timer = window.setInterval(() => setNow(moroccoTime()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  return now
}
