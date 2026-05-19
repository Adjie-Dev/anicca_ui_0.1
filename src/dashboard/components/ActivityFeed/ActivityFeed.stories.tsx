import type { Meta, StoryObj } from '@storybook/react'
import { AniccaActivityFeed } from './ActivityFeed'

const meta: Meta<typeof AniccaActivityFeed> = {
  title: 'Dashboard/ActivityFeed',
  component: AniccaActivityFeed,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaActivityFeed>

const items = [
  { icon: '✅', message: 'Order #1042 marked as paid', time: '2 min ago' },
  { icon: '📦', message: 'Shipment #2201 dispatched', time: '15 min ago' },
  { icon: '👤', message: 'New user signed up', time: '1 h ago' },
]

export const Default: Story = { args: { items, title: 'Recent Activity' } }

export const WithLiveBadge: Story = {
  args: {
    items,
    title: 'Recent Activity',
    badge: (
      <span style={{
        fontSize: '0.68rem', padding: '0.2rem 0.55rem', borderRadius: 20,
        fontWeight: 600, background: 'var(--anicca-success-bg)', color: 'var(--anicca-success)',
      }}>● Live</span>
    ),
  },
}

export const NoHeader: Story = { args: { items } }
