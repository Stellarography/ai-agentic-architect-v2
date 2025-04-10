// src/components/layout/NavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styles
import {
  Home,         // Icon for Dashboard link
  Settings,     // Icon for Settings link
  Users,        // Icon for Agents link
  GitBranch,    // Icon for Workflows link
  BarChart3,    // Icon for Monitoring link
} from "lucide-react"; // Icons used in navigation links

// Helper function to apply active styles to navigation links
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-sm ${
    isActive ? 'bg-muted text-primary font-semibold' : 'text-muted-foreground hover:text-primary'
  }`;

// Define navigation links data
const navLinks = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/agents', icon: Users, label: 'Agents' },
  { to: '/design', icon: GitBranch, label: 'Workflows' },
  { to: '/monitoring', icon: BarChart3, label: 'Monitoring' },
  { to: '/settings', icon: Settings, label: 'Settings' }
];

// Define the actual React component
const NavigationBar: React.FC = () => {
  // The return statement should render ONLY the <nav> element with the links
  return (
    <nav className="flex-1 space-y-1 overflow-auto py-4 px-2" aria-label="Main Navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={getNavLinkClass} // Uses the helper for styling
          end={link.to === '/'} // Ensure exact match for Dashboard link
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

// Export the component
export default NavigationBar;