import { configureStore } from '@reduxjs/toolkit';
import agentReducer, { AgentState } from './slices/agentSlice';
import { agentApi } from '@/features/agents/agentApiSlice';

interface StoreState {
  agents: AgentState;
  [agentApi.reducerPath]: ReturnType<typeof agentApi.reducer>;
}

export const store = configureStore<StoreState>({
  reducer: {
    agents: agentReducer,
    [agentApi.reducerPath]: agentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(agentApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;