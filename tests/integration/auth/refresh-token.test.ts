import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';

import { createApp } from '../../../src/app/app.js';
import { testPrisma } from '../prisma-test-client.js';
import { resetTestDatabase } from '../test-database.js';
import { createTestUser } from '../factories/user-factory.js';

const app = createApp();

describe('POST /api/v1/auth/refresh', () => {
    beforeEach(async () => {
        await resetTestDatabase();
    });

    afterAll(async () => {
        await testPrisma.$disconnect();
    });

    it('should rotate the refresh token', async () => {
        const password = 'Password123!';

        const user = await createTestUser({
            password,
        });

        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: user.email,
                password,
            });

        expect(loginResponse.status).toBe(200);

        const refreshTokenA = loginResponse.body.data.refreshToken;

        const refreshTokens = await testPrisma.refreshToken.findMany();

        console.log('TEST DB REFRESH TOKENS:', refreshTokens);

        const refreshResponse = await request(app)
            .post('/api/v1/auth/refresh')
            .send({
                refreshToken: refreshTokenA,
            });

        expect(refreshResponse.status).toBe(200);
        expect(refreshResponse.body.success).toBe(true);

        const refreshTokenB = refreshResponse.body.data.refreshToken;

        expect(refreshTokenB).toEqual(expect.any(String));
        expect(refreshTokenB).not.toBe(refreshTokenA);
        expect(refreshResponse.body.data.accessToken).toEqual(expect.any(String));

        const oldTokenResponse = await request(app)
            .post('/api/v1/auth/refresh')
            .send({
                refreshToken: refreshTokenA,
            });

        expect(oldTokenResponse.status).toBe(401);

        const newTokenResponse = await request(app)
            .post('/api/v1/auth/refresh')
            .send({
                refreshToken: refreshTokenB,
            });

        expect(newTokenResponse.status).toBe(200);
        expect(newTokenResponse.body.success).toBe(true);
    });
});