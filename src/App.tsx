import React from 'react';
import MainLayout from './components/layout/MainLayout';

// Placeholder components (can be moved to separate files later)
const SidebarContent = () => (
  <nav className="space-y-4">
    <div className="p-2 hover:bg-gray-200 rounded">Home</div>
    <div className="p-2 hover:bg-gray-200 rounded">Projects</div>
    <div className="p-2 hover:bg-gray-200 rounded">Settings</div>
  </nav>
);

const InfoPanelContent = () => (
  <div className="space-y-4">
    <h2 className="font-bold text-lg">Details</h2>
    <p>Project information and metadata will appear here.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <MainLayout
      sidebar={<SidebarContent />}
      infoPanel={<InfoPanelContent />}
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Welcome to AI Agentic Architect</h1>
        <p>This is the main content area where your app content will live.</p>
        <p>React Router routes will be integrated here later.</p>
      </div>
    </MainLayout>
  );
};

export default App;
