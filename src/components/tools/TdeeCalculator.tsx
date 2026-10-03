import { useState } from 'react'
import { PersonInputs, emptyPersonInput, toPersonMetric } from './PersonInputs'
import type { PersonInput } from './PersonInputs'
import { ToolResult } from './ToolResult'
import { calculateBMR, calculateTDEE } from '../../lib/calculators'
import type { ActivityLevel } from '../../lib/calculators'
import { cx } from '../../lib/cx'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export function TdeeCalculator() {
  const [person, setPerson] = useState<PersonInput>(emptyPersonInput)
  const [activity, setActivity] = useState<ActivityLevel>('moderate')

  const metric = toPersonMetric(person)
  const bmr = metric ? calculateBMR(metric.weightKg, metric.heightCm, metric.age, metric.sex) : null
  const tdee = bmr !== null ? calculateTDEE(bmr, activity) : null

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
      <h2 className="font-display text-xl uppercase tracking-wide text-primary">{tools.tdee.title}</h2>
      <p className="mt-2 text-secondary">{tools.tdee.subtitle}</p>

      <div className="mt-6 space-y-5">
        <PersonInputs value={person} onChange={setPerson} />
        <div className="space-y-1.5">
          <span className="block text-sm font-medium text-primary">{tools.fields.activity}</span>
          <div className="grid gap-2" role="group" aria-label={tools.fields.activity}>
            {tools.activityOptions.map((option) => {
              const isActive = option.value === activity
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActivity(option.value)}
                  aria-pressed={isActive}
                  className={cx(
                    'rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-accent',
                  )}
                >
                  <span className="block text-sm font-semibold text-primary">{option.label}</span>
                  <span className="block text-xs text-secondary">{option.description}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ToolResult
          label={tools.tdee.resultLabel}
          value={tdee !== null ? String(Math.round(tdee)) : null}
          hint={tools.emptyHint}
          caption={tdee !== null ? tools.energyUnit : undefined}
        >
          {bmr !== null && (
            <p className="mt-2 text-sm text-secondary">
              {tools.tdee.bmrLabel} {Math.round(bmr)} {tools.energyUnit}
            </p>
          )}
        </ToolResult>
      </div>
    </div>
  )
}
