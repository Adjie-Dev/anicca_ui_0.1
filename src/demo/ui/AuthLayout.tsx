import { type ReactNode } from 'react'
import { useNav } from '../nav'
import { Icon } from './primitives'

/** Full-screen split layout for authentication pages. */
export function AuthLayout({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  const go = useNav()
  return (
    <div className="min-h-screen flex bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] p-12 bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[60px]" />
        <div className="relative z-10">
          <h1 className="text-headline-md font-black tracking-tight">Anicca</h1>
          <p className="text-label-sm opacity-80 uppercase tracking-[0.2em]">Code Studio</p>
        </div>
        <div className="relative z-10">
          <p className="text-display-lg font-bold leading-tight">Build dashboards your users love.</p>
          <p className="text-body-base opacity-80 mt-3 max-w-sm">A complete component library and admin kit, crafted with care.</p>
        </div>
        <p className="relative z-10 text-label-sm opacity-70">© 2026 Anicca · v0.1.0</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <button onClick={() => go('dashboard')} className="inline-flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-primary transition-colors">
            <Icon name="arrow_back" className="text-[18px]" />Back to app
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-6"><h1 className="text-headline-sm font-black text-primary">Anicca</h1></div>
            <h2 className="text-headline-md font-bold text-on-surface tracking-tight">{title}</h2>
            <p className="text-body-base text-on-surface-variant mt-1 mb-6">{subtitle}</p>
            {children}
            {footer && <div className="mt-6 text-center text-body-sm text-on-surface-variant">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
