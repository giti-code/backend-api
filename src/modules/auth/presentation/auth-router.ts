import { Router } from 'express';

import { loginController } from './controllers/login-controller.js';
import { refreshAccessTokenController } from './controllers/refresh-access-token-controller.js';
import { validateRequest } from '../../../app/middleware/validate-request.js';
import { logoutController } from './controllers/logout-controller.js';
import { refreshTokenSchema } from './schemas/refresh-token-schema.js';
import { loginSchema } from './schemas/login-schema.js';

export const authRouter: Router = Router();

authRouter.post('/login', validateRequest(loginSchema), loginController);

authRouter.post('/refresh', validateRequest(refreshTokenSchema), refreshAccessTokenController);

authRouter.post('/logout', validateRequest(refreshTokenSchema), logoutController);
