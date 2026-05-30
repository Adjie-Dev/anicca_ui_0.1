import { AniccaActivityFeed } from '../../dashboard'
import { btnGhost, btnPrimary, card, pageShell } from '../theme'
import { members, profileFields, teamActivity, type ActivityTone } from '../data'
import { useActions } from '../ui/Modal'
import { Badge, Crumbs, Icon } from '../ui/primitives'
import { Checkbox, FileDrop, Select, SwitchField, TextInput } from '../ui/form'
import { MembersTable } from './parts'

const ACT_COLOR: Record<ActivityTone, string> = { success: 'text-tertiary', warn: 'text-amber-600', info: 'text-primary', neutral: 'text-on-surface-variant' }
const ACT_BG: Record<ActivityTone, string> = { success: 'rgba(16,185,129,.14)', warn: 'rgba(217,119,6,.14)', info: 'rgba(70,72,212,.14)', neutral: 'rgba(100,116,139,.14)' }
const feed = teamActivity.map(a => ({ icon: <Icon name={a.icon} className={ACT_COLOR[a.tone]} />, iconBg: ACT_BG[a.tone], message: <span><b className="font-bold text-on-surface">{a.name}</b> {a.action}</span>, time: a.time }))

export function UserListPage() {
  const { form } = useActions()
  return (
    <div className={pageShell}>
      <Crumbs trail={['Users', 'User List']} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Users</h1><p className="text-body-base text-on-surface-variant">{members.length} members in your organization.</p></div>
        <button className={btnPrimary} onClick={() => form('Add User', ['Full name', 'Email', 'Role'])}><Icon name="person_add" />Add User</button>
      </div>
      <MembersTable rows={members} />
    </div>
  )
}

export function UserAddPage() {
  const { notify } = useActions()
  return (
    <div className={pageShell}>
      <Crumbs trail={['Users', 'Add User']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Add New User</h1><p className="text-body-base text-on-surface-variant">Create a new team member account.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Avatar</h4>
          <FileDrop label="Profile photo" />
        </section>
        <section className={`${card} lg:col-span-2 p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Account details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="First name" placeholder="Jane" />
            <TextInput label="Last name" placeholder="Doe" />
            <TextInput label="Email" icon="mail" type="email" placeholder="jane@company.io" />
            <TextInput label="Phone" icon="call" placeholder="+62…" />
            <Select label="Role" options={['Developer', 'Designer', 'Manager', 'Admin']} />
            <Select label="Department" options={['Engineering', 'Product', 'Design', 'Ops']} />
            <TextInput label="Password" icon="lock" type="password" />
            <TextInput label="Confirm password" icon="lock" type="password" />
          </div>
          <div className="mt-4"><Checkbox label="Send welcome email" /></div>
          <div className="flex justify-end gap-3 mt-6">
            <button className={btnGhost} onClick={() => notify('Cancelled')}>Cancel</button>
            <button className={btnPrimary} onClick={() => notify('User created', 'success')}>Create user</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export function UserProfilePage() {
  const { notify } = useActions()
  const stats = [['Projects', '24'], ['Tasks', '182'], ['Followers', '2.4K']]
  return (
    <div className={pageShell}>
      <Crumbs trail={['Users', 'User Profile']} />
      <section className={`${card} overflow-hidden`}>
        <div className="h-32 bg-gradient-to-r from-primary to-primary-container" />
        <div className="px-6 pb-6 -mt-10 flex flex-wrap items-end gap-4">
          <span className="w-24 h-24 rounded-[20px] bg-primary-container text-on-primary text-3xl font-bold flex items-center justify-center border-4 border-white shadow-lg">TA</span>
          <div className="flex-1 min-w-[180px]">
            <h1 className="text-headline-md font-bold text-on-surface">Tathagata</h1>
            <p className="text-body-sm text-on-surface-variant">Senior Systems Architect · Anicca Fluid Systems</p>
          </div>
          <div className="flex gap-3">
            <button className={btnGhost} onClick={() => notify('Message sent')}><Icon name="mail" className="text-[18px]" />Message</button>
            <button className={btnPrimary} onClick={() => notify('Following', 'success')}>Follow</button>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-outline-variant/15">
          {stats.map(([l, v]) => <div key={l} className="py-4 text-center border-r last:border-r-0 border-outline-variant/15"><p className="text-headline-sm font-bold text-on-surface tabular-nums">{v}</p><p className="text-[11px] text-outline uppercase tracking-wider">{l}</p></div>)}
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">About</h4>
          <div className="space-y-3">
            {profileFields.map(([l, v]) => <div key={l} className="flex justify-between gap-3 text-body-sm"><span className="text-on-surface-variant">{l}</span><span className="font-medium text-on-surface text-right">{v}</span></div>)}
            <div className="flex justify-between gap-3 text-body-sm"><span className="text-on-surface-variant">Status</span><Badge tone="success">Active</Badge></div>
          </div>
        </section>
        <div className="lg:col-span-2"><AniccaActivityFeed title="Recent Activity" items={feed} /></div>
      </div>
    </div>
  )
}

export function UserAccountPage() {
  const { notify } = useActions()
  return (
    <div className={pageShell}>
      <Crumbs trail={['Users', 'Account Setting']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Account Settings</h1><p className="text-body-base text-on-surface-variant">Update your account information and password.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Profile information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="Full name" defaultValue="Tathagata" />
            <TextInput label="Email" icon="mail" defaultValue="j.aris@anicca.systems" />
            <TextInput label="Job title" defaultValue="Senior Systems Architect" />
            <TextInput label="Phone" icon="call" defaultValue="+49 171 000 0000" />
          </div>
          <button className={`${btnPrimary} mt-5`} onClick={() => notify('Profile updated', 'success')}>Save changes</button>
        </section>
        <section className={`${card} p-6`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">Change password</h4>
          <div className="space-y-4">
            <TextInput label="Current password" icon="lock" type="password" />
            <TextInput label="New password" icon="lock" type="password" hint="Min. 8 characters" />
            <TextInput label="Confirm new password" icon="lock" type="password" />
          </div>
          <button className={`${btnPrimary} mt-5`} onClick={() => notify('Password changed', 'success')}>Update password</button>
        </section>
      </div>
    </div>
  )
}

export function UserPrivacyPage() {
  const { confirm, notify } = useActions()
  const opts = ['Public profile', 'Show activity status', 'Allow data sharing', 'Two-factor authentication', 'Login alerts', 'Personalised ads']
  return (
    <div className={pageShell}>
      <Crumbs trail={['Users', 'Privacy Setting']} />
      <div><h1 className="text-[28px] font-bold text-on-surface tracking-tight">Privacy & Security</h1><p className="text-body-base text-on-surface-variant">Control what you share and how your account is secured.</p></div>
      <section className={`${card} p-6 space-y-4 max-w-2xl`}>
        <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">Preferences</h4>
        {opts.map(o => <div key={o} className="py-1"><SwitchField label={o} /></div>)}
      </section>
      <section className="rounded-[20px] border border-error/30 bg-error/5 p-6 max-w-2xl">
        <h4 className="text-headline-sm font-bold text-error tracking-tight">Danger Zone</h4>
        <p className="text-body-sm text-on-surface-variant mt-1">Permanently delete your account and all data.</p>
        <button className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-error text-on-error text-label-md font-bold hover:brightness-110 transition" onClick={() => confirm('Delete account?', 'This action cannot be undone.', () => notify('Account deleted', 'error'))}>
          <Icon name="delete" className="text-[18px]" />Delete account
        </button>
      </section>
    </div>
  )
}
