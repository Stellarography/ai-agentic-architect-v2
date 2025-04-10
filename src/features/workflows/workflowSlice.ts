import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label?: string;
    description?: string;
    parameters?: Record<string, string | number | boolean>;
    [key: string]: unknown; // Allow additional properties with type checking
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Add execution status type
export type WorkflowExecutionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

export interface WorkflowMetadata {
  lastExecuted?: string;
  averageExecutionTime?: number;
  successRate?: number;
  totalRuns: number;
  version: string;
  category?: string[];
  isValid?: boolean;
  validationErrors?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'archived';
  executionStatus: WorkflowExecutionStatus;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  metadata: WorkflowMetadata;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  version: string;
  isTemplate?: boolean;
}

// Add UI state interface
interface WorkflowUIState {
  selectedWorkflowId: string | null;
  isEditing: boolean;
  viewMode: 'grid' | 'list';
  filters: {
    status?: 'draft' | 'active' | 'archived';
    searchTerm?: string;
  };
}

const initialUIState: WorkflowUIState = {
  selectedWorkflowId: null,
  isEditing: false,
  viewMode: 'grid',
  filters: {},
};

// UI State Slice
export const workflowUISlice = createSlice({
  name: 'workflowUI',
  initialState: initialUIState,
  reducers: {
    selectWorkflow: (state, action: PayloadAction<string | null>) => {
      state.selectedWorkflowId = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<WorkflowUIState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
});

export const workflowApi = createApi({
  reducerPath: 'workflowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      // Add any required headers (e.g., auth)
      return headers;
    },
  }),
  tagTypes: ['Workflow'],
  endpoints: (builder) => ({
    getWorkflows: builder.query<Workflow[], void>({
      query: () => 'workflows',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Workflow' as const, id })),
              { type: 'Workflow', id: 'LIST' },
            ]
          : [{ type: 'Workflow', id: 'LIST' }],
    }),

    getWorkflowById: builder.query<Workflow, string>({
      query: (id) => `workflows/${id}`,
      providesTags: (result, error, id) => [{ type: 'Workflow', id }],
    }),

    addWorkflow: builder.mutation<Workflow, Partial<Workflow>>({
      query: (body) => ({
        url: 'workflows',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Workflow', id: 'LIST' }],
    }),

    updateWorkflow: builder.mutation<Workflow, Partial<Workflow> & Pick<Workflow, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `workflows/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Workflow', id }],
    }),

    deleteWorkflow: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `workflows/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Workflow', id }],
    }),

    // Add new endpoint for workflow validation
    validateWorkflow: builder.mutation<{ isValid: boolean; errors?: string[] }, Partial<Workflow>>({
      query: (workflow) => ({
        url: 'workflows/validate',
        method: 'POST',
        body: workflow,
      }),
    }),
  }),
});

// Export actions
export const {
  selectWorkflow,
  setEditMode,
  setViewMode,
  setFilters,
  resetFilters,
} = workflowUISlice.actions;

// Export reducer
export const workflowUIReducer = workflowUISlice.reducer;

// Export API hooks
export const {
  useGetWorkflowsQuery,
  useGetWorkflowByIdQuery,
  useAddWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
  useValidateWorkflowMutation,
} = workflowApi;