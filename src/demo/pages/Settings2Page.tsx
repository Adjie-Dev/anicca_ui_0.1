import { pageShell } from '../theme'
import { Crumbs } from '../ui/primitives'
import { SettingsBody } from './parts'

export function Settings2Page() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', 'Settings', 'Settings v2']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Settings</h1>
        <p className="text-body-base text-on-surface-variant">Manage your enterprise environment and personal preferences.</p>
      </div>
      <SettingsBody />
    </div>
  )
}
