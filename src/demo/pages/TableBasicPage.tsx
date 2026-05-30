import { card, pageShell } from '../theme'
import { members, products } from '../data'
import { Badge, Crumbs, Icon } from '../ui/primitives'
import { RowActions } from '../ui/Modal'

const th = 'text-left px-5 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface-variant'
const td = 'px-5 py-4 text-body-sm text-on-surface'

export function TableBasicPage() {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Elements', 'Striped Table']} />
      <div>
        <h1 className="text-[28px] font-bold text-on-surface tracking-tight">Tables</h1>
        <p className="text-body-base text-on-surface-variant">Tailwind tables — striped, hover, and bordered variants.</p>
      </div>

      {/* Striped + hover */}
      <section className={`${card} overflow-hidden`}>
        <div className="px-5 py-4 border-b border-outline-variant/10">
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">Team Members</h4>
          <p className="text-body-sm text-outline">Striped rows with hover highlight</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline-variant/15">
              <th className={th}>Member</th><th className={th}>Role</th><th className={th}>Status</th><th className={th}>Revenue</th><th className={th}>Joined</th><th className={th}></th>
            </tr></thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={m.name} className={`transition-colors hover:bg-primary/5 ${i % 2 ? 'bg-surface-container-low/40' : ''}`}>
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: m.color }}>{m.initials}</span>
                      <div><p className="font-bold text-on-surface">{m.name}</p><p className="text-[12px] text-outline">{m.email}</p></div>
                    </div>
                  </td>
                  <td className={`${td} text-on-surface-variant`}>{m.role}</td>
                  <td className={td}><Badge tone={m.tone}>{m.status}</Badge></td>
                  <td className={`${td} font-bold tabular-nums`}>{m.revenue}</td>
                  <td className={`${td} text-outline tabular-nums`}>{m.joined}</td>
                  <td className={td}><RowActions label={m.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bordered */}
      <section className={`${card} overflow-hidden`}>
        <div className="px-5 py-4 border-b border-outline-variant/10">
          <h4 className="text-headline-sm font-bold text-on-surface tracking-tight">Inventory</h4>
          <p className="text-body-sm text-outline">Bordered cells with status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead><tr>
              {['Product', 'SKU', 'Category', 'Stock', 'Status'].map(h => <th key={h} className={`${th} border border-outline-variant/15`}>{h}</th>)}
            </tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.sku} className="hover:bg-primary/5 transition-colors">
                  <td className={`${td} border border-outline-variant/15`}>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: `${p.iconColor}1a`, color: p.iconColor }}><Icon name={p.icon} className="text-[18px]" /></span>
                      <span className="font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td className={`${td} border border-outline-variant/15 font-mono text-[12px] text-on-surface-variant`}>{p.sku}</td>
                  <td className={`${td} border border-outline-variant/15 text-on-surface-variant`}>{p.cat}</td>
                  <td className={`${td} border border-outline-variant/15 tabular-nums`}>{p.qty}</td>
                  <td className={`${td} border border-outline-variant/15`}><Badge tone={p.ok ? 'success' : 'error'}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
