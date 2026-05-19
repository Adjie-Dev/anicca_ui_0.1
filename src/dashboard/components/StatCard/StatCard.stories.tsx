import type { Meta, StoryObj } from '@storybook/react'
import { AniccaStatCard } from './StatCard'

const meta: Meta<typeof AniccaStatCard> = {
  title: 'Dashboard/StatCard',
  component: AniccaStatCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaStatCard>

export const Default: Story = {
  args: { title: 'Revenue', value: '$48,200', trend: 12.5, trendLabel: 'vs last month' },
}

export const Negative: Story = {
  args: { title: 'Churn', value: '3.2%', trend: -4.1, trendLabel: 'vs last week' },
}

export const WithIcon: Story = {
  args: { title: 'Active Users', value: '12,540', trend: 8.0, icon: '👥' },
}

export const CustomColor: Story = {
  args: { title: 'Orders', value: 542, trend: 22.0, color: '#a855f7' },
}
