import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MetricData {
  id: string;
  timestamp: string;
  type: 'performance' | 'error' | 'status';
  value: number;
  label: string;
  agentId?: string;
  workflowId?: string;
}

export interface SystemStatus {
  id: string;
  status: 'healthy' | 'degraded' | 'error';
  message?: string;
  lastUpdated: string;
  components: {
    name: string;
    status: 'operational' | 'issues' | 'down';
    metrics: {
      cpu?: number;
      memory?: number;
      latency?: number;
    };
  }[];
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  stackTrace?: string;
  metadata?: {
    userId?: string;
    requestId?: string;
    component?: string;
    duration?: number;
    [key: string]: string | number | boolean | undefined;
  };
}

interface TimeRangeParams {
  timeRange: string;
}

interface ErrorTimeParams {
  from: string;
  to: string;
}

export const monitoringApi = createApi({
  reducerPath: 'monitoringApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Metrics', 'Status', 'Errors'] as const,
  endpoints: (builder) => ({
    getMetrics: builder.query<MetricData[], TimeRangeParams>({
      query: (params: TimeRangeParams) => `metrics?timeRange=${params.timeRange}`,
      providesTags: ['Metrics'],
    }),
    
    getSystemStatus: builder.query<SystemStatus, void>({
      query: () => 'system/status',
      providesTags: ['Status'],
    }),
    
    getErrorLogs: builder.query<ErrorLog[], ErrorTimeParams>({
      query: ({ from, to }: ErrorTimeParams) => `errors?from=${from}&to=${to}`,
      providesTags: ['Errors'],
    }),
    
    acknowledgeError: builder.mutation<void, string>({
      query: (errorId: string) => ({
        url: `errors/${errorId}/acknowledge`,
        method: 'POST',
      }),
      invalidatesTags: ['Errors'],
    }),
  }),
});

export const {
  useGetMetricsQuery,
  useGetSystemStatusQuery,
  useGetErrorLogsQuery,
  useAcknowledgeErrorMutation,
} = monitoringApi;