/**
 * AniccaTheme — Token overrides for the AniccaUI design system.
 *
 * Values must be space-separated RGB channels (no rgb() wrapper)
 * to support Tailwind opacity modifiers.
 *
 * @example
 * ```tsx
 * <AniccaThemeProvider theme={{ primary: '124 58 237' }}>
 *   <App />
 * </AniccaThemeProvider>
 * ```
 */
export interface AniccaTheme {
  primary?: string
  'on-primary'?: string
  'primary-container'?: string
  secondary?: string
  'secondary-container'?: string
  'on-secondary-container'?: string
  tertiary?: string
  error?: string
  surface?: string
  'surface-container-lowest'?: string
  'surface-container-low'?: string
  'surface-container'?: string
  'surface-container-high'?: string
  'surface-container-highest'?: string
  'on-surface'?: string
  'on-surface-variant'?: string
  outline?: string
  'outline-variant'?: string
  background?: string
  'sidebar-bg'?: string
  violet?: string
  amber?: string
}

export const ANICCA_THEME_CSS_VAR_MAP: Record<keyof AniccaTheme, string> = {
  primary:                    '--primary',
  'on-primary':               '--on-primary',
  'primary-container':        '--primary-container',
  secondary:                  '--secondary',
  'secondary-container':      '--secondary-container',
  'on-secondary-container':   '--on-secondary-container',
  tertiary:                   '--tertiary',
  error:                      '--error',
  surface:                    '--surface',
  'surface-container-lowest': '--surface-container-lowest',
  'surface-container-low':    '--surface-container-low',
  'surface-container':        '--surface-container',
  'surface-container-high':   '--surface-container-high',
  'surface-container-highest':'--surface-container-highest',
  'on-surface':               '--on-surface',
  'on-surface-variant':       '--on-surface-variant',
  outline:                    '--outline',
  'outline-variant':          '--outline-variant',
  background:                 '--background',
  'sidebar-bg':               '--sidebar-bg',
  violet:                     '--violet',
  amber:                      '--amber',
}
