import React, { forwardRef, useId, useEffect, useRef } from 'react'

export interface AniccaTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helper?: string
  error?: string
  /** Auto-grow height to fit content. */
  autoResize?: boolean
  /** Maximum height (px) when autoResize is on. */
  maxHeight?: number
  /** Show character count below; works best with maxLength. */
  showCount?: boolean
  wrapperClassName?: string
}

/**
 * AniccaTextarea — Multi-line input with label, helper/error, auto-resize, and char counter.
 */
export const AniccaTextarea = forwardRef<HTMLTextAreaElement, AniccaTextareaProps>(function AniccaTextarea(
  {
    label,
    helper,
    error,
    required,
    autoResize = false,
    maxHeight,
    showCount = false,
    maxLength,
    id,
    className = '',
    wrapperClassName = '',
    disabled,
    onInput,
    value,
    defaultValue,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const innerRef = useRef<HTMLTextAreaElement | null>(null)

  const setRefs = (node: HTMLTextAreaElement | null) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
  }

  const resize = () => {
    const el = innerRef.current
    if (!el || !autoResize) return
    el.style.height = 'auto'
    const next = maxHeight ? Math.min(el.scrollHeight, maxHeight) : el.scrollHeight
    el.style.height = `${next}px`
  }

  useEffect(() => { resize() }, [value, defaultValue, autoResize, maxHeight])

  const count = typeof value === 'string' ? value.length : 0

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={fieldId} className="text-[0.78rem] font-semibold text-text">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={setRefs}
        id={fieldId}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        onInput={(e) => { resize(); onInput?.(e) }}
        className={`bg-surface border border-border rounded-lg px-3 py-2 text-[0.875rem] text-text placeholder:text-text-subtle outline-none resize-y transition-[border-color,box-shadow] duration-200 ease-out focus:border-primary focus:ring-[var(--anicca-ring-width)] focus:ring-primary/20 font-[inherit] dark:bg-surface dark:border-border dark:text-text dark:placeholder:text-text-subtle dark:focus:border-primary ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''} ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-muted dark:bg-surface-container' : ''} ${autoResize ? 'resize-none overflow-hidden' : ''} ${className}`}
        {...rest}
      />
      <div className="flex justify-between gap-3">
        <span className="text-[0.72rem] flex-1 min-w-0">
          {error ? <span className="text-danger font-medium">{error}</span> :
            helper ? <span className="text-text-muted">{helper}</span> : null}
        </span>
        {showCount && (
          <span className="text-[0.72rem] text-text-subtle tabular-nums">
            {count}{maxLength ? `/${maxLength}` : ''}
          </span>
        )}
      </div>
    </div>
  )
})
