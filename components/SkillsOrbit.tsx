'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaReact, FaJava, FaDocker, FaGitAlt, FaAws, FaAngular } from 'react-icons/fa'
import {
  SiTypescript, SiSpring, SiMongodb, SiPostgresql, SiMysql,
  SiKubernetes, SiJenkins, SiMicrosoftazure, SiOracle, SiApachekafka,
  SiRedis, SiGraphql,
} from 'react-icons/si'

interface SkillNode {
  name: string
  icon: any
  ring: 0 | 1 | 2
  angle: number
}

const skills: SkillNode[] = [
  // Inner ring — core
  { name: 'Java', icon: FaJava, ring: 0, angle: 0 },
  { name: 'Spring Boot', icon: SiSpring, ring: 0, angle: 90 },
  { name: 'React', icon: FaReact, ring: 0, angle: 180 },
  { name: 'AWS', icon: FaAws, ring: 0, angle: 270 },
  // Middle ring
  { name: 'TypeScript', icon: SiTypescript, ring: 1, angle: 30 },
  { name: 'Angular', icon: FaAngular, ring: 1, angle: 90 },
  { name: 'Kafka', icon: SiApachekafka, ring: 1, angle: 150 },
  { name: 'Docker', icon: FaDocker, ring: 1, angle: 210 },
  { name: 'K8s', icon: SiKubernetes, ring: 1, angle: 270 },
  { name: 'Azure', icon: SiMicrosoftazure, ring: 1, angle: 330 },
  // Outer ring
  { name: 'PostgreSQL', icon: SiPostgresql, ring: 2, angle: 0 },
  { name: 'MongoDB', icon: SiMongodb, ring: 2, angle: 45 },
  { name: 'MySQL', icon: SiMysql, ring: 2, angle: 90 },
  { name: 'Oracle', icon: SiOracle, ring: 2, angle: 135 },
  { name: 'Redis', icon: SiRedis, ring: 2, angle: 180 },
  { name: 'GraphQL', icon: SiGraphql, ring: 2, angle: 225 },
  { name: 'Jenkins', icon: SiJenkins, ring: 2, angle: 270 },
  { name: 'Git', icon: FaGitAlt, ring: 2, angle: 315 },
]

const ringRadii = [110, 200, 290]

const SkillsOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 150, damping: 20 })
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 150, damping: 20 })

  useEffect(() => {
    let raf: number
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!paused) setRotation(r => r + dt * 0.008)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  const handleMouse = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setPaused(true)}
      className="relative w-full h-[700px] flex items-center justify-center"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative w-[700px] h-[700px]"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        {/* Orbital rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-350 -350 700 700">
          {ringRadii.map((r, i) => (
            <g key={i}>
              <circle
                cx={0}
                cy={0}
                r={r}
                fill="none"
                stroke="rgba(232, 168, 73, 0.08)"
                strokeWidth={1}
                strokeDasharray="2 6"
              />
              {/* Glowing dots on ring */}
              <motion.circle
                cx={r}
                cy={0}
                r={2}
                fill="rgba(232, 168, 73, 0.4)"
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '0 0' }}
              />
            </g>
          ))}

          {/* Connection lines from center */}
          {skills.map((s, i) => {
            const radius = ringRadii[s.ring]
            const angle = ((s.angle + rotation * (s.ring === 0 ? 1 : s.ring === 1 ? -0.7 : 0.5)) * Math.PI) / 180
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            const isHovered = hovered === s.name
            return (
              <line
                key={`line-${i}`}
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke="rgba(232, 168, 73, 0.1)"
                strokeWidth={isHovered ? 1 : 0.5}
                opacity={isHovered ? 0.6 : 0.2}
                style={{ transition: 'all 0.3s' }}
              />
            )
          })}
        </svg>

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-accent/30 blur-xl"
            />
            <div className="relative w-20 h-20 rounded-full glass-strong flex items-center justify-center border border-accent/40">
              <div className="text-center">
                <div className="text-[8px] font-mono text-muted tracking-[0.2em]">CORE</div>
                <div className="text-xl font-bold accent-gradient">H</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill nodes */}
        {skills.map((skill, i) => {
          const radius = ringRadii[skill.ring]
          const speed = skill.ring === 0 ? 1 : skill.ring === 1 ? -0.7 : 0.5
          const angle = ((skill.angle + rotation * speed) * Math.PI) / 180
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const isHovered = hovered === skill.name

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: 'backOut' }}
              onHoverStart={() => setHovered(skill.name)}
              onHoverEnd={() => setHovered(null)}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                x: x - 28,
                y: y - 28,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.4, z: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isHovered
                    ? 'bg-accent/20 border-2 border-accent shadow-[0_0_30px_rgba(232,168,73,0.6)]'
                    : 'glass border border-white/[0.06]'
                }`}
              >
                <skill.icon
                  className={`text-xl transition-colors duration-300 ${
                    isHovered ? 'text-accent' : 'text-muted'
                  }`}
                />

                {/* Floating label */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? -36 : -28,
                  }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent text-[#050505] text-[9px] font-mono font-bold tracking-wider whitespace-nowrap pointer-events-none"
                >
                  {skill.name}
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Hover instruction */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[10px] font-mono text-muted/40 tracking-[0.3em] uppercase">
          Move cursor — explore the stack
        </p>
      </div>
    </div>
  )
}

export default SkillsOrbit
