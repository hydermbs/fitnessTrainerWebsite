import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { RotatingSeal } from '../ui/RotatingSeal'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { fadeUp, stagger } from '../../lib/motion'
import { siteContent } from '../../config/siteContent'

const { hero } = siteContent

export function Hero() {
  return (
    <section className="bg-canvas">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={fadeUp}>
            <Badge>{hero.badge}</Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl uppercase leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl"
          >
            {hero.headline}
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-xl text-lg text-secondary">
            {hero.subhead}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Button to={hero.primaryCta.to} icon={hero.primaryCta.icon}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="ghost" to={hero.secondaryCta.to} icon={hero.secondaryCta.icon}>
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm font-medium text-secondary">
            {hero.trust}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <img src={hero.portrait.src} alt={hero.portrait.alt} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -left-5 -top-5">
            <RotatingSeal size={104} label={hero.sealLabel} />
          </div>
          <div className="absolute -bottom-5 right-5 rounded-xl border border-border bg-surface px-4 py-3 shadow-card">
            <p className="font-display text-2xl text-accent">
              <AnimatedCounter value={hero.floatingProof.value} suffix={hero.floatingProof.suffix} />
            </p>
            <p className="text-xs text-secondary">{hero.floatingProof.label}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
