import React, { useMemo } from 'react'
import { AniccaTheme, ANICCA_THEME_CSS_VAR_MAP } from './types'

/**
 * Props for AniccaThemeProvider.
 */
export interface AniccaThemeProviderProps {
  /** Partial theme overrides; any token omitted falls back to library default. */
  theme?: AniccaTheme
  /** Wrapper element tag (default "div"). Use "span" if mounting inline. */
  as?: keyof React.JSX.IntrinsicElements
  /** Additional CSS class on the wrapper element. */
  className?: string
  children: React.ReactNode
}

function themeToCSSVars(theme?: AniccaTheme): React.CSSProperties {
  if (!theme) return {}
  const style: Record<string, string> = {}
  for (const key of Object.keys(theme) as (keyof AniccaTheme)[]) {
    const value = theme[key]
    if (value !== undefined) {
      style[ANICCA_THEME_CSS_VAR_MAP[key]] = value
    }
  }
  return style as React.CSSProperties
}

/**
 * AniccaThemeProvider — Wrap children to override AniccaUI design tokens
 * via CSS custom properties. Multiple providers can be nested for scoped overrides.
 *
 * @example
 * ```tsx
 * // Purple primary theme (RGB channels format)
 * <AniccaThemeProvider theme={{ primary: '124 58 237' }}>
 *   <AniccaStatCard title="Sales" value={42} />
 * </AniccaThemeProvider>
 * ```
 */
export function AniccaThemeProvider({
  theme,
  as = 'div',
  className,
  children,
}: AniccaThemeProviderProps): React.ReactElement {
  const style = useMemo(() => themeToCSSVars(theme), [theme])
  const Tag = as as React.ElementType
  return (
    <Tag style={style} className={className} data-anicca-theme="">
      {children}
    </Tag>
  )
}
