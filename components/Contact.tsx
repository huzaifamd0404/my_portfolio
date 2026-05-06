'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const Contact = () => {
  return (
    <section id="contact" className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid" />
      <div className="line-glow absolute top-0 left-0 w-full" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-accent text-xs tracking-[0.4em] uppercase mb-6">Contact</p>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            Let&apos;s <span className="accent-gradient">connect</span>
          </h2>
          <p className="text-muted text-lg mb-16 max-w-md mx-auto">
            Open to new opportunities and collaborations.
          </p>
        </motion.div>

        <motion.a
          href="mailto:huzaifama0303@gmail.com"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-[#050505] font-bold text-sm tracking-wider rounded-full shadow-[0_0_40px_rgba(232,168,73,0.2)] hover:shadow-[0_0_60px_rgba(232,168,73,0.4)] transition-shadow duration-500"
        >
          <FaEnvelope />
          <span>GET IN TOUCH</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          {[
            { icon: FaGithub, href: 'https://github.com/mdhuzaifa', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/md-huzaifa-11087b3a9', label: 'LinkedIn' },
            { icon: FaEnvelope, href: 'mailto:huzaifama0303@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors duration-500"
              aria-label={label}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-8 text-xs font-mono text-muted/50 tracking-wider"
        >
          huzaifama0303@gmail.com — +1 (507) 517-9684
        </motion.p>
      </div>
    </section>
  )
}

export default Contact
