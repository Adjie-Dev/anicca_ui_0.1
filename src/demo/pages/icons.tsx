import { useState } from 'react'
import { card, pageShell } from '../theme'
import { useToast } from '../ui/Toast'
import { Crumbs } from '../ui/primitives'

const ICONS = [
  'home', 'dashboard', 'search', 'settings', 'person', 'group', 'mail', 'notifications', 'calendar_month', 'analytics',
  'shopping_cart', 'favorite', 'star', 'bookmark', 'visibility', 'lock', 'key', 'shield', 'verified', 'bolt',
  'cloud', 'folder', 'description', 'image', 'videocam', 'mic', 'call', 'chat', 'send', 'attach_file',
  'edit', 'delete', 'add', 'check_circle', 'cancel', 'info', 'warning', 'error', 'help', 'trending_up',
  'payments', 'credit_card', 'savings', 'inventory_2', 'local_shipping', 'map', 'public', 'flag', 'schedule', 'timer',
]

type Variant = 'solid' | 'outline' | 'dualtone'

function IconGallery({ variant }: { variant: Variant }) {
  const [q, setQ] = useState('')
  const notify = useToast()
  const list = ICONS.filter(n => n.includes(q.toLowerCase().trim()))
  const fill = variant === 'outline' ? 0 : 1
  const tone = variant === 'dualtone' ? 'text-primary' : 'text-on-surface'
  const copy = (name: string) => {
    try { navigator.clipboard?.writeText(name) } catch { /* ignore */ }
    notify(`Copied "${name}"`, 'success')
  }
  return (
    <>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">search</span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search icons…" className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-[10px] text-body-base text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
        {list.map(name => (
          <button key={name} onClick={() => copy(name)} title={`Copy "${name}"`} className={`${card} aspect-square flex flex-col items-center justify-center gap-1.5 p-2 hover:border-primary hover:bg-primary/5 transition-all group`}>
            <span className={`material-symbols-outlined text-[26px] ${tone} ${variant === 'dualtone' ? 'opacity-90' : ''}`} style={{ fontVariationSettings: `'FILL' ${fill}` }}>{name}</span>
            <span className="text-[9px] text-outline truncate w-full text-center">{name}</span>
          </button>
        ))}
        {list.length === 0 && <p className="col-span-full text-center text-body-sm text-outline py-8">No icons match “{q}”.</p>}
      </div>
    </>
  )
}

function IconsPage({ crumb, title, variant }: { crumb: string; title: string; variant: Variant }) {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Icons', crumb]} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">{title}</h1><p className="text-body-base text-on-surface-variant">{ICONS.length} icons · click any to copy its name.</p></div>
      <IconGallery variant={variant} />
    </div>
  )
}

export const IconsSolidPage = () => <IconsPage crumb="Solid" title="Solid Icons" variant="solid" />
export const IconsOutlinePage = () => <IconsPage crumb="Outline" title="Outline Icons" variant="outline" />
export const IconsDualtonePage = () => <IconsPage crumb="Dual Tone" title="Dual Tone Icons" variant="dualtone" />
