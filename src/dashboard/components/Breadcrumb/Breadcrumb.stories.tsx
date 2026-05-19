import type { Meta, StoryObj } from '@storybook/react'
import { AniccaBreadcrumb } from './Breadcrumb'

const meta: Meta<typeof AniccaBreadcrumb> = {
  title: 'Dashboard/Breadcrumb',
  component: AniccaBreadcrumb,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaBreadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Overview' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    separator: '›',
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'API', href: '/docs/api' },
      { label: 'Reference' },
    ],
  },
}
