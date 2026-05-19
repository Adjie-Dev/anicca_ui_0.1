import React from 'react'

/**
 * A single project/task item.
 */
export interface AniccaProgressItem {
  name: string
  progress: number
  /** Optional accent color. Defaults to theme primary token. */
  color?: string
  status?: string
  /** Team member colors OR objects with color + label. */
  team?: Array<string | { color: string; label?: string }>
}

export interface AniccaProgressCardLabels {
  /** Singular/plural unit label shown next to item count. Default "projects". */
  unit?: string
}

/**
 * Props for AniccaProgressCard.
 */
export interface AniccaProgressCardProps {
  items: AniccaProgressItem[]
  /** Card title. Omit to hide the header. */
  title?: string
  /** Show the count badge in the header (only when title is set). Default true. */
  showCount?: boolean
  /** i18n label overrides */
  labels?: AniccaProgressCardLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaProgressCardLabels> = {
  unit: 'projects',
}

/**
 * AniccaProgressCard — A card displaying a list of projects/tasks
 * with progress bars, status labels, and team avatars.
 */
export function AniccaProgressCard({
  items,
  title,
  showCount = true,
  labels,
  className = '',
}: AniccaProgressCardProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }

  return (
    <div className={`bg-a-surface rounded-a p-6 shadow-a-sm border border-a-border ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-5">
          <span className="text-[0.95rem] font-bold text-a-text">{title}</span>
          {showCount && (
            <span className="text-[0.68rem] py-[0.2rem] px-[0.55rem] rounded-[20px] font-semibold bg-a-info-bg text-a-info">
              {items.length} {t.unit}
            </span>
          )}
        </div>
      )}
      {items.map((item, i) => {
        const accent = item.color || 'var(--anicca-primary)'
        return (
          <div key={item.name} className={`py-[0.85rem] border-b border-a-border last:border-b-0 last:pb-0 ${i === 0 && !title ? 'pt-0' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[0.85rem] font-semibold text-a-text">{item.name}</span>
              <span className="text-xs font-bold" style={{ color: accent }}>{item.progress}%</span>
            </div>
            <div className="h-[7px] bg-a-surface-muted rounded overflow-hidden">
              <div className="h-full rounded transition-[width] duration-500 ease-in-out" style={{ width: `${item.progress}%`, background: accent }} />
            </div>
            {(item.status || item.team) && (
              <div className="flex justify-between items-center mt-[0.4rem]">
                {item.status && <span className="text-[0.7rem] text-a-text-subtle">{item.status}</span>}
                {item.team && (
                  <div className="flex">
                    {item.team.map((m, j) => {
                      const color = typeof m === 'string' ? m : m.color
                      const label = typeof m === 'string' ? String.fromCharCode(65 + j) : (m.label ?? String.fromCharCode(65 + j))
                      return (
                        <div key={j} className="w-[22px] h-[22px] rounded-full border-2 border-a-surface -ml-[6px] first:ml-0 flex items-center justify-center text-[0.55rem] font-bold text-a-primary-fg" style={{ background: color }}>
                          {label}
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
