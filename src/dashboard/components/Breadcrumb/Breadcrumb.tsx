import React from 'react'

/**
 * A single breadcrumb item.
 */
export interface AniccaBreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

/**
 * Props for the AniccaBreadcrumb component.
 */
export interface AniccaBreadcrumbProps {
  items: AniccaBreadcrumbItem[]
  separator?: React.ReactNode
  /** Aria label override for the nav element. Default "Breadcrumb". */
  ariaLabel?: string
  className?: string
}

/**
 * AniccaBreadcrumb — A breadcrumb navigation component showing
 * the current page location within a hierarchy.
 */
export function AniccaBreadcrumb({
  items,
  separator = '/',
  ariaLabel = 'Breadcrumb',
  className = '',
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
                  <a href={item.href || '#'} className="inline-flex items-center gap-[0.35rem] text-a-text-muted no-underline text-[0.82rem] font-medium py-[0.3rem] px-[0.6rem] rounded-md transition-all duration-200 ease-in-out hover:text-a-primary hover:bg-a-primary-soft">
                    {item.icon && <span className="flex items-center text-[0.85rem]">{item.icon}</span>}
                    {item.label}
                  </a>
                  <span className="mx-1 text-a-text-subtle text-xs select-none" aria-hidden="true">
                    {separator}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-[0.35rem] text-a-text text-[0.82rem] font-bold py-[0.3rem] px-[0.7rem] bg-a-surface-muted rounded-md">
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
