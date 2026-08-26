import { createApp } from './app/app.js';
import { env } from './config/env.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './infrastructure/database/prisma/prisma-database.js';
import { logger } from './infrastructure/logging/logger.js';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
      },
      'API server started',
    );
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
  logger.error(
    {
      error,
    },
    'Failed to start application',
  );
  process.exit(1);
});
