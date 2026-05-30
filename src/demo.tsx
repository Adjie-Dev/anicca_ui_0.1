import ReactDOM from 'react-dom/client'
import './demo/theme-init'
import './index.css'
import { App } from './demo/App'
import { ToastProvider } from './demo/ui/Toast'
import { AniccaPopupProvider } from './feedback/Popup'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <AniccaPopupProvider>
      <App />
    </AniccaPopupProvider>
  </ToastProvider>,
)
