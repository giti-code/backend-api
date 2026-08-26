import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../infrastructure/logging/logger.js';

export const requestLoggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const startTime = process.hrtime.bigint();

  response.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;

    logger.info(
      {
        requestId: request.requestId,
        method: request.method,
        url: request.originalUrl,
        statusCode: response.statusCode,
        durationMs: Number(durationMs.toFixed(2)),
      },
      'HTTP request completed',
    );
  });

  next();
};
