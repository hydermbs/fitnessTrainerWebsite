import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { cx } from '../../lib/cx'

interface SectionProps {
  children: ReactNode
  id?: string
  alt?: boolean
  className?: string
}

export function Section({ children, id, alt = false, className = '' }: SectionProps) {
  return (
    <section id={id} className={cx(alt ? 'bg-surface-alt' : 'bg-canvas', 'py-16 md:py-24', className)}>
      <Container>
        <motion.div initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
          {children}
        </motion.div>
      </Container>
    </section>
  )
}
