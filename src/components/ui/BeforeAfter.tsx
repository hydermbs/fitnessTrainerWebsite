import { useCallback, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface TransformImage {
  src: string
  alt: string
}

interface BeforeAfterProps {
  before: TransformImage
  after: TransformImage
  className?: string
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function CornerLabel({ text, side }: { text: string; side: 'left' | 'right' }) {
  const position = side === 'left' ? 'left-3' : 'right-3'
  return (
    <span
      className={`absolute bottom-3 ${position} rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary`}
    >
      {text}
    </span>
  )
}

function SideBySide({ before, after, className }: Required<BeforeAfterProps>) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {[before, after].map((image, index) => (
        <div key={image.src} className="relative overflow-hidden rounded-xl border border-border">
          <img src={image.src} alt={image.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <CornerLabel text={index === 0 ? 'Before' : 'After'} side={index === 0 ? 'left' : 'right'} />
        </div>
      ))}
    </div>
  )
}

function DragCompare({ before, after, className }: Required<BeforeAfterProps>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(50)

  const setPercentFromClientX = useCallback((clientX: number) => {
    const node = containerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    setPercent(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100))
  }, [])

  const nudge = useCallback((event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowLeft') setPercent((value) => clamp(value - 4, 0, 100))
    if (event.key === 'ArrowRight') setPercent((value) => clamp(value + 4, 0, 100))
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/5] select-none overflow-hidden rounded-xl border border-border ${className}`}
    >
      <img src={after.src} alt={after.alt} className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before.src}
        alt={before.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      />
      <CornerLabel text="Before" side="left" />
      <CornerLabel text="After" side="right" />
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(_, info) => setPercentFromClientX(info.point.x)}
        onPointerDown={(event) => setPercentFromClientX(event.clientX)}
        onKeyDown={nudge}
        role="slider"
        tabIndex={0}
        aria-label="Reveal before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        className="absolute top-0 bottom-0 -ml-0.5 w-1 cursor-ew-resize bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ left: `${percent}%` }}
      />
    </div>
  )
}

export function BeforeAfter({ before, after, className = '' }: BeforeAfterProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return <SideBySide before={before} after={after} className={className} />
  return <DragCompare before={before} after={after} className={className} />
}
