import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'

type ButtonVariant = 'primary' | 'ghost' | 'soft'

const BASE =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-foreground hover:bg-accent-support',
  ghost: 'border border-border bg-transparent text-primary hover:border-accent hover:text-accent',
  soft: 'bg-accent-soft text-accent-soft-foreground hover:brightness-95',
}

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  to?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

function isExternal(to: string): boolean {
  return to.startsWith('http') || to.startsWith('mailto:')
}

export function Button({
  children,
  variant = 'primary',
  icon,
  to,
  type = 'button',
  onClick,
  disabled,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cx(BASE, VARIANTS[variant], className)
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
          {icon}
        </span>
      )}
    </>
  )

  if (to && isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  if (to && to.startsWith('#')) {
    return (
      <a href={to} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
