import { createContext, useContext } from 'react'
import type { Page } from './theme'

/** In-app navigation, provided by App; used by standalone (auth/error/landing) pages. */
export const NavContext = createContext<(page: Page) => void>(() => {})
export const useNav = () => useContext(NavContext)
