import React, { forwardRef, useId, createContext, useContext } from 'react'

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface AniccaRadioGroupProps {
  name: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Layout direction. */
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  label?: string
  error?: string
  className?: string
  children: React.ReactNode
}

/**
 * AniccaRadioGroup — Wraps AniccaRadio items; manages name + selection state.
 */
export function AniccaRadioGroup({
  name, value, defaultValue, onChange, orientation = 'vertical', disabled,
  label, error, className = '', children,
}: AniccaRadioGroupProps): React.ReactElement {
  const [internal, setInternal] = React.useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`} role="radiogroup" aria-label={label}>
      {label && <span className="text-[0.78rem] font-semibold text-text">{label}</span>}
      <div className={`flex ${orientation === 'horizontal' ? 'flex-row gap-4 flex-wrap' : 'flex-col gap-2'}`}>
        <RadioGroupContext.Provider value={{ name, value: current, onChange: handleChange, disabled }}>
          {children}
        </RadioGroupContext.Provider>
      </div>
      {error && <span className="text-[0.72rem] text-danger font-medium">{error}</span>}
    </div>
  )
}

export interface AniccaRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  value: string
  label?: React.ReactNode
  description?: string
  wrapperClassName?: string
}

/**
 * AniccaRadio — Single radio option. Use inside AniccaRadioGroup, or standalone with `name`.
 */
export const AniccaRadio = forwardRef<HTMLInputElement, AniccaRadioProps>(function AniccaRadio(
  { value, label, description, id, className = '', wrapperClassName = '', disabled, ...rest },
  ref
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const group = useContext(RadioGroupContext)
  const isDisabled = disabled || group?.disabled
  const checked = group ? group.value === value : rest.checked

  return (
    <label htmlFor={fieldId} className={`inline-flex items-start gap-2.5 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${wrapperClassName}`}>
      <span className="relative inline-flex items-center justify-center shrink-0 mt-[0.15rem]">
        <input
          ref={ref}
          id={fieldId}
          type="radio"
          name={group?.name ?? rest.name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={(e) => { group?.onChange?.(value); rest.onChange?.(e) }}
          className={`peer appearance-none w-[18px] h-[18px] border-[1.5px] border-border-strong rounded-full bg-surface cursor-[inherit] transition-[border-color,box-shadow] duration-150 checked:border-primary focus-visible:outline-none focus-visible:ring-[var(--anicca-ring-width)] focus-visible:ring-primary/20 dark:bg-surface dark:border-border-strong dark:checked:border-primary ${className}`}
          {...rest}
        />
        <span className="absolute w-[8px] h-[8px] rounded-full bg-primary pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150" aria-hidden="true" />
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5 min-w-0">
          {label && <span className="text-[0.85rem] text-text font-medium leading-tight">{label}</span>}
          {description && <span className="text-[0.75rem] text-text-muted leading-snug">{description}</span>}
        </span>
      )}
    </label>
  )
})
