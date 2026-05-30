import { useState } from 'react'
import { ACCENT, btnGhost, btnPrimary, card } from '../theme'
import { useNav } from '../nav'
import { useToast } from '../ui/Toast'
import { Icon } from '../ui/primitives'
import { TextInput, Textarea } from '../ui/form'
import { LandingLayout } from '../ui/LandingLayout'

const wrap = 'max-w-6xl mx-auto px-6'

function Hero({ badge, title, sub, primary, onPrimary }: { badge: string; title: string; sub: string; primary: string; onPrimary: () => void }) {
  const go = useNav()
  return (
    <section className={`${wrap} pt-20 pb-16 text-center`}>
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-bold"><Icon name="bolt" className="text-[14px]" />{badge}</span>
      <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-black text-on-surface tracking-tight leading-[1.05] mt-5 max-w-3xl mx-auto">{title}</h1>
      <p className="text-body-lg text-on-surface-variant mt-5 max-w-xl mx-auto">{sub}</p>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <button className={btnPrimary} onClick={onPrimary}>{primary}<Icon name="arrow_forward" className="text-[18px]" /></button>
        <button className={btnGhost} onClick={() => go('landing-feature')}>Learn more</button>
      </div>
    </section>
  )
}

const FEATURES = [
  { icon: 'dashboard', title: 'Ready dashboards', desc: 'Seven layouts and dozens of widgets out of the box.' },
  { icon: 'palette', title: 'Theming', desc: 'Light & dark modes with a single, consistent design system.' },
  { icon: 'widgets', title: 'Components', desc: 'Tables, charts, forms, modals — all native, no bloat.' },
  { icon: 'bolt', title: 'Fast', desc: 'Zero heavy dependencies. Just React and your theme.' },
  { icon: 'lock', title: 'Accessible', desc: 'Keyboard friendly and ARIA-aware by default.' },
  { icon: 'code', title: 'Open source', desc: 'MIT licensed and built to be extended.' },
]

function FeatureGrid() {
  return (
    <section className={`${wrap} py-16`}>
      <div className="text-center mb-12"><h2 className="text-[32px] font-bold text-on-surface tracking-tight">Everything you need</h2><p className="text-body-base text-on-surface-variant mt-2">A complete toolkit for modern dashboards.</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {FEATURES.map(f => (
          <div key={f.title} className={`${card} p-6`}>
            <span className="w-12 h-12 rounded-[14px] bg-primary/10 text-primary flex items-center justify-center"><Icon name={f.icon} className="text-[24px]" /></span>
            <h3 className="text-headline-sm font-bold text-on-surface mt-4">{f.title}</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTABand() {
  const go = useNav()
  return (
    <section className={`${wrap} py-16`}>
      <div className="bg-primary text-on-primary rounded-[24px] p-10 md:p-14 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[70px]" />
        <h2 className="relative z-10 text-[32px] font-bold tracking-tight">Start building today</h2>
        <p className="relative z-10 text-body-lg opacity-80 mt-2">Free and open source. No credit card required.</p>
        <button className="relative z-10 mt-6 px-6 py-3 rounded-[10px] bg-white text-primary text-label-md font-bold" onClick={() => go('sign-up')}>Get started free</button>
      </div>
    </section>
  )
}

export function LandingHomePage() {
  const go = useNav()
  return (
    <LandingLayout active="landing-home">
      <Hero badge="v0.1.0 now available" title="The dashboard library you'll actually enjoy using" sub="Anicca gives you production-grade admin pages, components, and themes — fully open source." primary="Get started" onPrimary={() => go('sign-up')} />
      <section className={`${wrap} pb-8`}>
        <div className={`${card} p-2 overflow-hidden`}>
          <div className="rounded-[14px] bg-gradient-to-br from-primary/10 to-tertiary/10 h-64 md:h-80 flex items-center justify-center">
            <Icon name="dashboard" className="text-[80px] text-primary/40" />
          </div>
        </div>
      </section>
      <FeatureGrid />
      <section className={`${wrap} py-8`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          {[['57+', 'Pages'], ['40+', 'Components'], ['2', 'Themes'], ['100%', 'Open source']].map(([v, l]) => (
            <div key={l} className={`${card} py-8`}><p className="text-display-lg font-bold text-primary tabular-nums">{v}</p><p className="text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">{l}</p></div>
          ))}
        </div>
      </section>
      <CTABand />
    </LandingLayout>
  )
}

export function LandingFeaturePage() {
  return (
    <LandingLayout active="landing-feature">
      <Hero badge="Features" title="Built for speed and clarity" sub="Every page and component is crafted to be fast, accessible, and beautiful." primary="Get started" onPrimary={() => { }} />
      <section className={`${wrap} py-8 space-y-16`}>
        {FEATURES.map((f, i) => (
          <div key={f.title} className={`flex flex-col ${i % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10`}>
            <div className="flex-1"><span className="w-14 h-14 rounded-[18px] bg-primary/10 text-primary flex items-center justify-center"><Icon name={f.icon} className="text-[28px]" /></span><h3 className="text-headline-md font-bold text-on-surface mt-4">{f.title}</h3><p className="text-body-lg text-on-surface-variant mt-2">{f.desc}</p></div>
            <div className={`flex-1 ${card} h-56 flex items-center justify-center bg-gradient-to-br from-primary/5 to-tertiary/5`}><Icon name={f.icon} className="text-[64px] text-primary/30" /></div>
          </div>
        ))}
      </section>
      <CTABand />
    </LandingLayout>
  )
}

const TIERS = [
  { name: 'Starter', price: 0, feats: ['1 project', 'Community support', '1GB storage'], featured: false },
  { name: 'Pro', price: 49, feats: ['Unlimited projects', 'Priority support', '100GB storage', 'Analytics'], featured: true },
  { name: 'Enterprise', price: 199, feats: ['Everything in Pro', 'SSO & SAML', 'Dedicated manager', 'SLA 99.9%'], featured: false },
]
export function LandingPricingPage() {
  const go = useNav()
  return (
    <LandingLayout active="landing-pricing">
      <Hero badge="Pricing" title="Plans for teams of every size" sub="Start free, upgrade when you grow." primary="Start free" onPrimary={() => go('sign-up')} />
      <section className={`${wrap} pb-16 grid grid-cols-1 md:grid-cols-3 gap-gutter`}>
        {TIERS.map(t => (
          <section key={t.name} className={`p-6 rounded-[20px] border bg-surface-container-lowest ${t.featured ? 'border-primary shadow-lg relative' : 'border-outline-variant/15 shadow-sm'}`}>
            {t.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold">Popular</span>}
            <h3 className="text-headline-sm font-bold text-on-surface">{t.name}</h3>
            <p className="mt-3"><span className="text-display-lg font-bold text-on-surface tabular-nums">${t.price}</span><span className="text-body-sm text-outline">/mo</span></p>
            <ul className="mt-5 space-y-2.5">{t.feats.map(f => <li key={f} className="flex items-center gap-2 text-body-sm text-on-surface"><Icon name="check_circle" className="text-[18px] text-tertiary" />{f}</li>)}</ul>
            <button className={`${t.featured ? btnPrimary : btnGhost} w-full justify-center mt-6`} onClick={() => go('sign-up')}>Choose {t.name}</button>
          </section>
        ))}
      </section>
    </LandingLayout>
  )
}

const FAQS = [
  ['Is Anicca free?', 'Yes — Anicca is MIT licensed and fully open source.'],
  ['Does it support dark mode?', 'Both light and dark themes are built in and consistent across every page.'],
  ['What framework does it use?', 'React with Tailwind for styling — no other runtime dependencies.'],
  ['Can I use it commercially?', 'Absolutely, the MIT license permits commercial use.'],
  ['How do I get support?', 'Community support is free; Pro and Enterprise plans include priority support.'],
]
function Accordion() {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {FAQS.map(([q, a], i) => (
        <div key={q} className={`${card} overflow-hidden`}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
            <span className="text-label-md font-bold text-on-surface">{q}</span>
            <Icon name="expand_more" className={`text-[20px] text-outline transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <p className="px-5 pb-4 text-body-base text-on-surface-variant">{a}</p>}
        </div>
      ))}
    </div>
  )
}
export function LandingFaqPage() {
  return (
    <LandingLayout active="landing-faq">
      <Hero badge="FAQ" title="Frequently asked questions" sub="Everything you need to know about Anicca." primary="Contact us" onPrimary={() => { }} />
      <section className={`${wrap} pb-16`}><Accordion /></section>
    </LandingLayout>
  )
}

export function LandingContactPage() {
  const notify = useToast()
  const info = [['mail', 'Email', 'hello@anicca.systems'], ['call', 'Phone', '+62 21 0000 0000'], ['location_on', 'Office', 'Jakarta, Indonesia']]
  return (
    <LandingLayout active="landing-contact">
      <section className={`${wrap} pt-16 pb-8 text-center`}><h1 className="text-[40px] font-black text-on-surface tracking-tight">Get in touch</h1><p className="text-body-lg text-on-surface-variant mt-3">We'd love to hear from you.</p></section>
      <section className={`${wrap} pb-16 grid grid-cols-1 lg:grid-cols-3 gap-gutter`}>
        <div className="space-y-4">
          {info.map(([icon, label, val]) => (
            <div key={label} className={`${card} p-5 flex items-center gap-3`}><span className="w-11 h-11 rounded-[14px] bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} className="text-[22px]" /></span><div><p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</p><p className="text-body-base font-bold text-on-surface">{val}</p></div></div>
          ))}
        </div>
        <section className={`${card} lg:col-span-2 p-6 space-y-4`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><TextInput label="Name" placeholder="Jane Doe" /><TextInput label="Email" icon="mail" placeholder="jane@company.io" /></div>
          <TextInput label="Subject" placeholder="How can we help?" />
          <Textarea label="Message" placeholder="Your message…" rows={5} />
          <button className={btnPrimary} onClick={() => notify('Message sent', 'success')}>Send message</button>
        </section>
      </section>
    </LandingLayout>
  )
}

export function LandingAboutPage() {
  const team = [['TA', 'Tathagata', 'Founder', ACCENT.indigo], ['ES', 'Elena Soros', 'Engineering', ACCENT.green], ['MK', 'Marcus Kane', 'Design', ACCENT.amber], ['LT', 'Lana Tiers', 'Product', ACCENT.red]]
  return (
    <LandingLayout active="landing-about">
      <Hero badge="About" title="We build tools developers love" sub="Anicca started as an internal toolkit and grew into an open-source library used worldwide." primary="Join us" onPrimary={() => { }} />
      <section className={`${wrap} py-8 grid grid-cols-1 md:grid-cols-3 gap-gutter`}>
        {[['flag', 'Mission', 'Make great UI accessible to every team.'], ['visibility', 'Vision', 'A world where dashboards are delightful.'], ['favorite', 'Values', 'Open, fast, and crafted with care.']].map(([icon, t, d]) => (
          <div key={t} className={`${card} p-6`}><span className="w-12 h-12 rounded-[14px] bg-primary/10 text-primary flex items-center justify-center"><Icon name={icon} className="text-[24px]" /></span><h3 className="text-headline-sm font-bold text-on-surface mt-4">{t}</h3><p className="text-body-sm text-on-surface-variant mt-1">{d}</p></div>
        ))}
      </section>
      <section className={`${wrap} py-8`}>
        <h2 className="text-[28px] font-bold text-on-surface tracking-tight text-center mb-10">Meet the team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {team.map(([ini, name, role, color]) => (
            <div key={name as string} className={`${card} p-6 text-center`}><span className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-xl font-bold text-white" style={{ background: color as string }}>{ini}</span><p className="text-label-md font-bold text-on-surface mt-3">{name}</p><p className="text-body-sm text-on-surface-variant">{role}</p></div>
          ))}
        </div>
      </section>
      <CTABand />
    </LandingLayout>
  )
}

const POSTS = [
  { tag: 'Release', title: 'Announcing Anicca v0.1', excerpt: 'Our first public release is here — dashboards, components, and themes.', date: 'May 24, 2026', color: ACCENT.indigo },
  { tag: 'Design', title: 'Building a consistent dark mode', excerpt: 'How we approach theming with a single source of truth.', date: 'May 18, 2026', color: ACCENT.green },
  { tag: 'Engineering', title: 'Zero-dependency charts', excerpt: 'Rendering crisp charts with nothing but SVG and React.', date: 'May 10, 2026', color: ACCENT.amber },
]
export function LandingBlogPage() {
  const go = useNav()
  return (
    <LandingLayout active="landing-blog">
      <section className={`${wrap} pt-16 pb-8 text-center`}><h1 className="text-[40px] font-black text-on-surface tracking-tight">Blog</h1><p className="text-body-lg text-on-surface-variant mt-3">News, guides, and behind-the-scenes.</p></section>
      <section className={`${wrap} pb-16 grid grid-cols-1 md:grid-cols-3 gap-gutter`}>
        {POSTS.map(p => (
          <button key={p.title} onClick={() => go('landing-blog-detail')} className={`${card} overflow-hidden text-left hover:shadow-md transition-shadow`}>
            <div className="h-40 flex items-center justify-center" style={{ background: `${p.color}1a` }}><span className="material-symbols-outlined text-[48px]" style={{ color: p.color }}>article</span></div>
            <div className="p-5"><span className="text-label-sm font-bold" style={{ color: p.color }}>{p.tag}</span><h3 className="text-headline-sm font-bold text-on-surface mt-1">{p.title}</h3><p className="text-body-sm text-on-surface-variant mt-1">{p.excerpt}</p><p className="text-[12px] text-outline mt-3">{p.date}</p></div>
          </button>
        ))}
      </section>
    </LandingLayout>
  )
}

export function LandingBlogDetailPage() {
  const go = useNav()
  return (
    <LandingLayout active="landing-blog">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={() => go('landing-blog')} className="text-label-md text-primary font-bold mb-6 inline-flex items-center gap-1"><Icon name="arrow_back" className="text-[18px]" />All posts</button>
        <span className="text-label-sm font-bold text-primary">Release</span>
        <h1 className="text-[36px] font-black text-on-surface tracking-tight leading-tight mt-2">Announcing Anicca v0.1</h1>
        <div className="flex items-center gap-3 mt-4 mb-8">
          <span className="w-9 h-9 rounded-full bg-primary-container text-on-primary text-[12px] font-bold flex items-center justify-center">TA</span>
          <div><p className="text-label-sm font-bold text-on-surface">Tathagata</p><p className="text-[12px] text-outline">May 24, 2026 · 5 min read</p></div>
        </div>
        <div className="rounded-[20px] bg-gradient-to-br from-primary/10 to-tertiary/10 h-64 flex items-center justify-center mb-8"><Icon name="rocket_launch" className="text-[64px] text-primary/40" /></div>
        <div className="space-y-4 text-body-lg text-on-surface-variant leading-relaxed">
          <p>Today we're thrilled to release the first public version of Anicca — an open-source admin and component library for React.</p>
          <h2 className="text-headline-sm font-bold text-on-surface pt-2">What's included</h2>
          <p>Seven dashboard layouts, a full component set, light and dark themes, and dozens of ready pages — all built with Tailwind and zero heavy dependencies.</p>
          <p>We can't wait to see what you build. Happy shipping!</p>
        </div>
      </article>
    </LandingLayout>
  )
}

export function LandingSoftwarePage() {
  const go = useNav()
  return (
    <LandingLayout active="landing-home">
      <Hero badge="Product" title="Ship your SaaS faster with Anicca" sub="A complete starting point — auth, dashboards, billing, and settings, ready to go." primary="Try the demo" onPrimary={() => go('dashboard')} />
      <section className={`${wrap} pb-16`}>
        <div className={`${card} p-2`}><div className="rounded-[14px] bg-gradient-to-br from-primary/10 via-tertiary/5 to-amber-500/10 h-72 flex items-center justify-center"><Icon name="devices" className="text-[80px] text-primary/40" /></div></div>
      </section>
      <FeatureGrid />
      <CTABand />
    </LandingLayout>
  )
}
