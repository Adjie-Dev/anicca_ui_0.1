import React, { useState } from 'react'

/**
 * Sidebar navigation item.
 */
export interface AniccaSidebarItem {
  label: string
  icon?: React.ReactNode
  href: string
  children?: AniccaSidebarItem[]
}

export interface AniccaSidebarLabels {
  expand?: string
  collapse?: string
  navigation?: string
}

/**
 * Props for the AniccaSidebar component.
 */
export interface AniccaSidebarProps {
  items: AniccaSidebarItem[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  logo?: React.ReactNode
  footer?: React.ReactNode
  activePath?: string
  /** i18n label overrides */
  labels?: AniccaSidebarLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaSidebarLabels> = {
  expand: 'Expand sidebar',
  collapse: 'Collapse sidebar',
  navigation: 'Sidebar navigation',
}

/**
 * AniccaSidebar — A collapsible sidebar navigation component
 * with support for nested submenus, active state highlighting,
 * and icon-only collapsed mode.
 */
export function AniccaSidebar({
  items,
  collapsed = false,
  onCollapse,
  logo,
  footer,
  activePath = '',
  labels,
  className = '',
}: AniccaSidebarProps): React.ReactElement {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const t = { ...DEFAULT_LABELS, ...labels }

  const toggleSubmenu = (href: string) => {
    setOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }))
  }

  const handleCollapse = () => {
    onCollapse?.(!collapsed)
  }

  const itemBase = 'flex items-center gap-3 py-[0.65rem] px-4 text-a-surface-dark-fg-muted no-underline text-sm font-medium cursor-pointer transition-all duration-200 ease-in-out border-none bg-transparent w-full text-left rounded-[10px] mb-[2px] hover:bg-a-surface-dark-2/60 hover:text-a-surface-dark-fg group/item'
  const activeClass = 'bg-a-primary-soft text-a-primary hover:bg-a-primary-soft hover:text-a-primary'

  const renderItem = (item: AniccaSidebarItem) => {
    const isActive = activePath === item.href
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openMenus[item.href]

    return (
      <div key={item.href}>
        {hasChildren ? (
          <button
            className={`${itemBase} ${isActive ? activeClass : ''}`}
            onClick={() => toggleSubmenu(item.href)}
            aria-expanded={isOpen}
          >
            {item.icon && <span className="shrink-0 w-5 flex items-center justify-center text-[1.1rem] transition-transform duration-200 ease-in-out group-hover/item:scale-110">{item.icon}</span>}
            <span className={`whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-200 ease-in-out ${collapsed ? 'hidden' : ''}`}>
              {item.label}
            </span>
            {!collapsed && (
              <span className={`ml-auto transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] text-[0.65rem] opacity-60 ${isOpen ? 'rotate-90 opacity-100' : ''}`}>
                ▶
              </span>
            )}
          </button>
        ) : (
          <a
            href={item.href}
            className={`${itemBase} ${isActive ? activeClass : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && <span className="shrink-0 w-5 flex items-center justify-center text-[1.1rem] transition-transform duration-200 ease-in-out group-hover/item:scale-110">{item.icon}</span>}
            <span className={`whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-200 ease-in-out ${collapsed ? 'hidden' : ''}`}>
              {item.label}
            </span>
          </a>
        )}
        {hasChildren && !collapsed && (
          <div className={`pl-2 overflow-hidden transition-[max-height] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            {item.children!.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className={`${itemBase} pl-11 text-[0.82rem] ${activePath === child.href ? activeClass : ''}`}
                aria-current={activePath === child.href ? 'page' : undefined}
              >
                {child.icon && <span className="shrink-0 w-5 flex items-center justify-center text-[1.1rem]">{child.icon}</span>}
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{child.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={`flex flex-col h-screen sticky top-0 bg-gradient-to-b from-a-surface-dark to-a-surface-dark-2 text-a-surface-dark-fg transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden border-r border-a-border-dark shrink-0 ${collapsed ? 'w-[72px]' : 'w-[260px]'} ${className}`}
      role="navigation"
      aria-label={t.navigation}
    >
      {logo && <div className="flex items-center justify-center py-6 px-5 border-b border-a-border-dark min-h-[72px]">{logo}</div>}
      <nav className="flex-1 overflow-y-auto py-3 px-2 min-h-0">{items.map(renderItem)}</nav>
      <div className="p-4 border-t border-a-border-dark">
        {footer && !collapsed && footer}
        <button
          className="flex items-center justify-center w-full py-[0.6rem] bg-a-surface-dark-2/60 border border-a-border-dark rounded-lg text-a-surface-dark-fg-muted cursor-pointer text-[0.9rem] transition-all duration-200 ease-in-out hover:bg-a-surface-dark-2 hover:text-a-surface-dark-fg"
          onClick={handleCollapse}
          aria-label={collapsed ? t.expand : t.collapse}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
    </aside>
  )
}
