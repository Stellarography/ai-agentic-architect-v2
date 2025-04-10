// src/router/AppRoutes
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  // Outlet // Outlet is implicitly handled by nesting routes under the Layout element
} from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

// Import page components
import HomePage from '@/pages/HomePage';
import AgentManagementPage from '@/pages/AgentManagementPage';
import WorkflowDesignPage from '@/pages/WorkflowDesignPage';
import MonitoringPage from '@/pages/MonitoringPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Define the application routes
const router = createBrowserRouter([
  {
    // Root path uses the MainLayout component
    path: '/',
    element: <MainLayout />, // MainLayout component wraps child routes
    // errorElement removed, handled by catch-all route below
    children: [
      {
        index: true, // Matches the root path '/' exactly
        element: <HomePage />,
      },
      {
        path: 'agents',
        element: <AgentManagementPage />,
      },
      {
        path: 'design',
        element: <WorkflowDesignPage />,
      },
      {
        path: 'monitoring',
        element: <MonitoringPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      // Add other routes that should use the main Layout here
    ],
  },
  // Example of a route *without* the main Layout (e.g., a login page) could be added here
  // {
  //   path: '/login',
  //   element: <LoginPage />,
  // },

  // Catch-all route for 404 - Render NotFoundPage within the main layout
  {
    path: '*',
    element: <MainLayout><NotFoundPage /></MainLayout>,
  }
]);

// Component to provide the router context
const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
