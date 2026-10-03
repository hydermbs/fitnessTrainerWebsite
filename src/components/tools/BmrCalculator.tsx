import { useState } from 'react'
import { PersonInputs, emptyPersonInput, toPersonMetric } from './PersonInputs'
import type { PersonInput } from './PersonInputs'
import { ToolResult } from './ToolResult'
import { calculateBMR } from '../../lib/calculators'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export function BmrCalculator() {
  const [person, setPerson] = useState<PersonInput>(emptyPersonInput)

  const metric = toPersonMetric(person)
  const bmr = metric ? calculateBMR(metric.weightKg, metric.heightCm, metric.age, metric.sex) : null

  return (
    <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
      <h2 className="font-display text-xl uppercase tracking-wide text-primary">{tools.bmr.title}</h2>
      <p className="mt-2 text-secondary">{tools.bmr.subtitle}</p>
      <div className="mt-6">
        <PersonInputs value={person} onChange={setPerson} />
      </div>
      <div className="mt-6">
        <ToolResult
          label={tools.bmr.resultLabel}
          value={bmr !== null ? String(Math.round(bmr)) : null}
          hint={tools.emptyHint}
          caption={bmr !== null ? tools.energyUnit : undefined}
        />
      </div>
    </div>
  )
}
