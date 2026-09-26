"use client"

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import InteractiveDemos from '@/components/InteractiveDemos'
import CodeSection from '@/components/CodeSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'demos', 'code', 'footer']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && ['hero', 'features', 'demos', 'code', 'footer'].includes(hash)) {
        setActiveSection(hash)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('hashchange', handleHashChange)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `#${sectionId}`)
      }
      setActiveSection(sectionId)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-[family-name:var(--font-sans)]"
            >
              ModernApp
            </button>
            
            <div className="hidden md:flex items-center gap-1">
              {['hero', 'features', 'demos', 'code', 'footer'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === section
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <section id="hero" aria-labelledby="hero-heading">
          <Hero />
        </section>
        
        <section id="features" aria-labelledby="features-heading">
          <Features />
        </section>
        
        <section id="demos" aria-labelledby="demos-heading">
          <InteractiveDemos />
        </section>
        
        <section id="code" aria-labelledby="code-heading">
          <CodeSection />
        </section>
        
        <footer id="footer" aria-labelledby="footer-heading">
          <Footer />
        </footer>
      </main>
    </>
  )
}