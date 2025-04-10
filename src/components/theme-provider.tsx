import { useEffect, useState, type ReactNode } from "react"
import { ThemeProviderContext, type Theme } from "@/hooks/use-theme" // Import from the new hook file

/** Props for the ThemeProvider component */
interface ThemeProviderProps {
  /** React child components */
  children: ReactNode
  /** Optional default theme setting */
  defaultTheme?: Theme
  /** Optional local storage key for theme persistence */
  storageKey?: string
}

/**
 * Theme provider component that manages application-wide theme state
 * @param props - ThemeProvider properties
 * @returns ThemeProvider component
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
