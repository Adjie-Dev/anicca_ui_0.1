import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export type AniccaDrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type AniccaDrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | string

export interface AniccaDrawerLabels {
  close?: string
}

export interface AniccaDrawerProps {
  open: boolean
  onClose: () => void
  side?: AniccaDrawerSide
  size?: AniccaDrawerSize
  title?: React.ReactNode
  footer?: React.ReactNode
  /** Disable escape key dismissal. */
  disableEscapeKey?: boolean
  /** Disable backdrop click dismissal. */
  disableBackdropClick?: boolean
  labels?: AniccaDrawerLabels
  className?: string
  children: React.ReactNode
}

const SIZE_MAP: Record<Exclude<AniccaDrawerSize, string>, string> = {
  sm: '320px', md: '400px', lg: '520px', xl: '720px', full: '100%',
}

/**
 * AniccaDrawer — Slide-in panel from any edge with backdrop + scroll lock.
 */
export function AniccaDrawer({
  open, onClose, side = 'right', size = 'md', title, footer,
  disableEscapeKey, disableBackdropClick, labels, className = '', children,
}: AniccaDrawerProps): React.ReactElement | null {
  const closeLabel = labels?.close ?? 'Close'

  useEffect(() => {
    if (!open || disableEscapeKey) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, disableEscapeKey])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  const isHorizontal = side === 'left' || side === 'right'
  const sizeValue = (size in SIZE_MAP) ? SIZE_MAP[size as Exclude<AniccaDrawerSize, string>] : size

  const panelStyle: React.CSSProperties = {
    [isHorizontal ? 'width' : 'height']: sizeValue,
    [isHorizontal ? 'height' : 'width']: '100%',
  }

  const positionClass = {
    left: 'top-0 left-0 h-full', right: 'top-0 right-0 h-full',
    top: 'top-0 left-0 w-full', bottom: 'bottom-0 left-0 w-full',
  }[side]

  const slideAnim = {
    left: 'animate-[anicca-slide-from-left_0.25s_ease-out]',
    right: 'animate-[anicca-slide-from-right_0.25s_ease-out]',
    top: 'animate-[anicca-slide-from-top_0.25s_ease-out]',
    bottom: 'animate-[anicca-slide-from-bottom_0.25s_ease-out]',
  }[side]

  return createPortal(
    <div
      className="fixed inset-0 z-[1500] anicca-fade-in bg-surface-overlay/60"
      onClick={disableBackdropClick ? undefined : onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute bg-surface shadow-lg flex flex-col dark:bg-surface ${positionClass} ${slideAnim} ${className}`}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
            <h2 className="text-[1rem] font-bold text-text m-0">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="w-8 h-8 rounded-lg bg-surface-muted text-text-muted hover:bg-border hover:text-text inline-flex items-center justify-center text-[1.1rem] transition-colors"
            >×</button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-text">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-border flex justify-end gap-2 shrink-0">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  )
}
