import type { NextFunction, Request, Response } from 'express';

import { tokenService } from '../container/auth-container.js';
import { AppError } from '../../shared/errors/app-error.js';
import { ErrorCode } from '../../shared/errors/error-code.js';

export const authenticationMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = request.header('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    next(new AppError('Authentication required', ErrorCode.UNAUTHORIZED, 401));

    return;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    next(new AppError('Authentication required', ErrorCode.UNAUTHORIZED, 401));

    return;
  }

  try {
    const payload = await tokenService.verify(token);

    request.userId = payload.userId;

    next();
  } catch (error: unknown) {
    next(error);
  }
};
