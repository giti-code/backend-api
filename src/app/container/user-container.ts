import { PrismaUserRepository } from '../../modules/users/infrastructure/prisma-user-repository.js';
import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user.js';
import { Argon2PasswordHasher } from '../../modules/users/infrastructure/services/argon2-password-hasher.js';
import { GetUserByIdUseCase } from '../../modules/users/application/use-cases/get-user-by-id.js';

const userRepository = new PrismaUserRepository();
const passwordHasher = new Argon2PasswordHasher();

export const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
