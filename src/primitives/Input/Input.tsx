import React, { forwardRef, useId } from 'react'

export type AniccaInputSize = 'sm' | 'md' | 'lg'

export interface AniccaInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the input. */
  label?: string
  /** Helper text below input. */
  helper?: string
  /** Error message; replaces helper and sets invalid styling. */
  error?: string
  /** Required indicator. */
  required?: boolean
  /** Element rendered inside on the leading side (icon, prefix). */
  leftAddon?: React.ReactNode
  /** Element rendered inside on the trailing side. */
  rightAddon?: React.ReactNode
  inputSize?: AniccaInputSize
  /** Apply class to root wrapper, not input element. */
  wrapperClassName?: string
}

const SIZES: Record<AniccaInputSize, string> = {
  sm: 'h-8 text-[0.8rem] rounded-lg',
  md: 'h-10 text-[0.875rem] rounded-lg',
  lg: 'h-12 text-[0.95rem] rounded-a',
}

/**
 * AniccaInput — Text input with label, helper/error states, and inline addons.
 */
export const AniccaInput = forwardRef<HTMLInputElement, AniccaInputProps>(function AniccaInput(
  {
    label,
    helper,
    error,
    required,
    leftAddon,
    rightAddon,
    inputSize = 'md',
    id,
    className = '',
    wrapperClassName = '',
    disabled,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const helperId = `${fieldId}-helper`
  const errorId = `${fieldId}-error`
  const describedBy = error ? errorId : helper ? helperId : undefined

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={fieldId} className="text-[0.78rem] font-semibold text-text">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <div
        className={`group flex items-center gap-2 bg-surface border border-border px-3 transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-primary focus-within:ring-[var(--anicca-ring-width)] focus-within:ring-primary/20 dark:bg-surface dark:border-border dark:focus-within:border-primary ${SIZES[inputSize]} ${error ? 'border-danger focus-within:border-danger focus-within:ring-danger/20' : ''} ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-muted dark:bg-surface-container' : ''}`}
      >
        {leftAddon && <span className="text-text-muted shrink-0 inline-flex items-center">{leftAddon}</span>}
        <input
          ref={ref}
          id={fieldId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          className={`flex-1 min-w-0 bg-transparent outline-none border-none text-text placeholder:text-text-subtle font-[inherit] dark:text-text dark:placeholder:text-text-subtle ${className}`}
          {...rest}
        />
        {rightAddon && <span className="text-text-muted shrink-0 inline-flex items-center">{rightAddon}</span>}
      </div>
      {error ? (
        <span id={errorId} className="text-[0.72rem] text-danger font-medium">{error}</span>
      ) : helper ? (
        <span id={helperId} className="text-[0.72rem] text-text-muted">{helper}</span>
      ) : null}
    </div>
  )
})
