import { btnGhost, btnPrimary } from '../theme'
import { useNav } from '../nav'
import { Icon } from '../ui/primitives'

function ErrorLayout({ code, icon, title, message, tone }: { code: string; icon: string; title: string; message: string; tone: string }) {
  const go = useNav()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background">
      <span className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-6" style={{ background: `${tone}1a`, color: tone }}>
        <Icon name={icon} className="text-[40px]" />
      </span>
      <p className="text-[80px] leading-none font-black tracking-tight" style={{ color: tone }}>{code}</p>
      <h1 className="text-headline-md font-bold text-on-surface tracking-tight mt-2">{title}</h1>
      <p className="text-body-base text-on-surface-variant mt-2 max-w-md">{message}</p>
      <div className="flex gap-3 mt-8">
        <button className={btnGhost} onClick={() => go('sign-in')}>Sign in</button>
        <button className={btnPrimary} onClick={() => go('dashboard')}><Icon name="home" className="text-[18px]" />Back home</button>
      </div>
    </div>
  )
}

export function Error404Page() {
  return <ErrorLayout code="404" icon="search_off" title="Page not found" message="The page you're looking for doesn't exist or has been moved." tone="#4648d4" />
}
export function Error500Page() {
  return <ErrorLayout code="500" icon="error" title="Server error" message="Something went wrong on our end. Please try again later." tone="#ef4444" />
}
export function MaintenancePage() {
  return <ErrorLayout code="503" icon="engineering" title="Under maintenance" message="We're performing scheduled maintenance. Back online shortly." tone="#d97706" />
}
