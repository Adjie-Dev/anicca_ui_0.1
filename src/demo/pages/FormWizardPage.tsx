import { useState } from 'react'
import { btnGhost, btnPrimary, card, pageShell } from '../theme'
import { useActions } from '../ui/Modal'
import { Crumbs, Icon } from '../ui/primitives'
import { Checkbox, RadioGroup, Select, TextInput } from '../ui/form'

const STEPS = [
  { icon: 'person', label: 'Account' },
  { icon: 'tune', label: 'Profile' },
  { icon: 'check_circle', label: 'Finish' },
]

export function FormWizardPage() {
  const { notify } = useActions()
  const [step, setStep] = useState(0)
  const last = STEPS.length - 1

  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Form Wizard']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Form Wizard</h1>
        <p className="text-body-base text-on-surface-variant">Multi-step form with a progress stepper.</p>
      </div>

      <section className={`${card} p-6 md:p-8`}>
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition ${i <= step ? 'bg-primary border-primary text-on-primary' : 'border-outline-variant/50 text-on-surface-variant'}`}>
                  <Icon name={i < step ? 'check' : s.icon} className="text-[20px]" />
                </span>
                <span className={`text-label-sm font-bold ${i <= step ? 'text-primary' : 'text-on-surface-variant'}`}>{s.label}</span>
              </div>
              {i < last && <div className={`flex-1 h-0.5 mx-2 -mt-5 rounded ${i < step ? 'bg-primary' : 'bg-outline-variant/40'}`} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="max-w-xl mx-auto min-h-[180px]">
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Username" icon="person" placeholder="janedoe" />
              <TextInput label="Email" icon="mail" type="email" placeholder="jane@company.io" />
              <TextInput label="Password" icon="lock" type="password" />
              <TextInput label="Confirm" icon="lock" type="password" />
            </div>
          )}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Full name" placeholder="Jane Doe" />
              <Select label="Role" options={['Developer', 'Designer', 'Manager']} />
              <Select label="Country" options={['Indonesia', 'Singapore', 'Japan']} />
              <RadioGroup label="Plan" options={['Free', 'Pro']} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3 text-center">
              <span className="inline-flex w-14 h-14 rounded-full bg-tertiary/10 text-tertiary items-center justify-center"><Icon name="task_alt" className="text-[30px]" /></span>
              <h3 className="text-headline-sm font-bold text-on-surface">Almost done</h3>
              <p className="text-body-base text-on-surface-variant">Review and confirm to finish setup.</p>
              <div className="pt-2 flex justify-center"><Checkbox label="I agree to the terms of service" /></div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-between mt-8 max-w-xl mx-auto">
          <button className={btnGhost} disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))} style={step === 0 ? { opacity: 0.4, pointerEvents: 'none' } : undefined}>
            <Icon name="arrow_back" className="text-[18px]" />Back
          </button>
          {step < last
            ? <button className={btnPrimary} onClick={() => setStep(s => s + 1)}>Next<Icon name="arrow_forward" className="text-[18px]" /></button>
            : <button className={btnPrimary} onClick={() => notify('Setup complete', 'success')}>Finish<Icon name="check" className="text-[18px]" /></button>}
        </div>
      </section>
    </div>
  )
}
