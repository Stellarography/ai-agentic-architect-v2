import React from 'react';
import MainLayout from './components/layout/MainLayout';
import MCPDashboard from '@/features/mcp/MCPDashboard';

// Placeholder components (can be moved to separate files later)
const SidebarContent = () => (
  <nav className="space-y-4" aria-label="Main Navigation">
    <button className="w-full p-2 hover:bg-electric-blue/10 hover:text-electric-blue transition-colors rounded focus:ring-2 focus:ring-electric-blue focus:outline-none">
      Home
    </button>
    <button className="w-full p-2 hover:bg-electric-blue/10 hover:text-electric-blue transition-colors rounded focus:ring-2 focus:ring-electric-blue focus:outline-none">
      Projects
    </button>
    <button className="w-full p-2 hover:bg-electric-blue/10 hover:text-electric-blue transition-colors rounded focus:ring-2 focus:ring-electric-blue focus:outline-none">
      Settings
    </button>
  </nav>
);

const InfoPanelContent = () => (
  <aside className="space-y-4" aria-label="Information Panel">
    <h2 className="font-bold text-lg">Details</h2>
    <p>Project information and metadata will appear here.</p>
  </aside>
);

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout
        sidebar={<SidebarContent />}
        infoPanel={<MCPDashboard />}
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome to AI Agentic Architect</h1>
          <p>This is the main content area where your app content will live.</p>
          <p>React Router routes will be integrated here later.</p>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
