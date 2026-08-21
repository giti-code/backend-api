import { PrismaUserRepository } from '../../modules/users/infrastructure/prisma-user-repository.js';
import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user.js';

const userRepository = new PrismaUserRepository();

export const createUserUseCase = new CreateUserUseCase(userRepository);
