import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CursorSpotlight from '@/components/CursorSpotlight'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import Loader from '@/components/Loader'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MD Huzaifa — Full Stack Developer',
  description: 'Full Stack Developer specializing in Java, Spring Boot, React, Angular, and Cloud Technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-[#050505] text-[#f0ece4] antialiased font-sans">
        <Loader />
        <SmoothScroll>
          <div className="noise-overlay" />
          <CursorSpotlight />
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
