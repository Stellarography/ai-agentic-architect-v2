# Project Structure

```
ai-agentic-architect-v2/
├── docs/
│   ├── shadcn-install-notes.md
│   └── tailwind-config.md
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── NavigationBar.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── test/
│   │   │   └── ToastTest.tsx
│   │   ├── ui/
│   │   │   ├── aurora-background.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── mode-toggle.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── theme-provider.tsx
│   ├── features/
│   │   ├── agents/
│   │   │   └── agentApiSlice.ts
│   │   ├── mcp/
│   │   │   ├── AgentControlPanel.tsx
│   │   │   └── MCPDashboard.tsx
│   │   ├── monitoring/
│   │   │   └── monitoringSlice.ts
│   │   └── workflows/
│   │       └── workflowSlice.ts
│   ├── hooks/
│   │   ├── use-form-field.ts
│   │   ├── use-theme.ts
│   │   └── useWebSocket.ts
│   ├── lib/
│   │   ├── variants/
│   │   │   ├── badge.ts
│   │   │   └── button.ts
│   │   ├── aiApi.ts
│   │   ├── logger.ts
│   │   ├── types.ts
│   │   ├── util.ts
│   │   ├── utils.ts
│   │   └── websocket.ts
│   ├── pages/
│   │   ├── src/
│   │   │   └── features/
│   │   │       └── monitoring/
│   │   ├── AgentManagementPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── MonitoringPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── WorkflowDesignPage.tsx
│   ├── router/
│   │   └── AppRoutes.tsx
│   ├── server/
│   │   └── websocket.ts
│   ├── store/
│   │   ├── slices/
│   │   │   └── agentSlice.ts
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   └── useAgentStore.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.css
│   ├── App.tsx
│   ├── env.d.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── components/
│   │   └── ui/
│   │       └── button.test.tsx
│   └── setupTests.ts
├── ARCHITECTURE.md
├── components.json
├── eslint.config.js
├── index.html
├── jest.config.ts
├── LICENSE
├── markdownlist.md
├── package.json
├── postcss.config.mjs
├── README.md
├── shadcn_Install_notes.md
├── tailwind.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.server.json
├── tsconfig.test.json
└── vite.config.ts
```

## Directory Structure Overview

### Root Level Configuration Files
- TypeScript configurations (`tsconfig.*`)
- Build and development tools (Vite, ESLint, PostCSS, Tailwind)
- Package management (`package.json`)
- Documentation files (README, ARCHITECTURE, LICENSE)

### Source Code (`/src`)
- **components**: UI components including layouts and reusable UI elements
- **features**: Feature-specific modules (agents, MCP, monitoring, workflows)
- **hooks**: Custom React hooks
- **lib**: Utilities, API integrations, and type definitions
- **pages**: Route components and page layouts
- **router**: Routing configuration
- **server**: Server-side code
- **store**: State management (Redux/Zustand)
- **styles**: Global styles and theming

### Testing (`/tests`)
- Test setup configuration
- Component tests
- Unit tests

### Documentation (`/docs`)
- Installation guides
- Configuration documentation

### Public Assets (`/public`)
- Static files and assets