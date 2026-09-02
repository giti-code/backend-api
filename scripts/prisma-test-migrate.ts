import dotenv from 'dotenv';
import { execSync } from 'node:child_process';

dotenv.config({ path: '.env.test' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required in .env.test');
}

execSync('pnpm exec prisma migrate deploy', {
  stdio: 'inherit',
  env: process.env,
  shell: process.env.ComSpec,
});
