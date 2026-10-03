import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { Button } from '../ui/Button'
import { fadeUp } from '../../lib/motion'
import { cx } from '../../lib/cx'
import { siteContent } from '../../config/siteContent'

const { pricing } = siteContent

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-accent-support" aria-hidden="true">
      <path d="M4 10l4 4 8-9" />
    </svg>
  )
}

function Included({ included }: { included: boolean }) {
  return (
    <span className="inline-flex" role="img" aria-label={included ? 'Included' : 'Not included'}>
      {included ? (
        <CheckMark />
      ) : (
        <svg viewBox="0 0 20 20" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="text-secondary/50" aria-hidden="true">
          <path d="M5 10h10" />
        </svg>
      )}
    </span>
  )
}

export function Pricing({ as = 'h2' }: { as?: 'h1' | 'h2' }) {
  return (
    <Section id="coaching">
      <SectionHeading as={as} badge={pricing.badge} title={pricing.title} subtitle={pricing.subtitle} />

      <motion.div variants={fadeUp} className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.id}
            className={cx(
              'flex flex-col rounded-xl border bg-surface p-6 shadow-card',
              tier.featured ? 'border-accent ring-1 ring-accent' : 'border-border',
            )}
          >
            {tier.badge && (
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                {tier.badge}
              </span>
            )}
            <h2 className="font-display text-xl uppercase tracking-wide text-primary">{tier.name}</h2>
            <p className="mt-2">
              <span className="font-display text-4xl text-primary">{tier.price}</span>
              <span className="text-secondary">{tier.cadence}</span>
            </p>
            <p className="mt-2 text-secondary">{tier.summary}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-primary">
                  <CheckMark />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              to={tier.cta.to}
              icon={tier.cta.icon}
              variant={tier.featured ? 'primary' : 'soft'}
              className="mt-6 w-full"
            >
              {tier.cta.label}
            </Button>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-12 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="px-6 pt-6 text-left font-display text-lg uppercase tracking-wide text-primary">
            {pricing.comparison.title}
          </caption>
          <thead>
            <tr className="border-b border-border text-secondary">
              <th scope="col" className="px-6 py-4 font-medium">Feature</th>
              {pricing.comparison.columns.map((column) => (
                <th key={column} scope="col" className="px-6 py-4 text-center font-medium">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricing.comparison.rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <th scope="row" className="px-6 py-4 font-normal text-primary">{row.label}</th>
                {row.tiers.map((included, index) => (
                  <td key={index} className="px-6 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Included included={included} />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  )
}
