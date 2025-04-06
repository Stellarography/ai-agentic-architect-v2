// src/App.tsx
import React, { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout'; // Use '@/' alias if configured: '@/components/layout/MainLayout'
import MCPDashboard from '@/features/mcp/MCPDashboard';
import { wsClient } from '@/lib/websocket'; // Ensure wsClient is properly initialized and exported

// Placeholder components (can be moved to separate files later)
const SidebarContent = () => (
  <nav className="space-y-4 p-4" aria-label="Main Navigation"> {/* Added padding */}
    <button className="w-full p-2 text-left hover:bg-muted hover:text-foreground transition-colors rounded focus:ring-2 focus:ring-primary focus:outline-none">
      Home
    </button>
    <button className="w-full p-2 text-left hover:bg-muted hover:text-foreground transition-colors rounded focus:ring-2 focus:ring-primary focus:outline-none">
      Agents
    </button>
    <button className="w-full p-2 text-left hover:bg-muted hover:text-foreground transition-colors rounded focus:ring-2 focus:ring-primary focus:outline-none">
      Settings
    </button>
  </nav>
);

// InfoPanelContent might be replaced entirely by MCPDashboard or similar later
// const InfoPanelContent = () => (
//   <aside className="space-y-4 p-4" aria-label="Information Panel"> {/* Added padding */}
//     <h2 className="font-bold text-lg">Details</h2>
//     <p>Project information and metadata will appear here.</p>
//   </aside>
// );

const App: React.FC = () => {
  useEffect(() => {
    wsClient.connect();
    
    // Ensure cleanup runs only once on unmount
    return () => {
      wsClient.disconnect();
    };
  }, []); // Empty dependency array for single setup/cleanup

  return (
    // No ThemeProvider here! Just return your main layout.
    <MainLayout
      sidebar={<SidebarContent />}
      // Passing MCPDashboard directly to the infoPanel prop.
      // Ensure MainLayout is designed to render this correctly.
      infoPanel={<MCPDashboard />}
    >
      {/* This is the main content area passed as children to MainLayout */}
      <div className="p-4 space-y-4"> {/* Added padding */}
        <h1 className="text-2xl font-bold">Welcome to AI Agentic Architect</h1>
        <p>This is the main content area where your app content will live.</p>
        <p>React Router routes will be integrated here later.</p>
      </div>
    </MainLayout>
  );
};

export default App;