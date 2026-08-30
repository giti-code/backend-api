import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { createApp } from '../../../src/app/app.js';
import { testPrisma } from '../prisma-test-client.js';
import { resetTestDatabase } from '../test-database.js';
import { createTestUser } from '../factories/user-factory.js';

const app = createApp();

describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
        await resetTestDatabase();
    });

    afterAll(async () => {
        await testPrisma.$disconnect();
    });

    it('should login with valid credentials', async () => {
        const password = 'Password123!';

        const user = await createTestUser({
            password,
        });

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: user.email,
                password,
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.user.id).toBe(user.id);
        expect(response.body.data.accessToken).toEqual(expect.any(String));
        expect(response.body.data.refreshToken).toEqual(expect.any(String));
    });

    it('should reject an invalid password', async () => {
        const user = await createTestUser({
            password: 'Password123!',
        });

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: user.email,
                password: 'WrongPassword123!',
            });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });

    it('should reject an unknown user', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'unknown@example.com',
                password: 'Password123!',
            });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });

    it('should reject an inactive user', async () => {
        const password = 'Password123!';

        const user = await createTestUser({
            password,
            isActive: false,
        });

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: user.email,
                password,
            });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});