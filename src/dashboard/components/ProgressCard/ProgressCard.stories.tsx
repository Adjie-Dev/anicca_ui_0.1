import type { Meta, StoryObj } from '@storybook/react'
import { AniccaProgressCard } from './ProgressCard'

const meta: Meta<typeof AniccaProgressCard> = {
  title: 'Dashboard/ProgressCard',
  component: AniccaProgressCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaProgressCard>

const items = [
  { name: 'Redesign landing', progress: 72, color: '#3b82f6', status: 'On track', team: ['#0ea5e9', '#f97316'] },
  { name: 'Migrate to v2 API', progress: 35, color: '#10b981', status: '5 days left', team: ['#a855f7'] },
  { name: 'Q3 planning', progress: 95, color: '#f59e0b', status: 'Final review' },
]

export const Default: Story = { args: { items, title: 'Active Projects' } }

export const I18nIndonesian: Story = {
  args: { items, title: 'Proyek Aktif', labels: { unit: 'proyek' } },
}

export const NoHeader: Story = { args: { items } }
