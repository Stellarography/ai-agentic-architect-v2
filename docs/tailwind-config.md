# Tailwind CSS Configuration

## Setup

The project uses a custom Tailwind configuration with:
- Custom colors for futuristic UI
- Dark mode support
- Animation utilities

## Color System

Custom colors defined in CSS variables:
```css
:root {
  --electric-blue: 195 100% 50%;
  --neon-purple: 280 100% 50%;
  --cyber-green: 135 100% 50%;
  --stark-white: 0 0% 100%;
}
```

## Configuration File

tailwind.config.js includes:
```js
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
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

## Usage

Example using custom colors:
```tsx
<div className="bg-electric-blue text-stark-white">
  Futuristic Content
</div>
```

## Animations

Built-in transitions and animations:
- hover:scale-105
- transition-colors
- animate-pulse
