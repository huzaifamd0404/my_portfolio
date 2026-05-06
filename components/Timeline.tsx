'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const events = [
  {
    year: '2025',
    company: 'Walmart',
    role: 'Senior Full Stack Engineer',
    title: 'Retail Platform',
    desc: 'Built high-volume order processing on Spring Boot microservices serving millions of customers.',
    tech: ['Java', 'Spring Boot', 'React', 'Azure', 'Kubernetes', 'Kafka'],
    metric: { value: '50M+', label: 'Daily Requests' },
  },
  {
    year: '2023',
    company: 'Cleveland Clinic',
    role: 'Full Stack Developer',
    title: 'Patient Management Platform',
    desc: 'HIPAA-compliant patient portal with real-time appointment system and EHR integration.',
    tech: ['Java', 'Spring Boot', 'Angular', 'AWS', 'PostgreSQL'],
    metric: { value: '99.9%', label: 'Uptime SLA' },
  },
  {
    year: '2021',
    company: 'JPMorgan Chase',
    role: 'Software Engineer',
    title: 'Transaction Processing',
    desc: 'Event-driven architecture for secure financial transactions with sub-100ms latency.',
    tech: ['Java', 'Spring Boot', 'React', 'Oracle', 'Docker'],
    metric: { value: '<100ms', label: 'Latency P99' },
  },
]

const TimelineNode = ({ event, index, total }: { event: typeof events[0]; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-center"
    >
      {/* Left side */}
      <div className={`${isLeft ? 'block' : 'hidden md:block md:opacity-0'} text-right`}>
        {isLeft && <ProjectCard event={event} align="right" />}
      </div>

      {/* Center node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          {/* Pulsing rings */}
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            className="absolute inset-0 rounded-full border border-accent"
          />
          <div className="w-5 h-5 rounded-full bg-dark-100 border-2 border-accent shadow-[0_0_20px_rgba(232,168,73,0.6)]">
            <div className="absolute inset-1 rounded-full bg-accent animate-pulse" />
          </div>
        </motion.div>

        {/* Year label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-8 font-mono text-[10px] tracking-[0.3em] text-accent/70 whitespace-nowrap"
        >
          {event.year}
        </motion.div>
      </div>

      {/* Right side (mobile shows everything here) */}
      <div className={`${!isLeft ? 'block' : 'block md:hidden'}`}>
        {!isLeft && <ProjectCard event={event} align="left" />}
        {isLeft && <div className="md:hidden"><ProjectCard event={event} align="left" /></div>}
      </div>
    </motion.div>
  )
}

const ProjectCard = ({ event, align }: { event: typeof events[0]; align: 'left' | 'right' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative glass rounded-2xl p-6 md:p-8 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="text-[10px] font-mono text-accent/70 tracking-[0.2em] uppercase mb-1">
              {event.role}
            </div>
            <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-500">
              {event.company}
            </h3>
          </div>

          {/* Metric */}
          <div className={`text-right shrink-0 ${align === 'right' ? 'order-first text-left' : ''}`}>
            <div className="text-2xl font-bold accent-gradient leading-none">{event.metric.value}</div>
            <div className="text-[8px] font-mono text-muted tracking-[0.2em] mt-1 uppercase">
              {event.metric.label}
            </div>
          </div>
        </div>

        <p className="text-muted text-sm mb-4 leading-relaxed">
          {event.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {event.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider border border-white/[0.04] text-muted group-hover:border-accent/20 group-hover:text-accent/80 transition-all duration-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      {/* Background line (faded) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.04]" />

      {/* Animated drawing line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-accent via-accent to-transparent shadow-[0_0_15px_rgba(232,168,73,0.5)]"
      />

      {/* Top dot */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(232,168,73,0.6)]" />

      <div className="space-y-32 py-12">
        {events.map((event, i) => (
          <TimelineNode key={event.year} event={event} index={i} total={events.length} />
        ))}
      </div>

      {/* Bottom marker */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 rounded-full border-2 border-accent/40" />
    </div>
  )
}

export default Timeline
