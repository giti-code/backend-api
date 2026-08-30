import {afterAll, beforeEach, describe, expect, it} from 'vitest';

import {testPrisma} from './prisma-test-client.js';
import {resetTestDatabase} from './test-database.js';

describe('Test database', () => {
    beforeEach(async () => {
        await resetTestDatabase();
    });

    afterAll(async () => {
        await testPrisma.$disconnect();
    });

    it('should connect to PostgreSQL', async () => {
        const result =
            await testPrisma.$queryRaw<{ result: number }[]>`SELECT 1 AS result`;

        expect(result[0]?.result).toBe(1);
    });

    it('should start with an empty database', async () => {
        const userCount = await testPrisma.user.count();
        const refreshTokenCount = await testPrisma.refreshToken.count();

        expect(userCount).toBe(0);
        expect(refreshTokenCount).toBe(0);
    });
});