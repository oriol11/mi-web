import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/30 dark:from-blue-900/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 id="hero-heading" className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
          Build Tomorrow
          <span className="block text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mt-4">Today</span>
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          A modern, responsive, and accessible web application built with cutting-edge technologies and thoughtful design.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#features" 
            onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300"
          >
            Explore Features
          </a>
          <a 
            href="#code" 
            onClick={(e) => { e.preventDefault(); document.getElementById('code')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-8 py-4 text-lg font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            View Code
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }} aria-label="Scroll to features">
          <ArrowDown className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </a>
      </div>
    </section>
  )
}