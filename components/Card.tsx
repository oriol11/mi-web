interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }: CardProps & { className?: string }) {
  return <div className={`${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }: CardProps & { className?: string }) {
  return <div className={`${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: CardProps & { className?: string }) {
  return <div className={`${className}`}>{children}</div>
}
