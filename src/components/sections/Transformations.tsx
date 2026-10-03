import { useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { BeforeAfter } from '../ui/BeforeAfter'
import { fadeUp } from '../../lib/motion'
import { cx } from '../../lib/cx'
import { siteContent } from '../../config/siteContent'
import type { TransformationCategory } from '../../config/siteContent'

const { transformations } = siteContent
type Filter = TransformationCategory | 'all'

function matchesFilter(categories: TransformationCategory[], filter: Filter): boolean {
  return filter === 'all' || categories.includes(filter)
}

export function Transformations() {
  const [filter, setFilter] = useState<Filter>('all')
  const visibleCases = transformations.cases.filter((item) => matchesFilter(item.categories, filter))

  return (
    <Section id="transformations" alt>
      <SectionHeading as="h1" badge={transformations.badge} title={transformations.title} subtitle={transformations.subtitle} />

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
        {transformations.filters.map((option) => {
          const isActive = filter === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={isActive}
              className={cx(
                'h-11 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                isActive
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-surface text-secondary hover:text-primary',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </motion.div>

      <motion.div layout variants={fadeUp} className="mt-8 grid gap-6 md:grid-cols-2">
        {visibleCases.map((item) => (
          <motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card"
          >
            <BeforeAfter before={item.before} after={item.after} />
            <p className="mt-4 text-sm font-semibold text-accent">{item.tag}</p>
            <p className="mt-2 text-secondary">{item.quote}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
