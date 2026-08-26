import type { UserRepository } from '../application/repositories/user-repository.js';
import type { User } from '../domain/user.js';
import { toDomainUser } from './mappers/prisma-user-mapper.js';

import { prisma } from '../../../infrastructure/database/prisma/prisma-client.js';

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return toDomainUser(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user === null ? null : toDomainUser(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user === null ? null : toDomainUser(user);
  }
}
