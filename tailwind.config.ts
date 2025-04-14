import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from 'tailwindcss-animate';



const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Changed
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)", // Changed
        input: "var(--input)",   // Changed
        ring: "var(--ring)",     // Changed
        background: "var(--background)", // Changed
        foreground: "var(--foreground)", // Changed
        primary: {
          DEFAULT: "var(--primary)", // Changed
          foreground: "var(--primary-foreground)", // Changed
        },
        secondary: {
          DEFAULT: "var(--secondary)", // Changed
          foreground: "var(--secondary-foreground)", // Changed
        },
        destructive: {
          DEFAULT: "var(--destructive)", // Changed
          foreground: "var(--destructive-foreground)", // Changed
        },
        muted: {
          DEFAULT: "var(--muted)", // Changed
          foreground: "var(--muted-foreground)", // Changed
        },
        accent: {
          DEFAULT: "var(--accent)", // Changed
          foreground: "var(--accent-foreground)", // Changed
        },
        popover: {
          DEFAULT: "var(--popover)", // Changed
          foreground: "var(--popover-foreground)", // Changed
        },
        card: {
          DEFAULT: "var(--card)", // Changed
          foreground: "var(--card-foreground)", // Changed
        },
        // Cyberpunk theme colors
        'electric-blue': 'var(--electric-blue)', // Changed
        'neon-purple': 'var(--neon-purple)',    // Changed
        'cyber-green': 'var(--cyber-green)',   // Changed
        'stark-white': 'var(--stark-white)', // Changed
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
