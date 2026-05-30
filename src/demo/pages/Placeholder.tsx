import { card, pageShell } from '../theme'
import { Crumbs, Icon } from '../ui/primitives'

/** Temporary page for routes not yet built out. */
export function Placeholder({ title }: { title: string }) {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', title]} />
      <div className={`${card} p-12 flex flex-col items-center text-center`}>
        <span className="w-14 h-14 rounded-[16px] bg-primary/10 text-primary flex items-center justify-center">
          <Icon name="construction" className="text-[28px]" />
        </span>
        <h1 className="text-headline-md font-bold text-on-surface mt-4 tracking-tight">{title}</h1>
        <p className="text-body-base text-on-surface-variant mt-1 max-w-md">
          Halaman ini sedang dibangun dengan komponen Anicca dan tema yang sama.
        </p>
      </div>
    </div>
  )
}
