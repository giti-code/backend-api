import { describe, expect, it } from 'vitest';

import { CryptoRefreshTokenGenerator } from '../../src/modules/auth/infrastructure/services/crypto-refresh-token-generator.js';

describe('CryptoRefreshTokenGenerator', () => {
  const generator = new CryptoRefreshTokenGenerator();

  it('should generate unique refresh tokens', () => {
    const firstToken = generator.generate();
    const secondToken = generator.generate();

    expect(firstToken).not.toBe(secondToken);
  });

  it('should generate a 128-character hexadecimal token', () => {
    const token = generator.generate();

    expect(token).toMatch(/^[a-f0-9]{128}$/);
  });

  it('should generate a unique id', () => {
    const firstId = generator.generateId();
    const secondId = generator.generateId();

    expect(firstId).not.toBe(secondId);
  });

  it('should generate a deterministic SHA-256 hash', () => {
    const token = 'test-refresh-token';

    const firstHash = generator.hash(token);
    const secondHash = generator.hash(token);

    expect(firstHash).toBe(secondHash);
    expect(firstHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
