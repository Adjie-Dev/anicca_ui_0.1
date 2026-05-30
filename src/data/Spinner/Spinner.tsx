import React from 'react'

export type AniccaSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

export interface AniccaSpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AniccaSpinnerSize
  /** Stroke thickness. */
  thickness?: number
  /** Override color (CSS). Default uses currentColor (inherits text color). */
  color?: string
  /** Accessible label. */
  label?: string
}

const SIZES: Record<Exclude<AniccaSpinnerSize, number>, number> = {
  xs: 12, sm: 16, md: 24, lg: 32, xl: 48,
}

/**
 * AniccaSpinner — Animated loading indicator. Inherits text color by default.
 */
export function AniccaSpinner({
  size = 'md', thickness = 2.5, color, label = 'Loading',
  className = '', style, ...rest
}: AniccaSpinnerProps): React.ReactElement {
  const dim = typeof size === 'number' ? size : SIZES[size]
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center text-primary ${className}`}
      style={{ color, ...style }}
      {...rest}
    >
      <svg className="animate-spin" width={dim} height={dim} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={thickness} opacity="0.2" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth={thickness} strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
