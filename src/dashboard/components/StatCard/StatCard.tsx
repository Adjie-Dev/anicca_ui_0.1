import React from 'react'

export interface AniccaStatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: number
  trendLabel?: string
  /** Accent color for the left border. Default uses --primary. */
  color?: string
  className?: string
}

/**
 * AniccaStatCard — Dashboard stat card with trend indicator and icon.
 */
export function AniccaStatCard({
  title, value, icon, trend, trendLabel, color, className = '',
}: AniccaStatCardProps): React.ReactElement {
  const dir = trend !== undefined ? (trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral') : null

  const trendCls = {
    up:      'text-[#15803d] bg-[rgba(22,163,74,0.1)] dark:text-[#10b981] dark:bg-[rgba(16,185,129,0.18)]',
    down:    'text-[#dc2626] bg-[rgba(220,38,38,0.1)] dark:text-[#ef4444] dark:bg-[rgba(239,68,68,0.18)]',
    neutral: 'text-[#64748b] bg-[rgba(100,116,139,0.1)] dark:text-[#94a3b8] dark:bg-[rgba(100,116,139,0.18)]',
  } as const

  return (
    <div
      className={`
        relative overflow-hidden group
        bg-surface-container-lowest rounded-[20px]
        border border-on-surface/[0.06]
        shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)]
        dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_12px_32px_-14px_rgba(0,0,0,0.5)]
        transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-[3px]
        hover:shadow-[0_1px_2px_rgba(11,28,48,0.05),0_18px_44px_-16px_rgba(11,28,48,0.22)]
        ${className}
      `}
      style={{
        padding: '1.5rem 1.5rem 1.5rem 1.625rem',
        borderLeft: `3px solid ${color ?? 'rgb(var(--primary))'}`,
      }}
      role="group"
      aria-label={`${title}: ${value}`}
    >
      {/* glow orb */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[100px] h-[100px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgb(var(--primary) / 0.05) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="flex justify-between items-start mb-3">
        <span className="text-[0.7rem] font-semibold text-outline uppercase tracking-[0.08em]">
          {title}
        </span>
        {icon && (
          <span className="text-2xl text-[#94a3b8] opacity-80 transition-transform duration-300 ease-in-out group-hover:scale-110">
            {icon}
          </span>
        )}
      </div>

      <div className="text-[1.875rem] font-bold font-display text-on-surface mb-3 tracking-[-0.03em] leading-[1.1] [font-variant-numeric:tabular-nums]">
        {value}
      </div>

      {trend !== undefined && dir && (
        <div className={`inline-flex items-center gap-[0.35rem] text-[0.8rem] font-semibold rounded-[20px] py-1 px-[0.6rem] ${trendCls[dir]}`}>
          <span className="text-[0.7rem]">{dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'}</span>
          <span className="font-bold">{Math.abs(trend)}%</span>
          {trendLabel && (
            <span className="text-[#94a3b8] font-normal ml-2 text-[0.75rem]">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}
