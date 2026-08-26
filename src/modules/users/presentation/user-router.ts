import { Router } from 'express';

import { validateRequest } from '../../../app/middleware/validate-request.js';
import { createUserController } from './controllers/create-user-controller.js';
import { getUserByIdController } from './controllers/get-user-by-id-controller.js';
import { createUserSchema } from './schemas/create-user-schema.js';

export const userRouter: Router = Router();

userRouter.get('/:id', getUserByIdController);
userRouter.post('/', validateRequest(createUserSchema), createUserController);
