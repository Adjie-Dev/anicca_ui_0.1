import { btnPrimary, card, pageShell } from '../theme'
import { useActions } from '../ui/Modal'
import { Crumbs, Icon } from '../ui/primitives'
import { DatePicker, FileDrop, MultiSelect, Range, RichText, Select } from '../ui/form'

function PluginPage({ crumb, title, subtitle, children }: { crumb: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Plugins', crumb]} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">{title}</h1>
        <p className="text-body-base text-on-surface-variant">{subtitle}</p>
      </div>
      <section className={`${card} p-6 max-w-2xl space-y-5`}>{children}</section>
    </div>
  )
}

export function PluginSelectPage() {
  return (
    <PluginPage crumb="Select / Choices" title="Select & Choices" subtitle="Native single and multi select with chips.">
      <Select label="Single select" options={['Apple', 'Banana', 'Cherry', 'Durian']} />
      <MultiSelect label="Multi select" options={['React', 'Vue', 'Svelte', 'Angular', 'Solid']} />
    </PluginPage>
  )
}

export function PluginUploadPage() {
  return (
    <PluginPage crumb="File Upload" title="File Upload" subtitle="Drag-and-drop upload area with file list.">
      <FileDrop label="Upload files" />
    </PluginPage>
  )
}

export function PluginDatePickerPage() {
  return (
    <PluginPage crumb="Date Picker" title="Date Picker" subtitle="Styled native date input.">
      <DatePicker label="Pick a date" />
      <DatePicker label="Deadline" hint="Cannot be in the past" />
    </PluginPage>
  )
}

export function PluginSliderPage() {
  return (
    <PluginPage crumb="Range Slider" title="Range Slider" subtitle="Accessible range inputs with live value.">
      <Range label="Brightness" defaultValue={70} />
      <Range label="Contrast" defaultValue={45} />
      <Range label="Scale" min={0} max={10} defaultValue={6} />
    </PluginPage>
  )
}

export function PluginRichTextPage() {
  return (
    <PluginPage crumb="Rich Text" title="Rich Text Editor" subtitle="Lightweight formatting toolbar.">
      <RichText label="Content" />
    </PluginPage>
  )
}

export function PluginNotifyPage() {
  const { notify, notifyPopup } = useActions()
  return (
    <PluginPage crumb="Notify" title="Notifications" subtitle="Two notification styles: corner toast and center popup.">
      <div className="space-y-1">
        <p className="text-label-md font-semibold text-on-surface">Toast — Corner</p>
        <p className="text-body-sm text-on-surface-variant mb-3">Muncul di pojok kanan bawah. Auto-hilang dalam 2.6 detik.</p>
        <div className="flex flex-wrap gap-3">
          <button className={btnPrimary} onClick={() => notify('Heads up — something happened')}><Icon name="info" className="text-[18px]" />Info</button>
          <button className={btnPrimary} onClick={() => notify('Saved successfully', 'success')}><Icon name="check_circle" className="text-[18px]" />Success</button>
          <button className={btnPrimary} onClick={() => notify('Something went wrong', 'error')}><Icon name="error" className="text-[18px]" />Error</button>
        </div>
      </div>
      <hr className="border-outline-variant/30" />
      <div className="space-y-1">
        <p className="text-label-md font-semibold text-on-surface">Popup — Center</p>
        <p className="text-body-sm text-on-surface-variant mb-3">Muncul di tengah layar dengan backdrop. Bisa dengan atau tanpa action button.</p>
        <div className="flex flex-wrap gap-3">
          <button className={btnPrimary} onClick={() => notifyPopup.push({ title: 'Heads up', description: 'Something happened in the background.', variant: 'info' })}><Icon name="info" className="text-[18px]" />Info</button>
          <button className={btnPrimary} onClick={() => notifyPopup.push({ title: 'Berhasil', description: 'Data telah tersimpan ke server.', variant: 'success' })}><Icon name="check_circle" className="text-[18px]" />Success</button>
          <button className={btnPrimary} onClick={() => notifyPopup.push({ title: 'Perhatian', description: 'Perubahan kamu belum disimpan.', variant: 'warning' })}><Icon name="warning" className="text-[18px]" />Warning</button>
          <button className={btnPrimary} onClick={() => notifyPopup.push({ title: 'Hapus item?', description: 'Tindakan ini tidak bisa dibatalkan.', variant: 'danger', actions: [{ label: 'Hapus', onClick: () => {}, variant: 'danger' }, { label: 'Batal', onClick: () => {} }] })}><Icon name="delete" className="text-[18px]" />Confirm</button>
        </div>
      </div>
    </PluginPage>
  )
}
