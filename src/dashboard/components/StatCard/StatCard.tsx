import React from 'react'

/**
 * Props for the AniccaStatCard component.
 */
export interface AniccaStatCardProps {
  /** Title label for the stat */
  title: string
  /** The stat value to display prominently */
  value: string | number
  /** Optional icon displayed at the top right */
  icon?: React.ReactNode
  /** Trend percentage (positive = up, negative = down) */
  trend?: number
  /** Label for the trend (e.g. "vs last month") */
  trendLabel?: string
  /** Accent color for the left border. Defaults to theme primary token. */
  color?: string
  /** Additional CSS class */
  className?: string
}

/**
 * AniccaStatCard — A dashboard stat card displaying a key metric
 * with optional trend indicator and icon.
 */
export function AniccaStatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  color,
  className = '',
}: AniccaStatCardProps): React.ReactElement {
  const trendDirection = trend !== undefined ? (trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral') : null

  const trendClasses = {
    up: 'text-a-success bg-a-success-bg',
    down: 'text-a-danger bg-a-danger-bg',
    neutral: 'text-a-text-muted bg-a-surface-muted',
  }

  return (
    <div
      className={`relative bg-gradient-to-br from-a-surface to-a-surface-muted rounded-a p-6 border-l-4 shadow-a-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden hover:shadow-a-md hover:-translate-y-1 group ${className}`}
      style={{ borderLeftColor: color ?? 'var(--anicca-primary)' }}
      role="group"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-a-text-muted font-semibold uppercase tracking-[0.06em]">{title}</span>
        {icon && <span className="text-2xl text-a-text-subtle opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-110">{icon}</span>}
      </div>
      <div className="text-[2rem] font-extrabold text-a-text mb-3 tracking-tight leading-[1.1]">{value}</div>
      {trend !== undefined && (
        <div className={`inline-flex items-center gap-[0.35rem] text-[0.8rem] font-semibold py-1 px-[0.6rem] rounded-[20px] ${trendClasses[trendDirection || 'neutral']}`}>
          <span className="text-[0.7rem]">
            {trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→'}
          </span>
          <span className="font-bold">{Math.abs(trend)}%</span>
          {trendLabel && <span className="text-a-text-subtle font-normal ml-2 text-xs">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}
