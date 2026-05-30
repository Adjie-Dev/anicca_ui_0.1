import React, { forwardRef, useId } from 'react'

export interface AniccaSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface AniccaSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helper?: string
  error?: string
  /** Options to render. If `children` is provided, takes precedence. */
  options?: AniccaSelectOption[]
  /** Placeholder shown when value is empty. Rendered as disabled hidden option. */
  placeholder?: string
  selectSize?: 'sm' | 'md' | 'lg'
  wrapperClassName?: string
}

const SIZES = {
  sm: 'h-8 text-[0.8rem] rounded-lg pl-3 pr-8',
  md: 'h-10 text-[0.875rem] rounded-lg pl-3 pr-9',
  lg: 'h-12 text-[0.95rem] rounded-a pl-4 pr-10',
}

/**
 * AniccaSelect — Native select with label, helper/error, custom caret.
 * Uses native `<select>` for full a11y + mobile keyboard support.
 */
export const AniccaSelect = forwardRef<HTMLSelectElement, AniccaSelectProps>(function AniccaSelect(
  {
    label,
    helper,
    error,
    required,
    options,
    placeholder,
    selectSize = 'md',
    id,
    className = '',
    wrapperClassName = '',
    disabled,
    children,
    value,
    defaultValue,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={fieldId} className="text-[0.78rem] font-semibold text-text">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          value={value}
          defaultValue={defaultValue ?? (placeholder && value === undefined ? '' : undefined)}
          className={`appearance-none w-full bg-surface border border-border text-text outline-none cursor-pointer transition-[border-color,box-shadow] duration-200 ease-out focus:border-primary focus:ring-[var(--anicca-ring-width)] focus:ring-primary/20 font-[inherit] dark:bg-surface dark:border-border dark:text-text dark:focus:border-primary ${SIZES[selectSize]} ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''} ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-muted dark:bg-surface-container' : ''} ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {children ?? options?.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? (
        <span className="text-[0.72rem] text-danger font-medium">{error}</span>
      ) : helper ? (
        <span className="text-[0.72rem] text-text-muted">{helper}</span>
      ) : null}
    </div>
  )
})
