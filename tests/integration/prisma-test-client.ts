import { createPrismaClient } from '../../src/infrastructure/database/prisma/create-prisma-client.js';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required for integration tests');
}

export const testPrisma = createPrismaClient(databaseUrl);