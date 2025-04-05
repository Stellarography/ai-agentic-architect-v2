# AiAgenticArchitectV2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)

A scalable, futuristic AI workflow manager built with React, Vite, Tailwind, and Shadcn UI.

**GitHub Repository:** [https://github.com/your-username/ai-agentic-architect-v2](https://github.com/your-username/ai-agentic-architect-v2)

An intelligent agent management system built with modern web technologies. Features real-time agent monitoring, task assignment, and multi-context processing capabilities.

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom theme
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Real-time:** WebSocket
- **Form Handling:** React Hook Form + Zod

## Features

- 🤖 Multi-agent task management
- 🌐 Real-time agent status updates
- 🎨 Dark/Light theme support
- 📱 Responsive layout
- ⌨️ Fully keyboard accessible
- 🔒 Type-safe development

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-agentic-architect-v2.git

# Navigate to project directory
cd ai-agentic-architect-v2

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file based on `.env.example`:

```env
VITE_WS_URL=ws://localhost:3001  # WebSocket server URL
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/        # Feature-specific components
├── lib/            # Utilities and API clients
├── store/          # Zustand state management
└── styles/         # Global styles and theme
```

## Environment Variables

This project uses environment variables for configuration. Copy `.env.example` to `.env` and configure:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_APP_NAME` | Application name | No | `AI Agentic Architect` |
| `VITE_API_BASE_URL` | Backend API base URL | Yes | `http://localhost:3000/api` |
| `VITE_WS_URL` | WebSocket server URL | Yes | `ws://localhost:3001` |
| `VITE_DEFAULT_THEME` | Default theme (dark/light) | No | `dark` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | No | `false` |
| `VITE_ENABLE_MOCK_API` | Use mock API responses | No | `true` |
| `VITE_LOG_LEVEL` | Logging verbosity | No | `info` |

### Development Setup

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
nano .env
```

### Production Deployment

Configure these variables in your hosting provider's settings (Vercel, Netlify, etc.). 
Note: Only variables prefixed with `VITE_` are exposed to the frontend.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2024 AI Agentic Architect V2
