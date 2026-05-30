import React, { useState, useRef, useEffect, cloneElement, isValidElement, useCallback } from 'react'
import { createPortal } from 'react-dom'

export type AniccaPopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface AniccaPopoverProps {
  content: React.ReactNode
  placement?: AniccaPopoverPlacement
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Disable outside-click dismissal. */
  disableOutsideClick?: boolean
  /** Disable escape key dismissal. */
  disableEscapeKey?: boolean
  /** Trigger event. Default click. */
  trigger?: 'click' | 'hover'
  children: React.ReactElement
  className?: string
}

const OFFSET = 10

/**
 * AniccaPopover — Click/hover popover that portals to body. Wrap a single trigger element.
 */
export function AniccaPopover({
  content, placement = 'bottom', open: controlledOpen, onOpenChange,
  disableOutsideClick, disableEscapeKey, trigger = 'click', children, className = '',
}: AniccaPopoverProps): React.ReactElement {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isControlled ? controlledOpen : internalOpen
  const triggerRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  useEffect(() => {
    if (!open || !triggerRef.current) return
    const compute = () => {
      const r = triggerRef.current!.getBoundingClientRect()
      let top = 0, left = 0
      if (placement === 'top') { top = r.top - OFFSET; left = r.left + r.width / 2 }
      else if (placement === 'bottom') { top = r.bottom + OFFSET; left = r.left + r.width / 2 }
      else if (placement === 'left') { top = r.top + r.height / 2; left = r.left - OFFSET }
      else { top = r.top + r.height / 2; left = r.right + OFFSET }
      setPos({ top: top + window.scrollY, left: left + window.scrollX })
    }
    compute()
    window.addEventListener('scroll', compute, true)
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute, true)
      window.removeEventListener('resize', compute)
    }
  }, [open, placement])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (disableOutsideClick) return
      const t = e.target as Node
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (!disableEscapeKey && e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, disableOutsideClick, disableEscapeKey, setOpen])

  if (!isValidElement(children)) return children

  const childProps = children.props as Record<string, unknown>
  const handlers: Record<string, unknown> = trigger === 'click'
    ? {
        onClick: (e: React.MouseEvent) => {
          setOpen(!open)
          ;(childProps.onClick as ((e: React.MouseEvent) => void))?.(e)
        },
      }
    : {
        onMouseEnter: (e: React.MouseEvent) => { setOpen(true); (childProps.onMouseEnter as ((e: React.MouseEvent) => void))?.(e) },
        onMouseLeave: (e: React.MouseEvent) => { setOpen(false); (childProps.onMouseLeave as ((e: React.MouseEvent) => void))?.(e) },
      }

  const triggerEl = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node
      const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref
      if (typeof childRef === 'function') childRef(node)
      else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    'aria-expanded': open,
    ...handlers,
  })

  const transform: Record<AniccaPopoverPlacement, string> = {
    top: 'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left: 'translate(-100%, -50%)',
    right: 'translate(0, -50%)',
  }

  const portal = open && pos && typeof document !== 'undefined' ? createPortal(
    <div
      ref={panelRef}
      role="dialog"
      className={`fixed z-[2050] anicca-fade-in ${className}`}
      style={{ top: pos.top, left: pos.left, transform: transform[placement] }}
    >
      <div className="bg-surface border border-border rounded-lg shadow-md p-3 min-w-[180px] text-[0.85rem] text-text dark:bg-surface dark:border-border dark:text-text">
        {content}
      </div>
    </div>,
    document.body
  ) : null

  return <>{triggerEl}{portal}</>
}
