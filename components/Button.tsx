interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button 
      className={`font-medium transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}