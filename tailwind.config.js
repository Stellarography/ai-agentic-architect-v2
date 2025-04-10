/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'; // Use import

export default { // Use export default
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Make sure these CSS variables are defined in your global CSS (e.g., index.css)
        'electric-blue': 'hsl(var(--electric-blue))',
        'neon-purple': 'hsl(var(--neon-purple))',
        'cyber-green': 'hsl(var(--cyber-green))',
        'stark-white': 'hsl(var(--stark-white))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      }
    }
  },
  plugins: [
    tailwindcssAnimate // Use the imported variable
  ],
}