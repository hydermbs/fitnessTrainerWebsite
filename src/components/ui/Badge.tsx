import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function Badge({ children, icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft-foreground ${className}`}
    >
      {icon}
      {children}
    </span>
  )
}
