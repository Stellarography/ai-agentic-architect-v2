// src/components/layout/MainLayout.txs
import React, { ErrorInfo } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Header from './Header';
import { ErrorBoundary } from "react-error-boundary";
import { Button } from '@/components/ui/button';
interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  infoPanel?: React.ReactNode;
}

// --- Define Fallback Component ---
// (Using the definition provided in the feedback)
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  console.error("Render Error Caught:", error); // Log the error
  return (
    <div role="alert" className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg flex flex-col items-center justify-center space-y-4 min-h-[200px]">
      <h2 className="text-lg font-semibold">Something went wrong rendering this section.</h2>
      {/* Display error message in development for easier debugging */}
      {import.meta.env.DEV && (
         <pre className="text-xs whitespace-pre-wrap break-all max-w-full overflow-auto bg-destructive/20 p-2 rounded">
            {error.message}
            {'\n\n'}
            {error.stack}
         </pre>
      )}
      <Button variant="destructive" onClick={resetErrorBoundary}>
        Try to Recover
      </Button>
    </div>
  );
}
// --- End Fallback Component ---

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, children, infoPanel }) => {
  // Optional: Function to log errors to a monitoring service
  const logError = (error: Error, info: ErrorInfo) => { // Use ErrorInfo type
     // Safely access componentStack, providing a fallback message if null/undefined
     const componentStack = info.componentStack ?? 'Component stack not available';
     console.error("Error Boundary Caught:", error, componentStack);
     // Example: Sentry.captureException(error, { extra: info });
  };
  const handleMobileMenuClick = () => {
    console.log('Mobile menu clicked');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <Header onMobileMenuClick={handleMobileMenuClick} />
      
      <div className="flex-1 grid w-full
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-[240px,1fr,300px]
        gap-4 p-4 overflow-hidden"
      >
        <aside className="hidden md:block bg-card backdrop-blur-sm rounded-lg p-4 min-h-[500px]
          shadow-lg shadow-electric-blue/5 hover:shadow-electric-blue/10 transition-shadow"
          aria-label="Sidebar"
        >
          {sidebar}
        </aside>

        <main className="min-h-[calc(100vh-2rem)] bg-card backdrop-blur-sm rounded-lg p-4
          shadow-lg shadow-electric-blue/5"
          role="main"
        >
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={logError} // Optional: Log errors
            onReset={() => {
              // Logic to reset app state if possible
              console.log("Error boundary reset triggered");
              // Example: navigate('/'); // Or clear some specific state
            }}
          >
            <Outlet /> {/* Child route components render here */}
          </ErrorBoundary>
        </main>

        <aside className="hidden md:block bg-card backdrop-blur-sm rounded-lg p-4
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
