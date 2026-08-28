import {Router} from 'express';

import {prisma} from '../../infrastructure/database/prisma/prisma-client.js';
import {sendSuccess} from '../../shared/http/api-response.js';
import {userRouter} from '../../modules/users/presentation/user-router.js';
import {authRouter} from "../../modules/auth/presentation/auth-router.js";

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

apiRouter.use('/users', userRouter);

apiRouter.use('/auth', authRouter);