import type { User as PrismaUser } from '../../../../generated/prisma/client.js';

import type { User } from '../../domain/user.js';

export const toDomainUser = (user: PrismaUser): User => ({
  id: user.id,
  email: user.email,
  passwordHash: user.passwordHash,
  firstName: user.firstName,
  lastName: user.lastName,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
