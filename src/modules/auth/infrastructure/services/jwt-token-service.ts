import { SignJWT } from 'jose';

import { env } from '../../../../config/env.js';
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
}