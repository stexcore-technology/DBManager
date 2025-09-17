import { createServer } from '@stexcore/api-engine';

// Create server instance
const server = createServer({
  port: Number(process.env.APP_PORT || 9000),
  workdir: __dirname,
  mode: 'tree',
  allowCircularServiceDeps: false,
});

// Initialize server
server.initialize();
