interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <header className={`${className}`}>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </header>
  )
}