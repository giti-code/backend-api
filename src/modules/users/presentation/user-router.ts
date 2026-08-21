import { Router } from 'express';

import { validateRequest } from '../../../app/middleware/validate-request.js';
import { createUserController } from './controllers/create-user-controller.js';
import { createUserSchema } from './schemas/create-user-schema.js';

export const userRouter: Router = Router();

userRouter.post('/', validateRequest(createUserSchema), createUserController);
