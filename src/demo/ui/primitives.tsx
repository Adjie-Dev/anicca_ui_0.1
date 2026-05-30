import { useState, type ReactNode } from 'react'
import { AniccaBreadcrumb } from '../../dashboard'
import { useToast } from './Toast'

/** Material Symbols glyph, optionally filled. */
export function Icon({ name, className, fill }: { name: string; className?: string; fill?: boolean }) {
  return (
    <span
      className={`material-symbols-outlined ${className ?? ''}`}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  )
}

export type BadgeTone = 'success' | 'warn' | 'error' | 'info' | 'neutral'

const BADGE: Record<BadgeTone, string> = {
  success: 'bg-tertiary/12 text-tertiary border-tertiary/25',
  warn: 'bg-amber/12 text-amber border-amber/25',
  error: 'bg-error/12 text-error border-error/25',
  info: 'bg-primary/12 text-primary border-primary/25',
  neutral: 'bg-surface-container-high text-on-surface-variant border-outline-variant/40',
}

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full border ${BADGE[tone]}`}>
      {children}
    </span>
  )
}

/** Self-contained on/off switch with a toast on change. */
export function Toggle({ on: initial }: { on: boolean }) {
  const [on, setOn] = useState(initial)
  const notify = useToast()
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        setOn(!on)
        notify(on ? 'Turned off' : 'Turned on', on ? 'info' : 'success')
      }}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-outline-variant/40'}`}
    >
      <span
        className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-all ${on ? 'left-[22px]' : 'left-[2px]'}`}
      />
    </button>
  )
}

/** Labelled text input that keeps its own value (Settings forms). */
export function Field({ label, value = '' }: { label: string; value?: string }) {
  const [v, setV] = useState(value)
  return (
    <label className="block space-y-1">
      <span className="text-label-sm text-on-surface-variant">{label}</span>
      <input
        value={v}
        onChange={e => setV(e.target.value)}
        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-[10px] px-4 py-3 text-body-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
      />
    </label>
  )
}

/** Segmented control — pill button group for in-place filtering (no card). */
export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex gap-1 p-1 rounded-[12px] bg-surface-container-low border border-outline-variant/20">
      {options.map(o => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-3 py-1.5 rounded-[8px] text-label-sm font-bold transition-colors ${value === o ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/** Breadcrumb trail; last entry is the current page. */
export function Crumbs({ trail }: { trail: string[] }) {
  return (
    <AniccaBreadcrumb
      items={trail.map((label, i) => (i < trail.length - 1 ? { label, href: '#' } : { label }))}
    />
  )
}
