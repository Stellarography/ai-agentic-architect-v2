import { useEffect } from 'react';
import { wsClient, WebSocketClient } from '@/lib/websocket'; // Import WebSocketClient type

/**
 * Custom hook to access the shared WebSocket client instance.
 * Ensures a connection attempt is made when a component using this hook mounts,
 * relying on the wsClient's internal logic to manage the actual connection state
 * and prevent redundant connections or disconnections.
 */
export const useWebSocket = (): WebSocketClient => { // Add explicit return type
  useEffect(() => {
    // Attempt to connect. The wsClient.connect() method handles internal state
    // checks (e.g., already connected/connecting, server availability)
    // and reconnection logic.
    wsClient.connect();

    // No cleanup function to disconnect here.
    // The wsClient is a singleton, and its lifecycle should not be tied
    // to individual components. Disconnection should be handled globally
    // if necessary (e.g., on app close or user logout).
  }, []); // Empty dependency array ensures this effect runs only once per component mount.

  // Return the singleton client instance for components to use.
  return wsClient;
};
