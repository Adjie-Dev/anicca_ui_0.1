import { AniccaActivityFeed, AniccaChartWrapper, AniccaDataTable, AniccaProgressCard, type AniccaColumn } from '../../dashboard'
import { ACCENT, pageShell } from '../theme'
import { months, revenueBars, teamActivity, type ActivityTone, type Metric } from '../data'
import { Badge, Crumbs, Icon, type BadgeTone } from '../ui/primitives'
import { BarChart, Metrics } from './parts'

const adminMetrics: Metric[] = [
  { title: 'Total Users', value: '18,402', icon: 'group', trend: 8.1, trendLabel: 'this month', color: ACCENT.indigo },
  { title: 'Active Sessions', value: '1,284', icon: 'bolt', trend: 3.4, trendLabel: 'live', color: ACCENT.green },
  { title: 'Revenue', value: '$92.4K', icon: 'payments', trend: 12.5, trendLabel: 'this month', color: ACCENT.amber },
  { title: 'Open Tickets', value: '37', icon: 'confirmation_number', trend: -5.2, trendLabel: 'vs last week', color: ACCENT.red },
]

const health = [
  { name: 'API Gateway', progress: 99.9, color: ACCENT.green },
  { name: 'Database', progress: 96.2, color: ACCENT.green },
  { name: 'Cache Layer', progress: 88.5, color: ACCENT.amber },
  { name: 'Job Queue', progress: 72.1, color: ACCENT.amber },
]

interface Signup { name: string; initials: string; color: string; email: string; plan: string; tone: BadgeTone; date: string }
const signups: Signup[] = [
  { name: 'Nadia Park', initials: 'NP', color: ACCENT.indigo, email: 'nadia@acme.io', plan: 'Pro', tone: 'success', date: 'Just now' },
  { name: 'Leo Mwangi', initials: 'LM', color: ACCENT.green, email: 'leo@beta.co', plan: 'Free', tone: 'neutral', date: '12m ago' },
  { name: 'Priya Singh', initials: 'PS', color: ACCENT.amber, email: 'priya@gamma.io', plan: 'Team', tone: 'info', date: '1h ago' },
  { name: 'Diego Cruz', initials: 'DC', color: ACCENT.red, email: 'diego@delta.io', plan: 'Pro', tone: 'success', date: '3h ago' },
]
const cols: AniccaColumn<Signup>[] = [
  { key: 'name', label: 'User', sortable: true, render: (_v, s) => (
    <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: s.color }}>{s.initials}</span><div><p className="font-bold text-on-surface">{s.name}</p><p className="text-[12px] text-outline">{s.email}</p></div></div>
  ) },
  { key: 'plan', label: 'Plan', sortable: true, render: (_v, s) => <Badge tone={s.tone}>{s.plan}</Badge> },
  { key: 'date', label: 'Signed up' },
]

const ACT_COLOR: Record<ActivityTone, string> = { success: 'text-tertiary', warn: 'text-amber-600', info: 'text-primary', neutral: 'text-on-surface-variant' }
const feed = teamActivity.map(a => ({ icon: <Icon name={a.icon} className={ACT_COLOR[a.tone]} />, iconBg: 'rgba(70,72,212,.12)', message: <span><b className="font-bold text-on-surface">{a.name}</b> {a.action}</span>, time: a.time }))

export function AdminPage() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', 'Admin']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Admin Overview</h1><p className="text-body-base text-on-surface-variant">Platform health, users, and revenue at a glance.</p></div>

      <Metrics items={adminMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2">
          <AniccaChartWrapper title="Revenue" subtitle="Last 12 months — hover the bars" height={300}>
            <BarChart values={revenueBars['2024']} labels={months} highlightFrom={9} suffix="K" />
          </AniccaChartWrapper>
        </div>
        <AniccaProgressCard title="System Health" items={health} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2">
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-3">Recent Signups</h4>
          <AniccaDataTable data={signups} columns={cols} searchPlaceholder="Search users…" pageSize={5} />
        </div>
        <AniccaActivityFeed title="Activity" items={feed} />
      </div>
    </div>
  )
}
