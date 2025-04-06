import { create } from 'zustand';
import type { Agent, AgentStatus } from '@/lib/types';

interface AgentStore {
  agents: Agent[];
  updateAgentStatus: (agentId: string, status: AgentStatus, currentTask?: string) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (agentId: string) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  updateAgentStatus: (agentId, status, currentTask) => 
    set((state) => ({
      agents: state.agents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status, currentTask: currentTask || agent.currentTask }
          : agent
      )
    })),
  addAgent: (agent) => 
    set((state) => ({
      agents: [...state.agents, agent]
    })),
  removeAgent: (agentId) => 
    set((state) => ({
      agents: state.agents.filter(agent => agent.id !== agentId)
    }))
}));
