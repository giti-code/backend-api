import type { RefreshToken } from '../../domain/refresh-token.js';

export interface RefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<RefreshToken>;

  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;

  revoke(id: string): Promise<void>;

  rotate(oldTokenId: string, newRefreshToken: RefreshToken): Promise<void>;
}
