import { SegmentedControl } from './SegmentedControl'
import { MeasureField } from './MeasureField'
import { poundsToKilograms, feetInchesToCentimeters } from '../../lib/calculators'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export type UnitSystem = 'metric' | 'imperial'

export interface BodyInput {
  unit: UnitSystem
  weight: string
  heightCm: string
  heightFt: string
  heightIn: string
}

export const emptyBodyInput: BodyInput = {
  unit: 'metric',
  weight: '',
  heightCm: '',
  heightFt: '',
  heightIn: '',
}

export function parsePositive(value: string): number | null {
  const parsed = Number(value)
  return value.trim() !== '' && Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function parseNonNegative(value: string): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export function toMetric(input: BodyInput): { weightKg: number; heightCm: number } | null {
  const weight = parsePositive(input.weight)
  if (weight === null) return null
  const weightKg = input.unit === 'metric' ? weight : poundsToKilograms(weight)

  if (input.unit === 'metric') {
    const heightCm = parsePositive(input.heightCm)
    return heightCm === null ? null : { weightKg, heightCm }
  }

  const feet = parseNonNegative(input.heightFt)
  const inches = parseNonNegative(input.heightIn)
  if (feet === 0 && inches === 0) return null
  return { weightKg, heightCm: feetInchesToCentimeters(feet, inches) }
}

export function BodyInputs({ value, onChange }: { value: BodyInput; onChange: (value: BodyInput) => void }) {
  const patch = (fields: Partial<BodyInput>) => onChange({ ...value, ...fields })
  const isMetric = value.unit === 'metric'

  return (
    <div className="space-y-5">
      <SegmentedControl
        options={tools.units}
        value={value.unit}
        onChange={(unit) => patch({ unit })}
        ariaLabel="Unit system"
      />

      <MeasureField
        label={tools.fields.weight}
        value={value.weight}
        onChange={(weight) => patch({ weight })}
        unit={isMetric ? tools.unitSuffix.kg : tools.unitSuffix.lb}
      />

      {isMetric ? (
        <MeasureField
          label={tools.fields.height}
          value={value.heightCm}
          onChange={(heightCm) => patch({ heightCm })}
          unit={tools.unitSuffix.cm}
        />
      ) : (
        <div className="space-y-1.5">
          <span className="block text-sm font-medium text-primary">{tools.fields.height}</span>
          <div className="grid grid-cols-2 gap-3">
            <MeasureField
              label={tools.unitSuffix.ft}
              value={value.heightFt}
              onChange={(heightFt) => patch({ heightFt })}
              unit={tools.unitSuffix.ft}
            />
            <MeasureField
              label={tools.unitSuffix.in}
              value={value.heightIn}
              onChange={(heightIn) => patch({ heightIn })}
              unit={tools.unitSuffix.in}
            />
          </div>
        </div>
      )}
    </div>
  )
}
