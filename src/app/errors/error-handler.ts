import type { ErrorRequestHandler } from 'express';

import { ApplicationError } from '../../shared/errors/application-error.js';
import { AppError } from '../../shared/errors/app-error.js';
import { ErrorCode } from '../../shared/errors/error-code.js';
import { getHttpStatusFromErrorCode } from './error-mapper.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next;

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined && {
          details: error.details,
        }),
      },
    });

    return;
  }

  if (error instanceof ApplicationError) {
    const statusCode = getHttpStatusFromErrorCode(error.code);

    response.status(statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    },
  });
};
