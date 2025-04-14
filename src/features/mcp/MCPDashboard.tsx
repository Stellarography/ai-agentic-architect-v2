/**
 * MCP (Master Control Program) Dashboard Component
 * Provides a visual interface for monitoring and controlling AI agents
 */
import React from 'react';
// Import theme context for dark/light mode styling
import { useTheme } from '@/components/theme-provider';
// Import global state management for agents
import { useAgentStore } from '@/store/useAgentStore';
// Import UI components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentControlPanel } from './AgentControlPanel';

/**
 * Main dashboard component for the MCP system
 * Displays agent status cards and control panel
 * @returns React.FC - Dashboard component with agent monitoring interface
 */
export const MCPDashboard: React.FC = () => {
  // Theme context for styling (TODO: Implement theme-specific styles)
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-neon-purple bg-clip-text text-transparent">
          MCP Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Agent Control Interface */}
        <AgentControlPanel />
        
        {/* Agent Status Grid 
            Responsive layout:
            - Mobile: 1 column
            - Tablet: 2 columns
            - Desktop: 3 columns
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map through agents from global store and create status cards */}
          {useAgentStore.getState().agents.map((agent) => (
            <Card key={agent.id} 
              className="backdrop-blur-sm border-electric-blue/20 
                shadow-lg shadow-electric-blue/5 hover:shadow-electric-blue/10 transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {agent.name}
                  {/* Status Badge - Color coded by agent state
                      - working: primary color (default)
                      - error: destructive red
                      - idle/offline: secondary gray
                  */}
                  <Badge variant={
                    agent.status === 'working' ? 'default' :
                    agent.status === 'error' ? 'destructive' :
                    'secondary'
                  }>
                    {agent.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              {/* Display current task or default message */}
              <CardContent>
                <p className="text-muted-foreground">
                  {agent.currentTask || 'No active task'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default export for dynamic imports
export default MCPDashboard;
