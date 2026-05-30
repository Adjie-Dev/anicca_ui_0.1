import React, { useState } from 'react'

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

export interface AniccaSidebarProps {
  items: AniccaSidebarItem[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  logo?: React.ReactNode
  footer?: React.ReactNode
  activePath?: string
  labels?: AniccaSidebarLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaSidebarLabels> = {
  expand: 'Expand sidebar',
  collapse: 'Collapse sidebar',
  navigation: 'Sidebar navigation',
}

/**
 * AniccaSidebar — Collapsible sidebar navigation with nested submenus.
 */
export function AniccaSidebar({
  items, collapsed = false, logo, footer,
  activePath = '', labels, className = '',
}: AniccaSidebarProps): React.ReactElement {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const t = { ...DEFAULT_LABELS, ...labels }

  const toggleSubmenu = (href: string) =>
    setOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }))

  const renderItem = (item: AniccaSidebarItem, isSubmenu = false) => {
    const isActive = activePath === item.href
    const hasChildren = (item.children?.length ?? 0) > 0
    const isOpen = openMenus[item.href]

    /* ── Active classes
       Light: subtle fill + slight x-translation
       Dark:  solid primary pill with mx-4 margin (match preview dark/code.html) */
    const activeClass = isSubmenu
      ? 'text-primary font-semibold dark:text-white dark:font-semibold'
      : [
          'bg-primary-container/10 text-primary font-bold translate-x-1 rounded-lg',
          'dark:bg-primary dark:text-white dark:shadow-lg dark:shadow-primary/20',
        ].join(' ')

    /* ── Inactive classes */
    const inactiveClass = isSubmenu
      ? 'text-[#767586] hover:text-on-surface dark:text-[#64748b] dark:hover:text-[#e2e8f0]'
      : [
          'text-on-surface-variant hover:bg-secondary-container/30 hover:text-on-surface',
          'dark:text-secondary dark:hover:text-white dark:hover:bg-surface-container-highest/50',
        ].join(' ')

    /* ── Base — NO w-full: flex items are block-level, fill container naturally.
       dark:mx-4 then reduces visual width by 32px. */
    const baseClass = [
      'flex items-center gap-3 px-4 py-3 text-[0.875rem] font-medium',
      'cursor-pointer transition-all duration-200 border-none bg-transparent text-left no-underline',
      isSubmenu ? 'pl-[2.75rem] text-[0.82rem]' : '',
    ].join(' ')

    const inner = (
      <>
        {item.icon && (
          <span className="shrink-0 w-5 flex items-center justify-center text-[1.1rem] transition-transform duration-200 ease-in-out group-hover/item:scale-110">
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">{item.label}</span>
        )}
        {hasChildren && !collapsed && (
          <span
            className="ml-auto text-[0.65rem] transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ opacity: isOpen ? 1 : 0.6, transform: isOpen ? 'rotate(90deg)' : 'none' }}
          >▶</span>
        )}
      </>
    )

    return (
      <div key={item.href} className="group/item">
        {hasChildren ? (
          <button
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            onClick={() => toggleSubmenu(item.href)}
            aria-expanded={isOpen}
          >
            {inner}
          </button>
        ) : (
          <a
            href={item.href}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {inner}
          </a>
        )}
        {hasChildren && !collapsed && (
          <div
            className="overflow-hidden transition-[max-height] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ maxHeight: isOpen ? '500px' : '0' }}
          >
            {item.children!.map((child) => renderItem(child, true))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={`
        flex flex-col h-screen sticky top-0 overflow-hidden shrink-0
        bg-surface dark:bg-sidebar-bg
        border-r border-on-surface/[0.08] dark:border-outline-variant/30
        dark:shadow-2xl
        transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        ${className}
      `}
      role="navigation"
      aria-label={t.navigation}
    >
      {/* Logo / brand */}
      {logo && (
        <div className={`
          flex items-center px-5 shrink-0
          h-[68px] border-b border-on-surface/[0.08] dark:border-outline-variant/30
          ${collapsed ? 'justify-center' : ''}
        `}>
          {logo}
        </div>
      )}

      {/* Navigation */}
      <nav
        className="flex-1 flex flex-col gap-1 overflow-y-auto py-3 min-h-0 [scrollbar-width:thin] [scrollbar-color:rgb(var(--outline-variant))_transparent] dark:[scrollbar-color:#334155_transparent]"
      >
        {items.map((item) => renderItem(item))}
      </nav>

      {/* Footer */}
      <div className={`
        pt-4 pb-4 border-t border-outline-variant/10 shrink-0
      `}>
        {footer && !collapsed && <div className="px-4 dark:px-0 mb-2">{footer}</div>}
      </div>
    </aside>
  )
}
