import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Agent } from '@/lib/types';
import { agentApi } from '@/features/agents/agentApiSlice';

interface AgentState {
  selectedAgentId: string | null;
  agentSettings: Record<string, unknown>;
}

const initialState: AgentState = {
  selectedAgentId: null,
  agentSettings: {},
};

export const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    selectAgent: (state, action: PayloadAction<string>) => {
      state.selectedAgentId = action.payload;
    },
    updateAgentSettings: (state, action: PayloadAction<{ agentId: string; settings: unknown }>) => {
      state.agentSettings[action.payload.agentId] = action.payload.settings;
    },
    clearSelectedAgent: (state) => {
      state.selectedAgentId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      agentApi.endpoints.getAgents.matchFulfilled,
      (state, action) => {
        // Handle successful agents fetch if needed
      }
    );
  },
});

export const { selectAgent, updateAgentSettings, clearSelectedAgent } = agentSlice.actions;

export default agentSlice.reducer;
