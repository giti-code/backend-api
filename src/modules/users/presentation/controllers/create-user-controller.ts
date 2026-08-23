import type { Request, Response, NextFunction } from 'express';

import { createUserUseCase } from '../../../../app/container/user-container.js';
import { sendSuccess } from '../../../../shared/http/api-response.js';
import { toUserResponse } from '../dtos/user-response.js';
import type { CreateUserRequest } from '../schemas/create-user-schema.js';

export const createUserController = async (
  request: Request<unknown, unknown, CreateUserRequest>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await createUserUseCase.execute(request.body);

    sendSuccess(response, toUserResponse(user), 201);
  } catch (error: unknown) {
    next(error);
  }
};
