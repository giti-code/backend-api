import express, { Express } from 'express';

import { errorHandler } from './errors/error-handler.js';
import { apiRouter } from './routes/index.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { requestLoggerMiddleware } from './middleware/request-logger.js';
import cors from 'cors';

export const createApp = (): Express => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(requestIdMiddleware);
  app.use(requestLoggerMiddleware);

  app.use('/api/v1', apiRouter);

  app.use(errorHandler);

  return app;
};
