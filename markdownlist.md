# Project Structure

```
ai-agentic-architect-v2/
├── docs/
│   ├── shadcn-install-notes.md
│   └── tailwind-config.md
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── mode-toggle.tsx
│   │       ├── select.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       └── ThemeToggle.tsx
│   ├── features/
│   │   ├── agents/
│   │   │   └── agentApiSlice.ts
│   │   └── mcp/
│   │       ├── AgentControlPanel.tsx
│   │       └── MCPDashboard.tsx
│   ├── hooks/
│   │   └── useWebSocket.ts
│   ├── lib/
│   │   ├── aiApi.ts
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── websocket.ts
│   ├── router/
│   │   └── AppRoutes.tsx
│   ├── server/
│   │   └── websocket.ts
│   ├── store/
│   │   ├── hooks.ts
│   │   ├── slices/
│   │   │   └── agentSlice.ts
│   │   ├── store.ts
│   │   └── useAgentStore.ts
│   ├── App.css
│   ├── App.tsx
│   ├── env.d.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitattributes
├── .gitignore
├── ARCHITECTURE.md
├── components.json
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── postcss.config.js
├── README.md
├── shadcn_Install_notes.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

This structure shows:

- `/docs`: Documentation files
- `/src`: Source code
  - `/components`: React components including layouts and UI
  - `/features`: Feature-specific modules
  - `/hooks`: Custom React hooks
  - `/lib`: Utilities and services
  - `/router`: Routing configuration
  - `/server`: Server-side code
  - `/store`: State management
- Configuration files in root
- Build and environment files
