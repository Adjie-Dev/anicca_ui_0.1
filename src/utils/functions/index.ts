/**
 * Creates a debounced version of a function that delays execution
 * until after the specified delay has elapsed since the last call.
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```ts
 * const debouncedSearch = aniccaDebounce((query) => search(query), 300)
 * ```
 */
export function aniccaDebounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Creates a throttled version of a function that executes
 * at most once per specified time limit.
 *
 * @param fn - Function to throttle
 * @param limit - Minimum interval in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```ts
 * const throttledScroll = aniccaThrottle(handleScroll, 200)
 * ```
 */
export function aniccaThrottle<T extends (...args: never[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastRun = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastRun >= limit) {
      lastRun = now
      fn(...args)
    }
  }
}

/**
 * Truncates a string to the specified length and appends a suffix.
 *
 * @param str - String to truncate
 * @param length - Maximum length before truncation
 * @param suffix - Suffix to append (default: "...")
 * @returns Truncated string
 */
export function aniccaTruncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str
  return str.slice(0, length) + suffix
}

/**
 * Copies text to the clipboard using the Clipboard API with
 * a fallback to execCommand for older browsers.
 *
 * @param text - Text to copy
 * @returns Promise resolving to true on success, false on failure
 */
export async function aniccaCopyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @param str - String to slugify
 * @returns Slugified string
 *
 * @example
 * ```ts
 * aniccaSlugify('Hello World!') // "hello-world"
 * ```
 */
export function aniccaSlugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function aniccaCapitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Creates a deep clone of an object.
 * Uses structuredClone if available, falls back to JSON serialization.
 *
 * @param obj - Object to clone
 * @returns Deep clone of the object
 */
export function aniccaDeepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj)
  }
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Flattens a nested object into a single-level object with dot-notation keys.
 *
 * @param obj - Object to flatten
 * @param prefix - Key prefix for recursion
 * @returns Flattened object
 *
 * @example
 * ```ts
 * aniccaFlattenObject({ a: { b: { c: 1 } } })
 * // { 'a.b.c': 1 }
 * ```
 */
export function aniccaFlattenObject(
  obj: Record<string, unknown>,
  prefix: string = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, aniccaFlattenObject(value as Record<string, unknown>, fullKey))
    } else {
      result[fullKey] = value
    }
  }
  return result
}

/**
 * Groups an array of objects by a specified key.
 *
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Object with grouped arrays
 *
 * @example
 * ```ts
 * aniccaGroupBy([{ role: 'admin', name: 'A' }, { role: 'user', name: 'B' }], 'role')
 * // { admin: [{ role: 'admin', name: 'A' }], user: [{ role: 'user', name: 'B' }] }
 * ```
 */
export function aniccaGroupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  const result: Record<string, T[]> = {}
  for (const item of array) {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
  }
  return result
}

/**
 * Returns a new array with duplicates removed based on a key property.
 * Keeps the first occurrence of each unique key value.
 *
 * @param array - Array to deduplicate
 * @param key - Key to check for uniqueness
 * @returns Deduplicated array
 */
export function aniccaUniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set<unknown>()
  return array.filter((item) => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}
