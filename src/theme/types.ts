/**
 * AniccaTheme — Token overrides for the AniccaUI design system.
 *
 * Pass partial values to `AniccaThemeProvider` to rebrand components
 * without touching CSS. Any token omitted keeps the library default.
 */
export interface AniccaTheme {
  primary?: string
  primaryFg?: string
  primarySoft?: string

  success?: string
  successBg?: string
  danger?: string
  dangerBg?: string
  warning?: string
  warningBg?: string
  info?: string
  infoBg?: string

  surface?: string
  surfaceMuted?: string
  surfaceOverlay?: string
  surfaceDark?: string
  surfaceDark2?: string
  surfaceDarkFg?: string
  surfaceDarkFgMuted?: string

  border?: string
  borderStrong?: string
  borderDark?: string

  text?: string
  textMuted?: string
  textSubtle?: string

  radius?: string
  radiusSm?: string
  radiusLg?: string

  shadowSm?: string
  shadowMd?: string
  shadowLg?: string
}

export const ANICCA_THEME_CSS_VAR_MAP: Record<keyof AniccaTheme, string> = {
  primary: '--anicca-primary',
  primaryFg: '--anicca-primary-fg',
  primarySoft: '--anicca-primary-soft',
  success: '--anicca-success',
  successBg: '--anicca-success-bg',
  danger: '--anicca-danger',
  dangerBg: '--anicca-danger-bg',
  warning: '--anicca-warning',
  warningBg: '--anicca-warning-bg',
  info: '--anicca-info',
  infoBg: '--anicca-info-bg',
  surface: '--anicca-surface',
  surfaceMuted: '--anicca-surface-muted',
  surfaceOverlay: '--anicca-surface-overlay',
  surfaceDark: '--anicca-surface-dark',
  surfaceDark2: '--anicca-surface-dark-2',
  surfaceDarkFg: '--anicca-surface-dark-fg',
  surfaceDarkFgMuted: '--anicca-surface-dark-fg-muted',
  border: '--anicca-border',
  borderStrong: '--anicca-border-strong',
  borderDark: '--anicca-border-dark',
  text: '--anicca-text',
  textMuted: '--anicca-text-muted',
  textSubtle: '--anicca-text-subtle',
  radius: '--anicca-radius',
  radiusSm: '--anicca-radius-sm',
  radiusLg: '--anicca-radius-lg',
  shadowSm: '--anicca-shadow-sm',
  shadowMd: '--anicca-shadow-md',
  shadowLg: '--anicca-shadow-lg',
}
