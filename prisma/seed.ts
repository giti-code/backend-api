import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

import 'dotenv/config';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

const permissions = ['users:read', 'users:create', 'users:update', 'users:delete'] as const;

const roles = [
  {
    name: 'ADMIN',
    description: 'Full system access',
  },
  {
    name: 'USER',
    description: 'Standard user access',
  },
] as const;

const main = async (): Promise<void> => {
  for (const permissionName of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permissionName,
      },
      update: {},
      create: {
        name: permissionName,
      },
    });
  }

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: {
        name: role.name,
        description: role.description,
      },
    });
  }

  const adminRole = await prisma.role.findUniqueOrThrow({
    where: {
      name: 'ADMIN',
    },
  });

  const userRole = await prisma.role.findUniqueOrThrow({
    where: {
      name: 'USER',
    },
  });

  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  const readPermission = await prisma.permission.findUniqueOrThrow({
    where: {
      name: 'users:read',
    },
  });

  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: userRole.id,
        permissionId: readPermission.id,
      },
    },
    update: {},
    create: {
      roleId: userRole.id,
      permissionId: readPermission.id,
    },
  });
};

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
