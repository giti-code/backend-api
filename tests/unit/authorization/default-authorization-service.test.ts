import { describe, expect, it } from 'vitest';

import type { AuthorizationRepository } from '../../../src/modules/auth/application/repositories/authorization-repository.js';
import { DefaultAuthorizationService } from '../../../src/modules/auth/infrastructure/services/authorization-service.js';

class FakeAuthorizationRepository implements AuthorizationRepository {
  constructor(private readonly permissions: string[]) {}

  async findUserRoleNames(_userId: string): Promise<string[]> {
    void _userId;
    return [];
  }

  async findUserPermissionNames(_userId: string): Promise<string[]> {
    void _userId;
    return this.permissions;
  }
}

describe('DefaultAuthorizationService', () => {
  it('should return true when the user has the requested permission', async () => {
    const repository = new FakeAuthorizationRepository(['users.read', 'users.delete']);

    const service = new DefaultAuthorizationService(repository);

    const result = await service.hasPermission('user-id', 'users.delete');

    expect(result).toBe(true);
  });

  it('should return false when the user does not have the requested permission', async () => {
    const repository = new FakeAuthorizationRepository(['users.read']);

    const service = new DefaultAuthorizationService(repository);

    const result = await service.hasPermission('user-id', 'users.delete');

    expect(result).toBe(false);
  });
});
