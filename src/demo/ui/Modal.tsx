import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useToast } from './Toast'
import { useAniccaPopup } from '../../feedback/Popup'
import { Field, Icon } from './primitives'

/**
 * Action helpers shared by every interactive control: a toast, an info popup,
 * a form popup, and a delete confirm popup — all via AniccaPopupProvider.
 */
export function useActions() {
  const notify = useToast()
  const notifyPopup = useAniccaPopup()

  const info = (title: string, body: ReactNode) =>
    notifyPopup.push({
      title,
      description: body,
      variant: 'info',
      actions: [{ label: 'Close', onClick: () => {} }],
    })

  const form = (title: string, fields: string[]) =>
    notifyPopup.push({
      title,
      description: (
        <div className="flex flex-col gap-3 min-w-[280px]">
          {fields.map(f => <Field key={f} label={f} />)}
        </div>
      ),
      variant: 'neutral',
      actions: [
        { label: 'Cancel', onClick: () => {} },
        { label: 'Save', onClick: () => notify(`${title} saved`, 'success'), variant: 'primary' },
      ],
    })

  const confirm = (title: string, message: string, onConfirm: () => void) =>
    notifyPopup.push({
      title,
      description: message,
      variant: 'danger',
      actions: [
        { label: 'Cancel', onClick: () => {} },
        { label: 'Delete', onClick: onConfirm, variant: 'danger' },
      ],
    })

  return { notify, notifyPopup, info, form, confirm }
}

/**
 * The "⋮" row menu: a dropdown of actions. Rendered with fixed positioning so
 * it is never clipped by the table's overflow. Delete asks for confirmation.
 */
export function RowActions({ label }: { label: string }) {
  const { notify, confirm } = useActions()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const MENU_W = 176
  const MENU_H = 180

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [open])

  const toggle = () => {
    const r = btnRef.current?.getBoundingClientRect()
    if (r) {
      const openUp = window.innerHeight - r.bottom < MENU_H + 8
      setPos({
        top: openUp ? r.top - MENU_H - 4 : r.bottom + 4,
        left: Math.max(8, r.right - MENU_W),
      })
    }
    setOpen(o => !o)
  }

  const item = (action: () => void) => () => { setOpen(false); action() }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Actions for ${label}`}
        className="p-2 -mr-2 text-outline hover:text-on-surface transition-colors"
        onClick={toggle}
      >
        <Icon name="more_vert" className="text-[20px]" />
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          role="menu"
          style={{ position: 'fixed', top: pos.top, left: pos.left, width: MENU_W }}
          className="p-1 rounded-[14px] bg-surface-container-lowest border border-outline-variant/20 shadow-lg z-[1500]"
        >
          {['View details', 'Edit', 'Duplicate'].map(a => (
            <button key={a} role="menuitem" className="w-full text-left px-3 py-2 rounded-[10px] text-body-base text-on-surface hover:bg-primary/5 transition-colors" onClick={item(() => notify(`${a} · ${label}`))}>
              {a}
            </button>
          ))}
          <button role="menuitem" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-body-base text-error hover:bg-error/10 transition-colors" onClick={item(() => confirm(`Delete ${label}?`, 'This action cannot be undone.', () => notify(`Deleted ${label}`, 'error')))}>
            <Icon name="delete" className="text-[18px]" />Delete
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
