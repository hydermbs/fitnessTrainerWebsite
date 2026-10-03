import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'
import { fadeUp } from '../../lib/motion'
import { cx } from '../../lib/cx'

interface SectionHeadingProps {
  badge: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({ badge, title, subtitle, align = 'left', as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <motion.div variants={fadeUp} className={cx('max-w-2xl space-y-4', align === 'center' && 'mx-auto text-center')}>
      <Badge>{badge}</Badge>
      <Heading className="font-display text-4xl uppercase leading-tight tracking-tight text-primary md:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="text-lg text-secondary">{subtitle}</p>}
    </motion.div>
  )
}
