import { useMemo } from 'react'
import {
  aniccaDebounce,
  aniccaThrottle,
  aniccaTruncate,
  aniccaCopyToClipboard,
  aniccaSlugify,
  aniccaCapitalize,
  aniccaDeepClone,
  aniccaFlattenObject,
  aniccaGroupBy,
  aniccaUniqueBy,
} from '../../functions'

/**
 * Return type for useAniccaUtils hook.
 */
export interface UseAniccaUtilsReturn {
  /** Create a debounced function */
  debounce: typeof aniccaDebounce
  /** Create a throttled function */
  throttle: typeof aniccaThrottle
  /** Truncate a string */
  truncate: typeof aniccaTruncate
  /** Copy text to clipboard */
  copyToClipboard: typeof aniccaCopyToClipboard
  /** Convert string to slug */
  slugify: typeof aniccaSlugify
  /** Capitalize first letter */
  capitalize: typeof aniccaCapitalize
  /** Deep clone an object */
  deepClone: typeof aniccaDeepClone
  /** Flatten nested object */
  flattenObject: typeof aniccaFlattenObject
  /** Group array by key */
  groupBy: typeof aniccaGroupBy
  /** Remove duplicates by key */
  uniqueBy: typeof aniccaUniqueBy
}

/**
 * useAniccaUtils — A hook that provides access to all utility functions
 * as a memoized object for convenient use in React components.
 *
 * @returns Object containing all utility functions
 *
 * @example
 * ```tsx
 * const { slugify, truncate, copyToClipboard } = useAniccaUtils()
 * const slug = slugify('Hello World')
 * ```
 */
export function useAniccaUtils(): UseAniccaUtilsReturn {
  return useMemo(
    () => ({
      debounce: aniccaDebounce,
      throttle: aniccaThrottle,
      truncate: aniccaTruncate,
      copyToClipboard: aniccaCopyToClipboard,
      slugify: aniccaSlugify,
      capitalize: aniccaCapitalize,
      deepClone: aniccaDeepClone,
      flattenObject: aniccaFlattenObject,
      groupBy: aniccaGroupBy,
      uniqueBy: aniccaUniqueBy,
    }),
    []
  )
}
