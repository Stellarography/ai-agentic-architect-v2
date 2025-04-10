import { store } from '@/store/store';
import { AgentStatus } from '@/lib/types';

type WebSocketMessage = {
  type: string;
  payload: {
    agentId: string;
    status: AgentStatus;
    currentTask?: string;
  };
};

type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketOptions { // Added export
  pingInterval?: number;
  pingTimeout?: number;
  reconnectDelay?: number;
}

export class WebSocketClient { // Added export
  private ws: WebSocket | null = null;
  private readonly url: string;
  private readonly options: WebSocketOptions;
  private pingTimer: number | null = null;
  private pongTimeout: number | null = null;
  private connectionState: ConnectionState = 'disconnected';
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly baseDelay = 1000;
  private reconnectTimeout: number | null = null;

  constructor(options: WebSocketOptions = {}) {
    this.url = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    this.options = {
      pingInterval: 30000,
      pingTimeout: 5000,
      reconnectDelay: 1000,
      ...options
    };
  }

  async checkServerAvailability(): Promise<boolean> {
    try {
      const httpUrl = this.url.replace('ws:', 'http:');
      const response = await fetch(httpUrl);
      return response.ok;
    } catch (error) {
      console.warn('WebSocket server not available:', error);
      return false;
    }
  }

  async connect() {
    if (this.connectionState === 'connecting' || this.connectionState === 'connected') {
      return;
    }

    const isAvailable = await this.checkServerAvailability();
    if (!isAvailable) {
      console.warn('WebSocket server not available, skipping connection');
      this.connectionState = 'error';
      return;
    }

    this.cleanup();
    this.connectionState = 'connecting';

    try {
      this.ws = new WebSocket(this.url);
      this.attachEventHandlers();
      this.setupHeartbeat();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create WebSocket';
      this.handleError(new Event(message));
      console.error('WebSocket connection error:', error);
    }
  }

  private attachEventHandlers() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.connectionState = 'connected';
      this.reconnectAttempts = 0;
      console.log('WebSocket Connected');
    };

    this.ws.onclose = (event) => {
      console.log(`WebSocket Closed: ${event.code} ${event.reason}`);
      this.connectionState = 'disconnected';
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => this.handleError(error);

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };
  }

  private setupHeartbeat() {
    if (!this.ws || !this.options.pingInterval) return;

    this.pingTimer = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
        this.setPongTimeout();
      }
    }, this.options.pingInterval);
  }

  private setPongTimeout() {
    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout);
    }

    this.pongTimeout = window.setTimeout(() => {
      console.warn('WebSocket pong timeout');
      this.cleanup();
      this.attemptReconnect();
    }, this.options.pingTimeout);
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error);
    this.connectionState = 'error';
    this.cleanup();
    this.attemptReconnect();
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(
      this.baseDelay * Math.pow(2, this.reconnectAttempts),
      30000
    );

    console.log(`Attempting to reconnect in ${delay}ms...`);
    this.reconnectTimeout = window.setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  private cleanup() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }

    if (this.pongTimeout) {
      clearTimeout(this.pongTimeout);
      this.pongTimeout = null;
    }

    if (this.ws) {
      // Remove all event listeners
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = null;
    }
  }

  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case 'agent_status_update': {
        const { agentId, status, currentTask } = message.payload;
        store.dispatch({
          type: 'agents/updateAgentStatus',
          payload: { agentId, status, currentTask }
        });
      }
        break;
    }
  }

  send(type: string, payload: WebSocketPayload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    this.cleanup();
    this.connectionState = 'disconnected';
  }
}

export const wsClient = new WebSocketClient();
