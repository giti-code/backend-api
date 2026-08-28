import { LoginUseCase } from '../../modules/auth/application/use-cases/login.js';
import { Argon2PasswordHasher } from '../../modules/users/infrastructure/services/argon2-password-hasher.js';
import { PrismaUserRepository } from '../../modules/users/infrastructure/prisma-user-repository.js';

const userRepository = new PrismaUserRepository();
const passwordHasher = new Argon2PasswordHasher();

export const loginUseCase = new LoginUseCase(
    userRepository,
    passwordHasher,
);