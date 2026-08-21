import express, { Express } from 'express';

import { errorHandler } from './errors/error-handler.js';

export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use(errorHandler);

  return app;
};
