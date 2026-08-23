import type { UserRepository } from '../application/repositories/user-repository.js';
import type { User } from '../domain/user.js';

import { prisma } from '../../../infrastructure/database/prisma/prisma-client.js';

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return prisma.user.create({
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
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
