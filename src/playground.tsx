/**
 * Playground — mirrors preview_anicca_ui_0.1 dark/code.html + light/code.html
 * using the anicca-ui library components exactly.
 */
import React, { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import ReactDOM from 'react-dom/client'
import './dashboard/styles.css'
import './theme/tokens.css'

import {
  AniccaNavbar, AniccaSidebar,
  AniccaChartWrapper, AniccaDataTable, AniccaBreadcrumb,
  AniccaModal, type AniccaSidebarItem, type AniccaColumn,
} from './index'

/* ── Constants ──────────────────────────────────────────────────────── */

const ACCENT = {
  indigo: '#4648d4',
  blue: '#3b82f6',
  green: '#10b981',
  red: '#ef4444',
  amber: '#d97706',
  orange: '#f97316',
  purple: '#a855f7',
  slate: '#64748b',
} as const

const btnPrimary =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-[12px] font-bold shadow-lg shadow-primary/30 hover:brightness-110 transition-all active:scale-95'

const btnGhost =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-outline text-on-surface text-[12px] hover:bg-surface-container-low transition-all active:scale-95'

const pageShell = 'p-[40px] max-w-container-max mx-auto space-y-8'

/* ── Navigation items — flat, matches dark/code.html sidebar ─────── */

const MAIN_NAV: AniccaSidebarItem[] = [
  { label: 'Dashboard',  href: '#dashboard',  icon: <Icon name="dashboard" /> },
  { label: 'Analytics',  href: '#analytics',  icon: <Icon name="analytics" /> },
  { label: 'Users',      href: '#users',      icon: <Icon name="group" /> },
  { label: 'Products',   href: '#products',   icon: <Icon name="inventory_2" /> },
  { label: 'Orders',     href: '#orders',     icon: <Icon name="shopping_cart" /> },
  { label: 'Finance',    href: '#finance',    icon: <Icon name="payments" /> },
  { label: 'Messages',   href: '#messages',   icon: <Icon name="chat" /> },
  { label: 'Calendar',   href: '#calendar',   icon: <Icon name="calendar_today" /> },
  { label: 'Settings',   href: '#settings',   icon: <Icon name="settings" /> },
]

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  users: 'Users',
  products: 'Products',
  orders: 'Orders',
  finance: 'Finance',
  messages: 'Messages',
  calendar: 'Calendar',
  settings: 'Settings',
}

/* ── Data ────────────────────────────────────────────────────────────── */

const members = [
  { initials: 'AJ', name: 'Alice Johnson',  email: 'alice@company.io',    role: 'Product Manager',    status: 'Active',   revenue: '$24,800', joined: '2023-03-15', color: ACCENT.blue },
  { initials: 'ML', name: 'Marcus Lee',     email: 'marcus.l@company.io', role: 'Frontend Developer', status: 'Active',   revenue: '$18,200', joined: '2023-06-22', color: ACCENT.orange },
  { initials: 'SR', name: 'Sarah Rogers',   email: 'sarah.r@company.io',  role: 'UX Designer',        status: 'Pending',  revenue: '$12,400', joined: '2024-01-10', color: ACCENT.purple },
  { initials: 'TK', name: 'Tom Kelly',      email: 'tom.k@company.io',    role: 'Backend Developer',  status: 'Inactive', revenue: '$9,100',  joined: '2022-11-02', color: ACCENT.slate },
]
type Member = typeof members[0]

const salesSeries: Series[] = [
  { name: 'Total',    color: ACCENT.indigo, data: [42, 55, 50, 68, 62, 80, 88, 95] },
  { name: 'Pipeline', color: ACCENT.green,  data: [30, 38, 44, 50, 48, 58, 66, 72] },
]
const salesLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const activitySeries: Series[] = [
  { name: 'Successful', color: ACCENT.indigo, data: [22, 30, 26, 34, 28, 38, 30, 40, 33, 44] },
  { name: 'Failed',     color: ACCENT.amber,  data: [10, 14,  9, 12, 16, 11, 13,  9, 15, 12] },
]
const activityLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W']

const barData: Series[] = [
  { name: 'Jan', color: ACCENT.blue,   data: [40] },
  { name: 'Feb', color: ACCENT.blue,   data: [55] },
  { name: 'Mar', color: ACCENT.blue,   data: [48] },
  { name: 'Apr', color: ACCENT.blue,   data: [62] },
  { name: 'May', color: ACCENT.blue,   data: [70] },
  { name: 'Jun', color: ACCENT.blue,   data: [58] },
  { name: 'Jul', color: ACCENT.blue,   data: [82] },
  { name: 'Aug', color: ACCENT.blue,   data: [75] },
  { name: 'Sep', color: ACCENT.blue,   data: [65] },
  { name: 'Oct', color: ACCENT.indigo, data: [90] },
  { name: 'Nov', color: ACCENT.indigo, data: [95] },
  { name: 'Dec', color: ACCENT.indigo, data: [85] },
]

/* ── Icon helper ─────────────────────────────────────────────────── */

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>
}

/* ── Badge ────────────────────────────────────────────────────────── */

const BADGE_CLS: Record<string, string> = {
  success: 'bg-[rgba(16,185,129,0.1)] text-[#10b981] border border-[rgba(16,185,129,0.2)]',
  warn:    'bg-[rgba(217,119,6,0.1)] text-amber border border-amber/20',
  error:   'bg-[rgba(239,68,68,0.1)] text-error border border-error/20',
  neutral: 'bg-surface-container-highest/50 text-outline border border-outline-variant/30',
}
function Badge({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-3 py-1 rounded-full ${BADGE_CLS[tone] ?? BADGE_CLS.neutral}`}>
      {children}
    </span>
  )
}
const TONE_MAP: Record<string, string> = { Active: 'success', Pending: 'warn', Inactive: 'neutral' }

/* ── Segmented control ───────────────────────────────────────────── */

function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="bg-surface-container-low/50 p-1 rounded-xl flex gap-1 border border-outline-variant/30">
      {options.map(o => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-colors ${value === o ? 'bg-primary text-white shadow-sm' : 'text-outline hover:text-on-surface'}`}
        >{o}</button>
      ))}
    </div>
  )
}

/* ── Charts ──────────────────────────────────────────────────────── */

interface Series { name: string; color: string; data: number[] }
const TIP = 'rounded-md bg-[#0b1c30] text-white px-2.5 py-1.5 shadow-lg text-[11px] whitespace-nowrap z-10 pointer-events-none'

function LineChart({ series, labels, height = 240, area = false, suffix = '' }: { series: Series[]; labels: string[]; height?: number; area?: boolean; suffix?: string }) {
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
          {area && <defs>{series.map((s, si) => <linearGradient key={si} id={`${uid}-${si}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity="0.22" /><stop offset="100%" stopColor={s.color} stopOpacity="0" /></linearGradient>)}</defs>}
          {area && series.map((s, si) => <path key={`a${si}`} d={fill(s.data)} fill={`url(#${uid}-${si})`} />)}
          {series.map((s, si) => <path key={si} d={line(s.data)} fill="none" stroke={s.color} strokeWidth="2.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />)}
          {hi !== null && <line x1={x(hi)} y1={0} x2={x(hi)} y2={100} stroke="#64748b" strokeOpacity="0.5" strokeWidth={1} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />}
        </svg>
        {hi !== null && series.map((s, si) => <span key={si} className="absolute w-2.5 h-2.5 rounded-full border-2 border-white shadow pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: `${x(hi)}%`, top: `${y(s.data[hi])}%`, background: s.color }} />)}
        {hi !== null && (
          <div className={`absolute top-1 -translate-x-1/2 ${TIP}`} style={{ left: `${Math.min(82, Math.max(18, x(hi)))}%` }}>
            <div className="font-bold mb-0.5">{labels[hi]}</div>
            {series.map((s, si) => <div key={si} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name}: <b className="tabular-nums">{s.data[hi]}{suffix}</b></div>)}
          </div>
        )}
      </div>
      <div className="flex justify-between text-[10px] text-outline uppercase tracking-wider mt-2 px-1">{labels.map((l, i) => <span key={i}>{l}</span>)}</div>
    </div>
  )
}

function BarChart({ series, height = 200 }: { series: Series[]; labels: string[]; height?: number }) {
  const [hi, setHi] = useState<number | null>(null)
  const max = Math.max(...series.map(s => s.data[0] ?? 0)) * 1.1 || 1
  return (
    <div>
      <div className="flex items-end gap-2 px-1 mb-2" style={{ height }}>
        {series.map((s, i) => (
          <div key={i}
            className="relative flex-1 rounded-t-sm transition-colors cursor-default"
            style={{ height: `${(s.data[0] / max) * 100}%`, background: hi === i ? ACCENT.indigo : 'rgba(71,85,105,0.2)' }}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
          >
            {hi === i && (
              <div className={`absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 ${TIP}`}>
                <div className="font-bold">{s.name}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-outline uppercase px-1 border-b border-outline-variant/30 pb-4">
        {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  )
}

function StackedBar({ series, labels, height = 220 }: { series: Series[]; labels: string[]; height?: number }) {
  const [hi, setHi] = useState<number | null>(null)
  const max = Math.max(...labels.map((_, i) => series.reduce((s, se) => s + (se.data[i] ?? 0), 0))) * 1.1 || 1
  return (
    <div>
      <div className="flex items-end gap-2 px-1" style={{ height }}>
        {labels.map((_, i) => (
          <div key={i} className="relative flex-1 h-full flex items-end justify-center"
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
          >
            <div className="w-3/4 h-full flex flex-col-reverse">
              {series.map((s, si) => (
                <div key={si} className="w-full first:rounded-b-[3px] last:rounded-t-[4px]"
                  style={{ height: `${(s.data[i] / max) * 100}%`, background: s.color, opacity: hi === null || hi === i ? 1 : 0.45 }}
                />
              ))}
            </div>
            {hi === i && (
              <div className={`absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 ${TIP}`}>
                <div className="font-bold mb-0.5">{labels[i]}</div>
                {series.map((s, si) => <div key={si} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name}: <b className="tabular-nums">{s.data[i]}k</b></div>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-outline uppercase tracking-wider mt-2 px-1">
        {labels.map((l, i) => <span key={i} className="flex-1 text-center">{l}</span>)}
      </div>
    </div>
  )
}

function DonutChart({ data, height = 230 }: { data: { label: string; value: number; color: string }[]; height?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let offset = 0
  const R = 45, C = 2 * Math.PI * R
  return (
    <div className="flex flex-col items-center" style={{ minHeight: height }}>
      <div className="relative" style={{ width: 192, height: 192 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeWidth="18" className="text-surface-container-high" />
          {data.map((d, i) => {
            const len = (d.value / total) * C
            const el = <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={d.color} strokeWidth="18" strokeLinecap="butt" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            offset += len
            return el
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <p className="text-[22px] font-bold text-on-surface">24.8K</p>
          <p className="text-[12px] text-outline">Visitors</p>
        </div>
      </div>
      <div className="mt-8 w-full space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
              <span className="text-[14px] text-on-surface-variant">{d.label}</span>
            </div>
            <span className="text-[12px] font-bold text-on-surface">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Dashboard Page — matches dark/code.html content exactly ──────── */

const FILTERS = ['All', 'Active', 'Pending', 'Inactive']

function DashboardPage() {
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredMembers = filter === 'All' ? members : members.filter(m => m.status === filter)

  const cols: AniccaColumn<Member>[] = [
    {
      key: 'name', label: 'Member', sortable: true,
      render: (_v, m) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: m.color }}>{m.initials}</div>
          <div>
            <p className="text-[12px] font-bold text-on-surface">{m.name}</p>
            <p className="text-[12px] text-outline">{m.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role',    label: 'Role',    sortable: true },
    { key: 'status',  label: 'Status',  sortable: true, render: (_v, m) => <Badge tone={TONE_MAP[m.status] ?? 'neutral'}>{m.status}</Badge> },
    { key: 'revenue', label: 'Revenue', sortable: true },
    { key: 'joined',  label: 'Joined',  sortable: true },
  ]

  return (
    <div className={pageShell}>
      <AniccaBreadcrumb items={[{ label: 'Home', href: '#dashboard' }, { label: 'Dashboard' }]} />

      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[12px] text-primary font-bold uppercase tracking-widest mb-1">Overview</p>
          <h2 className="text-[32px] font-bold text-on-surface leading-tight tracking-tight">Good Morning, Tathagata 👋</h2>
          <p className="text-[16px] text-outline">Sunday, 17 May 2026</p>
        </div>
        <div className="flex gap-3">
          <button className={btnGhost}><Icon name="download" className="text-[18px]" /> Export</button>
          <button className={btnPrimary} onClick={() => setModalOpen(true)}><Icon name="add" className="text-[18px]" /> New Report</button>
        </div>
      </div>

      {/* Key Metrics — 4 glass cards, matches dark HTML */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {[
          { label: 'Total Revenue', value: '$372,400', change: '+24.5%', changeType: 'up',   icon: 'monetization_on', iconColor: ACCENT.green,  accentColor: ACCENT.green  },
          { label: 'Active Users',  value: '8,420',    change: '+12.2%', changeType: 'up',   icon: 'groups',          iconColor: ACCENT.blue,   accentColor: ACCENT.blue   },
          { label: 'Total Orders',  value: '4,893',    change: '-2.4%',  changeType: 'down', icon: 'shopping_cart',   iconColor: ACCENT.red,    accentColor: ACCENT.red    },
          { label: 'Conv. Rate',    value: '3.24%',    change: '+0.8%',  changeType: 'up',   icon: 'query_stats',     iconColor: ACCENT.slate,  accentColor: ACCENT.slate  },
        ].map((card) => (
          <div key={card.label} className="glass-card p-6 rounded-xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[12px] font-semibold text-outline uppercase tracking-wider">{card.label}</p>
              <span className="material-symbols-outlined" style={{ color: card.iconColor }}>{card.icon}</span>
            </div>
            <h3 className="text-[24px] font-semibold mb-2 text-on-surface">{card.value}</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded flex items-center"
                style={{
                  background: card.changeType === 'up' ? `${ACCENT.green}20` : `${ACCENT.red}20`,
                  color: card.changeType === 'up' ? ACCENT.green : ACCENT.red,
                }}>
                <Icon name={card.changeType === 'up' ? 'trending_up' : 'trending_down'} className="text-[12px] mr-1" />
                {card.change}
              </span>
              <span className="text-[10px] text-outline">vs last month</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 group-hover:opacity-100 transition-colors"
              style={{ background: `${card.accentColor}20` }} />
          </div>
        ))}
      </div>

      {/* Middle section: Revenue Overview (2/3) + Traffic Sources (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
        <div className="lg:col-span-2">
          <AniccaChartWrapper title="Revenue Overview" subtitle="Monthly recurring revenue" height={340}>
            <BarChart series={barData} labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} height={280} />
          </AniccaChartWrapper>
        </div>
        <AniccaChartWrapper title="Traffic Sources" subtitle="Where visitors come from" height={340}>
          <DonutChart data={[
            { label: 'Direct',   value: 45, color: ACCENT.blue },
            { label: 'Organic',  value: 27, color: ACCENT.green },
            { label: 'Referral', value: 16, color: ACCENT.slate },
            { label: 'Social',   value: 12, color: '#f97316' },
          ]} />
        </AniccaChartWrapper>
      </div>

      {/* Sales Overview line chart */}
      <AniccaChartWrapper title="Sales Overview" subtitle="Total vs pipeline — hover for values" height={290}>
        <LineChart area height={230} labels={salesLabels} series={salesSeries} suffix="K" />
      </AniccaChartWrapper>

      {/* Deal Activity */}
      <AniccaChartWrapper title="Deal Activity" subtitle="Successful vs failed deals" height={290}>
        <StackedBar series={activitySeries} labels={activityLabels} height={230} />
      </AniccaChartWrapper>

      {/* Team Overview — matches dark HTML table */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-[18px] font-semibold text-on-surface">Team Overview</h4>
            <p className="text-[14px] text-outline">7 people in your organization</p>
          </div>
          <Segmented options={FILTERS} value={filter} onChange={setFilter} />
        </div>
        <AniccaDataTable data={filteredMembers} columns={cols} pageSize={5} />
      </div>

      {/* Modal */}
      <AniccaModal open={modalOpen} onClose={() => setModalOpen(false)} title="New Report"
        footer={
          <>
            <button className={btnGhost} onClick={() => setModalOpen(false)}>Cancel</button>
            <button className={btnPrimary} onClick={() => setModalOpen(false)}>Create</button>
          </>
        }
      >
        <div className="space-y-4">
          {['Report name', 'Date range', 'Owner'].map(f => (
            <div key={f}>
              <label className="block text-[12px] font-semibold text-on-surface-variant mb-1">{f}</label>
              <input className="w-full px-3 py-2 rounded-[10px] border border-outline-variant/50 bg-surface-container-low text-on-surface text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition" placeholder={f} />
            </div>
          ))}
        </div>
      </AniccaModal>
    </div>
  )
}

/* ── Placeholder page for non-dashboard routes ─────────────────────── */

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className={pageShell}>
      <AniccaBreadcrumb items={[{ label: 'Dashboard', href: '#dashboard' }, { label: title }]} />
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Icon name="construction" className="text-[64px] text-outline/40 mb-4" />
        <h3 className="text-[20px] font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-[14px] text-outline">This page is coming soon.</p>
      </div>
    </div>
  )
}

/* ── App ─────────────────────────────────────────────────────────────── */

function App() {
  const [page, setPage] = useState('dashboard')
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(() => localStorage.getItem('anicca-theme') !== 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    /* Inject glass-card style that matches preview */
    let styleEl = document.getElementById('playground-glass')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'playground-glass'
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = dark
      ? `.glass-card { background: rgba(30,41,59,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(51,65,85,0.5); }`
      : `.glass-card { background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(11,28,48,0.06); }`
  }, [dark])

  const toggleDark = () => {
    const next = !dark; setDark(next)
    localStorage.setItem('anicca-theme', next ? 'dark' : 'light')
  }

  const onNavClick = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest('a')
    const href = anchor?.getAttribute('href')
    if (href?.startsWith('#')) {
      e.preventDefault()
      setPage(href.slice(1))
    }
  }

  const currentTitle = PAGE_TITLES[page] ?? 'Dashboard'

  const navActions = (
    <div className="flex items-center gap-2">
      <div className="relative hidden md:flex items-center">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">search</span>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search data..."
          className="pl-10 pr-4 py-2 w-64 bg-surface-container-low border-none rounded-full text-[14px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline transition"
        />
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 hover:text-primary transition-colors text-on-surface-variant">
          <Icon name="notifications" />
        </button>
        <button className="p-2 hover:text-primary transition-colors text-on-surface-variant">
          <Icon name="chat_bubble" />
        </button>
        <button className="p-2 text-primary transition-colors" onClick={toggleDark}>
          <Icon name={dark ? 'light_mode' : 'dark_mode'} />
        </button>
      </div>
      <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
        <div className="text-right hidden lg:block">
          <p className="text-[12px] font-bold text-on-surface">Tathagata Developer</p>
          <p className="text-[10px] text-outline uppercase">Super Admin</p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">T</div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — matches dark/code.html: fixed, bg-[#0b1221] dark, flat items */}
      <div onClickCapture={onNavClick}>
        <AniccaSidebar
          items={MAIN_NAV}
          activePath={`#${page}`}
          className="fixed left-0 top-0 z-50"
          logo={
            <div className="flex items-center gap-3">
              <span className="text-[24px] font-bold text-on-surface dark:text-white">Anicca</span>
              <span className="text-[10px] px-2 py-0.5 bg-primary rounded-full text-white font-medium">Free</span>
            </div>
          }
          footer={
            <p className="text-[10px] text-outline uppercase tracking-widest font-bold opacity-50">v0.1.0 • Free</p>
          }
        />
      </div>

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 min-w-0 ml-[260px]">
        <AniccaNavbar
          title={currentTitle}
          actions={navActions}
          className="max-w-full"
        />
        {page === 'dashboard' ? <DashboardPage /> : <PlaceholderPage title={currentTitle} />}
      </main>
    </div>
  )
}

/* ── Bootstrap ───────────────────────────────────────────────────────── */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
)
