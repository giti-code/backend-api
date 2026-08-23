import { PrismaUserRepository } from '../../modules/users/infrastructure/prisma-user-repository.js';
import { CreateUserUseCase } from '../../modules/users/application/use-cases/create-user.js';
import { PasswordHasher } from '../../modules/users/application/services/password-hasher.js';

const userRepository = new PrismaUserRepository();

const passwordHasher: PasswordHasher = {
  async hash(password: string): Promise<string> {
    void password;

    throw new Error('PasswordHasher is not implemented yet');
  },
};

export const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
