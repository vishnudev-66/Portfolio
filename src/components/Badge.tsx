import { ReactNode } from 'react'

type Tone = 'teal' | 'amber' | 'red' | 'neutral'

const toneClasses: Record<Tone, string> = {
  teal: 'bg-signal-teal/10 text-signal-teal border-signal-teal/25',
  amber: 'bg-signal-amber/10 text-signal-amber border-signal-amber/25',
  red: 'bg-signal-red/10 text-signal-red border-signal-red/25',
  neutral: 'bg-white/[0.04] text-ink-300 border-white/10',
}

export default function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}
