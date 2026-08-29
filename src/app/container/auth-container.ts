import { LoginUseCase } from '../../modules/auth/application/use-cases/login.js';
import { JwtTokenService } from '../../modules/auth/infrastructure/services/jwt-token-service.js';
import { Argon2PasswordHasher } from '../../modules/users/infrastructure/services/argon2-password-hasher.js';
import { PrismaUserRepository } from '../../modules/users/infrastructure/prisma-user-repository.js';
import { PrismaRefreshTokenRepository } from '../../modules/auth/infrastructure/prisma-refresh-token-repository.js';
import { CryptoRefreshTokenGenerator } from '../../modules/auth/infrastructure/services/crypto-refresh-token-generator.js';
import { RefreshAccessTokenUseCase } from '../../modules/auth/application/use-cases/refresh-access-token.js';
import { LogoutUseCase } from '../../modules/auth/application/use-cases/logout.js';

const userRepository = new PrismaUserRepository();
const passwordHasher = new Argon2PasswordHasher();

export const tokenService = new JwtTokenService();

export const refreshTokenRepository = new PrismaRefreshTokenRepository();
export const refreshTokenGenerator = new CryptoRefreshTokenGenerator();

export const loginUseCase = new LoginUseCase(
  userRepository,
  passwordHasher,
  tokenService,
  refreshTokenRepository,
  refreshTokenGenerator,
);

export const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
  refreshTokenRepository,
  refreshTokenGenerator,
  userRepository,
  tokenService,
);

export const logoutUseCase = new LogoutUseCase(refreshTokenRepository, refreshTokenGenerator);
