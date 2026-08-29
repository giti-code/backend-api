import type { UserRepository } from '../../../users/application/repositories/user-repository.js';

import { AppError } from '../../../../shared/errors/app-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';
import type { RefreshTokenRepository } from '../repositories/refresh-token-repository.js';
import type { RefreshTokenGenerator } from '../services/refresh-token-generator.js';
import type { TokenService } from '../services/token-service.js';

interface RefreshAccessTokenInput {
  refreshToken: string;
}

interface RefreshAccessTokenResult {
  accessToken: string;
  refreshToken: string;
}

export class RefreshAccessTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly refreshTokenGenerator: RefreshTokenGenerator,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: RefreshAccessTokenInput): Promise<RefreshAccessTokenResult> {
    const tokenHash = this.refreshTokenGenerator.hash(input.refreshToken);

    const refreshToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (refreshToken === null) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    if (refreshToken.revokedAt !== null) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    if (refreshToken.expiresAt <= new Date()) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    const user = await this.userRepository.findById(refreshToken.userId);

    if (user === null || !user.isActive) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    const newRefreshToken = this.refreshTokenGenerator.generate();

    const newTokenHash = this.refreshTokenGenerator.hash(newRefreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenRepository.rotate(refreshToken.id, {
      id: this.refreshTokenGenerator.generateId(),
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt,
      revokedAt: null,
      createdAt: new Date(),
    });

    const accessToken = await this.tokenService.generate({
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
