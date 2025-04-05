import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-white"
        onClick={onMobileMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Logo/Title */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold">AiAgenticArchitectV2</h1>
      </div>

      {/* Navigation/Profile */}
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-white">Dashboard</Button>
          <Button variant="ghost" className="text-white">Projects</Button>
        </nav>
        
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
      </div>
    </header>
  );
};

export default Header;
