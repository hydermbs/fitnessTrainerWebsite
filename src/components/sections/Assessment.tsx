import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { Button } from '../ui/Button'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { fadeUp } from '../../lib/motion'
import { computeBlueprint } from '../../lib/quiz'
import type { Goal, Experience, Bottleneck, QuizSelections } from '../../lib/quiz'
import { siteContent } from '../../config/siteContent'
import type { QuizOption } from '../../config/siteContent'

const { assessment } = siteContent
const STEP_COUNT = 3

function captureLead(selections: QuizSelections) {
  // Integration point: forward this payload to the CRM / webhook.
  console.info('[lead] assessment completed', { ...selections, source: 'assessment' })
}

function OptionButton({ label, description, onSelect }: { label: string; description: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex min-h-[64px] w-full flex-col items-start rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="font-semibold text-primary">{label}</span>
      <span className="text-sm text-secondary">{description}</span>
    </button>
  )
}

function StepView<T extends string>({
  question,
  options,
  onSelect,
}: {
  question: string
  options: QuizOption<T>[]
  onSelect: (value: T) => void
}) {
  return (
    <div className="space-y-5">
      <h3 className="font-display text-2xl uppercase tracking-wide text-primary">{question}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            description={option.description}
            onSelect={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  )
}

function Metric({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 text-center">
      <p className="font-display text-4xl text-accent">
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
      <p className="mt-1 text-sm text-secondary">{label}</p>
    </div>
  )
}

export function Assessment() {
  const [stepIndex, setStepIndex] = useState(0)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null)

  const capturedRef = useRef(false)

  const back = () => setStepIndex((index) => Math.max(0, index - 1))
  const restart = () => {
    capturedRef.current = false
    setGoal(null)
    setExperience(null)
    setBottleneck(null)
    setStepIndex(0)
  }

  const chooseGoal = (value: Goal) => {
    setGoal(value)
    setStepIndex((index) => (index === 0 ? 1 : index))
  }
  const chooseExperience = (value: Experience) => {
    setExperience(value)
    setStepIndex((index) => (index === 1 ? 2 : index))
  }
  const chooseBottleneck = (value: Bottleneck) => {
    setBottleneck(value)
    setStepIndex((index) => (index === 2 ? 3 : index))
  }

  useEffect(() => {
    if (capturedRef.current || !goal || !experience || !bottleneck) return
    capturedRef.current = true
    captureLead({ goal, experience, bottleneck })
  }, [goal, experience, bottleneck])

  const isComplete = stepIndex >= STEP_COUNT
  const blueprint = goal && experience && bottleneck ? computeBlueprint({ goal, experience, bottleneck }) : null
  const progress = Math.min(stepIndex, STEP_COUNT) / STEP_COUNT

  return (
    <Section id="assessment">
      <SectionHeading badge={assessment.badge} title={assessment.title} subtitle={assessment.subtitle} />

      <motion.div variants={fadeUp} className="mt-10 rounded-xl border border-border bg-surface-alt p-6 md:p-8">
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {isComplete && blueprint ? (
          <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="font-display text-2xl uppercase tracking-wide text-primary">{assessment.resultTitle}</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric value={blueprint.calorieBaseline} label={assessment.resultLabels.calories} />
              <Metric value={blueprint.frequency} label={assessment.resultLabels.frequency} suffix="×" />
              <Metric value={blueprint.timeline} label={assessment.resultLabels.timeline} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to={assessment.resultCta.to} icon={assessment.resultCta.icon}>
                {assessment.resultCta.label}
              </Button>
              <Button variant="ghost" onClick={restart}>
                Start over
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            {stepIndex === 0 && (
              <StepView question={assessment.steps.goal.question} options={assessment.steps.goal.options} onSelect={chooseGoal} />
            )}
            {stepIndex === 1 && (
              <StepView
                question={assessment.steps.experience.question}
                options={assessment.steps.experience.options}
                onSelect={chooseExperience}
              />
            )}
            {stepIndex === 2 && (
              <StepView
                question={assessment.steps.bottleneck.question}
                options={assessment.steps.bottleneck.options}
                onSelect={chooseBottleneck}
              />
            )}
          </motion.div>
        )}

        {stepIndex > 0 && !isComplete && (
          <button type="button" onClick={back} className="mt-6 text-sm font-medium text-secondary transition-colors hover:text-primary">
            ← Back
          </button>
        )}
      </motion.div>
    </Section>
  )
}
