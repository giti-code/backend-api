import type {Request, Response, NextFunction} from 'express';

import {createUserUseCase} from '../../../../app/container/user-container.js';
import {sendSuccess} from '../../../../shared/http/api-response.js';
import {toUserResponse} from '../dtos/user-response.js';

export const createUserController = async (
    request: Request,
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
