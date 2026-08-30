import { env } from '../../../config/env.js';
import { createPrismaClient } from './create-prisma-client.js';

export const prisma = createPrismaClient(env.DATABASE_URL);
