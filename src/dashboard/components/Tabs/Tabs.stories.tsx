import type { Meta, StoryObj } from '@storybook/react'
import { AniccaTabs } from './Tabs'

const meta: Meta<typeof AniccaTabs> = {
  title: 'Dashboard/Tabs',
  component: AniccaTabs,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaTabs>

const tabs = [
  { key: 'overview', label: 'Overview', icon: '📊', content: <div>Overview content</div> },
  { key: 'analytics', label: 'Analytics', icon: '📈', content: <div>Analytics content</div> },
  { key: 'settings', label: 'Settings', icon: '⚙️', content: <div>Settings content</div> },
]

export const Default: Story = { args: { tabs } }

export const DefaultSecondTab: Story = { args: { tabs, defaultTab: 'analytics' } }
