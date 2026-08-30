import type { UserRepository } from '../../../users/application/repositories/user-repository.js';
import type { PasswordHasher } from '../../../users/application/services/password-hasher.js';
import type { User } from '../../../users/domain/user.js';

import { AppError } from '../../../../shared/errors/app-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';
import type { TokenService } from '../services/token-service.js';

import type { RefreshTokenRepository } from '../repositories/refresh-token-repository.js';
import type { RefreshTokenGenerator } from '../services/refresh-token-generator.js';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly refreshTokenGenerator: RefreshTokenGenerator,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(input.email);

    if (user === null) {
      throw new AppError('Invalid email or password', ErrorCode.UNAUTHORIZED, 401);
    }

    if (!user.isActive) {
      throw new AppError('Invalid email or password', ErrorCode.UNAUTHORIZED, 401);
    }

    const passwordMatches = await this.passwordHasher.compare(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError('Invalid email or password', ErrorCode.UNAUTHORIZED, 401);
    }

    const accessToken = await this.tokenService.generate({
      userId: user.id,
    });

    const refreshToken = this.refreshTokenGenerator.generate();

    const tokenHash = this.refreshTokenGenerator.hash(refreshToken);

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenRepository.create({
      id: this.refreshTokenGenerator.generateId(),
      userId: user.id,
      tokenHash,
      expiresAt,
      revokedAt: null,
      createdAt: new Date(),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
