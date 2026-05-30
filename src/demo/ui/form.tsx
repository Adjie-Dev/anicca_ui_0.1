import { useRef, useState, type ReactNode } from 'react'
import { Icon } from './primitives'

/** Shared field shell: label + control + hint/error. */
function FieldShell({ label, hint, error, children }: { label?: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-label-sm font-medium text-on-surface-variant">{label}</span>}
      {children}
      {error ? <span className="text-[12px] text-error flex items-center gap-1"><Icon name="error" className="text-[14px]" />{error}</span>
        : hint ? <span className="text-[12px] text-on-surface-variant/70">{hint}</span> : null}
    </label>
  )
}

const fieldBase =
  'w-full bg-surface-container-low border rounded-[10px] px-3.5 py-2.5 text-body-base text-on-surface outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50'

export function TextInput({ label, hint, error, icon, type = 'text', placeholder, defaultValue }: {
  label?: string; hint?: string; error?: string; icon?: string; type?: string; placeholder?: string; defaultValue?: string
}) {
  const [v, setV] = useState(defaultValue ?? '')
  return (
    <FieldShell label={label} hint={hint} error={error}>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">{icon}</span>}
        <input
          type={type}
          value={v}
          onChange={e => setV(e.target.value)}
          placeholder={placeholder}
          className={`${fieldBase} ${icon ? 'pl-10' : ''} ${error ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant/40'}`}
        />
      </div>
    </FieldShell>
  )
}

export function Textarea({ label, hint, placeholder, rows = 4 }: { label?: string; hint?: string; placeholder?: string; rows?: number }) {
  const [v, setV] = useState('')
  return (
    <FieldShell label={label} hint={hint}>
      <textarea value={v} onChange={e => setV(e.target.value)} rows={rows} placeholder={placeholder} className={`${fieldBase} border-outline-variant/40 resize-y`} />
    </FieldShell>
  )
}

export function Select({ label, hint, options }: { label?: string; hint?: string; options: string[] }) {
  const [v, setV] = useState(options[0] ?? '')
  return (
    <FieldShell label={label} hint={hint}>
      <div className="relative">
        <select value={v} onChange={e => setV(e.target.value)} className={`${fieldBase} border-outline-variant/40 appearance-none pr-10 cursor-pointer`}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px] pointer-events-none">expand_more</span>
      </div>
    </FieldShell>
  )
}

/** Multi-select with removable chips (Choices.js replacement). */
export function MultiSelect({ label, options }: { label?: string; options: string[] }) {
  const [picked, setPicked] = useState<string[]>([])
  const remaining = options.filter(o => !picked.includes(o))
  return (
    <FieldShell label={label}>
      <div className={`${fieldBase} border-outline-variant/40 flex flex-wrap gap-1.5 min-h-[44px]`}>
        {picked.map(p => (
          <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm">
            {p}
            <button type="button" onClick={() => setPicked(picked.filter(x => x !== p))}><Icon name="close" className="text-[14px]" /></button>
          </span>
        ))}
        {remaining.length > 0 && (
          <select value="" onChange={e => e.target.value && setPicked([...picked, e.target.value])} className="bg-transparent outline-none text-body-base text-on-surface-variant flex-1 min-w-[80px] cursor-pointer">
            <option value="">Add…</option>
            {remaining.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
      </div>
    </FieldShell>
  )
}

export function Checkbox({ label }: { label: string }) {
  const [on, setOn] = useState(false)
  return (
    <button type="button" onClick={() => setOn(!on)} className="flex items-center gap-2.5 text-body-base text-on-surface">
      <span className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition ${on ? 'bg-primary border-primary text-on-primary' : 'border-outline-variant/60'}`}>
        {on && <Icon name="check" className="text-[16px]" />}
      </span>
      {label}
    </button>
  )
}

export function RadioGroup({ label, options }: { label?: string; options: string[] }) {
  const [v, setV] = useState(options[0])
  return (
    <FieldShell label={label}>
      <div className="flex flex-wrap gap-4 pt-1">
        {options.map(o => (
          <button key={o} type="button" onClick={() => setV(o)} className="flex items-center gap-2 text-body-base text-on-surface">
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${v === o ? 'border-primary' : 'border-outline-variant/60'}`}>
              {v === o && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </span>
            {o}
          </button>
        ))}
      </div>
    </FieldShell>
  )
}

/** Toggle switch with optional label row. */
export function SwitchField({ label }: { label: string }) {
  const [on, setOn] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <span className="text-body-base text-on-surface">{label}</span>
      <button type="button" aria-pressed={on} onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-outline-variant/40'}`}>
        <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-all ${on ? 'left-[22px]' : 'left-[2px]'}`} />
      </button>
    </div>
  )
}

export function Range({ label, min = 0, max = 100, defaultValue = 50 }: { label?: string; min?: number; max?: number; defaultValue?: number }) {
  const [v, setV] = useState(defaultValue)
  const pct = ((v - min) / (max - min)) * 100
  return (
    <FieldShell label={label}>
      <div className="flex items-center gap-3">
        <input
          type="range" min={min} max={max} value={v} onChange={e => setV(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, var(--anc-primary, #4648d4) ${pct}%, rgba(100,116,139,0.25) ${pct}%)` }}
        />
        <span className="w-12 text-right text-label-md font-bold text-on-surface tabular-nums">{v}</span>
      </div>
    </FieldShell>
  )
}

export function DatePicker({ label, hint }: { label?: string; hint?: string }) {
  const [v, setV] = useState('')
  return (
    <FieldShell label={label} hint={hint}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px] pointer-events-none">event</span>
        <input type="date" value={v} onChange={e => setV(e.target.value)} className={`${fieldBase} border-outline-variant/40 pl-10`} />
      </div>
    </FieldShell>
  )
}

/** Drag-and-drop file area (Dropzone replacement). */
export function FileDrop({ label }: { label?: string }) {
  const [files, setFiles] = useState<string[]>([])
  const [over, setOver] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const add = (list: FileList | null) => { if (list) setFiles(f => [...f, ...Array.from(list).map(x => x.name)]) }
  return (
    <FieldShell label={label}>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={e => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); add(e.dataTransfer.files) }}
        className={`flex flex-col items-center justify-center gap-2 py-10 rounded-[14px] border-2 border-dashed cursor-pointer transition ${over ? 'border-primary bg-primary/5' : 'border-outline-variant/40 hover:border-primary/50'}`}
      >
        <Icon name="cloud_upload" className="text-[32px] text-primary" />
        <p className="text-body-base text-on-surface">Drop files here or <span className="text-primary font-bold">browse</span></p>
        <p className="text-[12px] text-on-surface-variant/70">PNG, JPG, PDF up to 10MB</p>
        <input ref={ref} type="file" multiple className="hidden" onChange={e => add(e.target.files)} />
      </div>
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-[10px] bg-surface-container-low">
              <span className="flex items-center gap-2 text-body-sm text-on-surface"><Icon name="description" className="text-[18px] text-on-surface-variant" />{f}</span>
              <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-outline hover:text-error transition-colors"><Icon name="delete" className="text-[18px]" /></button>
            </div>
          ))}
        </div>
      )}
    </FieldShell>
  )
}

/** Lightweight rich-text toolbar + editable area (Quill replacement). */
export function RichText({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const cmd = (c: string) => { document.execCommand(c); ref.current?.focus() }
  const tools: [string, string][] = [['format_bold', 'bold'], ['format_italic', 'italic'], ['format_underlined', 'underline'], ['format_list_bulleted', 'insertUnorderedList'], ['format_list_numbered', 'insertOrderedList']]
  return (
    <FieldShell label={label}>
      <div className="rounded-[12px] border border-outline-variant/40 overflow-hidden">
        <div className="flex gap-1 p-1.5 border-b border-outline-variant/30 bg-surface-container-low">
          {tools.map(([icon, c]) => (
            <button key={c} type="button" onMouseDown={e => { e.preventDefault(); cmd(c) }} className="w-8 h-8 rounded-[8px] flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors">
              <Icon name={icon} className="text-[18px]" />
            </button>
          ))}
        </div>
        <div ref={ref} contentEditable suppressContentEditableWarning className="min-h-[140px] p-3.5 text-body-base text-on-surface outline-none" />
      </div>
    </FieldShell>
  )
}
