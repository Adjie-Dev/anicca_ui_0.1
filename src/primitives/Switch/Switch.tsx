import React, { forwardRef, useId } from 'react'

export type AniccaSwitchSize = 'sm' | 'md' | 'lg'

export interface AniccaSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  description?: string
  switchSize?: AniccaSwitchSize
  /** Position of the label relative to switch. */
  labelPosition?: 'left' | 'right'
  wrapperClassName?: string
}

const SIZES: Record<AniccaSwitchSize, { track: string; thumb: string; translate: string }> = {
  sm: { track: 'w-8 h-[18px]', thumb: 'w-3.5 h-3.5', translate: 'peer-checked:translate-x-[14px]' },
  md: { track: 'w-10 h-[22px]', thumb: 'w-[18px] h-[18px]', translate: 'peer-checked:translate-x-[18px]' },
  lg: { track: 'w-12 h-7', thumb: 'w-6 h-6', translate: 'peer-checked:translate-x-5' },
}

/**
 * AniccaSwitch — Toggle switch with smooth thumb animation.
 */
export const AniccaSwitch = forwardRef<HTMLInputElement, AniccaSwitchProps>(function AniccaSwitch(
  {
    label, description, switchSize = 'md', labelPosition = 'right',
    id, className = '', wrapperClassName = '', disabled, ...rest
  },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const { track, thumb, translate } = SIZES[switchSize]

  const switchEl = (
    <span className={`relative inline-flex items-center shrink-0 ${track}`}>
      <input
        ref={ref}
        id={fieldId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className={`peer appearance-none w-full h-full bg-border-strong rounded-full cursor-[inherit] transition-colors duration-200 ease-out checked:bg-primary focus-visible:outline-none focus-visible:ring-[var(--anicca-ring-width)] focus-visible:ring-primary/20 dark:bg-border dark:checked:bg-primary ${className}`}
        {...rest}
      />
      <span
        className={`absolute left-0.5 ${thumb} bg-surface rounded-full transition-transform duration-200 ease-out pointer-events-none ${translate}`}
        aria-hidden="true"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}
      />
    </span>
  )

  const textEl = (label || description) && (
    <span className="flex flex-col gap-0.5 min-w-0">
      {label && <span className="text-[0.85rem] text-text font-medium leading-tight">{label}</span>}
      {description && <span className="text-[0.75rem] text-text-muted leading-snug">{description}</span>}
    </span>
  )

  return (
    <label htmlFor={fieldId} className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${wrapperClassName}`}>
      {labelPosition === 'left' && textEl}
      {switchEl}
      {labelPosition === 'right' && textEl}
    </label>
  )
})
