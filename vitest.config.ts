import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.test',
});

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],

    env: {
      NODE_ENV: 'test',
    },

    fileParallelism: false,
  },
});