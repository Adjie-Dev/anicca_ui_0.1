import React from 'react'

export interface AniccaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * AniccaMenu — Container for menu items, dividers, labels. Use inside AniccaDropdown.
 */
export function AniccaMenu({ className = '', children, ...rest }: AniccaMenuProps): React.ReactElement {
  return <div role="menu" className={`flex flex-col ${className}`} {...rest}>{children}</div>
}

export interface AniccaMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /** Mark as destructive variant (red). */
  destructive?: boolean
  /** Optional shortcut hint (e.g. "⌘K"). */
  shortcut?: string
}

export function AniccaMenuItem({
  leftIcon, rightIcon, destructive, shortcut, className = '', children, ...rest
}: AniccaMenuItemProps): React.ReactElement {
  return (
    <button
      type="button"
      role="menuitem"
      className={`flex items-center gap-2.5 px-3 py-2 text-left text-[0.85rem] cursor-pointer border-none bg-transparent transition-colors duration-150 hover:bg-surface-muted focus-visible:outline-none focus-visible:bg-surface-muted disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-surface-container dark:focus-visible:bg-surface-container ${destructive ? 'text-danger hover:bg-danger/10 dark:hover:bg-danger/20' : 'text-text dark:text-text'} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="shrink-0 inline-flex items-center w-4 h-4">{leftIcon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <span className="text-[0.72rem] text-text-subtle font-mono ml-2">{shortcut}</span>}
      {rightIcon && <span className="shrink-0 inline-flex items-center w-4 h-4">{rightIcon}</span>}
    </button>
  )
}

export function AniccaMenuDivider({ className = '' }: { className?: string }): React.ReactElement {
  return <div role="separator" className={`my-1 h-px bg-border ${className}`} />
}

export function AniccaMenuLabel({
  className = '', children, ...rest
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div className={`px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.06em] font-semibold text-text-subtle ${className}`} {...rest}>
      {children}
    </div>
  )
}
