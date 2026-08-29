import { AppError } from '../../../../shared/errors/app-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';
import type { RefreshTokenRepository } from '../repositories/refresh-token-repository.js';
import type { RefreshTokenGenerator } from '../services/refresh-token-generator.js';

interface LogoutInput {
  refreshToken: string;
}

export class LogoutUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly refreshTokenGenerator: RefreshTokenGenerator,
  ) {}
  async execute(input: LogoutInput): Promise<void> {
    const tokenHash = this.refreshTokenGenerator.hash(input.refreshToken);
    const refreshToken = await this.refreshTokenRepository.findByTokenHash(tokenHash);

    if (refreshToken === null) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    if (refreshToken.revokedAt !== null) {
      throw new AppError('Invalid refresh token', ErrorCode.UNAUTHORIZED, 401);
    }

    await this.refreshTokenRepository.revoke(refreshToken.id);
  }
}
