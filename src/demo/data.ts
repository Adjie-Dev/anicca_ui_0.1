/**
 * Static sample data for the preview. Kept separate from markup so pages stay
 * declarative and free of inline literals. Colours are data-viz hexes; status
 * uses BadgeTone enums rather than raw class strings.
 */
import type { BadgeTone } from './ui/primitives'
import { ACCENT } from './theme'

export interface Metric {
  title: string
  value: string
  icon: string
  color: string
  trend?: number
  trendLabel?: string
}

export interface Slice {
  label: string
  pct: number
  color: string
}

export interface Bar {
  label: string
  value: number
}

/** Build a CSS conic-gradient string from ordered slices. */
export function conic(slices: Slice[]): string {
  let acc = 0
  const stops = slices.map(s => {
    const from = acc
    acc += s.pct
    return `${s.color} ${from}% ${acc}%`
  })
  return `conic-gradient(${stops.join(', ')})`
}

/* ── Dashboard ─────────────────────────────────────────────── */
export const dashboardMetrics: Metric[] = [
  { title: 'Total Revenue', value: '$372,400', icon: 'monetization_on', trend: 24.5, trendLabel: 'vs last year', color: ACCENT.green },
  { title: 'Active Users', value: '8,420', icon: 'groups', trend: 12.2, trendLabel: 'vs last month', color: ACCENT.indigo },
  { title: 'Total Orders', value: '4,893', icon: 'shopping_cart', trend: -2.4, trendLabel: 'vs last week', color: ACCENT.red },
  { title: 'Conversion Rate', value: '3.24%', icon: 'query_stats', trend: 0.8, trendLabel: 'vs last month', color: ACCENT.slate },
]

export interface CarouselMetric { label: string; value: string; pct: number; icon: string; color: string }
export const carouselMetrics: CarouselMetric[] = [
  { label: 'Total Sales', value: '$560K', pct: 90, icon: 'payments', color: ACCENT.indigo },
  { label: 'Total Profit', value: '$185K', pct: 80, icon: 'trending_up', color: ACCENT.green },
  { label: 'Total Cost', value: '$375K', pct: 70, icon: 'account_balance_wallet', color: ACCENT.amber },
  { label: 'Revenue', value: '$742K', pct: 60, icon: 'monetization_on', color: ACCENT.indigo },
  { label: 'Net Income', value: '$150K', pct: 50, icon: 'savings', color: ACCENT.green },
  { label: 'Today', value: '$4,600', pct: 40, icon: 'today', color: ACCENT.amber },
  { label: 'Members', value: '11.2M', pct: 30, icon: 'group', color: ACCENT.red },
]

export const revenueBars: Record<'2024' | '2023', number[]> = {
  '2024': [40, 55, 48, 62, 70, 58, 82, 75, 65, 90, 95, 85],
  '2023': [30, 42, 50, 45, 60, 65, 70, 62, 72, 78, 80, 88],
}
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const traffic: Slice[] = [
  { label: 'Direct', pct: 45, color: ACCENT.indigo },
  { label: 'Organic', pct: 27, color: ACCENT.green },
  { label: 'Referral', pct: 16, color: ACCENT.slate },
  { label: 'Social', pct: 12, color: ACCENT.amber },
]

export interface Member {
  initials: string
  name: string
  email: string
  role: string
  status: string
  tone: BadgeTone
  revenue: string
  joined: string
  color: string
  actions: string
}
export const members: Member[] = [
  { initials: 'AJ', name: 'Alice Johnson', email: 'alice@company.io', role: 'Product Manager', status: 'Active', tone: 'success', revenue: '$24,800', joined: '2023-03-15', color: ACCENT.indigo, actions: '' },
  { initials: 'ML', name: 'Marcus Lee', email: 'marcus.l@company.io', role: 'Frontend Developer', status: 'Active', tone: 'success', revenue: '$18,200', joined: '2023-06-22', color: ACCENT.green, actions: '' },
  { initials: 'SR', name: 'Sarah Rogers', email: 'sarah.r@company.io', role: 'UX Designer', status: 'Pending', tone: 'warn', revenue: '$12,400', joined: '2024-01-10', color: ACCENT.amber, actions: '' },
  { initials: 'TK', name: 'Tom Kelly', email: 'tom.k@company.io', role: 'Backend Developer', status: 'Inactive', tone: 'neutral', revenue: '$9,100', joined: '2022-11-02', color: ACCENT.slate, actions: '' },
]

/* ── Monitoring ────────────────────────────────────────────── */
export type ServiceState = 'ok' | 'warn' | 'sync'
export interface Service {
  name: string
  icon: string
  status: string
  state: ServiceState
  uptime: string
  cpu: number
  mem: number
}
export const services: Service[] = [
  { name: 'Server Cluster Alpha', icon: 'dns', status: 'Operational', state: 'ok', uptime: '99.98%', cpu: 42, mem: 67 },
  { name: 'Sensor Mesh V4', icon: 'wifi_tethering', status: 'Maintenance', state: 'warn', uptime: '94.2%', cpu: 78, mem: 82 },
  { name: 'Main Data Lake', icon: 'storage', status: 'Operational', state: 'ok', uptime: '100%', cpu: 23, mem: 45 },
  { name: 'Edge Gateway EU', icon: 'router', status: 'Operational', state: 'ok', uptime: '99.95%', cpu: 55, mem: 61 },
  { name: 'Backup Array B2', icon: 'cloud_sync', status: 'Syncing', state: 'sync', uptime: '99.99%', cpu: 31, mem: 88 },
  { name: 'Load Balancer LB-3', icon: 'hub', status: 'Operational', state: 'ok', uptime: '100%', cpu: 12, mem: 34 },
]

export interface Progress {
  name: string
  progress: number
  color: string
}
export const uptime: Progress[] = [
  { name: 'Server Cluster Alpha', progress: 99.98, color: ACCENT.green },
  { name: 'Sensor Mesh V4', progress: 94.2, color: ACCENT.amber },
  { name: 'Main Data Lake', progress: 100, color: ACCENT.green },
  { name: 'Edge Gateway EU', progress: 99.95, color: ACCENT.green },
]

export type AlertTone = 'error' | 'warn' | 'info' | 'success'
export interface Alert {
  icon: string
  tone: AlertTone
  message: string
  time: string
}
export const alerts: Alert[] = [
  { icon: 'error', tone: 'error', message: 'Sensor Mesh V4 entered maintenance mode', time: '15 min ago' },
  { icon: 'warning', tone: 'warn', message: 'Memory on Backup Array B2 exceeded 85%', time: '1 hour ago' },
  { icon: 'info', tone: 'info', message: 'Scheduled maintenance window starts in 6 hours', time: '2 hours ago' },
  { icon: 'check_circle', tone: 'success', message: 'Edge Gateway EU recovered from latency spike', time: '4 hours ago' },
]

/* ── Fluid Dynamics ────────────────────────────────────────── */
export const fluidMetrics: Metric[] = [
  { title: 'Flow Velocity', value: '1,284 m/s', icon: 'speed', trend: 12.4, trendLabel: 'from last hour', color: ACCENT.indigo },
  { title: 'Pressure Delta', value: '42.8 PSI', icon: 'compress', color: ACCENT.amber },
  { title: 'Thermal Load', value: '186 °C', icon: 'thermostat', trend: -9, trendLabel: 'critical', color: ACCENT.red },
  { title: 'System Health', value: '99.98%', icon: 'check_circle', trend: 0.1, trendLabel: '14/15 nodes', color: ACCENT.green },
]

export const allocation: Slice[] = [
  { label: 'R&D Systems', pct: 42, color: ACCENT.indigo },
  { label: 'Manufacturing', pct: 35, color: ACCENT.amber },
  { label: 'Logistics', pct: 23, color: ACCENT.slate },
]

export type PerfState = 'ok' | 'warn' | 'bad'
export interface Incident {
  id: string
  icon: string
  status: string
  tone: BadgeTone
  dept: string
  sync: string
  perf: string
  perfState: PerfState
  actions: string
}
export const incidents: Incident[] = [
  { icon: 'water_drop', id: 'FLUID-TX-902', status: 'Operational', tone: 'success', dept: 'Tier-1 Engineering', sync: '2 mins ago', perf: '98.4%', perfState: 'ok', actions: '' },
  { icon: 'settings_suggest', id: 'TURBINE-A4', status: 'Maintenance', tone: 'warn', dept: 'Core Reliability', sync: '15 mins ago', perf: '67.2%', perfState: 'warn', actions: '' },
  { icon: 'warning', id: 'CORE-VALVE-01', status: 'Offline', tone: 'error', dept: 'Emergency Ops', sync: '1 hour ago', perf: '0.0%', perfState: 'bad', actions: '' },
  { icon: 'sensors', id: 'SENSOR-HUB-B', status: 'Operational', tone: 'success', dept: 'Data Services', sync: 'Just now', perf: '99.9%', perfState: 'ok', actions: '' },
]

/* ── Assets / Products ─────────────────────────────────────── */
export interface Product {
  icon: string
  iconColor: string
  name: string
  series: string
  sku: string
  cat: string
  stock: number
  qty: string
  status: string
  ok: boolean
  actions: string
}
export const products: Product[] = [
  { icon: 'valve', iconColor: ACCENT.indigo, name: 'High-Pressure Valve XT-40', series: 'Flow Regulation Series', sku: 'AN-XT-4022', cat: 'Pneumatics', stock: 84, qty: '420 / 500', status: 'In stock', ok: true, actions: '' },
  { icon: 'settings', iconColor: ACCENT.amber, name: 'Titanium Fitting Z-9', series: 'Connect-Pro Series', sku: 'AN-Z9-5510', cat: 'Hydraulics', stock: 6, qty: '12 / 200', status: 'Low stock', ok: false, actions: '' },
  { icon: 'cable', iconColor: ACCENT.green, name: 'Reinforced Hose 20mm', series: 'Conduit Solutions', sku: 'AN-RH-2000', cat: 'Tubing', stock: 80, qty: '1,200 / 1,500', status: 'In stock', ok: true, actions: '' },
]

export const assetMetrics: Metric[] = [
  { title: 'Total SKU', value: '1,248', icon: 'inventory_2', trend: 12, trendLabel: 'vs last month', color: ACCENT.indigo },
  { title: 'Low Stock Alerts', value: '14', icon: 'warning', trend: -3, trendLabel: 'critical', color: ACCENT.red },
]

export const inventoryFlow: number[] = [30, 45, 55, 70, 85, 95, 80]

export const quickActions = [
  { icon: 'qr_code_scanner', label: 'Scan SKU' },
  { icon: 'local_shipping', label: 'Track Shipment' },
  { icon: 'inventory', label: 'Restock' },
  { icon: 'assessment', label: 'Reports' },
]

/* ── Analytics v2 ──────────────────────────────────────────── */
export const analytics2Metrics: Metric[] = [
  { title: 'Avg. Fluid Velocity', value: '12.4 m/s', icon: 'speed', trend: 4.2, color: ACCENT.indigo },
  { title: 'Pressure Variance', value: '48.2 PSI', icon: 'edit_note', trend: -1.8, color: ACCENT.slate },
  { title: 'Energy Efficiency', value: '98.4%', icon: 'bolt', trend: 12, color: ACCENT.green },
  { title: 'Fluid Temp', value: '24.5 °C', icon: 'thermostat', color: ACCENT.amber },
]

export const efficiency: Progress[] = [
  { name: 'Reactor Core Alpha', progress: 98.2, color: ACCENT.indigo },
  { name: 'Heat Exchanger 04', progress: 84.5, color: ACCENT.green },
  { name: 'Intake Valve G7', progress: 72.1, color: ACCENT.slate },
]

export interface Component {
  icon: string
  name: string
  serial: string
  flow: string
  stress: string
  stressW: number
  stressColor: string
  time: string
  status: string
  tone: BadgeTone
}
export const components: Component[] = [
  { icon: 'water_drop', name: 'Centrifugal Pump C-01', serial: 'AC-99231', flow: '450 L/min', stress: 'Low', stressW: 30, stressColor: ACCENT.indigo, time: '2 mins ago', status: 'Operational', tone: 'success' },
  { icon: 'compress', name: 'Throttle Valve T-88', serial: 'AC-98112', flow: '120 L/min', stress: 'Critical', stressW: 85, stressColor: ACCENT.red, time: '5 mins ago', status: 'Maintenance', tone: 'error' },
  { icon: 'filter_alt', name: 'Filter Module FM-04', serial: 'AC-97003', flow: '900 L/min', stress: 'Medium', stressW: 55, stressColor: ACCENT.indigo, time: 'Just now', status: 'Processing', tone: 'neutral' },
]

/* ── Reports ───────────────────────────────────────────────── */
export const reportMetrics: Metric[] = [
  { title: 'Total Revenue', value: '$482,900', icon: 'payments', trend: 12.5, color: ACCENT.indigo },
  { title: 'Active Users', value: '12,402', icon: 'group', trend: 3.2, color: ACCENT.slate },
  { title: 'System Output', value: '942.8 m³/h', icon: 'precision_manufacturing', trend: -0.8, color: ACCENT.amber },
  { title: 'Power Usage', value: '1.2 MW', icon: 'bolt', color: ACCENT.green },
]
export const reportBars: number[] = [45, 55, 48, 62, 75, 85, 80, 95, 78, 82, 88, 100]

export type ActivityTone = 'success' | 'warn' | 'info' | 'neutral'
export interface Activity {
  icon: string
  tone: ActivityTone
  name: string
  action: string
  time: string
}
export const teamActivity: Activity[] = [
  { icon: 'check', tone: 'success', name: 'Elena Soros', action: 'validated Pipeline 04', time: '5 min ago' },
  { icon: 'edit', tone: 'warn', name: 'Marcus Kane', action: 'updated Fluid Specs', time: '22 min ago' },
  { icon: 'rocket_launch', tone: 'info', name: 'Lana Tiers', action: 'deployed V2.4 Sensors', time: '1 hour ago' },
  { icon: 'visibility', tone: 'neutral', name: 'David Ross', action: 'reviewed Q3 Projections', time: '3 hours ago' },
]

/* ── Settings ──────────────────────────────────────────────── */
export const profileFields: [string, string][] = [
  ['Full Name', 'Tathagata'],
  ['Email Address', 'j.aris@anicca.systems'],
  ['Job Title', 'Senior Systems Architect'],
  ['Primary Phone', '+49 171 000 0000'],
]

export const notificationPrefs = [
  { title: 'System Alerts', desc: 'Critical performance updates', on: true },
  { title: 'Integration Reports', desc: 'Daily summary of API calls', on: false },
  { title: 'Maintenance Logs', desc: 'Scheduled downtime reports', on: true },
]

export const securityCards = [
  { icon: 'lock_reset', title: 'Change Password', desc: 'Last updated 4 months ago' },
  { icon: 'security', title: '2FA Config', desc: 'Authenticator enabled' },
  { icon: 'key', title: 'API Access Tokens', desc: 'Manage developer keys' },
  { icon: 'devices', title: 'Active Sessions', desc: '3 devices online' },
]

export interface Integration {
  icon: string
  name: string
  desc: string
  status: string
  tone: BadgeTone
  date: string
  actions: string
}
export const integrations: Integration[] = [
  { icon: 'cloud', name: 'AWS Cloud Gateway', desc: 'Primary Data Lake', status: 'Connected', tone: 'success', date: 'Oct 12, 2023', actions: '' },
  { icon: 'forum', name: 'Slack Enterprise', desc: 'Incident Webhooks', status: 'Connected', tone: 'success', date: 'Nov 04, 2023', actions: '' },
  { icon: 'warning', name: 'Legacy SAP Bridge', desc: 'Resource Planning', status: 'Auth Error', tone: 'error', date: 'Dec 20, 2023', actions: '' },
]
