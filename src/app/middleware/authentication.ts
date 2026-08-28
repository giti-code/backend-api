import type { NextFunction, Request, Response } from 'express';

import { tokenService } from '../container/auth-container.js';
import { AppError } from '../../shared/errors/app-error.js';
import { ErrorCode } from '../../shared/errors/error-code.js';

export const authenticationMiddleware = (
    request: Request,
    _response: Response,
    next: NextFunction,
): void => {
    const authorization = request.header('Authorization');

    if (!authorization?.startsWith('Bearer ')) {
        next(
            new AppError(
                'Authentication required',
                ErrorCode.UNAUTHORIZED,
                401,
            ),
        );

        return;
    }

    const token = authorization.slice(7).trim();

    if (!token) {
        next(
            new AppError(
                'Authentication required',
                ErrorCode.UNAUTHORIZED,
                401,
            ),
        );

        return;
    }

    tokenService
        .verify(token)
        .then((payload) => {
            request.userId = payload.userId;
            next();
        })
        .catch(() => {
            next(
                new AppError(
                    'Invalid or expired token',
                    ErrorCode.UNAUTHORIZED,
                    401,
                ),
            );
        });
};