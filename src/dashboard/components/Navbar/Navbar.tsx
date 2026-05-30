import React from 'react'

export interface AniccaNavbarUser {
  name: string
  avatar?: string
  role?: string
}

export interface AniccaNavbarLabels {
  toggleMenu?: string
}

export interface AniccaNavbarProps {
  title?: string
  logo?: React.ReactNode
  actions?: React.ReactNode
  user?: AniccaNavbarUser
  onMenuToggle?: () => void
  labels?: AniccaNavbarLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaNavbarLabels> = { toggleMenu: 'Toggle menu' }

/**
 * AniccaNavbar — Sticky top navigation bar with glassmorphism backdrop.
 */
export function AniccaNavbar({
  title, logo, actions, user, onMenuToggle, labels, className = '',
}: AniccaNavbarProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }
  const getInitials = (name: string) =>
    name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2)

  return (
    <header
      className={`glass flex items-center justify-between px-7 h-[68px] sticky top-0 z-[100] border-b border-on-surface/[0.06] shadow-[0_1px_2px_rgba(11,28,48,0.03)] dark:border-outline-variant/50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] ${className}`}
      role="banner"
    >
      <div className="flex items-center gap-[0.85rem]">
        {onMenuToggle && (
          <button
            className="flex items-center justify-center w-[38px] h-[38px] rounded-[10px] cursor-pointer text-[1.2rem] transition-all duration-200 ease-in-out text-[#475569] border border-[rgba(226,232,240,0.8)] bg-[rgba(248,250,252,0.8)] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] hover:text-[#1e293b] dark:bg-[rgba(30,41,59,0.7)] dark:border-[rgba(71,85,105,0.5)] dark:text-[#94a3b8] dark:hover:bg-[rgba(71,85,105,0.4)] dark:hover:border-[rgba(100,116,139,0.5)] dark:hover:text-on-surface"
            onClick={onMenuToggle}
            aria-label={t.toggleMenu}
          >
            ☰
          </button>
        )}
        {logo && <div className="flex items-center">{logo}</div>}
        {title && (
          <span className="text-[1.1rem] font-semibold text-on-surface tracking-[-0.02em]">
            {title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-5">
        {actions && <div className="flex items-center gap-2">{actions}</div>}
        {user && (
          <div
            className="flex items-center gap-3 rounded-xl transition-colors duration-200 ease-in-out hover:bg-[rgba(241,245,249,0.8)] dark:hover:bg-[rgba(71,85,105,0.3)] cursor-default"
            style={{ padding: '0.4rem 0.6rem 0.4rem 0.4rem' }}
          >
            <div
              className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[0.8rem] font-bold text-white overflow-hidden shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                boxShadow: '0 2px 8px rgba(59,130,246,0.25)',
              }}
            >
              {user.avatar
                ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                : getInitials(user.name)}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.85rem] font-semibold text-[#0f172a] dark:text-on-surface">{user.name}</span>
              {user.role && (
                <span className="text-[0.7rem] text-[#64748b] dark:text-[#94a3b8] font-normal">{user.role}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
