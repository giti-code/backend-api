import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../../shared/errors/app-error.js';
import { ErrorCode } from '../../shared/errors/error-code.js';

export const validateRequest = (schema: ZodType): RequestHandler => {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      next(new AppError('Request validation failed', ErrorCode.VALIDATION_ERROR, 400));

      return;
    }

    request.body = result.data;

    next();
  };
};
