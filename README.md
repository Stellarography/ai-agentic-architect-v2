# AI Agentic Architect v2

## Overview
Modern React application built with Vite, TypeScript, and Tailwind CSS, featuring shadcn/ui components and a futuristic theme system.

## Features
- 🎨 Customizable theme system with light/dark modes
- 📱 Responsive layout with mobile-first design
- 🧩 Modular component architecture
- 🔒 Type-safe development with TypeScript
- 🎯 Semantic HTML and accessibility features

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm/pnpm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure
```
src/
  ├── components/     # Reusable UI components
  │   ├── layout/    # Layout components
  │   └── ui/        # Shadcn UI components
  ├── features/      # Feature-specific components
  │   └── mcp/       # MCP (Multi-Context Protocol) feature
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utilities and helpers
  ├── styles/        # Global styles and themes
  └── types/         # TypeScript type definitions
```

## Theming
The application uses a custom theme system built on Tailwind CSS and Shadcn UI. See:
- [Tailwind Configuration](./docs/tailwind-config.md)
- [Shadcn Installation](./docs/shadcn-install-notes.md)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
