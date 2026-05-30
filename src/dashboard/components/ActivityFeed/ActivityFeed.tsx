import React from 'react'

export interface AniccaActivityItem {
  icon: React.ReactNode
  iconBg?: string
  message: React.ReactNode
  time: string
}

export interface AniccaActivityFeedProps {
  items: AniccaActivityItem[]
  title?: string
  badge?: React.ReactNode
  className?: string
}

/**
 * AniccaActivityFeed — Timeline-style activity feed with connector lines.
 */
export function AniccaActivityFeed({
  items, title, badge, className = '',
}: AniccaActivityFeedProps): React.ReactElement {
  const showHeader = (title && title.length > 0) || badge

  return (
    <div className={`bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] ${className}`}>
      {showHeader && (
        <div className="flex justify-between items-center mb-5">
          {title ? <span className="text-[0.95rem] font-bold text-[#0f172a] dark:text-on-surface">{title}</span> : <span />}
          {badge && <span>{badge}</span>}
        </div>
      )}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div key={i} className="flex gap-[0.85rem] py-[0.85rem] relative">
            {i < items.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute left-[18px] top-[48px] bottom-0 w-[1.5px]"
                style={{ background: 'linear-gradient(180deg, rgb(var(--outline-variant)), transparent)' }}
              />
            )}
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[0.95rem] shrink-0 relative z-[1]"
              style={{ background: item.iconBg || 'rgb(var(--surface-container-low))' }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.82rem] text-[#334155] dark:text-[#cbd5e1] leading-[1.5]">{item.message}</div>
              <div className="text-[0.7rem] text-[#94a3b8] mt-[0.2rem]">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
