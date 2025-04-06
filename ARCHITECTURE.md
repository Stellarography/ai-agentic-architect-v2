# Architecture Documentation

## Overview

AiAgenticArchitectV2 is a modern web application designed to manage and coordinate AI agents. The architecture follows these key principles:
- Component-based development with React
- Real-time communication via WebSocket
- Type-safe development with TypeScript
- Centralized state management with Zustand
- Modular and extensible design

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand (State Management)

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (MainLayout, Header)
│   └── ui/              # Shadcn UI components
├── features/            # Feature-specific modules
│   └── mcp/            # Multi-Context Protocol features
├── lib/                # Utilities and services
│   ├── aiApi.ts        # AI service integration
│   └── websocket.ts    # WebSocket client
├── store/              # State management
│   └── useAgentStore.ts # Agent state and actions
└── styles/             # Global styles and theming
```

## Core Components

### MainLayout
- Three-column responsive layout
- Handles sidebar, main content, and info panel
- Adapts to mobile with collapsible sections

### Header
- App navigation and controls
- Theme toggle
- User profile management
- Mobile menu trigger

### MCPDashboard
- Agent status overview
- Real-time updates via WebSocket
- Grid layout for agent cards
- Status indicators and task information

### AgentControlPanel
- Task assignment interface
- Agent selection
- Form validation with Zod
- API integration for task submission

### WebSocket Integration
WebSocket client implementation (`src/lib/websocket.ts`):
- Singleton pattern for connection management
- Auto-reconnection with 5s delay
- Type-safe message handling
- Integration with Zustand store

### Agent State Management
Using Zustand for centralized state (`src/store/useAgentStore.ts`):
```typescript
interface AgentStore {
  agents: Agent[]              // List of all agents
  addAgent: (agent: Agent)     // Add new agent
  updateAgentStatus: (         // Update agent status
    id: string,
    status: AgentStatus,
    currentTask?: string
  ) => void
}
```

### Theme System
Theme management (`src/components/theme-provider.tsx`):
- Light/Dark/System theme support
- CSS variables for consistent theming
- Local storage persistence
- Context-based theme access

### Form Handling
Agent control form implementation:
- Zod schema validation
- React Hook Form integration
- Error handling and feedback
- TypeScript type inference

## State Management

Using Zustand for its simplicity and flexibility:

```typescript
interface AgentStore {
  agents: Agent[]
  addAgent: (agent: Agent) => void
  updateAgentStatus: (id: string, status: AgentStatus) => void
}
```

Key features:
- Immutable state updates
- TypeScript integration
- DevTools support
- Middleware for persistence

## API Integration

### AI Service Integration (aiApi.ts)
```typescript
export interface TaskResponse {
  success: boolean
  taskId?: string
  error?: string
}

// API functions with type safety
assignTaskToAgentAPI(agentId: string, task: string): Promise<TaskResponse>
getAgentLogsAPI(agentId: string): Promise<AgentLog[]>
```

## Real-time Communication

WebSocket implementation (websocket.ts):
- Singleton WebSocket client
- Automatic reconnection
- Type-safe message handling
- Integration with Zustand store

Event flow:
1. Client connects to WebSocket server
2. Server pushes agent status updates
3. Client updates store via WebSocket events
4. UI reacts to store changes

## Styling & UI

### Theme System
- Light/Dark mode support
- CSS variables for dynamic theming
- Tailwind CSS for utility classes
- Custom color palette:
  - Electric Blue: Primary accent
  - Neon Purple: Secondary accent
  - Cyber Green: Success states

### Component Library
Using shadcn/ui for:
- Form controls
- Dropdowns
- Cards
- Modals
- Toast notifications

## Environment Configuration
Key environment variables (`env.d.ts`):
```typescript
interface ImportMetaEnv {
  readonly VITE_WS_URL: string  // WebSocket server URL
  // Add other env vars as needed
}
```

## TypeScript Configuration
Key compiler options:
- Strict type checking enabled
- Path aliases for clean imports
- Module bundler optimization
- React JSX support

## File Structure
```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components
│   └── ui/              # UI components (shadcn/ui)
├── features/            # Feature modules
│   └── mcp/            # MCP dashboard
├── lib/                # Utilities
│   ├── websocket.ts    # WebSocket client
│   └── types.ts        # Type definitions
└── store/              # State management
    └── useAgentStore.ts # Agent state
```

## Future Considerations

### Potential Expansions
1. Authentication/Authorization
   - User roles and permissions
   - JWT integration
   - Protected routes

2. Agent Management
   - Agent creation/deletion
   - Custom agent configurations
   - Training interfaces

3. Performance Optimizations
   - Virtual scrolling for large lists
   - Selective WebSocket updates
   - Component code splitting

4. Monitoring & Analytics
   - Agent performance metrics
   - Task success rates
   - System health monitoring

### Technical Debt Considerations
- WebSocket reconnection strategy
- Error boundary implementation
- Test coverage
- Accessibility improvements
