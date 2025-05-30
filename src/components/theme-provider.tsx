// src/components/theme-provider.tsx
import { useEffect, useState, type ReactNode } from "react";
import { ThemeProviderContext, type Theme } from "@/hooks/use-theme"; // Import from the new hook file

/** 
 * Props for the ThemeProvider component 
 */
interface ThemeProviderProps {
  /** React child components */
  children: ReactNode;
  /** Optional default theme setting */
  defaultTheme?: Theme;
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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      localStorage.setItem(storageKey, "system") //persist system theme
      return;
    }
  
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]); // Add storageKey to dependencies)

  const value = {
    theme,
    setTheme: (newTheme: Theme) => { //renamed to newTheme for clarity
      setTheme(newTheme);
  },
};
  // Provide the context value to the ThemeProviderContext
  // and pass through any additional props
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
