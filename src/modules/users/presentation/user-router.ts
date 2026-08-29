import { Router } from 'express';

import { authenticationMiddleware } from '../../../app/middleware/authentication.js';
import { getCurrentUserController } from './controllers/get-current-user-controller.js';
import { createUserController } from './controllers/create-user-controller.js';
import { getUserByIdController } from './controllers/get-user-by-id-controller.js';

import { validateRequest } from '../../../app/middleware/validate-request.js';
import { createUserSchema } from './schemas/create-user-schema.js';
import { requirePermission } from '../../../app/middleware/require-permission.js';

export const userRouter: Router = Router();

userRouter.post('/', validateRequest(createUserSchema), createUserController);
userRouter.get('/me', authenticationMiddleware, getCurrentUserController);

userRouter.get(
  '/:id',
  authenticationMiddleware,
  requirePermission('users:read'),
  getUserByIdController,
);
