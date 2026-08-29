export interface AuthorizationService {
  hasPermission(userId: string, permission: string): Promise<boolean>;
}
