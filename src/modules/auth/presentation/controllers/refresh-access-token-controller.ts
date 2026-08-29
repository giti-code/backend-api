import type { NextFunction, Request, Response } from 'express';

import { refreshAccessTokenUseCase } from '../../../../app/container/auth-container.js';
import { sendSuccess } from '../../../../shared/http/api-response.js';
import type { RefreshTokenRequest } from '../schemas/refresh-token-schema.js';

export const refreshAccessTokenController = async (
  request: Request<unknown, unknown, RefreshTokenRequest>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await refreshAccessTokenUseCase.execute(request.body);

    sendSuccess(response, result);
  } catch (error: unknown) {
    next(error);
  }
};
