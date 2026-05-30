import { card, pageShell } from '../theme'
import { Crumbs } from '../ui/primitives'

interface Section { id: string; title: string; body: string[] }

function DocPage({ crumb, title, updated, sections }: { crumb: string; title: string; updated: string; sections: Section[] }) {
  return (
    <div className={pageShell}>
      <Crumbs trail={['Pages', crumb]} />
      <div><h1 className="text-[32px] font-bold text-on-surface tracking-tight">{title}</h1><p className="text-body-sm text-outline mt-1">Last updated {updated}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
        <nav className={`${card} p-5 h-max lg:sticky lg:top-24`}>
          <p className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3">On this page</p>
          <ul className="space-y-1.5">
            {sections.map(s => <li key={s.id}><a href={`#${s.id}`} className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">{s.title}</a></li>)}
          </ul>
        </nav>
        <article className={`${card} lg:col-span-3 p-6 md:p-8 space-y-8`}>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-headline-sm font-bold text-on-surface tracking-tight mb-2">{i + 1}. {s.title}</h2>
              {s.body.map((p, j) => <p key={j} className="text-body-base text-on-surface-variant leading-relaxed mb-3">{p}</p>)}
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}

const L = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

export function PrivacyPage() {
  return (
    <DocPage crumb="Privacy Policy" title="Privacy Policy" updated="24 May 2026" sections={[
      { id: 'intro', title: 'Introduction', body: [L, L] },
      { id: 'data', title: 'Data We Collect', body: [L] },
      { id: 'use', title: 'How We Use Data', body: [L, L] },
      { id: 'rights', title: 'Your Rights', body: [L] },
      { id: 'contact', title: 'Contact Us', body: ['Reach us at privacy@anicca.systems.'] },
    ]} />
  )
}

export function TermsPage() {
  return (
    <DocPage crumb="Terms of Service" title="Terms of Service" updated="24 May 2026" sections={[
      { id: 'accept', title: 'Acceptance of Terms', body: [L, L] },
      { id: 'license', title: 'License', body: [L] },
      { id: 'conduct', title: 'User Conduct', body: [L] },
      { id: 'liability', title: 'Limitation of Liability', body: [L, L] },
      { id: 'changes', title: 'Changes to Terms', body: [L] },
    ]} />
  )
}
