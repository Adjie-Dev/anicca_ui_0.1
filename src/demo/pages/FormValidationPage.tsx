import { useState } from 'react'
import { btnPrimary, card, pageShell } from '../theme'
import { useActions } from '../ui/Modal'
import { Crumbs, Icon } from '../ui/primitives'
import { TextInput } from '../ui/form'

const fieldBase = 'w-full bg-surface-container-low border rounded-[10px] px-3.5 py-2.5 text-body-base text-on-surface outline-none transition focus:ring-2 focus:ring-primary/20'

export function FormValidationPage() {
  const { notify } = useActions()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [touched, setTouched] = useState(false)

  const emailErr = !email ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email' : ''
  const pwErr = !pw ? 'Password is required' : pw.length < 8 ? 'Min. 8 characters' : ''

  const submit = () => {
    setTouched(true)
    if (!emailErr && !pwErr) notify('Form is valid', 'success')
    else notify('Please fix the errors', 'error')
  }

  const ctrl = (val: string, err: string) =>
    `${fieldBase} ${touched && err ? 'border-error focus:ring-error/20' : touched && !err && val ? 'border-tertiary focus:ring-tertiary/20' : 'border-outline-variant/40 focus:border-primary'}`

  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Form Validation']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Form Validation</h1>
        <p className="text-body-base text-on-surface-variant">Inline validation with live error and success states.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <section className={`${card} p-6 space-y-4`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">Live validation</h4>
          <label className="block space-y-1.5">
            <span className="text-label-sm font-medium text-on-surface-variant">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(true)} placeholder="jane@company.io" className={ctrl(email, emailErr)} />
            {touched && emailErr && <span className="text-[12px] text-error flex items-center gap-1"><Icon name="error" className="text-[14px]" />{emailErr}</span>}
            {touched && !emailErr && email && <span className="text-[12px] text-tertiary flex items-center gap-1"><Icon name="check_circle" className="text-[14px]" />Looks good</span>}
          </label>
          <label className="block space-y-1.5">
            <span className="text-label-sm font-medium text-on-surface-variant">Password</span>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} onBlur={() => setTouched(true)} placeholder="••••••••" className={ctrl(pw, pwErr)} />
            {touched && pwErr && <span className="text-[12px] text-error flex items-center gap-1"><Icon name="error" className="text-[14px]" />{pwErr}</span>}
          </label>
          <button className={btnPrimary} onClick={submit}>Validate</button>
        </section>

        <section className={`${card} p-6 space-y-4`}>
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">States</h4>
          <TextInput label="Default" placeholder="Type here" />
          <TextInput label="With error" defaultValue="not-an-email" error="Enter a valid email" />
          <TextInput label="With hint" icon="lock" type="password" hint="Use a strong password" />
        </section>
      </div>
    </div>
  )
}
