import {LoginUseCase} from '../../modules/auth/application/use-cases/login.js';
import {JwtTokenService} from '../../modules/auth/infrastructure/services/jwt-token-service.js';
import {Argon2PasswordHasher} from '../../modules/users/infrastructure/services/argon2-password-hasher.js';
import {PrismaUserRepository} from '../../modules/users/infrastructure/prisma-user-repository.js';
import {PrismaRefreshTokenRepository} from "../../modules/auth/infrastructure/prisma-refresh-token-repository.js";
import {CryptoRefreshTokenGenerator} from "../../modules/auth/infrastructure/services/crypto-refresh-token-generator.js";

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