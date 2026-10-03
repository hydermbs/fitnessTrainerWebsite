import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RotatingSealProps {
  label?: string
  size?: number
  className?: string
}

const RING_PATH = 'M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0'
const RING_STYLE = { transformBox: 'view-box', transformOrigin: '50px 50px' } as const

export function RotatingSeal({
  label = 'CERTIFIED TRAINER',
  size = 128,
  className = '',
}: RotatingSealProps) {
  const prefersReducedMotion = useReducedMotion()
  const pathId = useId()
  const ringText = `${label} • `.repeat(3)

  const ring = (
    <text className="fill-secondary" fontSize="8.5" fontWeight="600" letterSpacing="1.4">
      <textPath href={`#${pathId}`} startOffset="0">
        {ringText}
      </textPath>
    </text>
  )

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        <path id={pathId} d={RING_PATH} fill="none" />
      </defs>
      {prefersReducedMotion ? (
        <g style={RING_STYLE}>{ring}</g>
      ) : (
        <motion.g
          style={RING_STYLE}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        >
          {ring}
        </motion.g>
      )}
      <g className="fill-accent">
        <rect x="40" y="47" width="20" height="6" rx="2" />
        <rect x="34" y="43" width="6" height="14" rx="2" />
        <rect x="60" y="43" width="6" height="14" rx="2" />
      </g>
    </svg>
  )
}
