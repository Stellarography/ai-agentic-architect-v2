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