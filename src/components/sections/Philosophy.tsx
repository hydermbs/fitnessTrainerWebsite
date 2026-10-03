import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { Card } from '../ui/Card'
import { CertIcon } from '../ui/CertIcon'
import { fadeUp } from '../../lib/motion'
import { siteContent } from '../../config/siteContent'

const { philosophy } = siteContent

export function Philosophy() {
  return (
    <Section id="philosophy">
      <SectionHeading as="h1" badge={philosophy.badge} title={philosophy.title} subtitle={philosophy.intro} />

      <motion.div variants={fadeUp} className="mt-12 grid gap-6 md:grid-cols-3">
        {philosophy.pillars.map((pillar) => (
          <Card key={pillar.title}>
            <h2 className="font-display text-xl uppercase tracking-wide text-primary">{pillar.title}</h2>
            <p className="mt-3 text-secondary">{pillar.description}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-12 rounded-xl border border-border bg-surface p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{philosophy.certsTitle}</p>
        <div className="mt-4 flex flex-wrap gap-8 text-secondary">
          {philosophy.certifications.map((cert) => (
            <span key={cert.label} className="flex items-center gap-2 text-sm font-medium">
              <CertIcon name={cert.icon} />
              {cert.label}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
