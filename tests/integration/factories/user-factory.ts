import { randomUUID } from 'node:crypto';

import { Argon2PasswordHasher } from '../../../src/modules/users/infrastructure/services/argon2-password-hasher.js';
import { testPrisma } from '../prisma-test-client.js';

const passwordHasher = new Argon2PasswordHasher();

interface CreateTestUserInput {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
}

export const createTestUser = async (
    input: CreateTestUserInput = {},
) => {
    const password = input.password ?? 'Password123!';

    const passwordHash = await passwordHasher.hash(password);

    return testPrisma.user.create({
        data: {
            id: randomUUID(),
            email: input.email ?? `test-${randomUUID()}@example.com`,
            passwordHash,
            firstName: input.firstName ?? 'Test',
            lastName: input.lastName ?? 'User',
            isActive: input.isActive ?? true,
        },
    });
};