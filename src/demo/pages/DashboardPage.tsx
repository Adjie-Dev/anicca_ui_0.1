import { useState } from 'react'
import { AniccaChartWrapper } from '../../dashboard'
import { ACCENT, btnGhost, btnPrimary, pageShell } from '../theme'
import { carouselMetrics, members } from '../data'
import { useActions } from '../ui/Modal'
import { Crumbs, Icon, Segmented } from '../ui/primitives'
import { MembersTable, MetricCarousel } from './parts'
import { BarChart, LineChart, RadialBar } from '../ui/charts'

const FILTERS = ['All', 'Active', 'Pending', 'Inactive']

const salesSeries = [
  { name: 'Total', color: ACCENT.indigo, data: [42, 55, 50, 68, 62, 80, 88, 95] },
  { name: 'Pipeline', color: ACCENT.green, data: [30, 38, 44, 50, 48, 58, 66, 72] },
]
const salesLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const activitySeries = [
  { name: 'Successful', color: ACCENT.indigo, data: [22, 30, 26, 34, 28, 38, 30, 40, 33, 44] },
  { name: 'Failed', color: ACCENT.amber, data: [10, 14, 9, 12, 16, 11, 13, 9, 15, 12] },
]
const activityLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W']

const performance = [
  { label: 'Revenue', value: 75, color: ACCENT.indigo },
  { label: 'Profit', value: 55, color: ACCENT.green },
]

export function DashboardPage() {
  const { notify, form } = useActions()
  const [filter, setFilter] = useState('All')

  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', 'Dashboard']} />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-label-md text-primary font-bold uppercase tracking-[0.16em] mb-1">Overview</p>
          <h2 className="text-[32px] font-bold text-on-surface leading-tight tracking-tight">Good morning, Tathagata</h2>
          <p className="text-body-base text-outline mt-1">Sunday, 17 May 2026</p>
        </div>
        <div className="flex gap-3">
          <button className={btnGhost} onClick={() => notify('Export started…', 'success')}><Icon name="download" className="text-[18px]" />Export</button>
          <button className={btnPrimary} onClick={() => form('New Report', ['Report name', 'Date range', 'Owner'])}><Icon name="add" className="text-[18px]" />New Report</button>
        </div>
      </div>

      <MetricCarousel items={carouselMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2">
          <AniccaChartWrapper title="Sales Overview" subtitle="Total vs pipeline — hover for values" height={300}>
            <LineChart area height={250} labels={salesLabels} series={salesSeries} suffix="K" />
          </AniccaChartWrapper>
        </div>
        <AniccaChartWrapper title="Performance" subtitle="Targets achieved" height={300}>
          <RadialBar items={performance} />
        </AniccaChartWrapper>
      </div>

      <AniccaChartWrapper title="Deal Activity" subtitle="Successful vs failed deals — hover a day" height={290}>
        <BarChart stacked height={220} labels={activityLabels} series={activitySeries} prefix="$" suffix="k" />
      </AniccaChartWrapper>

      <div>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
          <div>
            <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">Team Overview</h4>
            <p className="text-body-sm text-outline mt-0.5">{members.length} people in your organization</p>
          </div>
          <Segmented options={FILTERS} value={filter} onChange={setFilter} />
        </div>
        <MembersTable rows={filter === 'All' ? members : members.filter(m => m.status === filter)} />
      </div>
    </div>
  )
}
