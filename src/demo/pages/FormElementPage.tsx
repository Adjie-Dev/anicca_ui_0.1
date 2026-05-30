import { btnGhost, btnPrimary, card, pageShell } from '../theme'
import { useActions } from '../ui/Modal'
import { Crumbs } from '../ui/primitives'
import { Checkbox, DatePicker, FileDrop, MultiSelect, RadioGroup, Range, RichText, Select, SwitchField, Textarea, TextInput } from '../ui/form'

function Panel({ title, children, cols = false }: { title: string; children: React.ReactNode; cols?: boolean }) {
  return (
    <section className={`${card} p-6`}>
      <h4 className="text-headline-sm font-bold text-on-surface tracking-tight mb-4">{title}</h4>
      <div className={cols ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}>{children}</div>
    </section>
  )
}

export function FormElementPage() {
  const { notify } = useActions()
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Form Elements']} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Form Elements</h1>
          <p className="text-body-base text-on-surface-variant">Every input control, built natively with the Anicca theme.</p>
        </div>
        <div className="flex gap-3">
          <button className={btnGhost} onClick={() => notify('Form reset')}>Reset</button>
          <button className={btnPrimary} onClick={() => notify('Form saved', 'success')}>Save</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <Panel title="Text Inputs" cols>
          <TextInput label="Full name" placeholder="Jane Doe" />
          <TextInput label="Email" type="email" icon="mail" placeholder="jane@company.io" />
          <TextInput label="Password" type="password" icon="lock" placeholder="••••••••" hint="Min. 8 characters" />
          <TextInput label="Website" icon="link" placeholder="https://" />
        </Panel>
        <Panel title="Selections" cols>
          <Select label="Country" options={['Indonesia', 'Singapore', 'Japan', 'Germany']} />
          <MultiSelect label="Skills" options={['React', 'TypeScript', 'CSS', 'Node', 'Figma']} />
          <RadioGroup label="Plan" options={['Free', 'Pro', 'Team']} />
          <div className="space-y-2 pt-1">
            <span className="text-label-sm font-medium text-on-surface-variant">Preferences</span>
            <Checkbox label="Email updates" />
            <Checkbox label="SMS alerts" />
          </div>
        </Panel>
        <Panel title="Toggles & Range">
          <SwitchField label="Enable notifications" />
          <SwitchField label="Two-factor auth" />
          <Range label="Volume" defaultValue={64} />
          <Range label="Quality" min={0} max={10} defaultValue={7} />
        </Panel>
        <Panel title="Date & Upload">
          <DatePicker label="Start date" hint="Pick any day" />
          <FileDrop label="Attachments" />
        </Panel>
        <div className="lg:col-span-2">
          <Panel title="Text & Rich Editor" cols>
            <Textarea label="Bio" placeholder="Tell us about yourself…" rows={6} />
            <RichText label="Description" />
          </Panel>
        </div>
      </div>
    </div>
  )
}
