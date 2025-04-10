// src/components/layout/Header.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from 'lucide-react';
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <header className="w-full h-16 bg-background/80 backdrop-blur-sm border-b border-electric-blue/20 flex items-center justify-between px-4">
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden hover:bg-electric-blue/10 transition-colors"
        onClick={onMobileMenuClick}
        aria-label="Toggle mobile menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Logo/Title */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-electric-blue to-neon-purple bg-clip-text text-transparent">
          AiAgenticArchitectV2
        </h1>
      </div>

      {/* Navigation/Profile */}
      <nav className="flex items-center gap-4" aria-label="User navigation">
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors"
          >
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="hover:bg-electric-blue/10 hover:text-electric-blue transition-colors"
          >
            Projects
          </Button>
        </div>
        
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Header;
