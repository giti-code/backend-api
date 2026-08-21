import type { Response } from 'express';

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const sendSuccess = <T>(response: Response, data: T, statusCode = 200): void => {
  response.status(statusCode).json({
    success: true,
    data,
  } satisfies ApiSuccessResponse<T>);
};
