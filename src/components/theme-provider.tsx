import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

/** Available theme options */
type Theme = "dark" | "light" | "system"

/** Props for the ThemeProvider component */
interface ThemeProviderProps {
  /** React child components */
  children: ReactNode  // Add this line to fix the error
  /** Optional default theme setting */
  defaultTheme?: Theme
  /** Optional local storage key for theme persistence */
  storageKey?: string
}

/** Theme context state interface */
interface ThemeProviderState {
  /** Current theme setting */
  theme: Theme
  /** Function to update the current theme */
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

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

/**
 * Custom hook to access theme context
 * @returns ThemeProviderState object containing theme and setTheme
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
