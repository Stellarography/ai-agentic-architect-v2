export interface TaskResponse {
  success: boolean;
  taskId?: string;
  error?: string;
}

export interface AgentLog {
  timestamp: number;
  message: string;
}

export const assignTaskToAgentAPI = async (
  agentId: string, 
  taskDescription: string
): Promise<TaskResponse> => {
  console.log(`Simulating API call: Assign task "${taskDescription}" to agent ${agentId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate 90% success rate
  if (Math.random() > 0.1) {
    return { 
      success: true, 
      taskId: `task-${Date.now()}`
    };
  }
  
  return {
    success: false,
    error: "Failed to assign task"
  };
};

export const getAgentLogsAPI = async (agentId: string): Promise<AgentLog[]> => {
  console.log(`Simulating API call: Get logs for agent ${agentId}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    { timestamp: Date.now() - 1000, message: `Started task processing for ${agentId}` },
    { timestamp: Date.now(), message: `Processing in progress for ${agentId}` }
  ];
};
