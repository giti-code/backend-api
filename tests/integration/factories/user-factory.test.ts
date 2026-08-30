import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { testPrisma } from '../prisma-test-client.js';
import { resetTestDatabase } from '../test-database.js';
import { createTestUser } from './user-factory.js';

describe('User factory', () => {
    beforeEach(async () => {
        await resetTestDatabase();
    });

    afterAll(async () => {
        await testPrisma.$disconnect();
    });

    it('should create a valid test user', async () => {
        const user = await createTestUser();

        expect(user.email).toContain('@example.com');
        expect(user.firstName).toBe('Test');
        expect(user.lastName).toBe('User');
        expect(user.isActive).toBe(true);
        expect(user.passwordHash).not.toBe('Password123!');
    });
});