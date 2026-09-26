import { Card, CardBody, CardHeader } from '@/components/Card'
import { Code2, Terminal } from 'lucide-react'

export default function CodeSection() {
  return (
    <section 
      id="code" 
      aria-labelledby="code-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="code-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Code Example
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Component Structure</h3>
            </div>
            <CardBody className="p-0">
              <pre className="overflow-x-auto p-6 font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800">
                <code>{`export default function Component() {
  return (
    <section aria-label="Section">
      <h2>Title</h2>
      <p>Description</p>
    </section>
  )
}`}</code>
              </pre>
            </CardBody>
          </Card>
          
          <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Smooth Scroll</h3>
            </div>
            <CardBody className="p-0">
              <pre className="overflow-x-auto p-6 font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800">
                <code>{`element.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
  inline: 'nearest'
})`}</code>
              </pre>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}