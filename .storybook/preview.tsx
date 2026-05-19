import React from 'react'
import type { Preview } from '@storybook/react'
import { AniccaThemeProvider, AniccaTheme } from '../src'
import '../src/dashboard/styles.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  globalTypes: {
    themePreset: {
      name: 'Theme',
      description: 'Preset theme tokens',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: ['default', 'magenta', 'emerald', 'amber'],
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const preset = ctx.globals.themePreset as string
      const themes: Record<string, AniccaTheme | undefined> = {
        default: undefined,
        magenta: { primary: '#d946ef', success: '#10b981' },
        emerald: { primary: '#10b981', primaryFg: '#ffffff' },
        amber: { primary: '#f59e0b', primaryFg: '#1f2937' },
      }
      return (
        <AniccaThemeProvider theme={themes[preset]}>
          <div style={{ minHeight: '100vh', background: 'var(--anicca-surface-muted)', padding: 24 }}>
            <Story />
          </div>
        </AniccaThemeProvider>
      )
    },
  ],
}

export default preview
