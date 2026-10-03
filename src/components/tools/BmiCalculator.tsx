import { useState } from 'react'
import { BodyInputs, emptyBodyInput, toMetric } from './BodyInputs'
import type { BodyInput } from './BodyInputs'
import { ToolResult } from './ToolResult'
import { calculateBMI, classifyBMI } from '../../lib/calculators'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export function BmiCalculator() {
  const [body, setBody] = useState<BodyInput>(emptyBodyInput)

  const metric = toMetric(body)
  const bmi = metric ? calculateBMI(metric.weightKg, metric.heightCm) : null
  const category = bmi !== null ? tools.bmi.categories[classifyBMI(bmi)] : null

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-6">
        <BodyInputs value={body} onChange={setBody} />
      </div>
      <ToolResult
        label={tools.bmi.resultLabel}
        value={bmi !== null ? bmi.toFixed(1) : null}
        hint={tools.emptyHint}
        caption={category ? `${category.label} · ${category.range}` : undefined}
      />
    </div>
  )
}
