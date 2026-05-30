import { AniccaActivityFeed, AniccaChartWrapper, AniccaProgressCard, AniccaStatCard } from '../../dashboard'
import { ACCENT, btnPrimary, card, pageShell } from '../theme'
import { dashboardMetrics, efficiency, teamActivity, type ActivityTone } from '../data'
import { Badge, Crumbs, Icon } from '../ui/primitives'
import { Metrics } from './parts'
import { BarChart, LineChart, RadialBar } from '../ui/charts'

const ACT_COLOR: Record<ActivityTone, string> = { success: 'text-tertiary', warn: 'text-amber-600', info: 'text-primary', neutral: 'text-on-surface-variant' }
const ACT_BG: Record<ActivityTone, string> = { success: 'rgba(16,185,129,.14)', warn: 'rgba(217,119,6,.14)', info: 'rgba(70,72,212,.14)', neutral: 'rgba(100,116,139,.14)' }
const feedItems = teamActivity.map(a => ({ icon: <Icon name={a.icon} className={ACT_COLOR[a.tone]} />, iconBg: ACT_BG[a.tone], message: <span><b className="font-bold text-on-surface">{a.name}</b> {a.action}</span>, time: a.time }))

/* ── Widget Basic ──────────────────────────────────────────── */
export function WidgetBasicPage() {
  const tiles = [
    { icon: 'group', label: 'Customers', value: '12,480', color: ACCENT.indigo },
    { icon: 'shopping_bag', label: 'Orders', value: '4,893', color: ACCENT.green },
    { icon: 'payments', label: 'Revenue', value: '$372K', color: ACCENT.amber },
    { icon: 'undo', label: 'Refunds', value: '128', color: ACCENT.red },
  ]
  const alerts: { tone: 'info' | 'success' | 'warn' | 'error'; icon: string; msg: string }[] = [
    { tone: 'info', icon: 'info', msg: 'A new software update is available.' },
    { tone: 'success', icon: 'check_circle', msg: 'Your profile has been verified.' },
    { tone: 'warn', icon: 'warning', msg: 'Your storage is almost full.' },
    { tone: 'error', icon: 'error', msg: 'Payment failed — please retry.' },
  ]
  const alertCls = { info: 'bg-primary/10 text-primary border-primary/20', success: 'bg-tertiary/10 text-tertiary border-tertiary/20', warn: 'bg-amber-500/10 text-amber-600 border-amber-500/20', error: 'bg-error/10 text-error border-error/20' }
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Widget Basic']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Basic Widgets</h1><p className="text-body-base text-on-surface-variant">Stat tiles, progress, activity, and alerts.</p></div>

      <Metrics items={dashboardMetrics} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {tiles.map(t => (
          <div key={t.label} className={`${card} p-5 flex items-center gap-4`}>
            <span className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ background: `${t.color}1a`, color: t.color }}><Icon name={t.icon} className="text-[24px]" /></span>
            <div><p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{t.label}</p><p className="text-headline-sm font-bold text-on-surface tabular-nums">{t.value}</p></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <AniccaProgressCard title="Efficiency" items={efficiency} />
        <AniccaActivityFeed title="Recent Activity" items={feedItems} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
        {alerts.map(a => (
          <div key={a.tone} className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] border ${alertCls[a.tone]}`}>
            <Icon name={a.icon} className="text-[20px]" /><span className="text-body-sm text-on-surface">{a.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Widget Card ───────────────────────────────────────────── */
export function WidgetCardPage() {
  const social = [
    { icon: 'group', label: 'Followers', value: '24.8K', delta: '+12%', color: ACCENT.indigo },
    { icon: 'favorite', label: 'Likes', value: '8,420', delta: '+8%', color: ACCENT.red },
    { icon: 'visibility', label: 'Views', value: '1.2M', delta: '+24%', color: ACCENT.green },
  ]
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Widget Card']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Card Widgets</h1><p className="text-body-base text-on-surface-variant">Profile, social, and call-to-action cards.</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Profile */}
        <div className={`${card} p-6 text-center`}>
          <span className="w-20 h-20 rounded-full bg-primary-container text-on-primary text-2xl font-bold flex items-center justify-center mx-auto">TA</span>
          <h3 className="text-headline-sm font-bold text-on-surface mt-3">Tathagata</h3>
          <p className="text-body-sm text-on-surface-variant">Senior Systems Architect</p>
          <div className="flex justify-around mt-5 pt-5 border-t border-outline-variant/15">
            {[['Posts', '128'], ['Followers', '24.8K'], ['Following', '312']].map(([l, v]) => (
              <div key={l}><p className="text-headline-sm font-bold text-on-surface tabular-nums">{v}</p><p className="text-[11px] text-outline uppercase tracking-wider">{l}</p></div>
            ))}
          </div>
          <button className={`${btnPrimary} w-full mt-5 justify-center`}>Follow</button>
        </div>

        {/* Social stats */}
        <div className="space-y-gutter">
          {social.map(s => (
            <div key={s.label} className={`${card} p-5 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: `${s.color}1a`, color: s.color }}><Icon name={s.icon} className="text-[22px]" /></span>
                <div><p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</p><p className="text-headline-sm font-bold text-on-surface tabular-nums">{s.value}</p></div>
              </div>
              <Badge tone="success">{s.delta}</Badge>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-primary text-on-primary p-6 rounded-[20px] shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-[60px]" />
          <div className="z-10"><Icon name="rocket_launch" className="text-[32px]" /><h3 className="text-headline-sm font-bold mt-3">Upgrade to Pro</h3><p className="text-body-sm opacity-80 mt-1">Unlock advanced analytics, unlimited seats, and priority support.</p></div>
          <button className="z-10 mt-6 px-5 py-2.5 rounded-[10px] bg-white text-primary text-label-md font-bold w-full">Upgrade now</button>
        </div>
      </div>
    </div>
  )
}

/* ── Widget Chart ──────────────────────────────────────────── */
const SPARKS = [
  { label: 'Visitors', value: '24.8K', color: ACCENT.indigo, data: [60, 15, 50, 30, 70] },
  { label: 'Revenue', value: '$92K', color: ACCENT.amber, data: [70, 40, 60, 30, 60] },
  { label: 'Orders', value: '1,284', color: ACCENT.green, data: [60, 40, 60, 40, 70] },
  { label: 'Refunds', value: '128', color: ACCENT.red, data: [75, 30, 60, 35, 60] },
]

export function WidgetChartPage() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Widget Chart']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Chart Widgets</h1><p className="text-body-base text-on-surface-variant">Every chart is interactive — hover anywhere for values.</p></div>

      {/* sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {SPARKS.map(s => (
          <div key={s.label} className={`${card} p-5`}>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</p>
            <p className="text-headline-sm font-bold text-on-surface tabular-nums">{s.value}</p>
            <div className="mt-2">
              <LineChart sparkline area height={56} labels={s.data.map((_, i) => String(i + 1))} series={[{ name: s.label, color: s.color, data: s.data }]} />
            </div>
          </div>
        ))}
      </div>

      {/* grouped bar + radial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2">
          <AniccaChartWrapper title="Net Profit vs Revenue" subtitle="Grouped — hover a month" height={300}>
            <BarChart height={240} prefix="$" suffix="k" labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
              series={[{ name: 'Net Profit', color: ACCENT.indigo, data: [44, 55, 57, 56, 61, 58, 35, 50, 56] }, { name: 'Revenue', color: ACCENT.amber, data: [76, 85, 101, 98, 87, 105, 98, 100, 90] }]} />
          </AniccaChartWrapper>
        </div>
        <AniccaChartWrapper title="Performance" subtitle="Targets achieved" height={300}>
          <RadialBar items={[{ label: 'Sales', value: 75, color: ACCENT.indigo }, { label: 'Target', value: 55, color: ACCENT.green }]} />
        </AniccaChartWrapper>
      </div>

      {/* stacked bar */}
      <AniccaChartWrapper title="Deal Activity" subtitle="Stacked — hover a day" height={280}>
        <BarChart stacked height={220} prefix="$" suffix="k" labels={['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W']}
          series={[{ name: 'Successful', color: ACCENT.indigo, data: [22, 30, 26, 34, 28, 38, 30, 40, 33, 44] }, { name: 'Failed', color: ACCENT.amber, data: [10, 14, 9, 12, 16, 11, 13, 9, 15, 12] }]} />
      </AniccaChartWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
        <AniccaStatCard title="Conversion" value="3.24%" trend={0.8} trendLabel="vs last week" color={ACCENT.indigo} icon={<Icon name="trending_up" />} />
        <AniccaStatCard title="Bounce Rate" value="41.2%" trend={-2.1} trendLabel="vs last week" color={ACCENT.red} icon={<Icon name="trending_down" />} />
        <AniccaStatCard title="Avg. Session" value="4m 12s" trend={5.4} trendLabel="vs last week" color={ACCENT.green} icon={<Icon name="schedule" />} />
      </div>
    </div>
  )
}
