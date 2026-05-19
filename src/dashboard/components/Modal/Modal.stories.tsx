import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AniccaModal } from './Modal'

const meta: Meta<typeof AniccaModal> = {
  title: 'Dashboard/Modal',
  component: AniccaModal,
}
export default meta
type Story = StoryObj<typeof AniccaModal>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: '8px 16px' }}>Open Modal</button>
        <AniccaModal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm action"
          footer={
            <>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ background: 'var(--anicca-primary)', color: 'var(--anicca-primary-fg)' }}>Confirm</button>
            </>
          }
        >
          <p>Are you sure you want to continue?</p>
        </AniccaModal>
      </>
    )
  },
}

export const I18nIndonesian: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>Buka modal</button>
        <AniccaModal open={open} onClose={() => setOpen(false)} title="Konfirmasi" labels={{ close: 'Tutup' }}>
          <p>Apakah Anda yakin?</p>
        </AniccaModal>
      </>
    )
  },
}
