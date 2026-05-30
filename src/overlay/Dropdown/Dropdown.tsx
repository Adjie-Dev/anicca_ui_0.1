import React, { useState, useRef, useEffect, cloneElement, isValidElement, useCallback } from 'react'
import { createPortal } from 'react-dom'

export type AniccaDropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface AniccaDropdownProps {
  /** Element rendered inside dropdown panel. */
  content: React.ReactNode
  placement?: AniccaDropdownPlacement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Match panel width to trigger width. */
  matchTriggerWidth?: boolean
  /** Trigger element (any clickable). */
  children: React.ReactElement
  className?: string
}

const OFFSET = 6

/**
 * AniccaDropdown — Click-toggle popover anchored to a trigger element. Closes on outside click + Escape.
 * Pair with AniccaMenu for menu-style items.
 */
export function AniccaDropdown({
  content, placement = 'bottom-start', open: controlledOpen, onOpenChange,
  matchTriggerWidth, children, className = '',
}: AniccaDropdownProps): React.ReactElement {
  const isControlled = controlledOpen !== undefined
  const [internal, setInternal] = useState(false)
  const open = isControlled ? controlledOpen : internal
  const triggerRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setInternal(next)
    onOpenChange?.(next)
  }, [isControlled, onOpenChange])

  useEffect(() => {
    if (!open || !triggerRef.current) return
    const compute = () => {
      const r = triggerRef.current!.getBoundingClientRect()
      const isBottom = placement.startsWith('bottom')
      const isEnd = placement.endsWith('end')
      const top = (isBottom ? r.bottom + OFFSET : r.top - OFFSET) + window.scrollY
      const left = (isEnd ? r.right : r.left) + window.scrollX
      setPos({ top, left, width: r.width })
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
      const t = e.target as Node
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

  if (!isValidElement(children)) return children

  const childProps = children.props as Record<string, unknown>
  const trigger = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node
      const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref
      if (typeof childRef === 'function') childRef(node)
      else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    'aria-expanded': open,
    'aria-haspopup': 'menu',
    onClick: (e: React.MouseEvent) => {
      setOpen(!open)
      ;(childProps.onClick as ((e: React.MouseEvent) => void))?.(e)
    },
  })

  const isEnd = placement.endsWith('end')
  const isTop = placement.startsWith('top')

  const portal = open && pos && typeof document !== 'undefined' ? createPortal(
    <div
      ref={panelRef}
      role="menu"
      className={`fixed z-[2050] anicca-fade-in ${className}`}
      style={{
        top: pos.top,
        left: pos.left,
        transform: `translate(${isEnd ? '-100%' : '0'}, ${isTop ? '-100%' : '0'})`,
        minWidth: matchTriggerWidth ? pos.width : 180,
      }}
    >
      <div className="bg-surface border border-border rounded-lg shadow-md py-1.5 max-h-[60vh] overflow-y-auto dark:bg-surface dark:border-border">
        {content}
      </div>
    </div>,
    document.body
  ) : null

  return <>{trigger}{portal}</>
}
