import type { ReactNode } from 'react'

interface ToolResultProps {
  label: string
  value: string | null
  hint: string
  caption?: string
  children?: ReactNode
}

export function ToolResult({ label, value, hint, caption, children }: ToolResultProps) {
  if (value === null) {
    return (
      <div className="flex h-full min-h-[160px] items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt p-8 text-center">
        <p className="text-sm text-secondary">{hint}</p>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-xl border border-border bg-surface p-6 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-secondary">{label}</p>
      <p className="mt-2 font-display text-5xl text-accent">{value}</p>
      {caption && <p className="mt-2 text-secondary">{caption}</p>}
      {children}
    </div>
  )
}
