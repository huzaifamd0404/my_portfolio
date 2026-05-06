'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

const easings = {
  smooth: [0.16, 1, 0.3, 1],
  silk: [0.25, 0.1, 0.25, 1],
  spring: [0.34, 1.56, 0.64, 1],
}

export const Reveal = ({
  children,
  delay = 0,
  y = 40,
  x = 0,
  scale = 1,
  duration = 0.9,
  className = '',
  easing = 'smooth' as keyof typeof easings,
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
  className?: string
  easing?: keyof typeof easings
  once?: boolean
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x, scale }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ delay, duration, ease: easings[easing] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerReveal = ({
  children,
  className = '',
  staggerDelay = 0.08,
  initialDelay = 0,
}: {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  initialDelay?: number
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
    </motion.div>
  )
}

export default Reveal
