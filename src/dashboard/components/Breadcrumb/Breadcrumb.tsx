import React from 'react'

export interface AniccaBreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface AniccaBreadcrumbProps {
  items: AniccaBreadcrumbItem[]
  separator?: React.ReactNode
  ariaLabel?: string
  className?: string
}

/**
 * AniccaBreadcrumb — Breadcrumb navigation showing current page location.
 */
export function AniccaBreadcrumb({
  items, separator = '/', ariaLabel = 'Breadcrumb', className = '',
}: AniccaBreadcrumbProps): React.ReactElement {
  return (
    <nav className={`py-[0.6rem] ${className}`} aria-label={ariaLabel}>
      <ol className="flex items-center list-none m-0 p-0 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {!isLast ? (
                <>
                  <a
                    href={item.href || '#'}
                    className="inline-flex items-center gap-[0.35rem] text-[#64748b] dark:text-[#94a3b8] no-underline text-[0.82rem] font-medium py-[0.3rem] px-[0.6rem] rounded-[6px] transition-all duration-200 ease-in-out hover:text-[#3b82f6] hover:bg-[rgba(59,130,246,0.08)] dark:hover:bg-[rgba(59,130,246,0.12)]"
                  >
                    {item.icon && <span className="flex items-center text-[0.85rem]">{item.icon}</span>}
                    {item.label}
                  </a>
                  <span aria-hidden="true" className="mx-1 text-[#cbd5e1] dark:text-[#475569] text-[0.75rem] select-none">
                    {separator}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-[0.35rem] text-[#0f172a] dark:text-on-surface text-[0.82rem] font-bold py-[0.3rem] px-[0.7rem] bg-[rgba(15,23,42,0.05)] dark:bg-[rgba(71,85,105,0.4)] rounded-[6px]">
                  {item.icon && <span className="flex items-center text-[0.85rem]">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
