import React from 'react'

export interface AniccaChartWrapperLabels {
  loading?: string
}

export interface AniccaChartWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  height?: string | number
  labels?: AniccaChartWrapperLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaChartWrapperLabels> = { loading: 'Loading chart' }

/**
 * AniccaChartWrapper — Container for charts with loading skeleton and empty state.
 */
export function AniccaChartWrapper({
  title, subtitle, children, loading = false, empty = false,
  emptyMessage = 'No data available', height = 300, labels, className = '',
}: AniccaChartWrapperProps): React.ReactElement {
  const h = typeof height === 'number' ? `${height}px` : height
  const t = { ...DEFAULT_LABELS, ...labels }

  return (
    <div className={`bg-surface-container-lowest rounded-[20px] p-[1.75rem] shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.35)] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] ${className}`}>
      <div className="mb-5">
        <div className="text-[1.05rem] font-semibold text-on-surface tracking-[-0.02em]">{title}</div>
        {subtitle && (
          <div className="text-[0.8rem] text-outline dark:text-[#94a3b8] mt-[0.3rem] font-normal">{subtitle}</div>
        )}
      </div>
      <div className="relative w-full rounded-xl overflow-hidden" style={{ height: h }}>
        {loading ? (
          <div className="w-full rounded-xl anicca-shimmer" style={{ height: h }} aria-label={t.loading} />
        ) : empty ? (
          <div
            className="anicca-empty-bg flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#e2e8f0] dark:border-[rgba(71,85,105,0.5)]"
            style={{ height: h }}
          >
            <svg className="w-14 h-14 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 16l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.9rem] text-[#64748b] dark:text-[#94a3b8] font-medium">{emptyMessage}</span>
          </div>
        ) : children}
      </div>
    </div>
  )
}
