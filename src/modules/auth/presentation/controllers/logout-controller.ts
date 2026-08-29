import type { NextFunction, Request, Response } from 'express';

import { logoutUseCase } from '../../../../app/container/auth-container.js';
import { sendSuccess } from '../../../../shared/http/api-response.js';
import type { RefreshTokenRequest } from '../schemas/refresh-token-schema.js';

export const logoutController = async (
  request: Request<unknown, unknown, RefreshTokenRequest>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await logoutUseCase.execute(request.body);

    sendSuccess(response, null);
  } catch (error: unknown) {
    next(error);
  }
};
