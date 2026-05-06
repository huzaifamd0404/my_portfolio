'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: string
  duration?: number
}

const AnimatedCounter = ({ target, duration = 1500 }: AnimatedCounterProps) => {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numericPart = parseFloat(target.replace(/[^0-9.]/g, ''))
          const suffix = target.replace(/[0-9.]/g, '')
          const isDecimal = target.includes('.')
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = numericPart * eased

            if (isDecimal) {
              setDisplay(current.toFixed(2) + suffix)
            } else {
              setDisplay(Math.floor(current) + suffix)
            }

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplay(target)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <div ref={ref}>{display}</div>
}

export default AnimatedCounter
