import type { ErrorCode } from './error-code.js';

export type ErrorDetails = Record<string, unknown>;

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details: ErrorDetails | undefined;

  constructor(message: string, code: ErrorCode, statusCode: number, details?: ErrorDetails) {
    super(message);

    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
