import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type AniccaPopupVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

export interface AniccaPopupAction {
  label: string
  onClick: () => void
  /** @default 'secondary' */
  variant?: 'primary' | 'secondary' | 'danger'
}

export interface AniccaPopup {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: AniccaPopupVariant
  /** Milliseconds before auto-dismiss. 0 = stay until dismissed. Defaults to 0 when actions present, 4000 otherwise. */
  duration?: number
  actions?: AniccaPopupAction[]
}

export interface AniccaPopupControls {
  push: (popup: Omit<AniccaPopup, 'id'> & { id?: string }) => string
  dismiss: (id: string) => void
  clear: () => void
}

const PopupContext = createContext<AniccaPopupControls | null>(null)

export interface AniccaPopupProviderProps {
  children: React.ReactNode
}

const VARIANT_TOP: Record<AniccaPopupVariant, string> = {
  info: 'border-primary',
  success: 'border-tertiary',
  warning: 'border-amber',
  danger: 'border-error',
  neutral: 'border-outline-variant',
}

const ICON_COLOR: Record<AniccaPopupVariant, string> = {
  info: 'text-primary',
  success: 'text-tertiary',
  warning: 'text-amber',
  danger: 'text-error',
  neutral: 'text-outline',
}

const ICON_PATHS: Record<AniccaPopupVariant, React.ReactElement> = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5L18 17H2L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  danger: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  neutral: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

const ACTION_CLASS: Record<NonNullable<AniccaPopupAction['variant']>, string> = {
  primary: 'bg-primary text-on-primary hover:opacity-90',
  secondary: 'bg-surface-container text-on-surface border border-outline-variant/20 hover:bg-surface-container-high',
  danger: 'bg-error text-on-error hover:opacity-90',
}

let counter = 0

/**
 * AniccaPopupProvider — Wrap your app to enable center popup notifications via `useAniccaPopup()`.
 */
export function AniccaPopupProvider({ children }: AniccaPopupProviderProps): React.ReactElement {
  const [queue, setQueue] = useState<AniccaPopup[]>([])
  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const dismiss = useCallback((id: string) => {
    clearTimer()
    setQueue((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const clear = useCallback(() => {
    clearTimer()
    setQueue([])
  }, [])

  const push: AniccaPopupControls['push'] = useCallback((popup) => {
    const id = popup.id ?? `p-${++counter}`
    const duration = popup.duration ?? (popup.actions?.length ? 0 : 4000)
    setQueue((prev) => [...prev, { ...popup, id, duration }])
    return id
  }, [])

  const current = queue[0]

  useEffect(() => {
    clearTimer()
    if (current && (current.duration ?? 0) > 0) {
      timerRef.current = window.setTimeout(() => dismiss(current.id), current.duration)
    }
    return clearTimer
  }, [current?.id, current?.duration, dismiss])

  useEffect(() => () => clearTimer(), [])

  const v = current?.variant ?? 'neutral'

  const portal =
    typeof document !== 'undefined' && current
      ? createPortal(
          <div
            className="fixed inset-0 z-[2100] flex items-center justify-center anicca-fade-in"
            aria-modal="true"
            role="dialog"
            aria-labelledby={`popup-title-${current.id}`}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => !current.actions?.length && dismiss(current.id)}
            />
            <div
              className={`relative anicca-slide-up bg-surface-container-lowest rounded-[22px] border-t-4 ${VARIANT_TOP[v]} border border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] w-full max-w-sm mx-4 shadow-[0_24px_70px_-20px_rgba(11,28,48,0.35),0_8px_24px_-12px_rgb(var(--primary)/0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)]`}
            >
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 ${ICON_COLOR[v]}`}>
                    {ICON_PATHS[v]}
                  </span>
                  <div className="flex-1 min-w-0">
                    {current.title && (
                      <div
                        id={`popup-title-${current.id}`}
                        className="font-semibold text-body-base text-on-surface"
                      >
                        {current.title}
                      </div>
                    )}
                    {current.description && (
                      <div className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                        {current.description}
                      </div>
                    )}
                  </div>
                  {!current.actions?.length && (
                    <button
                      type="button"
                      onClick={() => dismiss(current.id)}
                      aria-label="Dismiss"
                      className="shrink-0 w-7 h-7 rounded-[8px] bg-on-surface/[0.05] text-outline text-[1rem] flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-all"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              {current.actions?.length ? (
                <div className="px-5 pb-5 flex justify-end gap-2 border-t border-on-surface/[0.06] dark:border-[rgba(51,65,85,0.5)] pt-4">
                  {current.actions.map((action, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        action.onClick()
                        dismiss(current.id)
                      }}
                      className={`px-4 py-2 text-label-sm font-semibold rounded-[10px] transition-opacity ${ACTION_CLASS[action.variant ?? 'secondary']}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <PopupContext.Provider value={{ push, dismiss, clear }}>
      {children}
      {portal}
    </PopupContext.Provider>
  )
}

/**
 * useAniccaPopup — Returns popup controls. Must be used inside AniccaPopupProvider.
 *
 * @example
 * const popup = useAniccaPopup()
 * popup.push({ title: 'Hapus data?', variant: 'danger', actions: [{ label: 'Hapus', onClick: del, variant: 'danger' }, { label: 'Batal', onClick: () => {} }] })
 */
export function useAniccaPopup(): AniccaPopupControls {
  const ctx = useContext(PopupContext)
  if (!ctx) throw new Error('useAniccaPopup must be used inside <AniccaPopupProvider>')
  return ctx
}
