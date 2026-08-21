import { createApp } from './app/app.js';
import { env } from './config/env.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './infrastructure/database/prisma/prisma-database.js';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`API server is running on port ${env.PORT}`);
  });

  const shutdown = async (): Promise<void> => {
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer().catch((error: unknown) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
