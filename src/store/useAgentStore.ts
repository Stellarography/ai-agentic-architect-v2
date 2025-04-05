import { create } from 'zustand'

type AgentStatus = 'idle' | 'working' | 'error' | 'completed'

interface Agent {
  id: string
  name: string
  status: AgentStatus
  currentTask?: string
}

interface AgentStore {
  agents: Agent[]
  addAgent: (agent: Agent) => void
  updateAgentStatus: (id: string, status: AgentStatus, currentTask?: string) => void
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [
    { id: '1', name: 'Agent Smith', status: 'idle' },
    { id: '2', name: 'Agent Jones', status: 'working', currentTask: 'Analyzing data' },
    { id: '3', name: 'Agent Brown', status: 'completed', currentTask: 'Task finished' },
  ],
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  updateAgentStatus: (id, status, currentTask) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, status, currentTask } : agent
      ),
    })),
}))
