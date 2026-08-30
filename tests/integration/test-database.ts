import { testPrisma } from './prisma-test-client.js';

export const resetTestDatabase = async (): Promise<void> => {
    await testPrisma.refreshToken.deleteMany();
    await testPrisma.user.deleteMany();
};