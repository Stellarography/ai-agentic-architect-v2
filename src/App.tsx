// src/App.tsx
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout'; // Using alias for consistency
import MCPDashboard from '@/features/mcp/MCPDashboard';
import { wsClient } from '@/lib/websocket'; // WebSocket client for real-time communication

// Placeholder for Sidebar Content - Define or import the actual component later
const SidebarContent: React.FC = () => {
  return <div className="p-4">Sidebar Placeholder</div>;
};

// Main Application Component
const App: React.FC = () => {
  useEffect(() => {
    // Effect hook to manage WebSocket connection lifecycle
    wsClient.connect(); // Connect on component mount

    // Cleanup function to disconnect WebSocket on component unmount
    return () => {
      wsClient.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount

  return (
    // Render the main application layout
    <MainLayout
      sidebar={<SidebarContent />} // Pass the (placeholder) sidebar component
      infoPanel={<MCPDashboard />} // Pass the MCP Dashboard component to the info panel slot
    >
      {/* This is the main content area passed as children to MainLayout */}
      {/* Main content area passed as children to MainLayout */}
      <div className="p-4 space-y-4"> {/* Basic styling for the content area */}
        <h1 className="text-2xl font-bold">Welcome to AI Agentic Architect</h1>
        <p>This is the main content area where your app content will live.</p>
        {/* Placeholder text indicating future routing integration */}
        <p>React Router routes will be integrated here later.</p>
      </div>
    </MainLayout>
  );
};

export default App;