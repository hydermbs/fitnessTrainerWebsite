import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { BmiCalculator } from '../tools/BmiCalculator'
import { BmrCalculator } from '../tools/BmrCalculator'
import { TdeeCalculator } from '../tools/TdeeCalculator'
import { fadeUp } from '../../lib/motion'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export function FitnessTools() {
  return (
    <Section id="tools">
      <SectionHeading as="h1" badge={tools.page.badge} title={tools.page.title} subtitle={tools.page.subtitle} />
      <motion.div variants={fadeUp} className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BmiCalculator />
        <BmrCalculator />
        <TdeeCalculator />
      </motion.div>
      <p className="mt-6 text-xs text-secondary">{tools.disclaimer}</p>
    </Section>
  )
}
