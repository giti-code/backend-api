import express, { Express } from 'express';

import { errorHandler } from './errors/error-handler.js';
import { apiRouter } from './routes/index.js';

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use('/api/v1', apiRouter);

  app.use(errorHandler);

  return app;
};
