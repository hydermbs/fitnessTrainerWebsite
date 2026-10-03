import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { BmiCalculator } from '../tools/BmiCalculator'
import { fadeUp } from '../../lib/motion'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export function BmiTool() {
  return (
    <Section id="bmi" alt>
      <SectionHeading badge={tools.bmi.badge} title={tools.bmi.title} subtitle={tools.bmi.subtitle} />
      <motion.div variants={fadeUp} className="mt-10">
        <BmiCalculator />
      </motion.div>
      <p className="mt-4 text-xs text-secondary">{tools.disclaimer}</p>
    </Section>
  )
}
