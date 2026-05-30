/**
 * Preview configuration: grouped navigation (mirrors a full admin template),
 * page titles, accent palette, and shared utility class strings.
 */

export type Page = string

export interface NavItem {
  icon: string
  label: string
  page: Page
}

export interface NavGroup {
  label: string
  icon: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Home',
    icon: 'home',
    items: [
      { icon: 'dashboard', label: 'Dashboard', page: 'dashboard' },
      { icon: 'admin_panel_settings', label: 'Admin', page: 'admin' },
    ],
  },
  {
    label: 'Dashboard Layouts',
    icon: 'view_quilt',
    items: [
      { icon: 'view_agenda', label: 'Horizontal', page: 'dash-horizontal' },
      { icon: 'view_column', label: 'Dual Horizontal', page: 'dash-dual-horizontal' },
      { icon: 'view_compact', label: 'Dual Compact', page: 'dash-dual-compact' },
      { icon: 'crop_square', label: 'Boxed', page: 'dash-boxed' },
      { icon: 'auto_awesome_mosaic', label: 'Boxed Fancy', page: 'dash-boxed-fancy' },
    ],
  },
  {
    label: 'Special Pages',
    icon: 'auto_awesome',
    items: [
      { icon: 'receipt_long', label: 'Billing', page: 'billing' },
      { icon: 'calendar_month', label: 'Calendar', page: 'calendar' },
      { icon: 'view_kanban', label: 'Kanban', page: 'kanban' },
      { icon: 'sell', label: 'Pricing', page: 'pricing' },
      { icon: 'timeline', label: 'Timeline', page: 'timeline' },
      { icon: 'badge', label: 'Profile', page: 'profile' },
      { icon: 'format_textdirection_r_to_l', label: 'RTL Support', page: 'rtl' },
    ],
  },
  {
    label: 'Users',
    icon: 'group',
    items: [
      { icon: 'person', label: 'User Profile', page: 'user-profile' },
      { icon: 'person_add', label: 'Add User', page: 'user-add' },
      { icon: 'groups', label: 'User List', page: 'user-list' },
      { icon: 'manage_accounts', label: 'Account Setting', page: 'user-account' },
      { icon: 'shield_person', label: 'Privacy Setting', page: 'user-privacy' },
    ],
  },
  {
    label: 'Authentication',
    icon: 'lock',
    items: [
      { icon: 'login', label: 'Sign In', page: 'sign-in' },
      { icon: 'app_registration', label: 'Sign Up', page: 'sign-up' },
      { icon: 'lock_reset', label: 'Recover Password', page: 'recover' },
      { icon: 'mark_email_read', label: 'Confirm Mail', page: 'confirm-mail' },
      { icon: 'screen_lock_portrait', label: 'Lock Screen', page: 'lock-screen' },
    ],
  },
  {
    label: 'Utility',
    icon: 'build',
    items: [
      { icon: 'error', label: 'Error 404', page: 'error-404' },
      { icon: 'report', label: 'Error 500', page: 'error-500' },
      { icon: 'engineering', label: 'Maintenance', page: 'maintenance' },
      { icon: 'policy', label: 'Privacy Policy', page: 'privacy' },
      { icon: 'gavel', label: 'Terms of Service', page: 'terms' },
    ],
  },
  {
    label: 'Widgets',
    icon: 'widgets',
    items: [
      { icon: 'dashboard_customize', label: 'Widget Basic', page: 'widget-basic' },
      { icon: 'credit_card', label: 'Widget Card', page: 'widget-card' },
      { icon: 'bar_chart', label: 'Widget Chart', page: 'widget-chart' },
    ],
  },
  {
    label: 'Forms',
    icon: 'edit_note',
    items: [
      { icon: 'text_fields', label: 'Form Elements', page: 'form-element' },
      { icon: 'rule', label: 'Form Validation', page: 'form-validation' },
      { icon: 'linear_scale', label: 'Form Wizard', page: 'form-wizard' },
    ],
  },
  {
    label: 'Tables',
    icon: 'table',
    items: [
      { icon: 'table_rows', label: 'Striped Table', page: 'table-bootstrap' },
      { icon: 'table_chart', label: 'Data Table', page: 'table-data' },
    ],
  },
  {
    label: 'Plugins',
    icon: 'extension',
    items: [
      { icon: 'checklist', label: 'Select / Choices', page: 'plugin-select' },
      { icon: 'upload_file', label: 'File Upload', page: 'plugin-upload' },
      { icon: 'event', label: 'Date Picker', page: 'plugin-datepicker' },
      { icon: 'tune', label: 'Range Slider', page: 'plugin-slider' },
      { icon: 'notifications_active', label: 'Notify', page: 'plugin-notify' },
      { icon: 'edit_document', label: 'Rich Text', page: 'plugin-richtext' },
    ],
  },
  {
    label: 'Icons',
    icon: 'category',
    items: [
      { icon: 'apps', label: 'Solid', page: 'icons-solid' },
      { icon: 'apps_outage', label: 'Outline', page: 'icons-outline' },
      { icon: 'gradient', label: 'Dual Tone', page: 'icons-dualtone' },
    ],
  },
  {
    label: 'Maps',
    icon: 'map',
    items: [
      { icon: 'public', label: 'Google Map', page: 'map-google' },
      { icon: 'travel_explore', label: 'Vector Map', page: 'map-vector' },
    ],
  },
  {
    label: 'Settings',
    icon: 'settings',
    items: [
      { icon: 'settings', label: 'Settings', page: 'settings' },
      { icon: 'tune', label: 'Settings v2', page: 'settings2' },
    ],
  },
  {
    label: 'Landing',
    icon: 'web',
    items: [
      { icon: 'home', label: 'Home', page: 'landing-home' },
      { icon: 'info', label: 'About', page: 'landing-about' },
      { icon: 'star', label: 'Features', page: 'landing-feature' },
      { icon: 'sell', label: 'Pricing', page: 'landing-pricing' },
      { icon: 'quiz', label: 'FAQ', page: 'landing-faq' },
      { icon: 'mail', label: 'Contact', page: 'landing-contact' },
      { icon: 'article', label: 'Blog', page: 'landing-blog' },
      { icon: 'description', label: 'Blog Detail', page: 'landing-blog-detail' },
      { icon: 'rocket_launch', label: 'Software', page: 'landing-software' },
    ],
  },
]

/** page → title lookup, derived from the nav. */
export const TITLES: Record<string, string> = Object.fromEntries(
  NAV_GROUPS.flatMap(g => g.items.map(i => [i.page, i.label])),
)

/** Pages rendered without the dashboard shell (own full-screen layout). */
export const STANDALONE: ReadonlySet<Page> = new Set<Page>([
  'sign-in', 'sign-up', 'recover', 'confirm-mail', 'lock-screen',
  'error-404', 'error-500', 'maintenance',
  'dash-horizontal', 'dash-dual-horizontal', 'dash-dual-compact', 'dash-boxed', 'dash-boxed-fancy',
  'landing-home', 'landing-about', 'landing-feature', 'landing-pricing',
  'landing-faq', 'landing-contact', 'landing-blog', 'landing-blog-detail', 'landing-software',
])

/** Accent hexes chosen to read well in both light and dark themes. */
export const ACCENT = {
  indigo: '#4648d4',
  green: '#10b981',
  red: '#ef4444',
  amber: '#d97706',
  slate: '#64748b',
} as const

/** Reusable surface + control classes (theme-aware via index.html overrides). */
export const card =
  'rounded-[22px] glass border border-outline-variant/15 shadow-[0_1px_2px_rgba(11,28,48,0.04),0_20px_44px_-24px_rgba(11,28,48,0.30)]'

export const btnPrimary =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-primary text-on-primary text-label-md font-semibold shadow-sm hover:brightness-[1.06] active:scale-[.98] transition-all'

export const btnGhost =
  'inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-outline-variant/50 text-on-surface text-label-md hover:bg-surface-container-low hover:border-outline-variant active:scale-[.98] transition-all'

export const pageShell = 'p-margin-desktop max-w-container-max mx-auto space-y-gutter'
