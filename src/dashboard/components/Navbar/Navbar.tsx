import React from 'react'

/**
 * User information for the navbar.
 */
export interface AniccaNavbarUser {
  name: string
  avatar?: string
  role?: string
}

export interface AniccaNavbarLabels {
  toggleMenu?: string
}

/**
 * Props for the AniccaNavbar component.
 */
export interface AniccaNavbarProps {
  title?: string
  logo?: React.ReactNode
  actions?: React.ReactNode
  user?: AniccaNavbarUser
  onMenuToggle?: () => void
  /** i18n label overrides */
  labels?: AniccaNavbarLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaNavbarLabels> = {
  toggleMenu: 'Toggle menu',
}

/**
 * AniccaNavbar — A sticky top navigation bar with hamburger menu,
 * logo, title, action buttons, and user avatar display.
 */
export function AniccaNavbar({
  title,
  logo,
  actions,
  user,
  onMenuToggle,
  labels,
  className = '',
}: AniccaNavbarProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }
  const getInitials = (name: string): string => {
    return name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <header className={`flex items-center justify-between px-7 h-[68px] bg-a-surface/90 backdrop-blur-[12px] border-b border-a-border shadow-a-sm sticky top-0 z-[100] ${className}`} role="banner">
      <div className="flex items-center gap-[0.85rem]">
        {onMenuToggle && (
          <button
            className="flex items-center justify-center w-[38px] h-[38px] border border-a-border bg-a-surface-muted rounded-[10px] cursor-pointer text-a-text-muted text-[1.2rem] transition-all duration-200 ease-in-out hover:bg-a-border hover:text-a-text"
            onClick={onMenuToggle}
            aria-label={t.toggleMenu}
          >
            ☰
          </button>
        )}
        {logo && <div className="flex items-center">{logo}</div>}
        {title && <span className="text-[1.1rem] font-bold text-a-text tracking-[-0.01em]">{title}</span>}
      </div>
      <div className="flex items-center gap-5">
        {actions && <div className="flex items-center gap-2">{actions}</div>}
        {user && (
          <div className="flex items-center gap-3 py-[0.4rem] pr-[0.6rem] pl-[0.4rem] rounded-xl transition-colors duration-200 ease-in-out hover:bg-a-surface-muted">
            <div
              className="w-[38px] h-[38px] rounded-[10px] text-a-primary-fg flex items-center justify-center text-[0.8rem] font-bold overflow-hidden"
              style={{ background: 'var(--anicca-primary)' }}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.85rem] font-semibold text-a-text">{user.name}</span>
              {user.role && <span className="text-[0.7rem] text-a-text-muted font-normal">{user.role}</span>}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
