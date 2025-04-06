import { configureStore} from '@reduxjs/toolkit';
import agentReducer from './slices/agentSlice';
import { agentApi } from '@/features/agents/agentApiSlice';

export const store = configureStore({
    reducer: {
        agents: agentReducer,
        [agentApi.reducerPath]: agentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(agentApi.middleware),
    // Enable Redux DevTools
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;