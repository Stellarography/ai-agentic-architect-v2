// src/lib/types.ts

// --- Base & Generic Types ---
export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// --- Workflow Related Types ---
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

export interface Workflow extends BaseEntity {
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'archived';
  executionStatus: WorkflowExecutionStatus;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  metadata: WorkflowMetadata;
  createdBy?: string;
  updatedBy?: string;
  version: string;
  isTemplate?: boolean;
}

// --- Agent Related Types ---

export type AgentStatus = 'idle' | 'working' | 'error' | 'offline';

// Consider extending BaseEntity if Agents have creation/update timestamps
export interface Agent extends BaseEntity {
  // export interface Agent { // Use this line if you DON'T want BaseEntity fields yet
  // id: string; // Inherited from BaseEntity if extended
  name: string;
  status: AgentStatus;
  currentTask?: string; // Task ID or description
  // createdAt: Date; // Inherited from BaseEntity if extended
  // updatedAt: Date; // Inherited from BaseEntity if extended
}

// --- Task Related Types ---

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

// Consider extending BaseEntity if Tasks have creation/update timestamps
export interface Task extends BaseEntity {
  // export interface Task { // Use this line if you DON'T want BaseEntity fields yet
  // id: string; // Inherited from BaseEntity if extended
  description: string;
  assignedAgentId?: string; // Agent ID
  status: TaskStatus;
  // createdAt: Date; // Inherited from BaseEntity if extended
  // updatedAt: Date; // Inherited from BaseEntity if extended
}

// --- WebSocket Types ---

export type WebSocketMessageType = 
  | 'agent_status_update'
  | 'task_assigned'
  | 'task_completed'
  | 'error';

export interface WebSocketMessage<T = unknown> {
  type: WebSocketMessageType;
  payload: T;
}

export interface WebSocketErrorPayload {
  code: number;
  message: string;
}

// --- Add other specific types below ---