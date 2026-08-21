import {Router} from 'express';

import {prisma} from '../../infrastructure/database/prisma/prisma-client.js';
import {sendSuccess} from '../../shared/http/api-response.js';

export const apiRouter: Router = Router();

apiRouter.get('/health', async (_request, response, next) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        sendSuccess(response, {
            status: 'ok',
            database: 'connected',
        });
    } catch (error: unknown) {
        next(error);
    }
});