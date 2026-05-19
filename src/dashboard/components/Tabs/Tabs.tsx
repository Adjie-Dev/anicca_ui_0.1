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
 * AniccaTabs — A tab navigation component with animated indicator
 * and content switching. Supports controlled and uncontrolled modes.
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
    <div className={`bg-a-surface rounded-a shadow-a-sm border border-a-border overflow-hidden ${className}`}>
      <div className="flex pt-2 px-6 border-b border-a-border" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`py-[0.7rem] px-[1.1rem] text-[0.82rem] font-medium cursor-pointer border-none bg-transparent border-b-2 transition-all duration-200 flex items-center gap-[0.4rem] font-[inherit] -mb-px ${active === tab.key ? 'text-a-primary border-b-a-primary font-semibold' : 'text-a-text-muted border-b-transparent hover:text-a-text'}`}
            onClick={() => handleSelect(tab.key)}
            role="tab"
            aria-selected={active === tab.key}
          >
            {tab.icon && <span className="text-[0.9rem]">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 text-a-text" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}
