import React from 'react';

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  infoPanel?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, children, infoPanel }) => {
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="w-full h-16 bg-gray-800 text-white flex items-center px-4 mb-4">
        <h1 className="text-xl font-bold">App Header</h1>
      </header>

      {/* Grid container */}
      <div className="grid h-full w-full
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-[240px,1fr,300px]
        gap-4 p-4"
      >
        {/* Sidebar */}
        <div className="hidden md:block bg-gray-100 rounded-lg p-4 min-h-[500px]">
          {sidebar || <div className="text-gray-500">Sidebar Content</div>}
        </div>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-2rem)] bg-gray-50 rounded-lg p-4">
          {children || <div className="text-gray-500">Main Content Area</div>}
        </main>

        {/* Info Panel */}
        <div className="hidden md:block bg-gray-100 rounded-lg p-4">
          {infoPanel || <div className="text-gray-500">Info Panel Content</div>}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
