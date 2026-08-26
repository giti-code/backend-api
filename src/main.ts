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

  let isShuttingDown = false;

  const shutdown = (signal: string): void => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    logger.info(
      {
        signal,
      },
      'Shutdown signal received',
    );

    server.close(async (error) => {
      if (error) {
        logger.error(
          {
            error,
          },
          'Failed to close HTTP server',
        );

        process.exit(1);
      }

      try {
        await disconnectDatabase();

        logger.info('Application shutdown completed');

        process.exit(0);
      } catch (error: unknown) {
        logger.error(
          {
            error,
          },
          'Failed to disconnect database',
        );

        process.exit(1);
      }
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
