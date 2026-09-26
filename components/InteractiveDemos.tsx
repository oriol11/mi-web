import { Card, CardHeader, CardBody, CardFooter } from '@/components/Card'
import { Button } from '@/components/Button'
import { Cube, Code2, Monitor } from 'lucide-react'

export default function InteractiveDemos() {
  return (
    <section 
      id="demos" 
      aria-labelledby="demos-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="demos-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Interactive Demos
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore interactive components and see how they work in action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Responsive Grid</h3>
              <Cube className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardBody className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A flexible grid system that adapts to any screen size with minimal effort.
            </CardBody>
            <CardFooter className="mt-6 flex justify-end">
              <Button 
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-blue-600/25 transition"
              >
                Explore
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Interactive Form</h3>
              <Code2 className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardBody className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A fully accessible form with validation, real-time feedback, and smooth animations.
            </CardBody>
            <CardFooter className="mt-6 flex justify-end">
              <Button 
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-blue-600/25 transition"
              >
                Try It
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Animated Buttons</h3>
              <Monitor className="w-6 h-6 text-blue-500" />
            </CardHeader>
            <CardBody className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Buttons with subtle animations and hover effects for enhanced user experience.
            </CardBody>
            <CardFooter className="mt-6 flex justify-end">
              <Button 
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-blue-600/25 transition"
              >
                See Demo
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}