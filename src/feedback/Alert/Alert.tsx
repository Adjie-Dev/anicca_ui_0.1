import React from 'react'

export type AniccaAlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export interface AniccaAlertLabels {
  dismiss?: string
}

export interface AniccaAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AniccaAlertVariant
  title?: React.ReactNode
  /** Replace default variant icon. Pass null to hide icon. */
  icon?: React.ReactNode | null
  /** Show dismiss × button and call this when clicked. */
  onDismiss?: () => void
  labels?: AniccaAlertLabels
  /** Visual style. */
  appearance?: 'soft' | 'outlined'
}

const VARIANT_SOFT: Record<AniccaAlertVariant, string> = {
  info: 'bg-info-bg border-info/40 text-info dark:bg-info/20 dark:border-info/30 dark:text-info',
  success: 'bg-success-bg border-success/40 text-success dark:bg-success/20 dark:border-success/30 dark:text-success',
  warning: 'bg-warning-bg border-warning/40 text-warning dark:bg-warning/20 dark:border-warning/30 dark:text-warning',
  danger: 'bg-danger-bg border-danger/40 text-danger dark:bg-danger/20 dark:border-danger/30 dark:text-danger',
  neutral: 'bg-surface-muted border-border text-text dark:bg-surface-container dark:border-border dark:text-text',
}

const VARIANT_OUTLINED: Record<AniccaAlertVariant, string> = {
  info: 'bg-surface border-info text-info dark:bg-surface dark:border-info dark:text-info',
  success: 'bg-surface border-success text-success dark:bg-surface dark:border-success dark:text-success',
  warning: 'bg-surface border-warning text-warning dark:bg-surface dark:border-warning dark:text-warning',
  danger: 'bg-surface border-danger text-danger dark:bg-surface dark:border-danger dark:text-danger',
  neutral: 'bg-surface border-border text-text dark:bg-surface dark:border-border dark:text-text',
}

const DEFAULT_ICONS: Record<AniccaAlertVariant, React.ReactNode> = {
  info: <Glyph d="M12 8h.01M11 12h1v4h1" />,
  success: <Glyph d="M20 6L9 17l-5-5" />,
  warning: <Glyph d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />,
  danger: <Glyph d="M10 14l4-4m0 4l-4-4M12 22a10 10 0 110-20 10 10 0 010 20z" />,
  neutral: <Glyph d="M12 8h.01M11 12h1v4h1" />,
}

function Glyph({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * AniccaAlert — Inline contextual message with variant icon + optional dismiss.
 */
export function AniccaAlert({
  variant = 'info', title, icon, onDismiss, labels, appearance = 'soft',
  className = '', children, ...rest
}: AniccaAlertProps): React.ReactElement {
  const dismissLabel = labels?.dismiss ?? 'Dismiss'
  const variantClass = appearance === 'outlined' ? VARIANT_OUTLINED[variant] : VARIANT_SOFT[variant]
  const iconNode = icon === null ? null : (icon ?? DEFAULT_ICONS[variant])

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-lg border ${variantClass} ${className}`}
      {...rest}
    >
      {iconNode}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-[0.9rem] mb-0.5 text-text">{title}</div>}
        <div className="text-[0.82rem] text-text leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="shrink-0 w-6 h-6 inline-flex items-center justify-center rounded-xs text-text-muted hover:text-text hover:bg-surface-muted transition-colors"
        >
          ×
        </button>
      )}
    </div>
  )
}
