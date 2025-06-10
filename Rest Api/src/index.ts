import { createServer } from 'http';
import config from './config';
import createApp from './app';

const app = createApp();
const server = createServer(app);

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

server.on('error', (e: Error) => {
  console.error('Error starting server', e);
});
