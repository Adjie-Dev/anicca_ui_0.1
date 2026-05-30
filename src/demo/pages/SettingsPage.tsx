import { pageShell } from '../theme'
import { Crumbs } from '../ui/primitives'
import { SettingsBody } from './parts'

export function SettingsPage() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', 'Settings']} />
      <header>
        <h1 className="text-[32px] leading-tight text-on-surface font-bold tracking-tight">Enterprise Configuration</h1>
        <p className="text-body-base text-on-surface-variant mt-2">Manage environment protocols and personal security vectors.</p>
      </header>
      <SettingsBody />
    </div>
  )
}
