import { describe, expect, it } from 'vitest';

import type { AuthorizationRepository } from '../../src/modules/auth/application/repositories/authorization-repository.js';
import { DefaultAuthorizationService } from '../../src/modules/auth/infrastructure/services/authorization-service.js';

class InMemoryAuthorizationRepository implements AuthorizationRepository {
  constructor(private readonly permissionsByUserId: ReadonlyMap<string, readonly string[]>) {}

  async findUserRoleNames(_userId: string): Promise<string[]> {
    return [];
  }

  async findUserPermissionNames(userId: string): Promise<string[]> {
    return [...(this.permissionsByUserId.get(userId) ?? [])];
  }
}

describe('DefaultAuthorizationService', () => {
  it('grants access when the user has the requested permission', async () => {
    const service = new DefaultAuthorizationService(
      new InMemoryAuthorizationRepository(new Map([['user-1', ['users.delete']]])),
    );

    await expect(service.hasPermission('user-1', 'users.delete')).resolves.toBe(true);
  });

  it('denies access when the user does not have the requested permission', async () => {
    const service = new DefaultAuthorizationService(
      new InMemoryAuthorizationRepository(new Map([['user-1', ['users.read']]])),
    );

    await expect(service.hasPermission('user-1', 'users.delete')).resolves.toBe(false);
  });
});
