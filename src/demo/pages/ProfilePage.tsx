import { btnPrimary, card, pageShell } from '../theme'
import { profileFields } from '../data'
import { useActions } from '../ui/Modal'
import { Crumbs, Field, Icon } from '../ui/primitives'

export function ProfilePage() {
  const { notify } = useActions()
  return (
    <div className={pageShell}>
      <Crumbs trail={['Home', 'Profile']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">My Profile</h1>
        <p className="text-body-base text-on-surface-variant">Your personal details and account information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className={`lg:col-span-2 ${card} p-6`}>
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-[18px] bg-primary-container flex items-center justify-center text-on-primary text-xl font-bold relative">
              JA
              <button className="absolute -bottom-1 -right-1 bg-primary text-on-primary p-1.5 rounded-[10px] border-2 border-white" onClick={() => notify('Avatar upload…')}><Icon name="edit" className="text-[14px]" /></button>
            </div>
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-headline-sm font-bold text-on-surface">Tathagata</h3>
              <p className="text-body-sm text-on-surface-variant">Senior Systems Architect · Anicca Fluid Systems</p>
            </div>
            <button className={btnPrimary} onClick={() => notify('Profile saved', 'success')}>Save profile</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileFields.map(([label, value]) => <Field key={label} label={label} value={value} />)}
          </div>
        </div>

        <div className="bg-primary text-on-primary p-6 rounded-[20px] shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-[60px]" />
          <div className="z-10"><h4 className="text-headline-sm font-bold">System Health</h4><p className="text-body-sm opacity-80 mt-1">All protocols operational</p></div>
          <div className="z-10 mt-8 space-y-3">
            <div className="flex justify-between text-label-sm"><span>Last Backup</span><span className="font-bold tabular-nums">2h ago</span></div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-white rounded-full" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
