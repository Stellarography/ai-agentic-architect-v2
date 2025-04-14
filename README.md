# AiAgenticArchitectV2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)

A scalable, futuristic AI workflow manager built with React, Vite, Tailwind, and Shadcn UI.

**GitHub Repository:** [https://github.com/your-username/ai-agentic-architect-v2](https://github.com/your-username/ai-agentic-architect-v2)

## Key Updates

- **Fixed Tailwind CSS configuration** (tailwind.config.js, postcss.config.cjs)
- **Removed conflicting styles** from App.css
- **Updated routing structure** with proper layout nesting
- **Added theme support** with dark/light mode switching

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** 
  - Tailwind CSS v4.1.3 with custom theme and OKLCH color space
  - PostCSS for processing
  - shadcn/ui component library with dark mode support
- **State Management:** Zustand
- **Real-time:** WebSocket
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router v6

## Configuration Notes

### Critical Configuration Files

1. **tailwind.config.js** - Configured with:
   - Proper content paths for JIT compilation
   - Dark mode class strategy
   - Extended theme colors

2. **postcss.config.cjs** - Includes:
   - Tailwind CSS plugin
   - Autoprefixer

3. **src/index.css** - Contains:
   - Tailwind directives (@tailwind base, components, utilities)
   - Custom CSS variables for theming
   - Base styles

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (MainLayout, Header)
│   ├── theme-provider.tsx # Theme context provider
│   └── ui/            # shadcn/ui components (button, card, etc.)
├── features/          # Feature-specific modules
│   ├── agents/        # Agent management features
│   └── mcp/          # Multi-Context Protocol features
├── hooks/            # Custom React hooks
│   ├── use-theme.ts  # Theme management
│   └── use-form-field.ts # Form field logic
├── lib/              # Utilities and services
│   ├── types.ts      # Type definitions
│   ├── variants/     # Component variants
│   └── websocket.ts  # WebSocket client
├── pages/            # Route components
├── router/           # Routing configuration
├── store/            # State management
│   └── slices/       # Zustand slices
├── styles/           # Global styles
│   ├── App.css       # Minimal global styles
│   └── index.css     # Tailwind entry point
└── main.tsx          # Application entry point
```

## Installation & Setup

```bash
# Install dependencies with specific Tailwind version
npm install -D tailwindcss@4.1.3 tailwindcss-animate

# Start development server
npm run dev

# Build for production
npm run build
```

## Critical Development Notes

1. **Tailwind CSS v4.1.3 Requirements:**
   - Uses modern OKLCH color space for better color handling
   - Requires proper PostCSS configuration
   - Supports dark mode with class strategy
   - Uses CSS variables for dynamic theming

2. **Theme Support:**
   - Uses CSS variables for theming
   - Supports system preference + manual toggle
   - Persists in localStorage

3. **Styling Approach:**
   - Prefer Tailwind utility classes
   - Use shadcn/ui components where possible
   - Minimal global CSS (only in App.css)

## Troubleshooting

If styles aren't applying:
1. Verify PostCSS config exists
2. Check Tailwind content paths
3. Ensure @tailwind directives are in index.css
4. Restart dev server after config changes
5. Hard refresh browser (Ctrl+Shift+R)

## License

MIT License - Copyright (c) 2024 AI Agentic Architect V2
