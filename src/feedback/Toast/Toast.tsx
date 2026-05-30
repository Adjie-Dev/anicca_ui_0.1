import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type AniccaToastVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
export type AniccaToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface AniccaToast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: AniccaToastVariant
  /** Milliseconds before auto-dismiss. 0 = stay until manually closed. */
  duration?: number
  /** Optional action button rendered on the right. */
  action?: { label: string; onClick: () => void }
}

interface ToastContextValue {
  toasts: AniccaToast[]
  push: (toast: Omit<AniccaToast, 'id'> & { id?: string }) => string
  dismiss: (id: string) => void
  clear: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface AniccaToastProviderProps {
  position?: AniccaToastPosition
  /** Default duration for toasts that don't specify one. */
  defaultDuration?: number
  /** Maximum visible toasts; older are dropped. */
  max?: number
  children: React.ReactNode
}

const POSITION: Record<AniccaToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
}

const VARIANT: Record<AniccaToastVariant, string> = {
  info: 'border-info',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-danger',
  neutral: 'border-border',
}

let counter = 0

/**
 * AniccaToastProvider — Wrap your app to enable toast notifications via `useAniccaToast()`.
 */
export function AniccaToastProvider({
  position = 'top-right', defaultDuration = 4000, max = 5, children,
}: AniccaToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<AniccaToast[]>([])
  const timers = useRef<Map<string, number>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const tid = timers.current.get(id)
    if (tid) { window.clearTimeout(tid); timers.current.delete(id) }
  }, [])

  const push: ToastContextValue['push'] = useCallback((toast) => {
    const id = toast.id ?? `t-${++counter}`
    const duration = toast.duration ?? defaultDuration
    setToasts((prev) => {
      const next = [...prev, { ...toast, id, duration }]
      return next.length > max ? next.slice(next.length - max) : next
    })
    if (duration > 0) {
      const tid = window.setTimeout(() => dismiss(id), duration)
      timers.current.set(id, tid)
    }
    return id
  }, [defaultDuration, dismiss, max])

  const clear = useCallback(() => {
    timers.current.forEach((tid) => window.clearTimeout(tid))
    timers.current.clear()
    setToasts([])
  }, [])

  useEffect(() => () => { timers.current.forEach((tid) => window.clearTimeout(tid)) }, [])

  const portal = typeof document !== 'undefined' ? createPortal(
    <div
      aria-live="polite"
      aria-atomic="true"
      className={`fixed z-[2000] flex flex-col gap-2 pointer-events-none ${POSITION[position]}`}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto anicca-slide-up bg-surface border-l-4 ${VARIANT[t.variant ?? 'neutral']} border border-border rounded-lg shadow-md min-w-[280px] max-w-[420px] p-4 flex items-start gap-3`}
        >
          <div className="flex-1 min-w-0">
            {t.title && <div className="font-semibold text-[0.88rem] text-text">{t.title}</div>}
            {t.description && <div className="text-[0.8rem] text-text-muted mt-0.5 leading-snug">{t.description}</div>}
          </div>
          {t.action && (
            <button
              type="button"
              onClick={() => { t.action!.onClick(); dismiss(t.id) }}
              className="text-[0.78rem] font-semibold text-primary hover:underline shrink-0"
            >
              {t.action.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss"
            className="shrink-0 w-5 h-5 inline-flex items-center justify-center text-text-subtle hover:text-text transition-colors"
          >×</button>
        </div>
      ))}
    </div>,
    document.body
  ) : null

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss, clear }}>
      {children}
      {portal}
    </ToastContext.Provider>
  )
}

/**
 * useAniccaToast — Returns toast controls. Must be used inside AniccaToastProvider.
 *
 * @example
 * const toast = useAniccaToast()
 * toast.push({ title: 'Saved!', variant: 'success' })
 */
export function useAniccaToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useAniccaToast must be used inside <AniccaToastProvider>')
  return ctx
}
