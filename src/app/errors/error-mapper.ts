import { ErrorCode } from '../../shared/errors/error-code.js';

export const getHttpStatusFromErrorCode = (code: ErrorCode): number => {
  switch (code) {
    case ErrorCode.VALIDATION_ERROR:
      return 400;

    case ErrorCode.USER_NOT_FOUND:
      return 404;

    case ErrorCode.USER_ALREADY_EXISTS:
      return 409;

    case ErrorCode.INTERNAL_SERVER_ERROR:
    default:
      return 500;
  }
};
