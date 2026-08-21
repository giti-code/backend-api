import { Router } from 'express';

import { sendSuccess } from '../../shared/http/api-response.js';

export const apiRouter: Router = Router();

apiRouter.get('/health', (_request, response) => {
  sendSuccess(response, {
    status: 'ok',
  });
});
