import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { useAgentStore } from '@/store/useAgentStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentControlPanel } from './AgentControlPanel';

export const MCPDashboard = () => {
  // TODO: Will be used for theme-specific styling
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-neon-purple bg-clip-text text-transparent">
          MCP Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <AgentControlPanel />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useAgentStore.getState().agents.map((agent) => (
            <Card key={agent.id} className="backdrop-blur-sm border-electric-blue/20 
              shadow-lg shadow-electric-blue/5 hover:shadow-electric-blue/10 transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {agent.name}
                  <Badge variant={
                    agent.status === 'working' ? 'default' :
                    agent.status === 'error' ? 'destructive' :
                    // Default to 'secondary' for 'idle' and 'offline'
                    'secondary'
                  }>
                    {agent.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{agent.currentTask || 'No active task'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCPDashboard;
