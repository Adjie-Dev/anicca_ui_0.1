import React, { useEffect } from 'react'

export interface AniccaModalLabels {
  /** Aria label for the close (×) button. Default "Close". */
  close?: string
}

/**
 * Props for AniccaModal.
 */
export interface AniccaModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  /** Disable escape key dismissal. Default false. */
  disableEscapeKey?: boolean
  /** Disable backdrop click dismissal. Default false. */
  disableBackdropClick?: boolean
  /** i18n label overrides */
  labels?: AniccaModalLabels
  className?: string
}

const DEFAULT_LABELS: Required<AniccaModalLabels> = {
  close: 'Close',
}

/**
 * AniccaModal — An accessible overlay dialog with backdrop blur,
 * slide-up animation, and keyboard dismiss support.
 */
export function AniccaModal({
  open,
  onClose,
  title,
  children,
  footer,
  disableEscapeKey = false,
  disableBackdropClick = false,
  labels,
  className = '',
}: AniccaModalProps): React.ReactElement | null {
  const t = { ...DEFAULT_LABELS, ...labels }

  useEffect(() => {
    if (!open || disableEscapeKey) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
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
      style={{ background: 'var(--anicca-surface-overlay)' }}
      onClick={disableBackdropClick ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`bg-a-surface rounded-a shadow-a-lg w-full max-w-[480px] max-h-[90vh] overflow-y-auto anicca-slide-up ${className}`} onClick={e => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between py-5 px-6 border-b border-a-border">
            <span className="text-base font-bold text-a-text">{title}</span>
            <button className="w-8 h-8 rounded-lg border-none bg-a-surface-muted text-a-text-muted text-[1.1rem] cursor-pointer flex items-center justify-center transition-all duration-150 hover:bg-a-border hover:text-a-text" onClick={onClose} aria-label={t.close}>×</button>
          </div>
        )}
        <div className="p-6 text-a-text">{children}</div>
        {footer && <div className="flex justify-end gap-3 py-4 px-6 border-t border-a-border">{footer}</div>}
      </div>
    </div>
  )
}
