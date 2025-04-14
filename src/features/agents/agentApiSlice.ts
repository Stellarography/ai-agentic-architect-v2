// src/features/agents/agentApiSlice.ts
/**
 * Agent Management API Slice
 * 
 * RTK Query API slice for managing AI agents. Provides:
 * - Type definitions for agent data structures
 * - CRUD operation endpoints
 * - Automatic cache management
 * - Generated React hooks for data fetching
 * 
 * Cache Management:
 * - Uses RTK Query's built-in caching
 * - Implements optimistic updates
 * - Manages cache invalidation through tags
 * 
 * Usage:
 * - Import generated hooks (useGetAgentsQuery, etc.)
 * - Use in components for automatic data fetching
 * - Handles loading, error, and success states
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { features } from 'process';

// Mock data for demo
const mockAgents = [
  {
    id: '1',
    name: 'Data Analysis Agent',
    description: 'Specialized in processing and analyzing large datasets',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Customer Service Bot',
    description: 'Handles customer inquiries and support tickets',
    status: 'active' as const,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Code Review Assistant',
    description: 'AI agent for automated code reviews and suggestions',
    status: 'inactive' as const,
    createdAt: new Date().toISOString(),
  }
];

/**
 * Configuration interface for AI agent settings
 * Used to initialize and customize agent behavior
 */
export interface AgentConfiguration {
  /** API key for authentication with AI service */
  apiKey?: string;
  /** Base URL for AI service endpoint */
  endpoint?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Number of retry attempts for failed requests */
  retries?: number;
  /** Custom headers for API requests */
  headers?: Record<string, string>;
  /**
   * Additional configuration properties might include:
   * - model: string (e.g., 'gpt-4', 'claude-2')
   * - temperature: number
   * - maxTokens: number
   * - contextWindow: number
   */
}

/**
 * Core Agent interface representing an AI agent instance
 * @property id - Unique identifier for the agent
 * @property name - Display name of the agent
 * @property description - Optional description of agent's purpose/capabilities
 * @property status - Current operational status
 * @property configuration - Optional agent-specific settings
 * @property createdAt - ISO timestamp of agent creation
 * @property lastUsed - Optional ISO timestamp of last activity
 */
export interface Agent {
  /** Unique identifier for the agent */
  id: string;
  /** Display name of the agent */
  name: string;
  /** Optional description of agent's purpose/capabilities */
  description?: string;
  /** Current operational status */
  status: 'active' | 'inactive' | 'error';
  /** Optional agent-specific settings */
  configuration?: AgentConfiguration;
  /** ISO timestamp of agent creation */
  createdAt: string;
  /** Optional ISO timestamp of last activity */
  lastUsed?: string;
}

// Mock API implementation
const mockBaseQuery = fetchBaseQuery({ baseUrl: '/' });
const mockQueryFn = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: mockAgents };
};

export const agentApi = createApi({
  reducerPath: 'agentApi',
  baseQuery: mockBaseQuery,
  tagTypes: ['Agent'],
  endpoints: (builder) => ({
    getAgents: builder.query<Agent[], void>({
      queryFn: async () => {
        const result = await mockQueryFn();
        return { data: result.data };
      },
      providesTags: (result, error, id) => [{ type: 'Agent', id }],
    }),
    getAgentById: builder.query<Agent, string>({
      queryFn: async (id) => {
        const agent = mockAgents.find(a => a.id === id);
        return agent ? { data: agent } : { error: { status: 404, data: 'Agent not found' } };
      },
      providesTags: (result, error, id) => [{ type: 'Agent', id }],
    }),
    addAgent: builder.mutation<Agent, Partial<Agent>>({
      queryFn: async (body) => {
        const newAgent = {
          ...body,
          id: String(mockAgents.length + 1),
          createdAt: new Date().toISOString(),
        } as Agent;
        mockAgents.push(newAgent);
        return { data: newAgent };
      },
      invalidatesTags: [{ type: 'Agent', id: 'LIST' }],
    }),
    updateAgent: builder.mutation<Agent, Partial<Agent> & Pick<Agent, 'id'>>({
      queryFn: async ({ id, ...patch }) => {
        const index = mockAgents.findIndex(a => a.id === id);
        if (index === -1) return { error: { status: 404, data: 'Agent not found' } };
        
        mockAgents[index] = { ...mockAgents[index], ...patch };
        return { data: mockAgents[index] };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Agent', id }],
    }),
    deleteAgent: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        const index = mockAgents.findIndex(a => a.id === id);
        if (index === -1) return { error: { status: 404, data: 'Agent not found' } };
        
        mockAgents.splice(index, 1);
        return { data: { success: true, id } };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Agent', id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAgentsQuery,
  useGetAgentByIdQuery,
  useAddAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApi;