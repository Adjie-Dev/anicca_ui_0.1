import type { Meta, StoryObj } from '@storybook/react'
import { AniccaNavbar } from './Navbar'

const meta: Meta<typeof AniccaNavbar> = {
  title: 'Dashboard/Navbar',
  component: AniccaNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof AniccaNavbar>

export const Default: Story = {
  args: {
    title: 'Anicca Dashboard',
    user: { name: 'Aji Wahyu', role: 'Admin' },
    onMenuToggle: () => {},
  },
}

export const WithActions: Story = {
  args: {
    title: 'Anicca',
    actions: <button style={{ padding: '6px 12px' }}>+ New</button>,
    user: { name: 'Jane Doe' },
  },
}

export const I18nIndonesian: Story = {
  args: {
    title: 'Dasbor',
    user: { name: 'Budi', role: 'Pengguna' },
    onMenuToggle: () => {},
    labels: { toggleMenu: 'Buka menu' },
  },
}
