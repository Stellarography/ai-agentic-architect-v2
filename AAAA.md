# Project Structure

```
ai-agentic-architect-v2/
├── .env.example
├── .gitattributes
├── .gitignore
├── ARCHITECTURE.md
├── components.json
├── eslint.config.js
├── index.html
├── jest.config.ts
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── PROJECT_STRUCTURE.md
├── README.md
├── shadcn_Install_notes.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.server.json
├── tsconfig.test.json
├── vite.config.ts
├── .git/
│   ├── COMMIT_EDITMSG
│   ├── config
│   ├── description
│   ├── HEAD
│   ├── index
│   ├── hooks/
│   │   ├── applypatch-msg.sample
│   │   ├── commit-msg.sample
│   │   ├── fsmonitor-watchman.sample
│   │   ├── post-update.sample
│   │   ├── pre-applypatch.sample
│   │   ├── pre-commit.sample
│   │   ├── pre-merge-commit.sample
│   │   ├── pre-push.sample
│   │   ├── pre-rebase.sample
│   │   ├── pre-receive.sample
│   │   ├── prepare-commit-msg.sample
│   │   ├── push-to-checkout.sample
│   │   ├── sendemail-validate.sample
│   │   └── update.sample
│   ├── info/
│   │   └── exclude
│   ├── objects/
│   │   └── (various object directories)
│   └── refs/
├── .roo/
│   └── system-prompt-crystal
├── .vscode/
├── docs/
│   ├── shadcn-install-notes.md
│   └── tailwind-config.md
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── env.d.ts
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── router/
│   ├── server/
│   ├── store/
│   └── styles/
└── tests/
    ├── setupTests.ts
    └── components/
```

This structure shows:

- Root configuration files for TypeScript, ESLint, Vite, etc.
- `/.git`: Git version control files
- `/.roo`: System configuration files
- `/.vscode`: VS Code specific settings
- `/docs`: Documentation files
- `/public`: Static assets
- `/src`: Source code
  - `/components`: React components
  - `/features`: Feature-specific modules
  - `/hooks`: Custom React hooks
  - `/lib`: Utilities and services
  - `/router`: Routing configuration
  - `/server`: Server-side code
  - `/store`: State management
- `/tests`: Test files
