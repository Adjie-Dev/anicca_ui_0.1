import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AniccaAuthModalMode = 'signin' | 'signup' | 'recover'

/** Data passed to onSubmit; absent fields are undefined for the current mode. */
export interface AniccaAuthModalSubmitData {
  mode: AniccaAuthModalMode
  email: string
  /** Absent in recover mode. */
  password?: string
  /** Present only in signup mode. */
  name?: string
}

/** Override any user-facing string. Unset keys fall back to English defaults. */
export interface AniccaAuthModalLabels {
  signinTitle?: string
  signupTitle?: string
  recoverTitle?: string
  signinSubtitle?: string
  signupSubtitle?: string
  recoverSubtitle?: string
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  showPassword?: string
  hidePassword?: string
  forgotPassword?: string
  signinCta?: string
  signupCta?: string
  recoverCta?: string
  divider?: string
  toSignup?: string
  toSignin?: string
  toRecover?: string
  [key: string]: string | undefined
}

export interface AniccaAuthModalProps {
  /** Controls visibility. */
  open: boolean
  /** Called when modal should close (backdrop, Escape, ×). */
  onClose: () => void
  /** Active form mode. Defaults to 'signin'. */
  mode?: AniccaAuthModalMode
  /** Called when user clicks a mode-switch link. */
  onModeChange?: (mode: AniccaAuthModalMode) => void
  /** Called on form submit. May be async; spinner shown until resolved. */
  onSubmit: (data: AniccaAuthModalSubmitData) => void | Promise<void>
  /** Google OAuth callback. Button hidden when absent. */
  onGoogle?: () => void
  /** Facebook OAuth callback. Button hidden when absent. */
  onFacebook?: () => void
  /** Apple OAuth callback. Button hidden when absent. */
  onApple?: () => void
  /** Disables form and shows spinner. */
  loading?: boolean
  /** Error message shown in a red banner below the subtitle. */
  error?: string
  /** i18n string overrides. */
  labels?: AniccaAuthModalLabels
  /** Prevent Escape key from closing. */
  disableEscapeKey?: boolean
  /** Prevent backdrop click from closing. */
  disableBackdropClick?: boolean
  /** Extra className applied to the card element. */
  className?: string
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_LABELS: Required<AniccaAuthModalLabels> = {
  signinTitle: 'Sign in with email',
  signupTitle: 'Create an account',
  recoverTitle: 'Reset your password',
  signinSubtitle: 'Welcome back! Enter your credentials.',
  signupSubtitle: 'Start your journey today.',
  recoverSubtitle: "We'll send a reset link to your email.",
  nameLabel: 'Full Name',
  namePlaceholder: 'Jane Smith',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: '••••••••',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  forgotPassword: 'Forgot password?',
  signinCta: 'Get Started',
  signupCta: 'Create Account',
  recoverCta: 'Send Reset Link',
  divider: 'Or sign in with',
  toSignup: "Don't have an account? Sign up",
  toSignin: 'Already have an account? Sign in',
  toRecover: '← Return to sign in',
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function LockIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function AlertCircleIcon() {
  return (
    <svg aria-hidden="true" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" width={17} height={17} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// ─── Private sub-components ───────────────────────────────────────────────────

interface AuthFieldProps {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  autoComplete?: string
  disabled?: boolean
}

function AuthField({ label, type, value, onChange, placeholder, leftAddon, rightAddon, autoComplete, disabled }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-label-sm font-semibold text-on-surface">{label}</label>
      <div className={`flex items-center gap-2 h-11 px-3.5 rounded-[10px] border border-outline-variant bg-surface-container-low transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 dark:bg-surface-container dark:border-outline-variant dark:focus-within:border-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {leftAddon && (
          <span className="text-on-surface-variant shrink-0 inline-flex items-center">{leftAddon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent outline-none border-none text-body-sm text-on-surface placeholder:text-on-surface-variant/50 font-[inherit] disabled:cursor-not-allowed"
        />
        {rightAddon && (
          <span className="text-on-surface-variant shrink-0 inline-flex items-center">{rightAddon}</span>
        )}
      </div>
    </div>
  )
}

interface SocialButtonProps {
  onClick: () => void
  'aria-label': string
  children: React.ReactNode
}

function SocialButton({ onClick, 'aria-label': ariaLabel, children }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-11 h-11 rounded-full border border-outline-variant bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container-low hover:border-outline transition-colors dark:bg-surface-container dark:border-outline-variant dark:hover:bg-surface-container-high"
    >
      {children}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * AniccaAuthModal — Centered authentication dialog with sign-in, sign-up, and
 * password-recovery modes. Includes email/password fields, optional social OAuth
 * buttons, error banner, loading state, i18n labels, Escape key + backdrop-click
 * close, and body scroll lock.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false)
 * const [mode, setMode] = useState<AniccaAuthModalMode>('signin')
 *
 * <AniccaAuthModal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   mode={mode}
 *   onModeChange={setMode}
 *   onSubmit={async ({ email, password }) => { await signIn(email, password!) }}
 *   onGoogle={() => signInWithGoogle()}
 *   loading={isLoading}
 *   error={authError}
 * />
 * ```
 */
export function AniccaAuthModal({
  open,
  onClose,
  mode,
  onModeChange,
  onSubmit,
  onGoogle,
  onFacebook,
  onApple,
  loading = false,
  error,
  labels,
  disableEscapeKey = false,
  disableBackdropClick = false,
  className = '',
}: AniccaAuthModalProps): React.ReactElement | null {
  const t = { ...DEFAULT_LABELS, ...labels }
  const effectiveMode: AniccaAuthModalMode = mode ?? 'signin'
  const hasSocial = Boolean(onGoogle || onFacebook || onApple)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const isDisabled = loading || submitting

  useEffect(() => {
    if (!open || disableEscapeKey) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [open, onClose, disableEscapeKey])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  const title = { signin: t.signinTitle, signup: t.signupTitle, recover: t.recoverTitle }[effectiveMode]
  const subtitle = { signin: t.signinSubtitle, signup: t.signupSubtitle, recover: t.recoverSubtitle }[effectiveMode]
  const ctaLabel = { signin: t.signinCta, signup: t.signupCta, recover: t.recoverCta }[effectiveMode]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isDisabled) return
    setSubmitting(true)
    try {
      const data: AniccaAuthModalSubmitData = {
        mode: effectiveMode,
        email,
        ...(effectiveMode !== 'recover' && { password }),
        ...(effectiveMode === 'signup' && { name }),
      }
      await onSubmit(data)
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 backdrop-blur-[4px] flex items-center justify-center z-[1200] anicca-fade-in p-4"
      style={{ background: 'rgba(15,23,42,0.6)' } as React.CSSProperties}
      onClick={disableBackdropClick ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="anicca-auth-modal-title"
    >
      <div
        className={`bg-surface-container-lowest rounded-[24px] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] w-full max-w-[400px] anicca-slide-up shadow-[0_24px_70px_-20px_rgba(11,28,48,0.35),0_8px_24px_-12px_rgb(var(--primary)/0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-2 px-8">
          <div className="w-12 h-12 rounded-[14px] bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <LockIcon size={22} />
          </div>
          <h2
            id="anicca-auth-modal-title"
            className="text-headline-md text-on-surface text-center m-0"
          >
            {title}
          </h2>
          <p className="text-body-sm text-on-surface-variant text-center mt-1 mb-0">{subtitle}</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-8 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-[10px] bg-error/[0.08] border border-error/20 text-error text-body-sm">
            <span className="shrink-0"><AlertCircleIcon /></span>
            {error}
          </div>
        )}

        {/* Form */}
        <form className="px-8 pt-5 pb-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {effectiveMode === 'signup' && (
            <AuthField
              label={t.nameLabel}
              type="text"
              value={name}
              onChange={setName}
              placeholder={t.namePlaceholder}
              leftAddon={<PersonIcon />}
              autoComplete="name"
              disabled={isDisabled}
            />
          )}

          <AuthField
            label={t.emailLabel}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder={t.emailPlaceholder}
            leftAddon={<MailIcon />}
            autoComplete="email"
            disabled={isDisabled}
          />

          {effectiveMode !== 'recover' && (
            <AuthField
              label={t.passwordLabel}
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder={t.passwordPlaceholder}
              leftAddon={<LockIcon size={16} />}
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? t.hidePassword : t.showPassword}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
              autoComplete={effectiveMode === 'signin' ? 'current-password' : 'new-password'}
              disabled={isDisabled}
            />
          )}

          {effectiveMode === 'signin' && (
            <div className="flex justify-end -mt-2">
              <button
                type="button"
                className="text-label-sm text-primary hover:underline underline-offset-4 transition-colors font-[inherit] cursor-pointer"
                onClick={() => onModeChange?.('recover')}
              >
                {t.forgotPassword}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className="relative w-full h-11 rounded-[12px] font-semibold text-label-md tracking-tight hover:opacity-90 active:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1 font-[inherit] cursor-pointer"
            style={{ background: 'rgb(var(--on-surface))', color: 'rgb(var(--surface-container-lowest))' } as React.CSSProperties}
          >
            {isDisabled && (
              <span className="absolute inset-0 flex items-center justify-center">
                <SpinnerIcon />
              </span>
            )}
            <span className={isDisabled ? 'opacity-0' : ''}>{ctaLabel}</span>
          </button>
        </form>

        {/* Social login */}
        {effectiveMode !== 'recover' && hasSocial && (
          <div className="px-8 pb-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-outline-variant" />
              <span className="text-label-sm text-on-surface-variant whitespace-nowrap">{t.divider}</span>
              <div className="flex-1 h-px bg-outline-variant" />
            </div>
            <div className="flex items-center justify-center gap-3">
              {onGoogle && (
                <SocialButton onClick={onGoogle} aria-label="Sign in with Google">
                  <GoogleIcon />
                </SocialButton>
              )}
              {onFacebook && (
                <SocialButton onClick={onFacebook} aria-label="Sign in with Facebook">
                  <FacebookIcon />
                </SocialButton>
              )}
              {onApple && (
                <SocialButton onClick={onApple} aria-label="Sign in with Apple">
                  <AppleIcon />
                </SocialButton>
              )}
            </div>
          </div>
        )}

        {/* Mode switch footer */}
        <div className="text-center pb-6 px-8 text-body-sm text-on-surface-variant">
          {effectiveMode === 'signin' && (
            <button
              type="button"
              className="text-primary hover:underline underline-offset-4 font-[inherit] cursor-pointer"
              onClick={() => onModeChange?.('signup')}
            >
              {t.toSignup}
            </button>
          )}
          {effectiveMode === 'signup' && (
            <button
              type="button"
              className="text-primary hover:underline underline-offset-4 font-[inherit] cursor-pointer"
              onClick={() => onModeChange?.('signin')}
            >
              {t.toSignin}
            </button>
          )}
          {effectiveMode === 'recover' && (
            <button
              type="button"
              className="text-primary hover:underline underline-offset-4 font-[inherit] cursor-pointer"
              onClick={() => onModeChange?.('signin')}
            >
              {t.toRecover}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
