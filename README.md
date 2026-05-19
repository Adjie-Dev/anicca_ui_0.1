# anicca-ui

A production-ready React utility library with dashboard components, form validation, date manipulation, and general utilities. Zero external dependencies beyond React.

## Installation

```bash
npm install anicca-ui
```

## Styles

Library ships satu stylesheet (Tailwind + custom utilities). Import sekali di entry app:

```ts
import 'anicca-ui/styles.css'
```

## Theming

Override design tokens via CSS or React. Default theme bisa di-rebrand tanpa fork.

**Cara 1 — CSS variables (global):**

```css
:root {
  --anicca-primary: #ff00ff;
  --anicca-radius: 0.5rem;
}
```

**Cara 2 — React provider (scoped):**

```tsx
import { AniccaThemeProvider, AniccaStatCard } from 'anicca-ui'
import 'anicca-ui/styles.css'

export default function App() {
  return (
    <AniccaThemeProvider theme={{ primary: '#ff00ff', success: '#00d18c' }}>
      <AniccaStatCard title="Revenue" value="$48,200" trend={12.5} />
    </AniccaThemeProvider>
  )
}
```

Token tersedia: `primary`, `primaryFg`, `primarySoft`, `success`, `successBg`, `danger`, `dangerBg`, `warning`, `warningBg`, `info`, `infoBg`, `surface`, `surfaceMuted`, `surfaceOverlay`, `surfaceDark`, `surfaceDark2`, `surfaceDarkFg`, `surfaceDarkFgMuted`, `border`, `borderStrong`, `borderDark`, `text`, `textMuted`, `textSubtle`, `radius`, `radiusSm`, `radiusLg`, `shadowSm`, `shadowMd`, `shadowLg`.

## i18n

Komponen yang punya teks UI internal (DataTable, Modal, Sidebar, Navbar, ChartWrapper, ActivityFeed, ProgressCard) menerima prop `labels` untuk override:

```tsx
<AniccaDataTable
  data={users}
  columns={cols}
  labels={{
    searchPlaceholder: 'Cari...',
    results: 'hasil',
    emptyMessage: 'Data kosong',
    page: 'Halaman',
    of: 'dari',
    previous: '← Sebelumnya',
    next: 'Berikutnya →',
  }}
/>

<AniccaModal open={open} onClose={close} title="Konfirmasi" labels={{ close: 'Tutup' }}>
  ...
</AniccaModal>
```

## Modules

| Module | Description |
|--------|-------------|
| **Dashboard** | Pre-built UI components: StatCard, ChartWrapper, Sidebar, Navbar, Breadcrumb |
| **Validation** | Form validation with rules engine and `useAniccaForm` hook |
| **Date** | Date formatting, diffing, relative time, arithmetic — supports Indonesian & English |
| **Utils** | General utilities: debounce, throttle, slugify, clipboard, deep clone, and more |

---

## Dashboard Components

### AniccaStatCard

```tsx
import { AniccaStatCard } from 'anicca-ui'

function Dashboard() {
  return (
    <AniccaStatCard
      title="Total Revenue"
      value="$48,200"
      trend={12.5}
      trendLabel="vs last month"
      color="#10b981"
      icon={<span>💰</span>}
    />
  )
}
```

### AniccaChartWrapper

```tsx
import { AniccaChartWrapper } from 'anicca-ui'

function Charts() {
  return (
    <AniccaChartWrapper
      title="Monthly Sales"
      subtitle="Last 6 months"
      loading={false}
      empty={false}
      height={400}
    >
      {/* Your chart component here */}
      <div>Chart content</div>
    </AniccaChartWrapper>
  )
}
```

### AniccaSidebar

```tsx
import { AniccaSidebar } from 'anicca-ui'

function Layout() {
  const items = [
    { label: 'Dashboard', href: '/', icon: <span>📊</span> },
    {
      label: 'Products',
      href: '/products',
      icon: <span>📦</span>,
      children: [
        { label: 'All Products', href: '/products/all' },
        { label: 'Add Product', href: '/products/add' },
      ],
    },
    { label: 'Settings', href: '/settings', icon: <span>⚙️</span> },
  ]

  return (
    <AniccaSidebar
      items={items}
      activePath="/products/all"
      logo={<span>🚀 MyApp</span>}
      collapsed={false}
      onCollapse={(collapsed) => console.log(collapsed)}
    />
  )
}
```

### AniccaNavbar

```tsx
import { AniccaNavbar } from 'anicca-ui'

function Header() {
  return (
    <AniccaNavbar
      title="Admin Panel"
      user={{ name: 'John Doe', role: 'Administrator' }}
      onMenuToggle={() => console.log('toggle menu')}
      actions={<button>🔔</button>}
    />
  )
}
```

### AniccaBreadcrumb

```tsx
import { AniccaBreadcrumb } from 'anicca-ui'

function PageHeader() {
  return (
    <AniccaBreadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Edit Product' },
      ]}
      separator="›"
    />
  )
}
```

---

## Form Validation

```tsx
import { useAniccaForm, required, email, minLength } from 'anicca-ui'

function LoginForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useAniccaForm({
      initialValues: { email: '', password: '' },
      validationSchema: {
        email: [required(), email()],
        password: [required(), minLength(8)],
      },
      onSubmit: async (values) => {
        await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(values),
        })
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.email as string}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        placeholder="Email"
      />
      {touched.email && errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        value={values.password as string}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        placeholder="Password"
      />
      {touched.password && errors.password && <span>{errors.password}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
```

---

## Date Utils

```tsx
import { useAniccaDate, aniccaFormat, aniccaRelative } from 'anicca-ui'

function DateExample() {
  const { date, setDate, format, relative, add, isBefore } = useAniccaDate(new Date())

  return (
    <div>
      <p>{format('dddd, DD MMMM YYYY', 'id')}</p>
      {/* "Senin, 15 Januari 2024" */}

      <p>{relative('id')}</p>
      {/* "baru saja" */}

      <p>{format('DD/MM/YYYY HH:mm', 'en')}</p>
      {/* "15/01/2024 14:30" */}

      <button onClick={() => setDate(add(7, 'days'))}>
        +7 Days
      </button>
    </div>
  )
}

// Standalone usage
const formatted = aniccaFormat(new Date(), 'dddd, DD MMMM YYYY', 'id')
const rel = aniccaRelative('2024-01-01', 'id') // "X bulan lalu"
```

---

## General Utils

```tsx
import { aniccaDebounce, aniccaTruncate, aniccaCopyToClipboard, useAniccaUtils } from 'anicca-ui'

// Standalone
const debouncedSearch = aniccaDebounce((query: string) => {
  fetch(`/api/search?q=${query}`)
}, 300)

const truncated = aniccaTruncate('This is a very long text', 10)
// "This is a ..."

async function copyLink() {
  const success = await aniccaCopyToClipboard('https://example.com')
  if (success) alert('Copied!')
}

// Hook usage
function Component() {
  const { slugify, capitalize, groupBy, uniqueBy } = useAniccaUtils()

  const slug = slugify('Hello World!') // "hello-world"
  const cap = capitalize('hello') // "Hello"

  return <div>{slug}</div>
}
```

---

## API Reference

### Dashboard Components

| Export | Type | Props | Description |
|--------|------|-------|-------------|
| `AniccaStatCard` | Component | `title, value, icon?, trend?, trendLabel?, color?, className?` | Stat card with trend indicator |
| `AniccaChartWrapper` | Component | `title, subtitle?, children, loading?, empty?, emptyMessage?, height?, className?` | Chart container with loading/empty states |
| `AniccaSidebar` | Component | `items, collapsed?, onCollapse?, logo?, footer?, activePath?, className?` | Collapsible sidebar navigation |
| `AniccaNavbar` | Component | `title?, logo?, actions?, user?, onMenuToggle?, className?` | Top navigation bar |
| `AniccaBreadcrumb` | Component | `items, separator?, className?` | Breadcrumb navigation |

### Validation

| Export | Type | Params | Returns | Description |
|--------|------|--------|---------|-------------|
| `useAniccaForm` | Hook | `{ initialValues, validationSchema?, onSubmit? }` | `{ values, errors, touched, isValid, isSubmitting, handleChange, handleBlur, handleSubmit, reset, setFieldValue, setFieldError }` | Form state management |
| `required` | Function | `message?` | `ValidationRule` | Required field rule |
| `email` | Function | `message?` | `ValidationRule` | Email format rule |
| `minLength` | Function | `min, message?` | `ValidationRule` | Minimum length rule |
| `maxLength` | Function | `max, message?` | `ValidationRule` | Maximum length rule |
| `pattern` | Function | `regex, message?` | `ValidationRule` | Regex pattern rule |
| `min` | Function | `value, message?` | `ValidationRule` | Minimum number rule |
| `max` | Function | `value, message?` | `ValidationRule` | Maximum number rule |
| `custom` | Function | `fn, message` | `ValidationRule` | Custom validation rule |

### Date

| Export | Type | Params | Returns | Description |
|--------|------|--------|---------|-------------|
| `useAniccaDate` | Hook | `initialDate?` | `{ date, setDate, format, diff, relative, add, startOf, endOf, isValid, isBefore, isAfter }` | Date manipulation hook |
| `aniccaFormat` | Function | `date, format, locale?` | `string` | Format date with tokens |
| `aniccaDiff` | Function | `date1, date2, unit` | `number` | Absolute difference between dates |
| `aniccaRelative` | Function | `date, locale?` | `string` | Relative time string |
| `aniccaStartOf` | Function | `date, unit` | `Date` | Start of time unit |
| `aniccaEndOf` | Function | `date, unit` | `Date` | End of time unit |
| `aniccaAdd` | Function | `date, amount, unit` | `Date` | Add/subtract time |
| `aniccaIsValid` | Function | `date` | `boolean` | Check if valid date |
| `aniccaIsBefore` | Function | `date1, date2` | `boolean` | Check if before |
| `aniccaIsAfter` | Function | `date1, date2` | `boolean` | Check if after |

### Utils

| Export | Type | Params | Returns | Description |
|--------|------|--------|---------|-------------|
| `useAniccaUtils` | Hook | — | `{ debounce, throttle, truncate, copyToClipboard, slugify, capitalize, deepClone, flattenObject, groupBy, uniqueBy }` | All utils as hook |
| `aniccaDebounce` | Function | `fn, delay` | `(...args) => void` | Debounce a function |
| `aniccaThrottle` | Function | `fn, limit` | `(...args) => void` | Throttle a function |
| `aniccaTruncate` | Function | `str, length, suffix?` | `string` | Truncate string |
| `aniccaCopyToClipboard` | Function | `text` | `Promise<boolean>` | Copy to clipboard |
| `aniccaSlugify` | Function | `str` | `string` | String to slug |
| `aniccaCapitalize` | Function | `str` | `string` | Capitalize first letter |
| `aniccaDeepClone` | Function | `obj` | `T` | Deep clone object |
| `aniccaFlattenObject` | Function | `obj, prefix?` | `Record<string, unknown>` | Flatten nested object |
| `aniccaGroupBy` | Function | `array, key` | `Record<string, T[]>` | Group array by key |
| `aniccaUniqueBy` | Function | `array, key` | `T[]` | Deduplicate by key |

---

## License

MIT — aniccaCode
