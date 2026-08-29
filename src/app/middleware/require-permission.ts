import type { NextFunction, Request, Response } from 'express';

import { authorizationService } from '../container/auth-container.js';
import { AppError } from '../../shared/errors/app-error.js';
import { ErrorCode } from '../../shared/errors/error-code.js';

export const requirePermission = (permission: string) => {
  return async (request: Request, _response: Response, next: NextFunction): Promise<void> => {
    try {
      const hasPermission = await authorizationService.hasPermission(request.userId, permission);

      if (!hasPermission) {
        next(
          new AppError(
            'You do not have permission to perform this action',
            ErrorCode.FORBIDDEN,
            403,
          ),
        );

        return;
      }

      next();
    } catch (error: unknown) {
      next(error);
    }
  };
};
