import { create } from 'zustand';
import { Agent, Task } from '@/lib/types'; // Adjust path if needed

interface AgentState {
  agents: Agent[];
  tasks: Task[];
  addAgent: (agent: Agent) => void;
  updateAgentStatus: (agentId: string, status: AgentStatus) => void;
  // Add more actions as needed (e.g., assignTask, updateTaskStatus)
  // Add mock data for initial testing
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [ // Initial mock data
     { id: 'agent-001', name: 'Nexus-7', status: 'idle' },
     { id: 'agent-002', name: 'Orion-3', status: 'working', currentTask: 'Processing data stream Alpha' },
  ],
  tasks: [],
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  updateAgentStatus: (agentId, status) => set((state) => ({
    agents: state.agents.map(agent =>
      agent.id === agentId ? { ...agent, status } : agent
    ),
  })),
  // Implement other actions here
}));