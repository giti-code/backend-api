import type { RefreshTokenRepository } from '../application/repositories/refresh-token-repository.js';
import type { RefreshToken } from '../domain/refresh-token.js';

import { prisma } from '../../../infrastructure/database/prisma/prisma-client.js';

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  async create(refreshToken: RefreshToken): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        id: refreshToken.id,
        userId: refreshToken.userId,
        tokenHash: refreshToken.tokenHash,
        expiresAt: refreshToken.expiresAt,
        revokedAt: refreshToken.revokedAt,
        createdAt: refreshToken.createdAt,
      },
    });
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
  }

  async revoke(id: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { id },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async rotate(oldTokenId: string, newRefreshToken: RefreshToken): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: {
          id: oldTokenId,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      await tx.refreshToken.create({
        data: {
          id: newRefreshToken.id,
          userId: newRefreshToken.userId,
          tokenHash: newRefreshToken.tokenHash,
          expiresAt: newRefreshToken.expiresAt,
          revokedAt: newRefreshToken.revokedAt,
          createdAt: newRefreshToken.createdAt,
        },
      });
    });
  }
}
