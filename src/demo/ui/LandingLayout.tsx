import { useState, type ReactNode } from 'react'
import { btnGhost, btnPrimary, type Page } from '../theme'
import { useNav } from '../nav'
import { Icon } from './primitives'

const LINKS: { label: string; page: Page }[] = [
  { label: 'Home', page: 'landing-home' },
  { label: 'Features', page: 'landing-feature' },
  { label: 'Pricing', page: 'landing-pricing' },
  { label: 'Blog', page: 'landing-blog' },
  { label: 'About', page: 'landing-about' },
  { label: 'FAQ', page: 'landing-faq' },
  { label: 'Contact', page: 'landing-contact' },
]

export function LandingLayout({ active, children }: { active: Page; children: ReactNode }) {
  const go = useNav()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => go('landing-home')} className="text-headline-sm font-black text-primary tracking-tight">Anicca</button>
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(l => (
              <button key={l.page} onClick={() => go(l.page)} className={`px-3 py-2 rounded-[8px] text-label-md transition-colors ${active === l.page ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-primary/5'}`}>{l.label}</button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <button className={btnGhost} onClick={() => go('sign-in')}>Sign in</button>
            <button className={btnPrimary} onClick={() => go('sign-up')}>Get started</button>
          </div>
          <button className="md:hidden p-2 text-on-surface" onClick={() => setOpen(o => !o)}><Icon name={open ? 'close' : 'menu'} /></button>
        </div>
        {open && (
          <div className="md:hidden border-t border-outline-variant/10 px-6 py-3 flex flex-col gap-1">
            {LINKS.map(l => <button key={l.page} onClick={() => { setOpen(false); go(l.page) }} className="text-left px-3 py-2 rounded-[8px] text-label-md text-on-surface hover:bg-primary/5">{l.label}</button>)}
            <button className={`${btnPrimary} justify-center mt-2`} onClick={() => go('sign-up')}>Get started</button>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-outline-variant/10 bg-surface-container-low/40">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="text-headline-sm font-black text-primary">Anicca</p>
            <p className="text-body-sm text-on-surface-variant mt-2 max-w-[200px]">The open-source admin & component library.</p>
          </div>
          {[['Product', ['Features', 'Pricing', 'Changelog']], ['Company', ['About', 'Blog', 'Careers']], ['Legal', ['Privacy', 'Terms', 'Security']]].map(([h, items]) => (
            <div key={h as string}>
              <p className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3">{h}</p>
              <ul className="space-y-2">{(items as string[]).map(i => <li key={i}><button onClick={() => go('landing-home')} className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">{i}</button></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-outline-variant/10 py-5 text-center">
          <button onClick={() => go('dashboard')} className="text-label-sm text-on-surface-variant hover:text-primary">← Back to app</button>
          <p className="text-[12px] text-outline mt-1">© 2026 Anicca · v0.1.0</p>
        </div>
      </footer>
    </div>
  )
}
