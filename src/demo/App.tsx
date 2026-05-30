import { useEffect, useState, type MouseEvent } from 'react'
import { AniccaNavbar, AniccaSidebar, type AniccaSidebarItem } from '../dashboard'
import { NAV_GROUPS, STANDALONE, TITLES, type Page } from './theme'
import { NavContext } from './nav'
import { useToast } from './ui/Toast'
import { Icon } from './ui/primitives'
import { UserMenu } from './ui/UserMenu'
import { NotificationsMenu, MessagesMenu } from './ui/HeaderMenus'
import { Placeholder } from './pages/Placeholder'
import { DashboardPage } from './pages/DashboardPage'
import { SettingsPage } from './pages/SettingsPage'
import { Settings2Page } from './pages/Settings2Page'
import { ProfilePage } from './pages/ProfilePage'
import { FormElementPage } from './pages/FormElementPage'
import { FormValidationPage } from './pages/FormValidationPage'
import { FormWizardPage } from './pages/FormWizardPage'
import { PluginSelectPage, PluginUploadPage, PluginDatePickerPage, PluginSliderPage, PluginRichTextPage, PluginNotifyPage } from './pages/plugins'
import { TableBasicPage } from './pages/TableBasicPage'
import { TableDataPage } from './pages/TableDataPage'
import { WidgetBasicPage, WidgetCardPage, WidgetChartPage } from './pages/widgets'
import { UserListPage, UserAddPage, UserProfilePage, UserAccountPage, UserPrivacyPage } from './pages/users'
import { BillingPage, CalendarPage, KanbanPage, PricingPage, TimelinePage } from './pages/special'
import { IconsSolidPage, IconsOutlinePage, IconsDualtonePage } from './pages/icons'
import { MapGooglePage, MapVectorPage } from './pages/maps'
import { PrivacyPage, TermsPage } from './pages/extra'
import { RtlPage } from './pages/RtlPage'
import { SignInPage, SignUpPage, RecoverPage, ConfirmMailPage, LockScreenPage } from './pages/auth'
import { Error404Page, Error500Page, MaintenancePage } from './pages/errors'
import { AdminPage } from './pages/AdminPage'
import { HorizontalDash, DualHorizontalDash, DualCompactDash, BoxedDash, BoxedFancyDash } from './pages/dashLayouts'
import { LandingHomePage, LandingFeaturePage, LandingPricingPage, LandingFaqPage, LandingContactPage, LandingAboutPage, LandingBlogPage, LandingBlogDetailPage, LandingSoftwarePage } from './pages/landing'

/** Registry of built pages; anything missing falls back to a placeholder. */
const PAGES: Record<string, () => JSX.Element> = {
  dashboard: DashboardPage,
  admin: AdminPage,
  'dash-horizontal': HorizontalDash,
  'dash-dual-horizontal': DualHorizontalDash,
  'dash-dual-compact': DualCompactDash,
  'dash-boxed': BoxedDash,
  'dash-boxed-fancy': BoxedFancyDash,
  settings: SettingsPage,
  settings2: Settings2Page,
  profile: ProfilePage,
  'form-element': FormElementPage,
  'form-validation': FormValidationPage,
  'form-wizard': FormWizardPage,
  'plugin-select': PluginSelectPage,
  'plugin-upload': PluginUploadPage,
  'plugin-datepicker': PluginDatePickerPage,
  'plugin-slider': PluginSliderPage,
  'plugin-richtext': PluginRichTextPage,
  'plugin-notify': PluginNotifyPage,
  'table-bootstrap': TableBasicPage,
  'table-data': TableDataPage,
  'widget-basic': WidgetBasicPage,
  'widget-card': WidgetCardPage,
  'widget-chart': WidgetChartPage,
  'user-list': UserListPage,
  'user-add': UserAddPage,
  'user-profile': UserProfilePage,
  'user-account': UserAccountPage,
  'user-privacy': UserPrivacyPage,
  billing: BillingPage,
  calendar: CalendarPage,
  kanban: KanbanPage,
  pricing: PricingPage,
  timeline: TimelinePage,
  rtl: RtlPage,
  'icons-solid': IconsSolidPage,
  'icons-outline': IconsOutlinePage,
  'icons-dualtone': IconsDualtonePage,
  'map-google': MapGooglePage,
  'map-vector': MapVectorPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  'sign-in': SignInPage,
  'sign-up': SignUpPage,
  recover: RecoverPage,
  'confirm-mail': ConfirmMailPage,
  'lock-screen': LockScreenPage,
  'error-404': Error404Page,
  'error-500': Error500Page,
  maintenance: MaintenancePage,
  'landing-home': LandingHomePage,
  'landing-feature': LandingFeaturePage,
  'landing-pricing': LandingPricingPage,
  'landing-faq': LandingFaqPage,
  'landing-contact': LandingContactPage,
  'landing-about': LandingAboutPage,
  'landing-blog': LandingBlogPage,
  'landing-blog-detail': LandingBlogDetailPage,
  'landing-software': LandingSoftwarePage,
}

export function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(() => localStorage.getItem('anicca-theme') === 'dark')
  const notify = useToast()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('anicca-theme', next ? 'dark' : 'light')
  }

  /** Intercept sidebar anchor clicks (children) and route in-app. */
  const onNavClick = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest('a')
    const href = anchor?.getAttribute('href')
    if (href?.startsWith('#') && !href.startsWith('#grp:')) {
      e.preventDefault()
      setPage(href.slice(1) as Page)
    }
  }

  const sidebarItems: AniccaSidebarItem[] = NAV_GROUPS.map(g => ({
    label: g.label,
    href: `#grp:${g.label}`,
    icon: <Icon name={g.icon} />,
    children: g.items.map(i => ({
      label: i.label,
      href: `#${i.page}`,
      icon: <Icon name={i.icon} fill={page === i.page} />,
    })),
  }))

  const navActions = (
    <div className="flex items-center gap-2">
      <label className="relative hidden sm:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">search</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && query) notify(`Searching: ${query}`) }}
          placeholder="Search parameters…"
          className="pl-9 pr-4 py-2 w-56 bg-surface-container-low border border-outline-variant/50 rounded-full text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
        />
      </label>
      <button className="p-2 rounded-full text-on-surface-variant hover:bg-primary/5 transition-colors" onClick={toggleDark} aria-label="Toggle theme"><Icon name={dark ? 'light_mode' : 'dark_mode'} /></button>
      <NotificationsMenu />
      <MessagesMenu />
      <UserMenu name="Tathagata" role="Super Admin" onProfile={() => setPage('profile')} onLogout={() => notify('Logged out')} />
    </div>
  )

  const PageView = PAGES[page] ?? (() => <Placeholder title={TITLES[page] ?? page} />)

  if (STANDALONE.has(page)) {
    return (
      <NavContext.Provider value={setPage}>
        <PageView />
      </NavContext.Provider>
    )
  }

  return (
    <NavContext.Provider value={setPage}>
    <div className="flex min-h-screen">
      <div onClickCapture={onNavClick}>
        <AniccaSidebar
          items={sidebarItems}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          activePath={`#${page}`}
          logo={
            <div className="w-full px-2 text-left">
              <h1 className="text-headline-sm font-black text-primary leading-none tracking-tight">{collapsed ? 'A' : 'Anicca'}</h1>
              {!collapsed && <p className="text-label-sm text-on-surface-variant/70">Code Studio</p>}
            </div>
          }
          footer={<p className="px-2 pb-2 text-[10px] text-outline uppercase tracking-[0.2em] font-bold opacity-60">v0.1.0 · Free</p>}
        />
      </div>
      <main className="flex-1 min-w-0">
        <AniccaNavbar title={TITLES[page] ?? 'Anicca'} actions={navActions} onMenuToggle={() => setCollapsed(c => !c)} />
        <PageView />
      </main>
    </div>
    </NavContext.Provider>
  )
}
