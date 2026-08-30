import { createHash, randomBytes, randomUUID } from 'node:crypto';

import type { RefreshTokenGenerator } from '../../application/services/refresh-token-generator.js';

export class CryptoRefreshTokenGenerator implements RefreshTokenGenerator {
  generate(): string {
    return randomBytes(64).toString('hex');
  }

  generateId(): string {
    return randomUUID();
  }

  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
