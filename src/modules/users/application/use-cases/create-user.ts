import { randomUUID } from 'node:crypto';

import type { User } from '../../domain/user.js';
import type { UserRepository } from '../repositories/user-repository.js';

import { ApplicationError } from '../../../../shared/errors/application-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser !== null) {
      throw new ApplicationError(
        'User with this email already exists',
        ErrorCode.USER_ALREADY_EXISTS,
      );
    }

    const now = new Date();

    const user: User = {
      id: randomUUID(),
      email: input.email,
      passwordHash: input.passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return this.userRepository.create(user);
  }
}
