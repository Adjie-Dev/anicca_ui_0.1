import React from 'react'

export interface AniccaProgressItem {
  name: string
  progress: number
  color?: string
  status?: string
  team?: Array<string | { color: string; label?: string }>
}

export interface AniccaProgressCardLabels {
  unit?: string
}

export interface AniccaProgressCardProps {
  items: AniccaProgressItem[]
  title?: string
  showCount?: boolean
  labels?: AniccaProgressCardLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaProgressCardLabels> = { unit: 'projects' }

/**
 * AniccaProgressCard — Card displaying tasks with progress bars and team avatars.
 */
export function AniccaProgressCard({
  items, title, showCount = true, labels, className = '',
}: AniccaProgressCardProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }

  return (
    <div className={`bg-surface-container-lowest rounded-[20px] p-6 shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-5">
          <span className="text-[0.95rem] font-bold text-[#0f172a] dark:text-on-surface">{title}</span>
          {showCount && (
            <span className="text-[0.68rem] font-semibold py-[0.2rem] px-[0.55rem] rounded-[20px] bg-[#f5f3ff] text-violet dark:bg-[rgba(59,130,246,0.18)] dark:text-[#3b82f6]">
              {items.length} {t.unit}
            </span>
          )}
        </div>
      )}
      {items.map((item, i) => {
        const accent = item.color || 'rgb(var(--primary))'
        return (
          <div
            key={item.name}
            className={`py-[0.85rem] ${i < items.length - 1 ? 'border-b border-[#f8fafc] dark:border-[rgba(51,65,85,0.4)]' : 'border-b-0 pb-0'} ${i === 0 && !title ? 'pt-0' : ''}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[0.85rem] font-semibold text-[#0f172a] dark:text-on-surface">{item.name}</span>
              <span className="text-[0.75rem] font-bold" style={{ color: accent }}>{item.progress}%</span>
            </div>
            <div className="h-[7px] bg-[#f1f5f9] dark:bg-[rgba(71,85,105,0.4)] rounded overflow-hidden">
              <div
                className="h-full rounded transition-[width] duration-500 ease-in-out"
                style={{ width: `${item.progress}%`, background: accent }}
              />
            </div>
            {(item.status || item.team) && (
              <div className="flex justify-between items-center mt-[0.4rem]">
                {item.status && <span className="text-[0.7rem] text-[#94a3b8]">{item.status}</span>}
                {item.team && (
                  <div className="flex">
                    {item.team.map((m, j) => {
                      const col = typeof m === 'string' ? m : m.color
                      const lbl = typeof m === 'string' ? String.fromCharCode(65 + j) : (m.label ?? String.fromCharCode(65 + j))
                      return (
                        <div
                          key={j}
                          className="w-[22px] h-[22px] rounded-full border-2 border-surface-container-lowest dark:border-[#1e293b] flex items-center justify-center text-[0.55rem] font-bold text-white"
                          style={{ background: col, marginLeft: j === 0 ? 0 : '-6px' }}
                        >
                          {lbl}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
