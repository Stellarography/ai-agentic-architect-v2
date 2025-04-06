import { useAgentStore } from '@/store/useAgentStore';

type WebSocketMessage = {
  type: string;
  payload: any;
};

/**
 * WebSocket client for real-time communication.
 * Implements singleton pattern and auto-reconnection.
 */
class WebSocketClient {
  /** Active WebSocket connection */
  private ws: WebSocket | null = null;
  /** WebSocket server URL from environment */
  private readonly url: string;

  /**
   * Creates WebSocket client instance.
   * Uses VITE_WS_URL from environment or falls back to localhost.
   */
  constructor() {
    this.url = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
  }

  /** 
   * Establishes WebSocket connection if not already connected.
   * Implements auto-reconnection on disconnect.
   */
  connect() {
    if (this.ws) return;

    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.ws = null;
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
  }

  private handleMessage(message: WebSocketMessage) {
    const updateAgentStatus = useAgentStore.getState().updateAgentStatus;

    switch (message.type) {
      case 'agent_status_update':
        const { agentId, status, currentTask } = message.payload;
        updateAgentStatus(agentId, status, currentTask);
        break;
      // Add more message handlers here
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }
}

export const wsClient = new WebSocketClient();
