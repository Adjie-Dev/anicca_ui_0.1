import { useState } from 'react'
import { AniccaDataTable, type AniccaColumn } from '../../dashboard'
import { ACCENT, btnGhost, btnPrimary, card, pageShell } from '../theme'
import { useActions } from '../ui/Modal'
import { Badge, Crumbs, Icon, type BadgeTone } from '../ui/primitives'

/* ── Billing ───────────────────────────────────────────────── */
interface Invoice { id: string; date: string; plan: string; amount: string; status: string; tone: BadgeTone; actions: string }
const invoices: Invoice[] = Array.from({ length: 6 }, (_, i) => ({
  id: `INV-2026-${100 + i}`, date: `2026-0${(i % 6) + 1}-01`, plan: 'Pro Monthly', amount: '$49.00',
  status: i === 0 ? 'Due' : 'Paid', tone: i === 0 ? 'warn' : 'success', actions: '',
}))

export function BillingPage() {
  const { notify } = useActions()
  const invCols: AniccaColumn<Invoice>[] = [
    { key: 'id', label: 'Invoice', sortable: true, render: v => <span className="font-mono text-[12px] font-bold">{String(v)}</span> },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'plan', label: 'Plan' },
    { key: 'amount', label: 'Amount', render: v => <span className="font-bold tabular-nums">{String(v)}</span> },
    { key: 'status', label: 'Status', render: (_v, r) => <Badge tone={r.tone}>{r.status}</Badge> },
    { key: 'actions', label: '', render: () => <button className="text-primary text-label-sm font-bold" onClick={() => notify('Invoice downloaded', 'success')}>Download</button> },
  ]
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'Billing']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Billing</h1><p className="text-body-base text-on-surface-variant">Manage your plan, payment methods, and invoices.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-primary text-on-primary p-6 rounded-[20px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-[70px]" />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-label-sm uppercase tracking-wider opacity-80">Current plan</p><h3 className="text-display-lg font-bold mt-1">Pro</h3><p className="text-body-sm opacity-80">$49 / month · renews 1 Jun 2026</p></div>
            <button className="px-5 py-2.5 rounded-[10px] bg-white text-primary text-label-md font-bold" onClick={() => notify('Opening plan options…')}>Change plan</button>
          </div>
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {[['Seats', '8 / 10'], ['Storage', '64 / 100 GB'], ['API calls', '1.2M / 2M']].map(([l, v]) => (
              <div key={l}><p className="text-label-sm opacity-80">{l}</p><p className="text-headline-sm font-bold tabular-nums">{v}</p><div className="w-full h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: '72%' }} /></div></div>
            ))}
          </div>
        </div>
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Payment methods</h4>
          <div className="space-y-3">
            {[['credit_card', 'Visa ending 4242', 'Default'], ['credit_card', 'Mastercard 8810', '']].map(([icon, label, tag]) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-[12px] border border-outline-variant/20">
                <Icon name={icon} className="text-on-surface-variant" />
                <span className="flex-1 text-body-sm text-on-surface">{label}</span>
                {tag && <Badge tone="info">{tag}</Badge>}
              </div>
            ))}
            <button className={`${btnGhost} w-full justify-center`} onClick={() => notify('Add card')}><Icon name="add" className="text-[18px]" />Add method</button>
          </div>
        </section>
      </div>
      <div>
        <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-3">Invoices</h4>
        <AniccaDataTable data={invoices} columns={invCols} searchPlaceholder="Search invoices…" pageSize={5} />
      </div>
    </div>
  )
}

/* ── Calendar ──────────────────────────────────────────────── */
const EVENTS: Record<number, { label: string; tone: BadgeTone }[]> = {
  3: [{ label: 'Standup', tone: 'info' }],
  8: [{ label: 'Release v2.4', tone: 'success' }],
  12: [{ label: 'Design review', tone: 'warn' }],
  17: [{ label: 'Sprint demo', tone: 'info' }, { label: 'Retro', tone: 'neutral' }],
  23: [{ label: 'Maintenance', tone: 'error' }],
}
export function CalendarPage() {
  const [sel, setSel] = useState(17)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const lead = 4 // May 2026 starts on Friday-ish (demo)
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'Calendar']} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Calendar</h1><p className="text-body-base text-on-surface-variant">May 2026</p></div>
        <button className={btnPrimary}><Icon name="add" />New event</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
        <section className={`${card} lg:col-span-3 p-4`}>
          <div className="grid grid-cols-7 text-center text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: lead }).map((_, i) => <div key={`x${i}`} />)}
            {days.map(d => (
              <button key={d} onClick={() => setSel(d)} className={`aspect-square rounded-[12px] p-1.5 text-left border transition-colors ${sel === d ? 'border-primary bg-primary/5' : 'border-outline-variant/15 hover:bg-primary/5'}`}>
                <span className={`text-label-sm font-bold ${sel === d ? 'text-primary' : 'text-on-surface'}`}>{d}</span>
                <div className="mt-1 space-y-0.5">
                  {(EVENTS[d] ?? []).slice(0, 2).map((e, i) => <div key={i} className="truncate text-[9px] px-1 py-0.5 rounded bg-primary/10 text-primary">{e.label}</div>)}
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-1">May {sel}</h4>
          <p className="text-body-sm text-outline mb-4">{(EVENTS[sel] ?? []).length} events</p>
          <div className="space-y-3">
            {(EVENTS[sel] ?? [{ label: 'No events', tone: 'neutral' as BadgeTone }]).map((e, i) => (
              <div key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-body-sm text-on-surface">{e.label}</span></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Kanban ────────────────────────────────────────────────── */
interface Task { id: number; title: string; tag: string; tone: BadgeTone }
const COLS = ['Backlog', 'In Progress', 'Review', 'Done']
const seed: Task[][] = [
  [{ id: 1, title: 'Research competitors', tag: 'Research', tone: 'info' }, { id: 2, title: 'Define API schema', tag: 'Backend', tone: 'neutral' }],
  [{ id: 3, title: 'Build dashboard UI', tag: 'Frontend', tone: 'info' }, { id: 4, title: 'Auth flow', tag: 'Security', tone: 'warn' }],
  [{ id: 5, title: 'Code review #42', tag: 'Review', tone: 'warn' }],
  [{ id: 6, title: 'Deploy v2.3', tag: 'DevOps', tone: 'success' }],
]
export function KanbanPage() {
  const [board, setBoard] = useState(seed)
  const move = (col: number, idx: number, dir: -1 | 1) => {
    const to = col + dir
    if (to < 0 || to >= COLS.length) return
    setBoard(b => {
      const next = b.map(c => [...c])
      const [task] = next[col].splice(idx, 1)
      next[to].push(task)
      return next
    })
  }
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'Kanban']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Kanban Board</h1><p className="text-body-base text-on-surface-variant">Move cards across columns.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
        {COLS.map((col, ci) => (
          <section key={col} className={`${card} p-4`}>
            <div className="flex items-center justify-between mb-3"><h4 className="text-label-md font-bold text-on-surface">{col}</h4><span className="text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">{board[ci].length}</span></div>
            <div className="space-y-3 min-h-[60px]">
              {board[ci].map((t, ti) => (
                <div key={t.id} className="p-3 rounded-[12px] border border-outline-variant/20 bg-surface-container-low/40">
                  <p className="text-body-sm font-bold text-on-surface mb-2">{t.title}</p>
                  <div className="flex items-center justify-between">
                    <Badge tone={t.tone}>{t.tag}</Badge>
                    <div className="flex gap-1">
                      <button disabled={ci === 0} onClick={() => move(ci, ti, -1)} className="p-1 text-outline hover:text-primary disabled:opacity-30"><Icon name="chevron_left" className="text-[18px]" /></button>
                      <button disabled={ci === COLS.length - 1} onClick={() => move(ci, ti, 1)} className="p-1 text-outline hover:text-primary disabled:opacity-30"><Icon name="chevron_right" className="text-[18px]" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

/* ── Pricing ───────────────────────────────────────────────── */
export function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const tiers = [
    { name: 'Starter', m: 0, feats: ['1 project', 'Community support', '1GB storage'], featured: false },
    { name: 'Pro', m: 49, feats: ['Unlimited projects', 'Priority support', '100GB storage', 'Advanced analytics'], featured: true },
    { name: 'Enterprise', m: 199, feats: ['Everything in Pro', 'SSO & SAML', 'Dedicated manager', 'SLA 99.9%'], featured: false },
  ]
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'Pricing']} />
      <div className="text-center">
        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Simple, transparent pricing</h1>
        <p className="text-body-base text-on-surface-variant mt-1">Choose the plan that fits your team.</p>
        <div className="inline-flex gap-1 p-1 rounded-[12px] bg-surface-container-low border border-outline-variant/20 mt-5">
          {[['Monthly', false], ['Yearly −20%', true]].map(([l, y]) => (
            <button key={String(l)} onClick={() => setYearly(y as boolean)} className={`px-4 py-1.5 rounded-[8px] text-label-sm font-bold transition-colors ${yearly === y ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant'}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-5xl mx-auto">
        {tiers.map(t => {
          const price = yearly ? Math.round(t.m * 12 * 0.8) : t.m
          return (
            <section key={t.name} className={`p-6 rounded-[20px] border ${t.featured ? 'border-primary shadow-lg bg-surface-container-lowest relative' : 'border-outline-variant/15 bg-surface-container-lowest shadow-sm'}`}>
              {t.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold">Most popular</span>}
              <h3 className="text-headline-sm font-bold text-on-surface">{t.name}</h3>
              <p className="mt-3"><span className="text-display-lg font-bold text-on-surface tabular-nums">${price}</span><span className="text-body-sm text-outline">/{yearly ? 'yr' : 'mo'}</span></p>
              <ul className="mt-5 space-y-2.5">
                {t.feats.map(f => <li key={f} className="flex items-center gap-2 text-body-sm text-on-surface"><Icon name="check_circle" className="text-[18px] text-tertiary" />{f}</li>)}
              </ul>
              <button className={`${t.featured ? btnPrimary : btnGhost} w-full justify-center mt-6`}>Choose {t.name}</button>
            </section>
          )
        })}
      </div>
    </div>
  )
}

/* ── Timeline ──────────────────────────────────────────────── */
export function TimelinePage() {
  const items = [
    { icon: 'rocket_launch', tone: ACCENT.indigo, title: 'Project kicked off', desc: 'Anicca v0.1 planning started.', time: '09:00' },
    { icon: 'commit', tone: ACCENT.green, title: 'First commit merged', desc: 'Core component scaffolding landed.', time: '11:30' },
    { icon: 'bug_report', tone: ACCENT.red, title: 'Critical bug fixed', desc: 'Dark mode escape issue resolved.', time: '14:15' },
    { icon: 'palette', tone: ACCENT.amber, title: 'Design polish', desc: 'Refined SaaS theme applied.', time: '16:40' },
    { icon: 'task_alt', tone: ACCENT.green, title: 'Release shipped', desc: 'Preview deployed to staging.', time: '18:00' },
  ]
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'Timeline']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Timeline</h1><p className="text-body-base text-on-surface-variant">Chronological activity feed.</p></div>
      <section className={`${card} p-6`}>
        <div className="relative pl-2">
          <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-outline-variant/25" />
          <div className="space-y-6">
            {items.map((it, i) => (
              <div key={i} className="relative flex gap-4">
                <span className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${it.tone}1a`, color: it.tone }}><Icon name={it.icon} className="text-[20px]" /></span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between gap-2"><p className="text-label-md font-bold text-on-surface">{it.title}</p><span className="text-[12px] text-outline tabular-nums">{it.time}</span></div>
                  <p className="text-body-sm text-on-surface-variant mt-0.5">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
