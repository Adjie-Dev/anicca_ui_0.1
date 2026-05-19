import React from 'react'

export interface AniccaChartWrapperLabels {
  /** Aria label for the loading skeleton. Default "Loading chart". */
  loading?: string
}

/**
 * Props for the AniccaChartWrapper component.
 */
export interface AniccaChartWrapperProps {
  /** Chart title */
  title: string
  /** Optional subtitle */
  subtitle?: string
  /** Chart content (any chart library or custom SVG) */
  children: React.ReactNode
  /** Show loading skeleton */
  loading?: boolean
  /** Show empty state */
  empty?: boolean
  /** Message to display when empty. Default "No data available". */
  emptyMessage?: string
  /** Height of the chart area */
  height?: string | number
  /** i18n label overrides */
  labels?: AniccaChartWrapperLabels
  /** Additional CSS class */
  className?: string
}

const DEFAULT_LABELS: Required<AniccaChartWrapperLabels> = {
  loading: 'Loading chart',
}

/**
 * AniccaChartWrapper — A container for chart content with loading
 * skeleton and empty state support.
 */
export function AniccaChartWrapper({
  title,
  subtitle,
  children,
  loading = false,
  empty = false,
  emptyMessage = 'No data available',
  height = 300,
  labels,
  className = '',
}: AniccaChartWrapperProps): React.ReactElement {
  const heightValue = typeof height === 'number' ? `${height}px` : height
  const t = { ...DEFAULT_LABELS, ...labels }

  return (
    <div className={`bg-gradient-to-br from-a-surface to-a-surface-muted rounded-a p-7 shadow-a-sm border border-a-border ${className}`}>
      <div className="mb-5">
        <div className="text-[1.05rem] font-bold text-a-text tracking-[-0.01em]">{title}</div>
        {subtitle && <div className="text-[0.8rem] text-a-text-muted mt-[0.3rem] font-normal">{subtitle}</div>}
      </div>
      <div className="relative w-full rounded-xl overflow-hidden" style={{ height: heightValue }}>
        {loading ? (
          <div className="w-full rounded-xl anicca-shimmer" style={{ height: heightValue }} aria-label={t.loading} />
        ) : empty ? (
          <div className="flex flex-col items-center justify-center text-a-text-subtle gap-4 anicca-empty-bg rounded-xl border-2 border-dashed border-a-border" style={{ height: heightValue }}>
            <svg
              className="w-14 h-14 opacity-40 stroke-[1.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.9rem] text-a-text-muted font-medium">{emptyMessage}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
