import type { NextFunction, Request, Response } from 'express';

import { getUserByIdUseCase } from '../../../../app/container/user-container.js';
import { sendSuccess } from '../../../../shared/http/api-response.js';
import { toUserResponse } from '../dtos/user-response.js';

export const getUserByIdController = async (
  request: Request<{ id: string }>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUserByIdUseCase.execute(request.params.id);

    sendSuccess(response, toUserResponse(user));
  } catch (error: unknown) {
    next(error);
  }
};
