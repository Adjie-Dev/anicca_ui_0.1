import React, { forwardRef } from 'react'

export type AniccaButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'link'
export type AniccaButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface AniccaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AniccaButtonVariant
  size?: AniccaButtonSize
  /** Show loading spinner and disable interaction. */
  loading?: boolean
  /** Icon rendered before children. */
  leftIcon?: React.ReactNode
  /** Icon rendered after children. */
  rightIcon?: React.ReactNode
  /** Make button stretch full width. */
  fullWidth?: boolean
}

const VARIANTS: Record<AniccaButtonVariant, string> = {
  primary:
    'bg-primary text-primary-fg border border-primary hover:opacity-90 active:opacity-100 dark:bg-primary dark:text-primary-fg dark:border-primary',
  secondary:
    'bg-surface-muted text-text border border-border hover:bg-surface-low dark:bg-surface-container dark:text-text dark:border-border dark:hover:bg-surface-container',
  outline:
    'bg-transparent text-text border border-border hover:bg-surface-muted dark:text-text dark:border-border dark:hover:bg-surface-container',
  ghost:
    'bg-transparent text-text border border-transparent hover:bg-surface-muted dark:text-text dark:hover:bg-surface-container',
  danger:
    'bg-danger text-white border border-danger hover:opacity-90 dark:bg-danger dark:text-white dark:border-danger',
  link:
    'bg-transparent text-primary border border-transparent underline-offset-4 hover:underline px-0 dark:text-primary',
}

const SIZES: Record<AniccaButtonSize, string> = {
  sm: 'h-8 px-3 text-[0.78rem] gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-[0.875rem] gap-2 rounded-lg',
  lg: 'h-12 px-6 text-[0.95rem] gap-2 rounded-a',
  icon: 'h-10 w-10 p-0 rounded-lg',
}

/**
 * AniccaButton — Polymorphic button with variants, sizes, loading state, and icon slots.
 */
export const AniccaButton = forwardRef<HTMLButtonElement, AniccaButtonProps>(function AniccaButton(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth,
    className = '',
    disabled,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      data-loading={loading || undefined}
      className={`relative inline-flex items-center justify-center font-semibold tracking-tight transition-[background,color,opacity,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-[var(--anicca-ring-width)] focus-visible:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed font-[inherit] ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}
      <span className={`inline-flex items-center gap-[inherit] ${loading ? 'opacity-0' : ''}`}>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </span>
    </button>
  )
})
