import { useState } from 'react'
import { type Page } from '../theme'
import { useNav } from '../nav'
import { Icon } from '../ui/primitives'
import { DashboardPage } from './DashboardPage'

type Variant = 'horizontal' | 'dual-horizontal' | 'dual-compact' | 'boxed' | 'boxed-fancy'

const HMENU: { label: string; page: Page; icon: string }[] = [
  { label: 'Dashboard', page: 'dashboard', icon: 'dashboard' },
  { label: 'Analytics', page: 'reports', icon: 'analytics' },
  { label: 'Users', page: 'user-list', icon: 'group' },
  { label: 'Products', page: 'products2', icon: 'inventory_2' },
  { label: 'Settings', page: 'settings', icon: 'settings' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('anicca-theme', next ? 'dark' : 'light')
  }
  return <button onClick={toggle} className="p-2 rounded-full text-on-surface-variant hover:bg-primary/5 transition-colors" aria-label="Theme"><Icon name={dark ? 'light_mode' : 'dark_mode'} /></button>
}

function Brand() {
  return <div className="flex items-baseline gap-1.5"><span className="text-headline-sm font-black text-primary tracking-tight">Anicca</span><span className="text-label-sm text-on-surface-variant/70 hidden sm:inline">Code Studio</span></div>
}

function HMenu({ center }: { center?: boolean }) {
  const go = useNav()
  return (
    <nav className={`hidden md:flex items-center gap-1 ${center ? 'mx-auto' : ''}`}>
      {HMENU.map(m => (
        <button key={m.page} onClick={() => go(m.page)} className="px-3 py-2 rounded-[8px] text-label-md text-on-surface-variant hover:text-on-surface hover:bg-primary/5 transition-colors flex items-center gap-1.5">
          <Icon name={m.icon} className="text-[18px]" />{m.label}
        </button>
      ))}
    </nav>
  )
}

function Actions() {
  const go = useNav()
  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <button className="p-2 rounded-full text-on-surface-variant hover:bg-primary/5 transition-colors" onClick={() => go('dashboard')} title="Back to app"><Icon name="logout" /></button>
      <span className="w-9 h-9 rounded-full bg-primary-container text-on-primary text-[12px] font-bold flex items-center justify-center ml-1">TA</span>
    </div>
  )
}

const barBase = 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10'

export function DashLayout({ variant }: { variant: Variant }) {
  const go = useNav()

  if (variant === 'dual-compact') {
    return (
      <div className="flex min-h-screen bg-background">
        <aside className="w-16 shrink-0 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col items-center py-4 gap-1 sticky top-0 h-screen">
          <span className="w-9 h-9 rounded-[10px] bg-primary text-on-primary font-black flex items-center justify-center mb-3">A</span>
          {HMENU.map(m => (
            <button key={m.page} onClick={() => go(m.page)} title={m.label} className="w-11 h-11 rounded-[12px] flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors">
              <Icon name={m.icon} />
            </button>
          ))}
          <button onClick={() => go('dashboard')} title="Back to app" className="mt-auto w-11 h-11 rounded-[12px] flex items-center justify-center text-on-surface-variant hover:bg-primary/5"><Icon name="logout" /></button>
        </aside>
        <div className="flex-1 min-w-0">
          <header className={`sticky top-0 z-40 ${barBase} h-14 flex items-center justify-between px-5`}>
            <h2 className="text-headline-sm font-bold text-on-surface">Dashboard · Compact</h2>
            <ThemeToggle />
          </header>
          <DashboardPage />
        </div>
      </div>
    )
  }

  if (variant === 'dual-horizontal') {
    return (
      <div className="min-h-screen bg-background">
        <header className={`sticky top-0 z-50 ${barBase} h-16 flex items-center justify-between px-6`}><Brand /><Actions /></header>
        <div className="sticky top-16 z-40 bg-surface-container-lowest border-b border-outline-variant/10 h-12 flex items-center px-6"><HMenu center /></div>
        <DashboardPage />
      </div>
    )
  }

  if (variant === 'boxed' || variant === 'boxed-fancy') {
    return (
      <div className="min-h-screen bg-surface-container-low/30">
        <header className={`sticky top-0 z-50 ${barBase} h-16 flex items-center justify-between px-6`}>
          <Brand /><HMenu /><Actions />
        </header>
        <div className="max-w-5xl mx-auto px-4 py-6">
          {variant === 'boxed-fancy' && (
            <div className="bg-primary text-on-primary rounded-[24px] p-8 mb-6 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div><p className="text-label-sm uppercase tracking-wider opacity-80">Welcome back</p><h2 className="text-display-lg font-bold mt-1">Good morning, Tathagata</h2></div>
                <div className="flex gap-6">
                  {[['Revenue', '$372K'], ['Users', '8,420'], ['Orders', '4,893']].map(([l, v]) => <div key={l}><p className="text-headline-sm font-bold tabular-nums">{v}</p><p className="text-label-sm opacity-80">{l}</p></div>)}
                </div>
              </div>
            </div>
          )}
          <div className="rounded-[24px] border border-outline-variant/15 bg-surface-container-lowest shadow-sm overflow-hidden">
            <DashboardPage />
          </div>
        </div>
      </div>
    )
  }

  // horizontal (default)
  return (
    <div className="min-h-screen bg-background">
      <header className={`sticky top-0 z-50 ${barBase} h-16 flex items-center gap-6 px-6`}>
        <Brand /><HMenu /><div className="ml-auto"><Actions /></div>
      </header>
      <DashboardPage />
    </div>
  )
}

export const HorizontalDash = () => <DashLayout variant="horizontal" />
export const DualHorizontalDash = () => <DashLayout variant="dual-horizontal" />
export const DualCompactDash = () => <DashLayout variant="dual-compact" />
export const BoxedDash = () => <DashLayout variant="boxed" />
export const BoxedFancyDash = () => <DashLayout variant="boxed-fancy" />
