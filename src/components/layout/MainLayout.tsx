import React from 'react';
import Header from './Header';

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  infoPanel?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, children, infoPanel }) => {
  const handleMobileMenuClick = () => {
    // Will implement sheet functionality later
    console.log('Mobile menu clicked');
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Header onMobileMenuClick={handleMobileMenuClick} />
      
      {/* Grid container */}
      <div className="grid h-full w-full
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-[240px,1fr,300px]
        gap-4 p-4"
      >
        {/* Sidebar */}
        <aside className="hidden md:block bg-gray-100/50 backdrop-blur-sm rounded-lg p-4 min-h-[500px] 
          shadow-lg shadow-electric-blue/5 hover:shadow-electric-blue/10 transition-shadow"
          aria-label="Sidebar"
        >
          {sidebar}
        </aside>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-2rem)] bg-gray-50/50 backdrop-blur-sm rounded-lg p-4
          shadow-lg shadow-electric-blue/5" 
          role="main"
        >
          {children}
        </main>

        {/* Info Panel */}
        <aside className="hidden md:block bg-gray-100/50 backdrop-blur-sm rounded-lg p-4
          shadow-lg shadow-electric-blue/5 hover:shadow-electric-blue/10 transition-shadow"
          aria-label="Information Panel"
        >
          {infoPanel}
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
