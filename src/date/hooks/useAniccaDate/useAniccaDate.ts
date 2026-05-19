import { useState, useCallback } from 'react'
import {
  aniccaFormat,
  aniccaDiff,
  aniccaRelative,
  aniccaAdd,
  aniccaStartOf,
  aniccaEndOf,
  aniccaIsValid,
  aniccaIsBefore,
  aniccaIsAfter,
} from '../../utils'

/**
 * Return type for useAniccaDate hook.
 */
export interface UseAniccaDateReturn {
  /** Current date state */
  date: Date | null
  /** Set the date state */
  setDate: (date: Date | string | null) => void
  /** Format the current date */
  format: (format: string, locale?: 'id' | 'en') => string
  /** Get difference between current date and another date */
  diff: (date2: Date | string, unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'months' | 'years') => number
  /** Get relative time string */
  relative: (locale?: 'id' | 'en') => string
  /** Add time to current date (returns new Date, does not mutate state) */
  add: (amount: number, unit: 'days' | 'hours' | 'minutes' | 'months' | 'years') => Date
  /** Get start of unit for current date */
  startOf: (unit: 'day' | 'week' | 'month' | 'year') => Date
  /** Get end of unit for current date */
  endOf: (unit: 'day' | 'week' | 'month' | 'year') => Date
  /** Check if current date is valid */
  isValid: () => boolean
  /** Check if current date is before another date */
  isBefore: (date2: Date | string) => boolean
  /** Check if current date is after another date */
  isAfter: (date2: Date | string) => boolean
}

/**
 * useAniccaDate — A hook for date manipulation providing format,
 * diff, relative time, arithmetic, and comparison operations.
 *
 * @param initialDate - Initial date value (default: null)
 * @returns Date state and manipulation methods
 *
 * @example
 * ```tsx
 * const { date, setDate, format, relative } = useAniccaDate(new Date())
 * const formatted = format('dddd, DD MMMM YYYY', 'id')
 * const rel = relative('id') // "baru saja"
 * ```
 */
export function useAniccaDate(initialDate?: Date | string | null): UseAniccaDateReturn {
  const [date, setDateState] = useState<Date | null>(() => {
    if (initialDate === null || initialDate === undefined) return null
    const d = typeof initialDate === 'string' ? new Date(initialDate) : initialDate
    return isNaN(d.getTime()) ? null : d
  })

  const setDate = useCallback((newDate: Date | string | null) => {
    if (newDate === null) {
      setDateState(null)
      return
    }
    const d = typeof newDate === 'string' ? new Date(newDate) : newDate
    setDateState(isNaN(d.getTime()) ? null : d)
  }, [])

  const format = useCallback(
    (fmt: string, locale: 'id' | 'en' = 'en'): string => {
      if (!date) return ''
      return aniccaFormat(date, fmt, locale)
    },
    [date]
  )

  const diff = useCallback(
    (date2: Date | string, unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'months' | 'years'): number => {
      if (!date) return 0
      return aniccaDiff(date, date2, unit)
    },
    [date]
  )

  const relative = useCallback(
    (locale: 'id' | 'en' = 'en'): string => {
      if (!date) return ''
      return aniccaRelative(date, locale)
    },
    [date]
  )

  const add = useCallback(
    (amount: number, unit: 'days' | 'hours' | 'minutes' | 'months' | 'years'): Date => {
      if (!date) return new Date()
      return aniccaAdd(date, amount, unit)
    },
    [date]
  )

  const startOf = useCallback(
    (unit: 'day' | 'week' | 'month' | 'year'): Date => {
      if (!date) return new Date()
      return aniccaStartOf(date, unit)
    },
    [date]
  )

  const endOf = useCallback(
    (unit: 'day' | 'week' | 'month' | 'year'): Date => {
      if (!date) return new Date()
      return aniccaEndOf(date, unit)
    },
    [date]
  )

  const isValid = useCallback((): boolean => {
    return aniccaIsValid(date)
  }, [date])

  const isBefore = useCallback(
    (date2: Date | string): boolean => {
      if (!date) return false
      return aniccaIsBefore(date, date2)
    },
    [date]
  )

  const isAfter = useCallback(
    (date2: Date | string): boolean => {
      if (!date) return false
      return aniccaIsAfter(date, date2)
    },
    [date]
  )

  return {
    date,
    setDate,
    format,
    diff,
    relative,
    add,
    startOf,
    endOf,
    isValid,
    isBefore,
    isAfter,
  }
}
