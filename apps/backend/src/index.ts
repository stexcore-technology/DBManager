import { createServer } from '@stexcore/api-engine';

// Create server instance
const server = createServer({
  port: 3000,
  workdir: __dirname,
  mode: 'tree',
  allowCircularServiceDeps: false,
});

// Initialize server
server.initialize();
