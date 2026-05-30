import { btnPrimary } from '../theme'
import { useNav } from '../nav'
import { useToast } from '../ui/Toast'
import { Checkbox, TextInput } from '../ui/form'
import { Icon } from '../ui/primitives'
import { AuthLayout } from '../ui/AuthLayout'

const submitBtn = `${btnPrimary} w-full justify-center`
const link = 'text-primary font-bold hover:underline'

export function SignInPage() {
  const go = useNav(); const notify = useToast()
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue."
      footer={<>No account? <button className={link} onClick={() => go('sign-up')}>Sign up</button></>}>
      <div className="space-y-4">
        <TextInput label="Email" icon="mail" type="email" placeholder="jane@company.io" />
        <TextInput label="Password" icon="lock" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <button className={link} onClick={() => go('recover')}>Forgot password?</button>
        </div>
        <button className={submitBtn} onClick={() => { notify('Signed in', 'success'); go('dashboard') }}>Sign in</button>
      </div>
    </AuthLayout>
  )
}

export function SignUpPage() {
  const go = useNav(); const notify = useToast()
  return (
    <AuthLayout title="Create account" subtitle="Start your 14-day free trial."
      footer={<>Already have an account? <button className={link} onClick={() => go('sign-in')}>Sign in</button></>}>
      <div className="space-y-4">
        <TextInput label="Full name" icon="person" placeholder="Jane Doe" />
        <TextInput label="Email" icon="mail" type="email" placeholder="jane@company.io" />
        <TextInput label="Password" icon="lock" type="password" hint="Min. 8 characters" />
        <Checkbox label="I agree to the Terms & Privacy Policy" />
        <button className={submitBtn} onClick={() => { notify('Account created', 'success'); go('dashboard') }}>Create account</button>
      </div>
    </AuthLayout>
  )
}

export function RecoverPage() {
  const go = useNav(); const notify = useToast()
  return (
    <AuthLayout title="Reset password" subtitle="We'll email you a reset link."
      footer={<>Remembered it? <button className={link} onClick={() => go('sign-in')}>Sign in</button></>}>
      <div className="space-y-4">
        <TextInput label="Email" icon="mail" type="email" placeholder="jane@company.io" />
        <button className={submitBtn} onClick={() => { notify('Reset link sent', 'success'); go('confirm-mail') }}>Send reset link</button>
      </div>
    </AuthLayout>
  )
}

export function ConfirmMailPage() {
  const go = useNav(); const notify = useToast()
  return (
    <AuthLayout title="Check your inbox" subtitle="We sent a verification link to your email.">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Icon name="mark_email_read" className="text-[32px]" /></span>
        <p className="text-body-base text-on-surface-variant">Didn't get it? Check spam or resend below.</p>
        <button className={submitBtn} onClick={() => notify('Email resent', 'success')}>Resend email</button>
        <button className={link} onClick={() => go('sign-in')}>Back to sign in</button>
      </div>
    </AuthLayout>
  )
}

export function LockScreenPage() {
  const go = useNav(); const notify = useToast()
  return (
    <AuthLayout title="Locked" subtitle="Enter your password to unlock.">
      <div className="flex flex-col items-center gap-4">
        <span className="w-20 h-20 rounded-full bg-primary-container text-on-primary text-2xl font-bold flex items-center justify-center">TA</span>
        <p className="text-label-md font-bold text-on-surface">Tathagata</p>
        <div className="w-full space-y-4">
          <TextInput label="Password" icon="lock" type="password" placeholder="••••••••" />
          <button className={submitBtn} onClick={() => { notify('Unlocked', 'success'); go('dashboard') }}>Unlock</button>
        </div>
        <button className={link} onClick={() => go('sign-in')}>Sign in as different user</button>
      </div>
    </AuthLayout>
  )
}
