import React from 'react'

/**
 * A single activity item.
 */
export interface AniccaActivityItem {
  icon: React.ReactNode
  iconBg?: string
  message: React.ReactNode
  time: string
}

/**
 * Props for AniccaActivityFeed.
 */
export interface AniccaActivityFeedProps {
  items: AniccaActivityItem[]
  /** Header title. Omit or pass empty string to hide the header entirely. */
  title?: string
  /** Optional badge displayed on the right side of the header (e.g. live indicator). */
  badge?: React.ReactNode
  className?: string
}

/**
 * AniccaActivityFeed — A timeline-style activity feed with
 * connector lines, icons, and timestamps.
 */
export function AniccaActivityFeed({
  items,
  title,
  badge,
  className = '',
}: AniccaActivityFeedProps): React.ReactElement {
  const showHeader = (title && title.length > 0) || badge

  return (
    <div className={`bg-a-surface rounded-a p-6 shadow-a-sm border border-a-border ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center mb-5">
          {title ? <span className="text-[0.95rem] font-bold text-a-text">{title}</span> : <span />}
          {badge && <span>{badge}</span>}
        </div>
      )}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div className="flex gap-[0.85rem] py-[0.85rem] relative" key={i}>
            {i < items.length - 1 && (
              <div className="absolute left-[18px] top-[48px] bottom-0 w-[1.5px] bg-gradient-to-b from-a-border to-transparent" />
            )}
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[0.95rem] shrink-0 relative z-[1]"
              style={{ background: item.iconBg || 'var(--anicca-surface-muted)' }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.82rem] text-a-text leading-relaxed">{item.message}</div>
              <div className="text-[0.7rem] text-a-text-subtle mt-[0.2rem]">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
