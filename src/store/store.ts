import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './slices/agentSlice';
import { agentApi } from '@/features/agents/agentApiSlice';
import { monitoringApi } from '@/features/monitoring/monitoringSlice'; // Import monitoring slice
import { workflowApi, workflowUIReducer } from '@/features/workflows/workflowSlice'; // Import workflow slice

export const store = configureStore({ // Remove explicit <StoreState> generic
  reducer: {
    agents: agentReducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [monitoringApi.reducerPath]: monitoringApi.reducer, // Add monitoring reducer
    [workflowApi.reducerPath]: workflowApi.reducer, // Add workflow reducer
    workflowUI: workflowUIReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).prepend(
      agentApi.middleware,
      monitoringApi.middleware,
      workflowApi.middleware
    );
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;