import { useEffect, useRef, useState } from 'react'
import { Icon } from './primitives'

interface UserMenuProps {
  name: string
  role: string
  onProfile: () => void
  onLogout: () => void
}

/** Avatar button in the navbar that opens a Profile / Logout dropdown. */
export function UserMenu({ name, role, onProfile, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const run = (fn: () => void) => () => { setOpen(false); fn() }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-primary/5 transition-colors"
      >
        <span className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[12px] font-bold">{initials}</span>
        <span className="hidden lg:flex flex-col items-start leading-tight">
          <span className="text-label-sm font-bold text-on-surface">{name}</span>
          <span className="text-[10px] text-outline uppercase tracking-wider">{role}</span>
        </span>
        <Icon name="expand_more" className={`text-[18px] text-outline transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 p-1 rounded-[14px] bg-surface-container-lowest border border-outline-variant/20 shadow-lg z-[1500]"
        >
          <button role="menuitem" onClick={run(onProfile)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-body-base text-on-surface hover:bg-primary/5 transition-colors">
            <Icon name="person" className="text-[18px] text-on-surface-variant" />Profile
          </button>
          <button role="menuitem" onClick={run(onLogout)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-body-base text-error hover:bg-error/10 transition-colors">
            <Icon name="logout" className="text-[18px]" />Logout
          </button>
        </div>
      )}
    </div>
  )
}
