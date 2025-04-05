# Architecture Documentation

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand (State Management)

## Directory Structure
- `src/components/layout`: Common layout components
- `src/features`: Feature-specific modules
- `src/hooks`: Shared React hooks
- `src/lib`: Utility functions, types, and API clients
- `src/pages`: Page components and routing
- `src/store`: Zustand stores
- `src/styles`: Global styles and theming

## Conventions
- Feature-first organization
- Component co-location
- Strict TypeScript usage
- Consistent naming patterns

## State Management
- Zustand for global state
- React Query for server state (if needed)
- Local component state when appropriate
