'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const Loader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 1600
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setLoading(false), 400)
    }
    raf = requestAnimationFrame(tick)

    document.body.style.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center"
        >
          {/* Gold ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Animated logo / mark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 relative"
            >
              <div className="text-7xl font-bold tracking-tighter">
                <span className="accent-gradient">H</span>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -inset-4 border border-accent/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border border-accent/40 rounded-full"
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 mb-3">
              <div className="h-[1px] w-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-dark via-accent to-accent-light origin-left"
                  style={{ scaleX: progress / 100 }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between w-64 font-mono text-[10px] tracking-[0.3em] text-muted"
            >
              <span>LOADING</span>
              <span className="text-accent tabular-nums">
                {String(progress).padStart(3, '0')}%
              </span>
            </motion.div>
          </div>

          {/* Bottom edge slide-out */}
          <motion.div
            initial={{ scaleY: 0, originY: 1 }}
            exit={{ scaleY: 1, originY: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-[#050505] origin-bottom pointer-events-none"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
