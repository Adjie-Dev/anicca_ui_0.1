import React, { forwardRef, useId, useEffect, useRef } from 'react'

export interface AniccaCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  description?: string
  error?: string
  /** Tri-state for parent/select-all UX. Visual only; doesn't change checked. */
  indeterminate?: boolean
  wrapperClassName?: string
}

/**
 * AniccaCheckbox — Custom-styled checkbox with label, indeterminate state, focus ring.
 */
export const AniccaCheckbox = forwardRef<HTMLInputElement, AniccaCheckboxProps>(function AniccaCheckbox(
  {
    label, description, error, indeterminate = false,
    id, className = '', wrapperClassName = '', disabled, checked, defaultChecked, ...rest
  },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const innerRef = useRef<HTMLInputElement | null>(null)

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node
  }

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label htmlFor={fieldId} className={`inline-flex items-start gap-2.5 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${wrapperClassName}`}>
      <span className="relative inline-flex items-center justify-center shrink-0 mt-[0.15rem]">
        <input
          ref={setRefs}
          id={fieldId}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          className={`peer appearance-none w-[18px] h-[18px] border-[1.5px] border-border-strong rounded-xs bg-surface cursor-[inherit] transition-[background-color,border-color,box-shadow] duration-150 checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary focus-visible:outline-none focus-visible:ring-[var(--anicca-ring-width)] focus-visible:ring-primary/20 dark:bg-surface dark:border-border-strong dark:checked:bg-primary dark:checked:border-primary ${error ? 'border-danger' : ''} ${className}`}
          {...rest}
        />
        <svg
          className="absolute w-3 h-3 text-primary-fg pointer-events-none opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0 transition-opacity duration-150"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute w-2.5 h-[2px] bg-primary-fg pointer-events-none opacity-0 peer-indeterminate:opacity-100" aria-hidden="true" />
      </span>
      {(label || description || error) && (
        <span className="flex flex-col gap-0.5 min-w-0">
          {label && <span className="text-[0.85rem] text-text font-medium leading-tight">{label}</span>}
          {description && !error && <span className="text-[0.75rem] text-text-muted leading-snug">{description}</span>}
          {error && <span className="text-[0.72rem] text-danger font-medium leading-snug">{error}</span>}
        </span>
      )}
    </label>
  )
})
