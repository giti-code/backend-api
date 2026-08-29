import type { AuthorizationRepository } from '../application/repositories/authorization-repository.js';

import { prisma } from '../../../infrastructure/database/prisma/prisma-client.js';

export class PrismaAuthorizationRepository implements AuthorizationRepository {
  async findUserRoleNames(userId: string): Promise<string[]> {
    const userRoles = await prisma.userRole.findMany({
      where: {
        userId,
      },
      include: {
        role: true,
      },
    });

    return userRoles.map((userRole) => userRole.role.name);
  }

  async findUserPermissionNames(userId: string): Promise<string[]> {
    const userRoles = await prisma.userRole.findMany({
      where: {
        userId,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const permissions = userRoles.flatMap((userRole) =>
      userRole.role.permissions.map((rolePermission) => rolePermission.permission.name),
    );

    return [...new Set(permissions)];
  }
}
