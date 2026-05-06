'use client'

import { motion } from 'framer-motion'
import Timeline from './Timeline'

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="line-glow absolute top-0 left-0 w-full" />

      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-6">Journey</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            Where I&apos;ve <span className="accent-gradient">shipped</span>
          </h2>
        </motion.div>

        <Timeline />
      </div>
    </section>
  )
}

export default Projects
