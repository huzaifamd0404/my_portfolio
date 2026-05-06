'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export const Counter = ({
  to,
  suffix = '',
  decimals = 0,
  duration = 2,
}: {
  to: number
  suffix?: string
  decimals?: number
  duration?: number
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(eased * to)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default Counter
