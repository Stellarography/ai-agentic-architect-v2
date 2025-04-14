import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Represents a single metric data point in the monitoring system
 * @interface MetricData
 */
export interface MetricData {
  /** Unique identifier for the metric entry */
  id: string;
  /** ISO timestamp when metric was recorded */
  timestamp: string;
  /** Category of metric being tracked */
  type: 'performance' | 'error' | 'status';
  /** Numerical value of the metric */
  value: number;
  /** Human-readable description */
  label: string;
  /** Optional reference to associated agent */
  agentId?: string;
  /** Optional reference to associated workflow */
  workflowId?: string;
}

/**
 * System health and component status information
 * @interface SystemStatus
 */
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

/**
 * Structured error log entry
 * @interface ErrorLog
 */
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

/**
 * Parameters for time-based metric queries
 * @interface TimeRangeParams
 */
interface TimeRangeParams {
  /** Time range specifier (e.g., '24h', '7d', '30d') */
  timeRange: string;
}

/**
 * Parameters for error log time filtering
 * @interface ErrorTimeParams
 */
interface ErrorTimeParams {
  /** ISO timestamp for start of range */
  from: string;
  /** ISO timestamp for end of range */
  to: string;
}

/**
 * RTK Query API slice for system monitoring
 * Provides endpoints for metrics, status, and error management
 */
export const monitoringApi = createApi({
  reducerPath: 'monitoringApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  /** Cache invalidation tags */
  tagTypes: ['Metrics', 'Status', 'Errors'] as const,
  endpoints: (builder) => ({
    /**
     * Fetch metrics for specified time range
     * @param params TimeRangeParams
     * @returns MetricData[]
     */
    getMetrics: builder.query<MetricData[], TimeRangeParams>({
      query: (params: TimeRangeParams) => `metrics?timeRange=${params.timeRange}`,
      providesTags: ['Metrics'],
    }),
    
    /**
     * Get current system status and health metrics
     * @returns SystemStatus
     */
    getSystemStatus: builder.query<SystemStatus, void>({
      query: () => 'system/status',
      providesTags: ['Status'],
    }),
    
    /**
     * Fetch error logs within a specified time range
     * @param params ErrorTimeParams
     * @returns ErrorLog[]
     */
    getErrorLogs: builder.query<ErrorLog[], ErrorTimeParams>({
      query: ({ from, to }: ErrorTimeParams) => `errors?from=${from}&to=${to}`,
      providesTags: ['Errors'],
    }),
    
    /**
     * Acknowledge an error by its ID
     * @param errorId string
     */
    acknowledgeError: builder.mutation<void, string>({
      query: (errorId: string) => ({
        url: `errors/${errorId}/acknowledge`,
        method: 'POST',
      }),
      invalidatesTags: ['Errors'],
    }),
  }),
});

// Export generated hooks for component use
export const {
  useGetMetricsQuery,
  useGetSystemStatusQuery,
  useGetErrorLogsQuery,
  useAcknowledgeErrorMutation,
} = monitoringApi;