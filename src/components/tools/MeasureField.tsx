import { useId } from 'react'

interface MeasureFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  unit?: string
  placeholder?: string
}

export function MeasureField({ label, value, onChange, unit, placeholder }: MeasureFieldProps) {
  const id = useId()
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-lg border border-border bg-surface px-3 pr-12 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-secondary">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}
