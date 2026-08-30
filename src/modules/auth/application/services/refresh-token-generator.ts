export interface RefreshTokenGenerator {
  generate(): string;

  generateId(): string;

  hash(token: string): string;
}
