import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../layout/Section'
import { SectionHeading } from './SectionHeading'
import { Button } from '../ui/Button'
import { fadeUp } from '../../lib/motion'
import { cx } from '../../lib/cx'
import { siteContent } from '../../config/siteContent'
import type { BookingField } from '../../config/siteContent'

const { booking } = siteContent
const INPUT_CLASS =
  'h-12 w-full rounded-lg border border-border bg-surface px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

function captureApplication() {
  // Integration point: forward the pre-screening application to the CRM / scheduler.
  console.info('[booking] application received', { source: 'booking', calendly: Boolean(booking.calendlyUrl) })
}

function FieldInput({
  field,
  value,
  invalid,
  onChange,
}: {
  field: BookingField
  value: string
  invalid: boolean
  onChange: (value: string) => void
}) {
  const className = cx(INPUT_CLASS, invalid && 'border-accent')
  if (field.type === 'select') {
    return (
      <select id={field.id} className={className} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select…</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  return (
    <input
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

function CalendarSlot() {
  if (booking.calendlyUrl) {
    return (
      <iframe
        src={booking.calendlyUrl}
        title="Schedule a strategy call"
        className="h-[560px] w-full rounded-xl border border-border"
      />
    )
  }
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt p-8 text-center">
      <p className="font-display text-xl uppercase tracking-wide text-primary">Calendar Embed</p>
      <p className="mt-2 max-w-xs text-sm text-secondary">
        Your Calendly scheduler drops in here once its URL is set in the content config.
      </p>
    </div>
  )
}

export function Booking() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: false }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(
      booking.fields.filter((field) => field.required && !values[field.id]?.trim()).map((field) => [field.id, true]),
    )
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    captureApplication()
    setSubmitted(true)
  }

  return (
    <Section id="apply">
      <SectionHeading as="h1" badge={booking.badge} title={booking.title} subtitle={booking.subtitle} />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <motion.div variants={fadeUp}>
          {submitted ? (
            <div className="rounded-xl border border-border bg-surface p-8">
              <h2 className="font-display text-2xl uppercase tracking-wide text-primary">{booking.successTitle}</h2>
              <p className="mt-3 text-secondary">{booking.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-border bg-surface p-6 md:p-8">
              {booking.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label htmlFor={field.id} className="block text-sm font-medium text-primary">
                    {field.label}
                    {field.required && <span className="text-accent"> *</span>}
                  </label>
                  <FieldInput
                    field={field}
                    value={values[field.id] ?? ''}
                    invalid={Boolean(errors[field.id])}
                    onChange={(value) => setField(field.id, value)}
                  />
                  {errors[field.id] && <p className="text-xs text-accent">This field is required.</p>}
                </div>
              ))}
              <Button type="submit" className="w-full">
                {booking.submitLabel}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-4">
          <CalendarSlot />
          <p className="text-sm text-secondary">{booking.timezoneNote}</p>
        </motion.div>
      </div>
    </Section>
  )
}
