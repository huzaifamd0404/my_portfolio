'use client'

import { motion } from 'framer-motion'
import ArchitectureDiagram from './ArchitectureDiagram'
import Counter from './Counter'

const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="line-glow absolute top-0 left-0 w-full" />

      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-6">About</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            I architect <span className="accent-gradient">distributed</span>
            <br />systems at scale.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24 max-w-5xl mx-auto">
          {[
            { value: 3, suffix: '+', label: 'YEARS', sub: 'shipping' },
            { value: 50, suffix: 'M+', label: 'REQUESTS', sub: 'per day handled' },
            { value: 99.9, suffix: '%', label: 'UPTIME', sub: 'production SLA', decimals: 1 },
            { value: 3.83, label: 'GPA', sub: 'MS, IT', decimals: 2 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative glass rounded-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/[0.04] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-3 right-3 flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-accent/60" />
                  <span className="w-1 h-1 rounded-full bg-accent/30" />
                  <span className="w-1 h-1 rounded-full bg-accent/10" />
                </div>

                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold accent-gradient mb-1 leading-none tabular-nums">
                    <Counter to={stat.value} suffix={stat.suffix || ''} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-[10px] font-mono text-accent/70 tracking-[0.2em] mt-3">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-muted/60 mt-0.5">
                    {stat.sub}
                  </div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-10">
            <p className="font-mono text-accent text-[10px] tracking-[0.4em] uppercase mb-2">
              Live System Diagram
            </p>
            <p className="text-muted text-sm">
              The kind of architecture I design and ship.
            </p>
          </div>

          <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-accent/[0.03] rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent/[0.02] rounded-full blur-[80px]" />

            <ArchitectureDiagram />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
