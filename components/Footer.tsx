import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer 
      id="footer"
      aria-labelledby="footer-heading"
      className="bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 dark:from-gray-950 dark:via-blue-950 dark:to-violet-950 text-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 id="footer-heading" className="text-2xl font-bold mb-4">ModernApp</h3>
            <p className="text-blue-100 dark:text-blue-200 leading-relaxed">
              A beautifully designed, responsive, and accessible web application.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Hero', 'Features', 'Demos', 'Code', 'Footer'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-blue-100 dark:text-blue-200 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-blue-100 dark:text-blue-200 mb-2">hello@modernapp.com</p>
          </div>
        </div>
        
        <div className="border-t border-blue-800 dark:border-blue-950 pt-8 text-center text-blue-200 dark:text-blue-300 flex items-center justify-center gap-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          <span>and modern technologies</span>
        </div>
      </div>
    </footer>
  )
}