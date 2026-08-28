import {SignJWT, jwtVerify} from 'jose';

import {env} from '../../../../config/env.js';
import type {
    TokenPayload,
    TokenService,
} from '../../application/services/token-service.js';

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
        const {payload} = await jwtVerify(token, secret);

        if (typeof payload.userId !== 'string') {
            throw new Error('Invalid token payload');
        }

        return {
            userId: payload.userId,
        };
    }
}