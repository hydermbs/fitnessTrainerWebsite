import type { ReactNode } from 'react'

export type CertIconName = 'strength' | 'nutrition' | 'kinesiology'

const ICONS: Record<CertIconName, ReactNode> = {
  strength: (
    <>
      <path d="M4 9v6M8 7v10M16 7v10M20 9v6" />
      <path d="M8 12h8" />
    </>
  ),
  nutrition: (
    <>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" />
      <path d="M5 19l7-7" />
    </>
  ),
  kinesiology: <path d="M3 12h4l3 8 4-16 3 8h4" />,
}

interface CertIconProps {
  name: CertIconName
  size?: number
  className?: string
}

export function CertIcon({ name, size = 24, className = '' }: CertIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}
