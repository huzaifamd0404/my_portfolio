'use client'

import { motion } from 'framer-motion'
import SkillsOrbit from './SkillsOrbit'

const Skills = () => {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="line-glow absolute top-0 left-0 w-full" />

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-6">Stack</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            18 tools, <span className="accent-gradient">one</span> system
          </h2>
        </motion.div>

        <SkillsOrbit />

        <div className="mt-12 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ['JAVA', 'SPRING BOOT', 'REACT', 'ANGULAR', 'TYPESCRIPT', 'AWS', 'AZURE', 'KUBERNETES', 'DOCKER', 'KAFKA', 'POSTGRESQL', 'MONGODB']
                .map((s, i) => (
                  <span
                    key={`${s}-${k}-${i}`}
                    className="mx-8 text-2xl font-bold text-white/10 select-none uppercase tracking-wider font-mono"
                  >
                    {s} <span className="text-accent/40 mx-2">·</span>
                  </span>
                ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
