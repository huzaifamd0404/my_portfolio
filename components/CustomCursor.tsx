'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.5 })
  const ringY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.5 })

  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const detectHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      if (target.closest('a, button, [role="button"], .magnetic-target')) {
        setVariant('hover')
      } else if (target.closest('h1, h2, h3, p, input, textarea')) {
        setVariant('text')
      } else {
        setVariant('default')
      }
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', detectHover)
    window.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', detectHover)
      window.removeEventListener('mouseleave', leave)
    }
  }, [cursorX, cursorY, visible])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: variant === 'hover' ? 0 : variant === 'text' ? 4 : 8,
          height: variant === 'hover' ? 0 : variant === 'text' ? 24 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-[#f0ece4] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: variant === 'hover' ? 56 : 32,
          height: variant === 'hover' ? 56 : 32,
          opacity: visible ? (variant === 'hover' ? 1 : 0.5) : 0,
          borderColor: variant === 'hover' ? 'rgba(232, 168, 73, 0.8)' : 'rgba(232, 168, 73, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="w-full h-full border rounded-full -translate-x-1/2 -translate-y-1/2" style={{ borderColor: 'inherit' }} />
      </motion.div>
    </>
  )
}

export default CustomCursor
