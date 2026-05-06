'use client'

import { motion } from 'framer-motion'

const Education = () => {
  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="line-glow absolute top-0 left-0 w-full" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-6">Education</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="accent-gradient">Foundation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="relative glass rounded-3xl p-10 md:p-14 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.03] rounded-full blur-[60px] group-hover:bg-accent/[0.06] transition-all duration-1000" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/[0.02] rounded-full blur-[80px]" />

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-500">
                    MS Information Technology
                  </h3>
                  <p className="text-muted text-sm font-mono tracking-wider">Concordia University — St. Paul</p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-4xl font-bold accent-gradient">3.83</div>
                  <div className="text-[10px] text-muted tracking-[0.2em] uppercase">GPA</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-[10px] font-mono text-muted mb-2">
                  <span>ACADEMIC PERFORMANCE</span>
                  <span>3.83 / 4.00</span>
                </div>
                <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '95.75%' }}
                    transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-accent-dark via-accent to-accent-light rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {['Full Stack', 'Cloud', 'Microservices', 'System Design'].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider border border-white/[0.04] text-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
