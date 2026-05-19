const ID_DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const ID_MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function toDate(date: Date | string): Date {
  return typeof date === 'string' ? new Date(date) : new Date(date.getTime())
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

/**
 * Formats a date using token-based format string.
 *
 * Supported tokens: YYYY, MM, DD, HH, mm, ss, dddd, MMMM
 *
 * @param date - Date to format
 * @param format - Format string with tokens
 * @param locale - Locale ('id' or 'en', default 'en')
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * aniccaFormat(new Date(), 'dddd, DD MMMM YYYY', 'id')
 * // "Senin, 15 Januari 2024"
 * ```
 */
export function aniccaFormat(date: Date | string, format: string, locale: 'id' | 'en' = 'en'): string {
  const d = toDate(date)
  const days = locale === 'id' ? ID_DAYS : EN_DAYS
  const months = locale === 'id' ? ID_MONTHS : EN_MONTHS

  return format
    .replace('YYYY', d.getFullYear().toString())
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()))
    .replace('HH', pad(d.getHours()))
    .replace('mm', pad(d.getMinutes()))
    .replace('ss', pad(d.getSeconds()))
    .replace('dddd', days[d.getDay()])
    .replace('MMMM', months[d.getMonth()])
}

/**
 * Calculates the absolute difference between two dates in the specified unit.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Unit of measurement
 * @returns Absolute difference as a number
 */
export function aniccaDiff(
  date1: Date | string,
  date2: Date | string,
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'months' | 'years'
): number {
  const d1 = toDate(date1)
  const d2 = toDate(date2)

  if (unit === 'years') {
    return Math.abs(d1.getFullYear() - d2.getFullYear())
  }
  if (unit === 'months') {
    return Math.abs(
      (d1.getFullYear() - d2.getFullYear()) * 12 + (d1.getMonth() - d2.getMonth())
    )
  }

  const diffMs = Math.abs(d1.getTime() - d2.getTime())
  const divisors: Record<string, number> = {
    seconds: 1000,
    minutes: 60000,
    hours: 3600000,
    days: 86400000,
  }
  return Math.floor(diffMs / divisors[unit])
}

/**
 * Returns a human-readable relative time string.
 *
 * @param date - Date to compare with now
 * @param locale - Locale ('id' or 'en', default 'en')
 * @returns Relative time string (e.g. "2 hours ago" or "2 jam lalu")
 */
export function aniccaRelative(date: Date | string, locale: 'id' | 'en' = 'en'): string {
  const d = toDate(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const isFuture = diffMs < 0
  const absDiff = Math.abs(diffMs)

  const seconds = Math.floor(absDiff / 1000)
  const minutes = Math.floor(absDiff / 60000)
  const hours = Math.floor(absDiff / 3600000)
  const days = Math.floor(absDiff / 86400000)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (locale === 'id') {
    const suffix = isFuture ? 'lagi' : 'lalu'
    if (seconds < 60) return 'baru saja'
    if (minutes < 60) return `${minutes} menit ${suffix}`
    if (hours < 24) return `${hours} jam ${suffix}`
    if (days < 7) return `${days} hari ${suffix}`
    if (weeks < 4) return `${weeks} minggu ${suffix}`
    if (months < 12) return `${months} bulan ${suffix}`
    return `${years} tahun ${suffix}`
  }

  if (seconds < 60) return 'just now'
  if (isFuture) {
    if (minutes < 60) return `in ${minutes} minutes`
    if (hours < 24) return `in ${hours} hours`
    if (days < 7) return `in ${days} days`
    if (weeks < 4) return `in ${weeks} weeks`
    if (months < 12) return `in ${months} months`
    return `in ${years} years`
  }
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 7) return `${days} days ago`
  if (weeks < 4) return `${weeks} weeks ago`
  if (months < 12) return `${months} months ago`
  return `${years} years ago`
}

/**
 * Returns the start of a time unit for the given date.
 *
 * @param date - Input date
 * @param unit - Unit to get start of
 * @returns New Date set to the start of the unit
 */
export function aniccaStartOf(date: Date | string, unit: 'day' | 'week' | 'month' | 'year'): Date {
  const d = toDate(date)
  switch (unit) {
    case 'day':
      d.setHours(0, 0, 0, 0)
      return d
    case 'week': {
      const day = d.getDay()
      d.setDate(d.getDate() - day)
      d.setHours(0, 0, 0, 0)
      return d
    }
    case 'month':
      d.setDate(1)
      d.setHours(0, 0, 0, 0)
      return d
    case 'year':
      d.setMonth(0, 1)
      d.setHours(0, 0, 0, 0)
      return d
  }
}

/**
 * Returns the end of a time unit for the given date.
 *
 * @param date - Input date
 * @param unit - Unit to get end of
 * @returns New Date set to the end of the unit
 */
export function aniccaEndOf(date: Date | string, unit: 'day' | 'week' | 'month' | 'year'): Date {
  const d = toDate(date)
  switch (unit) {
    case 'day':
      d.setHours(23, 59, 59, 999)
      return d
    case 'week': {
      const day = d.getDay()
      d.setDate(d.getDate() + (6 - day))
      d.setHours(23, 59, 59, 999)
      return d
    }
    case 'month':
      d.setMonth(d.getMonth() + 1, 0)
      d.setHours(23, 59, 59, 999)
      return d
    case 'year':
      d.setMonth(11, 31)
      d.setHours(23, 59, 59, 999)
      return d
  }
}

/**
 * Adds (or subtracts) an amount of time to a date.
 *
 * @param date - Base date
 * @param amount - Amount to add (negative to subtract)
 * @param unit - Unit of the amount
 * @returns New Date with the amount added
 */
export function aniccaAdd(
  date: Date | string,
  amount: number,
  unit: 'days' | 'hours' | 'minutes' | 'months' | 'years'
): Date {
  const d = toDate(date)
  switch (unit) {
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount)
      return d
    case 'hours':
      d.setHours(d.getHours() + amount)
      return d
    case 'days':
      d.setDate(d.getDate() + amount)
      return d
    case 'months':
      d.setMonth(d.getMonth() + amount)
      return d
    case 'years':
      d.setFullYear(d.getFullYear() + amount)
      return d
  }
}

/**
 * Checks if a value is a valid Date or parseable date string.
 *
 * @param date - Value to check
 * @returns true if valid date
 */
export function aniccaIsValid(date: unknown): boolean {
  if (date instanceof Date) return !isNaN(date.getTime())
  if (typeof date === 'string') return !isNaN(new Date(date).getTime())
  return false
}

/**
 * Checks if date1 is before date2.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if date1 is before date2
 */
export function aniccaIsBefore(date1: Date | string, date2: Date | string): boolean {
  return toDate(date1).getTime() < toDate(date2).getTime()
}

/**
 * Checks if date1 is after date2.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if date1 is after date2
 */
export function aniccaIsAfter(date1: Date | string, date2: Date | string): boolean {
  return toDate(date1).getTime() > toDate(date2).getTime()
}
