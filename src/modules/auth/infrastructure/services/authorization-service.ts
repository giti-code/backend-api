import type { AuthorizationRepository } from '../../application/repositories/authorization-repository.js';
import type { AuthorizationService } from '../../application/services/authorization-service.js';

export class DefaultAuthorizationService implements AuthorizationService {
  constructor(private readonly authorizationRepository: AuthorizationRepository) {}

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const permissions = await this.authorizationRepository.findUserPermissionNames(userId);

    return permissions.includes(permission);
  }
}
