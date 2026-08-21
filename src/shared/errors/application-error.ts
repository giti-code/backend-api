import type { ErrorCode } from './error-code.js';

export class ApplicationError extends Error {
  public readonly code: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);

    this.name = 'ApplicationError';
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}
