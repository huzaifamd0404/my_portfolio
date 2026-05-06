'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let mouse = { x: -1000, y: -1000 }
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouse = { x: e.clientX, y: e.clientY }
    })

    const particles: { x: number; y: number; baseX: number; baseY: number; size: number; speed: number; angle: number }[] = []
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x, y, baseX: x, baseY: y,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.005 + 0.002,
        angle: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      particles.forEach((p, i) => {
        p.angle += p.speed
        p.x = p.baseX + Math.cos(p.angle) * 30
        p.y = p.baseY + Math.sin(p.angle * 0.7) * 20

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          p.x -= dx * force * 0.05
          p.y -= dy * force * 0.05
        }

        const alpha = 0.15 + Math.sin(time + i) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 168, 73, ${alpha})`
        ctx.fill()

        particles.forEach((p2, j) => {
          if (j <= i) return
          const d = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(232, 168, 73, ${0.04 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

const GlowingOrb = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px] animate-float" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] animate-float-slow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] morph-blob bg-accent/[0.02] blur-[80px]" />
  </div>
)

const TypeWriter = ({ words }: { words: string[] }) => {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWord]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentChar < word.length) {
          setCurrentChar(currentChar + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2500)
        }
      } else {
        if (currentChar > 0) {
          setCurrentChar(currentChar - 1)
        } else {
          setIsDeleting(false)
          setCurrentWord((currentWord + 1) % words.length)
        }
      }
    }, isDeleting ? 30 : 70)

    return () => clearTimeout(timeout)
  }, [currentChar, isDeleting, currentWord, words])

  return (
    <span className="font-mono">
      {words[currentWord].substring(0, currentChar)}
      <span className="animate-pulse text-accent">_</span>
    </span>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="gradient-mesh" />
      <ParticleField />
      <GlowingOrb />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 2 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent tracking-wider">AVAILABLE FOR WORK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[9rem] lg:text-[11rem] font-bold leading-[0.85] tracking-tighter mb-6"
          >
            <span className="block text-[#f0ece4]/90">MD</span>
            <span className="block accent-gradient glow-text">Huzaifa</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted mb-14 h-7"
          >
            <TypeWriter words={['Microservices Architect', 'Cloud Engineer', 'Full Stack Developer']} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-5"
          >
            <a
              href="#projects"
              className="group relative px-8 py-3.5 bg-accent text-[#050505] font-bold text-sm tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(232,168,73,0.4)]"
            >
              <span className="relative z-10">VIEW WORK</span>
              <span className="absolute inset-0 bg-accent-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-accent/20 text-accent font-bold text-sm tracking-wide rounded-full hover:bg-accent/5 hover:border-accent/40 transition-all duration-500"
            >
              SAY HELLO
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mt-20"
          >
            {[
              { icon: FaGithub, href: 'https://github.com/mdhuzaifa' },
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/md-huzaifa-11087b3a9' },
              { icon: FaEnvelope, href: 'mailto:huzaifama0303@gmail.com' },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full border border-white/[0.06] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-colors duration-500"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-accent/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
