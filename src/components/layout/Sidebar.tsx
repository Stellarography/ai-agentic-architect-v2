// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users } from 'lucide-react'; // Icon for logo
import NavigationBar from './NavigationBar'; // Import the nav links component we just made
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  return (
    // Root container for the sidebar
    <div className={cn("flex flex-col h-full")}>

      {/* Sidebar Header/Logo (Copied from old Layout.tsx's sidebar section) */}
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Users className="h-6 w-6 text-primary" />
          <span className="">AI Agent Architect</span>
        </NavLink>
      </div>

      {/* Render the NavigationBar component */}
      <NavigationBar />

      {/* You could add a sidebar footer here if needed */}
    </div>
  );
};

export default Sidebar;
```    4.  **Verify `AppRoutes.tsx` Usage:** Double-check `src/router/AppRoutes.tsx` again to ensure it's importing *this* `Sidebar` component and passing it to the `sidebar` prop of `<MainLayout />`.