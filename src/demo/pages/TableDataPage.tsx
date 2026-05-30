import { AniccaDataTable, type AniccaColumn } from '../../dashboard'
import { ACCENT, pageShell } from '../theme'
import { Badge, Crumbs } from '../ui/primitives'
import { RowActions } from '../ui/Modal'
import type { BadgeTone } from '../ui/primitives'

interface Order {
  id: string
  customer: string
  initials: string
  color: string
  date: string
  amount: string
  status: string
  tone: BadgeTone
  actions: string
}

const C = [ACCENT.indigo, ACCENT.green, ACCENT.amber, ACCENT.red, ACCENT.slate]
const NAMES = ['Alice Johnson', 'Marcus Lee', 'Sarah Rogers', 'Tom Kelly', 'Nadia Park', 'Leo Mwangi', 'Priya Singh', 'Diego Cruz', 'Mei Tanaka', 'Omar Said', 'Eva Klein', 'Sam Wu']
const STATUS: [string, BadgeTone][] = [['Paid', 'success'], ['Pending', 'warn'], ['Failed', 'error'], ['Refunded', 'neutral']]

const orders: Order[] = NAMES.map((customer, i) => {
  const [status, tone] = STATUS[i % STATUS.length]
  return {
    id: `#ORD-${4200 + i}`,
    customer,
    initials: customer.split(' ').map(n => n[0]).join(''),
    color: C[i % C.length],
    date: `2026-0${(i % 9) + 1}-1${i % 9}`,
    amount: `$${(1200 + i * 437).toLocaleString()}`,
    status,
    tone,
    actions: '',
  }
})

const cols: AniccaColumn<Order>[] = [
  { key: 'id', label: 'Order', sortable: true, render: v => <span className="font-mono text-[12px] font-bold text-on-surface">{String(v)}</span> },
  { key: 'customer', label: 'Customer', sortable: true, render: (_v, o) => (
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: o.color }}>{o.initials}</span>
      <span className="font-bold text-on-surface">{o.customer}</span>
    </div>
  ) },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true, render: v => <span className="font-bold tabular-nums">{String(v)}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (_v, o) => <Badge tone={o.tone}>{o.status}</Badge> },
  { key: 'actions', label: '', render: (_v, o) => <RowActions label={o.id} /> },
]

export function TableDataPage() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Data Table']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Data Table</h1>
        <p className="text-body-base text-on-surface-variant">Search, sort, and pagination — all built into AniccaDataTable.</p>
      </div>
      <AniccaDataTable data={orders} columns={cols} searchPlaceholder="Search orders…" pageSize={6} />
    </div>
  )
}
