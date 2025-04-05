/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'electric-blue': 'hsl(var(--electric-blue))',
        'neon-purple': 'hsl(var(--neon-purple))',
        'cyber-green': 'hsl(var(--cyber-green))',
        'stark-white': 'hsl(var(--stark-white))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}