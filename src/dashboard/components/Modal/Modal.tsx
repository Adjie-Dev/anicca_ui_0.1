import React, { useEffect } from 'react'

export interface AniccaModalLabels {
  close?: string
}

export interface AniccaModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  disableEscapeKey?: boolean
  disableBackdropClick?: boolean
  labels?: AniccaModalLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaModalLabels> = { close: 'Close' }

/**
 * AniccaModal — Accessible overlay dialog with backdrop blur and slide-up animation.
 */
export function AniccaModal({
  open, onClose, title, children, footer,
  disableEscapeKey = false, disableBackdropClick = false,
  labels, className = '',
}: AniccaModalProps): React.ReactElement | null {
  const t = { ...DEFAULT_LABELS, ...labels }

  useEffect(() => {
    if (!open || disableEscapeKey) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [open, onClose, disableEscapeKey])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 backdrop-blur-[4px] flex items-center justify-center z-[1000] anicca-fade-in p-4"
      style={{ background: 'rgba(15,23,42,0.6)' } as React.CSSProperties}
      onClick={disableBackdropClick ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`bg-surface-container-lowest rounded-[22px] border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] w-full max-w-[480px] max-h-[90vh] overflow-y-auto anicca-slide-up shadow-[0_24px_70px_-20px_rgba(11,28,48,0.35),0_8px_24px_-12px_rgb(var(--primary)/0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between py-5 px-6 border-b border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)]">
            <span className="text-body-base font-semibold tracking-[-0.01em] text-on-surface">{title}</span>
            <button
              className="w-8 h-8 rounded-[10px] border-none bg-on-surface/[0.05] text-secondary text-[1.1rem] cursor-pointer flex items-center justify-center transition-all duration-150 font-[inherit] hover:bg-[#e2e8f0] hover:text-[#1e293b] dark:bg-[#334155] dark:text-[#94a3b8] dark:hover:bg-[#475569] dark:hover:text-on-surface"
              onClick={onClose}
              aria-label={t.close}
            >×</button>
          </div>
        )}
        <div className="p-6 text-on-surface">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 py-4 px-6 border-t border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
