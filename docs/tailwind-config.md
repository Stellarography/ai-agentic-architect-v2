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

# Tailwind Configuration Documentation

## Design Tokens

Our design system uses CSS custom properties (variables) to maintain consistent theming across light and dark modes.

Key tokens:

- `--primary`: Main brand color
  - Light: `oklch(0.208 0.042 265.755)`
  - Dark: `oklch(0.929 0.013 255.508)`
  - Used for primary buttons, links, and interactive elements

- `--background`: Page background color
  - Light: `oklch(1 0 0)`
  - Dark: `oklch(0.129 0.042 264.695)`
  - Used for the main page background

- `--muted-foreground`: Desaturated text color
  - Light: `oklch(0.554 0.046 257.417)`
  - Dark: `oklch(0.704 0.04 256.788)`
  - Used for secondary text, placeholders, and disabled states

### Usage Example

```css
.primary-button {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.secondary-text {
  color: var(--muted-foreground);
}
```
