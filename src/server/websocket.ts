import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

try {
  const httpServer = createServer();
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log('Received:', message);
        
        // Echo back for testing
        ws.send(JSON.stringify({
          type: 'agent_status_update',
          payload: {
            agentId: '1',
            status: 'active',
            currentTask: 'Processing test message'
          }
        }));
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
  });

  // Handle server errors
  httpServer.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});
