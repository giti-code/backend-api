import type { ErrorCode } from './error-code.js';

export type ApplicationErrorDetails = Record<string, unknown>;

export class ApplicationError extends Error {
  public readonly code: ErrorCode;
  public readonly details: ApplicationErrorDetails | undefined;

  constructor(message: string, code: ErrorCode, details?: ApplicationErrorDetails) {
    super(message);

    this.name = 'ApplicationError';
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
