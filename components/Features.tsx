import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Code2, Wrench, Palette, Sun, Moon, Box } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Wrench className="w-6 h-6 text-blue-500" />,
      title: "Responsive Design",
      description: "Build responsive layouts that work flawlessly across all device sizes, from mobile to desktop and beyond."
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      title: "Modern Tech Stack",
      description: "Leverage the latest technologies to build fast, maintainable, and scalable applications."
    },
    {
      icon: <Palette className="w-6 h-6 text-blue-500" />,
      title: "Accessibility First",
      description: "Design with accessibility in mind to ensure everyone can use your application."
    },
    {
      icon: <Sun className="w-6 h-6 text-blue-500" />,
      title: "Dark Mode",
      description: "Seamless dark mode support with automatic system preference detection."
    },
    {
      icon: <Moon className="w-6 h-6 text-blue-500" />,
      title: "Performance Optimized",
      description: "Optimized for speed and performance with modern web standards."
    },
    {
      icon: <Box className="w-6 h-6 text-blue-500" />,
      title: "Interactive Elements",
      description: "Engage users with interactive components and animations."
    }
  ]

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-6">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 flex-shrink-0">{feature.icon}</span>
              </div>
              
              <h3 id={`feature-title-${index}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#code" 
            onClick={(e) => { e.preventDefault(); document.getElementById('code')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300"
          >
            View Code
          </a>
        </div>
      </div>
    </section>
  )
}