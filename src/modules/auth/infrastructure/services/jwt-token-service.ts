import {SignJWT, jwtVerify} from 'jose';

import {env} from '../../../../config/env.js';
import type {
    TokenPayload,
    TokenService,
} from '../../application/services/token-service.js';
import {AppError} from "../../../../shared/errors/app-error.js";
import {ErrorCode} from "../../../../shared/errors/error-code.js";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export class JwtTokenService implements TokenService {
    async generate(payload: TokenPayload): Promise<string> {
        return new SignJWT({
            userId: payload.userId,
        })
            .setProtectedHeader({
                alg: 'HS256',
            })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(secret);
    }

    async verify(token: string): Promise<TokenPayload> {
        try {
            const {payload} = await jwtVerify(token, secret);

            if (typeof payload.userId !== 'string') {
                throw new AppError(
                    'Invalid token payload',
                    ErrorCode.UNAUTHORIZED,
                    401,
                );
            }

            return {
                userId: payload.userId,
            };
        } catch (error: unknown) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                'Invalid or expired token',
                ErrorCode.UNAUTHORIZED,
                401,
            );
        }
    }
}