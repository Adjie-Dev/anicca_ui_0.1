import React, { useState, useRef, useEffect, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'

export type AniccaTooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface AniccaTooltipProps {
  content: React.ReactNode
  placement?: AniccaTooltipPlacement
  /** Show delay in ms. Default 200. */
  delay?: number
  /** Disable tooltip behavior (still renders children). */
  disabled?: boolean
  /** Force open (controlled). */
  open?: boolean
  children: React.ReactElement
  className?: string
}

const OFFSET = 8

/**
 * AniccaTooltip — Hover/focus tooltip that portals to body, follows trigger position.
 * Wraps a single child element.
 */
export function AniccaTooltip({
  content, placement = 'top', delay = 200, disabled, open: controlledOpen, children, className = '',
}: AniccaTooltipProps): React.ReactElement {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const triggerRef = useRef<HTMLElement>(null)
  const timer = useRef<number>()
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  const show = () => {
    if (disabled) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setInternalOpen(true), delay)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    setInternalOpen(false)
  }

  useEffect(() => {
    if (!open || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
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
    void rect
    window.addEventListener('scroll', compute, true)
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute, true)
      window.removeEventListener('resize', compute)
    }
  }, [open, placement])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!isValidElement(children)) return children

  const childProps = children.props as Record<string, unknown>
  const trigger = cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement) => {
      ;(triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
      const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref
      if (typeof childRef === 'function') childRef(node)
      else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    onMouseEnter: (e: React.MouseEvent) => { show(); (childProps.onMouseEnter as ((e: React.MouseEvent) => void))?.(e) },
    onMouseLeave: (e: React.MouseEvent) => { hide(); (childProps.onMouseLeave as ((e: React.MouseEvent) => void))?.(e) },
    onFocus: (e: React.FocusEvent) => { show(); (childProps.onFocus as ((e: React.FocusEvent) => void))?.(e) },
    onBlur: (e: React.FocusEvent) => { hide(); (childProps.onBlur as ((e: React.FocusEvent) => void))?.(e) },
  })

  const transform: Record<AniccaTooltipPlacement, string> = {
    top: 'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left: 'translate(-100%, -50%)',
    right: 'translate(0, -50%)',
  }

  const portal = open && pos && typeof document !== 'undefined' ? createPortal(
    <div
      role="tooltip"
      className={`fixed z-[2100] pointer-events-none anicca-fade-in ${className}`}
      style={{ top: pos.top, left: pos.left, transform: transform[placement] }}
    >
      <div className="bg-text text-surface text-[0.75rem] font-medium px-2.5 py-1.5 rounded-xs shadow-md leading-tight max-w-[240px] dark:bg-surface-container dark:text-text">
        {content}
      </div>
    </div>,
    document.body
  ) : null

  return <>{trigger}{portal}</>
}
