# AiAgenticArchitectV2

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

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_WS_URL | WebSocket server URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details
