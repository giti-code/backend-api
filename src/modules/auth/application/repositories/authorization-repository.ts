export interface AuthorizationRepository {
  findUserRoleNames(userId: string): Promise<string[]>;

  findUserPermissionNames(userId: string): Promise<string[]>;
}
