import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Agent } from '@/lib/types';

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
});

export const { selectAgent, updateAgentSettings, clearSelectedAgent } = agentSlice.actions;

export default agentSlice.reducer;
