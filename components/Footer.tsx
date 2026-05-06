'use client'

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-mono text-muted/40 tracking-wider">
          &copy; {new Date().getFullYear()} MD HUZAIFA
        </p>
        <p className="text-[11px] font-mono text-muted/30 tracking-wider">
          DESIGNED & BUILT WITH PRECISION
        </p>
      </div>
    </footer>
  )
}

export default Footer
