import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

export type Tone = 'info' | 'success' | 'error'

interface ToastEntry {
  id: number
  message: string
  tone: Tone
}

const ToastContext = createContext<(message: string, tone?: Tone) => void>(() => {})

/** Fire a transient toast from anywhere inside <ToastProvider>. */
export const useToast = () => useContext(ToastContext)

const ICON: Record<Tone, string> = { info: 'info', success: 'check_circle', error: 'error' }
const COLOR: Record<Tone, string> = {
  info: 'text-primary',
  success: 'text-tertiary',
  error: 'text-error',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])

  const notify = useCallback((message: string, tone: Tone = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, tone }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2600)
  }, [])

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="fixed bottom-6 right-6 z-[2000] flex flex-col items-end gap-2">
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className={`${card} flex items-center gap-2.5 px-4 py-3 text-label-md text-on-surface shadow-lg`}
          >
            <span className={`material-symbols-outlined text-[18px] ${COLOR[t.tone]}`}>{ICON[t.tone]}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const card = 'rounded-[14px] bg-surface-container-lowest border border-outline-variant/20'
