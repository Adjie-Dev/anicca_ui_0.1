import type { Meta, StoryObj } from '@storybook/react'
import { AniccaChartWrapper } from './ChartWrapper'

const meta: Meta<typeof AniccaChartWrapper> = {
  title: 'Dashboard/ChartWrapper',
  component: AniccaChartWrapper,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaChartWrapper>

const placeholder = (
  <svg viewBox="0 0 200 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
    <polyline fill="none" stroke="var(--anicca-primary)" strokeWidth="2"
      points="0,80 25,60 50,70 75,40 100,55 125,30 150,45 175,20 200,30" />
  </svg>
)

export const Default: Story = {
  args: { title: 'Sales Trend', subtitle: 'Last 30 days', children: placeholder, height: 220 },
}

export const Loading: Story = {
  args: { title: 'Sales Trend', loading: true, children: placeholder, height: 220 },
}

export const Empty: Story = {
  args: { title: 'Sales Trend', empty: true, children: null, height: 220 },
}

export const I18nIndonesian: Story = {
  args: {
    title: 'Tren Penjualan',
    empty: true,
    children: null,
    emptyMessage: 'Data tidak tersedia',
    labels: { loading: 'Memuat grafik' },
    height: 220,
  },
}
