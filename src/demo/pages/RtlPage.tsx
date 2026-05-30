import { useState } from 'react'
import { btnGhost, btnPrimary, card, pageShell } from '../theme'
import { Crumbs, Icon, Segmented } from '../ui/primitives'

export function RtlPage() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr')
  return (
    <div className={pageShell}>
      <Crumbs trail={['Special', 'RTL Support']} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">RTL Support</h1><p className="text-body-base text-on-surface-variant">Toggle direction to preview right-to-left layout.</p></div>
        <Segmented options={['ltr', 'rtl']} value={dir} onChange={v => setDir(v as 'ltr' | 'rtl')} />
      </div>

      <section dir={dir} className={`${card} p-6 space-y-5`}>
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-[14px] bg-primary/10 text-primary flex items-center justify-center"><Icon name="translate" className="text-[22px]" /></span>
          <div><h4 className="text-headline-sm font-bold text-on-surface">Sample Card</h4><p className="text-body-sm text-on-surface-variant">Mengikuti arah <b>{dir.toUpperCase()}</b>.</p></div>
        </div>
        <p className="text-body-base text-on-surface-variant leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex gap-3">
          <button className={btnPrimary}><Icon name="check" className="text-[18px]" />Primary</button>
          <button className={btnGhost}>Secondary</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Inbox', 'Sent', 'Drafts'].map(l => (
            <div key={l} className="flex items-center gap-2 p-3 rounded-[12px] border border-outline-variant/15">
              <Icon name="mail" className="text-on-surface-variant" /><span className="text-body-sm text-on-surface">{l}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
