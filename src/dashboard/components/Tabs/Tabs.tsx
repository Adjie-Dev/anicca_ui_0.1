import React, { useState } from 'react'

/**
 * A single tab definition.
 */
export interface AniccaTabItem {
  key: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

/**
 * Props for AniccaTabs.
 */
export interface AniccaTabsProps {
  tabs: AniccaTabItem[]
  defaultTab?: string
  /** Controlled active key. When provided, component becomes controlled. */
  activeKey?: string
  /** Callback when tab changes (works in both controlled and uncontrolled mode). */
  onChange?: (key: string) => void
  className?: string
}

/**
 * AniccaTabs — Tab navigation component with animated indicator and content switching.
 */
export function AniccaTabs({
  tabs,
  defaultTab,
  activeKey,
  onChange,
  className = '',
}: AniccaTabsProps): React.ReactElement {
  const [internal, setInternal] = useState(defaultTab || tabs[0]?.key || '')
  const active = activeKey ?? internal
  const activeTab = tabs.find(t => t.key === active)

  const handleSelect = (key: string) => {
    if (activeKey === undefined) setInternal(key)
    onChange?.(key)
  }

  return (
    <div
      className={`bg-surface-container-lowest rounded-[20px] shadow-[0_1px_2px_rgba(11,28,48,0.04),0_12px_32px_-14px_rgba(11,28,48,0.14)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] border border-on-surface/[0.06] overflow-hidden ${className}`}
    >
      <div
        className="flex pt-2 px-6 border-b border-[#f1f5f9] dark:border-outline-variant/50"
        role="tablist"
      >
        {tabs.map(tab => {
          const isActive = active === tab.key
          return (
            <button
              key={tab.key}
              className={`
                py-[0.7rem] px-[1.1rem] text-[0.82rem] font-medium cursor-pointer
                border-none bg-transparent border-b-2 transition-all duration-200
                flex items-center gap-[0.4rem] font-[inherit] -mb-px
                ${isActive
                  ? 'text-primary border-b-primary font-semibold'
                  : 'text-secondary border-b-transparent hover:text-on-surface dark:text-[#94a3b8] dark:hover:text-on-surface'
                }
              `}
              onClick={() => handleSelect(tab.key)}
              role="tab"
              aria-selected={isActive}
            >
              {tab.icon && <span className="text-[0.9rem]">{tab.icon}</span>}
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="p-6 text-on-surface" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}
