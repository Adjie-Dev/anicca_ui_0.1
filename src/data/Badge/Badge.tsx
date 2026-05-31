import React from 'react'

export type AniccaBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AniccaBadgeSize = 'sm' | 'md'

export interface AniccaBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: AniccaBadgeVariant
  size?: AniccaBadgeSize
  /** Render as filled (solid) or outlined. */
  appearance?: 'soft' | 'solid' | 'outlined'
  /** Show colored dot before content. */
  dot?: boolean
}

const VARIANT_SOFT: Record<AniccaBadgeVariant, string> = {
  neutral: 'bg-surface-muted text-text-muted',
  primary: 'bg-secondary-container text-primary',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  info: 'bg-info-bg text-info',
}

const VARIANT_SOLID: Record<AniccaBadgeVariant, string> = {
  neutral: 'bg-text text-surface',
  primary: 'bg-primary text-primary-fg',
  success: 'bg-success text-primary-fg',
  warning: 'bg-warning text-primary-fg',
  danger: 'bg-danger text-primary-fg',
  info: 'bg-info text-primary-fg',
}

const VARIANT_OUTLINED: Record<AniccaBadgeVariant, string> = {
  neutral: 'border border-border text-text-muted',
  primary: 'border border-primary text-primary',
  success: 'border border-success text-success',
  warning: 'border border-warning text-warning',
  danger: 'border border-danger text-danger',
  info: 'border border-info text-info',
}

const VARIANT_DOT: Record<AniccaBadgeVariant, string> = {
  neutral: 'bg-text-muted',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
}

const SIZES: Record<AniccaBadgeSize, string> = {
  sm: 'h-5 px-2 text-[0.65rem]',
  md: 'h-6 px-2.5 text-[0.72rem]',
}

/**
 * AniccaBadge — Compact status/label chip with semantic variants.
 */
export function AniccaBadge({
  variant = 'neutral', size = 'md', appearance = 'soft', dot,
  className = '', children, ...rest
}: AniccaBadgeProps): React.ReactElement {
  const variantClass =
    appearance === 'solid' ? VARIANT_SOLID[variant] :
    appearance === 'outlined' ? VARIANT_OUTLINED[variant] :
    VARIANT_SOFT[variant]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap leading-none tracking-tight ${SIZES[size]} ${variantClass} ${className}`}
      {...rest}
    >
      {dot && <span className={`inline-block w-1.5 h-1.5 rounded-full ${VARIANT_DOT[variant]}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
