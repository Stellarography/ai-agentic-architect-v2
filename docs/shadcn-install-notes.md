# Shadcn UI Installation and Setup

## Initial Setup

1. Initialize Shadcn UI:
```bash
npx shadcn-ui@latest init
```

2. Configuration choices:
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind CSS class prefix: No
- Root template: Yes
- Components directory: src/components/ui
- Utils file: src/lib/utils.ts

## Installed Components

Core components installed:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add sheet
```

## Theme Provider Setup

The theme provider is configured in:
- src/components/theme-provider.tsx
- Supports: light, dark, and system themes
- Uses localStorage for persistence

## Usage Example

```tsx
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

// Wrap your app with ThemeProvider
<ThemeProvider defaultTheme="dark" storageKey="app-theme">
  <Button>Click me</Button>
</ThemeProvider>
```
