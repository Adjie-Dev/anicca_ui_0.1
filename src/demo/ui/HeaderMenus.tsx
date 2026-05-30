import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ACCENT } from '../theme'
import { useToast } from './Toast'
import { Icon } from './primitives'

/** Shared dropdown shell (open state + outside-click/Esc), anchored right. */
function Dropdown({ trigger, children }: { trigger: (open: boolean) => ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey) }
  }, [open])
  return (
    <div className="relative" ref={ref}>
      <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(o => !o)} className="relative p-2 rounded-full text-on-surface-variant hover:bg-primary/5 transition-colors">
        {trigger(open)}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-[16px] bg-surface-container-lowest border border-outline-variant/20 shadow-lg z-[1500] overflow-hidden" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}

const NOTIFS = [
  { icon: 'shopping_cart', tone: ACCENT.indigo, title: 'New order #ORD-4821 received', time: '2 min ago' },
  { icon: 'person_add', tone: ACCENT.green, title: 'Nadia Park signed up', time: '18 min ago' },
  { icon: 'warning', tone: ACCENT.amber, title: 'Storage almost full (88%)', time: '1 hour ago' },
  { icon: 'error', tone: ACCENT.red, title: 'Payment failed for INV-2026-100', time: '3 hours ago' },
]

const MSGS = [
  { initials: 'AJ', color: ACCENT.indigo, name: 'Alice Johnson', snippet: 'Can you review the latest specs?', time: '5m' },
  { initials: 'ML', color: ACCENT.green, name: 'Marcus Lee', snippet: 'Deployed the new build 🎉', time: '22m' },
  { initials: 'SR', color: ACCENT.amber, name: 'Sarah Rogers', snippet: 'Updated the design tokens.', time: '1h' },
  { initials: 'TK', color: ACCENT.slate, name: 'Tom Kelly', snippet: 'Backend tests are green.', time: '3h' },
]

function Header({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
      <span className="text-label-md font-bold text-on-surface">{title}</span>
      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{count} new</span>
    </div>
  )
}

function Footer({ label }: { label: string }) {
  const notify = useToast()
  return <button onClick={() => notify(label)} className="w-full py-3 text-center text-label-md font-bold text-primary hover:bg-primary/5 transition-colors border-t border-outline-variant/10">{label}</button>
}

export function NotificationsMenu() {
  return (
    <Dropdown trigger={() => <><Icon name="notifications" /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface" /></>}>
      <Header title="Notifications" count={NOTIFS.length} />
      <div className="max-h-80 overflow-y-auto">
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${n.tone}1a`, color: n.tone }}><Icon name={n.icon} className="text-[18px]" /></span>
            <div className="min-w-0"><p className="text-body-sm text-on-surface leading-snug">{n.title}</p><p className="text-[11px] text-outline mt-0.5">{n.time}</p></div>
          </div>
        ))}
      </div>
      <Footer label="View all notifications" />
    </Dropdown>
  )
}

export function MessagesMenu() {
  return (
    <Dropdown trigger={() => <Icon name="chat" />}>
      <Header title="Messages" count={MSGS.length} />
      <div className="max-h-80 overflow-y-auto">
        {MSGS.map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0" style={{ background: m.color }}>{m.initials}</span>
            <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><p className="text-body-sm font-bold text-on-surface truncate">{m.name}</p><span className="text-[11px] text-outline shrink-0">{m.time}</span></div><p className="text-[12px] text-on-surface-variant truncate">{m.snippet}</p></div>
          </div>
        ))}
      </div>
      <Footer label="View all messages" />
    </Dropdown>
  )
}
