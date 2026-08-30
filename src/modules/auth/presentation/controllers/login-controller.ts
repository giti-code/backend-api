import type { NextFunction, Request, Response } from 'express';

import { loginUseCase } from '../../../../app/container/auth-container.js';
import { sendSuccess } from '../../../../shared/http/api-response.js';
import { toUserResponse } from '../../../users/presentation/dtos/user-response.js';
import type { LoginRequest } from '../schemas/login-schema.js';

export const loginController = async (
  request: Request<unknown, unknown, LoginRequest>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await loginUseCase.execute(request.body);

    sendSuccess(response, {
      user: toUserResponse(result.user),
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error: unknown) {
    next(error);
  }
};
