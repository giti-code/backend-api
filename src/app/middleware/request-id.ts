import { randomUUID } from 'node:crypto';

import type { NextFunction, Request, Response } from 'express';

export const requestIdMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const requestId = request.header('X-Request-Id') ?? randomUUID();

  response.setHeader('X-Request-Id', requestId);

  request.requestId = requestId;

  next();
};
