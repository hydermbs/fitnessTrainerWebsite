import { SegmentedControl } from './SegmentedControl'
import { MeasureField } from './MeasureField'
import { BodyInputs, emptyBodyInput, parsePositive, toMetric } from './BodyInputs'
import type { BodyInput } from './BodyInputs'
import type { Sex } from '../../lib/calculators'
import { siteContent } from '../../config/siteContent'

const { tools } = siteContent

export interface PersonInput {
  body: BodyInput
  age: string
  sex: Sex
}

export const emptyPersonInput: PersonInput = {
  body: emptyBodyInput,
  age: '',
  sex: 'male',
}

export function toPersonMetric(
  input: PersonInput,
): { weightKg: number; heightCm: number; age: number; sex: Sex } | null {
  const metric = toMetric(input.body)
  const age = parsePositive(input.age)
  if (!metric || age === null) return null
  return { ...metric, age, sex: input.sex }
}

export function PersonInputs({ value, onChange }: { value: PersonInput; onChange: (value: PersonInput) => void }) {
  return (
    <div className="space-y-5">
      <BodyInputs value={value.body} onChange={(body) => onChange({ ...value, body })} />
      <MeasureField
        label={tools.fields.age}
        value={value.age}
        onChange={(age) => onChange({ ...value, age })}
        unit={tools.ageSuffix}
      />
      <div className="space-y-1.5">
        <span className="block text-sm font-medium text-primary">{tools.fields.sex}</span>
        <SegmentedControl
          options={tools.sexOptions}
          value={value.sex}
          onChange={(sex) => onChange({ ...value, sex })}
          ariaLabel={tools.fields.sex}
        />
      </div>
    </div>
  )
}
