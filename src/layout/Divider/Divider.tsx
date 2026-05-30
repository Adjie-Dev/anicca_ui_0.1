import React from 'react'

export interface AniccaDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  /** Optional label rendered in the middle (horizontal only). */
  label?: React.ReactNode
  /** Visual style. */
  variant?: 'solid' | 'dashed' | 'dotted'
  /** Custom thickness (px). Default 1. */
  thickness?: number
}

/**
 * AniccaDivider — Visual separator. Horizontal with optional label or vertical.
 */
export function AniccaDivider({
  orientation = 'horizontal', label, variant = 'solid', thickness = 1,
  className = '', style, ...rest
}: AniccaDividerProps): React.ReactElement {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`self-stretch ${className}`}
        style={{
          borderLeftWidth: thickness,
          borderLeftStyle: variant,
          borderColor: 'rgb(var(--anicca-border))',
          ...style,
        }}
        {...rest}
      />
    )
  }
  if (label) {
    return (
      <div role="separator" aria-orientation="horizontal" className={`flex items-center gap-3 ${className}`} {...rest}>
        <span className="flex-1" style={{ borderTopWidth: thickness, borderTopStyle: variant, borderColor: 'rgb(var(--anicca-border))' }} />
        <span className="text-[0.72rem] uppercase tracking-[0.08em] text-text-muted font-semibold dark:text-text-subtle">{label}</span>
        <span className="flex-1" style={{ borderTopWidth: thickness, borderTopStyle: variant, borderColor: 'rgb(var(--anicca-border))' }} />
      </div>
    )
  }
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={{
        borderTopWidth: thickness,
        borderTopStyle: variant,
        borderColor: 'rgb(var(--anicca-border))',
        ...style,
      }}
      {...rest}
    />
  )
}
