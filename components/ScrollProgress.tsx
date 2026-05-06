'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'WORK' },
  { id: 'education', label: 'EDU' },
  { id: 'contact', label: 'CONTACT' },
]

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [active, setActive] = useState('home')
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const handler = () => {
      const sc = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setPercent(Math.round(sc * 100))
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handler)
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-dark via-accent to-accent-light origin-left z-[60]"
        style={{ scaleX: scaleY }}
      />

      {/* Side dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4">
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-3"
            >
              <span
                className={`text-[10px] font-mono tracking-[0.2em] transition-all duration-500 ${
                  isActive ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-60'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-3 h-3 bg-accent shadow-[0_0_15px_rgba(232,168,73,0.6)]'
                    : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-accent/60'
                }`}
              />
            </a>
          )
        })}
      </div>

      {/* Percentage indicator (bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="font-mono text-[10px] text-muted tracking-wider">
          <span className="text-accent">{String(percent).padStart(2, '0')}</span>
          <span className="text-muted/40"> / 100</span>
        </div>
      </div>
    </>
  )
}

export default ScrollProgress
