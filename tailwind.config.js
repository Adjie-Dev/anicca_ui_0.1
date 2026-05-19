/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'a-primary': 'var(--anicca-primary)',
        'a-primary-fg': 'var(--anicca-primary-fg)',
        'a-primary-soft': 'var(--anicca-primary-soft)',
        'a-success': 'var(--anicca-success)',
        'a-success-bg': 'var(--anicca-success-bg)',
        'a-danger': 'var(--anicca-danger)',
        'a-danger-bg': 'var(--anicca-danger-bg)',
        'a-warning': 'var(--anicca-warning)',
        'a-warning-bg': 'var(--anicca-warning-bg)',
        'a-info': 'var(--anicca-info)',
        'a-info-bg': 'var(--anicca-info-bg)',
        'a-surface': 'var(--anicca-surface)',
        'a-surface-muted': 'var(--anicca-surface-muted)',
        'a-surface-dark': 'var(--anicca-surface-dark)',
        'a-surface-dark-2': 'var(--anicca-surface-dark-2)',
        'a-surface-dark-fg': 'var(--anicca-surface-dark-fg)',
        'a-surface-dark-fg-muted': 'var(--anicca-surface-dark-fg-muted)',
        'a-border': 'var(--anicca-border)',
        'a-border-strong': 'var(--anicca-border-strong)',
        'a-border-dark': 'var(--anicca-border-dark)',
        'a-text': 'var(--anicca-text)',
        'a-text-muted': 'var(--anicca-text-muted)',
        'a-text-subtle': 'var(--anicca-text-subtle)',
      },
      borderRadius: {
        'a': 'var(--anicca-radius)',
        'a-sm': 'var(--anicca-radius-sm)',
        'a-lg': 'var(--anicca-radius-lg)',
      },
      boxShadow: {
        'a-sm': 'var(--anicca-shadow-sm)',
        'a-md': 'var(--anicca-shadow-md)',
        'a-lg': 'var(--anicca-shadow-lg)',
      },
    },
  },
  plugins: [],
}
