import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AniccaSidebar } from './Sidebar'

const meta: Meta<typeof AniccaSidebar> = {
  title: 'Dashboard/Sidebar',
  component: AniccaSidebar,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof AniccaSidebar>

const items = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Analytics', icon: '📈', href: '/analytics', children: [
    { label: 'Overview', href: '/analytics/overview' },
    { label: 'Reports', href: '/analytics/reports' },
  ]},
  { label: 'Settings', icon: '⚙️', href: '/settings' },
]

export const Default: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <div style={{ display: 'flex' }}>
        <AniccaSidebar
          items={items}
          activePath="/"
          collapsed={collapsed}
          onCollapse={setCollapsed}
          logo={<span style={{ color: 'var(--anicca-surface-dark-fg)', fontWeight: 700 }}>ANICCA</span>}
        />
        <div style={{ flex: 1, padding: 24 }}>Page content here</div>
      </div>
    )
  },
}

export const I18nIndonesian: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <AniccaSidebar
        items={items}
        activePath="/"
        labels={{ expand: 'Buka sidebar', collapse: 'Tutup sidebar', navigation: 'Navigasi' }}
      />
      <div style={{ flex: 1, padding: 24 }}>Konten halaman</div>
    </div>
  ),
}
