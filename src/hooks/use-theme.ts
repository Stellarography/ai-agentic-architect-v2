import { createContext, useContext } from "react"

/** Available theme options */
export type Theme = "dark" | "light" | "system"

/** Theme context state interface */
export interface ThemeProviderState {
  /** Current theme setting */
  theme: Theme
  /** Function to update the current theme */
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

/** Context for theme provider state */
// Exporting context directly is often discouraged, but necessary here for the provider/hook split.
// Consider alternative state management if this becomes complex.
export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * Custom hook to access theme context
 * @returns ThemeProviderState object containing theme and setTheme
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}