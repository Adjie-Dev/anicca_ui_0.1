import { useRef, type ReactNode } from 'react'
import { AniccaDataTable, AniccaStatCard, type AniccaColumn } from '../../dashboard'
import { ACCENT, card, type Page } from '../theme'
import {
  integrations, notificationPrefs, products,
  securityCards, type CarouselMetric, type Integration, type Member, type Metric, type Product, type Slice,
} from '../data'
import { useActions, RowActions } from '../ui/Modal'
import { Badge, Icon, Toggle } from '../ui/primitives'
import { BarChart as Bars, RadialBar } from '../ui/charts'

/* ── Generic visual parts ──────────────────────────────────── */

export function Metrics({ items, cols = 'lg:grid-cols-4' }: { items: Metric[]; cols?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-gutter`}>
      {items.map(m => (
        <AniccaStatCard
          key={m.title}
          title={m.title}
          value={m.value}
          icon={<Icon name={m.icon} />}
          trend={m.trend}
          trendLabel={m.trendLabel}
          color={m.color}
        />
      ))}
    </div>
  )
}

/** Single-series bar chart (interactive) — thin wrapper over the charts toolkit. */
/** Horizontal scrolling metric cards with progress (Hope-style carousel). */
export function MetricCarousel({ items }: { items: CarouselMetric[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * 264, behavior: 'smooth' })
  return (
    <div className="relative group/carousel">
      <div ref={ref} className="flex gap-gutter overflow-x-auto pb-1 snap-x" style={{ scrollbarWidth: 'none' }}>
        {items.map(m => (
          <div key={m.label} className={`snap-start shrink-0 w-[240px] ${card} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: `${m.color}1a`, color: m.color }}><Icon name={m.icon} className="text-[22px]" /></span>
              <span className="text-label-sm font-bold tabular-nums" style={{ color: m.color }}>{m.pct}%</span>
            </div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{m.label}</p>
            <p className="text-headline-md font-bold text-on-surface tabular-nums">{m.value}</p>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mt-3"><div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} /></div>
          </div>
        ))}
      </div>
      <button onClick={() => scroll(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow flex items-center justify-center text-on-surface-variant hover:text-primary opacity-0 group-hover/carousel:opacity-100 transition-opacity"><Icon name="chevron_left" /></button>
      <button onClick={() => scroll(1)} className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow flex items-center justify-center text-on-surface-variant hover:text-primary opacity-0 group-hover/carousel:opacity-100 transition-opacity"><Icon name="chevron_right" /></button>
    </div>
  )
}

export function BarChart({ values, labels = [], suffix = '' }: { values: number[]; labels?: string[]; highlightFrom?: number; suffix?: string }) {
  return (
    <Bars
      height={176}
      suffix={suffix}
      labels={labels.length ? labels : values.map((_, i) => String(i + 1))}
      series={[{ name: 'Value', color: ACCENT.indigo, data: values }]}
    />
  )
}

/** Round chart (interactive radial) — wrapper over RadialBar; built-in legend. */
export function Donut({ slices }: { slices: Slice[]; center?: string; sub?: string }) {
  return <RadialBar items={slices.map(s => ({ label: s.label, value: s.pct, color: s.color }))} />
}

/** Standalone legend (when needed separately). */
export function Legend({ slices }: { slices: Slice[] }) {
  return (
    <div className="space-y-2 mt-4">
      {slices.map(s => (
        <div key={s.label} className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-body-sm text-on-surface-variant">{s.label}</span>
          </span>
          <span className="text-label-md font-bold text-on-surface tabular-nums">{s.pct}%</span>
        </div>
      ))}
    </div>
  )
}

export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
      <div>
        <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">{title}</h4>
        {subtitle && <p className="text-body-sm text-outline mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/** Small rounded icon tile tinted with the given hex. */
export function IconTile({ name, color }: { name: string; color: string }) {
  return (
    <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: `${color}1a`, color }}>
      <Icon name={name} className="text-[20px]" />
    </div>
  )
}

/* ── Shared tables ─────────────────────────────────────────── */

export function MembersTable({ rows }: { rows: Member[] }) {
  const cols: AniccaColumn<Member>[] = [
    { key: 'name', label: 'Member', sortable: true, render: (_v, m) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: m.color }}>{m.initials}</div>
        <div><p className="text-body-sm font-bold text-on-surface">{m.name}</p><p className="text-[12px] text-outline">{m.email}</p></div>
      </div>
    ) },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (_v, m) => <Badge tone={m.tone}>{m.status}</Badge> },
    { key: 'revenue', label: 'Revenue', sortable: true },
    { key: 'joined', label: 'Joined', sortable: true },
    { key: 'actions', label: '', render: (_v, m) => <RowActions label={m.name} /> },
  ]
  return <AniccaDataTable data={rows} columns={cols} searchPlaceholder="Search members…" pageSize={5} />
}

export function ProductTable() {
  const cols: AniccaColumn<Product>[] = [
    { key: 'name', label: 'Product', sortable: true, render: (_v, p) => (
      <div className="flex items-center gap-3">
        <IconTile name={p.icon} color={p.iconColor} />
        <div><p className="text-body-sm font-bold text-on-surface">{p.name}</p><p className="text-[12px] text-outline">{p.series}</p></div>
      </div>
    ) },
    { key: 'sku', label: 'SKU', sortable: true, render: v => <span className="font-mono text-[12px] text-on-surface-variant">{String(v)}</span> },
    { key: 'cat', label: 'Category', sortable: true, render: v => <span className="text-label-sm px-3 py-1 rounded-full border border-outline-variant/30 bg-surface-container-low">{String(v)}</span> },
    { key: 'stock', label: 'Stock', sortable: true, render: (_v, p) => (
      <div>
        <span className={`text-label-sm font-bold ${p.ok ? 'text-on-surface' : 'text-error'}`}>{p.qty}</span>
        <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1"><div className="h-full rounded-full" style={{ width: `${p.stock}%`, background: p.iconColor }} /></div>
      </div>
    ) },
    { key: 'status', label: 'Status', sortable: true, render: (_v, p) => <Badge tone={p.ok ? 'success' : 'error'}>{p.status}</Badge> },
    { key: 'actions', label: '', render: (_v, p) => <RowActions label={p.name} /> },
  ]
  return <AniccaDataTable data={products} columns={cols} searchPlaceholder="Search products…" pageSize={5} />
}

function IntegrationsTable() {
  const cols: AniccaColumn<Integration>[] = [
    { key: 'name', label: 'Service', sortable: true, render: (_v, s) => (
      <div className="flex items-center gap-3"><Icon name={s.icon} className="text-primary" /><div><p className="text-body-sm font-bold text-on-surface">{s.name}</p><p className="text-[11px] text-outline">{s.desc}</p></div></div>
    ) },
    { key: 'status', label: 'Status', sortable: true, render: (_v, s) => <Badge tone={s.tone}>{s.status}</Badge> },
    { key: 'date', label: 'Connection Date', sortable: true },
    { key: 'actions', label: '', render: (_v, s) => <RowActions label={s.name} /> },
  ]
  return <AniccaDataTable data={integrations} columns={cols} searchPlaceholder="Search integrations…" pageSize={5} />
}

/* ── Shared Settings body (used by both settings pages) ────── */

export function SettingsBody() {
  const { info, form } = useActions()
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className={`${card} p-6`}>
          <div className="flex items-center gap-2 mb-6"><Icon name="notifications" className="text-primary" /><h4 className="text-headline-sm font-bold text-on-surface">Notifications</h4></div>
          <div className="space-y-3">
            {notificationPrefs.map(n => (
              <div key={n.title} className="flex items-center justify-between p-4 bg-surface-container-low rounded-[14px]">
                <div><p className="text-label-md font-bold text-on-surface">{n.title}</p><p className="text-[12px] text-on-surface-variant">{n.desc}</p></div>
                <Toggle on={n.on} />
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} p-6`}>
          <div className="flex items-center gap-2 mb-6"><Icon name="shield" className="text-error" /><h4 className="text-headline-sm font-bold text-on-surface">Security &amp; Access</h4></div>
          <div className="grid grid-cols-2 gap-3">
            {securityCards.map(c => (
              <button key={c.title} className="text-left p-4 border border-outline-variant/30 rounded-[14px] hover:border-primary/40 hover:bg-primary/5 transition-all" onClick={() => info(c.title, <p className="text-body-base text-on-surface-variant">{c.desc}</p>)}>
                <Icon name={c.icon} className="text-on-surface-variant mb-2" />
                <p className="text-label-md font-bold text-on-surface">{c.title}</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="External Integrations" action={<button className="text-primary text-label-md font-bold" onClick={() => form('New Integration', ['Service name', 'Endpoint URL', 'API key'])}>+ Add integration</button>} />
        <IntegrationsTable />
      </div>
    </>
  )
}

export type { Page }
