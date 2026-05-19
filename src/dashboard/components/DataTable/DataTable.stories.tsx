import type { Meta, StoryObj } from '@storybook/react'
import { AniccaDataTable } from './DataTable'

interface Row { id: number; name: string; email: string; role: string }

const meta: Meta<typeof AniccaDataTable<Row>> = {
  title: 'Dashboard/DataTable',
  component: AniccaDataTable as never,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof AniccaDataTable<Row>>

const data: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}))

const columns = [
  { key: 'id' as const, label: 'ID', sortable: true, width: '60px' },
  { key: 'name' as const, label: 'Name', sortable: true },
  { key: 'email' as const, label: 'Email' },
  { key: 'role' as const, label: 'Role', sortable: true },
]

export const Default: Story = { args: { data, columns, pageSize: 5 } }

export const Empty: Story = { args: { data: [], columns } }

export const I18nIndonesian: Story = {
  args: {
    data, columns, pageSize: 5,
    labels: {
      searchPlaceholder: 'Cari...',
      results: 'hasil',
      emptyMessage: 'Data kosong',
      page: 'Halaman',
      of: 'dari',
      previous: '← Sebelumnya',
      next: 'Berikutnya →',
    },
  },
}
