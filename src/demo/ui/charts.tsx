import { useId, useRef, useState, type MouseEvent } from 'react'

export interface Series {
  name: string
  color: string
  data: number[]
}

const TIP = 'rounded-md bg-[#0b1c30] text-white px-2.5 py-1.5 shadow-lg text-[11px] whitespace-nowrap'

/* ── Line / Area (interactive crosshair + tooltip) ─────────── */
export function LineChart({ series, labels, height = 240, area = false, sparkline = false, suffix = '' }: {
  series: Series[]
  labels: string[]
  height?: number
  area?: boolean
  sparkline?: boolean
  suffix?: string
}) {
  const [hi, setHi] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/:/g, '')
  const n = labels.length
  const max = Math.max(1, ...series.flatMap(s => s.data)) * 1.15
  const x = (i: number) => (n <= 1 ? 0 : (i / (n - 1)) * 100)
  const y = (v: number) => 100 - (v / max) * 100
  const line = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const fill = (d: number[]) => `${line(d)} L100,100 L0,100 Z`
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    setHi(Math.max(0, Math.min(n - 1, Math.round(((e.clientX - r.left) / r.width) * (n - 1)))))
  }
  return (
    <div>
      <div ref={ref} className="relative" style={{ height }} onMouseMove={onMove} onMouseLeave={() => setHi(null)}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {area && (
            <defs>{series.map((s, si) => (
              <linearGradient key={si} id={`${uid}-${si}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity="0.22" /><stop offset="100%" stopColor={s.color} stopOpacity="0" /></linearGradient>
            ))}</defs>
          )}
          {area && series.map((s, si) => <path key={`a${si}`} d={fill(s.data)} fill={`url(#${uid}-${si})`} />)}
          {series.map((s, si) => <path key={si} d={line(s.data)} fill="none" stroke={s.color} strokeWidth={sparkline ? 2 : 2.25} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />)}
          {hi !== null && <line x1={x(hi)} y1={0} x2={x(hi)} y2={100} stroke="#64748b" strokeOpacity="0.5" strokeWidth={1} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />}
        </svg>
        {hi !== null && series.map((s, si) => (
          <span key={si} className="absolute w-2.5 h-2.5 rounded-full border-2 border-white shadow pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: `${x(hi)}%`, top: `${y(s.data[hi])}%`, background: s.color }} />
        ))}
        {hi !== null && (
          <div className={`absolute top-1 z-10 pointer-events-none -translate-x-1/2 ${TIP}`} style={{ left: `${Math.min(82, Math.max(18, x(hi)))}%` }}>
            <div className="font-bold mb-0.5">{labels[hi]}</div>
            {series.map((s, si) => <div key={si} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name}: <b className="tabular-nums">{s.data[hi]}{suffix}</b></div>)}
          </div>
        )}
      </div>
      {!sparkline && (
        <div className="flex justify-between text-[10px] text-outline uppercase tracking-wider mt-2 px-1">{labels.map((l, i) => <span key={i}>{l}</span>)}</div>
      )}
    </div>
  )
}

/* ── Bar (grouped / stacked, interactive) ──────────────────── */
export function BarChart({ series, labels, height = 200, stacked = false, prefix = '', suffix = '' }: {
  series: Series[]
  labels: string[]
  height?: number
  stacked?: boolean
  prefix?: string
  suffix?: string
}) {
  const [hi, setHi] = useState<number | null>(null)
  const max = (stacked
    ? Math.max(...labels.map((_, i) => series.reduce((s, se) => s + (se.data[i] ?? 0), 0)))
    : Math.max(...series.flatMap(s => s.data))) * 1.1 || 1
  return (
    <div>
      <div className="flex items-end gap-2 px-1" style={{ height }}>
        {labels.map((_, i) => (
          <div key={i} className="group relative flex-1 h-full flex items-end justify-center" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}>
            {stacked ? (
              <div className="w-3/4 h-full flex flex-col-reverse">
                {series.map((s, si) => <div key={si} className="w-full first:rounded-b-[3px] last:rounded-t-[4px] transition-opacity" style={{ height: `${(s.data[i] / max) * 100}%`, background: s.color, opacity: hi === null || hi === i ? 1 : 0.45 }} />)}
              </div>
            ) : (
              <div className="w-full h-full flex items-end justify-center gap-1">
                {series.map((s, si) => <div key={si} className="flex-1 rounded-t-[4px] transition-all" style={{ height: `${(s.data[i] / max) * 100}%`, background: s.color, opacity: hi === null || hi === i ? 1 : 0.45 }} />)}
              </div>
            )}
            {hi === i && (
              <div className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-10 pointer-events-none ${TIP}`}>
                <div className="font-bold mb-0.5">{labels[i]}</div>
                {series.map((s, si) => <div key={si} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name}: <b className="tabular-nums">{prefix}{s.data[i]}{suffix}</b></div>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-outline uppercase tracking-wider mt-2 px-1">{labels.map((l, i) => <span key={i} className="flex-1 text-center">{l}</span>)}</div>
    </div>
  )
}

/* ── RadialBar (concentric rings, interactive) ─────────────── */
export function RadialBar({ items, height = 230 }: { items: { label: string; value: number; color: string }[]; height?: number }) {
  const [hi, setHi] = useState<number | null>(null)
  const active = hi !== null ? items[hi] : null
  const avg = Math.round(items.reduce((s, it) => s + it.value, 0) / items.length)
  const STEP = 13
  return (
    <div className="flex flex-col items-center" style={{ minHeight: height }}>
      <div className="relative" style={{ width: 180, height: 180 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {items.map((it, i) => {
            const r = 44 - i * STEP
            const c = 2 * Math.PI * r
            const len = (it.value / 100) * c
            return (
              <g key={it.label}>
                <circle cx="50" cy="50" r={r} fill="none" stroke={it.color} strokeOpacity="0.15" strokeWidth="9" />
                <circle cx="50" cy="50" r={r} fill="none" stroke={it.color} strokeWidth={hi === i ? 11 : 9} strokeLinecap="round"
                  strokeDasharray={`${len} ${c - len}`}
                  style={{ transition: 'stroke-width .2s, opacity .2s', opacity: hi === null || hi === i ? 1 : 0.4, cursor: 'pointer' }}
                  onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} />
              </g>
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[26px] font-bold tabular-nums" style={{ color: active ? active.color : undefined }}>{active ? active.value : avg}%</p>
          <p className="text-[10px] text-outline uppercase tracking-wider">{active ? active.label : 'Average'}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-4">
        {items.map(it => (
          <span key={it.label} className="flex items-center gap-1.5 text-body-sm text-on-surface-variant"><span className="w-2.5 h-2.5 rounded-full" style={{ background: it.color }} />{it.label} <b className="text-on-surface tabular-nums">{it.value}%</b></span>
        ))}
      </div>
    </div>
  )
}
