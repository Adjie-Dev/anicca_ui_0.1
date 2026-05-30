import React, { useState, useRef, useEffect, useId, useMemo } from 'react'

export interface AniccaComboboxOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface AniccaComboboxLabels {
  noResults?: string
  searchPlaceholder?: string
}

export interface AniccaComboboxProps {
  options: AniccaComboboxOption[]
  /** Selected value (controlled). */
  value?: string
  /** Initial value (uncontrolled). */
  defaultValue?: string
  onChange?: (value: string) => void
  /** Override built-in filter. Receives query + option, returns boolean. */
  filter?: (query: string, option: AniccaComboboxOption) => boolean
  /** Custom renderer for each option in the panel. */
  renderOption?: (option: AniccaComboboxOption, isActive: boolean) => React.ReactNode
  label?: string
  helper?: string
  error?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  /** Allow free-text input (not constrained to options). */
  allowCustomValue?: boolean
  labels?: AniccaComboboxLabels
  wrapperClassName?: string
  className?: string
}

const DEFAULT_LABELS: Required<AniccaComboboxLabels> = {
  noResults: 'No results',
  searchPlaceholder: 'Type to search...',
}

const defaultFilter = (q: string, opt: AniccaComboboxOption) =>
  opt.label.toLowerCase().includes(q.toLowerCase())

/**
 * AniccaCombobox — Searchable select with keyboard navigation. Filters options as user types.
 */
export function AniccaCombobox({
  options, value, defaultValue, onChange, filter = defaultFilter, renderOption,
  label, helper, error, placeholder, required, disabled, allowCustomValue,
  labels, wrapperClassName = '', className = '',
}: AniccaComboboxProps): React.ReactElement {
  const t = { ...DEFAULT_LABELS, ...labels }
  const id = useId()
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const current = isControlled ? value : internal
  const selected = options.find((o) => o.value === current)

  const [query, setQuery] = useState(selected?.label ?? '')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) setQuery(selected.label)
    else if (!allowCustomValue) setQuery('')
  }, [selected, allowCustomValue])

  const filtered = useMemo(
    () => options.filter((o) => filter(query, o)),
    [options, query, filter]
  )

  useEffect(() => { setActiveIndex(0) }, [query, open])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const select = (opt: AniccaComboboxOption) => {
    if (opt.disabled) return
    if (!isControlled) setInternal(opt.value)
    onChange?.(opt.value)
    setQuery(opt.label)
    setOpen(false)
    inputRef.current?.blur()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[activeIndex]
      if (opt) select(opt)
      else if (allowCustomValue) {
        if (!isControlled) setInternal(query)
        onChange?.(query)
        setOpen(false)
      }
    }
    else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur() }
  }

  return (
    <div ref={containerRef} className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="text-[0.78rem] font-semibold text-text">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={open ? `${id}-opt-${activeIndex}` : undefined}
          autoComplete="off"
          disabled={disabled}
          required={required}
          value={query}
          placeholder={placeholder ?? t.searchPlaceholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-invalid={error ? true : undefined}
          className={`w-full h-10 px-3 pr-9 text-[0.875rem] bg-surface border border-border rounded-lg text-text placeholder:text-text-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:ring-[var(--anicca-ring-width)] focus:ring-primary/20 dark:bg-surface dark:border-border dark:text-text dark:placeholder:text-text-subtle dark:focus:border-primary ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''} ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-muted dark:bg-surface-container' : ''} ${className}`}
        />
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {open && (
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            className="absolute z-[2000] top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-md max-h-[260px] overflow-y-auto py-1.5 dark:bg-surface dark:border-border"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-[0.82rem] text-text-subtle">{t.noResults}</li>
            ) : filtered.map((opt, i) => {
              const isActive = i === activeIndex
              const isSelected = opt.value === current
              return (
                <li
                  key={opt.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => { e.preventDefault(); select(opt) }}
                  className={`px-3 py-2 cursor-pointer text-[0.85rem] flex flex-col gap-0.5 ${isActive ? 'bg-surface-muted' : ''} ${isSelected ? 'text-primary font-semibold' : 'text-text'} ${opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {renderOption ? renderOption(opt, isActive) : (
                    <>
                      <span>{opt.label}</span>
                      {opt.description && <span className="text-[0.72rem] text-text-muted">{opt.description}</span>}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {error ? (
        <span className="text-[0.72rem] text-danger font-medium">{error}</span>
      ) : helper ? (
        <span className="text-[0.72rem] text-text-muted">{helper}</span>
      ) : null}
    </div>
  )
}
